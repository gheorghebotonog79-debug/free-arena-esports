"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Gamepad2, Headphones, Map, MessageSquare, RadioTower, ShieldCheck, Trophy, UsersRound, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { LiveServerKey, LiveServerStatus, LiveServersResponse, LiveServerStatusKind } from "@/lib/live-server-targets";
import { publicServers } from "@/lib/servers";

const REFRESH_MS = 30_000;

const heroCopy: Record<
  Locale,
  {
    connect: string;
    discord: string;
    eyebrow: string;
    mapFallback: string;
    players: string;
    servers: string;
    status: Record<LiveServerStatusKind, string>;
    subtitle: string;
    title: string;
    trust: readonly { Icon: LucideIcon; label: string }[];
  }
> = {
  ro: {
    eyebrow: "Comunitate gaming romaneasca",
    title: "FREE-ARENA - Comunitate CS 1.6 si CS2 din Romania",
    subtitle:
      "Intra pe serverele noastre Classic, Respawn si CS2. Joaca, urca in clasament si alatura-te comunitatii pe Discord si TeamSpeak.",
    connect: "Joaca CS 1.6",
    discord: "Join Discord",
    servers: "Vezi serverele",
    players: "Jucatori",
    mapFallback: "In verificare",
    status: {
      loading: "Se verifica...",
      online: "Online",
      offline: "Offline",
      pending: "In pregatire",
    },
    trust: [
      { Icon: Gamepad2, label: "3 servere active" },
      { Icon: Headphones, label: "Discord + TeamSpeak" },
      { Icon: Trophy, label: "Clasament live" },
      { Icon: ShieldCheck, label: "Comunitate romaneasca in crestere" },
    ],
  },
  en: {
    eyebrow: "Romanian gaming community",
    title: "FREE-ARENA - CS 1.6 and CS2 Community from Romania",
    subtitle:
      "Join our Classic, Respawn, and CS2 servers. Play, climb the rankings, and connect with the community on Discord and TeamSpeak.",
    connect: "Play CS 1.6",
    discord: "Join Discord",
    servers: "View servers",
    players: "Players",
    mapFallback: "Checking",
    status: {
      loading: "Checking...",
      online: "Online",
      offline: "Offline",
      pending: "In preparation",
    },
    trust: [
      { Icon: Gamepad2, label: "3 active servers" },
      { Icon: Headphones, label: "Discord + TeamSpeak" },
      { Icon: Trophy, label: "Live rankings" },
      { Icon: ShieldCheck, label: "Growing Romanian community" },
    ],
  },
};

const statusClasses: Record<LiveServerStatusKind, string> = {
  loading: "border-white/14 bg-white/[0.055] text-white/70",
  online: "border-arena-green/34 bg-arena-green/12 text-arena-green",
  offline: "border-arena-red/34 bg-arena-red/12 text-arena-red",
  pending: "border-arena-gold/34 bg-arena-gold/12 text-arena-gold",
};

function isLiveServersResponse(value: unknown): value is LiveServersResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LiveServersResponse).servers)
  );
}

