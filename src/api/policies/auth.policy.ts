import JWTService from '../services/auth.service';
import { Request, Response, NextFunction } from "express";

// usually: "Authorization: Bearer [token]" or "token: [token]"
export default (req: any, res: any, next: any) => {
  let tokenToVerify;

  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
      }
    } else {
      return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
    }
  } else if (req.query.token) {
    tokenToVerify = req.query.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: 'No Authorization was found' });
  }

  return JWTService().verify(tokenToVerify, (err: any, thisToken: any) => {
    if (err) return res.status(401).json({ err });
    req.state = { user: thisToken };
    return next();
  });
};
