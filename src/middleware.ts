import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { ADMIN_SESSION_COOKIE } from "./lib/admin/auth-constants";

const intlMiddleware = createMiddleware(routing);

const rankingsRedirects: Record<string, string> = {
  "/rankings": "/ro/rankings",
};

const standalonePublicPaths = new Set(["/fivem"]);

const canonicalRedirects: Record<string, string> = {
  "/ro/fivem": "/fivem",
  "/en/fivem": "/fivem",
};

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);

  return NextResponse.redirect(loginUrl);
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const canonicalRedirectTarget = canonicalRedirects[pathname];
  const rankingsRedirectTarget = rankingsRedirects[pathname];

  if (canonicalRedirectTarget) {
    return NextResponse.redirect(new URL(canonicalRedirectTarget, request.url), { status: 301 });
  }

  if (rankingsRedirectTarget) {
    const targetUrl = new URL(rankingsRedirectTarget, request.url);

    return NextResponse.redirect(targetUrl, { status: 301 });
  }

  if (standalonePublicPaths.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/admin") {
    const target = request.cookies.has(ADMIN_SESSION_COOKIE) ? "/admin/dashboard" : "/admin/login";
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login" || pathname === "/admin/setup") {
      return NextResponse.next();
    }

    if (!request.cookies.has(ADMIN_SESSION_COOKIE)) {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
