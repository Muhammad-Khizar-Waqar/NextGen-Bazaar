import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  await supabase.auth.getSession();

  // Check role from session or cookie
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.user_metadata?.role === 'admin';

  if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/account') && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
};