import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeAdminAuditLog } from "@/lib/admin/audit";

export const ADMIN_API_NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0, must-revalidate",
  Expires: "0",
  Pragma: "no-cache",
};

export function adminJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    headers: ADMIN_API_NO_STORE_HEADERS,
    status,
  });
}

export function adminError(error: string, status = 400, details?: string[]) {
  return NextResponse.json(
    {
      ok: false,
      error,
      ...(details?.length ? { details } : {}),
    },
    {
      headers: ADMIN_API_NO_STORE_HEADERS,
      status,
    },
  );
}

export async function readAdminJsonBody(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return {
        ok: false as const,
        response: adminError("invalid_body", 400, ["Request body must be a JSON object."]),
      };
    }

    return {
      ok: true as const,
      body: body as Record<string, unknown>,
    };
  } catch {
    return {
      ok: false as const,
      response: adminError("invalid_json", 400, ["Request body is not valid JSON."]),
    };
  }
}

export async function writeSafeAdminAudit(input: {
  actorId?: string | null;
  action: string;
  target: string;
  metadata?: Prisma.InputJsonValue;
  ip?: string | null;
}) {
  await writeAdminAuditLog(input).catch(() => null);
}

export function adminNotFound(entity: string) {
  return adminError("not_found", 404, [`${entity} was not found.`]);
}

export function adminConflict(message: string) {
  return adminError("conflict", 409, [message]);
}
