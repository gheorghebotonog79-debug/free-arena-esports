import { ArrowRight, FileText, LifeBuoy, Megaphone, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";
import { TacticalCardChrome, TacticalStatusBadge, TacticalTag } from "@/components/home/HomeTacticalPrimitives";
import type { Locale } from "@/i18n/routing";
import { forumLinks } from "@/lib/forum-links";

type ForumCard = {
  Icon: LucideIcon;
  copy: string;
  href: string;
  status: string;
  tags: readonly string[];
  title: string;
  tone: "cs16" | "respawn" | "cs2" | "global";
};

const cardVariantClass: Record<ForumCard["tone"], string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  global: "server-card--global",
};

const content: Record<
  Locale,
  {
    cards: readonly ForumCard[];
    copy: string;
    cta: string;
    eyebrow: string;
    title: string;
  }
> = {
  ro: {
    eyebrow: "Forum FREE-ARENA",
    title: "Activitate pe forum",
    copy:
      "Forumul ramane locul pentru cereri, reguli, suport si anunturi care trebuie sa ramana usor de gasit.",
    cta: "Deschide pe forum",
    cards: [
      {
        Icon: ShieldCheck,
        copy: "Locul potrivit pentru jucatorii care vor sa ajute comunitatea ca admini.",
        href: forumLinks.adminRequests,
        status: "OPEN",
        tags: ["admin", "forum"],
        title: "Cereri admin",
        tone: "respawn",
      },
      {
        Icon: Sparkles,
        copy: "Intrebari despre pachete, activare manuala si beneficii VIP.",
        href: forumLinks.vipRequests,
        status: "VIP",
        tags: ["vip", "shop"],
        title: "Cereri VIP",
        tone: "cs16",
      },
      {
        Icon: FileText,
        copy: "Reguli generale, comportament pe server si informatii pentru jucatori noi.",
        href: forumLinks.rules,
        status: "RULES",
        tags: ["reguli", "servere"],
        title: "Regulament servere",
        tone: "cs2",
      },
      {
        Icon: LifeBuoy,
        copy: "Suport pentru cont, servere, TeamSpeak, Discord sau probleme de comunitate.",
        href: forumLinks.support,
        status: "SUPORT",
        tags: ["support", "contact"],
        title: "Suport comunitate",
        tone: "global",
      },
      {
        Icon: Megaphone,
        copy: "Update-uri, mentenanta si anunturi importante pentru FREE-ARENA.",
        href: forumLinks.announcements,
        status: "NEWS",
        tags: ["anunturi", "updates"],
        title: "Anunturi importante",
        tone: "cs2",
      },
    ],
  },
  en: {
    eyebrow: "FREE-ARENA Forum",
    title: "Forum activity",
    copy:
      "The forum stays the place for requests, rules, support, and announcements that must remain easy to find.",
    cta: "Open on forum",
    cards: [
      {
        Icon: ShieldCheck,
        copy: "The place for players who want to help the community as admins.",
        href: forumLinks.adminRequests,
        status: "OPEN",
        tags: ["admin", "forum"],
        title: "Admin requests",
        tone: "respawn",
      },
      {
        Icon: Sparkles,
        copy: "Questions about packages, manual activation, and VIP benefits.",
        href: forumLinks.vipRequests,
        status: "VIP",
        tags: ["vip", "shop"],
        title: "VIP requests",
        tone: "cs16",
      },
      {
        Icon: FileText,
        copy: "General rules, server behavior, and information for new players.",
        href: forumLinks.rules,
        status: "RULES",
        tags: ["rules", "servers"],
        title: "Server rules",
        tone: "cs2",
      },
      {
        Icon: LifeBuoy,
        copy: "Support for accounts, servers, TeamSpeak, Discord, or community issues.",
        href: forumLinks.support,
        status: "SUPPORT",
        tags: ["support", "contact"],
        title: "Community support",
        tone: "global",
      },
      {
        Icon: Megaphone,
        copy: "Updates, maintenance, and important FREE-ARENA announcements.",
        href: forumLinks.announcements,
        status: "NEWS",
        tags: ["announcements", "updates"],
        title: "Important announcements",
        tone: "cs2",
      },
    ],
  },
};

export function ForumActivitySection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section className="neon-section fa-premium-section-tight px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h2 className="neon-heading mt-5 max-w-3xl font-display text-[clamp(2.3rem,5vw,4.8rem)] font-black uppercase leading-[0.9] text-white">
              {page.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
              {page.copy}
            </p>
            <TrackedAnchor
              className="server-join-button mt-6 inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition"
              eventName="click_forum"
              eventPayload={{ location: "forum_activity_intro" }}
              href={forumLinks.home}
              rel="noopener noreferrer"
              target="_blank"
            >
              {page.cta}
              <ArrowRight size={18} aria-hidden="true" />
            </TrackedAnchor>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {page.cards.map(({ Icon, copy, href, status, tags, title, tone }) => (
              <TrackedAnchor
                key={title}
                className={`server-tactical-card neon-hover ${cardVariantClass[tone]} server-tactical-card--online home-forum-card group flex h-full min-w-0 flex-col p-5`}
                data-occupancy="low"
                data-status="online"
                eventName="click_forum"
                eventPayload={{ location: "forum_activity_card", title }}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <TacticalCardChrome />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="server-card__icon grid size-14 shrink-0 place-items-center">
                      <Icon size={26} className="server-card__accent-icon" aria-hidden="true" />
                    </span>
                    <TacticalStatusBadge label={status} />
                  </div>
                  <h3 className="server-card__title mt-5 font-display text-xl font-black uppercase leading-none text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/58">
                    {copy}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <TacticalTag key={tag} label={tag} />
                    ))}
                  </div>
                  <span className="server-details-button mt-auto inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition">
                    {page.cta}
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </TrackedAnchor>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
