"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowRight, MessageSquareText, RadioTower, UsersRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ForumStatusResponse } from "@/lib/forum-status";

const FORUM_REFRESH_INTERVAL_MS = 60_000;

function isForumStatusResponse(value: unknown): value is ForumStatusResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ForumStatusResponse).status === "string" &&
    Array.isArray((value as ForumStatusResponse).latestTopics)
  );
}

function formatNumber(value: number | undefined, fallback: string, locale: string) {
  if (typeof value !== "number") {
    return fallback;
  }

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value);
}

export function ForumDerbyPanel() {
  const t = useTranslations("Hero.forum");
  const locale = useLocale();
  const [forumStatus, setForumStatus] = useState<ForumStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadForumStatus() {
      try {
        const response = await fetch("/api/forum", { cache: "no-store" });
        const payload: unknown = await response.json();

        if (isActive && isForumStatusResponse(payload)) {
          setForumStatus(payload);
        }
      } catch {
        if (isActive) {
          setForumStatus(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadForumStatus();
    const interval = window.setInterval(() => {
      void loadForumStatus();
    }, FORUM_REFRESH_INTERVAL_MS);

    return () => {
      isActive = false;
      window.clearInterval(interval);
    };
  }, []);

  const status = forumStatus?.status ?? (isLoading ? "degraded" : "offline");
  const isLive = status === "online" || status === "degraded";
  const forumUrl = forumStatus?.forumUrl || "https://free-arena.ro";
  const latestTopics = forumStatus?.latestTopics ?? [];
  const fallback = t(
    forumStatus?.message === "permission_denied"
      ? "permissionFallback"
      : forumStatus?.message === "rate_limited"
        ? "rateLimitFallback"
        : "fallback",
  );

  return (
    <div className="rounded-lg border border-arena-cyan/20 bg-arena-cyan/[0.055] p-4 shadow-[0_18px_52px_rgba(0,216,255,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-cyan">
            {t("eyebrow")}
          </p>
          <h3 className="mt-2 font-display text-xl font-black uppercase text-white">
            {t("title")}
          </h3>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${
            isLive
              ? "border-arena-green/30 bg-arena-green/12 text-arena-green"
              : "border-arena-red/30 bg-arena-red/12 text-arena-red"
          }`}
        >
          <span className={isLive ? "live-pulse" : ""} aria-hidden="true">
            <Activity size={14} />
          </span>
          {isLoading ? t("loading") : t(`status.${status}`)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="premium-card rounded-lg bg-black/28 p-3">
          <UsersRound size={16} className="text-arena-green" aria-hidden="true" />
          <p className="mt-2 font-display text-xl font-black text-white">
            {isLoading ? "0" : formatNumber(forumStatus?.membersTotal, t("unknown"), locale)}
          </p>
          <p className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-white/42">
            {t("stats.members")}
          </p>
        </div>
        <div className="premium-card rounded-lg bg-black/28 p-3">
          <MessageSquareText size={16} className="text-arena-cyan" aria-hidden="true" />
          <p className="mt-2 font-display text-xl font-black text-white">
            {isLoading ? "0" : formatNumber(forumStatus?.topicsTotal, t("unknown"), locale)}
          </p>
          <p className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-white/42">
            {t("stats.topics")}
          </p>
        </div>
        <div className="premium-card rounded-lg bg-black/28 p-3">
          <RadioTower size={16} className="text-arena-gold" aria-hidden="true" />
          <p className="mt-2 font-display text-xl font-black text-white">
            {isLoading ? "0" : formatNumber(forumStatus?.postsTotal, t("unknown"), locale)}
          </p>
          <p className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-white/42">
            {t("stats.posts")}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-black/24 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-white/48">
            {t("latest")}
          </p>
          {forumStatus?.checkedAt ? (
            <p className="text-xs font-semibold text-white/38">
              {t("checked")}
            </p>
          ) : null}
        </div>

        {latestTopics.length > 0 ? (
          <div className="mt-3 grid gap-2">
            {latestTopics.slice(0, 3).map((topic) => (
              <a
                key={topic.id}
                href={topic.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 transition hover:border-arena-cyan/40 hover:bg-arena-cyan/10"
              >
                <span className="line-clamp-1 text-sm font-bold text-white group-hover:text-arena-cyan">
                  {topic.title}
                </span>
                <span className="mt-1 block text-xs font-semibold text-white/40">
                  {typeof topic.replies === "number"
                    ? t("replies", { count: topic.replies })
                    : topic.authorName || t("latestFallback")}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-white/56">
            {isLoading ? t("loadingCopy") : fallback}
          </p>
        )}
      </div>

      <a
        href={forumUrl}
        target="_blank"
        rel="noreferrer"
        className="button-ghost mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-xl transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
      >
        {t("open")}
        <ArrowRight size={17} aria-hidden="true" />
      </a>
    </div>
  );
}
