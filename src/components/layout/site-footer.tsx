import { Disc3, FileText, Home, Mail, Server, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contactEmail, routes } from "@/lib/routes";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="cinematic-section border-t border-white/10 bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-bold text-white">FREE-ARENA.RO</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/58">
            {t("copy")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={routes.servers}
            className="button-ghost inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <Server size={17} aria-hidden="true" />
            {t("links.servers")}
          </Link>
          <Link
            href={routes.community}
            className="button-ghost inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <Disc3 size={17} aria-hidden="true" />
            {t("links.community")}
          </Link>
          <Link
            href={routes.home}
            className="button-ghost inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <Home size={17} aria-hidden="true" />
            {t("links.home")}
          </Link>
          <Link
            href={routes.terms}
            className="button-ghost inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <FileText size={17} aria-hidden="true" />
            {t("links.terms")}
          </Link>
          <Link
            href={routes.privacy}
            className="button-ghost inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <Shield size={17} aria-hidden="true" />
            {t("links.privacy")}
          </Link>
          <a
            href={`mailto:${contactEmail}`}
            className="button-ghost inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <Mail size={17} aria-hidden="true" />
            {t("links.contact")}
          </a>
        </div>
      </div>
    </footer>
  );
}
