import { Request, Response } from 'express';
import { generateOtp } from '../utils/otp';
import { sendOtpEmail } from '../services/emailService';
import { storeOtp, validateOtp } from '../services/otpStore';
import { getSupabase } from '../config/supabase';
import bcrypt from 'bcrypt';


export async function sendOtp(req: Request, res: Response): Promise<void> {
  const { email, region } = req.body;
  if (!email || !region) {
    res.status(400).json({ error: 'Email and region are required' });
    return;
  }

  const otp = generateOtp();
  storeOtp(email, otp);

  try {
    await sendOtpEmail(region, email, otp);
    res.json({ message: 'OTP sent successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
}

export async function verifyOtpAndSignup(req: Request, res: Response): Promise<void> {
  const { email, otp, password, region, first_name, last_name } = req.body;
  const supabase = getSupabase(region);

  if (!validateOtp(email, otp)) {
    res.status(400).json({ error: 'Invalid or expired OTP' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from('users').insert({
    email,
    first_name,
    last_name,
    password_hash: hashedPassword,
    is_verified: true,
  }).select().single();

  if (error) {
    res.status(500).json({ error: 'User creation failed' });
    return;
  }

  res.json({ message: 'User created', user: data });
}
