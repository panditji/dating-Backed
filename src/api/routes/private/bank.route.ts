import express from 'express';

import {
  createBankAccount,
  updateBankAccountDetails,
  getByOrganisationId,
} from '../../controllers/bankAccounts.controller';
const router = express.Router();

/**
 * @swagger
 * /v1/private/bankAccounts/{id}:
 *   post:
 *     tags:
 *       - BankAccounts
 *     security:
 *       - bearerAuth: []
 *     summary: Create Bank Account
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the organisation for which bank needs to be created
 *     requestBody:
 *       description: create bank Account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                stripeId:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.post('/:id', createBankAccount);
/**
 * @swagger
 * /v1/private/bankAccounts/{id}:
 *   put:
 *     tags:
 *       - BankAccounts
 *     security:
 *       - bearerAuth: []
 *     summary: update Bank Account
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the bank to be updated
 *     requestBody:
 *       description: update bank Account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *                - currency
 *                - routingNumber
 *             properties:
 *                stripeId:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.put('/:id', updateBankAccountDetails);
/**
 * @swagger
 * /v1/private/bankAccounts/{id}:
 *   get:
 *     tags:
 *       - BankAccounts
 *     security:
 *       - bearerAuth: []
 *     summary: get organisation bank account Details
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the organisation
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.get('/:id', getByOrganisationId);
export default router;
