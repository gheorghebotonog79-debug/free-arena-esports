import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  LinkIcon,
  LogIn,
  Newspaper,
  RadioTower,
  RefreshCw,
  Server,
  Trophy,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { forumLinks } from "@/lib/forum-links";
import type { PublicNewsPost } from "@/lib/public-news";

type NewsSectionProps = {
  locale: string;
  posts: PublicNewsPost[];
};

const opsItems = [
  { key: "rsu", Icon: UsersRound, tone: "text-arena-green", border: "border-arena-green/22 bg-arena-green/10" },
  { key: "servers", Icon: Server, tone: "text-arena-cyan", border: "border-arena-cyan/22 bg-arena-cyan/10" },
  { key: "forum", Icon: FileText, tone: "text-arena-cyan", border: "border-arena-cyan/22 bg-arena-cyan/10" },
  { key: "teamspeak", Icon: RadioTower, tone: "text-arena-green", border: "border-arena-green/22 bg-arena-green/10" },
  { key: "battlepass", Icon: RefreshCw, tone: "text-arena-gold", border: "border-arena-gold/22 bg-arena-gold/10" },
  { key: "steam", Icon: LogIn, tone: "text-white/70", border: "border-white/12 bg-white/[0.055]" },
] as const;

const roadmapItems = ["profiles", "battlepass", "steam"] as const;

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

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_25rem] xl:grid-cols-[minmax(0,1.1fr)_28rem]">
          {hasPosts ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {posts.map((post, index) => (
                <NewsCard
                  author={post.authorName ?? t("card.authorFallback")}
                  delay={index * 0.08}
                  eyebrow={t("card.eyebrow")}
                  excerpt={post.excerpt}
                  key={post.id}
                  publishedDate={formatNewsDate(post.publishedAt, locale)}
                  publishedLabel={t("card.reading")}
                  title={post.title}
                />
              ))}
            </div>
          ) : (
            <MotionReveal delay={0.14}>
              <div className="premium-card glass-panel animated-border rounded-lg p-6">
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

          <LiveOpsBoard />
        </div>
      </div>
    </section>
  );
}

function NewsCard({
  author,
  delay,
  eyebrow,
  excerpt,
  publishedDate,
  publishedLabel,
  title,
}: {
  author: string;
  delay: number;
  eyebrow: string;
  excerpt: string;
  publishedDate: string | null;
  publishedLabel: string;
  title: string;
}) {
  return (
    <MotionCard
      className="premium-card glass-panel animated-border group flex h-full flex-col rounded-lg p-4"
      delay={delay}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(255,59,59,0.08),transparent_58%),radial-gradient(ellipse_at_82%_100%,rgba(0,216,255,0.05),transparent_62%)]" aria-hidden="true" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-arena-red/30 bg-arena-red/12 text-arena-red shadow-[0_0_32px_rgba(255,59,59,0.12)]">
            <Newspaper size={20} aria-hidden="true" />
          </span>
          {publishedDate ? (
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/52">
              <CalendarDays size={14} aria-hidden="true" />
              {publishedDate}
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-arena-green">
          {eyebrow}
        </p>
        <h3 className="mt-2 line-clamp-2 font-display text-2xl font-black uppercase leading-tight text-white">
          {title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/62">
          {excerpt}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="min-w-0 truncate text-xs font-bold uppercase tracking-[0.14em] text-white/38">
              {author}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-arena-cyan">
              {publishedLabel}
              <ArrowRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </MotionCard>
  );
}

function LiveOpsBoard() {
  const t = useTranslations("News");

  return (
    <MotionCard delay={0.12} className="premium-card glass-panel animated-border h-full rounded-lg p-5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(0,216,255,0.07),transparent_58%),radial-gradient(ellipse_at_80%_100%,rgba(255,106,0,0.07),transparent_64%)]" aria-hidden="true" />
      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-lg border border-arena-cyan/25 bg-arena-cyan/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-arena-cyan">
          <RadioTower size={15} aria-hidden="true" />
          {t("ops.eyebrow")}
        </p>
        <h3 className="mt-4 font-display text-3xl font-black uppercase text-white">
          {t("ops.title")}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/62">
          {t("ops.copy")}
        </p>

        <div className="mt-5 grid gap-2">
          {opsItems.map(({ key, Icon, tone, border }) => (
            <OpsStatusItem
              Icon={Icon}
              border={border}
              key={key}
              label={t(`ops.items.${key}.label`)}
              status={t(`ops.items.${key}.status`)}
              tone={tone}
            />
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-black/24 p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-arena-gold">
            <Trophy size={16} aria-hidden="true" />
            {t("ops.roadmap.title")}
          </p>
          <div className="mt-4 grid gap-3">
            {roadmapItems.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/68">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-arena-gold/20 bg-arena-gold/10 text-arena-gold">
                  <CheckCircle2 size={15} aria-hidden="true" />
                </span>
                {t(`ops.roadmap.items.${item}`)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Link
            href="/#community"
            className="button-glow inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-arena-green"
          >
            {t("ops.cta.progress")}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <a
            href={forumLinks.announcements}
            target="_blank"
            rel="noopener noreferrer"
            className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
          >
            {t("ops.cta.forum")}
            <LinkIcon size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </MotionCard>
  );
}

function OpsStatusItem({
  Icon,
  border,
  label,
  status,
  tone,
}: {
  Icon: LucideIcon;
  border: string;
  label: string;
  status: string;
  tone: string;
}) {
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 ${border}`}>
      <div className="flex min-w-0 items-center gap-3">
        <Icon size={18} className={`shrink-0 ${tone}`} aria-hidden="true" />
        <span className="min-w-0 truncate text-sm font-black text-white">{label}</span>
      </div>
      <span className="shrink-0 rounded-lg border border-white/10 bg-black/28 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-white/64">
        {status}
      </span>
    </div>
  );
}
