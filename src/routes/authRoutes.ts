import express from 'express';
import { sendOtp, verifyOtpAndSignup } from '../controllers/authController';
import { login } from '../controllers/loginController';
import { changePassword, forgotPassword, resetPassword } from '../controllers/accountController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpAndSignup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', authenticateToken, changePassword);

export default router;