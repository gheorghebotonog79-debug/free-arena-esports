import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Gauge,
  Newspaper,
  Server,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  Zap,
} from "lucide-react";
import type { AdminPermission } from "@/lib/admin/rbac";
import { hasAdminPermission } from "@/lib/admin/rbac";
import type { CurrentAdminSession } from "@/lib/admin/session";

type AdminShellProps = {
  active: string;
  children: React.ReactNode;
  description: string;
  eyebrow?: string;
  session: CurrentAdminSession;
  title: string;
};

type AdminAccessDeniedProps = {
  requiredPermission: AdminPermission;
  session: CurrentAdminSession;
};

type AdminNavigationItem = {
  href: string;
  icon: LucideIcon;
  key: string;
  label: string;
  permission?: AdminPermission;
};

const adminNavigation: AdminNavigationItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", key: "dashboard", icon: Gauge },
  { href: "/admin/servers", label: "Servere", key: "servers", icon: Server, permission: "servers:read" },
  { href: "/admin/news", label: "News", key: "news", icon: Newspaper, permission: "news:read" },
  {
    href: "/admin/tournaments",
    label: "Turnee",
    key: "tournaments",
    icon: Trophy,
    permission: "tournaments:read",
  },
  { href: "/admin/vip", label: "VIP", key: "vip", icon: Zap, permission: "vip:read" },
  {
    href: "/admin/settings",
    label: "Setari",
    key: "settings",
    icon: Settings,
    permission: "settings:read",
  },
  { href: "/admin/audit", label: "Audit", key: "audit", icon: Activity, permission: "audit:read" },
];

export function AdminShell({
  active,
  children,
  description,
  eyebrow = "control center",
  session,
  title,
}: AdminShellProps) {
  const visibleNavigation = adminNavigation.filter(
    (item) => !item.permission || hasAdminPermission(session.user.permissions, item.permission),
  );

  return (
    <main className="min-h-screen bg-[#020711] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-400/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_36%),radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_34%)]" />
      </div>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.85)]" />
              sesiune activa
            </div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{description}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {session.user.username} / {session.user.role}
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

        <nav className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {visibleNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;

            return (
              <Link
                className={[
                  "inline-flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition",
                  isActive
                    ? "border-red-300/35 bg-red-500/15 text-white shadow-[0_14px_44px_rgba(239,68,68,0.16)]"
                    : "border-white/10 bg-white/[0.045] text-zinc-400 hover:border-white/20 hover:bg-white/[0.075] hover:text-white",
                ].join(" ")}
                href={item.href}
                key={item.key}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}

export function AdminAccessDenied({ requiredPermission, session }: AdminAccessDeniedProps) {
  return (
    <AdminShell
      active="denied"
      description="Contul tau este autentificat, dar rolul curent nu are permisiunea necesara pentru aceasta zona."
      eyebrow="access control"
      session={session}
      title="Acces restrictionat"
    >
      <section className="rounded-[1.25rem] border border-red-300/20 bg-red-500/10 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-red-300/25 bg-red-500/15 text-red-200">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase text-white">Permisiune lipsa</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Este necesara permisiunea{" "}
              <span className="font-black text-red-100">{requiredPermission}</span>. Cere unui
              head admin sau co-owner sa ajusteze rolul daca accesul este justificat.
            </p>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}

export function AdminStatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
}) {
  return (
    <article className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{label}</p>
          <p className="mt-3 text-3xl font-black text-white">{value}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-red-300/20 bg-red-500/12 text-red-200">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </article>
  );
}

export function AdminPanel({
  children,
  title,
  icon: Icon = ShieldCheck,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  title: string;
}) {
  return (
    <section className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-red-300/20 bg-red-500/12 text-red-200">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-black uppercase text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function AdminEmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-5 text-sm leading-6 text-zinc-400">
      {message}
    </div>
  );
}
