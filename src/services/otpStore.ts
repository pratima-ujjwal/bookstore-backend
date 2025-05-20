const otpMap = new Map<string, { otp: string; expiresAt: number }>();

export function storeOtp(email: string, otp: string) {
  otpMap.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 minutes
}

export function validateOtp(email: string, inputOtp: string): boolean {
  const entry = otpMap.get(email);
  if (!entry || entry.expiresAt < Date.now()) return false;
  return entry.otp === inputOtp;
}
