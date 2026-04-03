import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import { sendOTPEmail } from '@/lib/email/sendEmail';

const otpStore = new Map();

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(`reset_${email}`, { otp, expires: Date.now() + 10 * 60 * 1000 });
  await sendOTPEmail(email, otp);
  return NextResponse.json({ success: true });
}
