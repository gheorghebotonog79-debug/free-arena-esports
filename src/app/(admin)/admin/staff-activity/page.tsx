import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Radar,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import {
  AdminAccessDenied,
  AdminEmptyState,
  AdminPanel,
  AdminShell,
  AdminStatCard,
} from "@/components/admin/admin-shell";
import { AdminApiForm } from "@/components/admin/admin-api-form";
import { ADMIN_MONITOR_LIMITS, getMonthKey, getMonthRange } from "@/lib/admin-monitor/scoring";
import { requireAdminPageAccess } from "@/lib/admin/guards";
import { hasAdminPermission } from "@/lib/admin/rbac";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff activity",
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatMinutes(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  if (hours <= 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
}

async function getAdminNames(steamIds: string[]) {
  const uniqueSteamIds = Array.from(new Set(steamIds));

  if (uniqueSteamIds.length === 0) {
    return new Map<string, string>();
  }

  const admins = await db.adminMonitorAdmin.findMany({
    select: {
      currentName: true,
      steamId: true,
    },
    where: {
      steamId: {
        in: uniqueSteamIds,
      },
    },
  });

  return new Map(admins.map((admin) => [admin.steamId, admin.currentName]));
}

export default async function AdminStaffActivityPage() {
  const access = await requireAdminPageAccess("staffActivity:read");

  if (!access.allowed) {
    return (
      <AdminAccessDenied requiredPermission="staffActivity:read" session={access.session} />
    );
  }

  const now = new Date();
  const month = getMonthKey(now);
  const monthRange = getMonthRange(now);
  const [
    adminsCount,
    monthlyPoints,
    topReports,
    pendingRecruitsCount,
    acceptedRecruitsCount,
    rewardEligibleCount,
    upgradeEligibleCount,
    pendingRecruits,
    recentEvents,
  ] = await Promise.all([
    db.adminMonitorAdmin.count(),
    db.adminMonitorMonthlyReport.aggregate({
      _sum: {
        totalPoints: true,
      },
      where: {
        month,
      },
    }),
    db.adminMonitorMonthlyReport.findMany({
      orderBy: {
        totalPoints: "desc",
      },
      take: 10,
      where: {
        month,
      },
    }),
    db.adminMonitorRecruit.count({
      where: {
        status: "pending",
      },
    }),
    db.adminMonitorRecruit.count({
      where: {
        acceptedAt: {
          gte: monthRange.start,
          lt: monthRange.end,
        },
        status: "accepted",
      },
    }),
    db.adminMonitorMonthlyReport.count({
      where: {
        month,
        rewardTier: {
          not: null,
        },
      },
    }),
    db.adminMonitorMonthlyReport.count({
      where: {
        month,
        upgradeEligible: true,
      },
    }),
    db.adminMonitorRecruit.findMany({
      orderBy: {
        reportedAt: "asc",
      },
      take: 8,
      where: {
        status: "pending",
      },
    }),
    db.adminMonitorEvent.findMany({
      orderBy: {
        occurredAt: "desc",
      },
      take: 8,
    }),
  ]);
  const adminNames = await getAdminNames([
    ...topReports.map((report) => report.adminSteamId),
    ...pendingRecruits.map((recruit) => recruit.adminSteamId),
    ...recentEvents.map((event) => event.adminSteamId),
  ]);
  const canWrite = hasAdminPermission(access.session.user.permissions, "staffActivity:write");

  return (
    <AdminShell
      active="staff-activity"
      description="Monitorizare admini din evenimente trimise de pluginul CS catre API-ul site-ului. RSU este citit doar pentru validarea recrutarilor."
      eyebrow="admin monitor"
      session={access.session}
      title="Staff activity"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard icon={Users} label="Admini monitorizati" value={adminsCount} />
        <AdminStatCard icon={Star} label={`Puncte ${month}`} value={monthlyPoints._sum.totalPoints ?? 0} />
        <AdminStatCard icon={Clock} label="Recrutari pending" value={pendingRecruitsCount} />
        <AdminStatCard icon={CheckCircle2} label="Recrutari validate" value={acceptedRecruitsCount} />
        <AdminStatCard icon={Award} label="Eligibili reward" value={rewardEligibleCount} />
        <AdminStatCard icon={Trophy} label="Eligibili upgrade" value={upgradeEligibleCount} />
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_0.72fr]">
        <AdminPanel icon={Trophy} title="Top 10 admini">
          {topReports.length > 0 ? (
            <div className="grid gap-3">
              {topReports.map((report, index) => (
                <Link
                  className="rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-500/10"
                  href={`/admin/staff-activity/${encodeURIComponent(report.adminSteamId)}`}
                  key={report.id}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                        #{index + 1} / {report.serverKey}
                      </p>
                      <h2 className="mt-1 text-base font-black uppercase text-white">
                        {adminNames.get(report.adminSteamId) ?? report.adminSteamId}
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-zinc-500">
                        {report.adminSteamId}
                      </p>
                    </div>
                    <div className="grid gap-2 text-right text-xs font-black uppercase tracking-[0.14em] text-zinc-300">
                      <span>{report.totalPoints} puncte</span>
                      <span>{formatMinutes(report.minutesOnline)}</span>
                      <span>{report.activeDays} zile active</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Nu exista inca rapoarte pentru luna curenta." />
          )}
        </AdminPanel>

        <div className="grid gap-5">
          {canWrite ? (
            <AdminPanel icon={Radar} title="Verifica recrutari RSU">
              <AdminApiForm
                endpoint="/api/admin/staff-activity/recruits/verify"
                fields={[
                  {
                    defaultValue: 25,
                    helper: `Verifica recrutari pending in ordinea raportarii. Playerii cu peste ${ADMIN_MONITOR_LIMITS.recruitMaxInitialPlayedMinutes} minute deja jucate in RSU sunt respinsi ca vechi.`,
                    label: "Limit",
                    max: 100,
                    min: 1,
                    name: "limit",
                    type: "number",
                  },
                ]}
                submitLabel="Verifica acum"
                successMessage="Recrutarile pending au fost verificate."
              />
            </AdminPanel>
          ) : null}

          <AdminPanel icon={CalendarCheck} title="Recrutari pending">
            {pendingRecruits.length > 0 ? (
              <div className="grid gap-3">
                {pendingRecruits.map((recruit) => (
                  <article
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                    key={recruit.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                          {recruit.serverKey} / pending
                        </p>
                        <h3 className="mt-1 text-sm font-black uppercase text-white">
                          {recruit.targetName}
                        </h3>
                        <p className="mt-1 text-xs text-zinc-500">{recruit.targetSteamId}</p>
                      </div>
                      <span className="rounded-full border border-amber-300/20 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-amber-100">
                        {recruit.requiredMinutes}m
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-zinc-400">
                      Raportat de{" "}
                      <span className="font-bold text-zinc-200">
                        {adminNames.get(recruit.adminSteamId) ?? recruit.adminName}
                      </span>{" "}
                      la {formatDate(recruit.reportedAt)}.
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <AdminEmptyState message="Nu exista recrutari pending." />
            )}
          </AdminPanel>
        </div>
      </div>

      <div className="mt-5">
        <AdminPanel icon={Radar} title="Ultimele evenimente monitorizate">
          {recentEvents.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {recentEvents.map((event) => (
                <article
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  key={event.id}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                        {event.serverKey} / {event.eventType}
                      </p>
                      <h3 className="mt-1 text-sm font-black uppercase text-white">
                        {adminNames.get(event.adminSteamId) ?? event.adminName}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500">{event.adminSteamId}</p>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      {formatDate(event.occurredAt)}
                    </p>
                  </div>
                  {event.command || event.targetName ? (
                    <p className="mt-3 text-xs leading-5 text-zinc-400">
                      {event.command ? `Comanda: ${event.command}` : null}
                      {event.command && event.targetName ? " / " : null}
                      {event.targetName ? `Target: ${event.targetName}` : null}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Nu exista evenimente primite de la plugin." />
          )}
        </AdminPanel>
      </div>
    </AdminShell>
  );
}
