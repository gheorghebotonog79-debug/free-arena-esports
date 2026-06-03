"use client";

import {
  Check,
  Copy,
  ExternalLink,
  Headphones,
  Handshake,
  Mail,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TacticalCardChrome } from "@/components/home/HomeTacticalPrimitives";
import { CopyToast } from "@/components/ui/copy-toast";
import {
  contactCommandCenterContent,
  type ContactCardContent,
  type ContactCardKey,
  type ContactCardTone,
} from "@/data/contact-command-center";
import type { Locale } from "@/i18n/routing";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";

const COPIED_RESET_MS = 1800;
const TOAST_RESET_MS = 2400;

const iconByCardKey: Record<ContactCardKey, LucideIcon> = {
  discord: MessageCircle,
  forum: MessagesSquare,
  general: Mail,
  partnerships: Handshake,
  staff: UserRound,
  teamspeak: Headphones,
};

const toneClass: Record<ContactCardTone, string> = {
  cyan: "server-card--cs2",
  global: "server-card--global",
  orange: "server-card--cs16",
  red: "server-card--respawn",
};

function getContactEventName(card: ContactCardContent): AnalyticsEventName {
  if (card.key === "discord") {
    return "click_join_discord";
  }

  if (card.key === "forum") {
    return "click_forum";
  }

  if (card.key === "teamspeak") {
    return "click_teamspeak";
  }

  return "click_contact";
}

