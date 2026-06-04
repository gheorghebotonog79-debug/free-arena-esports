import {
  Activity,
  ArrowRight,
  CalendarDays,
  Clock,
  RadioTower,
  ShieldCheck,
  Star,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type {
  PublicAdminActivityDetail,
  PublicAdminActivitySummary,
} from "@/lib/admin-monitor/public-activity";
import {
  PublicPageHero,
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalGrid,
  TacticalInfoBlock,
  TacticalSection,
} from "@/components/public/PublicPagePrimitives";

type PublicAdminActivityHubProps = {
  admins: PublicAdminActivitySummary[];
  locale: Locale;
  month: string;
  totals: {
    actions: number;
    admins: number;
    minutes: number;
    points: number;
    recruits: number;
  };
};

type PublicAdminActivityDetailProps = {
  detail: PublicAdminActivityDetail;
  locale: Locale;
};

const content = {
  ro: {
    actions: "Acțiuni",
    activeDays: "Zile active",
    adminCount: "Admini",
    back: "Înapoi la activitate",
    copy:
      "Activitate reală citită din evenimentele trimise de serverele FREE-ARENA. Fiecare admin primește automat propria fișă când pluginul trimite heartbeat, acțiuni sau recrutări.",
    daily: "Puncte pe zi",
    empty:
      "Încă nu există activitate publică. După ce pluginul AMXX trimite primul heartbeat, adminii vor apărea automat aici.",
    firstSeen: "Prima apariție",
    lastSeen: "Ultima activitate",
    latestActions: "Ultimele acțiuni",
    minutes: "Minute",
    month: "Luna",
    points: "Puncte",
    recruits: "Recrutări",
    reports: "Rapoarte lunare",
    title: "Admin Activity",
    topAdmins: "Admini monitorizați",
    upgrade: "Upgrade",
    view: "Vezi fișa",
  },
  en: {
    actions: "Actions",
    activeDays: "Active days",
    adminCount: "Admins",
    back: "Back to activity",
    copy:
      "Real activity read from events sent by the FREE-ARENA servers. Each admin gets an automatic profile when the plugin sends heartbeats, actions or recruit reports.",
    daily: "Daily points",
    empty:
      "No public activity yet. After the AMXX plugin sends the first heartbeat, admins will appear here automatically.",
    firstSeen: "First seen",
    lastSeen: "Last activity",
    latestActions: "Latest actions",
    minutes: "Minutes",
    month: "Month",
    points: "Points",
    recruits: "Recruits",
    reports: "Monthly reports",
    title: "Admin Activity",
    topAdmins: "Monitored admins",
    upgrade: "Upgrade",
    view: "View profile",
  },
} as const;

function formatDate(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
    dateStyle: "medium",
  }).format(value);
}

function formatDateTime(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "en-US").format(value);
}

function formatMinutes(value: number, locale: Locale) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  if (hours <= 0) {
    return `${formatNumber(minutes, locale)}m`;
  }

  return `${formatNumber(hours, locale)}h ${minutes}m`;
}

function profileHref(steamId: string) {
  return `/admin-activity/${encodeURIComponent(steamId)}`;
}

