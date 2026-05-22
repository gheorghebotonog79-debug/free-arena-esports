import { ArrowRight, CalendarDays, Newspaper, RadioTower } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PublicNewsPost } from "@/lib/public-news";

type NewsSectionProps = {
  locale: string;
  posts: PublicNewsPost[];
};

function formatNewsDate(value: Date | null, locale: string) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
    dateStyle: "medium",
  }).format(value);
}

export function NewsSection({ locale, posts }: NewsSectionProps) {
  const t = useTranslations("News");
  const hasPosts = posts.length > 0;

  return (
    <section id="news" className="cinematic-section bg-[#070707] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t("heading.eyebrow")}
            title={t("heading.title")}
            copy={t("heading.copy")}
          />

          <MotionReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-lg border border-arena-cyan/25 bg-arena-cyan/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-arena-cyan shadow-[0_0_34px_rgba(45,212,253,0.1)]">
              <RadioTower size={15} aria-hidden="true" />
              {hasPosts ? t("status.live") : t("status.ready")}
            </div>
          </MotionReveal>
        </div>

        {hasPosts ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {posts.map((post, index) => {
              const publishedDate = formatNewsDate(post.publishedAt, locale);

              return (
                <MotionCard
                  className="premium-card glass-panel animated-border group flex h-full flex-col rounded-lg p-5"
                  delay={index * 0.08}
                  key={post.id}
                >
                  <div className="absolute inset-0 bg-arena-grid bg-[size:32px_32px] opacity-[0.07]" aria-hidden="true" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-arena-red/30 bg-arena-red/12 text-arena-red shadow-[0_0_32px_rgba(255,59,59,0.12)]">
                        <Newspaper size={22} aria-hidden="true" />
                      </span>
                      {publishedDate ? (
                        <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/52">
                          <CalendarDays size={14} aria-hidden="true" />
                          {publishedDate}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-arena-green">
                      {t("card.eyebrow")}
                    </p>
                    <h3 className="mt-2 line-clamp-3 font-display text-2xl font-black uppercase leading-tight text-white">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/62">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <span className="min-w-0 truncate text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          {post.authorName ?? t("card.authorFallback")}
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-arena-cyan">
                          {t("card.reading")}
                          <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </MotionCard>
              );
            })}
          </div>
        ) : (
          <MotionReveal delay={0.14}>
            <div className="premium-card glass-panel animated-border mt-10 rounded-lg p-6">
              <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
                <span className="grid size-12 place-items-center rounded-lg border border-arena-gold/30 bg-arena-gold/12 text-arena-gold shadow-[0_0_34px_rgba(255,214,102,0.12)]">
                  <Newspaper size={24} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white">
                    {t("empty.title")}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/62">
                    {t("empty.copy")}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-black/28 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/54">
                  {t("empty.badge")}
                </span>
              </div>
            </div>
          </MotionReveal>
        )}
      </div>
    </section>
  );
}
