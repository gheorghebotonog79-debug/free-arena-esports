"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, Gamepad2, MessageSquare, Server, ShieldCheck, Trophy, type LucideIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import type { Locale } from "@/i18n/routing";

type HeroFeature = {
  Icon: LucideIcon;
  copy: string;
  title: string;
};

const heroCopy: Record<
  Locale,
  {
    body: string;
    discord: string;
    eyebrow: string;
    play: string;
    subtitle: string;
    tagline: readonly string[];
    features: readonly HeroFeature[];
  }
> = {
  ro: {
    eyebrow: "Comunitate gaming globală",
    subtitle: "Global Gaming Community",
    tagline: ["Joacă.", "Concurează.", "Conectează-te."],
    body:
      "Mai mult decât o simplă rețea de servere, FREE-ARENA este o comunitate construită în jurul competiției, fair-play-ului și pasiunii pentru gaming. Descoperă servere active, clasamente live, evenimente și o experiență creată pentru jucători din întreaga lume.",
    play: "Joacă acum",
    discord: "Join Discord",
    features: [
      {
        Icon: Server,
        title: "Servere performante",
        copy: "Infrastructură stabilă pentru o experiență optimă.",
      },
      {
        Icon: Trophy,
        title: "Clasamente live",
        copy: "Urcă în clasament și dovedește că ești cel mai bun.",
      },
      {
        Icon: CalendarDays,
        title: "Evenimente & premii",
        copy: "Participă la evenimente și câștigă premii exclusive.",
      },
      {
        Icon: ShieldCheck,
        title: "Fair play",
        copy: "Respect, corectitudine și un mediu de joc sănătos pentru toți.",
      },
    ],
  },
  en: {
    eyebrow: "Global gaming community",
    subtitle: "Global Gaming Community",
    tagline: ["Play.", "Compete.", "Connect."],
    body:
      "More than a simple server network, FREE-ARENA is a community built around competition, fair play, and passion for gaming. Discover active servers, live rankings, events, and an experience created for players around the world.",
    play: "Play now",
    discord: "Join Discord",
    features: [
      {
        Icon: Server,
        title: "Performance servers",
        copy: "Stable infrastructure for an optimal experience.",
      },
      {
        Icon: Trophy,
        title: "Live rankings",
        copy: "Climb the leaderboard and prove you are the best.",
      },
      {
        Icon: CalendarDays,
        title: "Events & rewards",
        copy: "Join events and win exclusive rewards.",
      },
      {
        Icon: ShieldCheck,
        title: "Fair play",
        copy: "Respect, fairness, and a healthy gaming environment for everyone.",
      },
    ],
  },
};

export function HeroCinematic() {
  const locale = useLocale() as Locale;
  const copy = heroCopy[locale];

  return (
    <section className="neon-hero neon-hero--wow relative isolate overflow-hidden border-b border-cyan-300/15 bg-[#040202]">
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
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.84)_28%,rgba(0,0,0,0.44)_55%,rgba(0,0,0,0.24)_76%,rgba(0,0,0,0.72)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(760px_440px_at_17%_42%,rgba(255,0,51,0.28),transparent_70%),radial-gradient(760px_440px_at_87%_30%,rgba(0,216,255,0.16),transparent_72%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.34)_68%,rgba(2,2,5,0.94)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-red-500/70" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-[96rem] flex-col justify-end px-4 pb-0 pt-20 sm:px-6 md:min-h-[44rem] lg:min-h-[48rem] lg:px-8 lg:pt-24">
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              href="https://discord.gg/freearena"
              target="_blank"
              rel="noreferrer"
              eventName="click_join_discord"
              eventPayload={{ location: "homepage_hero" }}
              className="button-ghost inline-flex min-h-14 items-center justify-center gap-3 border border-cyan-300/42 bg-black/38 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              <MessageSquare size={19} aria-hidden="true" />
              {copy.discord}
            </TrackedAnchor>
          </div>
        </div>

        <div className="hero-feature-bar grid gap-0 border-t border-cyan-300/14 bg-black/44 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {copy.features.map(({ Icon, copy: featureCopy, title }) => (
            <article
              key={title}
              className="hero-feature-card group relative flex gap-4 border-b border-cyan-300/10 px-4 py-5 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0 lg:px-6 lg:py-6"
            >
              <span className="hero-feature-icon grid size-14 shrink-0 place-items-center border border-cyan-300/34 bg-cyan-300/8 text-cyan-200 shadow-[0_0_28px_rgba(0,216,255,0.12)] transition group-hover:border-red-400/45 group-hover:text-white">
                <Icon size={26} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <strong className="block text-sm font-black uppercase tracking-[0.08em] text-white">
                  {title}
                </strong>
                <span className="mt-2 block text-sm leading-6 text-white/58">
                  {featureCopy}
                </span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
