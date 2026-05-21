import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex min-h-screen items-center justify-center bg-arena-black px-6 py-16 text-white">
      <section className="w-full max-w-xl rounded-lg border border-white/10 bg-white/[0.04] p-8 shadow-panel">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-arena-green">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-balance">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/68">{t("copy")}</p>
        <Link
          href={routes.home}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-arena-green px-4 py-3 text-sm font-bold text-black transition hover:bg-white"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          {t("back")}
        </Link>
      </section>
    </main>
  );
}

