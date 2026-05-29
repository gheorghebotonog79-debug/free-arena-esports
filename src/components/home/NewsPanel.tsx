import { ArrowRight, CalendarDays, RadioTower, Trophy, Wrench, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PublicNewsPost } from "@/lib/public-news";

type NewsPanelProps = {
  locale: string;
  posts: PublicNewsPost[];
};

type NewsCardData = {
  author: string;
  date: string;
  excerpt: string;
  id: string;
  title: string;
};

const fallbackKeys = ["one", "two", "three"] as const;
const categories = ["UPDATE", "TOURNAMENT", "MAINTENANCE"] as const;
type NewsCategory = (typeof categories)[number];

const categoryIcons: Record<NewsCategory, LucideIcon> = {
  UPDATE: Zap,
  TOURNAMENT: Trophy,
  MAINTENANCE: Wrench,
};

const categoryClassNames: Record<NewsCategory, string> = {
  UPDATE: "news-command-card--update",
  TOURNAMENT: "news-command-card--tournament",
  MAINTENANCE: "news-command-card--maintenance",
};

function formatDate(value: Date | null, locale: string) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
    dateStyle: "medium",
  }).format(value);
}

export function NewsPanel({ locale, posts }: NewsPanelProps) {
  const t = useTranslations("WarRoom.news");
  const adminCards = posts.slice(0, 3).map((post): NewsCardData => ({
    author: post.authorName ?? t("authorFallback"),
    date: formatDate(post.publishedAt, locale) ?? t("live"),
    excerpt: post.excerpt,
    id: post.id,
    title: post.title,
  }));
  const fallbackCards = fallbackKeys.map((key): NewsCardData => ({
    author: t("authorFallback"),
    date: t(`fallback.${key}.date`),
    excerpt: t(`fallback.${key}.copy`),
    id: `fallback-${key}`,
    title: t(`fallback.${key}.title`),
  }));
  const cards = [...adminCards, ...fallbackCards].slice(0, 3);

  return (
    <section id="news" className="neon-section scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
          <div>
            <p className="neon-kicker section-badge-label px-4 py-2">
              {t("eyebrow")}
            </p>
            <h2 className="neon-heading mt-4 font-display text-[clamp(2.7rem,7vw,5.7rem)] font-black uppercase leading-[0.88] text-white">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
              {t("copy")}
            </p>
          </div>

          <div className="neon-panel hud-frame p-4">
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="neon-icon-cell grid size-12 place-items-center text-cyan-200">
                  <RadioTower size={23} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-300">Live ops</p>
                  <p className="mt-1 text-sm font-bold text-white/58">{posts.length > 0 ? t("live") : t("emptyTitle")}</p>
                </div>
              </div>
              <span className="signal-bars text-cyan-200" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <NewsHudCard
              card={card}
              category={categories[index % categories.length]}
              index={index}
              key={card.id}
              publishedLabel={t("published")}
              readMoreLabel={t("readMore")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsHudCard({
  card,
  category,
  index,
  publishedLabel,
  readMoreLabel,
}: {
  card: NewsCardData;
  category: NewsCategory;
  index: number;
  publishedLabel: string;
  readMoreLabel: string;
}) {
  const CategoryIcon = categoryIcons[category];

  return (
    <article className={`neon-card news-command-card ${categoryClassNames[category]} group p-5 sm:p-6`}>
      <span className="news-card__backdrop" aria-hidden="true" />
      <span className="news-card__scanline" aria-hidden="true" />
      <span className="news-card__corner" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="news-card__icon grid size-12 place-items-center">
            <CategoryIcon size={24} aria-hidden="true" />
          </span>
          <span className="news-card__date inline-flex items-center gap-2 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em]">
            <CalendarDays size={14} aria-hidden="true" />
            {card.date}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="news-card__category inline-flex w-fit items-center gap-1.5 px-2.5 py-1 text-xs font-black uppercase tracking-[0.2em]">
            <CategoryIcon size={12} className="text-current" aria-hidden="true" />
            {category}
          </p>
          <p className="news-card__ordinal text-xs font-black uppercase tracking-[0.18em]">
            0{index + 1} / {publishedLabel}
          </p>
        </div>
        <h3 className="news-card__title mt-4 line-clamp-2 font-display text-[clamp(1.75rem,2.5vw,2.35rem)] font-black uppercase leading-none text-white" title={card.title}>
          {card.title}
        </h3>
        <p className="mt-4 line-clamp-4 text-sm font-semibold leading-6 text-white/60">
          {card.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5">
          <span className="min-w-0 truncate text-xs font-black uppercase tracking-[0.16em] text-white/38">
            {card.author}
          </span>
          <a href="#news" className="news-card__read-more inline-flex shrink-0 items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] no-underline hover:underline">
            {readMoreLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
