"use client";

import Image from "next/image";
import { Crosshair, Menu, RadioTower, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { routes } from "@/lib/routes";

const navigationItems = [
  { href: routes.home, key: "home", external: false },
  { href: routes.servers, key: "servers", external: false },
  { href: "https://free-arena.ro", key: "forum", external: true },
  { href: "https://discord.gg/freearena", key: "discord", external: true },
  { href: "ts3server://ts.free-arena.ro", key: "ts3", external: true },
  { href: routes.rankings, key: "rankings", external: false },
  { href: routes.shop, key: "shop", external: false },
  { href: routes.about, key: "about", external: false },
] as const;

export function SiteHeader() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, hash]);

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
    <header className="neon-header header-hud sticky top-0 z-50">
      <div className="header-hud__bottom-glow" aria-hidden="true" />
      <div className="mx-auto flex min-h-[4.75rem] w-full max-w-7xl items-center gap-2 px-3 py-3 sm:gap-3 sm:px-6 lg:px-8">
        <Link href="/" className="header-brand group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3" aria-label="FREE-ARENA">
          <span className="neon-brand-mark header-brand__mark grid size-11 shrink-0 place-items-center sm:size-12">
            <Image
              src="/assets/game-icons/CS.png"
              alt=""
              width={36}
              height={36}
              className="size-8 object-contain sm:size-9"
              priority
            />
          </span>
          <span className="header-brand__copy min-w-0">
            <span className="header-brand__title block whitespace-nowrap font-display text-lg font-black uppercase leading-none tracking-[0.04em] text-white group-hover:text-cyan-200 sm:text-xl">
              FREE-ARENA
            </span>
            <span className="header-brand__subtitle mt-1 hidden whitespace-nowrap text-[0.62rem] font-black uppercase tracking-[0.28em] text-fuchsia-300 sm:block">
              {t("brandSubtitle")}
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex" aria-label={t("aria.main")}>
          {navigationItems.map((item) => {
            const active = !item.external && isActive(item.href);
            const className = `neon-nav-link header-nav-link whitespace-nowrap px-3 py-2 text-[0.7rem] font-black uppercase tracking-[0.13em] transition ${
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
                {t(`items.${item.key}`)}
              </a>
            ) : (
              <Link key={item.key} href={item.href} className={className} aria-current={active ? "page" : undefined}>
                {t(`items.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <span className="header-live-pill hidden items-center gap-2 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] md:inline-flex">
            <span className="header-live-pulse" aria-hidden="true" />
            <RadioTower size={15} aria-hidden="true" />
            {t("live")}
          </span>
          <Link
            href={routes.servers}
            className="header-play-button inline-flex size-10 items-center justify-center gap-2 p-0 text-xs font-black uppercase tracking-[0.12em] transition max-[359px]:hidden sm:size-auto sm:px-4 sm:py-2"
            aria-label={t("playNow")}
          >
            <Crosshair size={16} aria-hidden="true" />
            <span className="hidden sm:inline">{t("playNow")}</span>
          </Link>
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
            const className = `neon-nav-link header-mobile-link px-3 py-3 text-xs font-black uppercase tracking-[0.12em] transition ${
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
                {t(`items.${item.key}`)}
              </a>
            ) : (
              <Link key={item.key} href={item.href} className={className} aria-current={active ? "page" : undefined}>
                {t(`items.${item.key}`)}
              </Link>
            );
          })}
          <div className="mt-1 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <span className="header-live-pill inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.16em]">
              <span className="header-live-pulse" aria-hidden="true" />
              <RadioTower size={15} aria-hidden="true" />
              {t("live")}
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
