"use client";

import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { type AnalyticsEventName, type AnalyticsPayload, trackEvent } from "@/lib/analytics";

type TrackedAnchorProps = ComponentProps<"a"> & {
  eventName: AnalyticsEventName;
  eventPayload?: AnalyticsPayload;
};

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: AnalyticsEventName;
  eventPayload?: AnalyticsPayload;
};

function getSafeBlankRel(target: ComponentProps<"a">["target"], rel: ComponentProps<"a">["rel"]) {
  if (target !== "_blank") {
    return rel;
  }

  const tokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));
  tokens.add("noopener");
  tokens.add("noreferrer");

  return Array.from(tokens).join(" ");
}

export function TrackedAnchor({
  eventName,
  eventPayload,
  onClick,
  rel,
  target,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      rel={getSafeBlankRel(target, rel)}
      target={target}
      onClick={(event) => {
        trackEvent(eventName, eventPayload);
        onClick?.(event);
      }}
    />
  );
}

export function TrackedLink({
  eventName,
  eventPayload,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventPayload);
        onClick?.(event);
      }}
    />
  );
}
