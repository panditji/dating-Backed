import express from 'express';
import { insertExpensiveFirstDate, updateExpensiveFirstDate, ExpensiveFirstDateGetALL, ExpensiveFirstDateDeleted } from '../../controllers/expensiveFirstDate';
const router = express.Router();

/**
 * @swagger
 * /v1/private/expensiveDate/expensiveFirstDate:
 *   post:
 *     tags:
 *       - expensiveFirstDate
 *     security:
 *       - bearerAuth: []
 *     summary: expensiveFirstDate
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: insertIdealFirstDate
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                expensiveFirstDate:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.post("/expensiveFirstDate", insertExpensiveFirstDate);

/**
* @swagger
* /v1/private/expensiveDate/update/{id}:
*   put:
*     tags:
*       - expensiveFirstDate
*     security:
*       - bearerAuth: []
*     summary: Update expensiveFirstDate by id
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
*                expensiveFirstDate:
*                  type: string
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put("/update/:id", updateExpensiveFirstDate);

/**
* @swagger
* /v1/private/expensiveDate:
*   get:
*     tags:
*       - expensiveFirstDate
*     security:
*       - bearerAuth: []
*     summary: Get all expensiveDate
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/", ExpensiveFirstDateGetALL);

/**
* @swagger
* /v1/private/expensiveDate/delete/{id}:
*   delete:
*     tags:
*       - expensiveFirstDate
*     security:
*       - bearerAuth: []
*     summary: Delete expensiveDate by expensiveDate id
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Numeric ID of the expensiveDate to be Deleted
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.delete("/delete/:id", ExpensiveFirstDateDeleted);

export default router;