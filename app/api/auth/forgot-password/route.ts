import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import { sendOTPEmail } from '@/lib/email/sendEmail';
import { setOtp } from '@/lib/otpStore';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  setOtp(`reset_${email}`, otp);
  await sendOTPEmail(email, otp);
  return NextResponse.json({ success: true });
}
