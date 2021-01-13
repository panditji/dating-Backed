import jwt from 'jsonwebtoken';

let secret: string = 'secret';
if(process.env.JWT_SECRET)
  secret = process.env.JWT_SECRET;

let expiresIn: number = 10800;
if (process.env.TOKEN_EXPIRY)
  expiresIn = parseInt(process.env.TOKEN_EXPIRY);


const authService = () => {
  const issue = (payload: any) => jwt.sign(payload, secret, { expiresIn });
  const verify = (token: string, cb: any) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};

export default authService;
