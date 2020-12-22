import express from 'express';

import { search } from '../../controllers/user.controller';
const router = express.Router();

router.get('/:filter?', search);

/**
 * @swagger
 * /v1/private/user/{filter}:
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
export default router;
