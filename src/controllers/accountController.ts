import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getSupabase } from '../config/supabase';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { generateOtp } from '../utils/otp';
import { storeOtp, validateOtp } from '../services/otpStore';
import { sendOtpEmail } from '../services/emailService';

export async function changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { currentPassword, newPassword, region } = req.body;
  const { id: userId } = req.user;

  if (!currentPassword || !newPassword || !region) {
    res.status(400).json({ error: 'currentPassword, newPassword, and region are required' });
    return;
  }

  const supabase = getSupabase(region);
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isMatch) {
    res.status(403).json({ error: 'Current password is incorrect' });
    return;
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  const { error: updateError } = await supabase
    .from('users')
    .update({ password_hash: hashed })
    .eq('id', userId);

  if (updateError) {
    res.status(500).json({ error: 'Failed to update password' });
    return;
  }

  res.json({ message: 'Password updated successfully' });
}

export async function forgotPassword(req: Request, res: Response): Promise<void> {
  const { email, region } = req.body;
  if (!email || !region) {
    res.status(400).json({ error: 'Email and region are required' });
    return;
  }

  const otp = generateOtp();
  storeOtp(email, otp);

  try {
    await sendOtpEmail(region, email, otp);
    res.json({ message: 'OTP sent to email for password reset' });
  } catch (err) {
    console.error(`[ForgotPassword]`, err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
  const { email, region, otp, newPassword } = req.body;

  if (!email || !region || !otp || !newPassword) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  if (!validateOtp(email, otp)) {
    res.status(400).json({ error: 'Invalid or expired OTP' });
    return;
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  const supabase = getSupabase(region);

  const { error } = await supabase
    .from('users')
    .update({ password_hash: hashed })
    .eq('email', email);

  if (error) {
    res.status(500).json({ error: 'Failed to update password' });
    return;
  }

  res.json({ message: 'Password has been reset successfully' });
}
