import Image from "next/image";
import { Crosshair, RadioTower } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { routes } from "@/lib/routes";

const navigationItems = [
  { href: routes.home, key: "home", external: false },
  { href: routes.servers, key: "servers", external: false },
  { href: "https://free-arena.ro", key: "forum", external: true },
  { href: "https://discord.gg/freearena", key: "discord", external: true },
  { href: "ts3server://ts.free-arena.ro", key: "ts3", external: true },
  { href: routes.community, key: "rankings", external: false },
  { href: routes.shop, key: "shop", external: false },
  { href: routes.about, key: "about", external: false },
] as const;

export function SiteHeader() {
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 border-b border-cyber-red/35 bg-black/82 shadow-[0_20px_80px_rgba(0,0,0,0.58)] backdrop-blur-2xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-red to-cyber-cyan opacity-80" aria-hidden="true" />
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="cyber-panel grid size-12 shrink-0 place-items-center border-cyber-red/40 bg-black/70 shadow-[0_0_34px_rgba(255,42,31,0.22)]">
            <Image
              src="/assets/game-icons/CS.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl font-black uppercase leading-none tracking-[0.04em] text-white group-hover:text-cyber-cyan">
              FREE-ARENA.RO
            </span>
            <span className="mt-1 hidden text-xs font-black uppercase tracking-[0.32em] text-cyber-red sm:block">
              {t("brandSubtitle")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 2xl:flex" aria-label={t("aria.main")}>
          {navigationItems.map((item) => {
            const className = "nav-link rounded-none px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/70 transition hover:bg-white/[0.06] hover:text-white";

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
              <Link key={item.key} href={item.href} className={className}>
                {t(`items.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <span className="hidden items-center gap-2 rounded-none border border-cyber-cyan/30 bg-cyber-cyan/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyber-cyan shadow-[0_0_30px_rgba(0,230,255,0.12)] md:inline-flex">
            <RadioTower size={15} aria-hidden="true" />
            {t("live")}
          </span>
          <Link
            href={routes.servers}
            className="cyber-red-button pulse-red inline-flex items-center gap-2 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] transition hover:scale-[1.02] sm:px-4"
          >
            <Crosshair size={16} aria-hidden="true" />
            <span className="hidden sm:inline">{t("playNow")}</span>
            <span className="sm:hidden">{t("playShort")}</span>
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6 2xl:hidden" aria-label={t("aria.main")}>
        {navigationItems.map((item) => {
          const isExternal = item.href.startsWith("http");
          const isTs = item.href.startsWith("ts3server");
          const className = "hud-chip shrink-0 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/68 transition hover:border-cyber-red/60 hover:text-white";

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
            <Link key={item.key} href={item.href} className={className}>
              {t(`items.${item.key}`)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
