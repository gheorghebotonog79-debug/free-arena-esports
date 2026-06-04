import { ArrowRight, CalendarDays, Gift, MessageSquare, ShieldCheck, Sparkles, Trophy, UserPlus, type LucideIcon } from "lucide-react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { TacticalCardChrome, TacticalMetric, TacticalStatusBadge, TacticalTag } from "@/components/home/HomeTacticalPrimitives";
import type { Locale } from "@/i18n/routing";

type ActivityItem = {
  Icon: LucideIcon;
  copy: string;
  focus: string;
  status: string;
  tags: readonly string[];
  title: string;
  tone: "cs16" | "respawn" | "cs2" | "global";
};

const cardVariantClass: Record<ActivityItem["tone"], string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  global: "server-card--global",
};

const content: Record<
  Locale,
  {
    cards: readonly ActivityItem[];
    ctaDiscord: string;
    ctaRankings: string;
    ctaStaff: string;
    eyebrow: string;
    note: string;
    title: string;
  }
> = {
  ro: {
    eyebrow: "Activitate comunitate",
    title: "Evenimente FREE-ARENA",
    note: "Evenimentele sunt activate treptat pe masura ce comunitatea creste.",
    ctaDiscord: "Intra pe Discord pentru anunturi",
    ctaRankings: "Vezi clasamentul",
    ctaStaff: "Aplica staff",
    cards: [
      {
        Icon: CalendarDays,
        title: "Friday Night CS 1.6",
        focus: "CS 1.6",
        status: "EVENT",
        tags: ["classic", "community"],
        tone: "cs16",
        copy: "Seara dedicată rundelor clasice, hărților cunoscute și jucătorilor care vor meciuri curate.",
      },
      {
        Icon: Sparkles,
        title: "Frag of the Week",
        focus: "Highlights",
        status: "OPEN",
        tags: ["discord", "forum"],
        tone: "cs2",
        copy: "Highlight-uri și faze bune trimise de comunitate, pregătite pentru Discord și forum.",
      },
      {
        Icon: Gift,
        title: "VIP Giveaway",
        focus: "VIP",
        status: "REWARD",
        tags: ["vip", "activity"],
        tone: "global",
        copy: "Premii mici și beneficii VIP pot fi oferite treptat pentru activitate reală pe servere.",
      },
      {
        Icon: ShieldCheck,
        title: "Admin Recruitment",
        focus: "Staff",
        status: "OPEN",
        tags: ["admin", "rules"],
        tone: "respawn",
        copy: "Căutăm oameni maturi care pot ajuta seara, pot ține comunitatea curată și pot răspunde pe Discord.",
      },
    ],
  },
  en: {
    eyebrow: "Community activity",
    title: "FREE-ARENA Events",
    note: "Events are activated gradually as the community grows.",
    ctaDiscord: "Join Discord for announcements",
    ctaRankings: "View rankings",
    ctaStaff: "Join staff",
    cards: [
      {
        Icon: CalendarDays,
        title: "Friday Night CS 1.6",
        focus: "CS 1.6",
        status: "EVENT",
        tags: ["classic", "community"],
        tone: "cs16",
        copy: "A night for classic rounds, familiar maps, and players who want clean matches.",
      },
      {
        Icon: Sparkles,
        title: "Frag of the Week",
        focus: "Highlights",
        status: "OPEN",
        tags: ["discord", "forum"],
        tone: "cs2",
        copy: "Good plays and community highlights prepared for Discord and forum activity.",
      },
      {
        Icon: Gift,
        title: "VIP Giveaway",
        focus: "VIP",
        status: "REWARD",
        tags: ["vip", "activity"],
        tone: "global",
        copy: "Small rewards and VIP benefits can be offered gradually for real server activity.",
      },
      {
        Icon: ShieldCheck,
        title: "Admin Recruitment",
        focus: "Staff",
        status: "OPEN",
        tags: ["admin", "rules"],
        tone: "respawn",
        copy: "We are looking for mature people who can help in the evening and keep the community clean.",
      },
    ],
  },
};

export function HomeActivitySection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section id="events" className="neon-section fa-premium-section-tight scroll-mt-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h2 className="neon-heading mt-5 max-w-3xl font-display text-[clamp(2.3rem,5vw,4.8rem)] font-black uppercase leading-[0.9] text-white">
              {page.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
              {page.note}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedAnchor
                href="https://discord.gg/freearena"
                target="_blank"
                rel="noopener noreferrer"
                eventName="click_join_discord"
                eventPayload={{ location: "homepage_events" }}
                className="server-join-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition"
              >
                <MessageSquare size={18} aria-hidden="true" />
                {page.ctaDiscord}
                <ArrowRight size={18} aria-hidden="true" />
              </TrackedAnchor>
              <TrackedLink
                href="/rankings"
                eventName="click_server_details"
                eventPayload={{ location: "homepage_events", target: "rankings" }}
                className="server-details-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition"
              >
                <Trophy size={18} aria-hidden="true" />
                {page.ctaRankings}
              </TrackedLink>
              <TrackedLink
                href="/join-staff"
                eventName="click_apply_staff"
                eventPayload={{ location: "homepage_events" }}
                className="server-copy-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition"
              >
                <UserPlus size={18} aria-hidden="true" />
                {page.ctaStaff}
              </TrackedLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.cards.map(({ Icon, copy, focus, status, tags, title, tone }) => (
              <article
                key={title}
                className={`server-tactical-card neon-hover ${cardVariantClass[tone]} server-tactical-card--online home-unified-card group flex h-full min-w-0 flex-col p-5`}
                data-occupancy="low"
                data-status="online"
              >
                <TacticalCardChrome />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="server-card__icon grid size-14 shrink-0 place-items-center">
                      <Icon size={26} className="server-card__accent-icon" aria-hidden="true" />
                    </span>
                    <TacticalStatusBadge label={status} />
                  </div>
                  <h3 className="server-card__title mt-5 font-display text-2xl font-black uppercase leading-none text-white">
                    {title}
                  </h3>
                  <p className="server-card__region mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">
                    FREE-ARENA
                  </p>
                  <div className="server-player-core mt-5 p-3">
                    <TacticalMetric label={locale === "ro" ? "Focus" : "Focus"} value={focus} />
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-white/62">
                    {copy}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {tags.map((tag) => (
                      <TacticalTag key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
