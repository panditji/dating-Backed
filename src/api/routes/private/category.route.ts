import express from "express";

import controller from "../../controllers/category.controller";
import validate from "../../validators/category.schema";

const router = express.Router();

router.post("/", validate.create(),  controller.create);

router.put("/:id", validate.update(),  controller.update);

router.get("/:id?", controller.get);

router.delete("/:id", controller.remove);

export default router;

/**
 * @swagger
 * /v1/private/category:
 *   post:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Create category
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                categoryName:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 *   get:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Get All categories
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
 * /v1/private/category/{id}:
 *   put:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Update category by id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the category to update
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                categoryName:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 *   get:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Get category by id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the category to get
 *        - $ref: '#/components/parameters/langQueryParam'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 *   delete:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Delete category by id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the category to Delete
 *        - $ref: '#/components/parameters/langQueryParam'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */