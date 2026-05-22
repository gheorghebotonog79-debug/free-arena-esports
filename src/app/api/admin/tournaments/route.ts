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
import { validateTournamentInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "tournaments:read");

  if (access.response) {
    return access.response;
  }

  const tournaments = await db.tournament.findMany({
    orderBy: [{ startsAt: "desc" }, { updatedAt: "desc" }],
    take: 50,
  });

  return adminJson({ ok: true, tournaments });
}

export async function POST(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "tournaments:write");

  if (access.response) {
    return access.response;
  }

  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateTournamentInput(body.body);

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const exists = await db.tournament.findUnique({
    where: {
      slug: validated.data.slug ?? "",
    },
  });

  if (exists) {
    return adminConflict("A tournament with this slug already exists.");
  }

  const tournament = await db.tournament.create({
    data: {
      description: validated.data.description ?? null,
      endsAt: validated.data.endsAt ?? null,
      game: validated.data.game ?? "",
      prizePool: validated.data.prizePool ?? null,
      slug: validated.data.slug ?? "",
      startsAt: validated.data.startsAt ?? null,
      status: validated.data.status ?? "draft",
      title: validated.data.title ?? "",
    },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "tournament.create",
    target: "Tournament",
    metadata: { id: tournament.id, slug: tournament.slug },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, tournament }, 201);
}
