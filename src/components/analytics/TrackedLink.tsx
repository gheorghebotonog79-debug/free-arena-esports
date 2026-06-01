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

export function TrackedAnchor({
  eventName,
  eventPayload,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
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
