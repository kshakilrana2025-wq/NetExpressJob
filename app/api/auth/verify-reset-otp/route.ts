import { NextRequest, NextResponse } from 'next/server';
import { getOtp } from '@/lib/otpStore';

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  const record = getOtp(`reset_${email}`);
  if (!record || record.otp !== otp) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
