import { Request, Response, NextFunction } from 'express';
import { getRepository, Like } from 'typeorm';
import { DateTime } from 'luxon';
import moment from 'moment';

import bcryptService from '../services/bcrypt.service';
import authService from '../services/auth.service';
import emailQueueService from '../services/email-queue.service';
import { User } from '../../entity/User';
import { SubscriptionPurchased } from '../../entity/SubscriptionPurchased';
import { Status, status as userStatus } from '../../entity/Status'
import { generateOtp, logger } from '../utils';
import countries from '../utils/countries-list';
import authCountry from '../services/auth.country';
import { Roles, name as role } from '../../entity/Roles';
import { or } from 'sequelize/types';

const register = async (req: Request, res: any, next: NextFunction) => {
  try {
    const userRepo = getRepository(User);
    const statusRepo = getRepository(Status);
    const rolesRepo = getRepository(Roles);
    const SubscriptionPurchasedRepo = getRepository(SubscriptionPurchased);
    const { body } = req;
    body.password = bcryptService().password(body);
    let whereEmailQuery: any = [{ email: body.email }];
    const existingEmail = await userRepo.findOne({
      where: whereEmailQuery,
    });
    // existing user for Email
    if (existingEmail) {
      if (existingEmail.email === body.email) {
        logger.error('ERR_DUPL_EMAIL');
        return res
          .status(400)
          .json({ errCode: 'ERR_DUPL_EMAIL', msg: res.__('ERR_DUPL_EMAIL') });
      }
    }

    // existing phone number check
    let wherePhoneQuery: any = [{ phoneNumber: body.phoneNumber }];
    const existingPhone = await userRepo.findOne({
      where: wherePhoneQuery,
    });
    // existing phone number check
    if (existingPhone) {
      if (existingPhone.phoneNumber == body.phoneNumber) {
        logger.error('ERR_DUPL_PHONE');
        return res
          .status(400)
          .json({ errCode: 'ERR_DUPL_PHONE', msg: res.__('ERR_DUPL_PHONE') });
      }
    }
    //country code check
    const checkCountryCode = authCountry(countries, "dial_code", body.countryCode); // country  valid or not true/false
    // const checkCountryFlag = authCountry(countries, "flag", 1);  // country active or not true/false
    if (!checkCountryCode) {
      logger.error('ERR_Country_Not_Valid');
      return res
        .status(400)
        .json({ errCode: 'ERR_Country_Not_Valid', msg: res.__('ERR_Country_Not_Valid') });
    }
    if (checkCountryCode && body.countryCode != "+61") {
      logger.error('ERR_Not_Active_IN_This_Country');
      return res
        .status(400)
        .json({ errCode: 'ERR_Not_Active_IN_This_Country', msg: res.__('ERR_Not_Active_IN_This_Country') });
    }

    let statusInactive = userStatus.INACTIVE
    const checkInactiveId = await statusRepo.findOne({
      where: { status: statusInactive },
    });

    if (!checkInactiveId) {
      return res
        .status(400)
        .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
    }
    // set otp and expire time
    body.roleId = body.role;
    body.statusId = checkInactiveId.id;
    body.otpCode = generateOtp(4);
    body.otpCodeExpireTime = DateTime.local().plus({ second: 30 }).toISO();
    const user = await userRepo.save(body);
    if (user) {
      const insertSubscriptionPurchased: Partial<SubscriptionPurchased> = {
        userId: user.id,
        subcriptionPlanId: 4,
      }
      await SubscriptionPurchasedRepo.save(insertSubscriptionPurchased);
    }
    emailQueueService().addToQueue(body.email, body.firstName, `OTP is ${body.otpCode}`);
    res.status(201).json({
      msg: res.__('VERIFICATION_MAIL_SENT'),
      user: { otpCode: body.otpCode },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const login = async (req: Request, res: any, next: NextFunction) => {
  let userName = req.body.username;
  let password = req.body.password;
  const userRepo = getRepository(User);
  const statusRepo = getRepository(Status);
  //with email
  if (userName && password) {
    try {
      const user = await userRepo.findOne({
        where: [{
          email: userName
        }, {
          phoneNumber: userName
        }]
      });
      let statusDeleted = userStatus.DELETED
      const checkDeletedId = await statusRepo.findOne({
        where: { status: statusDeleted }

      });
      if (!checkDeletedId) {
        return res
          .status(400)
          .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
      }
      if (!user || user.statusId === checkDeletedId.id) {
        return res.status(400).json({
          errCode: 'ERR_LOGIN_USER_NOT_FND',
          msg: res.__('ERR_LOGIN_USER_NOT_FND'),
        });
      }
      // add proper invalid pw msg
      if (bcryptService().comparePassword(password, user.password)) {
        // check for verified user
        let statusInactive = userStatus.INACTIVE
        const checkInactiveId = await statusRepo.findOne({
          where: { status: statusInactive },
        });
        if (!checkInactiveId) {
          return res
            .status(400)
            .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
        }
        if (user.statusId === checkInactiveId.id)
          return res.status(401).json({
            errCode: 'ERR_LOGIN_EMAIL_UNVERIFIED',
            msg: res.__('ERR_LOGIN_EMAIL_UNVERIFIED'),
          });

        const token = authService().issue({ id: user.id, user: user });
        const resUser = {
          firstName: user.firstName,
          lastNAme: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userProfilePicture: user.avatar,
        };
        return res.status(200).json({ token, user: resUser });
      }
      return res.status(401).json({
        errCode: 'ERR_LOGIN_INCORRECT_PWD',
        msg: res.__('ERR_LOGIN_INCORRECT_PWD'),
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
  return res
    .status(400)
    .json({ msg: 'Bad Request: Invalid input' });
};

const verifyEmail = async (req: Request, res: any, next: NextFunction) => {
  const { email, otpCode, status } = req.body;
  const userRepo = getRepository(User);
  const statusRepo = getRepository(Status);
  try {
    let statusInactive = userStatus.INACTIVE
    const checkInactiveId = await statusRepo.findOne({
      where: { status: statusInactive },
    });
    if (!checkInactiveId) {
      return res
        .status(400)
        .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
    }
    const user = await userRepo.findOne({
      where: {
        email,
        otpCode,
        statusId: checkInactiveId.id,
      },
    });
    // check of user exists with otp
    if (!user) {
      return res.status(400).json({ msg: res.__('ERR_OTP_INVALID') });
    }

    const currentDT = moment();
    const expireDate = moment(user.otpCodeExpireTime.toString()).format();
    let isValid = currentDT.isBefore(expireDate, 'second');
    let statusActive = userStatus.ACTIVE
    const checkActiveId = await statusRepo.findOne({
      where: { status: statusActive }
    });
    if (!checkActiveId) {
      return res
        .status(400)
        .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
    }
    if (isValid) {
      const updateUser = {
        otpCode: 0,
        otpCodeExpireTime: '',
        statusId: checkActiveId.id,
      };
      await userRepo.update({ email }, updateUser).catch((err) => {
        console.log(err);
        return next(err);
      });
      const token = authService().issue({ id: user.id });
      const resUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userProfilePicture: user.avatar,
      };
      return res.status(200).json({ token, user: resUser });
    }
    return res.status(401).json({ msg: res.__('ERR_OTP_INVALID') });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Internal server error' });
  };

}

const resendAccountVerifyEmail = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const userRepo = getRepository(User);
  const statusRepo = getRepository(Status);
  const { body } = req;
  const userExists = await userRepo.findOne({ email: body.email });
  if (!userExists) {
    return res
      .status(400)
      .json({ errCode: 'User not found to resend verify mail', msg: res.__('User not found to resend verify mail') });
  }

  let statusDeleted = userStatus.DELETED
  const checkDeletedId = await statusRepo.findOne({
    where: { status: statusDeleted }
  });
  if (!checkDeletedId) {
    return res
      .status(400)
      .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
  }
  if (!userExists || userExists.statusId === checkDeletedId.id)
    return res.status(200).json({
      errCode: 'ERR_USER_NOT_EXIST',
      msg: res.__('ERR_USER_NOT_EXIST'),
    });
  let statusActive = userStatus.ACTIVE
  const checkActiveId = await statusRepo.findOne({
    where: { status: statusActive }
  });
  if (!checkActiveId) {
    return res
      .status(400)
      .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
  }
  if (userExists.statusId === checkActiveId.id)
    return res.status(200).json({
      errCode: 'ERR_ACC_ALREADY_VERIFIED',
      msg: res.__('ERR_ACC_ALREADY_VERIFIED'),
    });
  const updateOtp = {
    otpCode: generateOtp(4),
    otpCodeExpireTime: DateTime.local().plus({ hours: 3 }).toISO(),
  };
  let statusInactive = userStatus.INACTIVE
  const checkInactiveId = await statusRepo.findOne({
    where: { status: statusInactive }
  });
  if (!checkInactiveId) {
    return res
      .status(400)
      .json({ errCode: 'ERR_Status_Not_Defined_By_ADMIN', msg: res.__('ERR_Status_Not_Defined_By_ADMIN') });
  }
  await userRepo
    .update({ email: body.email, statusId: checkInactiveId.id }, updateOtp)
    .catch((err) => {
      console.log(err);
      return next(err);
    });
  emailQueueService().addToQueue(body.email, '', `OTP is ${updateOtp.otpCode}`);
  return res.status(200).json({ msg: res.__('VERIFICATION_MAIL_SENT') });
};

const forgotPassword = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const userRepo = getRepository(User);
  const { body } = req;
  const userExists = await userRepo
    .findOne({ email: body.email })
    .catch((err) => {
      logger.error('User not found to reset pw');
    });
  if (!userExists)
    return res.status(404).json({
      errCode: 'ERR_USER_NOT_EXIST',
      msg: res.__('ERR_USER_NOT_EXIST'),
    });
  const updateOtp = {
    otpCode: generateOtp(4),
    otpCodeExpireTime: DateTime.local().plus({ second: 59 }).toISO(),
  };
  const updateResult = await userRepo
    .update({ email: body.email }, updateOtp)
    .catch((err) => {
      console.log(err);
      return next(err);
    });

  emailQueueService().addToQueue(body.email, '', `OTP is ${updateOtp.otpCode}`);
  return res.status(200).json({
    msg: res.__('VERIFICATION_MAIL_SENT'),
  });
};

const resetPasswordByOtp = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const { email, otpCode, newPassword } = req.body;
  const userRepo = getRepository(User);
  try {
    const user = await userRepo.findOne({
      where: {
        email,
        otpCode,
      },
    });
    // check of user exists with otp
    if (!user) {
      return res.status(400).json({ msg: res.__('ERR_OTP_INVALID') });
    }

    const currentDT = moment();
    const expireDate = moment(user.otpCodeExpireTime.toString()).format();
    let isValid = currentDT.isBefore(expireDate, 'second');
    if (isValid) {
      const updateUser = {
        otpCode: 0,
        otpCodeExpireTime: '',
        password: bcryptService().password({ password: newPassword }),
      };
      await userRepo.update({ email }, updateUser);

      const resUser = {
        firstName: user.firstName,
        lastNAme: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userProfilePicture: user.avatar,
      };
      return res.status(200).json({ msg: res.__('PWD_RESET_SUCCESS') });
    }
    return res
      .status(401)
      .json({ errCode: 'ERR_OTP_INVALID', msg: res.__('ERR_OTP_INVALID') });
  } catch (err) {
    next(err);
  }
};

const passwordChange = async (req: any, res: any, next: NextFunction) => {
  const { oldPassword, password, repeatNewPassword } = req.body;
  const userRepo = getRepository(User);
  const { body } = req;
  let id = req.state.user.id;
  if (oldPassword && password && repeatNewPassword) {
    try {
      const user = await userRepo.findOne({ where: { id: id } });

      if (user) {
        // check password
        if (bcryptService().comparePassword(oldPassword, user.password)) {
          // check for new password and repeat password
          if (password === repeatNewPassword) {

            const userPassword: Partial<User> = {
              password: bcryptService().password(body)
            }
            const updateuserProfileEntity = await userRepo.update(id, userPassword);
            return res.status(201).json({ msg: 'success', data: { updateuserProfileEntity } });
          }
          return res.status(401).json({
            errCode: 'ERR_NewPassword_Must_be_Exactly_Same',
            msg: res.__('ERR_NewPassword_Must_be_Exactly_Same'),
          });

        }
        return res.status(401).json({
          errCode: 'ERR_Old_Password_Not_match',
          msg: res.__('ERR_Old_Password_Not_match'),
        });
      }

    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
  return res
    .status(400)
    .json({ msg: 'Bad Request: Invalid input' });
};

const otpvalid = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const { email, otpCode } = req.body;
  const userRepo = getRepository(User);
  try {
    const user = await userRepo.findOne({
      where: {
        email
      },
    });
    // check of user exists with otp
    if (!user) {
      return res.status(400).json({ msg: res.__('ERR_User_not_found_to_resend_verify_mail') });
    }
    console.log("8888888888888888888888data:", user.otpCode, +"req.body88888888", otpCode)
    if (user.otpCode != otpCode) {
      return res.status(400).json({ errCode: 'ERR_OTP_INVALID', msg: res.__('ERR_OTP_NOT_MATCH') });
    }
    const currentDT = moment();
    const expireDate = moment(user.otpCodeExpireTime.toString()).format();
    let isValid = currentDT.isBefore(expireDate, 'second');

    if (isValid) {
      return res.status(200).json({ msg: res.__('True') });
    }
    return res
      .status(401)
      .json({ errCode: 'ERR_OTP_INVALID', msg: res.__('ERR_Otp_Expired') });
  } catch (err) {
    next(err);
  }
};

export {
  register,
  login,
  verifyEmail,
  resendAccountVerifyEmail,
  forgotPassword,
  resetPasswordByOtp,
  passwordChange,
  otpvalid
};