export function HeroCinematic() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Servers");
  const copy = heroCopy[locale];
  const [serverStatuses, setServerStatuses] = useState<Partial<Record<LiveServerKey, LiveServerStatus>>>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadServers = useCallback(async () => {
    try {
      const response = await fetch("/api/servers", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Server status request failed");
      }

      const payload: unknown = await response.json();

      if (!isLiveServersResponse(payload)) {
        throw new Error("Unexpected server payload");
      }

      setServerStatuses(Object.fromEntries(payload.servers.map((server) => [server.key, server])));
    } catch {
      setServerStatuses({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadServers();
    const interval = window.setInterval(() => {
      void loadServers();
    }, REFRESH_MS);

    return () => window.clearInterval(interval);
  }, [loadServers]);

  const activeServers = useMemo(() => publicServers.filter((server) => server.pending !== true), []);
  const cs16Server = activeServers.find((server) => server.key === "cs16");

  return (
    <section className="neon-hero neon-hero--wow neon-hero--compact relative isolate overflow-hidden border-b border-cyan-300/15 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <ParticlesBackground />
      <div className="neon-hero__flames" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="neon-hero__cinematic-light neon-hero__cinematic-light--red" aria-hidden="true" />
      <div className="neon-hero__cinematic-light neon-hero__cinematic-light--cyan" aria-hidden="true" />
      <div className="neon-hero__visual" aria-hidden="true" />
      <div className="neon-hero__soldier" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#080202] via-[#120304]/78 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[32rem] w-full max-w-7xl items-center gap-8 pt-2 lg:min-h-[34rem] lg:grid-cols-[minmax(0,0.98fr)_minmax(22rem,0.82fr)] lg:pt-0">
        <div className="mx-auto w-full min-w-0 max-w-5xl text-center lg:mx-0 lg:text-left">
          <p className="neon-kicker hero-signal-rack mx-auto inline-flex max-w-full items-center justify-center gap-2 overflow-hidden px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/78 lg:mx-0">
            <RadioTower size={15} className="text-cyber-cyan" aria-hidden="true" />
            {copy.eyebrow}
          </p>

          <h1
            className="neon-heading neon-title neon-text-pulse hero-wow-title glitch-text mx-auto mt-6 max-w-[24rem] break-words font-display text-[clamp(2.15rem,7.2vw,3.6rem)] font-black uppercase leading-[0.88] tracking-normal text-white sm:max-w-5xl sm:text-6xl md:text-7xl lg:mx-0 xl:text-[5.8rem]"
            data-text="FREE-ARENA"
          >
            <span className="hero-wow-title__energy">{copy.title}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[22rem] text-base font-semibold leading-7 text-white/82 sm:max-w-3xl sm:text-xl lg:mx-0">
            {copy.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            {cs16Server ? (
              <a
                href={cs16Server.connectHref}
                className="button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                <Gamepad2 size={18} aria-hidden="true" />
                {copy.connect}
              </a>
            ) : null}
            <a
              href="https://discord.gg/freearena"
              target="_blank"
              rel="noreferrer"
              className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#98a3ff]/35 bg-[#5865f2]/12 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-[#98a3ff]/70 hover:bg-[#5865f2]/20"
            >
              <MessageSquare size={18} aria-hidden="true" />
              {copy.discord}
            </a>
            <Link
              href="/servers"
              className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
            >
              {copy.servers}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {copy.trust.map(({ Icon, label }) => (
              <div key={label} className="neon-border rounded-lg border border-white/10 bg-black/28 px-3 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Icon size={17} className="shrink-0 text-cyan-200" aria-hidden="true" />
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-white/72">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="neon-panel hud-frame neon-scanline p-4 sm:p-5" aria-busy={isLoading}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                Live server bar
              </p>
              <h2 className="mt-2 font-display text-3xl font-black uppercase text-white">
                {locale === "ro" ? "Alege serverul" : "Choose server"}
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/24 bg-cyan-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
              <RadioTower size={14} aria-hidden="true" />
              Live
            </span>
          </div>

          <div className="mt-5 grid gap-3">
            {activeServers.map((server) => {
              const live = serverStatuses[server.key];
              const status: LiveServerStatusKind = isLoading && !live ? "loading" : live?.status ?? "offline";
              const players = status === "loading" ? 0 : live?.players ?? 0;
              const maxPlayers = live?.maxPlayers ?? server.fallbackMaxPlayers;
              const map = status === "loading" ? copy.mapFallback : live?.map || copy.mapFallback;

              return (
                <article key={server.key} className="rounded-lg border border-white/10 bg-black/34 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-cyan-300/18 bg-cyan-300/8">
                        <Image src={server.icon} alt={`${t(`items.${server.key}.name`)} icon`} width={36} height={36} className="size-9 object-contain" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-lg font-black uppercase text-white">
                          {t(`items.${server.key}.name`)}
                        </h3>
                        <p className="mt-1 truncate text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/42">
                          {t(`items.${server.key}.region`)}
                        </p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-lg border px-2 py-1 text-[0.64rem] font-black uppercase tracking-[0.12em] ${statusClasses[status]}`}>
                      {copy.status[status]}
                    </span>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2">
                    <Metric Icon={UsersRound} label={copy.players} value={`${players}/${maxPlayers}`} />
                    <Metric Icon={Map} label={locale === "ro" ? "Harta" : "Map"} value={map} />
                  </dl>
                  <a
                    href={server.connectHref}
                    className="button-glow mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-arena-green px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                  >
                    {locale === "ro" ? "Conecteaza-te" : "Connect"}
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Metric({ Icon, label, value }: { Icon: typeof UsersRound; label: string; value: string }) {
  return (
    <div className="server-metric min-w-0 p-2">
      <dt className="flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.12em] text-white/34">
        <Icon size={14} className="text-cyan-200" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-black uppercase text-white">{value}</dd>
    </div>
  );
}
