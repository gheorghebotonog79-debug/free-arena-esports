import { NextResponse } from "next/server";
import { queryTeamSpeakStatus } from "@/lib/query-teamspeak";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "fra1";

export async function GET() {
  const status = await queryTeamSpeakStatus();

  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
