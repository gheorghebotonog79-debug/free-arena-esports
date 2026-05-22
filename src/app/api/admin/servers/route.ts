import { NextRequest } from "next/server";
import { adminConflict, adminError, adminJson, readAdminJsonBody, writeSafeAdminAudit } from "@/lib/admin/api";
import { requireAdminApiAccess } from "@/lib/admin/guards";
import { getRequestIp } from "@/lib/admin/request";
import { validateServerInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "servers:read");

  if (access.response) {
    return access.response;
  }

  const servers = await db.gameServer.findMany({
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });

  return adminJson({ ok: true, servers });
}

export async function POST(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "servers:write");

  if (access.response) {
    return access.response;
  }

  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateServerInput(body.body);

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const exists = await db.gameServer.findUnique({
    where: {
      host_port: {
        host: validated.data.host ?? "",
        port: validated.data.port ?? 0,
      },
    },
  });

  if (exists) {
    return adminConflict("A server with this host and port already exists.");
  }

  const server = await db.gameServer.create({
    data: {
      displayOrder: validated.data.displayOrder ?? 0,
      featured: validated.data.featured ?? false,
      game: validated.data.game ?? "",
      host: validated.data.host ?? "",
      maintenance: validated.data.maintenance ?? false,
      name: validated.data.name ?? "",
      port: validated.data.port ?? 27015,
    },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "server.create",
    target: "GameServer",
    metadata: { id: server.id, host: server.host, port: server.port },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, server }, 201);
}
