import { NextRequest } from "next/server";
import {
  adminError,
  adminJson,
  adminNotFound,
  readAdminJsonBody,
  writeSafeAdminAudit,
} from "@/lib/admin/api";
import { requireAdminApiAccess } from "@/lib/admin/guards";
import { getRequestIp } from "@/lib/admin/request";
import { validateNewsInput } from "@/lib/admin/validators";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "news:read");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const post = await db.newsPost.findUnique({
    include: {
      author: {
        select: {
          email: true,
          username: true,
        },
      },
    },
    where: { id },
  });

  if (!post) {
    return adminNotFound("NewsPost");
  }

  return adminJson({ ok: true, post });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "news:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const body = await readAdminJsonBody(request);

  if (!body.ok) {
    return body.response;
  }

  const validated = validateNewsInput(body.body, { partial: true });

  if (!validated.ok) {
    return adminError("validation_error", 400, validated.errors);
  }

  const existing = await db.newsPost.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("NewsPost");
  }

  const data = {
    ...validated.data,
    publishedAt:
      validated.data.published === true && validated.data.publishedAt === undefined
        ? existing.publishedAt ?? new Date()
        : validated.data.publishedAt,
  };

  const post = await db.newsPost.update({
    data,
    where: { id },
  });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "news.update",
    target: "NewsPost",
    metadata: { id: post.id, changed: Object.keys(validated.data) },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, post });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const access = await requireAdminApiAccess(request, "news:write");

  if (access.response) {
    return access.response;
  }

  const { id } = await params;
  const existing = await db.newsPost.findUnique({ where: { id } });

  if (!existing) {
    return adminNotFound("NewsPost");
  }

  await db.newsPost.delete({ where: { id } });

  await writeSafeAdminAudit({
    actorId: access.session.user.id,
    action: "news.delete",
    target: "NewsPost",
    metadata: { id, locale: existing.locale, slug: existing.slug },
    ip: getRequestIp(request),
  });

  return adminJson({ ok: true, deleted: true });
}
