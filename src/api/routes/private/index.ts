import express from 'express';
const router = express.Router();

// Import all private routes
import organisationRouter from './organisation.route';
import eventRouter from './event.route';
import bankAccountsRouter from './bank.route';
import timezoneRouter from './timezone.route';
import categoryRouter from './category.route';
import userRouter from './user.route';
import orgUserRouter from './organisationUser.route';
import currencyRouter from './currency.route';

// Register all routes
router.use('/organisation', organisationRouter);
router.use('/event', eventRouter);
router.use('/bankAccounts', bankAccountsRouter);
router.use('/timezone', timezoneRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/orgUser', orgUserRouter);
router.use('/currency', currencyRouter);

// Export router
export default router;
