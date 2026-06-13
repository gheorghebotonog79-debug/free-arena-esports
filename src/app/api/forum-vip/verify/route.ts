import type { NextRequest } from "next/server";
import { adminError, adminJson, readAdminJsonBody } from "@/lib/admin/api";
import { requireForumVipApiKey } from "@/lib/forum-vip/api";
import { verifyForumVipCode } from "@/lib/forum-vip/service";

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

  const code = typeof body.body.code === "string" ? body.body.code : "";

  if (!code) {
    return adminError("validation_error", 400, ["code is required."]);
  }

  try {
    const result = await verifyForumVipCode(code);

    return adminJson(result);
  } catch {
    return adminError("forum_vip_verify_failed", 500);
  }
}

