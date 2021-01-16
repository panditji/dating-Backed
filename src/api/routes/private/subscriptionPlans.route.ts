import express from 'express';
import { subscriptionPlansCreate, updateSubscriptionPlans, subscriptionPlansGetAll, subscriptionDeleted } from '../../controllers/subscriptionPlans.controller';
import userValidator from '../../validators/subscriptionPlans.schema';
const router = express.Router();


/**
* @swagger
* /v1/private/subscriptionPlans/create:
*   post:
*     tags:
*       - subscriptionPlans
*     security:
*       - bearerAuth: []
*     summary: support create
*     requestBody:
*       description: subscriptionPlans create
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 name:
*                  type: string
*                 type:
*                  type: string
*                  enum:
*                    - Monthly
*                    - Quarterly
*                    - Yearly
*                 text:
*                  type: string
*                 price:
*                  type: double
*                 numberOfLove:
*                  type: number
*                 numberOfFiling:
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

router.post('/create', userValidator.subscriptionPlans(), subscriptionPlansCreate);

/**
* @swagger
* /v1/private/subscriptionPlans/update/{id}:
*   put:
*     tags:
*       - subscriptionPlans
*     security:
*       - bearerAuth: []
*     summary: support update
*     requestBody:
*       description: subscriptionPlans update
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 name:
*                  type: string
*                 type:
*                  type: string
*                  enum:
*                    - Monthly
*                    - Quarterly
*                    - Yearly
*                 text:
*                  type: string
*                 price:
*                  type: double
*                 numberOfLove:
*                  type: number
*                 numberOfFiling:
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

router.put('/update/:id', userValidator.subscriptionPlans(), updateSubscriptionPlans);

/**
* @swagger
* /v1/private/subscriptionPlans/:
*   get:
*     tags:
*       - subscriptionPlans
*     security:
*       - bearerAuth: []
*     summary: Get all subscriptionPlans
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/
router.get('/', subscriptionPlansGetAll);

/**
* @swagger
* /v1/private/help/delete/{id}:
*   put:
*     tags:
*       - subscriptionPlans
*     security:
*       - bearerAuth: []
*     summary: inactive/delete subscriptionPlans by subscriptionPlans id
*     requestBody:
*       description: subscriptionPlans status inactive/delete
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 statusId:
*                  type: number
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put("/delete/:id", subscriptionDeleted);

export default router;