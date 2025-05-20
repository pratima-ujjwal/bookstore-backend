import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getSupabase } from '../config/supabase';
import { generateToken } from '../utils/jwt';

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password, region } = req.body;

  if (!email || !password || !region) {
    res.status(400).json({ error: 'Email, password, and region are required' });
    return;
  }

  const supabase = getSupabase(region);
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error || !user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  if (!user.is_verified) {
    res.status(403).json({ error: 'Email not verified' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    region,
  });

  res.json({ message: 'Login successful', token, user: { id: user.id, email: user.email, role: user.role } });
}
