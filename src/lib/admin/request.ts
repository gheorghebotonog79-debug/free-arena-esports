import { NextResponse } from "next/server";

export function getRequestIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null
  );
}

export function getRequestUserAgent(request: Request) {
  return request.headers.get("user-agent");
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  return origin === new URL(request.url).origin;
}

export function redirectToAdminLogin(request: Request, error?: string) {
  const url = new URL("/admin/login", request.url);

  if (error) {
    url.searchParams.set("error", error);
  }

  return NextResponse.redirect(url, 303);
}

export function readSafeAdminNextPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.startsWith("/admin")) {
    return "/admin/dashboard";
  }

  if (value.startsWith("/admin/login")) {
    return "/admin/dashboard";
  }

  return value;
}
