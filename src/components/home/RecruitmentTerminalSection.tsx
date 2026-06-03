"use client";

import {
  ArrowRight,
  Crosshair,
  FileText,
  Gamepad2,
  Headphones,
  Mail,
  MessageSquare,
  RotateCcw,
  ShieldCheck,
  Terminal,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";
import { forumLinks } from "@/lib/forum-links";
import type { AnalyticsEventName } from "@/lib/analytics";

const DISCORD_URL = "https://discord.gg/freearena";
const EMAIL_ADDRESS = "gheorghe.botonog79@gmail.com";
const EMAIL_URL = `mailto:${EMAIL_ADDRESS}?subject=FREE-ARENA%20staff%20application`;

type RecruitmentStatus = "open" | "limited";
type ContactRoute = "forum" | "discord" | "email";
type RecruitmentTone = "forum" | "teamspeak" | "cs16" | "cs2" | "respawn" | "community";

type RecruitmentRole = {
  Icon: LucideIcon;
  key: RecruitmentTone;
  route: ContactRoute;
  status: RecruitmentStatus;
};

type ContactOption = {
  Icon: LucideIcon;
  eventName: AnalyticsEventName;
  href: string;
  key: ContactRoute;
};

const roles: RecruitmentRole[] = [
  { Icon: FileText, key: "forum", route: "forum", status: "open" },
  { Icon: Headphones, key: "teamspeak", route: "discord", status: "limited" },
  { Icon: Crosshair, key: "cs16", route: "forum", status: "open" },
  { Icon: Gamepad2, key: "cs2", route: "discord", status: "limited" },
  { Icon: RotateCcw, key: "respawn", route: "forum", status: "open" },
  { Icon: UsersRound, key: "community", route: "email", status: "open" },
];

const contactOptions: ContactOption[] = [
  { Icon: FileText, eventName: "click_forum", href: forumLinks.adminRequests, key: "forum" },
  { Icon: MessageSquare, eventName: "click_join_discord", href: DISCORD_URL, key: "discord" },
  { Icon: Mail, eventName: "click_apply_staff", href: EMAIL_URL, key: "email" },
];

const roleToneClass: Record<RecruitmentTone, string> = {
  forum: "server-card--cs16",
  teamspeak: "server-card--cs2",
  cs16: "server-card--respawn",
  cs2: "server-card--global",
  respawn: "server-card--cs16",
  community: "server-card--respawn",
};

const contactHref: Record<ContactRoute, string> = {
  discord: DISCORD_URL,
  email: EMAIL_URL,
  forum: forumLinks.adminRequests,
};

export function RecruitmentTerminalSection() {
  const t = useTranslations("RecruitmentTerminal");

  return (
    <section id="recruitment-terminal" className="recruitment-terminal-section neon-section scroll-mt-32 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.36fr)] lg:items-end">
          <div className="max-w-4xl">
            <p className="neon-kicker section-badge-label inline-flex items-center gap-2 px-4 py-2">
              <Terminal size={15} aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 className="neon-heading mt-5 font-display text-[clamp(2.45rem,5.4vw,5.4rem)] font-black uppercase leading-[0.88] text-white">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/64">
              {t("copy")}
            </p>
          </div>

          <div className="recruitment-route-panel server-tactical-card server-card--global server-tactical-card--online h-fit p-4" data-occupancy="low" data-status="online">
            <div className="server-card__backdrop" aria-hidden="true" />
            <div className="server-card__noise" aria-hidden="true" />
            <div className="server-card__scanline" aria-hidden="true" />
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">{t("contacts.label")}</p>
              <div className="mt-3 grid gap-2">
                {contactOptions.map(({ Icon, eventName, href, key }) => (
                  <TrackedAnchor
                    className="recruitment-route-link inline-flex min-h-11 items-center justify-between gap-3 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition"
                    eventName={eventName}
                    eventPayload={{ location: "recruitment_terminal_routes", route: key }}
                    href={href}
                    key={key}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    target={href.startsWith("http") ? "_blank" : undefined}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon size={15} className="server-card__accent-icon" aria-hidden="true" />
                      {t(`contacts.${key}`)}
                    </span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </TrackedAnchor>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {roles.map((role) => (
            <RecruitmentCard
              Icon={role.Icon}
              applyLabel={t("apply")}
              key={role.key}
              requirements={[t(`roles.${role.key}.requirements.one`), t(`roles.${role.key}.requirements.two`)]}
              responsibilities={[t(`roles.${role.key}.responsibilities.one`), t(`roles.${role.key}.responsibilities.two`)]}
              roleKey={role.key}
              routeHref={contactHref[role.route]}
              routeLabel={t(`contacts.${role.route}`)}
              status={role.status}
              statusLabel={role.status === "open" ? "OPEN" : "LIMITED"}
              text={{
                description: t(`roles.${role.key}.description`),
                requirements: t("labels.requirements"),
                responsibilities: t("labels.responsibilities"),
                route: t("labels.route"),
                title: t(`roles.${role.key}.title`),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecruitmentCard({
  Icon,
  applyLabel,
  requirements,
  responsibilities,
  roleKey,
  routeHref,
  routeLabel,
  status,
  statusLabel,
  text,
}: {
  Icon: LucideIcon;
  applyLabel: string;
  requirements: string[];
  responsibilities: string[];
  roleKey: RecruitmentTone;
  routeHref: string;
  routeLabel: string;
  status: RecruitmentStatus;
  statusLabel: string;
  text: {
    description: string;
    requirements: string;
    responsibilities: string;
    route: string;
    title: string;
  };
}) {
  return (
    <article
      className={`recruitment-terminal-card server-tactical-card neon-hover ${roleToneClass[roleKey]} server-tactical-card--online group flex h-full min-w-0 flex-col p-5 sm:p-6`}
      data-occupancy={status === "open" ? "low" : "medium"}
      data-status="online"
    >
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="server-card__shine" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="recruitment-terminal-icon server-card__icon grid size-16 shrink-0 place-items-center">
            <Icon size={32} className="server-card__accent-icon" aria-hidden="true" />
          </span>
          <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
            <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
            {statusLabel}
          </span>
        </div>

        <h3 className="server-card__title mt-7 font-display text-[clamp(1.85rem,2.9vw,2.75rem)] font-black uppercase leading-none text-white">
          {text.title}
        </h3>
        <p className="mt-4 text-sm font-semibold leading-6 text-white/64">
          {text.description}
        </p>

        <RecruitmentList label={text.requirements} items={requirements} />
        <RecruitmentList label={text.responsibilities} items={responsibilities} />

        <div className="mt-auto pt-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white/38">
            {text.route}: <span className="text-white/72">{routeLabel}</span>
          </p>
          <TrackedAnchor
            className="server-join-button inline-flex min-h-12 w-full items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition"
            eventName="click_apply_staff"
            eventPayload={{ location: "recruitment_terminal", role: roleKey, route: routeLabel }}
            href={routeHref}
            rel={routeHref.startsWith("http") ? "noreferrer" : undefined}
            target={routeHref.startsWith("http") ? "_blank" : undefined}
          >
            {applyLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </TrackedAnchor>
        </div>
      </div>
    </article>
  );
}

function RecruitmentList({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="mt-5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-white/38">{label}</p>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li className="recruitment-terminal-line flex gap-2 text-sm font-semibold leading-6 text-white/66" key={item}>
            <ShieldCheck size={15} className="mt-1 shrink-0 text-[color:var(--card-accent)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
