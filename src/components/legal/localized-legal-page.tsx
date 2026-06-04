import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  CTAButton,
  PublicPageHero,
  PublicPageShell,
  PublicSection,
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalInfoBlock,
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
          <TacticalCard className="mx-auto max-w-4xl p-5 sm:p-7 lg:p-8" tone="global">
            <TacticalCardHeader
              badge={<TacticalBadge>{t("updated")}</TacticalBadge>}
              eyebrow="FREE-ARENA.RO"
              Icon={Mail}
              title={t("title")}
            />

            <div className="mt-7 grid gap-4">
              {legalSectionKeys[kind].map((sectionKey) => (
                <TacticalInfoBlock
                  key={sectionKey}
                  label={t(`sections.${sectionKey}.title`)}
                >
                  <p className="mt-2 text-sm font-semibold normal-case leading-7 text-white/64">
                    {t(`sections.${sectionKey}.body`, { contactEmail })}
                  </p>
                </TacticalInfoBlock>
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
          </TacticalCard>
        </PublicSection>
      </PublicPageShell>
      <SiteFooter />
    </>
  );
}