export function ContactCommandCenter({ locale }: { locale: Locale }) {
  const content = contactCommandCenterContent[locale];
  const copiedTimeoutRef = useRef<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<ContactCardKey | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => (
    () => {
      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    }
  ), []);

  async function handleCopy(card: ContactCardContent) {
    try {
      trackEvent(getContactEventName(card), {
        action: "copy",
        channel: card.key,
        location: "contact_command_center",
      });
      await copyTextToClipboard(card.value);
      setCopiedKey(card.key);
      setToastMessage(content.actions.copiedToast.replace("{value}", card.value));

      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      copiedTimeoutRef.current = window.setTimeout(() => {
        setCopiedKey(null);
        copiedTimeoutRef.current = null;
      }, COPIED_RESET_MS);

      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }

      toastTimeoutRef.current = window.setTimeout(() => {
        setToastMessage(null);
        toastTimeoutRef.current = null;
      }, TOAST_RESET_MS);
    } catch {
      setCopiedKey(null);
      setToastMessage(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505]">
      <section className="neon-section relative overflow-hidden px-4 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
        <div className="mx-auto w-full max-w-[92rem]">
          <div className="max-w-5xl">
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {content.hero.eyebrow}
            </p>
            <h1 className="neon-heading mt-5 max-w-5xl font-display text-[clamp(3rem,8vw,7.25rem)] font-black uppercase leading-[0.84] text-white">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
              {content.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16" aria-labelledby="contact-channels-title">
        <div className="mx-auto w-full max-w-[92rem]">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
                FREE-ARENA
              </p>
              <h2 id="contact-channels-title" className="neon-heading mt-4 font-display text-[clamp(2.25rem,5vw,4.6rem)] font-black uppercase leading-[0.9] text-white">
                {content.sectionTitle}
              </h2>
            </div>
            <div className="hidden items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/46 sm:flex">
              <ShieldCheck size={16} className="server-card__accent-icon" aria-hidden="true" />
              <span>FREE-ARENA.RO</span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.cards.map((card) => (
              <ContactChannelCard
                key={card.key}
                card={card}
                copied={copiedKey === card.key}
                copiedLabel={content.actions.copied}
                copyAriaTemplate={content.actions.copyAria}
                emailAriaTemplate={content.actions.emailAria}
                onCopy={() => void handleCopy(card)}
                openAriaTemplate={content.actions.openAria}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="neon-section px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24" aria-labelledby="contact-help-title">
        <div className="mx-auto w-full max-w-[92rem]">
          <div
            className="server-tactical-card neon-hover server-card--global server-tactical-card--online p-5 sm:p-7 lg:p-8"
            data-occupancy="low"
            data-status="online"
          >
            <TacticalCardChrome />
            <div className="relative z-10 grid gap-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center">
              <div>
                <p className="server-card__region text-xs font-black uppercase tracking-[0.18em]">
                  {content.help.eyebrow}
                </p>
                <h2 id="contact-help-title" className="server-card__title mt-4 font-display text-[clamp(2.1rem,4.2vw,4.2rem)] font-black uppercase leading-[0.9] text-white">
                  {content.help.title}
                </h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.help.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-white/72"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CopyToast message={toastMessage} />
    </main>
  );
}

function ContactChannelCard({
  card,
  copied,
  copiedLabel,
  copyAriaTemplate,
  emailAriaTemplate,
  onCopy,
  openAriaTemplate,
}: {
  card: ContactCardContent;
  copied: boolean;
  copiedLabel: string;
  copyAriaTemplate: string;
  emailAriaTemplate: string;
  onCopy: () => void;
  openAriaTemplate: string;
}) {
  const Icon = iconByCardKey[card.key];
  const copyLabel = copied ? copiedLabel : card.secondaryLabel;
  const isExternalHttp = card.href?.startsWith("http") ?? false;
  const eventName = getContactEventName(card);
  const primaryAction = card.type === "email" ? "mailto" : card.type === "teamspeak" ? "connect" : "open";
  const primaryAriaLabel = card.type === "email"
    ? emailAriaTemplate.replace("{value}", card.value)
    : openAriaTemplate.replace("{title}", card.title);

  return (
    <article
      className={`server-tactical-card neon-hover ${toneClass[card.tone]} server-tactical-card--online group flex h-full min-h-[25rem] min-w-0 flex-col p-5 sm:p-6`}
      data-occupancy="low"
      data-status="online"
    >
      <TacticalCardChrome />
      <div className="relative z-10 flex h-full min-w-0 flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="server-card__icon grid size-16 shrink-0 place-items-center sm:size-18">
            <Icon size={34} className="server-card__accent-icon" aria-hidden="true" />
          </span>
          <span className="server-status-badge inline-flex max-w-[12rem] shrink-0 items-center gap-2 px-2.5 py-1 text-right text-[0.68rem] font-black uppercase leading-tight tracking-[0.14em]">
            <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
            {card.status}
          </span>
        </div>

        <h3 className="server-card__title mt-7 font-display text-[clamp(1.8rem,3vw,2.75rem)] font-black uppercase leading-none text-white">
          {card.title}
        </h3>
        <p className="mt-4 text-sm font-semibold leading-7 text-white/64">
          {card.description}
        </p>

        <p className="mt-5 break-all rounded-lg border border-white/10 bg-black/30 px-3 py-3 font-mono text-sm font-black text-cyan-100 shadow-[inset_0_0_24px_rgba(0,229,255,0.04)]">
          {card.value}
        </p>

        <div className="mt-auto grid gap-2 pt-7 sm:grid-cols-2">
          {card.type === "email" ? (
            <a
              href={`mailto:${card.value}`}
              aria-label={primaryAriaLabel}
              onClick={() => trackEvent(eventName, {
                action: primaryAction,
                channel: card.key,
                location: "contact_command_center",
              })}
              className="server-join-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              <Mail size={15} aria-hidden="true" />
              {card.primaryLabel}
            </a>
          ) : (
            <a
              href={card.href}
              aria-label={primaryAriaLabel}
              onClick={() => trackEvent(eventName, {
                action: primaryAction,
                channel: card.key,
                location: "contact_command_center",
              })}
              className="server-join-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition sm:col-span-2"
              rel={isExternalHttp ? "noreferrer" : undefined}
              target={isExternalHttp ? "_blank" : undefined}
            >
              {card.primaryLabel}
              {card.type === "teamspeak" ? (
                <Headphones size={15} aria-hidden="true" />
              ) : (
                <ExternalLink size={15} aria-hidden="true" />
              )}
            </a>
          )}

          {card.secondaryLabel ? (
            <button
              type="button"
              aria-label={copyAriaTemplate.replace("{value}", card.value)}
              onClick={onCopy}
              className="server-copy-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              <span aria-live="polite">{copyLabel}</span>
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
