import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AdminPermission } from "@/lib/admin/rbac";
import { ADMIN_SESSION_COOKIE, getAdminSessionMaxAgeSeconds } from "@/lib/admin/auth-constants";
import { db } from "@/lib/db";

type RequestMeta = {
  ip?: string | null;
  userAgent?: string | null;
};

export type CurrentAdminSession = {
  sessionId: string;
  expiresAt: Date;
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    role: string;
    permissions: AdminPermission[];
    priority: number;
  };
};

function hashSessionToken(token: string) {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET is required for admin sessions.");
    }

    return createHmac("sha256", "free-arena-dev-auth-secret").update(token).digest("hex");
  }

  return createHmac("sha256", secret).update(token).digest("hex");
}

function normalizePermissions(value: unknown): AdminPermission[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((permission): permission is AdminPermission => typeof permission === "string");
}

function createSessionToken() {
  return randomBytes(48).toString("base64url");
}

export function getAdminSessionCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  };
}

export function getExpiredAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export async function createAdminSession(userId: string, meta: RequestMeta) {
  const token = createSessionToken();
  const maxAgeSeconds = getAdminSessionMaxAgeSeconds();
  const expiresAt = new Date(Date.now() + maxAgeSeconds * 1000);

  await db.adminSession.create({
    data: {
      userId,
      tokenHash: hashSessionToken(token),
      ip: meta.ip,
      userAgent: meta.userAgent,
      expiresAt,
    },
  });

  return {
    token,
    expiresAt,
  };
}

export async function getAdminSessionByToken(token: string | undefined | null) {
  if (!token) {
    return null;
  }

  try {
    const session = await db.adminSession.findUnique({
      where: { tokenHash: hashSessionToken(token) },
      include: {
        user: {
          include: {
            adminRole: true,
          },
        },
      },
    });

    if (!session || session.expiresAt <= new Date() || !session.user.isActive) {
      if (session) {
        await db.adminSession.delete({ where: { id: session.id } }).catch(() => null);
      }

      return null;
    }

    return {
      sessionId: session.id,
      expiresAt: session.expiresAt,
      user: {
        id: session.user.id,
        email: session.user.email,
        username: session.user.username,
        avatar: session.user.avatar,
        role: session.user.role,
        permissions: normalizePermissions(session.user.adminRole.permissions),
        priority: session.user.adminRole.priority,
      },
    } satisfies CurrentAdminSession;
  } catch {
    return null;
  }
}

export async function getCurrentAdminSession() {
  const cookieStore = await cookies();
  return getAdminSessionByToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function deleteAdminSessionByToken(token: string | undefined | null) {
  if (!token) {
    return;
  }

  await db.adminSession.deleteMany({
    where: {
      tokenHash: hashSessionToken(token),
    },
  });
}
