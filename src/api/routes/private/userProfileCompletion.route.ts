import express from 'express';
import { userProfileCompletion, getuserProfileCompletion, usertomatch, getusertomatch } from '../../controllers/userProfileCompletion.controller';
import userValidator from '../../validators/userProfileCompletion.schema';
const router = express.Router();

/**
 * @swagger
 * /v1/private/userProfileCompletion/moreInfo:
 *   put:
 *     tags:
 *       - ProfileCompletion
 *     security:
 *       - bearerAuth: []
 *     summary: User profile Completion
 *     requestBody:
 *       description: user profile Completion
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                wantChildren:
 *                  type: string
 *                  enum: [No, Definitely, Someday]
 *                educationLevel:
 *                  type: string
 *                  enum: [High School, TAFE, Bachelors degree, Graduate degree, PhD]
 *                smoke:
 *                  type: string
 *                  enum: [No, Yes-sometimes, Yes-daily, Yes-trying to quit]
 *                myersBriggs:
 *                  type: string
 *                  enum: [No, INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ESFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP ]
 *                drink:
 *                  type: string
 *                  enum: [Never, Social drinker, Moderately, Regularly]
 *                idealFirstDate:
 *                  type: string
 *                whoPayFirstDay:
 *                  type: string
 *                  enum: [Men, Women, Split]
 *                expenseveFirstDateMaster:
 *                  type: string
 *                linkedIn:
 *                  type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.put('/moreInfo', userValidator.userProfileCompletion(), userProfileCompletion);


/**
* @swagger
* /v1/private/userProfileCompletion/getProfileComplition:
*   get:
*     tags:
*       - ProfileCompletion
*     security:
*       - bearerAuth: []
*     summary: Get ProfileCompletion
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/getProfileComplition", getuserProfileCompletion);
/**
 * @swagger
 * /v1/private/userProfileCompletion/usertomatch:
 *   put:
 *     tags:
 *       - ProfileCompletion
 *     security:
 *       - bearerAuth: []
 *     summary: User profile Completion usertomatch
 *     requestBody:
 *       description: user profile Completion usertomatch
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                heightMin:
 *                  type: number
 *                heightMax:
 *                  type: number
 *                ageMin:
 *                  type: number
 *                ageMax:
 *                  type: number
 *                wantChildren:
 *                  type: string
 *                  enum: [No, Definitely, Someday]
 *                educationLevel:
 *                  type: string
 *                  enum: [High School, TAFE, Bachelors degree, Graduate degree, PhD]
 *                myersBriggs:
 *                  type: string
 *                  enum: [No, INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ESFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP ]
 *                interestedGender:
 *                  type: string
 *                  enum: [Men, Women, Split]
 *                distanceMax:
 *                  type: number
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.put('/usertomatch', userValidator.lookingForProfileMatchQuestion(), usertomatch);


/**
* @swagger
* /v1/private/userProfileCompletion/usertomatch/matchDetail:
*   get:
*     tags:
*       - ProfileCompletion
*     security:
*       - bearerAuth: []
*     summary: Get ProfileCompletion usertomatch
*     parameters:
*       - $ref: '#/components/parameters/langQueryParam'
*     produces:
*       - application/json
*     responses:
*       200:
*         message: OK
*         description: success
*/

router.get("/usertomatch/matchDetail", getusertomatch);
export default router;
