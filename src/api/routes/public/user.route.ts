import express from 'express';

import { login, register, verifyEmail, resendAccountVerifyEmail, forgotPassword, resetPasswordByOtp } from '../../controllers/user.controller';
import userValidator from '../../validators/user.schema';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('testpublic route');
});

/**
 * @swagger
 * /v1/public/user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: User registeration
 *     requestBody:
 *       description: user register body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 *                phoneNumber:
 *                  type: number
 *                password:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.post('/register', userValidator.register(), register);


/**
 * @swagger
 * /v1/public/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     requestBody:
 *       description: user loign body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.post('/login', userValidator.login(), login);


/**
 * @swagger
 * /v1/public/user/email/verify:
 *   put:
 *     tags:
 *       - User
 *     summary: Verify email
 *     requestBody:
 *       description: Req body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                email:
 *                  type: string
 *                otpCode:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.put('/email/verify', verifyEmail);


/**
 * @swagger
 * /v1/public/user/email/verify/resend:
 *   put:
 *     tags:
 *       - User
 *     summary: Resend verification email
 *     requestBody:
 *       description: Req body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                email:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.put('/email/verify/resend', resendAccountVerifyEmail);

/**
 * @swagger
 * /v1/public/user/password/forgot:
 *   put:
 *     tags:
 *       - User
 *     summary: Initiate forogot pw mail
 *     requestBody:
 *       description: Req body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                email:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.put('/password/forgot', forgotPassword);

/**
 * @swagger
 * /v1/public/user/password/forgot/reset:
 *   put:
 *     tags:
 *       - User
 *     summary: Initiate forogot pw mail
 *     requestBody:
 *       description: Req body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                email:
 *                  type: string
 *                otpCode:
 *                  type: number
 *                newPassword:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.put('/password/user/forgot/reset', resetPasswordByOtp);

export default router;
