interface OtpRecord {
  otp: string;
  expires: number;
}

const store = new Map<string, OtpRecord>();

export function setOtp(key: string, otp: string, ttlMs = 10 * 60 * 1000) {
  store.set(key, { otp, expires: Date.now() + ttlMs });
}

export function getOtp(key: string): OtpRecord | undefined {
  const record = store.get(key);
  if (!record) return undefined;
  if (record.expires < Date.now()) {
    store.delete(key);
    return undefined;
  }
  return record;
}

export function deleteOtp(key: string) {
  store.delete(key);
}
