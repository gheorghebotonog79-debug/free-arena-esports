import { ArrowRight, Check, Crown, Gem, Medal, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";
import { forumLinks } from "@/lib/forum-links";

type VipPreviewTier = {
  Icon: LucideIcon;
  key: "gold" | "diamond" | "queen";
};

const vipPreviewTiers: VipPreviewTier[] = [
  { Icon: Medal, key: "gold" },
  { Icon: Gem, key: "diamond" },
  { Icon: Crown, key: "queen" },
];

export function VipPreviewSection() {
  const t = useTranslations("VipPreview");

  return (
    <section id="vip-preview" className="vip-preview-section neon-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {t("eyebrow")}
            </p>
            <h2 className="neon-heading mt-5 font-display text-[clamp(2.35rem,5vw,5rem)] font-black uppercase leading-[0.88] text-white">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/64">
              {t("copy")}
            </p>
          </div>

          <p className="vip-preview-note max-w-sm text-sm font-black uppercase leading-6 tracking-[0.14em] text-white/48">
            {t("note")}
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {vipPreviewTiers.map(({ Icon, key }) => (
            <article
              className={`vip-preview-card vip-preview-card--${key} server-tactical-card neon-hover server-tactical-card--online group flex h-full min-w-0 flex-col p-5 sm:p-6`}
              data-occupancy="low"
              data-status="online"
              key={key}
            >
              <div className="server-card__backdrop" aria-hidden="true" />
              <div className="server-card__noise" aria-hidden="true" />
              <div className="server-card__scanline" aria-hidden="true" />
              <div className="server-card__shine" aria-hidden="true" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="vip-preview-icon server-card__icon grid size-16 shrink-0 place-items-center">
                    <Icon size={32} className="server-card__accent-icon" aria-hidden="true" />
                  </span>
                  <span className="vip-preview-tier-badge px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em]">
                    {t(`packages.${key}.label`)}
                  </span>
                </div>

                <h3 className="server-card__title mt-8 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-black uppercase leading-none text-white">
                  {t(`packages.${key}.name`)}
                </h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/66">
                  {t(`packages.${key}.description`)}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-white/38">
                    {t("benefitsLabel")}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {["one", "two", "three"].map((benefitKey) => (
                      <li className="vip-preview-benefit flex gap-2 text-sm font-semibold leading-6 text-white/66" key={benefitKey}>
                        <Check size={15} className="mt-1 shrink-0 text-[color:var(--card-accent)]" aria-hidden="true" />
                        <span>{t(`packages.${key}.benefits.${benefitKey}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <TrackedAnchor
                  className="server-join-button mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition"
                  eventName="click_shop_vip"
                  eventPayload={{ location: "vip_preview", package: key }}
                  href={forumLinks.vipRequests}
                  rel="noreferrer"
                  target="_blank"
                >
                  {t("cta")}
                  <ArrowRight size={15} aria-hidden="true" />
                </TrackedAnchor>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
