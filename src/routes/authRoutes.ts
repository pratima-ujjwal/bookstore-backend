// src/routes/authRoutes.ts
import express from 'express';
import { sendOtp, verifyOtpAndSignup } from '../controllers/authController';
import { login } from '../controllers/loginController';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpAndSignup);
router.post('/login', login);

export default router;
