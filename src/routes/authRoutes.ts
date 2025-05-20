// src/routes/authRoutes.ts
import express from 'express';
import { sendOtp, verifyOtpAndSignup } from '../controllers/authController';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpAndSignup);

export default router;
