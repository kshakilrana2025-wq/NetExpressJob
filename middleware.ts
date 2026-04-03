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
  const isPublicPath = publicPaths.includes(path) || path.startsWith('/_next') || path.startsWith('/api/auth') || path.includes('.');

  if (isPublicPath) {
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

  // For dashboard routes, you can optionally check activation status by calling an API.
  // To keep middleware fast, we skip it here.

  return NextResponse.next();
}

// Export the middleware function as default
export default middleware;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
