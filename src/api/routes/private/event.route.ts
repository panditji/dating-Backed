import express from "express";

import eventController from "../../controllers/event.controller";
import validate from "../../validators/event.schema";

const router = express.Router();

/**
 * @swagger
 * /v1/private/event:
 *   post:
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     summary: Create event
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: user register body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                isPublic:
 *                  type: number
 *                eventName:
 *                  type: string
 *                eventAbout:
 *                  type: string
 *                currency:
 *                  type: number
 *                targetAmount:
 *                  type: number
 *                isPremiumPlacement:
 *                  type: number
 *                tags:
 *                  type: string
 *                startDate:
 *                  type: string
 *                endDate:
 *                  type: string
 *                location:
 *                  type: number
 *                status:
 *                  type: string
 *                  enum: ['saved/published']
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.post("/", validate.createEvent(),  eventController.createEvent);

/**
 * @swagger
 * /v1/private/event/{id}:
 *   put:
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     summary: Update event
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the event to update
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: user register body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                isPublic:
 *                  type: number
 *                eventName:
 *                  type: string
 *                eventAbout:
 *                  type: string
 *                currency:
 *                  type: number
 *                targetAmount:
 *                  type: number
 *                isPremiumPlacement:
 *                  type: number
 *                tags:
 *                  type: string
 *                startDate:
 *                  type: string
 *                endDate:
 *                  type: string
 *                location:
 *                  type: number
 *                status:
 *                  type: string
 *                  enum: ['saved/published/unpublished']
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.put("/:id", validate.updateEvent(),  eventController.updateEvent);

export default router;
