import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRY = (process.env.JWT_EXPIRY ?? '1d') as SignOptions['expiresIn'];

export function generateToken(payload: object): string {
  const options: SignOptions = { expiresIn: JWT_EXPIRY };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}