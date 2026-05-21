import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { routes } from "@/lib/routes";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");

  return (
    <div
      className="locale-switcher flex shrink-0 items-center rounded-lg border border-white/10 bg-white/[0.045] p-0 shadow-[0_0_28px_rgba(35,209,139,0.08)] backdrop-blur-xl sm:p-1"
      role="group"
      aria-label={t("label")}
    >
      {locales.map((item) => {
        const isActive = item === locale;

        return (
          <Link
            key={item}
            href={routes.home}
            locale={item}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-md px-1.5 py-1.5 text-[0.625rem] font-black uppercase tracking-normal transition sm:px-2.5 sm:text-xs sm:tracking-[0.12em] ${
              isActive
                ? "bg-arena-green text-black shadow-[0_0_22px_rgba(35,209,139,0.22)]"
                : "text-white/58 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {t(item)}
          </Link>
        );
      })}
    </div>
  );
}
