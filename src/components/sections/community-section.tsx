import Image from "next/image";
import { ArrowRight, BadgeCheck, Disc3, MessageSquare, WalletCards } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { communityChannels, communityPillars } from "@/data/platform";
import { routes } from "@/lib/routes";

export function CommunitySection() {
  const t = useTranslations("Community");

  return (
    <section id="community" className="cinematic-section bg-[#080808] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            eyebrow={t("heading.eyebrow")}
            title={t("heading.title")}
            copy={t("heading.copy")}
          />

          <MotionReveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={routes.community}
                className="button-glow inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-arena-green"
              >
                <Disc3 size={18} aria-hidden="true" />
                {t("cta.community")}
              </Link>
              <Link
                href={routes.servers}
                className="button-ghost inline-flex items-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-xl transition hover:border-arena-green/60 hover:bg-arena-green/10"
              >
                {t("cta.servers")}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </MotionReveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {communityChannels.map((channel, index) => {
            const Icon = channel.icon;

            return (
              <MotionCard
                key={channel.key}
                delay={0.08 + index * 0.07}
                className="premium-card glass-panel animated-border group h-full rounded-lg p-5"
              >
                <div className="absolute inset-0 bg-arena-grid bg-[size:32px_32px] opacity-[0.08]" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid size-12 place-items-center rounded-lg ${channel.iconClass}`}>
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <span className={`live-badge live-pulse inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${channel.statusClass}`}>
                      <span className="signal-bars mr-2" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </span>
                      {t(`hub.channels.${channel.key}.status`)}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-arena-green">
                    {t("hub.eyebrow")}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-black uppercase text-white">
                    {t(`hub.channels.${channel.key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/62">
                    {t(`hub.channels.${channel.key}.copy`)}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <div className="premium-card rounded-lg bg-black/28 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                        {t("hub.labels.online")}
                      </p>
                      <p className="stat-value mt-2 font-display text-3xl font-black text-white">
                        {channel.members}
                      </p>
                    </div>
                    <div className="premium-card min-w-0 rounded-lg bg-black/28 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                        {t("hub.labels.endpoint")}
                      </p>
                      <p className="mt-3 truncate text-sm font-bold text-white/72">
                        {channel.endpoint}
                      </p>
                    </div>
                  </div>

                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    className="button-glow mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-arena-green"
                  >
                    {t(`hub.channels.${channel.key}.cta`)}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </MotionCard>
            );
          })}

          {communityPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <MotionCard
                key={pillar.key}
                delay={0.2 + index * 0.06}
                className="premium-card glass-panel h-full rounded-lg p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`animated-border grid size-12 place-items-center rounded-lg ${pillar.iconClass}`}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <BadgeCheck size={20} className="text-arena-green" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-black text-white">
                  {t(`pillars.${pillar.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  {t(`pillars.${pillar.key}.copy`)}
                </p>
              </MotionCard>
            );
          })}

          <MotionReveal delay={0.28} className="sm:col-span-2">
            <article className="premium-card glass-panel grid gap-5 rounded-lg p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <Image
                src="/assets/brand/free-arena-icons-preview.png"
                alt={t("asset.alt")}
                width={150}
                height={84}
                className="h-24 w-full rounded-lg object-cover shadow-[0_18px_52px_rgba(0,0,0,0.3)] sm:h-20 sm:w-36"
              />
              <div>
                <h3 className="font-display text-2xl font-black text-white">
                  {t("asset.title")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  {t("asset.copy")}
                </p>
              </div>
              <div className="flex gap-2 sm:flex-col">
                <span className="premium-card inline-flex items-center gap-2 rounded-lg bg-black/28 px-3 py-2 text-sm font-bold text-white/70">
                  <MessageSquare size={17} className="text-arena-cyan" aria-hidden="true" />
                  {t("asset.chat")}
                </span>
                <span className="premium-card inline-flex items-center gap-2 rounded-lg bg-black/28 px-3 py-2 text-sm font-bold text-white/70">
                  <WalletCards size={17} className="text-arena-gold" aria-hidden="true" />
                  {t("asset.store")}
                </span>
              </div>
            </article>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
