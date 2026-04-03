import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import { signJWT } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Find user by email OR studentId OR phone
    const user = await User.findOne({
      $or: [{ email }, { studentId: email }, { phone: email }]
    });

    if (!user) {
      return NextResponse.json({ error: 'No account found with this email/ID' }, { status: 401 });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json({ error: 'Please verify your email first. Check your inbox for OTP.' }, { status: 403 });
    }

    // Check password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    // Generate JWT token
    const token = signJWT({
      userId: user._id,
      email: user.email,
      role: user.role,
      subadminRole: user.subadminRole
    });

    // Set cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        activationStatus: user.activationStatus,
        studentId: user.studentId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
