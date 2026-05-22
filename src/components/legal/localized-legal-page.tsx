import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { contactEmail } from "@/lib/routes";

const legalSectionKeys = {
  terms: ["administrator", "access", "conduct", "servers", "limits", "contact"],
  privacy: ["administrator", "data", "usage", "cookies", "retention", "contact"],
} as const;

type LegalKind = keyof typeof legalSectionKeys;

type LocalizedLegalPageProps = {
  kind: LegalKind;
};

export async function LocalizedLegalPage({ kind }: LocalizedLegalPageProps) {
  const t = await getTranslations(`Legal.${kind}`);

  return (
    <>
      <SiteHeader />
      <main className="cinematic-section min-h-screen bg-arena-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel backdrop-blur-xl sm:p-8">
            <p className="inline-flex rounded-lg border border-arena-green/30 bg-arena-green/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-arena-green">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 font-display text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-base leading-7 text-white/66">
              {t("intro")}
            </p>
            <p className="mt-3 text-sm font-semibold text-white/42">
              {t("updated")}
            </p>

            <div className="mt-8 grid gap-4">
              {legalSectionKeys[kind].map((sectionKey) => (
                <section
                  key={sectionKey}
                  className="rounded-lg border border-white/10 bg-black/24 p-4"
                >
                  <h2 className="font-display text-xl font-black text-white">
                    {t(`sections.${sectionKey}.title`)}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/64">
                    {t(`sections.${sectionKey}.body`, { contactEmail })}
                  </p>
                </section>
              ))}
            </div>

            <a
              href={`mailto:${contactEmail}`}
              className="button-glow mt-8 inline-flex items-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
            >
              <Mail size={17} aria-hidden="true" />
              {contactEmail}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
