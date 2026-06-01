import { FileText, LifeBuoy, Megaphone, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/routing";

const FORUM_URL = "https://free-arena.ro";

type ForumCard = {
  Icon: LucideIcon;
  copy: string;
  href: string;
  title: string;
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
        href: FORUM_URL,
        title: "Cereri admin",
      },
      {
        Icon: Sparkles,
        copy: "Intrebari despre pachete, activare manuala si beneficii VIP.",
        href: FORUM_URL,
        title: "Cereri VIP",
      },
      {
        Icon: FileText,
        copy: "Reguli generale, comportament pe server si informatii pentru jucatori noi.",
        href: FORUM_URL,
        title: "Regulament servere",
      },
      {
        Icon: LifeBuoy,
        copy: "Suport pentru cont, servere, TeamSpeak, Discord sau probleme de comunitate.",
        href: FORUM_URL,
        title: "Suport comunitate",
      },
      {
        Icon: Megaphone,
        copy: "Update-uri, mentenanta si anunturi importante pentru FREE-ARENA.",
        href: FORUM_URL,
        title: "Anunturi importante",
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
        href: FORUM_URL,
        title: "Admin requests",
      },
      {
        Icon: Sparkles,
        copy: "Questions about packages, manual activation, and VIP benefits.",
        href: FORUM_URL,
        title: "VIP requests",
      },
      {
        Icon: FileText,
        copy: "General rules, server behavior, and information for new players.",
        href: FORUM_URL,
        title: "Server rules",
      },
      {
        Icon: LifeBuoy,
        copy: "Support for accounts, servers, TeamSpeak, Discord, or community issues.",
        href: FORUM_URL,
        title: "Community support",
      },
      {
        Icon: Megaphone,
        copy: "Updates, maintenance, and important FREE-ARENA announcements.",
        href: FORUM_URL,
        title: "Important announcements",
      },
    ],
  },
};

export function ForumActivitySection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section className="neon-section px-4 pb-16 sm:px-6 lg:px-8">
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
              className="button-glow mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              eventName="click_forum"
              eventPayload={{ location: "forum_activity_intro" }}
              href={FORUM_URL}
              rel="noreferrer"
              target="_blank"
            >
              {page.cta}
            </TrackedAnchor>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {page.cards.map(({ Icon, copy, href, title }) => (
              <article key={title} className="premium-card glass-panel neon-hover animated-border flex h-full flex-col rounded-lg p-5">
                <span className="grid size-12 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-black uppercase text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/58">
                  {copy}
                </p>
                <TrackedAnchor
                  className="mt-auto pt-5 text-xs font-black uppercase tracking-[0.16em] text-cyan-200 transition hover:text-white"
                  eventName="click_forum"
                  eventPayload={{ location: "forum_activity_card", title }}
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {page.cta}
                </TrackedAnchor>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
