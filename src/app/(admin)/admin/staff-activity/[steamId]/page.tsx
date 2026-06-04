import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Ban,
  CalendarDays,
  Clock,
  ShieldAlert,
  Star,
  Trophy,
  UserPlus,
  Zap,
} from "lucide-react";
import {
  AdminAccessDenied,
  AdminEmptyState,
  AdminPanel,
  AdminShell,
  AdminStatCard,
} from "@/components/admin/admin-shell";
import { getCommandActionPoints, getMonthKey, getMonthRange } from "@/lib/admin-monitor/scoring";
import { requireAdminPageAccess } from "@/lib/admin/guards";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin activity detail",
};

type StaffActivityDetailPageProps = {
  params: Promise<{
    steamId: string;
  }>;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatDay(value: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "short",
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

function getActionType(command: string | null) {
  const normalized = command?.toLowerCase() ?? "";

  if (normalized.includes("ban")) {
    return "ban";
  }

  if (normalized.includes("kick")) {
    return "kick";
  }

  if (normalized.includes("gag")) {
    return "gag";
  }

  if (normalized.includes("slay")) {
    return "slay";
  }

  if (normalized.includes("slap")) {
    return "slap";
  }

  if (normalized.includes("map")) {
    return "map";
  }

  if (normalized.includes("vote")) {
    return "vote";
  }

  return "other";
}

function countActions(commands: Array<string | null>) {
  const counts = new Map<string, number>();

  for (const command of commands) {
    const type = getActionType(command);
    counts.set(type, (counts.get(type) ?? 0) + 1);
  }

  return ["ban", "kick", "gag", "slay", "slap", "map", "vote", "other"].map((type) => ({
    points: getCommandActionPoints(type),
    type,
    value: counts.get(type) ?? 0,
  }));
}

export default async function StaffActivityDetailPage({ params }: StaffActivityDetailPageProps) {
  const access = await requireAdminPageAccess("staffActivity:read");

  if (!access.allowed) {
    return (
      <AdminAccessDenied requiredPermission="staffActivity:read" session={access.session} />
    );
  }

  const { steamId: encodedSteamId } = await params;
  const steamId = decodeURIComponent(encodedSteamId);
  const now = new Date();
  const month = getMonthKey(now);
  const monthRange = getMonthRange(now);
  const admin = await db.adminMonitorAdmin.findUnique({
    where: {
      steamId,
    },
  });

  if (!admin) {
    notFound();
  }

  const [
    reports,
    currentReport,
    dailyScores,
    actionEvents,
    recruits,
    penalties,
    rewards,
  ] = await Promise.all([
    db.adminMonitorMonthlyReport.findMany({
      orderBy: {
        month: "desc",
      },
      take: 6,
      where: {
        adminSteamId: steamId,
      },
    }),
    db.adminMonitorMonthlyReport.findFirst({
      where: {
        adminSteamId: steamId,
        month,
      },
    }),
    db.adminMonitorDailyScore.findMany({
      orderBy: {
        date: "asc",
      },
      where: {
        adminSteamId: steamId,
        date: {
          gte: monthRange.start,
          lt: monthRange.end,
        },
      },
    }),
    db.adminMonitorEvent.findMany({
      orderBy: {
        occurredAt: "desc",
      },
      select: {
        command: true,
        occurredAt: true,
        serverKey: true,
        targetName: true,
      },
      take: 80,
      where: {
        adminSteamId: steamId,
        eventType: "admin_action",
        occurredAt: {
          gte: monthRange.start,
          lt: monthRange.end,
        },
      },
    }),
    db.adminMonitorRecruit.findMany({
      orderBy: {
        reportedAt: "desc",
      },
      take: 30,
      where: {
        adminSteamId: steamId,
      },
    }),
    db.adminMonitorPenalty.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      where: {
        adminSteamId: steamId,
      },
    }),
    db.adminMonitorReward.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 12,
      where: {
        adminSteamId: steamId,
      },
    }),
  ]);
  const actionCounts = countActions(actionEvents.map((event) => event.command));

  return (
    <AdminShell
      active="staff-activity"
      description={`Activitate monitorizata pentru ${admin.currentName}. Datele provin din evenimente AMXX si validari RSU.`}
      eyebrow="admin monitor"
      session={access.session}
      title={admin.currentName}
    >
      <Link
        className="mb-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-300 transition hover:border-cyan-300/30 hover:bg-cyan-500/10 hover:text-white"
        href="/admin/staff-activity"
      >
        <ArrowLeft className="h-4 w-4" />
        Inapoi la staff activity
      </Link>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          icon={Clock}
          label="Minute online"
          value={formatMinutes(currentReport?.minutesOnline ?? 0)}
        />
        <AdminStatCard
          icon={CalendarDays}
          label="Zile active"
          value={currentReport?.activeDays ?? 0}
        />
        <AdminStatCard
          icon={Activity}
          label="Actiuni luna"
          value={currentReport?.actionsCount ?? 0}
        />
        <AdminStatCard
          icon={Star}
          label="Puncte totale"
          value={currentReport?.totalPoints ?? 0}
        />
        <AdminStatCard
          icon={UserPlus}
          label="Recrutari validate"
          value={currentReport?.recruitsAccepted ?? 0}
        />
        <AdminStatCard
          icon={ShieldAlert}
          label="Penalizari"
          value={currentReport?.penalties ?? 0}
        />
        <AdminStatCard
          icon={Trophy}
          label="Reward tier"
          value={currentReport?.rewardTier ?? "none"}
        />
        <AdminStatCard
          icon={Zap}
          label="Upgrade"
          value={currentReport?.upgradeEligible ? "eligibil" : "nu"}
        />
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[0.8fr_1fr]">
        <AdminPanel icon={Ban} title="Actiuni pe tip">
          <div className="grid gap-3 sm:grid-cols-2">
            {actionCounts.map((action) => (
              <div
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
                key={action.type}
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  {action.type}
                </p>
                <p className="mt-2 text-2xl font-black text-white">{action.value}</p>
                <p className="mt-1 text-xs font-semibold text-zinc-500">
                  {action.points} puncte / actiune
                </p>
              </div>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel icon={CalendarDays} title="Puncte pe zi">
          {dailyScores.length > 0 ? (
            <div className="grid gap-3">
              {dailyScores.map((score) => (
                <article
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  key={score.id}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                        {formatDay(score.date)} / {score.serverKey}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-400">
                        {formatMinutes(score.minutesOnline)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em]">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-300">
                        timp {score.timePoints}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-300">
                        actiuni {score.actionPoints}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-300">
                        recruit {score.recruitPoints}
                      </span>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-1 text-cyan-100">
                        total {score.totalPoints}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Nu exista scoruri zilnice pentru luna curenta." />
          )}
        </AdminPanel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <AdminPanel icon={UserPlus} title="Recrutari aduse">
          {recruits.length > 0 ? (
            <div className="grid gap-3">
              {recruits.map((recruit) => (
                <article className="rounded-2xl border border-white/10 bg-black/25 p-4" key={recruit.id}>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                    {recruit.serverKey} / {recruit.status}
                  </p>
                  <h3 className="mt-1 text-sm font-black uppercase text-white">
                    {recruit.targetName}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">{recruit.targetSteamId}</p>
                  <p className="mt-3 text-xs leading-5 text-zinc-400">
                    Raportat la {formatDate(recruit.reportedAt)}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Adminul nu are recrutari raportate." />
          )}
        </AdminPanel>

        <AdminPanel icon={ShieldAlert} title="Penalizari">
          {penalties.length > 0 ? (
            <div className="grid gap-3">
              {penalties.map((penalty) => (
                <article className="rounded-2xl border border-red-300/15 bg-red-500/10 p-4" key={penalty.id}>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-red-100">
                    -{penalty.points} puncte / {penalty.serverKey}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{penalty.reason}</p>
                  <p className="mt-2 text-xs text-zinc-500">{formatDate(penalty.createdAt)}</p>
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Nu exista penalizari pentru acest admin." />
          )}
        </AdminPanel>

        <AdminPanel icon={Trophy} title="Rapoarte si reward">
          {reports.length > 0 || rewards.length > 0 ? (
            <div className="grid gap-3">
              {reports.map((report) => (
                <article className="rounded-2xl border border-white/10 bg-black/25 p-4" key={report.id}>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                    {report.month} / {report.serverKey}
                  </p>
                  <p className="mt-2 text-sm font-black text-white">
                    {report.totalPoints} puncte
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    reward: {report.rewardTier ?? "none"} / upgrade:{" "}
                    {report.upgradeEligible ? "da" : "nu"}
                  </p>
                </article>
              ))}
              {rewards.map((reward) => (
                <article className="rounded-2xl border border-amber-300/15 bg-amber-500/10 p-4" key={reward.id}>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-100">
                    reward {reward.month} / {reward.status}
                  </p>
                  <p className="mt-2 text-sm font-black text-white">{reward.tier}</p>
                  {reward.notes ? (
                    <p className="mt-1 text-xs leading-5 text-zinc-400">{reward.notes}</p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Nu exista rapoarte sau reward-uri pentru acest admin." />
          )}
        </AdminPanel>
      </div>
    </AdminShell>
  );
}
