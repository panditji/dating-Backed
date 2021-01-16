import express from 'express';
import { matchCreate, matchGetAll, updateMatch } from '../../controllers/match.controller';
const router = express.Router();

/**
* @swagger
* /v1/private/match/create:
*   put:
*     tags:
*       - Match
*     security:
*       - bearerAuth: []
*     summary: Match create
*     requestBody:
*       description: Match create
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                 matchUserId:
*                  type: number
*                 type:
*                  type: string
*                  enum:
*                    - Matched You
*                    - Your Matches
*                 removeFromChat:
*                  type: string
*                 status:
*                  type: string
*                  enum:
*                    - Reject,
*                    - Love,
*                    - Feeling,
*                    - Nothing,
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.put('/create', matchCreate);

/**
* @swagger
* /v1/private/match/{type}:
*   get:
*     tags:
*       - Match
*     security:
*       - bearerAuth: []
*     summary: Get all Match use Matched You, Your Matches ,all
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/:type", matchGetAll);
export default router;