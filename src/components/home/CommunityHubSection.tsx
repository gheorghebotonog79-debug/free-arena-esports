"use client";

import { ArrowRight, Check, Copy, ExternalLink, Headphones, Mail, MessageCircle, MessagesSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { CopyToast } from "@/components/ui/copy-toast";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import { forumLinks } from "@/lib/forum-links";
import { routes } from "@/lib/routes";
import type { ForumStatusResponse } from "@/lib/forum-status";
import type { TeamSpeakStatusResponse } from "@/lib/teamspeak-status";

const DISCORD_URL = "https://discord.gg/freearena";
const TEAMSPEAK_ADDRESS = "ts.free-arena.ro";
const TEAMSPEAK_URL = `ts3server://${TEAMSPEAK_ADDRESS}`;

type HubTone = "forum" | "discord" | "teamspeak" | "contact";

const toneClass: Record<HubTone, string> = {
  forum: "server-card--cs16",
  discord: "server-card--global",
  teamspeak: "server-card--cs2",
  contact: "server-card--respawn",
};

function isForumStatus(value: unknown): value is ForumStatusResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ForumStatusResponse).status === "string" &&
    Array.isArray((value as ForumStatusResponse).latestTopics)
  );
}

function isTeamSpeakStatus(value: unknown): value is TeamSpeakStatusResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as TeamSpeakStatusResponse).status === "string" &&
    typeof (value as TeamSpeakStatusResponse).online === "boolean"
  );
}

export function CommunityHubSection() {
  const t = useTranslations("CommunityHub");
  const toastTimeoutRef = useRef<number | null>(null);
  const copiedTimeoutRef = useRef<number | null>(null);
  const [forumStatus, setForumStatus] = useState<ForumStatusResponse | null>(null);
  const [teamSpeakStatus, setTeamSpeakStatus] = useState<TeamSpeakStatusResponse | null>(null);
  const [copiedTeamSpeak, setCopiedTeamSpeak] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadCommunityStatus = useCallback(async () => {
    const [forumResult, teamSpeakResult] = await Promise.allSettled([
      fetch("/api/forum", { cache: "no-store" }),
      fetch("/api/teamspeak", { cache: "no-store" }),
    ]);

    if (forumResult.status === "fulfilled" && forumResult.value.ok) {
      const payload: unknown = await forumResult.value.json();
      setForumStatus(isForumStatus(payload) ? payload : null);
    }

    if (teamSpeakResult.status === "fulfilled" && teamSpeakResult.value.ok) {
      const payload: unknown = await teamSpeakResult.value.json();
      setTeamSpeakStatus(isTeamSpeakStatus(payload) ? payload : null);
    }
  }, []);

  useEffect(() => {
    void loadCommunityStatus();

    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }

      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, [loadCommunityStatus]);

  async function handleCopyTeamSpeak() {
    try {
      await copyTextToClipboard(TEAMSPEAK_ADDRESS);
      setCopiedTeamSpeak(true);
      setToastMessage(t("cards.teamspeak.toastCopied", { address: TEAMSPEAK_ADDRESS }));

      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      copiedTimeoutRef.current = window.setTimeout(() => {
        setCopiedTeamSpeak(false);
        copiedTimeoutRef.current = null;
      }, 1800);

      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }

      toastTimeoutRef.current = window.setTimeout(() => {
        setToastMessage(null);
        toastTimeoutRef.current = null;
      }, 2400);
    } catch {
      setCopiedTeamSpeak(false);
      setToastMessage(null);
    }
  }

  const forumActivity = forumStatus?.ok && forumStatus.latestTopics.length > 0
    ? t("cards.forum.activityTopics", { count: forumStatus.latestTopics.length })
    : forumStatus?.ok
      ? t("cards.forum.activityOnline")
      : t("cards.forum.activityFallback");
  const teamSpeakActivity = teamSpeakStatus?.online && teamSpeakStatus.maxUsers > 0
    ? t("cards.teamspeak.activityUsers", {
        maxUsers: teamSpeakStatus.maxUsers,
        users: teamSpeakStatus.users,
      })
    : teamSpeakStatus?.online
      ? t("cards.teamspeak.activityOnline")
      : t("cards.teamspeak.activityFallback");

  return (
    <section id="community" className="community-hub-section neon-section scroll-mt-32 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="max-w-4xl">
          <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
            {t("eyebrow")}
          </p>
          <h2 className="neon-heading mt-5 font-display text-[clamp(2.5rem,6vw,5.8rem)] font-black uppercase leading-[0.86] text-white">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
            {t("copy")}
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <CommunityHubCard
            Icon={MessagesSquare}
            activity={forumActivity}
            description={t("cards.forum.description")}
            mainCta={t("cards.forum.cta")}
            mainHref={forumLinks.home}
            mainEventName="click_forum"
            secondaryCta={t("cards.forum.secondary")}
            secondaryHref={forumLinks.rules}
            secondaryEventName="click_forum"
            title={t("cards.forum.title")}
            tone="forum"
          />
          <CommunityHubCard
            Icon={MessageCircle}
            activity={t("cards.discord.activity")}
            description={t("cards.discord.description")}
            mainCta={t("cards.discord.cta")}
            mainHref={DISCORD_URL}
            mainEventName="click_join_discord"
            secondaryCta={t("cards.discord.secondary")}
            secondaryHref="/join-staff"
            secondaryEventName="click_apply_staff"
            secondaryInternal
            title={t("cards.discord.title")}
            tone="discord"
          />
          <CommunityHubCard
            Icon={Headphones}
            activity={teamSpeakActivity}
            description={t("cards.teamspeak.description")}
            mainCta={t("cards.teamspeak.cta")}
            mainHref={TEAMSPEAK_URL}
            mainEventName="click_teamspeak"
            secondaryButton={{
              Icon: copiedTeamSpeak ? Check : Copy,
              label: copiedTeamSpeak ? t("cards.teamspeak.copied") : t("cards.teamspeak.copy"),
              onClick: () => void handleCopyTeamSpeak(),
            }}
            title={t("cards.teamspeak.title")}
            tone="teamspeak"
          />
          <CommunityHubCard
            Icon={Mail}
            activity={t("cards.contact.activity")}
            description={t("cards.contact.description")}
            mainCta={t("cards.contact.cta")}
            mainHref={routes.contact}
            mainEventName="click_contact"
            mainInternal
            title={t("cards.contact.title")}
            tone="contact"
          />
        </div>
      </div>
      <CopyToast message={toastMessage} />
    </section>
  );
}

