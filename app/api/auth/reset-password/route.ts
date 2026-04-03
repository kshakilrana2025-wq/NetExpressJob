import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const otpStore = new Map();

export async function POST(req: NextRequest) {
  const { email, otp, newPassword } = await req.json();
  const record = otpStore.get(`reset_${email}`);
  if (!record || record.otp !== otp || record.expires < Date.now()) {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
  }
  await connectToDatabase();
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });
  otpStore.delete(`reset_${email}`);
  return NextResponse.json({ success: true });
}
