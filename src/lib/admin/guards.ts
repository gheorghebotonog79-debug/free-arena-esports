import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { AdminPermission } from "@/lib/admin/rbac";
import { hasAdminPermission } from "@/lib/admin/rbac";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-constants";
import { isSameOriginRequest } from "@/lib/admin/request";
import { getAdminSessionByToken, requireAdminSession } from "@/lib/admin/session";

export async function requireAdminPageAccess(requiredPermission?: AdminPermission) {
  const session = await requireAdminSession();

  if (!requiredPermission) {
    return {
      allowed: true,
      requiredPermission,
      session,
    };
  }

  return {
    allowed: hasAdminPermission(session.user.permissions, requiredPermission),
    requiredPermission,
    session,
  };
}

export async function requireAdminApiAccess(
  request: NextRequest,
  requiredPermission?: AdminPermission,
) {
  if (request.method !== "GET" && !isSameOriginRequest(request)) {
    return {
      response: NextResponse.json({ ok: false, error: "csrf" }, { status: 403 }),
      session: null,
    };
  }

  const session = await getAdminSessionByToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (!session) {
    return {
      response: NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 }),
      session: null,
    };
  }

  if (requiredPermission && !hasAdminPermission(session.user.permissions, requiredPermission)) {
    return {
      response: NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 }),
      session,
    };
  }

  return {
    response: null,
    session,
  };
}
