import express from 'express';
import { helpCreate, updateHelp, helpGetAll, helpDeleted } from '../../controllers/help.controller';
const router = express.Router();

/**
 * @swagger
 * /v1/private/help/create:
 *   post:
 *     tags:
 *       - help
 *     security:
 *       - bearerAuth: []
 *     summary: help
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: help create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                images:
 *                  type: json
 *                type:
 *                  type: string
 *                  enum:
 *                    - help
 *                    - policie
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.post("/create", helpCreate);

/**
* @swagger
* /v1/private/help/update/{id}:
*   put:
*     tags:
*       - help
*     security:
*       - bearerAuth: []
*     summary: Update help by id
*     parameters:
*        - in: path
*          name: id
*          schema:
*            type: integer
*          required: true
*          description: Numeric ID of the help to update
*        - $ref: '#/components/parameters/langQueryParam'
*     requestBody:
*       description: Request body
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                title:
*                  type: string
*                images:
*                  type: json
*                type:
*                  type: string
*                  enum:
*                    - help
*                    - policie
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put("/update/:id", updateHelp);

/**
* @swagger
* /v1/help/{type}:
*   get:
*     tags:
*       - help
*     security:
*       - bearerAuth: []
*     summary: Get all help
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/:type", helpGetAll);

/**
* @swagger
* /v1/private/help/delete/{id}:
*   delete:
*     tags:
*       - help
*     security:
*       - bearerAuth: []
*     summary: Delete help by help id
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Numeric ID of the help to be Deleted
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.delete("/delete/:id", helpDeleted);

export default router;