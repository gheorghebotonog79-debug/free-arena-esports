import type { Metadata } from "next";
import { Activity, Newspaper, Server, Settings, ShieldCheck, Trophy, Zap } from "lucide-react";
import { requireAdminSession } from "@/lib/admin/session";
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
  const session = await requireAdminSession();

  const [serversCount, newsCount, tournamentsCount, vipCount, latestAuditLogs] = await Promise.all([
    db.gameServer.count(),
    db.newsPost.count(),
    db.tournament.count(),
    db.vipPackage.count(),
    db.adminAuditLog.findMany({
      include: {
        actor: {
          select: {
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    }),
  ]);

  const overviewCards = [
    { label: "Servere in baza", value: serversCount, icon: Server },
    { label: "News posts", value: newsCount, icon: Newspaper },
    { label: "Turnee", value: tournamentsCount, icon: Trophy },
    { label: "Pachete VIP", value: vipCount, icon: Zap },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-red-600/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_36%),radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_34%)]" />
      </div>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.85)]" />
              sesiune activa
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Admin dashboard
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Logat ca <span className="font-bold text-white">{session.user.username}</span> cu rolul{" "}
              <span className="font-bold uppercase text-red-200">{session.user.role}</span>.
            </p>
          </div>

          <form action="/api/admin/auth/logout" method="post">
            <button
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-200 transition hover:border-red-300/35 hover:bg-red-500/10 hover:text-white"
              type="submit"
            >
              Logout
            </button>
          </form>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
                key={card.label}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                      {card.label}
                    </p>
                    <p className="mt-3 text-3xl font-black text-white">{card.value}</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-red-300/20 bg-red-500/12 text-red-200">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <section className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                  audit
                </p>
                <h2 className="text-lg font-black uppercase text-white">Ultimele actiuni</h2>
              </div>
            </div>

            <div className="space-y-3">
              {latestAuditLogs.length > 0 ? (
                latestAuditLogs.map((log) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
                    key={log.id}
                  >
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
          </section>

          <aside className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-red-300/20 bg-red-500/12 text-red-200">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                  rbac
                </p>
                <h2 className="text-lg font-black uppercase text-white">Acces curent</h2>
              </div>
            </div>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Rol
                </dt>
                <dd className="mt-1 font-black uppercase text-red-200">{session.user.role}</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Prioritate
                </dt>
                <dd className="mt-1 font-bold text-white">{session.user.priority}</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Permisiuni
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {session.user.permissions.map((permission) => (
                    <span
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-bold text-zinc-300"
                      key={permission}
                    >
                      {permission}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                <Settings className="h-4 w-4" />
                foundation
              </div>
              <p className="text-sm leading-6 text-zinc-400">
                Dashboard-ul foloseste baza Prisma reala si sesiuni protejate. Urmatorul pas
                natural este CRUD controlat pentru news, servere, turnee si VIP.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
