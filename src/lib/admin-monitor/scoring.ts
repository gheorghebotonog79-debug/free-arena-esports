import type { Prisma } from "@prisma/client";

export const ADMIN_MONITOR_EVENT_TYPES = [
  "heartbeat",
  "admin_action",
  "recruit_reported",
] as const;

export type AdminMonitorEventType = (typeof ADMIN_MONITOR_EVENT_TYPES)[number];

export type ValidatedAdminMonitorEvent = {
  adminName: string;
  adminSteamId: string;
  command: string | null;
  eventType: AdminMonitorEventType;
  metadata: Prisma.InputJsonValue;
  minutes: number | null;
  occurredAt: Date;
  serverKey: string;
  targetName: string | null;
  targetSteamId: string | null;
};

type ValidationResult =
  | {
      data: ValidatedAdminMonitorEvent;
      ok: true;
    }
  | {
      errors: string[];
      ok: false;
    };

export const ADMIN_MONITOR_LIMITS = {
  activeDayMinimumMinutes: 30,
  actionPointsPerDay: 6,
  heartbeatMinutesPerEvent: 30,
  minutesPerDay: 1440,
  recruitPoints: 10,
  recruitPointsPerMonth: 40,
  timePointsPerDay: 5,
} as const;

const eventTypeSet = new Set<string>(ADMIN_MONITOR_EVENT_TYPES);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(body: Record<string, unknown>, key: string) {
  const value = body[key];

  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(body: Record<string, unknown>, key: string) {
  const value = body[key];

  if (value === undefined || value === null) {
    return null;
  }

  return typeof value === "string" ? value.trim() || null : null;
}

function readDate(body: Record<string, unknown>, key: string, errors: string[]) {
  const value = body[key];

  if (value === undefined || value === null || value === "") {
    return new Date();
  }

  if (typeof value !== "string") {
    errors.push(`${key} must be an ISO date string.`);
    return new Date();
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    errors.push(`${key} must be a valid ISO date string.`);
  }

  return parsed;
}

function readMinutes(body: Record<string, unknown>, errors: string[]) {
  const value = body.minutes;

  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    errors.push("minutes must be a positive number.");
    return null;
  }

  return Math.min(
    Math.floor(parsed),
    ADMIN_MONITOR_LIMITS.heartbeatMinutesPerEvent,
  );
}

export function normalizeSteamId(value: string | null | undefined) {
  const normalized = (value ?? "").trim().replace(/\s+/g, "").toUpperCase();

  if (normalized.length < 3 || normalized.length > 80) {
    return null;
  }

  if (!/^[A-Z0-9_:.-]+$/.test(normalized)) {
    return null;
  }

  return normalized;
}

export function normalizeAdminName(value: string | null | undefined) {
  const normalized = (value ?? "").trim().replace(/\s+/g, " ").slice(0, 80);

  return normalized || null;
}

export function normalizeServerKey(value: string | null | undefined) {
  const normalized = (value ?? "").trim().toLowerCase().slice(0, 40);

  if (!/^[a-z0-9_-]+$/.test(normalized)) {
    return null;
  }

  return normalized;
}

export function normalizeCommand(value: string | null | undefined) {
  const normalized = (value ?? "").trim().replace(/\s+/g, " ").toLowerCase().slice(0, 80);

  return normalized || null;
}

function buildMetadata(body: Record<string, unknown>, minutes: number | null) {
  const metadata = isRecord(body.metadata) ? body.metadata : {};

  return JSON.parse(
    JSON.stringify({
      ...metadata,
      ...(minutes === null ? {} : { minutes }),
    }),
  ) as Prisma.InputJsonValue;
}

