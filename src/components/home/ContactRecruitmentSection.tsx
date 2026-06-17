import { ArrowRight, Headphones, Mail, MessageCircle, MessagesSquare, UserPlus, type LucideIcon } from "lucide-react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { TacticalCardChrome, TacticalMetric, TacticalStatusBadge, TacticalTag } from "@/components/home/HomeTacticalPrimitives";
import type { Locale } from "@/i18n/routing";
import { forumLinks } from "@/lib/forum-links";
import { contactEmail } from "@/lib/routes";

const DISCORD_URL = "https://discord.gg/Unu756zZ";
const TEAMSPEAK_URL = "ts3server://ts.free-arena.ro";

type ContactCard = {
  Icon: LucideIcon;
  description?: string;
  eventName: "click_contact" | "click_forum" | "click_join_discord" | "click_teamspeak";
  href: string;
  label: string;
  rel?: string;
  status: string;
  tags: readonly string[];
  target?: string;
  tone: "cs16" | "respawn" | "cs2" | "global";
  value?: string;
};

const cardVariantClass: Record<ContactCard["tone"], string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  global: "server-card--global",
};

const content: Record<
  Locale,
  {
    apply: string;
    body: readonly string[];
    cards: readonly ContactCard[];
    ctaTitle: string;
    eyebrow: string;
    proposal: string;
    title: string;
    values: readonly string[];
  }
> = {
  ro: {
    eyebrow: "Contact & recrutare",
    title: "Ai întrebări? Hai să discutăm.",
    body: [
      "Suntem mereu deschiși la idei noi, sugestii și oameni care vor să contribuie la dezvoltarea FREE-ARENA.",
      "Fie ca doresti sa aplici pentru staff, sa propui un joc nou, sa organizezi un proiect sau sa ajuti comunitatea sa creasca, te incurajam sa ne contactezi.",
    ],
    ctaTitle: "Vrei sa faci parte din echipa?",
    values: ["Corectitudine", "Devotament", "Implicare", "Evolutie continua"],
    apply: "Aplica pentru staff",
    proposal: "Propune un joc nou",
    cards: [
      {
        Icon: MessageCircle,
        description: "Alătură-te comunității și discută direct cu echipa.",
        eventName: "click_join_discord",
        href: DISCORD_URL,
        label: "Discord",
        rel: "noreferrer",
        status: "LIVE",
        tags: ["chat", "support"],
        target: "_blank",
        tone: "cs2",
      },
      {
        Icon: Headphones,
        eventName: "click_teamspeak",
        href: TEAMSPEAK_URL,
        label: "TeamSpeak",
        status: "VOICE",
        tags: ["voice", "vip-ts"],
        tone: "respawn",
        value: "ts.free-arena.ro",
      },
      {
        Icon: MessagesSquare,
        eventName: "click_forum",
        href: forumLinks.home,
        label: "Forum",
        rel: "noreferrer",
        status: "FORUM",
        tags: ["cereri", "reguli"],
        target: "_blank",
        tone: "global",
        value: "free-arena.ro",
      },
      {
        Icon: Mail,
        eventName: "click_contact",
        href: `mailto:${contactEmail}`,
        label: "Email",
        status: "CONTACT",
        tags: ["direct", "support"],
        tone: "cs16",
        value: contactEmail,
      },
    ],
  },
  en: {
    eyebrow: "Contact & recruitment",
    title: "Questions? Let us talk.",
    body: [
      "We are always open to new ideas, suggestions, and people who want to contribute to FREE-ARENA's development.",
      "Whether you want to apply for staff, propose a new game, organize a project, or help the community grow, we encourage you to contact us.",
    ],
    ctaTitle: "Want to be part of the team?",
    values: ["Fairness", "Dedication", "Involvement", "Continuous evolution"],
    apply: "Apply for staff",
    proposal: "Propose a new game",
    cards: [
      {
        Icon: MessageCircle,
        description: "Join the community and talk directly with the team.",
        eventName: "click_join_discord",
        href: DISCORD_URL,
        label: "Discord",
        rel: "noreferrer",
        status: "LIVE",
        tags: ["chat", "support"],
        target: "_blank",
        tone: "cs2",
      },
      {
        Icon: Headphones,
        eventName: "click_teamspeak",
        href: TEAMSPEAK_URL,
        label: "TeamSpeak",
        status: "VOICE",
        tags: ["voice", "vip-ts"],
        tone: "respawn",
        value: "ts.free-arena.ro",
      },
      {
        Icon: MessagesSquare,
        eventName: "click_forum",
        href: forumLinks.home,
        label: "Forum",
        rel: "noreferrer",
        status: "FORUM",
        tags: ["requests", "rules"],
        target: "_blank",
        tone: "global",
        value: "free-arena.ro",
      },
      {
        Icon: Mail,
        eventName: "click_contact",
        href: `mailto:${contactEmail}`,
        label: "Email",
        status: "CONTACT",
        tags: ["direct", "support"],
        tone: "cs16",
        value: contactEmail,
      },
    ],
  },
};

