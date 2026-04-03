import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { getOtp, deleteOtp } from '@/lib/otpStore';

export async function POST(req: NextRequest) {
  const { email, otp, newPassword } = await req.json();
  const record = getOtp(`reset_${email}`);
  if (!record || record.otp !== otp) {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
  }
  await connectToDatabase();
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });
  deleteOtp(`reset_${email}`);
  return NextResponse.json({ success: true });
}
