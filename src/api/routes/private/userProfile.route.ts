import express from 'express';
import { profile, getProfile, getAllProfile, avatar, pictures } from '../../controllers/userProfile.controller';
import userValidator from '../../validators/userProfile.schema';
const router = express.Router();

/**
 * @swagger
 * /v1/private/userProfile/detail:
 *   put:
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     summary: User profile
 *     requestBody:
 *       description: user profile body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                dob:
 *                  type: date
 *                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *                  example: "2019-05-17"
 *                gender:
 *                  type: string
 *                  enum: [Men, Women,Other]
 *                addressLine:
 *                  type: string
 *                city:
 *                  type: string
 *                state:
 *                  type: string
 *                country:
 *                  type: string
 *                postCode:
 *                  type: number
 *                latitude:
 *                  type: string
 *                longitude:
 *                  type: string
 *                interestedGender:
 *                  type: string
 *                  enum:
 *                    - Men
 *                    - Women
 *                    - Other
 *                AboutMe:
 *                  type: string 
 *                height:
 *                  type: number
 *                job:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.put('/detail', userValidator.userProfile(), profile);

/**
* @swagger
* /v1/private/userProfile/getsingle:
*   get:
*     tags:
*       - Profile
*     security:
*       - bearerAuth: []
*     summary: Get single profile data
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/getsingle", getProfile);

/**
* @swagger
* /v1/private/userProfile:
*   get:
*     tags:
*       - Profile
*     security:
*       - bearerAuth: []
*     summary: Get all profile
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/", getAllProfile);

/**
 * @swagger
 * /v1/private/userProfile/avatar:
 *   put:
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     summary: User profile
 *     requestBody:
 *       description: user profile avatar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                 avatar:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.put('/avatar', avatar);

/**
 * @swagger
 * /v1/private/userProfile/pictures:
 *   put:
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     summary: User profile
 *     requestBody:
 *       description: user profile pictures
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                 pictures:
 *                  type: json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.put('/pictures', pictures);



export default router;
