import { ArrowRight, MessageSquare, ShieldCheck, UserPlus } from "lucide-react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { TacticalCardChrome, TacticalMetric, TacticalStatusBadge, TacticalTag } from "@/components/home/HomeTacticalPrimitives";
import type { Locale } from "@/i18n/routing";

const DISCORD_URL = "https://discord.gg/freearena";

const content = {
  ro: {
    apply: "Aplica admin",
    copy:
      "Cautam oameni maturi, activi seara, care pot ajuta jucatorii si pot tine serverele curate.",
    discord: "Discuta pe Discord",
    eyebrow: "Recrutare admini",
    title: "Cautam admini activi",
  },
  en: {
    apply: "Apply admin",
    copy:
      "We are looking for mature people active in the evening who can help players and keep servers clean.",
    discord: "Talk on Discord",
    eyebrow: "Admin recruitment",
    title: "We need active admins",
  },
} as const;

const proofItems = {
  ro: [
    { Icon: ShieldCheck, label: "Reguli", value: "Clare" },
    { Icon: UserPlus, label: "Aplicare", value: "Forum" },
    { Icon: MessageSquare, label: "Coordonare", value: "Discord" },
  ],
  en: [
    { Icon: ShieldCheck, label: "Rules", value: "Clear" },
    { Icon: UserPlus, label: "Apply", value: "Forum" },
    { Icon: MessageSquare, label: "Coordination", value: "Discord" },
  ],
} as const;

export function StaffRecruitmentSection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section id="staff" className="neon-section fa-premium-section-tight scroll-mt-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
          <article
            className="server-tactical-card neon-hover server-card--respawn server-tactical-card--online home-feature-panel group flex h-full min-w-0 flex-col p-5 sm:p-6 lg:p-8"
            data-occupancy="low"
            data-status="online"
          >
            <TacticalCardChrome />
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <span className="server-card__icon grid size-16 shrink-0 place-items-center">
                  <UserPlus size={32} className="server-card__accent-icon" aria-hidden="true" />
                </span>
                <TacticalStatusBadge label="OPEN" />
              </div>
              <p className="neon-kicker section-badge-label mt-5 inline-flex px-4 py-2">
                {page.eyebrow}
              </p>
              <h2 className="neon-heading mt-5 max-w-3xl font-display text-[clamp(2.3rem,5vw,4.8rem)] font-black uppercase leading-[0.9] text-white">
                {page.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-white/64">
                {page.copy}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <TacticalTag label="admin" />
                <TacticalTag label="forum" />
                <TacticalTag label="discord" />
              </div>
              <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
                <TrackedLink
                  className="server-join-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition"
                  eventName="click_apply_staff"
                  eventPayload={{ location: "homepage_staff_block" }}
                  href="/join-staff"
                >
                  <UserPlus size={18} aria-hidden="true" />
                  {page.apply}
                  <ArrowRight size={18} aria-hidden="true" />
                </TrackedLink>
                <TrackedAnchor
                  className="server-details-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition"
                  eventName="click_join_discord"
                  eventPayload={{ location: "homepage_staff_block" }}
                  href={DISCORD_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MessageSquare size={18} aria-hidden="true" />
                  {page.discord}
                </TrackedAnchor>
              </div>
            </div>
          </article>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {proofItems[locale].map(({ Icon, label, value }) => (
              <article
                key={label}
                className="server-tactical-card neon-hover server-card--global server-tactical-card--online home-mini-tactical-card p-4"
                data-occupancy="low"
                data-status="online"
              >
                <TacticalCardChrome />
                <div className="relative z-10">
                  <TacticalMetric Icon={Icon} label={label} value={value} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
