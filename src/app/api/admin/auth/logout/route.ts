import { NextRequest, NextResponse } from "next/server";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-constants";
import { getRequestIp, isSameOriginRequest, redirectToAdminLogin } from "@/lib/admin/request";
import {
  deleteAdminSessionByToken,
  getAdminSessionByToken,
  getExpiredAdminSessionCookieOptions,
} from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return redirectToAdminLogin(request, "csrf");
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = await getAdminSessionByToken(token);

  if (session) {
    await writeAdminAuditLog({
      actorId: session.user.id,
      action: "auth.logout",
      target: "User",
      metadata: { sessionId: session.sessionId },
      ip: getRequestIp(request),
    }).catch(() => null);
  }

  await deleteAdminSessionByToken(token).catch(() => null);

  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, "", getExpiredAdminSessionCookieOptions());

  return response;
}
