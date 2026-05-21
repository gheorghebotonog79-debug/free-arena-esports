import { NextResponse } from "next/server";
import { queryLiveServers } from "@/lib/query-live-servers";
import type { LiveServersResponse } from "@/lib/live-server-targets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 20_000;

let cachedResponse: {
  expiresAt: number;
  payload: LiveServersResponse;
} | null = null;

export async function GET() {
  const now = Date.now();

  if (cachedResponse && cachedResponse.expiresAt > now) {
    return NextResponse.json(cachedResponse.payload, {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=20, stale-while-revalidate=40",
        "X-FREE-ARENA-Cache": "HIT",
      },
    });
  }

  const payload = await queryLiveServers();
  cachedResponse = {
    expiresAt: now + CACHE_TTL_MS,
    payload,
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=20, stale-while-revalidate=40",
      "X-FREE-ARENA-Cache": "MISS",
    },
  });
}
