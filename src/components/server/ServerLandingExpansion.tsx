import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Crown,
  Link2,
  Map,
  MessageSquare,
  PlugZap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { serverLandingPages, type ServerLandingPageContent } from "@/data/servers/landing-pages";
import type { Locale } from "@/i18n/routing";
import type { AnalyticsEventName } from "@/lib/analytics";
import type { ServerSeoPageData } from "@/lib/serverSeo";

type ServerLandingExpansionProps = {
  locale: Locale;
  page: ServerSeoPageData;
};

export function ServerLandingExpansion({ locale, page }: ServerLandingExpansionProps) {
  const landing = serverLandingPages[page.slug]?.[locale];

  if (!landing) {
    return null;
  }

  return (
    <>
      <PremiumOverview landing={landing} />
      <ConnectSection landing={landing} />
      <CardSection
        icon={<Sparkles size={22} aria-hidden="true" />}
        title={landing.featureTitle}
        items={landing.features}
      />
      <CardSection
        icon={<Crown size={22} aria-hidden="true" />}
        title={landing.vipTitle}
        intro={landing.vipIntro}
        items={landing.vipBenefits}
      />
      <CardSection
        icon={<Map size={22} aria-hidden="true" />}
        title={landing.mapsTitle}
        intro={landing.mapsIntro}
        items={landing.maps}
      />
      <RulesSection landing={landing} />
      <CommunitySection landing={landing} />
      <GallerySection landing={landing} />
      <DeepLinksSection landing={landing} serverSlug={page.slug} />
    </>
  );
}

function PremiumOverview({ landing }: { landing: ServerLandingPageContent }) {
  return (
    <section className="neon-section px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
        <div>
          <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
            {landing.eyebrow}
          </p>
          <h2 className="neon-heading neon-title neon-text-pulse mt-5 font-display text-[clamp(2.35rem,5vw,4.9rem)] font-black uppercase leading-[0.92] text-white">
            {landing.title}
          </h2>
        </div>
        <p className="premium-card glass-panel neon-hover rounded-lg p-5 text-base font-semibold leading-7 text-white/68">
          {landing.intro}
        </p>
      </div>
    </section>
  );
}

function ConnectSection({ landing }: { landing: ServerLandingPageContent }) {
  return (
    <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg border border-arena-green/30 bg-arena-green/12 text-arena-green">
              <PlugZap size={22} aria-hidden="true" />
            </span>
            <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
              {landing.connect.title}
            </h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-white/62">
            {landing.connect.intro}
          </p>
        </div>
        <div className="grid gap-3">
          {landing.connect.steps.map((step, index) => (
            <div key={step} className="premium-card glass-panel neon-hover flex gap-4 rounded-lg p-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 font-display text-sm font-black text-cyan-200">
                {index + 1}
              </span>
              <p className="text-sm font-semibold leading-6 text-white/68">{step}</p>
            </div>
          ))}
          <p className="rounded-lg border border-arena-gold/20 bg-arena-gold/10 p-4 text-sm font-semibold leading-6 text-white/70">
            {landing.connect.note}
          </p>
        </div>
      </div>
    </section>
  );
}

function CardSection({
  icon,
  intro,
  items,
  title,
}: {
  icon: ReactNode;
  intro?: string;
  items: readonly { copy: string; title: string }[];
  title: string;
}) {
  return (
    <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex max-w-4xl items-start gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
            {icon}
          </span>
          <div>
            <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
              {title}
            </h2>
            {intro ? <p className="mt-3 text-sm leading-7 text-white/62">{intro}</p> : null}
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className="premium-card glass-panel neon-hover h-full rounded-lg p-5">
              <h3 className="font-display text-xl font-black uppercase text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/62">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RulesSection({ landing }: { landing: ServerLandingPageContent }) {
  return (
    <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[0.74fr_1.26fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg border border-arena-red/30 bg-arena-red/12 text-arena-red">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
              {landing.rulesTitle}
            </h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-white/62">
            {landing.rulesIntro}
          </p>
        </div>
        <div className="grid gap-3">
          {landing.rules.map((rule) => (
            <div key={rule} className="premium-card glass-panel neon-hover flex gap-3 rounded-lg p-4">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-arena-green" aria-hidden="true" />
              <p className="text-sm font-semibold leading-6 text-white/68">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySection({ landing }: { landing: ServerLandingPageContent }) {
  return (
    <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex items-start gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-[#98a3ff]/30 bg-[#5865f2]/12 text-[#98a3ff]">
            <MessageSquare size={22} aria-hidden="true" />
          </span>
          <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
            {landing.communityTitle}
          </h2>
        </div>
        <article className="premium-card glass-panel neon-hover rounded-lg p-5">
          <div className="grid gap-5 text-sm leading-7 text-white/66">
            {landing.communityBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function GallerySection({ landing }: { landing: ServerLandingPageContent }) {
  return (
    <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex max-w-4xl items-start gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-arena-gold/30 bg-arena-gold/12 text-arena-gold">
            <Camera size={22} aria-hidden="true" />
          </span>
          <div>
            <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
              {landing.galleryTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/62">
              {landing.galleryIntro}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {landing.gallery.map((item) => (
            <article key={item.title} className="premium-card glass-panel neon-hover overflow-hidden rounded-lg">
              <div className="grid aspect-[16/9] place-items-center bg-black/34 p-8">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={180}
                  height={180}
                  sizes="(min-width: 768px) 180px, 42vw"
                  className="max-h-36 w-auto object-contain drop-shadow-[0_0_28px_rgba(56,213,255,0.22)]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-black uppercase text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeepLinksSection({ landing, serverSlug }: { landing: ServerLandingPageContent; serverSlug: string }) {
  return (
    <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-lg border border-white/12 bg-white/[0.055] text-white">
            <Link2 size={22} aria-hidden="true" />
          </span>
          <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
            {landing.internalLinksTitle}
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {landing.internalLinks.map((item) => (
            <TrackedLink
              key={item.href}
              eventName={getInternalLinkEventName(item.href)}
              eventPayload={{ location: "server_landing_deep_links", server: serverSlug, target: item.href }}
              href={item.href}
              className="premium-card glass-panel neon-hover group h-full rounded-lg p-5 transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-black uppercase text-white">
                  {item.title}
                </h3>
                <ArrowRight size={18} className="shrink-0 text-cyan-200 transition group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <p className="mt-3 text-sm leading-6 text-white/62">{item.copy}</p>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function getInternalLinkEventName(href: string): AnalyticsEventName {
  if (href === "/discord") {
    return "click_join_discord";
  }

  if (href === "/teamspeak") {
    return "click_teamspeak";
  }

  if (href === "/join-staff") {
    return "click_apply_staff";
  }

  if (href === "/shop") {
    return "click_shop_vip";
  }

  return "click_server_details";
}
