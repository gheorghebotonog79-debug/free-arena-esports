import { NextResponse } from "next/server";
import { getPublishedNews } from "@/lib/public-news";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "ro";
  const posts = await getPublishedNews(locale, 6);

  return NextResponse.json(
    {
      ok: true,
      posts,
      checkedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=30, stale-while-revalidate=120",
      },
    },
  );
}
