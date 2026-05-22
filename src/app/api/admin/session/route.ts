import { NextRequest } from "next/server";
import { adminError, adminJson } from "@/lib/admin/api";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-constants";
import { getAdminSessionByToken } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getAdminSessionByToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (!session) {
    return adminError("unauthorized", 401);
  }

  return adminJson({
    ok: true,
    user: session.user,
    expiresAt: session.expiresAt.toISOString(),
  });
}
