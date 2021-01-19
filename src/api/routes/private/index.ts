import express from 'express';
const router = express.Router();

// Import all private routes

import timezoneRouter from './timezone.route';
import firstDateRouter from './idealFirstDate.route';
import expensiveFirstDateRouter from './expensiveFirstDate.route';
import userProfileRouter from './userProfile.route';
import userProfileCompletionRouter from './userProfileCompletion.route';

import userRouter from "./user.route";
import supportRouter from "./support.route";
import helpRouter from "./help.route";
import subscriptionPlansRouter from "./subscriptionPlans.route"
import matchingProfileRouter from "./matchingProfile.route"
import matchRouter from "./match.route"
import subscriptionPurchasedRouter from "./subscriptionPurchasedRouter.route"
import paymentsRouter from "./payments.route";
import venuesRouter from "./venues.route";
// Register all routes
router.use('/venues', venuesRouter)
router.use('/payments', paymentsRouter)
router.use('/subscriptionPurchased', subscriptionPurchasedRouter)
router.use('/match', matchRouter)
router.use('/matchingProfile', matchingProfileRouter)
router.use('/subscriptionPlans', subscriptionPlansRouter)
router.use('/help', helpRouter)
router.use('/support', supportRouter)
router.use('/user', userRouter)
router.use('/timezone', timezoneRouter);
router.use('/firstDate', firstDateRouter);
router.use('/expensiveDate', expensiveFirstDateRouter);
router.use('/userProfile', userProfileRouter);
router.use('/userProfileCompletion', userProfileCompletionRouter);

// Export router
export default router;
