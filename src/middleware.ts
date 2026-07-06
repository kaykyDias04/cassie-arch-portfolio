import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const session = request.cookies.get('admin-session');

    if (!session?.value) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      await jwtVerify(session.value, JWT_SECRET);
    } catch {
      // Token inválido ou expirado
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
