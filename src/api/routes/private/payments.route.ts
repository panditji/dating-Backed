import express from 'express';
import { paymentsCreate, updatepayments, getpayments } from '../../controllers/payments.controller';
import userValidator from '../../validators/payments.schema';
const router = express.Router();


/**
* @swagger
* /v1/private/payments/create:
*   post:
*     tags:
*       - payments
*     security:
*       - bearerAuth: []
*     summary: support create
*     requestBody:
*       description: payments create
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 venueId:
*                  type: number
*                  paymentType: string
*                  enum:
*                    - stripe
*                    - paypal
*                    - apple-pay
*                    - google-pay
*                 paymentApproved:
*                  type: boolean
*                 paymentDescription:
*                  type: string
*                 transactionId:
*                  type: number
*                 paidAmount:
*                  type: number
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.post('/create', userValidator.payment(), paymentsCreate);

/**
* @swagger
* /v1/private/payments/update/{id}:
*   put:
*     tags:
*       - payments
*     security:
*       - bearerAuth: []
*     summary: payments update
*     requestBody:
*       description: payments update
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 venueId:
*                  type: number
*                  paymentType: string
*                  enum:
*                    - stripe
*                    - paypal
*                    - apple-pay
*                    - google-pay
*                 paymentApproved:
*                  type: boolean
*                 paymentDescription:
*                  type: string
*                 transactionId:
*                  type: number
*                 paidAmount:
*                  type: number
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put('/update/:id', userValidator.payment(), updatepayments);

/**
* @swagger
* /v1/private/payments/:
*   get:
*     tags:
*       - payments
*     security:
*       - bearerAuth: []
*     summary: Get single getpayments data
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/
router.get('/', getpayments);
export default router;