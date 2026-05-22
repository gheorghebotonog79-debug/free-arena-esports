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
import { validateTournamentInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "tournaments:read");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const tournament = await db.tournament.findUnique({ where: { id } });

  if (!tournament) {
    return adminNotFound("Tournament");
  }

  return adminJson({ ok: true, tournament });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "tournaments:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateTournamentInput(body.body, { partial: true });

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const existing = await db.tournament.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("Tournament");
  }

  const tournament = await db.tournament.update({
    data: validated.data,
    where: { id },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "tournament.update",
    target: "Tournament",
    metadata: { id: tournament.id, changed: Object.keys(validated.data) },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, tournament });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "tournaments:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const existing = await db.tournament.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("Tournament");
  }

  await db.tournament.delete({ where: { id } });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "tournament.delete",
    target: "Tournament",
    metadata: { id, slug: existing.slug },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, deleted: true });
}
