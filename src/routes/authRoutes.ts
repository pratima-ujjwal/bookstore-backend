// src/routes/authRoutes.ts
import express from 'express';
import { sendOtp, verifyOtpAndSignup } from '../controllers/authController';
import { login } from '../controllers/loginController';
import { authenticateToken } from '../middleware/authMiddleware';
import { changePassword, forgotPassword, resetPassword } from '../controllers/accountController';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpAndSignup);
router.post('/login', login);
router.post('/change-password', authenticateToken, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
