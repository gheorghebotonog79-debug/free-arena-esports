"use client";

import Image from "next/image";
import {
  Crosshair,
  Headphones,
  Home,
  Info,
  Menu,
  MessageCircle,
  RadioTower,
  Server as ServerIcon,
  ShoppingCart,
  Trophy,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { routes } from "@/lib/routes";

const navigationItems = [
  { href: routes.home, key: "home", external: false, Icon: Home },
  { href: routes.servers, key: "servers", external: false, Icon: ServerIcon },
  { href: "https://free-arena.ro", key: "forum", external: true, Icon: MessageCircle },
  { href: "https://discord.gg/freearena", key: "discord", external: true, Icon: MessageCircle },
  { href: "ts3server://ts.free-arena.ro", key: "ts3", external: true, Icon: Headphones },
  { href: routes.rankings, key: "rankings", external: false, Icon: Trophy },
  { href: routes.shop, key: "shop", external: false, Icon: ShoppingCart },
  { href: routes.about, key: "about", external: false, Icon: Info },
] as const;

type HeaderLiveServer = {
  players?: number;
  status?: string;
};

function isHeaderLivePayload(value: unknown): value is { servers: HeaderLiveServer[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as { servers?: unknown }).servers)
  );
}

export function SiteHeader() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [livePlayers, setLivePlayers] = useState<number | null>(null);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    let cancelled = false;

    async function loadHeaderStatus() {
      try {
        const response = await fetch("/api/servers", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Header live status failed");
        }

        const payload: unknown = await response.json();
        if (!isHeaderLivePayload(payload)) {
          throw new Error("Unexpected header live payload");
        }

        const players = payload.servers.reduce((total, server) => (
          server.status === "online" && typeof server.players === "number"
            ? total + server.players
            : total
        ), 0);

        if (!cancelled) {
          setLivePlayers(players);
        }
      } catch {
        if (!cancelled) {
          setLivePlayers(null);
        }
      }
    }

    void loadHeaderStatus();
    const interval = window.setInterval(() => void loadHeaderStatus(), 30_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const formattedLivePlayers = livePlayers === null
    ? null
    : new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "en-US").format(livePlayers);

  function isActive(href: string) {
    if (href === routes.home) {
      return pathname === "/" && hash === "";
    }

    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.slice(1);
    }

    return href !== routes.home && pathname.startsWith(href);
  }

  return (
    <header className="neon-header header-hud header-launcher sticky top-0 z-50">
      <div className="header-hud__bottom-glow" aria-hidden="true" />
      <div className="header-launcher__frame mx-auto flex w-full max-w-[110rem] items-center gap-3 px-3 py-3 sm:px-5 lg:px-7">
        <Link href="/" className="header-brand group flex min-w-0 shrink-0 items-center gap-3 sm:gap-4" aria-label="FREE-ARENA">
          <span className="neon-brand-mark header-brand__mark grid shrink-0 place-items-center">
            <span className="header-brand__energy" aria-hidden="true" />
            <Image
              src="/assets/game-icons/F.png"
              alt=""
              width={112}
              height={112}
              className="header-brand__crest relative z-10"
              priority
            />
          </span>
          <span className="header-brand__copy min-w-0">
            <span className="header-brand__title block whitespace-nowrap font-display text-xl font-black uppercase leading-none tracking-[0.04em] text-white group-hover:text-cyan-200 sm:text-2xl">
              FREE-ARENA
            </span>
            <span className="header-brand__subtitle mt-1.5 hidden whitespace-nowrap text-[0.64rem] font-black uppercase tracking-[0.34em] text-fuchsia-300 sm:block">
              {t("brandSubtitle")}
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 xl:flex" aria-label={t("aria.main")}>
          {navigationItems.map((item) => {
            const active = !item.external && isActive(item.href);
            const className = `neon-nav-link header-nav-link inline-flex min-h-12 items-center gap-2 whitespace-nowrap px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] transition ${
              active ? "neon-nav-link--active text-white" : "text-white/68"
            }`;

            return item.external ? (
              <a
                key={item.key}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className={className}
              >
                <item.Icon size={15} className="header-nav-link__icon" aria-hidden="true" />
                {t(`items.${item.key}`)}
              </a>
            ) : (
              <Link key={item.key} href={item.href} className={className} aria-current={active ? "page" : undefined}>
                <item.Icon size={15} className="header-nav-link__icon" aria-hidden="true" />
                {t(`items.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="header-actions__stack">
            <div className="header-actions__top">
              <LanguageSwitcher />
            </div>
            <div className="header-actions__bottom">
              <span className="header-live-pill hidden min-h-12 items-center gap-2 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] md:inline-flex">
                <span className="header-live-pulse" aria-hidden="true" />
                <RadioTower size={15} aria-hidden="true" />
                <span>{t("live")}</span>
                {formattedLivePlayers ? <strong>{formattedLivePlayers}</strong> : null}
              </span>
              <Link
                href={routes.servers}
                className="header-play-button inline-flex size-11 items-center justify-center gap-2 p-0 text-xs font-black uppercase tracking-[0.12em] transition max-[359px]:hidden sm:h-12 sm:w-auto sm:px-5 sm:py-2"
                aria-label={t("playNow")}
              >
                <Crosshair size={16} aria-hidden="true" />
                <span className="hidden sm:inline">{t("playNow")}</span>
              </Link>
            </div>
          </div>
          <button
            type="button"
            className="header-menu-button inline-flex size-10 items-center justify-center xl:hidden"
            aria-controls="site-mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t("aria.closeMenu") : t("aria.openMenu")}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        className={`header-mobile-panel mx-auto w-full max-w-7xl px-3 sm:px-6 xl:hidden ${
          isMenuOpen ? "header-mobile-panel--open pb-3" : ""
        }`}
      >
        <nav id="site-mobile-navigation" className="header-mobile-nav grid gap-2 p-3" aria-label={t("aria.main")}>
          {navigationItems.map((item) => {
            const isExternal = item.href.startsWith("http");
            const isTs = item.href.startsWith("ts3server");
            const active = !item.external && isActive(item.href);
            const className = `neon-nav-link header-mobile-link inline-flex items-center gap-3 px-3 py-3 text-xs font-black uppercase tracking-[0.12em] transition ${
              active ? "neon-nav-link--active text-white" : "text-white/72"
            }`;

            return item.external || isTs ? (
              <a
                key={item.key}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className={className}
              >
                <item.Icon size={16} className="header-nav-link__icon" aria-hidden="true" />
                {t(`items.${item.key}`)}
              </a>
            ) : (
              <Link key={item.key} href={item.href} className={className} aria-current={active ? "page" : undefined}>
                <item.Icon size={16} className="header-nav-link__icon" aria-hidden="true" />
                {t(`items.${item.key}`)}
              </Link>
            );
          })}
          <div className="mt-1 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <span className="header-live-pill inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.16em]">
              <span className="header-live-pulse" aria-hidden="true" />
              <RadioTower size={15} aria-hidden="true" />
              {t("live")}
              {formattedLivePlayers ? <strong>{formattedLivePlayers}</strong> : null}
            </span>
            <Link
              href={routes.servers}
              className="header-play-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition"
            >
              <Crosshair size={16} aria-hidden="true" />
              {t("playShort")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