export function PublicAdminActivityHub({
  admins,
  locale,
  month,
  totals,
}: PublicAdminActivityHubProps) {
  const t = content[locale];

  return (
    <>
      <PublicPageHero
        Icon={RadioTower}
        description={t.copy}
        eyebrow="FREE-ARENA STAFF"
        meta={month}
        title={t.title}
        aside={
          <TacticalCard as="aside" tone="respawn" className="min-h-80">
            <TacticalCardHeader
              Icon={ShieldCheck}
              badge={<TacticalBadge dot>{month}</TacticalBadge>}
              eyebrow="LIVE MONITOR"
              title={t.topAdmins}
            />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <TacticalInfoBlock Icon={Users} label={t.adminCount} value={formatNumber(totals.admins, locale)} />
              <TacticalInfoBlock Icon={Star} label={t.points} value={formatNumber(totals.points, locale)} />
              <TacticalInfoBlock Icon={Clock} label={t.minutes} value={formatMinutes(totals.minutes, locale)} />
              <TacticalInfoBlock Icon={UserPlus} label={t.recruits} value={formatNumber(totals.recruits, locale)} />
            </div>
          </TacticalCard>
        }
      />

      <TacticalSection
        className="pt-6"
        description={t.copy}
        eyebrow="ADMIN ACTIVITY"
        title={t.topAdmins}
      >
        {admins.length > 0 ? (
          <TacticalGrid columns="three">
            {admins.map((admin, index) => (
              <TacticalCard key={admin.adminSteamId} tone={index % 3 === 0 ? "cs2" : index % 3 === 1 ? "respawn" : "cs16"}>
                <TacticalCardHeader
                  Icon={Trophy}
                  badge={<TacticalBadge dot>{admin.serverKey}</TacticalBadge>}
                  eyebrow={`#${index + 1}`}
                  title={admin.currentName}
                >
                  <p className="mt-3 break-words text-xs font-semibold uppercase tracking-[0.12em] text-white/42">
                    {admin.adminSteamId}
                  </p>
                </TacticalCardHeader>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <TacticalInfoBlock Icon={Star} label={t.points} value={formatNumber(admin.totalPoints, locale)} />
                  <TacticalInfoBlock Icon={Clock} label={t.minutes} value={formatMinutes(admin.minutesOnline, locale)} />
                  <TacticalInfoBlock Icon={CalendarDays} label={t.activeDays} value={formatNumber(admin.activeDays, locale)} />
                  <TacticalInfoBlock Icon={Activity} label={t.actions} value={formatNumber(admin.actionsCount, locale)} />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {admin.rewardTier ? <TacticalBadge>{admin.rewardTier}</TacticalBadge> : null}
                  {admin.upgradeEligible ? <TacticalBadge>{t.upgrade}</TacticalBadge> : null}
                  <TacticalBadge>{formatDate(admin.lastSeenAt, locale)}</TacticalBadge>
                </div>
                <Link
                  className="server-details-button mt-auto inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition"
                  href={profileHref(admin.adminSteamId)}
                >
                  {t.view}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </TacticalCard>
            ))}
          </TacticalGrid>
        ) : (
          <TacticalCard tone="global" status="pending">
            <TacticalCardHeader
              Icon={RadioTower}
              badge={<TacticalBadge>WAITING</TacticalBadge>}
              eyebrow="AMXX API"
              title={t.empty}
            />
          </TacticalCard>
        )}
      </TacticalSection>
    </>
  );
}

