import { NextResponse } from "next/server";
import { getPublicTournaments } from "@/lib/public-tournaments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const tournaments = await getPublicTournaments(8);

  return NextResponse.json(
    {
      ok: true,
      tournaments,
      checkedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=30, stale-while-revalidate=120",
      },
    },
  );
}
