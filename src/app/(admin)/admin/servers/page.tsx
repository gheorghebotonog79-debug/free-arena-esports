import type { Metadata } from "next";
import { Server } from "lucide-react";
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
  title: "Servere",
};

export default async function AdminServersPage() {
  const access = await requireAdminPageAccess("servers:read");

  if (!access.allowed) {
    return <AdminAccessDenied requiredPermission="servers:read" session={access.session} />;
  }

  const servers = await db.gameServer.findMany({
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });

  return (
    <AdminShell
      active="servers"
      description="Lista reala de servere salvata in baza de date. Modificarile write vor fi activate gradual cu audit si roluri."
      session={access.session}
      title="Servere"
    >
      <AdminPanel icon={Server} title="Servere configurate">
        {servers.length > 0 ? (
          <div className="grid gap-3">
            {servers.map((server) => (
              <article
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
                key={server.id}
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-base font-black uppercase text-white">{server.name}</h2>
                    <p className="mt-1 text-sm text-zinc-400">
                      {server.host}:{server.port} / {server.game}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-zinc-300">
                      order {server.displayOrder}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-zinc-300">
                      {server.featured ? "featured" : "normal"}
                    </span>
                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em]",
                        server.maintenance
                          ? "border-amber-300/25 bg-amber-500/10 text-amber-100"
                          : "border-emerald-300/20 bg-emerald-500/10 text-emerald-100",
                      ].join(" ")}
                    >
                      {server.maintenance ? "maintenance" : "active"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <AdminEmptyState message="Nu exista servere salvate in baza de date. Ruleaza seed-ul dupa configurarea PostgreSQL." />
        )}
      </AdminPanel>
    </AdminShell>
  );
}
