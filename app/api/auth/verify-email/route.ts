import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email, otp } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!user.otp || user.otp !== otp || (user.otpExpires && new Date() > user.otpExpires)) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }

  await User.findOneAndUpdate(
    { email },
    { emailVerified: true, otp: null, otpExpires: null }
  );

  return NextResponse.json({ success: true });
}
