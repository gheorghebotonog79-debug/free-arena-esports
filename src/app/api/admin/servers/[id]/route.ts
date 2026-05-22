import { NextRequest } from "next/server";
import { adminError, adminJson, adminNotFound, readAdminJsonBody, writeSafeAdminAudit } from "@/lib/admin/api";
import { requireAdminApiAccess } from "@/lib/admin/guards";
import { getRequestIp } from "@/lib/admin/request";
import { validateServerInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "servers:read");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const server = await db.gameServer.findUnique({ where: { id } });

  if (!server) {
    return adminNotFound("GameServer");
  }

  return adminJson({ ok: true, server });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "servers:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateServerInput(body.body, { partial: true });

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const existing = await db.gameServer.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("GameServer");
  }

  const server = await db.gameServer.update({
    data: validated.data,
    where: { id },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "server.update",
    target: "GameServer",
    metadata: { id: server.id, changed: Object.keys(validated.data) },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, server });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "servers:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const existing = await db.gameServer.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("GameServer");
  }

  await db.gameServer.delete({ where: { id } });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "server.delete",
    target: "GameServer",
    metadata: { id, host: existing.host, port: existing.port },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, deleted: true });
}
