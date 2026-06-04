import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { adminError, adminJson, readAdminJsonBody } from "@/lib/admin/api";
import { ingestAdminMonitorEvent } from "@/lib/admin-monitor/service";
import { validateAdminMonitorEventBody } from "@/lib/admin-monitor/scoring";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function isAuthorized(request: NextRequest) {
  const configuredKey = process.env.ADMIN_MONITOR_API_KEY?.trim();

  if (!configuredKey) {
    return {
      configured: false,
      ok: false,
    };
  }

  const providedKey = request.headers.get("x-admin-monitor-key")?.trim() ?? "";

  return {
    configured: true,
    ok: safeEquals(providedKey, configuredKey),
  };
}

export async function POST(request: NextRequest) {
  const auth = isAuthorized(request);

  if (!auth.configured) {
    return adminError("admin_monitor_key_not_configured", 503);
  }

  if (!auth.ok) {
    return adminError("unauthorized", 401);
  }

  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateAdminMonitorEventBody(body.body);

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  try {
    const result = await ingestAdminMonitorEvent(validated.data);

    return adminJson({
      ok: true,
      ...result,
    }, 201);
  } catch {
    return adminError("admin_monitor_ingest_failed", 500);
  }
}
