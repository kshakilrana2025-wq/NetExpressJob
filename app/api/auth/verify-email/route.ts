import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import { getOtp, deleteOtp } from '@/lib/otpStore';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email, otp } = await req.json();
  const record = getOtp(email);
  if (!record || record.otp !== otp) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }
  await User.findOneAndUpdate({ email }, { emailVerified: true });
  deleteOtp(email);
  return NextResponse.json({ success: true });
}
