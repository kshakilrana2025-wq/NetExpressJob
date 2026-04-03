import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthUser } from '@/lib/auth/middleware';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ['/', '/login', '/register', '/verify-email', '/forgot-password', '/subadmin-login'];
  if (publicPaths.includes(path) || path.startsWith('/_next') || path.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check activation for student users
  if (user.role === 'user' && user.activationStatus !== 'active' && !path.startsWith('/payments')) {
    return NextResponse.redirect(new URL('/payments', request.url));
  }

  // Subadmin routes protection
  if (path.startsWith('/subadmin') && user.role !== 'subadmin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (path.startsWith('/admin') && user.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