export function validateAdminMonitorEventBody(body: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  const serverKey = normalizeServerKey(readString(body, "serverKey"));
  const eventType = readString(body, "eventType");
  const adminSteamId = normalizeSteamId(readString(body, "adminSteamId"));
  const adminName = normalizeAdminName(readString(body, "adminName"));
  const targetSteamId = normalizeSteamId(readOptionalString(body, "targetSteamId"));
  const targetName = normalizeAdminName(readOptionalString(body, "targetName"));
  const command = normalizeCommand(readOptionalString(body, "command"));
  const minutes = readMinutes(body, errors);
  const occurredAt = readDate(body, "occurredAt", errors);

  if (!serverKey) {
    errors.push("serverKey must use lowercase letters, numbers, underscores or hyphens.");
  }

  if (!eventTypeSet.has(eventType)) {
    errors.push(`eventType must be one of: ${ADMIN_MONITOR_EVENT_TYPES.join(", ")}.`);
  }

  if (!adminSteamId) {
    errors.push("adminSteamId is required.");
  }

  if (!adminName) {
    errors.push("adminName is required.");
  }

  if (eventType === "heartbeat" && minutes === null) {
    errors.push("minutes is required for heartbeat events.");
  }

  if (eventType === "admin_action" && !command) {
    errors.push("command is required for admin_action events.");
  }

  if (eventType === "recruit_reported") {
    if (!targetSteamId) {
      errors.push("targetSteamId is required for recruit_reported events.");
    }

    if (!targetName) {
      errors.push("targetName is required for recruit_reported events.");
    }
  }

  if (errors.length > 0 || !serverKey || !adminSteamId || !adminName) {
    return {
      errors,
      ok: false,
    };
  }

  return {
    data: {
      adminName,
      adminSteamId,
      command,
      eventType: eventType as AdminMonitorEventType,
      metadata: buildMetadata(body, minutes),
      minutes,
      occurredAt,
      serverKey,
      targetName,
      targetSteamId,
    },
    ok: true,
  };
}

export function getUtcDateOnly(value: Date) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

export function getMonthKey(value: Date) {
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");

  return `${value.getUTCFullYear()}${month}`;
}

export function getMonthRange(monthOrDate: string | Date) {
  const monthKey = typeof monthOrDate === "string" ? monthOrDate : getMonthKey(monthOrDate);
  const year = Number(monthKey.slice(0, 4));
  const monthIndex = Number(monthKey.slice(4, 6)) - 1;
  const start = new Date(Date.UTC(year, monthIndex, 1));
  const end = new Date(Date.UTC(year, monthIndex + 1, 1));

  return {
    end,
    month: monthKey,
    start,
  };
}

export function getCommandActionPoints(command: string | null) {
  const normalized = normalizeCommand(command);

  if (!normalized) {
    return 0;
  }

  if (normalized.includes("ban")) {
    return 3;
  }

  if (normalized.includes("kick")) {
    return 2;
  }

  if (/(gag|slay|slap|map|vote)/.test(normalized)) {
    return 1;
  }

  return 0;
}

export function calculateDailyScore(input: {
  actionPoints: number;
  minutesOnline: number;
  penaltyPoints: number;
  recruitPoints: number;
}) {
  const minutesOnline = Math.min(Math.max(input.minutesOnline, 0), ADMIN_MONITOR_LIMITS.minutesPerDay);
  const activeDayPoints = minutesOnline >= ADMIN_MONITOR_LIMITS.activeDayMinimumMinutes ? 1 : 0;
  const timePoints = Math.min(
    Math.floor(minutesOnline / ADMIN_MONITOR_LIMITS.activeDayMinimumMinutes),
    ADMIN_MONITOR_LIMITS.timePointsPerDay,
  );
  const actionPoints = Math.min(Math.max(input.actionPoints, 0), ADMIN_MONITOR_LIMITS.actionPointsPerDay);
  const recruitPoints = Math.max(input.recruitPoints, 0);
  const penaltyPoints = Math.max(input.penaltyPoints, 0);

  return {
    actionPoints,
    activeDayPoints,
    minutesOnline,
    penaltyPoints,
    recruitPoints,
    timePoints,
    totalPoints: activeDayPoints + timePoints + actionPoints + recruitPoints - penaltyPoints,
  };
}

export function getRewardTier(totalPoints: number) {
  if (totalPoints >= 140) {
    return "gold";
  }

  if (totalPoints >= 100) {
    return "silver";
  }

  if (totalPoints >= 60) {
    return "bronze";
  }

  return null;
}

export function isUpgradeEligible(input: { activeDays: number; totalPoints: number }) {
  return input.totalPoints >= 120 && input.activeDays >= 14;
}
