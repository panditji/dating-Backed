
const passport=require('passport');
import { Request, Response, NextFunction } from 'express';
passport.initialize();
 require('./passport.strategy')(passport);

module.exports=(req: Request, res: any, next: NextFunction)=>{
    let type=req.query.type || 'basic';
 return passport.authenticate(type, { session: false })(req,res,next);
}