import { Activity, Headphones, MessageSquare, Server, Trophy, type LucideIcon } from "lucide-react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { TacticalCardChrome, TacticalStatusBadge, TacticalTag } from "@/components/home/HomeTacticalPrimitives";
import type { Locale } from "@/i18n/routing";
import { forumLinks } from "@/lib/forum-links";

type ProofCard = {
  Icon: LucideIcon;
  copy: string;
  href: string;
  linkType: "external" | "internal";
  status: string;
  tags: readonly string[];
  title: string;
  tone: "cs16" | "respawn" | "cs2" | "global";
};

const cardVariantClass: Record<ProofCard["tone"], string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  global: "server-card--global",
};

const content: Record<
  Locale,
  {
    cards: readonly ProofCard[];
    copy: string;
    cta: string;
    eyebrow: string;
    proofLabel: string;
    title: string;
  }
> = {
  ro: {
    eyebrow: "Trust proof",
    title: "Comunitate reala. Activitate reala.",
    copy:
      "Nu folosim cifre inventate. Pe masura ce apar capturi reale din servere, forum sau voice, le putem urca aici.",
    cta: "Deschide",
    proofLabel: "Activitate verificabila",
    cards: [
      {
        Icon: Server,
        copy: "Statusul live si IP-urile serverelor raman vizibile pentru jucatori.",
        href: "/servers",
        linkType: "internal",
        status: "LIVE",
        tags: ["servere", "ip"],
        title: "Servere CS active",
        tone: "cs2",
      },
      {
        Icon: Trophy,
        copy: "Clasamentul arata progresul jucatorilor fara promisiuni artificiale.",
        href: "/rankings",
        linkType: "internal",
        status: "TOP",
        tags: ["rankings", "xp"],
        title: "Clasament live",
        tone: "global",
      },
      {
        Icon: MessageSquare,
        copy: "Forumul este locul pentru cereri, reguli, suport si anunturi.",
        href: forumLinks.home,
        linkType: "external",
        status: "FORUM",
        tags: ["cereri", "suport"],
        title: "Forum comunitate",
        tone: "respawn",
      },
      {
        Icon: Headphones,
        copy: "TeamSpeak si Discord raman canalele rapide pentru voice si discutii.",
        href: "ts3server://ts.free-arena.ro",
        linkType: "external",
        status: "VOICE",
        tags: ["ts3", "discord"],
        title: "Voice comunitate",
        tone: "cs16",
      },
    ],
  },
  en: {
    eyebrow: "Trust proof",
    title: "Real community. Real activity.",
    copy:
      "We do not use fake numbers. As real screenshots from servers, forum, or voice appear, they can be uploaded here.",
    cta: "Open",
    proofLabel: "Verifiable activity",
    cards: [
      {
        Icon: Server,
        copy: "Live status and server IPs stay visible for players.",
        href: "/servers",
        linkType: "internal",
        status: "LIVE",
        tags: ["servers", "ip"],
        title: "Active CS servers",
        tone: "cs2",
      },
      {
        Icon: Trophy,
        copy: "Rankings show player progress without artificial promises.",
        href: "/rankings",
        linkType: "internal",
        status: "TOP",
        tags: ["rankings", "xp"],
        title: "Live rankings",
        tone: "global",
      },
      {
        Icon: MessageSquare,
        copy: "The forum is the place for requests, rules, support, and announcements.",
        href: forumLinks.home,
        linkType: "external",
        status: "FORUM",
        tags: ["requests", "support"],
        title: "Community forum",
        tone: "respawn",
      },
      {
        Icon: Headphones,
        copy: "TeamSpeak and Discord stay the fast channels for voice and discussion.",
        href: "ts3server://ts.free-arena.ro",
        linkType: "external",
        status: "VOICE",
        tags: ["ts3", "discord"],
        title: "Community voice",
        tone: "cs16",
      },
    ],
  },
};

export function TrustProofSection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section className="neon-section px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h2 className="neon-heading mt-5 max-w-4xl font-display text-[clamp(2.3rem,5vw,4.8rem)] font-black uppercase leading-[0.9] text-white">
              {page.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-white/62">
              {page.copy}
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {page.cards.map(({ Icon, copy, href, linkType, status, tags, title, tone }) => {
            const card = (
              <>
                <TacticalCardChrome />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="server-card__icon grid size-14 shrink-0 place-items-center">
                      <Icon size={26} className="server-card__accent-icon" aria-hidden="true" />
                    </span>
                    <TacticalStatusBadge label={status} />
                  </div>
                  <div className="server-player-core mt-5 grid aspect-video place-items-center p-4">
                    <div className="text-center">
                      <Activity size={32} className="mx-auto server-card__accent-icon" aria-hidden="true" />
                      <p className="mt-3 px-4 text-xs font-black uppercase tracking-[0.14em] text-white/44">
                        {page.proofLabel}
                      </p>
                    </div>
                  </div>
                  <h3 className="server-card__title mt-5 font-display text-xl font-black uppercase text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/58">
                    {copy}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <TacticalTag key={tag} label={tag} />
                    ))}
                  </div>
                  <span className="server-details-button mt-auto inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition">
                    {page.cta}
                  </span>
                </div>
              </>
            );

            return linkType === "internal" ? (
              <TrackedLink
                className={`server-tactical-card neon-hover ${cardVariantClass[tone]} server-tactical-card--online home-trust-card group flex h-full min-w-0 flex-col p-5`}
                data-occupancy="low"
                data-status="online"
                eventName="click_server_details"
                eventPayload={{ location: "trust_proof", title }}
                href={href}
                key={title}
              >
                {card}
              </TrackedLink>
            ) : (
              <TrackedAnchor
                className={`server-tactical-card neon-hover ${cardVariantClass[tone]} server-tactical-card--online home-trust-card group flex h-full min-w-0 flex-col p-5`}
                data-occupancy="low"
                data-status="online"
                eventName={href.startsWith("ts3server") ? "click_teamspeak" : "click_forum"}
                eventPayload={{ location: "trust_proof", title }}
                href={href}
                key={title}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                target={href.startsWith("http") ? "_blank" : undefined}
              >
                {card}
              </TrackedAnchor>
            );
          })}
        </div>
      </div>
    </section>
  );
}
