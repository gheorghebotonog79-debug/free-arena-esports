"use client";

import Image from "next/image";
import {
  ArrowRight,
  Gamepad2,
  Headphones,
  MessageSquare,
  Server,
  ShieldCheck,
  Trophy,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "next-intl";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import type { Locale } from "@/i18n/routing";
import type { AnalyticsEventName } from "@/lib/analytics";

type HeroFeature = {
  Icon: LucideIcon;
  copy: string;
  cta: string;
  eventName: AnalyticsEventName;
  external?: boolean;
  href: string;
  title: string;
};

const heroCopy: Record<
  Locale,
  {
    body: string;
    discord: string;
    eyebrow: string;
    play: string;
    staff: string;
    subtitle: string;
    tagline: readonly string[];
    features: readonly HeroFeature[];
  }
> = {
  ro: {
    eyebrow: "FREE-ARENA.RO live",
    subtitle: "CS 1.6, Respawn, CS2 și comunitate",
    tagline: ["Joacă azi.", "Urcă în top.", "Rămâi cu noi."],
    body:
      "Alege serverul, copiază IP-ul, intră pe voice sau aplică pentru staff. FREE-ARENA îți arată traseele importante fără promisiuni artificiale: status live, rankings RSU și canale reale de comunitate.",
    play: "Joacă acum",
    discord: "Join Discord",
    staff: "Aplică staff",
    features: [
      {
        Icon: Server,
        title: "Alege serverul",
        copy: "Status live, IP-uri și conectare rapidă pentru serverele active.",
        cta: "Vezi serverele",
        href: "/servers",
        eventName: "click_play_now",
      },
      {
        Icon: Trophy,
        title: "Urcă în rankings",
        copy: "XP, fraguri, headshot-uri și căutare după jucător din RSU.",
        cta: "Vezi topul",
        href: "/rankings",
        eventName: "click_server_details",
      },
      {
        Icon: UserPlus,
        title: "Intră în staff",
        copy: "Aplicații pentru admini activi, maturi și prezenți în comunitate.",
        cta: "Aplică staff",
        href: "/join-staff",
        eventName: "click_apply_staff",
      },
      {
        Icon: Headphones,
        title: "Stai aproape",
        copy: "Discord, TeamSpeak și forum pentru anunțuri, suport și voice.",
        cta: "Intră pe Discord",
        href: "https://discord.gg/Unu756zZ",
        eventName: "click_join_discord",
        external: true,
      },
    ],
  },
  en: {
    eyebrow: "FREE-ARENA.RO live",
    subtitle: "CS 1.6, Respawn, CS2 and community",
    tagline: ["Play today.", "Climb ranks.", "Stay close."],
    body:
      "Pick a server, copy the IP, join voice, or apply for staff. FREE-ARENA shows the important paths without artificial promises: live status, RSU rankings, and real community channels.",
    play: "Play now",
    discord: "Join Discord",
    staff: "Apply staff",
    features: [
      {
        Icon: Server,
        title: "Pick a server",
        copy: "Live status, IPs, and quick connection for active servers.",
        cta: "View servers",
        href: "/servers",
        eventName: "click_play_now",
      },
      {
        Icon: Trophy,
        title: "Climb rankings",
        copy: "XP, frags, headshots, and player search from RSU.",
        cta: "View top",
        href: "/rankings",
        eventName: "click_server_details",
      },
      {
        Icon: UserPlus,
        title: "Join staff",
        copy: "Applications for active, mature admins present in the community.",
        cta: "Apply staff",
        href: "/join-staff",
        eventName: "click_apply_staff",
      },
      {
        Icon: Headphones,
        title: "Stay close",
        copy: "Discord, TeamSpeak, and forum for announcements, support, and voice.",
        cta: "Join Discord",
        href: "https://discord.gg/Unu756zZ",
        eventName: "click_join_discord",
        external: true,
      },
    ],
  },
};

export function HeroCinematic() {
  const locale = useLocale() as Locale;
  const copy = heroCopy[locale];

  return (
    <section className="neon-hero neon-hero--wow fa-dark-flame-bg relative isolate overflow-hidden border-b border-cyan-300/15 bg-[#050505]">
      <ParticlesBackground />
      <Image
        src="/assets/hero/free-arena-global-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-cinematic-art absolute inset-0 -z-30 size-full object-cover object-[68%_center] opacity-90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.86)_28%,rgba(0,0,0,0.48)_55%,rgba(0,0,0,0.24)_76%,rgba(0,0,0,0.72)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(760px_440px_at_17%_42%,rgba(255,23,68,0.3),transparent_70%),radial-gradient(760px_440px_at_87%_30%,rgba(0,229,255,0.16),transparent_72%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.34)_68%,rgba(5,5,5,0.94)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-red-500/70" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-[96rem] flex-col justify-end px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 md:min-h-[44rem] lg:min-h-[49rem] lg:px-8 lg:pb-12 lg:pt-32">
        <div className="hero-copy-reveal max-w-4xl pb-10 sm:pb-12 lg:pb-14">
          <p className="neon-kicker hero-signal-rack inline-flex max-w-full items-center gap-2 overflow-hidden px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/82">
            <Gamepad2 size={15} className="text-cyber-red" aria-hidden="true" />
            {copy.eyebrow}
          </p>

          <h1
            className="hero-wow-title mt-6 max-w-[11ch] font-display text-[clamp(3.2rem,10vw,8.25rem)] font-black uppercase leading-[0.78] tracking-normal text-white"
            data-text="FREE-ARENA"
          >
            <span className="hero-wow-title__energy" data-text="FREE-ARENA">
              FREE-ARENA
            </span>
          </h1>

          <p className="mt-4 text-[clamp(1.45rem,3vw,2.55rem)] font-semibold leading-tight text-white/92">
            {copy.subtitle}
          </p>

          <p className="hero-wow-subtitle mt-7 flex flex-wrap gap-x-3 gap-y-1 font-display text-[clamp(1.45rem,3.2vw,2.4rem)] font-black uppercase leading-tight">
            {copy.tagline.map((word, index) => (
              <span
                key={word}
                className={index === 0 ? "text-cyber-red" : index === 1 ? "text-cyber-cyan" : "text-white"}
              >
                {word}
              </span>
            ))}
          </p>

          <div className="hero-energy-line mt-3 h-px w-full max-w-2xl bg-gradient-to-r from-cyber-red via-cyber-cyan to-transparent" aria-hidden="true" />

          <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-white/78 sm:text-lg">
            {copy.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/servers"
              eventName="click_play_now"
              eventPayload={{ location: "homepage_hero", target: "servers" }}
              className="cyber-red-button button-glow inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] transition hover:scale-[1.02]"
            >
              <Gamepad2 size={19} aria-hidden="true" />
              {copy.play}
              <ArrowRight size={18} aria-hidden="true" />
            </TrackedLink>
            <TrackedAnchor
              href="https://discord.gg/Unu756zZ"
              target="_blank"
              rel="noopener noreferrer"
              eventName="click_join_discord"
              eventPayload={{ location: "homepage_hero" }}
              className="button-ghost inline-flex min-h-14 items-center justify-center gap-3 border border-cyan-300/42 bg-black/38 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              <MessageSquare size={19} aria-hidden="true" />
              {copy.discord}
            </TrackedAnchor>
            <TrackedLink
              href="/join-staff"
              eventName="click_apply_staff"
              eventPayload={{ location: "homepage_hero" }}
              className="button-ghost inline-flex min-h-14 items-center justify-center gap-3 border border-red-400/42 bg-red-500/10 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-red-300 hover:bg-red-500/16"
            >
              <ShieldCheck size={19} aria-hidden="true" />
              {copy.staff}
            </TrackedLink>
          </div>
        </div>

        <div className="hero-feature-bar fa-scanline-subtle grid gap-0 border-t border-cyan-300/14 bg-black/48 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {copy.features.map(({ Icon, copy: featureCopy, cta, eventName, external, href, title }) => {
            const className =
              "hero-feature-card group relative flex min-h-40 gap-4 border-b border-cyan-300/10 px-4 py-5 text-left transition hover:bg-cyan-300/[0.045] sm:border-r sm:last:border-r-0 lg:border-b-0 lg:px-6 lg:py-6";
            const content = (
              <>
                <span className="hero-feature-icon grid size-14 shrink-0 place-items-center border border-cyan-300/34 bg-cyan-300/8 text-cyan-200 shadow-[0_0_28px_rgba(0,229,255,0.12)] transition group-hover:border-red-400/45 group-hover:text-white">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <strong className="block text-sm font-black uppercase tracking-[0.08em] text-white">
                    {title}
                  </strong>
                  <span className="mt-2 block text-sm leading-6 text-white/58">
                    {featureCopy}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
                    {cta}
                    <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </>
            );

            return external ? (
              <TrackedAnchor
                className={className}
                eventName={eventName}
                eventPayload={{ location: "homepage_hero_feature", target: title }}
                href={href}
                key={title}
                rel="noopener noreferrer"
                target="_blank"
              >
                {content}
              </TrackedAnchor>
            ) : (
              <TrackedLink
                className={className}
                eventName={eventName}
                eventPayload={{ location: "homepage_hero_feature", target: href }}
                href={href}
                key={title}
              >
                {content}
              </TrackedLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
