import { Camera, Headphones, MessageSquare, Server, Trophy, type LucideIcon } from "lucide-react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/routing";

type ProofCard = {
  Icon: LucideIcon;
  copy: string;
  href: string;
  linkType: "external" | "internal";
  title: string;
};

const content: Record<
  Locale,
  {
    cards: readonly ProofCard[];
    copy: string;
    cta: string;
    eyebrow: string;
    placeholder: string;
    title: string;
  }
> = {
  ro: {
    eyebrow: "Trust proof",
    title: "Comunitate reala. Activitate reala.",
    copy:
      "Nu folosim cifre inventate. Pe masura ce apar capturi reale din servere, forum sau voice, le putem urca aici.",
    cta: "Deschide",
    placeholder: "Screenshot real pregatit pentru upload",
    cards: [
      {
        Icon: Server,
        copy: "Statusul live si IP-urile serverelor raman vizibile pentru jucatori.",
        href: "/servers",
        linkType: "internal",
        title: "Servere CS active",
      },
      {
        Icon: Trophy,
        copy: "Clasamentul arata progresul jucatorilor fara promisiuni artificiale.",
        href: "/rankings",
        linkType: "internal",
        title: "Clasament live",
      },
      {
        Icon: MessageSquare,
        copy: "Forumul este locul pentru cereri, reguli, suport si anunturi.",
        href: "https://free-arena.ro",
        linkType: "external",
        title: "Forum comunitate",
      },
      {
        Icon: Headphones,
        copy: "TeamSpeak si Discord raman canalele rapide pentru voice si discutii.",
        href: "ts3server://ts.free-arena.ro",
        linkType: "external",
        title: "Voice comunitate",
      },
    ],
  },
  en: {
    eyebrow: "Trust proof",
    title: "Real community. Real activity.",
    copy:
      "We do not use fake numbers. As real screenshots from servers, forum, or voice appear, they can be uploaded here.",
    cta: "Open",
    placeholder: "Real screenshot ready for upload",
    cards: [
      {
        Icon: Server,
        copy: "Live status and server IPs stay visible for players.",
        href: "/servers",
        linkType: "internal",
        title: "Active CS servers",
      },
      {
        Icon: Trophy,
        copy: "Rankings show player progress without artificial promises.",
        href: "/rankings",
        linkType: "internal",
        title: "Live rankings",
      },
      {
        Icon: MessageSquare,
        copy: "The forum is the place for requests, rules, support, and announcements.",
        href: "https://free-arena.ro",
        linkType: "external",
        title: "Community forum",
      },
      {
        Icon: Headphones,
        copy: "TeamSpeak and Discord stay the fast channels for voice and discussion.",
        href: "ts3server://ts.free-arena.ro",
        linkType: "external",
        title: "Community voice",
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
          {page.cards.map(({ Icon, copy, href, linkType, title }) => {
            const card = (
              <>
                <div className="grid aspect-video place-items-center rounded-lg border border-cyan-200/14 bg-black/36">
                  <div className="text-center">
                    <Camera size={32} className="mx-auto text-cyan-200" aria-hidden="true" />
                    <p className="mt-3 px-4 text-xs font-black uppercase tracking-[0.14em] text-white/44">
                      {page.placeholder}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-black uppercase text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/58">
                      {copy}
                    </p>
                  </div>
                </div>
                <span className="mt-auto pt-5 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                  {page.cta}
                </span>
              </>
            );

            return linkType === "internal" ? (
              <TrackedLink
                className="premium-card glass-panel neon-hover animated-border flex h-full flex-col rounded-lg p-4"
                eventName="click_server_details"
                eventPayload={{ location: "trust_proof", title }}
                href={href}
                key={title}
              >
                {card}
              </TrackedLink>
            ) : (
              <TrackedAnchor
                className="premium-card glass-panel neon-hover animated-border flex h-full flex-col rounded-lg p-4"
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
