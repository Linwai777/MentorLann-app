import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Proxy runs BEFORE a page is rendered (Next.js 16 name for "middleware").
//
// Job: send guests away from members-only pages fast, before any page
// work is done. It only checks that a login cookie EXISTS; it does not
// check that the cookie is valid (that needs the database). So this is a
// quick first gate, not the real lock: the real check is requireUser()
// in each members-only layout (lib/session.ts).
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) {
    return NextResponse.next();
  }

  // No login cookie: go to log in, and remember the page they wanted
  // (path + query), e.g. /log-in?next=%2Fvlogs%2Fhow-to-start
  const { pathname, search } = request.nextUrl;
  const logIn = new URL("/log-in", request.url);
  logIn.searchParams.set("next", pathname + search);
  return NextResponse.redirect(logIn);
}

// Members-only sections. ":path*" = the page itself and everything under
// it (/vlogs and /vlogs/<slug>). Must be plain constants (read at build).
export const config = {
  matcher: ["/community/:path*", "/vlogs/:path*", "/courses/:path*"],
};
