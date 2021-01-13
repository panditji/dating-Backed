import express from 'express';
import { passwordChange } from '../../controllers/user.controller';
const router = express.Router();


/**
 * @swagger
 * /v1/private/user/changePassword:
 *   put:
 *     tags:
 *       - passwordChange
 *     security:
 *       - bearerAuth: []
 *     summary: User profile
 *     requestBody:
 *       description: user passwordChange
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                 oldPassword:
 *                  type: string
 *                 newPassword:
 *                  type: string
 *                 repeatNewPassword:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.put('/changePassword', passwordChange);

export default router;
