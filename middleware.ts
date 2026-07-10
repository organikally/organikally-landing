import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// LANDING-ONLY LOCKDOWN (hotfix)
//
// Every user-facing route except the landing page ("/") is silently rerouted
// back to "/". No prompt, no error page, no message to the user — just a plain
// redirect. This intentionally hides /store, /journal, /recipes, /policies,
// /contact and anything added later.
//
// Kept in place across releases until explicitly asked to remove it.
// A 307 (temporary) redirect is used on purpose so browsers never cache the
// lockdown permanently once it is lifted.
// ─────────────────────────────────────────────────────────────────────────────
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // With `trailingSlash: true`, the landing page is exactly "/".
  if (pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url), 307);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all page navigations. Next internals, the API (the landing page and
  // SEO endpoints still need it), and static assets are excluded so the landing
  // page keeps rendering normally; the redirect above handles everything else.
  matcher: [
    '/((?!_next/static|_next/image|api/|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
