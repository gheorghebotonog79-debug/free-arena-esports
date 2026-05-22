import type { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import {
  adminError,
  adminJson,
  adminNotFound,
  readAdminJsonBody,
  writeSafeAdminAudit,
} from "@/lib/admin/api";
import { requireAdminApiAccess } from "@/lib/admin/guards";
import { getRequestIp } from "@/lib/admin/request";
import { validateVipInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "vip:read");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const vipPackage = await db.vipPackage.findUnique({ where: { id } });

  if (!vipPackage) {
    return adminNotFound("VipPackage");
  }

  return adminJson({ ok: true, package: vipPackage });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "vip:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateVipInput(body.body, { partial: true });

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const existing = await db.vipPackage.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("VipPackage");
  }

  const data = {
    ...validated.data,
    perks:
      validated.data.perks === undefined
        ? undefined
        : (validated.data.perks as Prisma.InputJsonValue),
  };

  const vipPackage = await db.vipPackage.update({
    data,
    where: { id },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "vip.update",
    target: "VipPackage",
    metadata: { id: vipPackage.id, changed: Object.keys(validated.data) },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, package: vipPackage });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "vip:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const existing = await db.vipPackage.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("VipPackage");
  }

  await db.vipPackage.delete({ where: { id } });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "vip.delete",
    target: "VipPackage",
    metadata: { id, name: existing.name },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, deleted: true });
}
