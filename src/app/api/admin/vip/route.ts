import type { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { adminError, adminJson, readAdminJsonBody, writeSafeAdminAudit } from "@/lib/admin/api";
import { requireAdminApiAccess } from "@/lib/admin/guards";
import { getRequestIp } from "@/lib/admin/request";
import { validateVipInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "vip:read");

  if (access.response) {
    return access.response;
  }

  const packages = await db.vipPackage.findMany({
    orderBy: [{ enabled: "desc" }, { price: "asc" }, { name: "asc" }],
  });

  return adminJson({ ok: true, packages });
}

export async function POST(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "vip:write");

  if (access.response) {
    return access.response;
  }

  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateVipInput(body.body);

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const vipPackage = await db.vipPackage.create({
    data: {
      durationDays: validated.data.durationDays ?? 30,
      enabled: validated.data.enabled ?? true,
      name: validated.data.name ?? "",
      perks: (validated.data.perks ?? {}) as Prisma.InputJsonValue,
      price: validated.data.price ?? "0",
    },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "vip.create",
    target: "VipPackage",
    metadata: { id: vipPackage.id, name: vipPackage.name },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, package: vipPackage }, 201);
}
