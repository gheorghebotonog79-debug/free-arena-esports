import { ArrowRight, Headphones, Mail, MessageCircle, MessagesSquare, UserPlus, type LucideIcon } from "lucide-react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/routing";
import { forumLinks } from "@/lib/forum-links";

const DISCORD_URL = "https://discord.gg/freearena";
const TEAMSPEAK_URL = "ts3server://ts.free-arena.ro";
const CONTACT_EMAIL = "gheorghe.botonog79@gmail.com";

type ContactCard = {
  Icon: LucideIcon;
  description?: string;
  eventName: "click_forum" | "click_join_discord" | "click_teamspeak";
  href: string;
  label: string;
  rel?: string;
  target?: string;
  value?: string;
};

const content: Record<
  Locale,
  {
    apply: string;
    body: readonly string[];
    cards: readonly ContactCard[];
    eyebrow: string;
    proposal: string;
    title: string;
    ctaTitle: string;
    values: readonly string[];
  }
> = {
  ro: {
    eyebrow: "Contact & recrutare",
    title: "Ai întrebări? Hai să discutăm.",
    body: [
      "Suntem mereu deschiși la idei noi, sugestii și oameni care vor să contribuie la dezvoltarea FREE-ARENA.",
      "Fie că dorești să aplici pentru o poziție de staff, să propui un joc nou, să organizezi un proiect sau să ajuți comunitatea să crească, te încurajăm să ne contactezi.",
    ],
    ctaTitle: "Vrei să faci parte din echipă?",
    values: ["Corectitudine", "Devotament", "Implicare", "Evoluție continuă"],
    apply: "Aplică pentru staff",
    proposal: "Propune un joc nou",
    cards: [
      {
        Icon: MessageCircle,
        description: "Alătură-te comunității și discută direct cu echipa.",
        eventName: "click_join_discord",
        href: DISCORD_URL,
        label: "Discord",
        rel: "noreferrer",
        target: "_blank",
      },
      {
        Icon: Headphones,
        eventName: "click_teamspeak",
        href: TEAMSPEAK_URL,
        label: "TeamSpeak",
        value: "ts.free-arena.ro",
      },
      {
        Icon: MessagesSquare,
        eventName: "click_forum",
        href: forumLinks.home,
        label: "Forum",
        rel: "noreferrer",
        target: "_blank",
        value: "free-arena.ro",
      },
      {
        Icon: Mail,
        eventName: "click_forum",
        href: `mailto:${CONTACT_EMAIL}`,
        label: "Email",
        value: CONTACT_EMAIL,
      },
    ],
  },
  en: {
    eyebrow: "Contact & recruitment",
    title: "Questions? Let us talk.",
    body: [
      "We are always open to new ideas, suggestions, and people who want to contribute to FREE-ARENA's development.",
      "Whether you want to apply for a staff position, propose a new game, organize a project, or help the community grow, we encourage you to contact us.",
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
        target: "_blank",
      },
      {
        Icon: Headphones,
        eventName: "click_teamspeak",
        href: TEAMSPEAK_URL,
        label: "TeamSpeak",
        value: "ts.free-arena.ro",
      },
      {
        Icon: MessagesSquare,
        eventName: "click_forum",
        href: forumLinks.home,
        label: "Forum",
        rel: "noreferrer",
        target: "_blank",
        value: "free-arena.ro",
      },
      {
        Icon: Mail,
        eventName: "click_forum",
        href: `mailto:${CONTACT_EMAIL}`,
        label: "Email",
        value: CONTACT_EMAIL,
      },
    ],
  },
};

export function ContactRecruitmentSection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section className="neon-section px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <article className="premium-card glass-panel neon-hover animated-border overflow-hidden rounded-lg p-5 sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(20rem,0.46fr)] lg:items-end">
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

            <div className="rounded-lg border border-cyan-300/16 bg-black/30 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.035),0_0_34px_rgba(0,216,255,0.08)]">
              <h3 className="font-display text-2xl font-black uppercase leading-none text-white">
                {page.ctaTitle}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {page.values.map((value) => (
                  <span
                    key={value}
                    className="rounded border border-cyan-300/24 bg-cyan-300/8 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-cyan-100"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {page.cards.map(({ Icon, description, eventName, href, label, rel, target, value }) => (
              <TrackedAnchor
                key={label}
                className="premium-card glass-panel neon-hover animated-border group flex min-h-44 flex-col rounded-lg p-5 transition"
                eventName={eventName}
                eventPayload={{ location: "homepage_contact_recruitment", target: label.toLowerCase() }}
                href={href}
                rel={rel}
                target={target}
              >
                <span className="grid size-12 place-items-center rounded-lg border border-cyan-300/24 bg-cyan-300/10 text-cyan-200 shadow-[0_0_28px_rgba(0,216,255,0.14)] transition group-hover:border-red-400/45 group-hover:text-white group-hover:shadow-[0_0_34px_rgba(0,216,255,0.24),0_0_24px_rgba(255,0,51,0.18)]">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-black uppercase text-white">
                  {label}
                </h3>
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
                <span className="mt-auto pt-5 text-xs font-black uppercase tracking-[0.16em] text-cyan-200 transition group-hover:text-white">
                  {locale === "ro" ? "Deschide" : "Open"}
                </span>
              </TrackedAnchor>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              className="button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              eventName="click_apply_staff"
              eventPayload={{ location: "homepage_contact_recruitment" }}
              href="/join-staff"
            >
              <UserPlus size={18} aria-hidden="true" />
              {page.apply}
              <ArrowRight size={18} aria-hidden="true" />
            </TrackedLink>
            <TrackedAnchor
              className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-300/24 bg-cyan-300/8 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-red-400/45 hover:bg-red-500/10"
              eventName="click_forum"
              eventPayload={{ location: "homepage_contact_recruitment", target: "game_proposal" }}
              href={forumLinks.support}
              rel="noreferrer"
              target="_blank"
            >
              <MessagesSquare size={18} aria-hidden="true" />
              {page.proposal}
              <ArrowRight size={18} aria-hidden="true" />
            </TrackedAnchor>
          </div>
        </article>
      </div>
    </section>
  );
}
