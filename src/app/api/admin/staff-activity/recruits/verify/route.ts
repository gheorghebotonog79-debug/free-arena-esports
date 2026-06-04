import type { NextRequest } from "next/server";
import { adminError, adminJson, readAdminJsonBody, writeSafeAdminAudit } from "@/lib/admin/api";
import { requireAdminApiAccess } from "@/lib/admin/guards";
import { getRequestIp } from "@/lib/admin/request";
import { verifyPendingRecruits } from "@/lib/admin-monitor/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "staffActivity:write");

  if (access.response) {
    return access.response;
  }

  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const limit = Number(body.body.limit ?? 25);

  if (!Number.isFinite(limit) || limit < 1) {
    return adminError("validation_error", 400, ["limit must be a positive number."]);
  }

  const result = await verifyPendingRecruits(limit);

  await writeSafeAdminAudit({
    action: "adminMonitor.recruits.verify",
    actorId: access.session.user.id,
    ip: getRequestIp(request),
    metadata: result,
    target: "AdminMonitorRecruit",
  });

  return adminJson({
    ok: true,
    result,
  });
}
