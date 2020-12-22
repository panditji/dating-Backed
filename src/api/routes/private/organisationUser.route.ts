import express from 'express';

import {
  changeRole,
  getByRole,
} from '../../controllers/organisationUser.controller';
const router = express.Router();

router.post('/changeRole', changeRole);
router.get('/byRole', getByRole);

/**
 * @swagger
 * /v1/private/orgUser/changeRole:
 *   post:
 *     tags:
 *       - Organisation User
 *     security:
 *       - bearerAuth: []
 *     summary: Make Admin/Manger of organisation
 *     requestBody:
 *       description: change role
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                organisationId:
 *                  type: number
 *                userId:
 *                  type: number
 *                role:
 *                  type: string
 *                  enum: ['manager/admin']
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

/**
 * @swagger
 * /v1/private/orgUser/byRole:
 *   get:
 *     tags:
 *       - Organisation User
 *     security:
 *       - bearerAuth: []
 *     summary: get organisation user by Role
 *     parameters:
 *        - in: query
 *          name: orgId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the organisation
 *        - in: query
 *          name: role
 *          schema:
 *            type: string
 *          required: true
 *          description: role of organisation User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
export default router;
