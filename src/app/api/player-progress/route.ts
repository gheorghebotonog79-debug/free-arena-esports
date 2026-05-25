import { NextResponse } from "next/server";
import { queryPlayerProgress } from "@/lib/query-player-progress";

export const revalidate = 45;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 15);

  try {
    const payload = await queryPlayerProgress(limit);

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=45, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        players: [],
        summary: null,
        cached: false,
        updatedAt: null,
      },
      { status: 200 },
    );
  }
}
