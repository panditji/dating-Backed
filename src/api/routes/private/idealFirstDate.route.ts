import express from 'express';
import { insertIdealFirstDate, updateIdealFirstDate, IdealFirstDateGetALL, IdealFirstDateDeleted } from '../../controllers/idealFirstDate';
const router = express.Router();

/**
 * @swagger
 * /v1/private/firstDate/IdealFirstDate:
 *   post:
 *     tags:
 *       - insertIdealFirstDate
 *     security:
 *       - bearerAuth: []
 *     summary: insertIdealFirstDate
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: insertIdealFirstDate
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                IdealFirstDate:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.post("/IdealFirstDate", insertIdealFirstDate);

/**
* @swagger
* /v1/private/firstDate/update/{id}:
*   put:
*     tags:
*       - insertIdealFirstDate
*     security:
*       - bearerAuth: []
*     summary: Update IdealFirstDate by id
*     parameters:
*        - in: path
*          name: id
*          schema:
*            type: integer
*          required: true
*          description: Numeric ID of the IdealFirstDate to update
*        - $ref: '#/components/parameters/langQueryParam'
*     requestBody:
*       description: Request body
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                IdealFirstDate:
*                  type: string
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put("/update/:id", updateIdealFirstDate);

/**
* @swagger
* /v1/private/firstDate:
*   get:
*     tags:
*       - insertIdealFirstDate
*     security:
*       - bearerAuth: []
*     summary: Get all payments
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/", IdealFirstDateGetALL);

/**
* @swagger
* /v1/private/firstDate/delete/{id}:
*   delete:
*     tags:
*       - insertIdealFirstDate
*     security:
*       - bearerAuth: []
*     summary: Delete IdealFirstDate by IdealFirstDate id
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Numeric ID of the IdealFirstDate to be Deleted
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.delete("/delete/:id", IdealFirstDateDeleted);

export default router;