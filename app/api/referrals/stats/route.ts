import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import Referral from '@/models/Referral';

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  const referrals = await Referral.find({ referrer: user._id }).populate('referred', 'email');
  const totalReferrals = referrals.length;
  const totalEarnings = referrals.reduce((sum, r) => sum + (r.status === 'paid' ? r.commissionAmount : 0), 0);
  return NextResponse.json({ totalReferrals, totalEarnings, referrals });
}
