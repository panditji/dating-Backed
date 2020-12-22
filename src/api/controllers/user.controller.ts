import { Request, Response, NextFunction } from 'express';
import { getRepository, Like } from 'typeorm';
import { DateTime } from 'luxon';
import moment from 'moment';

import bcryptService from '../services/bcrypt.service';
import authService from '../services/auth.service';
import emailQueueService from '../services/email-queue.service';
import { User, status as userStatus } from '../../entity/User';
import { generateOtp, logger } from '../utils';

const register = async (req: Request, res: any, next: NextFunction) => {
  try {
    const userRepo = getRepository(User);
    const { body } = req;
    body.password = bcryptService().password(body);
    // find existing user for enail and phone
    let whereQuery: any = [{ email: body.email }];
    if (body.phoneNumber) {
      whereQuery.push({ phoneNumber: body.phoneNumber });
    }
    const existingUser = await userRepo.findOne({
      where: whereQuery,
    });
    if (existingUser) {
      if (existingUser.email === body.email) {
        logger.error('ERR_DUPL_EMAIL');
        return res
          .status(400)
          .json({ errCode: 'ERR_DUPL_EMAIL', msg: res.__('ERR_DUPL_EMAIL') });
      } else if (
          body.phoneNumber &&
          existingUser.phoneNumber === body.phoneNumber
          ) {
        logger.error('ERR_DUPL_PHONE');
        return res
          .status(400)
          .json({ errCode: 'ERR_DUPL_PHONE', msg: res.__('ERR_DUPL_PHONE') });
      }
    }

    // set otp and expire time
    body.otpCode = generateOtp(4);
    body.otpCodeExpireTime = DateTime.local().plus({ hours: 3 }).toISO();
    const user = await userRepo.save(body);
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
  const { email, password } = req.body;
  const userRepo = getRepository(User);
  if (email && password) {
    try {
      const user = await userRepo.findOne({
        where: {
          email,
        },
      });

      if (!user || user.status === userStatus.DELETED) {
        return res.status(400).json({
          errCode: 'ERR_LOGIN_USER_NOT_FND',
          msg: res.__('ERR_LOGIN_USER_NOT_FND'),
        });
      }
      // add proper invalid pw msg
      if (bcryptService().comparePassword(password, user.password)) {
        // check for verified user
        if (user.status === userStatus.INACTIVE)
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
          userProfilePicture: user.userProfilePicture,
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
  const { email, otpCode } = req.body;
  const userRepo = getRepository(User);
  try {
    const user = await userRepo.findOne({
      where: {
        email,
        otpCode,
        status: userStatus.INACTIVE,
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
        status: userStatus.ACTIVE,
      };
      await userRepo.update({ email }, updateUser).catch((err) => {
        console.log(err);
        return next(err);
      });
      const token = authService().issue({ id: user.id });
      const resUser = {
        firstName: user.firstName,
        lastNAme: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userProfilePicture: user.userProfilePicture,
      };
      return res.status(200).json({ token, user: resUser });
    }
    return res.status(401).json({ msg: res.__('ERR_OTP_INVALID') });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const resendAccountVerifyEmail = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const userRepo = getRepository(User);
  const { body } = req;
  const userExists = await userRepo
    .findOne({ email: body.email })
    .catch((err) => {
      logger.error('User not found to resend verify mail');
    });
  if (!userExists || userExists.status === userStatus.DELETED)
    return res.status(200).json({
      errCode: 'ERR_USER_NOT_EXIST',
      msg: res.__('ERR_USER_NOT_EXIST'),
    });
  if (userExists.status === userStatus.ACTIVE)
    return res.status(200).json({
      errCode: 'ERR_ACC_ALREADY_VERIFIED',
      msg: res.__('ERR_ACC_ALREADY_VERIFIED'),
    });
  const updateOtp = {
    otpCode: generateOtp(4),
    otpCodeExpireTime: DateTime.local().plus({ hours: 3 }).toISO(),
  };
  await userRepo
    .update({ email: body.email, status: userStatus.INACTIVE }, updateOtp)
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
    return res.status(200).json({
      errCode: 'ERR_USER_NOT_EXIST',
      msg: res.__('ERR_USER_NOT_EXIST'),
    });
  const updateOtp = {
    otpCode: generateOtp(4),
    otpCodeExpireTime: DateTime.local().plus({ hours: 3 }).toISO(),
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
        userProfilePicture: user.userProfilePicture,
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

const search = async (req: Request, res: any, next: NextFunction) => {
  try {
    const filter = req.query.filter;
    const filteredUser = await getRepository(User).find({
      where: [
        { firstName: Like(`%${filter}%`), status: userStatus.ACTIVE },
        { lastName: Like(`%${filter}%`), status: userStatus.ACTIVE },
      ],
    });
    if (!filteredUser) {
      return res.status(401).json({ msg: 'No user Found' });
    }
    return res
      .status(201)
      .json({ msg: 'success', data: { users: filteredUser } });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

export {
  register,
  login,
  verifyEmail,
  resendAccountVerifyEmail,
  forgotPassword,
  resetPasswordByOtp,
  search,
};
