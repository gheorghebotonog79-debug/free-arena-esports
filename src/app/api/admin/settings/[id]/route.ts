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
import { validateSettingInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "settings:read");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const setting = await db.systemSetting.findUnique({ where: { id } });

  if (!setting) {
    return adminNotFound("SystemSetting");
  }

  return adminJson({ ok: true, setting });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "settings:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateSettingInput(body.body, { partial: true });

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const existing = await db.systemSetting.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("SystemSetting");
  }

  const setting = await db.systemSetting.update({
    data: {
      ...validated.data,
      value:
        validated.data.value === undefined
          ? undefined
          : (validated.data.value as Prisma.InputJsonValue),
    },
    where: { id },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "setting.update",
    target: "SystemSetting",
    metadata: { id: setting.id, key: setting.key, changed: Object.keys(validated.data) },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, setting });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "settings:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const existing = await db.systemSetting.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("SystemSetting");
  }

  await db.systemSetting.delete({ where: { id } });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "setting.delete",
    target: "SystemSetting",
    metadata: { id, key: existing.key },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, deleted: true });
}
