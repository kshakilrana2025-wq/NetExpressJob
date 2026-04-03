import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth/jwt';

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // Public paths (no auth required)
  const publicPaths = ['/', '/login', '/register', '/verify-email', '/forgot-password', '/subadmin-login'];
  if (publicPaths.includes(path) || path.startsWith('/_next') || path.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify JWT (without database)
  const decoded = verifyJWT(token);
  if (!decoded || typeof decoded === 'string') {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  // For dashboard routes, check activation via API (optional, can be removed for simplicity)
  // To avoid complexity, we skip activation check in middleware and handle in each page.
  // But if you want to block unactivated users, add a fetch call here.

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
