import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  CTAButton,
  PremiumGlassCard,
  PublicPageHero,
  PublicPageShell,
  PublicSection,
} from "@/components/public/PublicPagePrimitives";
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
      <PublicPageShell>
        <PublicPageHero
          Icon={Mail}
          description={t("intro")}
          eyebrow={t("eyebrow")}
          meta={t("updated")}
          title={t("title")}
        />
        <PublicSection className="pt-0">
          <PremiumGlassCard className="mx-auto max-w-4xl p-5 sm:p-7 lg:p-8">
            <p className="text-sm font-semibold text-white/46">
              {t("updated")}
            </p>

            <div className="mt-7 grid gap-4">
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

            <CTAButton
              className="mt-8"
              href={`mailto:${contactEmail}`}
              tone="green"
              variant="ghost"
            >
              <Mail size={17} aria-hidden="true" />
              {contactEmail}
            </CTAButton>
          </PremiumGlassCard>
        </PublicSection>
      </PublicPageShell>
      <SiteFooter />
    </>
  );
}