export function ContactRecruitmentSection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section className="neon-section fa-premium-section-tight px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.42fr)] lg:items-end">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h2 className="neon-heading mt-5 max-w-4xl font-display text-[clamp(2.1rem,4.8vw,4.4rem)] font-black uppercase leading-[0.9] text-white">
              {page.title}
            </h2>
            <div className="mt-5 grid max-w-4xl gap-3 text-base font-semibold leading-7 text-white/64">
              {page.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <article
            className="server-tactical-card neon-hover server-card--global server-tactical-card--online home-mini-tactical-card p-5"
            data-occupancy="low"
            data-status="online"
          >
            <TacticalCardChrome />
            <div className="relative z-10">
              <TacticalStatusBadge label={locale === "ro" ? "ECHIPA" : "TEAM"} />
              <h3 className="server-card__title mt-5 font-display text-2xl font-black uppercase leading-none text-white">
                {page.ctaTitle}
              </h3>
              <div className="mt-5 grid gap-2">
                {page.values.map((value) => (
                  <TacticalMetric key={value} label="FREE-ARENA" value={value} />
                ))}
              </div>
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {page.cards.map(({ Icon, description, eventName, href, label, rel, status, tags, target, tone, value }) => (
            <TrackedAnchor
              key={label}
              className={`server-tactical-card neon-hover ${cardVariantClass[tone]} server-tactical-card--online home-unified-card group flex h-full min-w-0 flex-col p-5`}
              data-occupancy="low"
              data-status="online"
              eventName={eventName}
              eventPayload={{ location: "homepage_contact_recruitment", target: label.toLowerCase() }}
              href={href}
              rel={rel}
              target={target}
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
                  {label}
                </h3>
                <p className="server-card__region mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">
                  FREE-ARENA
                </p>
                {description ? (
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/58">
                    {description}
                  </p>
                ) : null}
                {value ? (
                  <p className="mt-3 break-words text-sm font-black text-cyan-100">
                    {value}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <TacticalTag key={tag} label={tag} />
                  ))}
                </div>
                <span className="server-details-button mt-auto inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition">
                  {locale === "ro" ? "Deschide" : "Open"}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </TrackedAnchor>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            className="server-join-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition"
            eventName="click_apply_staff"
            eventPayload={{ location: "homepage_contact_recruitment" }}
            href="/join-staff"
          >
            <UserPlus size={18} aria-hidden="true" />
            {page.apply}
            <ArrowRight size={18} aria-hidden="true" />
          </TrackedLink>
          <TrackedAnchor
            className="server-details-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition"
            eventName="click_forum"
            eventPayload={{ location: "homepage_contact_recruitment", target: "game_proposal" }}
            href={forumLinks.support}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MessagesSquare size={18} aria-hidden="true" />
            {page.proposal}
            <ArrowRight size={18} aria-hidden="true" />
          </TrackedAnchor>
        </div>
      </div>
    </section>
  );
}
