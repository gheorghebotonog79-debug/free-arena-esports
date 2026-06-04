import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Newspaper, Server, Settings, Trophy, Zap } from "lucide-react";
import { AdminPanel, AdminShell, AdminStatCard } from "@/components/admin/admin-shell";
import { requireAdminPageAccess } from "@/lib/admin/guards";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default async function AdminDashboardPage() {
  const { session } = await requireAdminPageAccess();

  const [serversCount, newsCount, tournamentsCount, vipCount, latestAuditLogs] = await Promise.all([
    db.gameServer.count(),
    db.newsPost.count(),
    db.tournament.count(),
    db.vipPackage.count(),
    db.adminAuditLog.findMany({
      include: {
        actor: {
          select: {
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    }),
  ]);

  return (
    <AdminShell
      active="dashboard"
      description="Privire operationala peste baza FREE-ARENA: servere, continut, turnee, VIP si audit."
      session={session}
      title="Admin dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard icon={Server} label="Servere in baza" value={serversCount} />
        <AdminStatCard icon={Newspaper} label="News posts" value={newsCount} />
        <AdminStatCard icon={Trophy} label="Turnee" value={tournamentsCount} />
        <AdminStatCard icon={Zap} label="Pachete VIP" value={vipCount} />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <AdminPanel icon={Activity} title="Ultimele actiuni">
          <div className="space-y-3">
            {latestAuditLogs.length > 0 ? (
              latestAuditLogs.map((log) => (
                <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3" key={log.id}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-bold text-white">{log.action}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      {formatDate(log.createdAt)}
                    </p>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">
                    {log.actor?.username ?? log.actor?.email ?? "system"} {"->"} {log.target}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-5 text-sm text-zinc-400">
                Nu exista inca actiuni admin in audit log.
              </div>
            )}
          </div>
        </AdminPanel>

        <AdminPanel icon={Settings} title="Quick actions">
          <div className="grid gap-3">
            {[
              ["Servere", "/admin/servers"],
              ["News", "/admin/news"],
              ["Turnee", "/admin/tournaments"],
              ["VIP", "/admin/vip"],
              ["Staff activity", "/admin/staff-activity"],
              ["Audit", "/admin/audit"],
            ].map(([label, href]) => (
              <Link
                className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-zinc-300 transition hover:border-red-300/30 hover:bg-red-500/10 hover:text-white"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
        </AdminPanel>
      </div>
    </AdminShell>
  );
}
