export type AnalyticsEventName =
  | "click_apply_staff"
  | "click_contact"
  | "click_copy_ip"
  | "click_forum"
  | "click_join_discord"
  | "click_play_now"
  | "click_server_details"
  | "click_shop_vip"
  | "click_teamspeak";

export type AnalyticsPayload = Record<string, boolean | null | number | string | undefined>;

type Gtag = (command: "event", eventName: string, payload?: AnalyticsPayload) => void;
type VercelAnalytics = (command: "event", event: { data?: AnalyticsPayload; name: string }) => void;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: Gtag;
    va?: VercelAnalytics;
  }
}

export function trackEvent(name: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.gtag?.("event", name, payload);
    window.va?.("event", { data: payload, name });
    window.dataLayer?.push({ event: name, ...(payload ?? {}) });

    if (process.env.NODE_ENV === "development") {
      console.info("[analytics]", name, payload ?? {});
    }
  } catch {
    // Analytics must never block navigation or gameplay actions.
  }
}
