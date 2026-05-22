import { NextResponse } from "next/server";
import { getSetupReadiness } from "@/lib/admin/setup-readiness";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const readiness = await getSetupReadiness();

  return NextResponse.json(readiness, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
