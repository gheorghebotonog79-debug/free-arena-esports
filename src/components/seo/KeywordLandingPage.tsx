import { ArrowRight, ListChecks, RadioTower, Search, Server, ShieldCheck } from "lucide-react";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  CTAButton,
  PublicPageHero,
  PublicPageShell,
  TacticalActions,
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalGrid,
  TacticalInfoBlock,
  TacticalSection,
} from "@/components/public/PublicPagePrimitives";
import type { Locale } from "@/i18n/routing";
import type { KeywordLandingPageContent } from "@/data/keyword-landings";

type KeywordLandingPageProps = {
  content: KeywordLandingPageContent;
  locale: Locale;
};

export function KeywordLandingPage({ content, locale }: KeywordLandingPageProps) {
  const primaryHref = localizeHref(locale, content.primaryAction.href);
  const secondaryHref = localizeHref(locale, content.secondaryAction.href);

  return (
    <>
      <SiteHeader />
      <PublicPageShell>
        <PublicPageHero
          Icon={Search}
          actions={(
            <>
              <CTAButton href={primaryHref} variant="glow">
                {content.primaryAction.label}
                <ArrowRight size={17} aria-hidden="true" />
              </CTAButton>
              <CTAButton href={secondaryHref} tone="cyan">
                {content.secondaryAction.label}
              </CTAButton>
            </>
          )}
          aside={(
            <TacticalCard as="aside" tone={content.tone} className="min-h-80">
              <TacticalCardHeader
                Icon={Server}
                badge={<TacticalBadge dot>FREE-ARENA</TacticalBadge>}
                eyebrow="SEO ROUTE"
                title="Quick facts"
              />
              <div className="mt-6 grid gap-3">
                {content.stats.map((item, index) => (
                  <TacticalInfoBlock key={item.title} label={`0${index + 1}`} value={item.copy} />
                ))}
              </div>
            </TacticalCard>
          )}
          description={content.hero.description}
          eyebrow={content.hero.eyebrow}
          title={content.hero.title}
        />

        <TacticalSection
          eyebrow="Player Intent"
          title={locale === "ro" ? "Ce găsește jucătorul aici" : "What players find here"}
          description={locale === "ro"
            ? "Pagini scurte, clare și legate de serverele reale, pentru căutări care apar deja în Search Console."
            : "Short, useful pages connected to real servers, built around searches that already appear in Search Console."}
        >
          <TacticalGrid columns="three">
            {content.sections.map((item) => (
              <TacticalCard key={item.title} tone={content.tone} status="online" className="min-h-72">
                <TacticalCardHeader
                  Icon={ShieldCheck}
                  badge={<TacticalBadge>Indexed path</TacticalBadge>}
                  eyebrow="FREE-ARENA"
                  title={item.title}
                />
                <p className="mt-5 text-sm font-semibold leading-7 text-white/64">
                  {item.copy}
                </p>
              </TacticalCard>
            ))}
          </TacticalGrid>
        </TacticalSection>

        <TacticalSection
          eyebrow="FAQ"
          title={locale === "ro" ? "Întrebări frecvente" : "Frequently asked questions"}
          description={locale === "ro"
            ? "Răspunsuri scurte pentru snippet-uri utile și pentru jucătorii care vor informația rapid."
            : "Short answers for useful snippets and players who want quick information."}
        >
          <TacticalGrid columns="three">
            {content.faq.map((item) => (
              <TacticalCard key={item.question} tone="global" status="online" className="min-h-64">
                <TacticalCardHeader
                  Icon={ListChecks}
                  badge={<TacticalBadge>FAQ</TacticalBadge>}
                  eyebrow="Question"
                  title={item.question}
                />
                <p className="mt-5 text-sm font-semibold leading-7 text-white/64">
                  {item.answer}
                </p>
              </TacticalCard>
            ))}
          </TacticalGrid>
        </TacticalSection>

        <TacticalSection
          eyebrow="Internal Links"
          title={locale === "ro" ? "Continuă în FREE-ARENA" : "Continue in FREE-ARENA"}
          description={locale === "ro"
            ? "Linkurile duc către paginile canonice, nu creează trasee paralele fără sens."
            : "Links point to canonical pages instead of creating confusing parallel paths."}
        >
          <TacticalGrid columns="three">
            {content.related.map((item) => (
              <TacticalCard key={item.href} tone="cs2" status="online" className="min-h-64">
                <TacticalCardHeader
                  Icon={RadioTower}
                  badge={<TacticalBadge dot>Route</TacticalBadge>}
                  eyebrow="Next step"
                  title={item.title}
                />
                <p className="mt-5 text-sm font-semibold leading-7 text-white/64">
                  {item.copy}
                </p>
                <TacticalActions className="sm:grid-cols-1">
                  <CTAButton href={localizeHref(locale, item.href)} tone="cyan">
                    {locale === "ro" ? "Deschide" : "Open"}
                    <ArrowRight size={17} aria-hidden="true" />
                  </CTAButton>
                </TacticalActions>
              </TacticalCard>
            ))}
          </TacticalGrid>
        </TacticalSection>
      </PublicPageShell>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}

function localizeHref(locale: Locale, href: string) {
  if (href.startsWith("http") || href.startsWith("ts3server:")) {
    return href;
  }

  const normalized = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${normalized}`;
}
