import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import {
  AdminAccessDenied,
  AdminEmptyState,
  AdminPanel,
  AdminShell,
} from "@/components/admin/admin-shell";
import { requireAdminPageAccess } from "@/lib/admin/guards";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News",
};

function formatDate(value: Date | null) {
  if (!value) {
    return "nepublicat";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default async function AdminNewsPage() {
  const access = await requireAdminPageAccess("news:read");

  if (!access.allowed) {
    return <AdminAccessDenied requiredPermission="news:read" session={access.session} />;
  }

  const posts = await db.newsPost.findMany({
    include: {
      author: {
        select: {
          username: true,
          email: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }],
    take: 30,
  });

  return (
    <AdminShell
      active="news"
      description="Feed-ul de noutati pregatit pentru publicare reala. CRUD-ul va fi adaugat dupa confirmarea fluxului editorial."
      session={access.session}
      title="News"
    >
      <AdminPanel icon={Newspaper} title="Ultimele postari">
        {posts.length > 0 ? (
          <div className="grid gap-3">
            {posts.map((post) => (
              <article className="rounded-2xl border border-white/10 bg-black/25 p-4" key={post.id}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-zinc-300">
                        {post.locale}
                      </span>
                      <span
                        className={[
                          "rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em]",
                          post.published
                            ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-100"
                            : "border-zinc-300/15 bg-zinc-500/10 text-zinc-300",
                        ].join(" ")}
                      >
                        {post.published ? "published" : "draft"}
                      </span>
                    </div>
                    <h2 className="text-base font-black uppercase text-white">{post.title}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 lg:text-right">
                    <p>{formatDate(post.publishedAt)}</p>
                    <p className="mt-1">{post.author?.username ?? post.author?.email ?? "system"}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <AdminEmptyState message="Nu exista inca news posts in baza de date." />
        )}
      </AdminPanel>
    </AdminShell>
  );
}
