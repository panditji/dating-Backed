import express from 'express';
import { supportCreate, suppportGetALL } from '../../controllers/support.controller';
const router = express.Router();

/**
* @swagger
* /v1/private/support/create:
*   put:
*     tags:
*       - support
*     security:
*       - bearerAuth: []
*     summary: support create
*     requestBody:
*       description: support create
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 type:
*                  type: string
*                  enum:
*                    - help
*                    - support
*                    - test
*                 message:
*                  type: string
*                 images:
*                  type: json
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put('/create', supportCreate);

/**
* @swagger
* /v1/private/support/:
*   get:
*     tags:
*       - support
*     security:
*       - bearerAuth: []
*     summary: Get all support
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/
router.get('/', suppportGetALL);
export default router;