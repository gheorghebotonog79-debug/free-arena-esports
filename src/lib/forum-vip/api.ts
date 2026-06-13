import type { NextRequest } from "next/server";
import { adminError } from "@/lib/admin/api";
import { isForumVipApiAuthorized } from "@/lib/forum-vip/service";

export function requireForumVipApiKey(request: NextRequest) {
  const auth = isForumVipApiAuthorized(request.headers);

  if (!auth.configured) {
    return {
      ok: false as const,
      response: adminError("forum_vip_key_not_configured", 503),
    };
  }

  if (!auth.ok) {
    return {
      ok: false as const,
      response: adminError("unauthorized", 401),
    };
  }

  return {
    ok: true as const,
  };
}

export function getOptionalQueryParam(request: NextRequest, name: string) {
  return request.nextUrl.searchParams.get(name);
}

