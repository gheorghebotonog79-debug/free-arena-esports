import { NextResponse } from "next/server";
import { searchPlayerProgress } from "@/lib/query-player-progress";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  try {
    const payload = await searchPlayerProgress(query);

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        query,
        count: 0,
        players: [],
      },
      { status: 200 },
    );
  }
}
