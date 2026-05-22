import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-constants";
import { getAdminSessionByToken } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getAdminSessionByToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (!session) {
    return NextResponse.json(
      {
        ok: false,
        error: "unauthorized",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    ok: true,
    user: session.user,
    expiresAt: session.expiresAt.toISOString(),
  });
}
