import { NextRequest, NextResponse } from "next/server";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-constants";
import { verifyAdminPassword } from "@/lib/admin/password";
import { checkAdminLoginRateLimit, clearAdminLoginRateLimit } from "@/lib/admin/rate-limit";
import {
  getRequestIp,
  getRequestUserAgent,
  isSameOriginRequest,
  readSafeAdminNextPath,
  redirectToAdminLogin,
} from "@/lib/admin/request";
import { createAdminSession, getAdminSessionCookieOptions } from "@/lib/admin/session";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function redirectWithError(request: NextRequest, error: string) {
  return redirectToAdminLogin(request, error);
}

async function writeSafeLoginAudit(input: Parameters<typeof writeAdminAuditLog>[0]) {
  await writeAdminAuditLog(input).catch(() => null);
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return redirectWithError(request, "csrf");
  }

  const ip = getRequestIp(request);
  const userAgent = getRequestUserAgent(request);

  try {
    const formData = await request.formData();
    const identifier = String(formData.get("identifier") ?? "").trim();
    const normalizedIdentifier = identifier.toLowerCase();
    const password = String(formData.get("password") ?? "");
    const nextPath = readSafeAdminNextPath(formData.get("next"));

    if (!identifier || !password) {
      return redirectWithError(request, "invalid");
    }

    const rateLimitKey = `${ip ?? "unknown"}:${normalizedIdentifier}`;
    const rateLimit = checkAdminLoginRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      await writeSafeLoginAudit({
        action: "auth.login.rate_limited",
        target: "AdminAuth",
        metadata: {
          identifier: normalizedIdentifier,
          retryAfterSeconds: rateLimit.retryAfterSeconds,
        },
        ip,
      });

      return redirectWithError(request, "rate_limit");
    }

    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: { equals: normalizedIdentifier, mode: "insensitive" } },
          { username: { equals: identifier, mode: "insensitive" } },
        ],
      },
      include: {
        adminRole: true,
      },
    });

    if (!user?.passwordHash || !user.isActive) {
      await writeSafeLoginAudit({
        action: "auth.login.failed",
        target: "AdminAuth",
        metadata: { identifier: normalizedIdentifier, reason: "missing-user-or-inactive" },
        ip,
      });

      return redirectWithError(request, "invalid");
    }

    const passwordIsValid = await verifyAdminPassword(password, user.passwordHash);

    if (!passwordIsValid) {
      await writeSafeLoginAudit({
        action: "auth.login.failed",
        target: "AdminAuth",
        metadata: { identifier: normalizedIdentifier, reason: "invalid-password" },
        ip,
      });

      return redirectWithError(request, "invalid");
    }

    clearAdminLoginRateLimit(rateLimitKey);

    const adminSession = await createAdminSession(user.id, { ip, userAgent });

    await db.user.update({
      data: {
        lastLoginAt: new Date(),
      },
      where: {
        id: user.id,
      },
    });

    await writeSafeLoginAudit({
      actorId: user.id,
      action: "auth.login",
      target: "User",
      metadata: { role: user.role },
      ip,
    });

    const response = NextResponse.redirect(new URL(nextPath, request.url), 303);
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      adminSession.token,
      getAdminSessionCookieOptions(adminSession.expiresAt),
    );

    return response;
  } catch {
    return redirectWithError(request, "server");
  }
}
