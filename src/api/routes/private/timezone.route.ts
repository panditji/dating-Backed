import express from "express";

import controller from "../../controllers/timezone.controller";
import validate from "../../validators/timezone.schema";

const router = express.Router();

router.post("/", validate.create(),  controller.create);

router.put("/:id", validate.update(),  controller.update);

router.get("/:id?", controller.get);

router.delete("/:id", controller.remove);

export default router;

/**
 * @swagger
 * /v1/private/timezone:
 *   post:
 *     tags:
 *       - Timezone
 *     security:
 *       - bearerAuth: []
 *     summary: Create timezone
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                countryCode:
 *                  type: string
 *                latitude:
 *                  type: string
 *                logitude:
 *                  type: string
 *                utcOffset:
 *                  type: string
 *                text:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 *   get:
 *     tags:
 *       - Timezone
 *     security:
 *       - bearerAuth: []
 *     summary: Get All timezones
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
 * /v1/private/timezone/{id}:
 *   put:
 *     tags:
 *       - Timezone
 *     security:
 *       - bearerAuth: []
 *     summary: Update timezone by id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the timezone to update
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                countryCode:
 *                  type: string
 *                latitude:
 *                  type: string
 *                logitude:
 *                  type: string
 *                utcOffset:
 *                  type: string
 *                text:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 *   get:
 *     tags:
 *       - Timezone
 *     security:
 *       - bearerAuth: []
 *     summary: Get timezone by id
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
 *   delete:
 *     tags:
 *       - Timezone
 *     security:
 *       - bearerAuth: []
 *     summary: Delete timezone by id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the timezone to Delete
 *        - $ref: '#/components/parameters/langQueryParam'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */