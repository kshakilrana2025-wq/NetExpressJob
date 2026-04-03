import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  const fresh = await User.findById(user._id);
  return NextResponse.json(fresh?.wallet || { available: 0, pending: 0, totalEarned: 0 });
}
