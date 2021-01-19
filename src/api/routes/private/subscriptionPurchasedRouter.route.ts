import express from 'express';
import { subscriptionPurchasedCreate, updatesubscriptionPurchased, getsubscriptionPurchased } from '../../controllers/subscriptionPurchased.controller';
import userValidator from '../../validators/subscriptionPurchased.schema';
const router = express.Router();


/**
* @swagger
* /v1/private/subscriptionPurchased/create:
*   post:
*     tags:
*       - subscriptionPurchased
*     security:
*       - bearerAuth: []
*     summary: support create
*     requestBody:
*       description: subscriptionPurchased create
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 subcriptionPlanId:
*                  type: number
*                 transactionId:
*                  type: number
*                 statusId:
*                  type: number
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.post('/create', userValidator.subscriptionPurchased(), subscriptionPurchasedCreate);

/**
* @swagger
* /v1/private/subscriptionPurchased/update/{id}:
*   put:
*     tags:
*       - subscriptionPurchased
*     security:
*       - bearerAuth: []
*     summary: support update
*     requestBody:
*       description: subscriptionPurchased update
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 subcriptionPlanId:
*                  type: number
*                 transactionId:
*                  type: string
*                 statusId:
*                  type: number
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put('/update/:id', userValidator.subscriptionPurchased(), updatesubscriptionPurchased);

/**
* @swagger
* /v1/private/subscriptionPurchased/:
*   get:
*     tags:
*       - subscriptionPurchased
*     security:
*       - bearerAuth: []
*     summary: Get single getsubscriptionPurchased data
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/
router.get('/', getsubscriptionPurchased);
export default router;