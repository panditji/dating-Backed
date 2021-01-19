import express from 'express';
import { insertVenues, VenuesGet, updateVenues, VenuesGetALL, VenuesDeleted } from '../../controllers/venues.controller';
const router = express.Router();

/**
 * @swagger
 * /v1/private/venues/create:
 *   post:
 *     tags:
 *       - venues
 *     security:
 *       - bearerAuth: []
 *     summary: venues
 *     parameters:
 *        - $ref: '#/components/parameters/langQueryParam'
 *     requestBody:
 *       description: venues
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                addressId:
 *                  type: number
 *                name:
 *                  type: string
 *                images:
 *                  type: json
 *                aboutVenue:
 *                  type: string
 *                abn:
 *                  type: number
 *                type:
 *                  type: string
 *                  enum: [Hotel]
 *                statusId:
 *                  type: number
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.post("/create", insertVenues);

/**
* @swagger
* /v1/private/venues/update/{id}:
*   put:
*     tags:
*       - venues
*     security:
*       - bearerAuth: []
*     summary: Update venues by id
*     parameters:
*        - in: path
*          name: id
*          schema:
*            type: integer
*          required: true
*          description: Numeric ID of the venues to update
*        - $ref: '#/components/parameters/langQueryParam'
*     requestBody:
*       description: Request body
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                addressId:
*                  type: number
*                name:
*                  type: string
*                images:
*                  type: json
*                aboutVenue:
*                  type: string
*                abn:
*                  type: number
*                type:
*                  type: string
*                  enum: [Hotel]
*                statusId:
*                  type: number
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put("/update/:id", updateVenues);


/**
* @swagger
* /v1/private/venues/{id}:
*   get:
*     tags:
*       - venues
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

router.get("/:id", VenuesGet);

/**
* @swagger
* /v1/private/venues:
*   get:
*     tags:
*       - venues
*     security:
*       - bearerAuth: []
*     summary: Get all venues
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/", VenuesGetALL);

/**
* @swagger
* /v1/private/venues/delete/{id}:
*   delete:
*     tags:
*       - venues
*     security:
*       - bearerAuth: []
*     summary: Delete venues by venues id
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Numeric ID of the venues to be Deleted
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.delete("/delete/:id", VenuesDeleted);

export default router;