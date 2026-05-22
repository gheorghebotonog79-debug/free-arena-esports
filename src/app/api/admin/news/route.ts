import { NextRequest } from "next/server";
import {
  adminConflict,
  adminError,
  adminJson,
  readAdminJsonBody,
  writeSafeAdminAudit,
} from "@/lib/admin/api";
import { requireAdminApiAccess } from "@/lib/admin/guards";
import { getRequestIp } from "@/lib/admin/request";
import { validateNewsInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "news:read");

  if (access.response) {
    return access.response;
  }

  const posts = await db.newsPost.findMany({
    include: {
      author: {
        select: {
          email: true,
          username: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }],
    take: 50,
  });

  return adminJson({ ok: true, posts });
}

export async function POST(request: NextRequest) {
  const access = await requireAdminApiAccess(request, "news:write");

  if (access.response) {
    return access.response;
  }

  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateNewsInput(body.body);

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const exists = await db.newsPost.findUnique({
    where: {
      locale_slug: {
        locale: validated.data.locale ?? "ro",
        slug: validated.data.slug ?? "",
      },
    },
  });

  if (exists) {
    return adminConflict("A news post with this locale and slug already exists.");
  }

  const published = validated.data.published ?? false;
  const post = await db.newsPost.create({
    data: {
      content: validated.data.content ?? "",
      excerpt: validated.data.excerpt ?? "",
      locale: validated.data.locale ?? "ro",
      published,
      publishedAt: published ? (validated.data.publishedAt ?? new Date()) : null,
      slug: validated.data.slug ?? "",
      title: validated.data.title ?? "",
      createdBy: access.session.user.id,
    },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "news.create",
    target: "NewsPost",
    metadata: { id: post.id, locale: post.locale, slug: post.slug },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, post }, 201);
}
