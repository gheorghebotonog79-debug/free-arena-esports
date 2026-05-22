import { NextResponse } from "next/server";
import { queryForumStatus } from "@/lib/query-forum";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "fra1";

export async function GET() {
  const status = await queryForumStatus();

  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
