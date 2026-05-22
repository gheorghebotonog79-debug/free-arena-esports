import type { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import {
  adminConflict,
  adminError,
  adminJson,
  readAdminJsonBody,
  writeSafeAdminAudit,
} from "@/lib/admin/api";
import { requireAdminApiAccess } from "@/lib/admin/guards";
import { getRequestIp } from "@/lib/admin/request";
import { validateSettingInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "settings:read");

  if (access.response) {
    return access.response;
  }

  const settings = await db.systemSetting.findMany({
    orderBy: { key: "asc" },
  });

  return adminJson({ ok: true, settings });
}

export async function POST(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "settings:write");

  if (access.response) {
    return access.response;
  }

  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateSettingInput(body.body);

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const exists = await db.systemSetting.findUnique({
    where: { key: validated.data.key ?? "" },
  });

  if (exists) {
    return adminConflict("A setting with this key already exists.");
  }

  const setting = await db.systemSetting.create({
    data: {
      key: validated.data.key ?? "",
      value: validated.data.value as Prisma.InputJsonValue,
    },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "setting.create",
    target: "SystemSetting",
    metadata: { id: setting.id, key: setting.key },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, setting }, 201);
}
