import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import PaymentTransaction from '@/models/PaymentTransaction';
import User from '@/models/User';
import Referral from '@/models/Referral';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const pending = await PaymentTransaction.find({ status: 'pending' }).populate('user', 'name email');
  return NextResponse.json(pending);
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const { transactionId, action } = await req.json();
  const tx = await PaymentTransaction.findById(transactionId);
  if (!tx) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (action === 'approve') {
    tx.status = 'verified';
    tx.verifiedAt = new Date();
    await tx.save();

    // Activate user
    const user = await User.findById(tx.user);
    if (user && user.activationStatus !== 'active') {
      user.activationStatus = 'active';
      await user.save();

      // Pay referral commission now
      const referral = await Referral.findOne({ referred: user._id, status: 'pending_activation' });
      if (referral) {
        const referrer = await User.findById(referral.referrer);
        if (referrer) {
          await User.findByIdAndUpdate(referrer._id, {
            $inc: { 'wallet.available': referral.commissionAmount, 'wallet.totalEarned': referral.commissionAmount }
          });
          referral.status = 'paid';
          await referral.save();
        }
      }
    }
  } else if (action === 'reject') {
    tx.status = 'rejected';
    await tx.save();
  }
  return NextResponse.json(tx);
}
