import express from "express";

import controller from "../../controllers/currency.controller";
import validate from "../../validators/currency.schema";

const router = express.Router();

router.post("/", validate.create(),  controller.create);

router.put("/:id", validate.update(),  controller.update);

router.get("/:id?", controller.get);

export default router;

/**
 * @swagger
 * /v1/private/currency:
 *   post:
 *     tags:
 *       - Currency
 *     security:
 *       - bearerAuth: []
 *     summary: Create currency
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                name:
 *                  type: string
 *                symbol:
 *                  type: string
 *                abbreviation:
 *                  type: string
 *                flag:
 *                  type: string
 *                isRoutingRequired:
 *                  type: boolean
 *             required:
 *                - name
 *                - symbol
 *                - abbreviation
 *                - flag
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 *   get:
 *     tags:
 *       - Currency
 *     security:
 *       - bearerAuth: []
 *     summary: Get All currencies
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */


 /**
 * @swagger
 * /v1/private/currency/{id}:
 *   put:
 *     tags:
 *       - Currency
 *     security:
 *       - bearerAuth: []
 *     summary: Update currency by id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the currency to update
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                name:
 *                  type: string
 *                symbol:
 *                  type: string
 *                abbreviation:
 *                  type: string
 *                flag:
 *                  type: string
 *                isRoutingRequired:
 *                  type: boolean
 *                status:
 *                  type: string
 *                  enum: [active/inactive/deleted]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 *   get:
 *     tags:
 *       - Currency
 *     security:
 *       - bearerAuth: []
 *     summary: Get currency by id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the timezone to get
 *        - $ref: '#/components/parameters/langQueryParam'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
