import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHECK_TIMEOUT_MS = 7_000;

type CheckState = "ok" | "degraded" | "down";

type HealthCheck = {
  ok: boolean;
  status: CheckState;
  detail: string;
  latencyMs?: number;
};

type ServersPayload = {
  servers?: unknown[];
  checkedAt?: string;
};

type TeamSpeakPayload = {
  online?: boolean;
  serverName?: string;
  users?: number;
  maxUsers?: number;
  channelCount?: number;
  message?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function timedCheck(run: () => Promise<HealthCheck>): Promise<HealthCheck> {
  const startedAt = Date.now();

  try {
    const check = await run();
    return {
      ...check,
      latencyMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      status: "down",
      detail: error instanceof Error ? error.message : "Unknown check failure",
      latencyMs: Date.now() - startedAt,
    };
  }
}

async function checkServers(origin: string): Promise<HealthCheck> {
  return timedCheck(async () => {
    const response = await fetchWithTimeout(`${origin}/api/servers`);

    if (!response.ok) {
      return {
        ok: false,
        status: "down",
        detail: `/api/servers returned ${response.status}`,
      };
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || !Array.isArray((payload as ServersPayload).servers)) {
      return {
        ok: false,
        status: "degraded",
        detail: "/api/servers returned an unexpected payload",
      };
    }

    const servers = (payload as ServersPayload).servers ?? [];

    return {
      ok: servers.length > 0,
      status: servers.length > 0 ? "ok" : "degraded",
      detail: `${servers.length} live server targets returned`,
    };
  });
}

async function checkTeamSpeak(origin: string): Promise<HealthCheck> {
  return timedCheck(async () => {
    const response = await fetchWithTimeout(`${origin}/api/teamspeak`);

    if (!response.ok) {
      return {
        ok: false,
        status: "down",
        detail: `/api/teamspeak returned ${response.status}`,
      };
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || typeof (payload as TeamSpeakPayload).online !== "boolean") {
      return {
        ok: false,
        status: "degraded",
        detail: "/api/teamspeak returned an unexpected payload",
      };
    }

    const status = payload as TeamSpeakPayload;

    if (!status.online) {
      return {
        ok: false,
        status: "degraded",
        detail: status.message
          ? `TeamSpeak fallback offline (${status.message})`
          : "TeamSpeak is currently offline",
      };
    }

    return {
      ok: true,
      status: "ok",
      detail: `${status.serverName || "TeamSpeak"} online, ${status.users ?? 0}/${status.maxUsers ?? 0} users, ${status.channelCount ?? 0} channels`,
    };
  });
}

async function checkPage(origin: string, path: "/ro" | "/en"): Promise<HealthCheck> {
  return timedCheck(async () => {
    const response = await fetchWithTimeout(`${origin}${path}`, {
      headers: { Accept: "text/html" },
    });

    if (!response.ok) {
      return {
        ok: false,
        status: "down",
        detail: `${path} returned ${response.status}`,
      };
    }

    const html = await response.text();
    const containsBrand = html.includes("FREE-ARENA.RO");

    return {
      ok: containsBrand,
      status: containsBrand ? "ok" : "degraded",
      detail: containsBrand ? `${path} rendered` : `${path} rendered without brand marker`,
    };
  });
}

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const [servers, teamspeak, ro, en] = await Promise.all([
    checkServers(origin),
    checkTeamSpeak(origin),
    checkPage(origin, "/ro"),
    checkPage(origin, "/en"),
  ]);
  const checks = { servers, teamspeak, ro, en };
  const ok = Object.values(checks).every((check) => check.ok);

  return NextResponse.json(
    {
      ok,
      status: ok ? "ok" : "degraded",
      checks,
      timestamp: new Date().toISOString(),
    },
    {
      status: ok ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