export function PublicAdminActivityDetailPage({
  detail,
  locale,
}: PublicAdminActivityDetailProps) {
  const t = content[locale];
  const bestReport = detail.monthlyReports[0] ?? null;

  return (
    <>
      <PublicPageHero
        Icon={ShieldCheck}
        description={`${t.lastSeen}: ${formatDateTime(detail.admin.lastSeenAt, locale)}.`}
        eyebrow="ADMIN PROFILE"
        meta={detail.admin.steamId}
        title={detail.admin.currentName}
        actions={
          <Link
            className="server-details-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition"
            href="/admin-activity"
          >
            {t.back}
          </Link>
        }
        aside={
          <TacticalCard as="aside" tone="cs2" className="min-h-80">
            <TacticalCardHeader
              Icon={Trophy}
              badge={<TacticalBadge dot>{bestReport?.serverKey ?? "global"}</TacticalBadge>}
              eyebrow={t.month}
              title={bestReport ? bestReport.totalPoints : 0}
            />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <TacticalInfoBlock Icon={Clock} label={t.minutes} value={formatMinutes(bestReport?.minutesOnline ?? 0, locale)} />
              <TacticalInfoBlock Icon={CalendarDays} label={t.activeDays} value={formatNumber(bestReport?.activeDays ?? 0, locale)} />
              <TacticalInfoBlock Icon={Activity} label={t.actions} value={formatNumber(bestReport?.actionsCount ?? 0, locale)} />
              <TacticalInfoBlock Icon={UserPlus} label={t.recruits} value={formatNumber(bestReport?.recruitsAccepted ?? 0, locale)} />
            </div>
          </TacticalCard>
        }
      />

      <TacticalSection className="pt-6" eyebrow="PROFILE DATA" title={t.daily}>
        <div className="grid gap-5 xl:grid-cols-[1fr_0.72fr]">
          <TacticalCard tone="cs2">
            <TacticalCardHeader
              Icon={CalendarDays}
              badge={<TacticalBadge>{detail.dailyScores.length}</TacticalBadge>}
              eyebrow={t.month}
              title={t.daily}
            />
            {detail.dailyScores.length > 0 ? (
              <div className="mt-6 grid gap-3">
                {detail.dailyScores.map((score) => (
                  <div key={`${score.serverKey}-${score.date.toISOString()}`} className="server-metric p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                          {formatDate(score.date, locale)} / {score.serverKey}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white/56">
                          {formatMinutes(score.minutesOnline, locale)}
                        </p>
                      </div>
                      <p className="font-display text-3xl font-black text-white">
                        {formatNumber(score.totalPoints, locale)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm font-semibold leading-7 text-white/56">{t.empty}</p>
            )}
          </TacticalCard>

          <div className="grid gap-5">
            <TacticalCard tone="respawn">
              <TacticalCardHeader
                Icon={Activity}
                badge={<TacticalBadge>{detail.actions.length}</TacticalBadge>}
                eyebrow="ACTIONS"
                title={t.latestActions}
              />
              <div className="mt-6 grid gap-3">
                {detail.actions.length > 0 ? detail.actions.map((action) => (
                  <div key={`${action.serverKey}-${action.occurredAt.toISOString()}-${action.command}`} className="server-metric p-4">
                    <p className="text-sm font-black uppercase text-white">{action.command ?? "admin_action"}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/42">
                      {action.serverKey} / {formatDateTime(action.occurredAt, locale)}
                    </p>
                  </div>
                )) : <p className="text-sm font-semibold leading-7 text-white/56">{t.empty}</p>}
              </div>
            </TacticalCard>

            <TacticalCard tone="cs16">
              <TacticalCardHeader
                Icon={UserPlus}
                badge={<TacticalBadge>{detail.recruits.length}</TacticalBadge>}
                eyebrow="RECRUITS"
                title={t.recruits}
              />
              <div className="mt-6 grid gap-3">
                {detail.recruits.length > 0 ? detail.recruits.map((recruit) => (
                  <div key={`${recruit.serverKey}-${recruit.reportedAt.toISOString()}-${recruit.targetName}`} className="server-metric p-4">
                    <p className="text-sm font-black uppercase text-white">{recruit.targetName}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/42">
                      {recruit.serverKey} / {recruit.status} / {formatDate(recruit.reportedAt, locale)}
                    </p>
                  </div>
                )) : <p className="text-sm font-semibold leading-7 text-white/56">{t.empty}</p>}
              </div>
            </TacticalCard>
          </div>
        </div>
      </TacticalSection>

      <TacticalSection className="pt-0" eyebrow="REPORTS" title={t.reports}>
        {detail.monthlyReports.length > 0 ? (
          <TacticalGrid columns="three">
            {detail.monthlyReports.map((report) => (
              <TacticalCard key={`${report.serverKey}-${report.adminSteamId}-${report.month}`} tone="global">
                <TacticalCardHeader
                  Icon={Star}
                  badge={<TacticalBadge>{report.serverKey}</TacticalBadge>}
                  eyebrow={report.month}
                  title={report.totalPoints}
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <TacticalInfoBlock label={t.minutes} value={formatMinutes(report.minutesOnline, locale)} />
                  <TacticalInfoBlock label={t.activeDays} value={formatNumber(report.activeDays, locale)} />
                  <TacticalInfoBlock label={t.actions} value={formatNumber(report.actionsCount, locale)} />
                  <TacticalInfoBlock label={t.recruits} value={formatNumber(report.recruitsAccepted, locale)} />
                </div>
              </TacticalCard>
            ))}
          </TacticalGrid>
        ) : (
          <TacticalCard tone="global" status="pending">
            <p className="relative z-10 text-sm font-semibold leading-7 text-white/56">{t.empty}</p>
          </TacticalCard>
        )}
      </TacticalSection>
    </>
  );
}
