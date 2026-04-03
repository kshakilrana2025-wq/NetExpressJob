import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Setting from '@/models/Setting';

export async function GET() {
  await connectToDatabase();
  const settings = await Setting.findOne();
  return NextResponse.json(settings?.paymentMethods || { bKash: '01700000000', Nagad: '01700000000', Rocket: '01700000000' });
}
