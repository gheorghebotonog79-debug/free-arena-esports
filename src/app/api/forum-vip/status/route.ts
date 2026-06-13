import type { NextRequest } from "next/server";
import { adminError, adminJson } from "@/lib/admin/api";
import { getOptionalQueryParam, requireForumVipApiKey } from "@/lib/forum-vip/api";
import { getForumVipStatus } from "@/lib/forum-vip/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const access = requireForumVipApiKey(request);

  if (!access.ok) {
    return access.response;
  }

  try {
    const result = await getForumVipStatus({
      ip: getOptionalQueryParam(request, "ip"),
      nickname: getOptionalQueryParam(request, "nickname"),
      serverKey: getOptionalQueryParam(request, "serverKey"),
      steamId: getOptionalQueryParam(request, "steamId"),
      subnet: getOptionalQueryParam(request, "subnet"),
    });

    if (!result.ok) {
      return adminError(result.status, 400, result.errors);
    }

    return adminJson(result);
  } catch {
    return adminError("forum_vip_status_failed", 500);
  }
}

