import Image from "next/image";
import { RadioTower, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { routes } from "@/lib/routes";

const navigation = [
  { href: routes.servers, key: "servers" },
  { href: routes.events, key: "events" },
  { href: routes.community, key: "community" },
];

export function SiteHeader() {
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/72 shadow-[0_16px_60px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="animated-border relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.07] shadow-[0_0_30px_rgba(35,209,139,0.16)] sm:size-10">
              <Image
                src="/assets/game-icons/CS.png"
                alt=""
                width={30}
                height={30}
                className="object-contain"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold leading-none sm:text-lg">
                FREE-ARENA.RO
              </span>
              <span className="mt-1 hidden text-xs font-semibold uppercase tracking-[0.18em] text-white/45 sm:block">
                {t("brandSubtitle")}
              </span>
            </span>
          </Link>
          <div className="sm:hidden">
            <LanguageSwitcher />
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t("aria.main")}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-white/68 transition hover:border-white/10 hover:bg-white/[0.07] hover:text-white hover:shadow-[0_0_34px_rgba(35,209,139,0.08)]"
            >
              {t(`items.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <LanguageSwitcher />
          <span className="live-pulse live-badge hidden items-center gap-2 rounded-lg border border-arena-green/30 bg-arena-green/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-arena-green shadow-[0_0_30px_rgba(35,209,139,0.12)] sm:inline-flex">
            <RadioTower size={15} aria-hidden="true" />
            <span className="signal-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {t("live")}
          </span>
          <Link
            href={routes.community}
            className="button-glow hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-black transition hover:bg-arena-green sm:inline-flex"
          >
            <ShieldCheck size={17} aria-hidden="true" />
            {t("join")}
          </Link>
        </div>
      </div>
    </header>
  );
}
