
let BasicStrategy = require('passport-http').BasicStrategy;
import passportLocal from 'passport-local';
import { Request, Response, NextFunction } from 'express';
const authHelper = require('./auth.helper');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-oauth20').Strategy;

const AppleStrategy = require('passport-apple-token');
const LocalStrategy = passportLocal.Strategy

const path = require('path');
const fs = require('fs');
module.exports = (passport: any) => {
  //basic email & password login
  passport.use('basic', new BasicStrategy({ passReqToCallback: true },
    async (req: Request, username: any, password: any, done: any) => {

      try {
        console.log("basic passport to check basic");
        // let result="im basic"
        return done(null, req);
      } catch (error) {
        console.log(error)
        return done(error, null);
      }
    }
  ));

  //   //Google auth
  //   passport.use(new GoogleTokenStrategy({
  //     clientID: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
  //   },
  //   async(accessToken:any, refreshToken:any, profile:any, done:any) =>{
  //     try {
  //       //business logic write later on
  //       // let result =await authHelper.getTokenForSocail(profile)
  //       return done(null, profile);
  //     } catch (error) {
  //       console.log("=====Error",error)
  //       return done(error,null);

  //     }
  //   }
  //   ));


  //   //facebook auth
  //   passport.use('facebook',new FacebookTokenStrategy({
  //     clientID: process.env.FACEBOOK_APP_ID,
  //     clientSecret: process.env.FACEBOOK_APP_SECRET,
  //     fbGraphVersion: 'v3.0',

  //   },async (accessToken:any, refreshToken:any, profile:any, done:any)=> {
  //     //console.log("accesstoken",accessToken);
  //     try {
  //       let result =await authHelper.getTokenForSocail(profile)
  //       return done(null, result);
  //     } catch (error) {
  //       console.log(error)
  //       return done(error,null);

  //     }


  //   }
  // ));
  // //apple auth
  // passport.use('apple',new AppleStrategy({
  //   clientID: process.env.APPLE_CLIENT_ID, // Services ID
  //   teamID: process.env.APPLE_TEAM_ID, // Team ID of your Apple Developer Account
  //   keyID: process.env.APPLE_KEY_ID, // Key ID, received from https://developer.apple.com/account/resources/authkeys/list
  //   key: fs.readFileSync(path.join(__dirname, '../../config', process.env.APPLE_KEY_FILE)), // Private key, downloaded from https://developer.apple.com/account/resources/authkeys/list
  //   scope: ['name', 'email'],
  //   callbackURL: process.env.APPLE_CALLBACK_URL
  // },
  // async(accessToken:any, refreshToken:any, profile:any, done:any) =>{
  //   try {
  //     console.log("result",profile)
  //     let result =await authHelper.getTokenForSocail(profile,true)

  //     return done(null, result);
  //   } catch (error) {
  //     console.log(error)
  //     return done(error,null);

  //   }
  // }
  // ));

}
