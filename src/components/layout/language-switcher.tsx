import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { routes } from "@/lib/routes";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");

  return (
    <div
      className="locale-switcher flex shrink-0 items-center p-0 sm:p-1"
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
            className={`locale-switcher__item px-1.5 py-1.5 text-[0.625rem] font-black uppercase tracking-normal transition sm:px-2.5 sm:text-xs sm:tracking-[0.12em] ${
              isActive
                ? "locale-switcher__item--active text-black"
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
