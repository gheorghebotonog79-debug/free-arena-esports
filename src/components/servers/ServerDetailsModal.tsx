"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Check,
  Clock3,
  Copy,
  Gamepad2,
  RadioTower,
  Server,
  Tags,
  UsersRound,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics";
import type { LiveServerKey, LiveServerStatusKind } from "@/lib/live-server-targets";

const statusClasses: Record<LiveServerStatusKind, string> = {
  loading: "bg-white/8 text-white/58 border border-white/14",
  online: "bg-arena-green/12 text-arena-green border border-arena-green/30",
  offline: "bg-arena-red/12 text-arena-red border border-arena-red/30",
  pending: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
};

export type ServerDetailsModalServer = {
  key: LiveServerKey;
  displayName: string;
  serverName: string;
  status: LiveServerStatusKind;
  statusLabel: string;
  address: string;
  map: string;
  players: string;
  ping: string;
  lastCheckedAt: string | null;
  connectHref: string;
  connectable: boolean;
  isOnline: boolean;
  translatedTags: readonly string[];
};

type ServerDetailsModalProps = {
  server: ServerDetailsModalServer | null;
  isCopied: boolean;
  isRefreshing: boolean;
  onClose: () => void;
  onCopy: (key: LiveServerKey, address: string) => void | Promise<void>;
};

export function ServerDetailsModal({
  server,
  isCopied,
  isRefreshing,
  onClose,
  onCopy,
}: ServerDetailsModalProps) {
  const t = useTranslations("Servers");
  const locale = useLocale();

  useEffect(() => {
    if (!server) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, server]);

  const inactiveActionLabel = !server
    ? ""
    : server.status === "loading"
      ? t("actions.loading")
      : server.status === "pending"
        ? t("actions.pending")
        : t("actions.offline");
  const fallbackMessage = !server
    ? null
    : server.status === "pending"
      ? t("modal.pendingMessage")
      : server.status === "offline"
        ? t("modal.offlineMessage")
        : null;
  const lastCheckedDate = server?.lastCheckedAt ? new Date(server.lastCheckedAt) : null;
  const lastCheckedLabel = lastCheckedDate && !Number.isNaN(lastCheckedDate.getTime())
    ? new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(lastCheckedDate)
    : t("modal.lastCheckedUnavailable");

  return (
    <AnimatePresence>
      {server ? (
        <motion.div
          aria-labelledby="server-details-title"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/78 px-4 py-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          onMouseDown={onClose}
        >
          <motion.div
            className="premium-card glass-panel animated-border relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-white/12 p-5 shadow-[0_32px_120px_rgba(0,0,0,0.62)] sm:p-6"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(255,0,51,0.08),transparent_58%),radial-gradient(ellipse_at_84%_18%,rgba(0,216,255,0.06),transparent_62%),radial-gradient(ellipse_at_50%_100%,rgba(255,106,0,0.07),transparent_68%)]" aria-hidden="true" />
            <div className="absolute -right-24 -top-24 size-64 rounded-full bg-arena-cyan/12 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-24 -left-20 size-64 rounded-full bg-arena-green/10 blur-3xl" aria-hidden="true" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-arena-green">
                    {t("modal.eyebrow")}
                  </p>
                  <h3
                    id="server-details-title"
                    className="mt-2 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl"
                  >
                    {server.displayName}
                  </h3>
                  <p className="mt-2 break-words text-sm font-semibold text-white/58">
                    {server.serverName}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={`live-badge inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${server.isOnline ? "live-pulse status-active" : ""} ${statusClasses[server.status]}`}>
                    {server.statusLabel}
                  </span>
                  <button
                    type="button"
                    className="button-ghost grid size-10 place-items-center rounded-lg border border-white/12 bg-white/[0.055] text-white/70 transition hover:border-arena-red/50 hover:bg-arena-red/10 hover:text-white"
                    aria-label={t("actions.closeDetails")}
                    onClick={onClose}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/38">
                    <Activity size={16} className={server.isOnline ? "text-arena-green" : "text-arena-gold"} aria-hidden="true" />
                    {t("modal.statusSummaryLabel")}
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-white/72">
                    {t(`modal.summary.${server.status}`, {
                      server: server.displayName,
                    })}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/24 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-white/38">
                    <Clock3 size={15} className="text-arena-cyan" aria-hidden="true" />
                    {t("modal.lastChecked")}
                  </div>
                  <p className="mt-1 font-mono text-sm font-bold text-white">
                    {lastCheckedLabel}
                  </p>
                </div>
              </div>

              {isRefreshing ? (
                <div className="mt-3 rounded-lg border border-arena-cyan/20 bg-arena-cyan/10 px-4 py-3 text-sm font-semibold text-arena-cyan">
                  {t("modal.refreshingHint")}
                </div>
              ) : null}

              {fallbackMessage ? (
                <div className="mt-5 rounded-lg border border-arena-gold/20 bg-arena-gold/10 px-4 py-3 text-sm font-semibold text-arena-gold">
                  {fallbackMessage}
                </div>
              ) : null}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/38">
                    <Server size={16} className="text-arena-cyan" aria-hidden="true" />
                    {t("labels.host")}
                  </div>
                  <p className="mt-3 break-all font-mono text-sm font-bold text-white sm:text-base">
                    {server.address}
                  </p>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/38">
                    <Gamepad2 size={16} className="text-arena-green" aria-hidden="true" />
                    {t("labels.map")}
                  </div>
                  <p className="mt-3 line-clamp-2 text-base font-black uppercase leading-tight text-white">
                    {server.map}
                  </p>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/38">
                    <UsersRound size={16} className="text-arena-cyan" aria-hidden="true" />
                    {t("labels.players")}
                  </div>
                  <p className="mt-3 font-display text-3xl font-black text-white">
                    {server.players}
                  </p>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/38">
                    <RadioTower size={16} className="text-arena-red" aria-hidden="true" />
                    {t("labels.ping")}
                  </div>
                  <p className="mt-3 font-display text-3xl font-black text-white">
                    {server.ping}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-black/24 p-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/38">
                  <Tags size={16} className="text-arena-gold" aria-hidden="true" />
                  {t("labels.tags")}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {server.translatedTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.055] px-2.5 py-1 text-xs font-bold text-white/68"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("click_copy_ip", { location: "server_details_modal", server: server.key });
                    void onCopy(server.key, server.address);
                  }}
                  className="button-ghost inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-xl transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
                  aria-label={t("actions.copyIpFor", {
                    server: server.displayName,
                  })}
                >
                  {isCopied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                  {isCopied ? t("actions.copied") : t("actions.copyIp")}
                </button>

                {server.connectable && server.isOnline ? (
                  <a
                    href={server.connectHref}
                    className="button-glow inline-flex w-full items-center justify-center gap-2 rounded-lg bg-arena-green px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                    onClick={() => trackEvent("click_play_now", { location: "server_details_modal", server: server.key })}
                    aria-label={t("actions.connectTo", {
                      server: server.displayName,
                    })}
                  >
                    {t("actions.connect")}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-white/12 bg-white/[0.045] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white/42"
                  >
                    {inactiveActionLabel}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
