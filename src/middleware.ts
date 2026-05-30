import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { ADMIN_SESSION_COOKIE } from "./lib/admin/auth-constants";

const intlMiddleware = createMiddleware(routing);

const rankingsRedirects: Record<string, string> = {
  "/rankings": "/ro/rankings",
};

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);

  return NextResponse.redirect(loginUrl);
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rankingsRedirectTarget = rankingsRedirects[pathname];

  if (rankingsRedirectTarget) {
    const targetUrl = new URL(rankingsRedirectTarget, request.url);

    return NextResponse.redirect(targetUrl, { status: 301 });
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
