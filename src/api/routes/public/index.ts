import express from 'express';
const router = express.Router();

// Import all public routes
import userRouter from "./user.route";

// Register all routes
router.use('/user', userRouter)

// Export router
export default router;
