import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import { signJWT } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email, password } = await req.json();
  const user = await User.findOne({ $or: [{ email }, { studentId: email }, { phone: email }] });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  if (!user.emailVerified) return NextResponse.json({ error: 'Email not verified' }, { status: 403 });
  const valid = await user.comparePassword(password);
  if (!valid) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  const token = signJWT({ userId: user._id, email: user.email, role: user.role });
  cookies().set('token', token, { httpOnly: true, secure: true, maxAge: 604800, path: '/' });
  return NextResponse.json({ user: { id: user._id, name: user.name, role: user.role, activationStatus: user.activationStatus, studentId: user.studentId } });
}
