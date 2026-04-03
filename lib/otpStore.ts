// lib/otpStore.ts
interface OtpRecord {
  otp: string;
  expires: number;
}

const otpStore = new Map<string, OtpRecord>();

export function setOtp(email: string, otp: string, expiresInMs: number = 10 * 60 * 1000) {
  otpStore.set(email, { otp, expires: Date.now() + expiresInMs });
}

export function getOtp(email: string): OtpRecord | undefined {
  const record = otpStore.get(email);
  if (record && record.expires < Date.now()) {
    otpStore.delete(email);
    return undefined;
  }
  return record;
}

export function deleteOtp(email: string) {
  otpStore.delete(email);
}
