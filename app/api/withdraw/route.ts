import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import Withdrawal from '@/models/Withdrawal';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  const { amount } = await req.json();
  if (amount < 10) return NextResponse.json({ error: 'Minimum 10 BDT' }, { status: 400 });
  if (user.wallet.available < amount) return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
  await User.findByIdAndUpdate(user._id, { $inc: { 'wallet.available': -amount, 'wallet.pending': amount } });
  const withdrawal = await Withdrawal.create({ user: user._id, amount });
  return NextResponse.json(withdrawal);
}
