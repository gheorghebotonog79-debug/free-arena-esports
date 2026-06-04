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
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type {
  PublicAdminActivityDetail,
  PublicAdminActivitySummary,
} from "@/lib/admin-monitor/public-activity";
import {
  TacticalBadge,
  TacticalCard,
} from "@/components/public/PublicPagePrimitives";
import type { TacticalStatus, TacticalTone } from "@/components/public/PublicPagePrimitives";

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

function classes(...values: Array<false | null | string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function CompactCard({
  as,
  children,
  className,
  status,
  tone = "cs2",
}: {
  as?: "article" | "aside" | "div" | "section";
  children: ReactNode;
  className?: string;
  status?: TacticalStatus;
  tone?: TacticalTone;
}) {
  return (
    <TacticalCard
      as={as}
      tone={tone}
      status={status}
      className={classes("!h-auto !min-h-0 !p-3 sm:!p-4", className)}
      contentClassName="!h-auto"
    >
      {children}
    </TacticalCard>
  );
}

function CompactHeader({
  badge,
  children,
  eyebrow,
  Icon,
  title,
}: {
  badge?: ReactNode;
  children?: ReactNode;
  eyebrow?: ReactNode;
  Icon?: LucideIcon;
  title: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        {Icon ? (
          <span className="server-card__icon grid size-11 shrink-0 place-items-center sm:size-12">
            <Icon size={23} className="server-card__accent-icon" aria-hidden="true" />
          </span>
        ) : null}
        {badge}
      </div>
      {eyebrow ? (
        <p className="server-card__region mt-4 text-[0.62rem] font-black uppercase tracking-[0.16em]">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="server-card__title mt-1 font-display text-[clamp(1.35rem,2.25vw,2.15rem)] font-black uppercase leading-none text-white">
        {title}
      </h3>
      {children}
    </div>
  );
}

function CompactInfoBlock({
  Icon,
  label,
  value,
}: {
  Icon?: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="server-metric min-w-0 p-2.5">
      <p className="flex items-center gap-1.5 text-[0.58rem] font-black uppercase tracking-[0.13em] text-white/36">
        {Icon ? <Icon size={13} className="server-card__accent-icon shrink-0" aria-hidden="true" /> : null}
        {label}
      </p>
      <div className="mt-1.5 break-words text-xs font-black uppercase text-white sm:text-[0.82rem]">
        {value}
      </div>
    </div>
  );
}

function CompactPageHero({
  actions,
  aside,
  description,
  eyebrow,
  Icon,
  meta,
  title,
}: {
  actions?: ReactNode;
  aside?: ReactNode;
  description: ReactNode;
  eyebrow: ReactNode;
  Icon: LucideIcon;
  meta?: ReactNode;
  title: ReactNode;
}) {
  return (
    <section className="neon-section px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto grid w-full max-w-[92rem] gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] lg:items-stretch">
        <CompactCard tone="cs2" className="!p-4 sm:!p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="server-card__icon grid size-12 shrink-0 place-items-center sm:size-14">
              <Icon size={27} className="server-card__accent-icon" aria-hidden="true" />
            </span>
            {meta ? (
              <TacticalBadge className="max-w-[58%] whitespace-normal break-all text-right">
                {meta}
              </TacticalBadge>
            ) : null}
          </div>
          <p className="server-card__region mt-5 text-[0.66rem] font-black uppercase tracking-[0.18em]">
            {eyebrow}
          </p>
          <h1 className="neon-heading mt-2 font-display text-[clamp(2.05rem,5.2vw,4.25rem)] font-black uppercase leading-[0.88] text-white">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-white/62 sm:text-[0.95rem]">
            {description}
          </p>
          {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
        </CompactCard>
        {aside}
      </div>
    </section>
  );
}

function CompactSection({
  children,
  className,
  description,
  eyebrow,
  title,
}: {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
}) {
  return (
    <section className={classes("neon-section px-4 py-8 sm:px-6 lg:px-8 lg:py-10", className)}>
      <div className="mx-auto w-full max-w-[92rem]">
        {eyebrow || title || description ? (
          <div className="mb-5 max-w-4xl">
            {eyebrow ? (
              <p className="neon-kicker section-badge-label inline-flex px-3 py-1.5 text-[0.66rem]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="neon-heading mt-3 font-display text-[clamp(1.75rem,4vw,3.45rem)] font-black uppercase leading-[0.9] text-white">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/60">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function CompactActionLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link
      className="server-details-button mt-auto inline-flex min-h-10 items-center justify-center gap-2 px-3 py-2 text-[0.72rem] font-black uppercase tracking-[0.11em] text-white transition"
      href={href}
    >
      {children}
    </Link>
  );
}

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
      <CompactPageHero
        Icon={RadioTower}
        description={t.copy}
        eyebrow="FREE-ARENA STAFF"
        meta={month}
        title={t.title}
        aside={
          <CompactCard as="aside" tone="respawn">
            <CompactHeader
              Icon={ShieldCheck}
              badge={<TacticalBadge dot>{month}</TacticalBadge>}
              eyebrow="LIVE MONITOR"
              title={t.topAdmins}
            />
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CompactInfoBlock Icon={Users} label={t.adminCount} value={formatNumber(totals.admins, locale)} />
              <CompactInfoBlock Icon={Star} label={t.points} value={formatNumber(totals.points, locale)} />
              <CompactInfoBlock Icon={Clock} label={t.minutes} value={formatMinutes(totals.minutes, locale)} />
              <CompactInfoBlock Icon={UserPlus} label={t.recruits} value={formatNumber(totals.recruits, locale)} />
            </div>
          </CompactCard>
        }
      />

      <CompactSection
        className="pt-5 lg:pt-6"
        description={t.copy}
        eyebrow="ADMIN ACTIVITY"
        title={t.topAdmins}
      >
        {admins.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {admins.map((admin, index) => (
              <CompactCard key={admin.adminSteamId} tone={index % 3 === 0 ? "cs2" : index % 3 === 1 ? "respawn" : "cs16"}>
                <CompactHeader
                  Icon={Trophy}
                  badge={<TacticalBadge dot>{admin.serverKey}</TacticalBadge>}
                  eyebrow={`#${index + 1}`}
                  title={admin.currentName}
                >
                  <p className="mt-2 break-words text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-white/42">
                    {admin.adminSteamId}
                  </p>
                </CompactHeader>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <CompactInfoBlock Icon={Star} label={t.points} value={formatNumber(admin.totalPoints, locale)} />
                  <CompactInfoBlock Icon={Clock} label={t.minutes} value={formatMinutes(admin.minutesOnline, locale)} />
                  <CompactInfoBlock Icon={CalendarDays} label={t.activeDays} value={formatNumber(admin.activeDays, locale)} />
                  <CompactInfoBlock Icon={Activity} label={t.actions} value={formatNumber(admin.actionsCount, locale)} />
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {admin.rewardTier ? <TacticalBadge>{admin.rewardTier}</TacticalBadge> : null}
                  {admin.upgradeEligible ? <TacticalBadge>{t.upgrade}</TacticalBadge> : null}
                  <TacticalBadge>{formatDate(admin.lastSeenAt, locale)}</TacticalBadge>
                </div>
                <CompactActionLink href={profileHref(admin.adminSteamId)}>
                  {t.view}
                  <ArrowRight size={16} aria-hidden="true" />
                </CompactActionLink>
              </CompactCard>
            ))}
          </div>
        ) : (
          <CompactCard tone="global" status="pending">
            <CompactHeader
              Icon={RadioTower}
              badge={<TacticalBadge>WAITING</TacticalBadge>}
              eyebrow="AMXX API"
              title={t.empty}
            />
          </CompactCard>
        )}
      </CompactSection>
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
      <CompactPageHero
        Icon={ShieldCheck}
        description={`${t.lastSeen}: ${formatDateTime(detail.admin.lastSeenAt, locale)}.`}
        eyebrow="ADMIN PROFILE"
        meta={detail.admin.steamId}
        title={detail.admin.currentName}
        actions={
          <CompactActionLink href="/admin-activity">
            {t.back}
          </CompactActionLink>
        }
        aside={
          <CompactCard as="aside" tone="cs2">
            <CompactHeader
              Icon={Trophy}
              badge={<TacticalBadge dot>{bestReport?.serverKey ?? "global"}</TacticalBadge>}
              eyebrow={t.month}
              title={bestReport ? bestReport.totalPoints : 0}
            />
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CompactInfoBlock Icon={Clock} label={t.minutes} value={formatMinutes(bestReport?.minutesOnline ?? 0, locale)} />
              <CompactInfoBlock Icon={CalendarDays} label={t.activeDays} value={formatNumber(bestReport?.activeDays ?? 0, locale)} />
              <CompactInfoBlock Icon={Activity} label={t.actions} value={formatNumber(bestReport?.actionsCount ?? 0, locale)} />
              <CompactInfoBlock Icon={UserPlus} label={t.recruits} value={formatNumber(bestReport?.recruitsAccepted ?? 0, locale)} />
            </div>
          </CompactCard>
        }
      />

      <CompactSection className="pt-5 lg:pt-6" eyebrow="PROFILE DATA" title={t.daily}>
        <div className="grid gap-4 xl:grid-cols-[1fr_0.72fr]">
          <CompactCard tone="cs2">
            <CompactHeader
              Icon={CalendarDays}
              badge={<TacticalBadge>{detail.dailyScores.length}</TacticalBadge>}
              eyebrow={t.month}
              title={t.daily}
            />
            {detail.dailyScores.length > 0 ? (
              <div className="mt-4 grid gap-2">
                {detail.dailyScores.map((score) => (
                  <div key={`${score.serverKey}-${score.date.toISOString()}`} className="server-metric p-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-cyan-200">
                          {formatDate(score.date, locale)} / {score.serverKey}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-white/56">
                          {formatMinutes(score.minutesOnline, locale)}
                        </p>
                      </div>
                      <p className="font-display text-2xl font-black text-white">
                        {formatNumber(score.totalPoints, locale)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm font-semibold leading-6 text-white/56">{t.empty}</p>
            )}
          </CompactCard>

          <div className="grid gap-4">
            <CompactCard tone="respawn">
              <CompactHeader
                Icon={Activity}
                badge={<TacticalBadge>{detail.actions.length}</TacticalBadge>}
                eyebrow="ACTIONS"
                title={t.latestActions}
              />
              <div className="mt-4 grid gap-2">
                {detail.actions.length > 0 ? detail.actions.map((action) => (
                  <div key={`${action.serverKey}-${action.occurredAt.toISOString()}-${action.command}`} className="server-metric p-3">
                    <p className="text-xs font-black uppercase text-white">{action.command ?? "admin_action"}</p>
                    <p className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-white/42">
                      {action.serverKey} / {formatDateTime(action.occurredAt, locale)}
                    </p>
                  </div>
                )) : <p className="text-sm font-semibold leading-7 text-white/56">{t.empty}</p>}
              </div>
            </CompactCard>

            <CompactCard tone="cs16">
              <CompactHeader
                Icon={UserPlus}
                badge={<TacticalBadge>{detail.recruits.length}</TacticalBadge>}
                eyebrow="RECRUITS"
                title={t.recruits}
              />
              <div className="mt-4 grid gap-2">
                {detail.recruits.length > 0 ? detail.recruits.map((recruit) => (
                  <div key={`${recruit.serverKey}-${recruit.reportedAt.toISOString()}-${recruit.targetName}`} className="server-metric p-3">
                    <p className="text-xs font-black uppercase text-white">{recruit.targetName}</p>
                    <p className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-white/42">
                      {recruit.serverKey} / {recruit.status} / {formatDate(recruit.reportedAt, locale)}
                    </p>
                  </div>
                )) : <p className="text-sm font-semibold leading-7 text-white/56">{t.empty}</p>}
              </div>
            </CompactCard>
          </div>
        </div>
      </CompactSection>

      <CompactSection className="pt-0" eyebrow="REPORTS" title={t.reports}>
        {detail.monthlyReports.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {detail.monthlyReports.map((report) => (
              <CompactCard key={`${report.serverKey}-${report.adminSteamId}-${report.month}`} tone="global">
                <CompactHeader
                  Icon={Star}
                  badge={<TacticalBadge>{report.serverKey}</TacticalBadge>}
                  eyebrow={report.month}
                  title={report.totalPoints}
                />
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <CompactInfoBlock label={t.minutes} value={formatMinutes(report.minutesOnline, locale)} />
                  <CompactInfoBlock label={t.activeDays} value={formatNumber(report.activeDays, locale)} />
                  <CompactInfoBlock label={t.actions} value={formatNumber(report.actionsCount, locale)} />
                  <CompactInfoBlock label={t.recruits} value={formatNumber(report.recruitsAccepted, locale)} />
                </div>
              </CompactCard>
            ))}
          </div>
        ) : (
          <CompactCard tone="global" status="pending">
            <p className="relative z-10 text-sm font-semibold leading-6 text-white/56">{t.empty}</p>
          </CompactCard>
        )}
      </CompactSection>
    </>
  );
}
