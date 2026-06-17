import { ArrowRight, ListChecks, RadioTower, Search, Server, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
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
import { KeywordLandingActions } from "@/components/seo/KeywordLandingActions";
import type { Locale } from "@/i18n/routing";
import type { KeywordLandingPageContent } from "@/data/keyword-landings";
import type { AnalyticsEventName, AnalyticsPayload } from "@/lib/analytics";

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
              <TrackedCTA
                eventName={getEventNameForHref(content.primaryAction.href)}
                eventPayload={buildEventPayload(content, "keyword_landing_hero", content.primaryAction.href)}
                href={primaryHref}
                variant="glow"
              >
                {content.primaryAction.label}
                <ArrowRight size={17} aria-hidden="true" />
              </TrackedCTA>
              <TrackedCTA
                eventName={getEventNameForHref(content.secondaryAction.href)}
                eventPayload={buildEventPayload(content, "keyword_landing_hero", content.secondaryAction.href)}
                href={secondaryHref}
                tone="cyan"
              >
                {content.secondaryAction.label}
              </TrackedCTA>
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

        {content.quickActions?.length ? (
          <TacticalSection
            eyebrow={locale === "ro" ? "Acțiuni rapide" : "Quick actions"}
            title={locale === "ro" ? "Intră direct în joc" : "Join or check the server"}
            description={locale === "ro"
              ? "IP-uri și canale de comunitate la vedere, ca jucătorul să poată testa serverul fără pași inutili."
              : "Direct IPs and community routes stay visible so players can test the server without extra steps."}
          >
            <KeywordLandingActions
              actions={content.quickActions.map((action) =>
                action.href ? { ...action, href: localizeHref(locale, action.href) } : action
              )}
              landing={content.slug}
              location="keyword_landing_quick_actions"
            />
          </TacticalSection>
        ) : null}

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
                  <TrackedCTA
                    eventName={getEventNameForHref(item.href)}
                    eventPayload={buildEventPayload(content, "keyword_landing_related", item.href)}
                    href={localizeHref(locale, item.href)}
                    tone="cyan"
                  >
                    {locale === "ro" ? "Deschide" : "Open"}
                    <ArrowRight size={17} aria-hidden="true" />
                  </TrackedCTA>
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

function TrackedCTA({
  children,
  eventName,
  eventPayload,
  href,
  tone = "cyan",
  variant = "ghost",
}: {
  children: ReactNode;
  eventName: AnalyticsEventName;
  eventPayload: AnalyticsPayload;
  href: string;
  tone?: "cs16" | "cs2" | "cyan" | "fivem" | "global" | "respawn";
  variant?: "glow" | "ghost";
}) {
  return (
    <TrackedAnchor
      eventName={eventName}
      eventPayload={eventPayload}
      href={href}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
      className={[
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition",
        variant === "glow"
          ? "button-glow border border-transparent bg-arena-cyan text-black hover:bg-white"
          : `button-ghost border ${getToneClass(tone)}`,
      ].join(" ")}
    >
      {children}
    </TrackedAnchor>
  );
}

function getToneClass(tone: "cs16" | "cs2" | "cyan" | "fivem" | "global" | "respawn") {
  switch (tone) {
    case "cs16":
      return "border-orange-300/24 bg-orange-300/10 text-orange-100 hover:border-orange-200/60 hover:bg-orange-300/18";
    case "cs2":
      return "border-fuchsia-300/24 bg-fuchsia-300/10 text-fuchsia-100 hover:border-fuchsia-200/60 hover:bg-fuchsia-300/18";
    case "fivem":
      return "border-emerald-300/28 bg-emerald-300/10 text-emerald-100 hover:border-emerald-200/70 hover:bg-emerald-300/18";
    case "respawn":
      return "border-red-300/24 bg-red-300/10 text-red-100 hover:border-red-200/60 hover:bg-red-300/18";
    case "global":
    case "cyan":
      return "border-cyan-300/24 bg-cyan-300/10 text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/18";
  }
}

function getEventNameForHref(href: string): AnalyticsEventName {
  if (href.includes("discord")) {
    return "click_join_discord";
  }

  if (href.includes("teamspeak") || href.startsWith("ts3server:")) {
    return "click_teamspeak";
  }

  if (href.includes("join-staff")) {
    return "click_apply_staff";
  }

  if (href.includes("shop")) {
    return "click_shop_vip";
  }

  return "click_server_details";
}

function buildEventPayload(content: KeywordLandingPageContent, location: string, target: string): AnalyticsPayload {
  return {
    landing: content.slug,
    location,
    target,
  };
}

function localizeHref(locale: Locale, href: string) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
    return href;
  }

  const normalized = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${normalized}`;
}
