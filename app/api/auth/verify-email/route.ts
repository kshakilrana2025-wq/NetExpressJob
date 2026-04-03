import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';

const otpStore = new Map();

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email, otp } = await req.json();
  const record = otpStore.get(email);
  if (!record || record.otp !== otp || record.expires < Date.now()) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }
  await User.findOneAndUpdate({ email }, { emailVerified: true });
  otpStore.delete(email);
  return NextResponse.json({ success: true });
}
