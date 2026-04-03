import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import PaymentTransaction from '@/models/PaymentTransaction';
import Setting from '@/models/Setting';
import { uploadToSupabase } from '@/lib/storage/supabase';

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();

  const formData = await req.formData();
  const method = formData.get('method') as string;
  const transactionId = formData.get('transactionId') as string;
  const screenshot = formData.get('screenshot') as File;

  if (!method || !transactionId || !screenshot) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const settings = await Setting.findOne();
  const requiredAmount = settings?.activationFee || 500;

  // Upload screenshot to Supabase
  const screenshotUrl = await uploadToSupabase(screenshot, `payments/${user._id}_${Date.now()}`);

  const transaction = await PaymentTransaction.create({
    user: user._id,
    method,
    transactionId,
    screenshotUrl,
    amount: requiredAmount,
    status: 'pending'
  });

  return NextResponse.json({ success: true, message: 'Payment submitted for verification' });
}
