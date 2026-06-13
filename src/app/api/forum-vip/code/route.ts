import type { NextRequest } from "next/server";
import { adminError, adminJson, readAdminJsonBody } from "@/lib/admin/api";
import { requireForumVipApiKey } from "@/lib/forum-vip/api";
import { issueForumVipCode } from "@/lib/forum-vip/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const access = requireForumVipApiKey(request);

  if (!access.ok) {
    return access.response;
  }

  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  try {
    const result = await issueForumVipCode({
      ip: typeof body.body.ip === "string" ? body.body.ip : null,
      nickname: typeof body.body.nickname === "string" ? body.body.nickname : null,
      serverKey: typeof body.body.serverKey === "string" ? body.body.serverKey : null,
      steamId: typeof body.body.steamId === "string" ? body.body.steamId : null,
      subnet: typeof body.body.subnet === "string" ? body.body.subnet : null,
    });

    if (!result.ok) {
      return adminError(result.status, 400, result.errors);
    }

    return adminJson(result, 201);
  } catch {
    return adminError("forum_vip_code_failed", 500);
  }
}

