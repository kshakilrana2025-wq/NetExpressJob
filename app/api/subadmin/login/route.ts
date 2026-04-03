import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import SubAdmin from '@/models/SubAdmin';
import { signJWT } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { accountType, subAdminId, password } = await req.json();
  const user = await User.findOne({ studentId: subAdminId, role: 'subadmin' });
  if (!user) return NextResponse.json({ error: 'Invalid ID' }, { status: 401 });
  const subadmin = await SubAdmin.findOne({ userId: user._id, role: accountType });
  if (!subadmin) return NextResponse.json({ error: 'Role mismatch' }, { status: 401 });
  const valid = await user.comparePassword(password);
  if (!valid) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  const token = signJWT({ userId: user._id, email: user.email, role: 'subadmin', subadminRole: accountType });
  cookies().set('token', token, { httpOnly: true, secure: true, maxAge: 604800, path: '/' });
  return NextResponse.json({ success: true, role: accountType });
}
