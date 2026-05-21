import Image from "next/image";
import { ArrowRight, BadgeCheck, Disc3, MessageSquare, WalletCards } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { communityPillars } from "@/data/platform";
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
          {communityPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <MotionCard
                key={pillar.key}
                delay={index * 0.07}
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
