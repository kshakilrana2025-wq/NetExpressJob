import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import Referral from '@/models/Referral';
import SubAdmin from '@/models/SubAdmin';
import Setting from '@/models/Setting';
import { sendOTPEmail } from '@/lib/email/sendEmail';
import { generateReferralCode } from '@/lib/utils/helpers';

const otpStore = new Map();

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { name, email, password, ref, phone } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: 'Email exists' }, { status: 400 });

  let referredBy = null;
  let referrerRole = null;
  let commissionAmount = 0;
  if (ref) {
    const referrer = await User.findOne({ referralCode: ref });
    if (referrer) {
      referredBy = referrer._id;
      // check if referrer is a subadmin (trainer/team leader/etc.)
      const subadmin = await SubAdmin.findOne({ userId: referrer._id });
      if (subadmin) {
        referrerRole = subadmin.role;
        const settings = await Setting.findOne();
        const rates = settings?.referralCommissionRates || { trainer: 50, teamLeader: 75, seniorTeamLeader: 100 };
        if (referrerRole === 'trainer') commissionAmount = rates.trainer;
        else if (referrerRole === 'team_leader') commissionAmount = rates.teamLeader;
        else if (referrerRole === 'senior_team_leader') commissionAmount = rates.seniorTeamLeader;
      }
    }
  }

  const studentId = 'STU' + Date.now().toString().slice(-8);
  const referralCode = generateReferralCode();
  const user = await User.create({
    name, email, password, referralCode, referredBy,
    emailVerified: false,
    wallet: { available: 0, pending: 0, totalEarned: 0 },
    activationStatus: 'pending',
    studentId,
    phone
  });

  if (referredBy && commissionAmount > 0) {
    await Referral.create({
      referrer: referredBy,
      referred: user._id,
      referrerRoleAtTime: referrerRole,
      commissionAmount,
      status: 'pending_activation'
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });
  await sendOTPEmail(email, otp);

  return NextResponse.json({ message: 'OTP sent', studentId });
}