function CommunityHubCard({
  Icon,
  activity,
  description,
  mainCta,
  mainEventName,
  mainHref,
  mainInternal = false,
  secondaryButton,
  secondaryCta,
  secondaryEventName,
  secondaryHref,
  secondaryInternal = false,
  title,
  tone,
}: {
  Icon: LucideIcon;
  activity: string;
  description: string;
  mainCta: string;
  mainEventName: "click_contact" | "click_forum" | "click_join_discord" | "click_teamspeak";
  mainHref: string;
  mainInternal?: boolean;
  secondaryButton?: {
    Icon: LucideIcon;
    label: string;
    onClick: () => void;
  };
  secondaryCta?: string;
  secondaryEventName?: "click_apply_staff" | "click_forum";
  secondaryHref?: string;
  secondaryInternal?: boolean;
  title: string;
  tone: HubTone;
}) {
  return (
    <article
      className={`community-hub-card server-tactical-card neon-hover ${toneClass[tone]} server-tactical-card--online group flex h-full min-w-0 flex-col p-5 sm:p-6`}
      data-occupancy="low"
      data-status="online"
    >
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="server-card__shine" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="server-card__icon community-hub-icon grid size-20 shrink-0 place-items-center">
            <Icon size={40} className="server-card__accent-icon" aria-hidden="true" />
          </span>
          <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
            <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
            {activity}
          </span>
        </div>

        <h3 className="server-card__title mt-9 font-display text-[clamp(2rem,3vw,3.35rem)] font-black uppercase leading-none text-white">
          {title}
        </h3>
        <p className="server-card__region mt-2 text-xs font-black uppercase tracking-[0.18em]">
          FREE-ARENA.RO
        </p>
        <p className="mt-5 text-sm font-semibold leading-7 text-white/64">
          {description}
        </p>

        <div className="mt-auto grid gap-2 pt-8">
          {mainInternal ? (
            <TrackedLink
              href={mainHref}
              eventName={mainEventName}
              eventPayload={{ location: "community_hub", target: title }}
              className="server-join-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              {mainCta}
              <ArrowRight size={15} aria-hidden="true" />
            </TrackedLink>
          ) : (
            <TrackedAnchor
              href={mainHref}
              eventName={mainEventName}
              eventPayload={{ location: "community_hub", target: title }}
              rel={mainHref.startsWith("http") ? "noopener noreferrer" : undefined}
              target={mainHref.startsWith("http") ? "_blank" : undefined}
              className="server-join-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              {mainCta}
              <ExternalLink size={15} aria-hidden="true" />
            </TrackedAnchor>
          )}

          {secondaryButton ? (
            <button
              type="button"
              onClick={secondaryButton.onClick}
              className="server-copy-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              <secondaryButton.Icon size={15} aria-hidden="true" />
              {secondaryButton.label}
            </button>
          ) : secondaryHref && secondaryCta && secondaryEventName ? (
            secondaryInternal ? (
              <TrackedLink
                href={secondaryHref}
                eventName={secondaryEventName}
                eventPayload={{ location: "community_hub", target: title }}
                className="server-details-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition"
              >
                {secondaryCta}
                <ArrowRight size={15} aria-hidden="true" />
              </TrackedLink>
            ) : (
              <TrackedAnchor
                href={secondaryHref}
                eventName={secondaryEventName}
                eventPayload={{ location: "community_hub", target: title }}
                rel="noopener noreferrer"
                target="_blank"
                className="server-details-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition"
              >
                {secondaryCta}
                <ArrowRight size={15} aria-hidden="true" />
              </TrackedAnchor>
            )
          ) : null}
        </div>
      </div>
    </article>
  );
}
