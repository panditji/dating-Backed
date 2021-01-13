
let BasicStrategy = require('passport-http').BasicStrategy;
import passportLocal from 'passport-local';
import { Request, Response, NextFunction } from 'express';
 const authHelper = require('./auth.helper');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy=require('passport-google-oauth20').Strategy;

const AppleStrategy=require('passport-apple-token');
const LocalStrategy = passportLocal.Strategy

const path =require('path');
const fs=require('fs');
module.exports=(passport:any)=>{
//basic email & password login
  passport.use('basic',new BasicStrategy({passReqToCallback:true},
  async  (req: Request,username:any, password:any, done:any)=> {
  
    try {
      console.log("basic passport to check basic");
      // let result="im basic"
      return done(null, req);
    } catch (error) {
      console.log(error)
      return done(error,null);  
    }
    }
  ));
  
  //Google auth
  passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  async(accessToken:any, refreshToken:any, profile:any, done:any) =>{
    try {
      //business logic write later on
      // let result =await authHelper.getTokenForSocail(profile)
      return done(null, profile);
    } catch (error) {
      console.log("=====Error",error)
      return done(error,null);
      
    }
  }
  ));


  //facebook auth
  passport.use('facebook',new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v3.0',
   
  },async (accessToken:any, refreshToken:any, profile:any, done:any)=> {
    //console.log("accesstoken",accessToken);
    try {
      let result =await authHelper.getTokenForSocail(profile)
      return done(null, result);
    } catch (error) {
      console.log(error)
      return done(error,null);
      
    }
    
    
  }
));
}
