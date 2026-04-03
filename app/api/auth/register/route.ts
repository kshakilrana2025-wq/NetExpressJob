import { getOtp, deleteOtp } from '@/lib/otpStore';
// ...
const record = getOtp(email);
if (!record || record.otp !== otp) {
  return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
}
// after successful verification
deleteOtp(email);
