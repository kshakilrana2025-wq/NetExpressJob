import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth/jwt';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = ['/', '/login', '/register', '/verify-email', '/forgot-password', '/subadmin-login'];
  if (publicPaths.includes(path) || path.startsWith('/_next') || path.startsWith('/api/auth') || path.includes('.')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decoded = verifyJWT(token);
  if (!decoded || typeof decoded === 'string') {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
