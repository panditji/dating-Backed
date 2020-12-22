import express from 'express';
import {
  createOrganisation,
  getOrganisationById,
  deleteOrganisationById,
  updateOrganisationById,
  follow,
  unFollow,
  transfer,
} from '../../controllers/organisation.controller';

import { createBankAccount } from '../../controllers/bankAccounts.controller';
const router = express.Router();
/**
 * @swagger
 * /v1/private/test:
 *   get:
 *     tags:
 *       - Test
 *     security:
 *       - bearerAuth: []
 *     summary: test private path
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */

router.get('/test', (req: any, res) => {
  const user = req.state.user;
  res.status(200).json(user);
});
/**
 * @swagger
 * /v1/private/organisation:
 *   post:
 *     tags:
 *       - Organisation
 *     security:
 *       - bearerAuth: []
 *     summary: Create Organisation
 *     requestBody:
 *       description: create organisation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *                - name
 *                - isCompany
 *                - aboutTheOrganisation
 *             properties:
 *                name:
 *                  type: string
 *                isCompany:
 *                  type: number
 *                abn:
 *                  type:number
 *                aboutTheOrganisation:
 *                  type: string
 *                taxExamptOrganisation:
 *                  type: number
 *                imagePath:
 *                  type: string
 *                isPostalAddress:
 *                  type: boolean
 *                  default: false
 *                status:
 *                  type: string
 *                  enum: ['draft/published']
 *                companyAddress:
 *                  type: object
 *                  properties:
 *                     addressLine1:
 *                       type: string
 *                     addressLine2:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     postCode:
 *                       type: string
 *                postAddress:
 *                  type: object
 *                  properties:
 *                     addressLine1:
 *                       type: string
 *                     addressLine2:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     postCode:
 *                       type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.post('/', createOrganisation);
router.post('/transfer/:id', transfer);
/**
 * @swagger
 * /v1/private/organisation/transfer/{id}:
 *   post:
 *     tags:
 *       - Organisation
 *     security:
 *       - bearerAuth: []
 *     summary: Transfer Organisation
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the organisation
 *        - in: query
 *          name: userId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
/**
 * @swagger
 * /v1/private/organisation/{id}:
 *   get:
 *     tags:
 *       - Organisation
 *     security:
 *       - bearerAuth: []
 *     summary: get Organisation By ID
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: false
 *          description: Numeric ID of the organisation to get
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
/**
 * @swagger
 * /v1/private/organisation:
 *   get:
 *     tags:
 *       - Organisation
 *     security:
 *       - bearerAuth: []
 *     summary: get  all Organisations
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.get('/:id?', getOrganisationById);

/**
 * @swagger
 * /v1/private/organisation/{id}:
 *   delete:
 *     tags:
 *       - Organisation
 *     security:
 *       - bearerAuth: []
 *     summary: delete Organisation By ID
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the organisation to get
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.delete('/:id', deleteOrganisationById);
/**
 * @swagger
 * /v1/private/organisation/{id}:
 *   put:
 *     tags:
 *       - Organisation
 *     security:
 *       - bearerAuth: []
 *     summary: Update Organisation By Id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the organisation to update
 *     requestBody:
 *       description: Update organisation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                name:
 *                  type: string
 *                isCompany:
 *                  type: number
 *                abn:
 *                  type:number
 *                aboutTheOrganisation:
 *                  type: string
 *                taxExamptOrganisation:
 *                  type: number
 *                imagePath:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ['draft/published/deleted']
 *                companyAddress:
 *                  type: object
 *                  properties:
 *                     addressLine1:
 *                       type: string
 *                     addressLine2:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     postCode:
 *                       type: string
 *                     hash:
 *                       type: string
 *                postAddress:
 *                  type: object
 *                  properties:
 *                     addressLine1:
 *                       type: string
 *                     addressLine2:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     postCode:
 *                       type: string
 *                     hash:
 *                       type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.put('/:id', updateOrganisationById);
/**
 * @swagger
 * /v1/private/organisation/follow/{id}:
 *   post:
 *     tags:
 *       - Organisation
 *     security:
 *       - bearerAuth: []
 *     summary: follow  Organisation
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: false
 *          description: Numeric ID of the organisation to follow
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.post('/follow/:id', follow);

/**
 * @swagger
 * /v1/private/organisation/unfollow/{id}:
 *   post:
 *     tags:
 *       - Organisation
 *     security:
 *       - bearerAuth: []
 *     summary: Unfollow  Organisation
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: false
 *          description: Numeric ID of the organisation to unfollow
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         message: OK
 *         description: success
 */
router.post('/unfollow/:id', unFollow);

export default router;
