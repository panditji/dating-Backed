import { Request, Response, NextFunction } from 'express';
import { getRepository, Like } from 'typeorm';
import { DateTime } from 'luxon';
import moment from 'moment';

import bcryptService from '../services/bcrypt.service';
import authService from '../services/auth.service';
import emailQueueService from '../services/email-queue.service';
import { User, } from '../../entity/User';
//import { User, status as userStatus } from '../../entity/User';
import { generateOtp, logger } from '../utils';


const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const TOKEN_LIFE = process.env.TOKEN_LIFE;
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE
const EMAIL_VARIFICATION = process.env.EMAIL_VARIFICATION;

//  register //login/ otp veryfy/  resend otp/token

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
  console.log("hello");
  // const { email, password } = req.body;
  console.log("email:", req.body.email + " " + "password:", req.body.password);
  let email = req.body.email;
  let password = req.body.password;
  const userRepo = getRepository(User);
  if (email && password) {
    try {
      const user = await userRepo.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({
          errCode: 'ERR_LOGIN_USER_NOT_FND',
          msg: res.__('ERR_LOGIN_USER_NOT_FND'),
        });
      }
      // add proper invalid pw msg
      if (bcryptService().comparePassword(password, user.password)) {
        // check for verified user
        // if (user.status === userStatus.INACTIVE)
        //   return res.status(401).json({
        //     errCode: 'ERR_LOGIN_EMAIL_UNVERIFIED',
        //     msg: res.__('ERR_LOGIN_EMAIL_UNVERIFIED'),
        //   });

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

// const verifyEmail = async (req: Request, res: any, next: NextFunction) => {
//   const { email, otpCode } = req.body;
//   const userRepo = getRepository(User);
//   try {
//     const user = await userRepo.findOne({
//       where: {
//         email,
//         otpCode,
//         status: userStatus.INACTIVE,
//       },
//     });
//     // check of user exists with otp
//     if (!user) {
//       return res.status(400).json({ msg: res.__('ERR_OTP_INVALID') });
//     }

//     const currentDT = moment();
//     const expireDate = moment(user.otpCodeExpireTime.toString()).format();
//     let isValid = currentDT.isBefore(expireDate, 'second');
//     if (isValid) {
//       const updateUser = {
//         otpCode: 0,
//         otpCodeExpireTime: '',
//         status: userStatus.ACTIVE,
//       };
//       await userRepo.update({ email }, updateUser).catch((err) => {
//         console.log(err);
//         return next(err);
//       });
//       const token = authService().issue({ id: user.id });
//       const resUser = {
//         firstName: user.firstName,
//         lastNAme: user.lastName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         userProfilePicture: user.avatar,
//       };
//       return res.status(200).json({ token, user: resUser });
//     }
//     return res.status(401).json({ msg: res.__('ERR_OTP_INVALID') });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ msg: 'Internal server error' });
//   }
// };

// const resendAccountVerifyEmail = async (
//   req: Request,
//   res: any,
//   next: NextFunction
// ) => {
//   const userRepo = getRepository(User);
//   const { body } = req;
//   const userExists = await userRepo
//     .findOne({ email: body.email })
//     .catch((err) => {
//       logger.error('User not found to resend verify mail');
//     });
//   if (!userExists || userExists.status === userStatus.DELETED)
//     return res.status(200).json({
//       errCode: 'ERR_USER_NOT_EXIST',
//       msg: res.__('ERR_USER_NOT_EXIST'),
//     });
//   if (userExists.status === userStatus.ACTIVE)
//     return res.status(200).json({
//       errCode: 'ERR_ACC_ALREADY_VERIFIED',
//       msg: res.__('ERR_ACC_ALREADY_VERIFIED'),
//     });
//   const updateOtp = {
//     otpCode: generateOtp(4),
//     otpCodeExpireTime: DateTime.local().plus({ hours: 3 }).toISO(),
//   };
//   await userRepo
//     .update({ email: body.email, status: userStatus.INACTIVE }, updateOtp)
//     .catch((err) => {
//       console.log(err);
//       return next(err);
//     });
//   emailQueueService().addToQueue(body.email, '', `OTP is ${updateOtp.otpCode}`);
//   return res.status(200).json({ msg: res.__('VERIFICATION_MAIL_SENT') });
// };

// const forgotPassword = async (
//   req: Request,
//   res: any,
//   next: NextFunction
// ) => {
//   const userRepo = getRepository(User);
//   const { body } = req;
//   const userExists = await userRepo
//     .findOne({ email: body.email })
//     .catch((err) => {
//       logger.error('User not found to reset pw');
//     });
//   if (!userExists)
//     return res.status(200).json({
//       errCode: 'ERR_USER_NOT_EXIST',
//       msg: res.__('ERR_USER_NOT_EXIST'),
//     });
//   const updateOtp = {
//     otpCode: generateOtp(4),
//     otpCodeExpireTime: DateTime.local().plus({ hours: 3 }).toISO(),
//   };
//   const updateResult = await userRepo
//     .update({ email: body.email }, updateOtp)
//     .catch((err) => {
//       console.log(err);
//       return next(err);
//     });

//   emailQueueService().addToQueue(body.email, '', `OTP is ${updateOtp.otpCode}`);
//   return res.status(200).json({
//     msg: res.__('VERIFICATION_MAIL_SENT'),
//   });
// };

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

// const search = async (req: Request, res: any, next: NextFunction) => {
//   try {
//     const filter = req.query.filter;
//     const filteredUser = await getRepository(User).find({
//       where: [
//         { firstName: Like(`%${filter}%`), status: userStatus.ACTIVE },
//         { lastName: Like(`%${filter}%`), status: userStatus.ACTIVE },
//       ],
//     });
//     if (!filteredUser) {
//       return res.status(401).json({ msg: 'No user Found' });
//     }
//     return res
//       .status(201)
//       .json({ msg: 'success', data: { users: filteredUser } });
//   } catch (error) {
//     logger.error(error);
//     return next(error);
//   }
// };

exports.getTokenForSocail = async (profile: any, isApple: any) => {
  try {
    if (isApple) {
      profile['provider'] = 'apple';
    }
    let user = {
      providerId: profile.id,
      provider: profile.provider
    }
    const userRepo = getRepository(User);

    const result = await userRepo.findOne({
      where: {
        user,
      },
    });
    if (result) {


      // const user['email','id']=result


    } else {
      //   let email;
      //   if(isApple){
      //     email=profile.email
      //   }else{
      //   if(profile.emails && profile.emails[0] ) 
      //   {
      //   email=profile.emails[0].value
      //   }
      //   }
      //   user['email']=email
      //   user['isVarify']=true;
      //   let data=await User.create(user);

      //   user["id"]=data.id;
    }
    // return this.getLoginTokenObj({username:user.username,id:user.id});
  } catch (err) {
    console.log("Err", err)
    throw (err.AppEror(err.message))
  }

}

export {
  register,
  login,
  // verifyEmail,
  // resendAccountVerifyEmail,
  // forgotPassword,
  resetPasswordByOtp,
  // search,
};

//end
// exports.getToken= async  (username,password,countryCode)=> {
//     const user = await this.authenticate( username, password,countryCode );
//     if (user && !user.status) {
//       if(user.notVarify){
//         throw (error.CustomError(i18n.__("NOT_VARIFIED"),424))
//       }else
//         throw (error.CustomError(user.message,403))

//     }

//   return this.getLoginTokenObj({username:user.user.username,id:user.user.id});

// }
// exports.getLoginTokenObj=(user)=>{
//   let token=this.createToken(user,SECRET_KEY,TOKEN_LIFE);

//     let refresh_token=this.createToken(user,REFRESH_SECRET_KEY,REFRESH_TOKEN_LIFE)


//     return {success:true,access_token:token,refresh_token:refresh_token}
// }


// exports.getRefreshToken= async  (req, res, next)=> {
//     const { token } = req.body;

//     if (!token) {
//         throw (error.CustomError(i18n.__("EMPTY_TOKEN"),401))
//     }

//     // if (!refreshTokens.includes(token)) {
//     //     return res.sendStatus(403);
//     // }

//     jwt.verify(token, REFRESH_SECRET_KEY, (err, user) => {
//         console.log(err,user,REFRESH_SECRET_KEY)
//         if (err) {
//             throw (error.CustomError(err.message,403))
//         }

//         let token=this.createToken({username:user.username,id:user.id},SECRET_KEY,TOKEN_LIFE);
//         console.log("token",token)
//         res.json({success:true,refresh_token:token});
//   })
// }

// exports.getTokenForSocail=async(profile,isApple)=>{
//   try {
//     if(isApple){
//       profile['provider']='apple';
//     }
//      let  user={
//       providerId:profile.id,
//       provider:profile.provider
//   }  
//     let result=await User.findOne({
//         limit: 1,
//         raw:true,
//         where:user

//     })
//     if(result){
//       user['username']=result.username,
//       user["id"]=result.id;

//     }else{
//       let email;
//       if(isApple){
//         email=profile.email
//       }else{
//       if(profile.emails && profile.emails[0] ) 
//       {
//       email=profile.emails[0].value
//       }
//       }
//       user['email']=email
//       user['isVarify']=true;
//       let data=await User.create(user);

//       user["id"]=data.id;
//     }
//     return this.getLoginTokenObj({username:user.username,id:user.id});
//   }catch(err){
//     console.log("Err",err)
//     throw (error.AppEror(err.message))
//   }

// }
// exports.authenticate=async (username, password,countryCode )=>{
//    try {
//        let message=i18n.__("INVALID_USERNAME");
//     let result=await User.findOne({
//         limit: 1,
//         raw:true,
//         where:{
//             username:username,
//             countryCode:countryCode
//         },

//     })

//     if((result ) ){
//       if(EMAIL_VARIFICATION=="true" && !result.isVarify){
//         return {notVarify:true,status:false} 

//       }

//           let user=result;
//           let hashpassword =user.password;
//           let isPasswordValid=await utils.validatePassword(password,hashpassword)
//           if(isPasswordValid){
//             const {password, ...other}=user;
//               return {status:true,notVarify:false,user:other};
//           }else{
//             message=i18n.__('INVALID_PASSWORD');
//           }
//         // }else{
//         //   return {notVarify:true,status:false}
//         // }
//     }
//     return  {status:false,message:message}
//    } catch (error) {

//        return {status:false,message:error}

//    }



// }
// exports.createToken=(user,secret_key,expiresIn)=>{
//     const token = jwt.sign(user, secret_key,{expiresIn:expiresIn})
//     return token;}
// exports.getForgotSecret = (password,createdAt) => {
//     const secret = password + "-" + createdAt;
//     return secret;

//   }
//   exports.varifyResetToken =async (token,secret) => {

//     if (token) {
//       try {
//         return jwt.verify(token, secret)
//       } catch (err) {
//         throw (error.CustomError(err.message,403))
//       }

//     } else {
//         throw (error.CustomError(i18n.__("EMPTY_TOKEN"),401))
//     }
//   };


