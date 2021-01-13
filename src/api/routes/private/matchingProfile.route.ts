import express from 'express';
import { matchingProfile } from '../../controllers/matchingProfile.controller';
const router = express.Router();



/**
 * @swagger
 * /v1/private/matchingProfile/:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     summary: search users
 *     parameters:
 *        - in: query
 *          name: filter
 *          schema:
 *            type: string
 *          required: false
 *          description: string on basis on which user are filtered
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.get('/', matchingProfile);

export default router;