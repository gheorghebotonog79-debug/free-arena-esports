import type { ForumStatusResponse, ForumTopic } from "@/lib/forum-status";

const DEFAULT_FORUM_BASE_URL = "https://free-arena.ro";
const DEFAULT_FORUM_API_URL = "https://free-arena.ro/api/index.php?";
const FORUM_TIMEOUT_MS = 7_000;
const TOPIC_LIMIT = 4;

type ForumConfig = {
  baseUrl: string;
  apiUrl: string;
  apiKey: string;
};

type IpsPayload = Record<string, unknown> | unknown[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (isRecord(value)) {
    const localized = value.ro ?? value.en ?? value.default ?? value.value;
    return readString(localized);
  }

  return undefined;
}

function readNumber(value: unknown): number | undefined {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function readIdentifier(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return readString(value);
}

function getForumConfig(): ForumConfig | null {
  const apiKey = cleanEnvValue(process.env.FORUM_API_KEY);

  if (!apiKey) {
    return null;
  }

  return {
    baseUrl: cleanEnvValue(process.env.FORUM_BASE_URL, DEFAULT_FORUM_BASE_URL).replace(/\/+$/, ""),
    apiUrl: cleanEnvValue(process.env.FORUM_API_URL, DEFAULT_FORUM_API_URL),
    apiKey,
  };
}

function cleanEnvValue(value: string | undefined, fallback = "") {
  return (value || fallback).replace(/^\uFEFF/, "").trim();
}

function buildIpsUrl(config: ForumConfig, route: string, params: Record<string, string> = {}) {
  const normalizedRoute = route.replace(/^\/+/, "");
  const apiUrl = config.apiUrl.trim();
  const endpoint = apiUrl.includes("index.php?")
    ? `${apiUrl.replace(/\?\/?$/, "?/")}${normalizedRoute}`
    : `${apiUrl.replace(/\/+$/, "")}/${normalizedRoute}`;
  const query = new URLSearchParams({
    key: config.apiKey,
    ...params,
  });

  return `${endpoint}${endpoint.includes("?") ? "&" : "?"}${query.toString()}`;
}

async function fetchIpsEndpoint(
  config: ForumConfig,
  route: string,
  params?: Record<string, string>,
): Promise<IpsPayload> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FORUM_TIMEOUT_MS);
  const basicAuth = Buffer.from(`${config.apiKey}:`).toString("base64");

  try {
    const response = await fetch(buildIpsUrl(config, route, params), {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      signal: controller.signal,
    });

    if (response.status === 401 || response.status === 403) {
      throw new Error("permission_denied");
    }

    if (response.status === 429) {
      throw new Error("rate_limited");
    }

    if (!response.ok) {
      throw new Error("api_failed");
    }

    return (await response.json()) as IpsPayload;
  } finally {
    clearTimeout(timeout);
  }
}

function extractItems(payload: IpsPayload): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  const candidates = [
    payload.results,
    payload.items,
    payload.data,
    payload.topics,
    payload.posts,
    payload.members,
  ];

  return candidates.find(Array.isArray) ?? [];
}

function extractTotal(payload: IpsPayload): number | undefined {
  if (Array.isArray(payload)) {
    return payload.length;
  }

  const pagination = isRecord(payload.pagination) ? payload.pagination : null;

  return (
    readNumber(payload.totalResults) ??
    readNumber(payload.total) ??
    readNumber(payload.count) ??
    readNumber(payload.resultsCount) ??
    readNumber(pagination?.total)
  );
}

function readNestedString(value: unknown, path: string[]): string | undefined {
  let current = value;

  for (const part of path) {
    if (!isRecord(current)) {
      return undefined;
    }

    current = current[part];
  }

  return readString(current);
}

function normalizeTopic(topic: unknown, baseUrl: string): ForumTopic | null {
  if (!isRecord(topic)) {
    return null;
  }

  const id = readIdentifier(topic.id) ?? readIdentifier(topic.tid) ?? readIdentifier(topic.topic_id);
  const title = readString(topic.title) ?? readString(topic.name);

  if (!id || !title) {
    return null;
  }

  const url =
    readString(topic.url) ??
    readString(topic.link) ??
    readString(topic.href) ??
    `${baseUrl}/topic/${encodeURIComponent(id)}`;

  return {
    id,
    title,
    url,
    authorName:
      readNestedString(topic.author, ["name"]) ??
      readNestedString(topic.startedBy, ["name"]) ??
      readNestedString(topic.lastPoster, ["name"]) ??
      readNestedString(topic.lastPost, ["author", "name"]) ??
      readNestedString(topic.firstPost, ["author", "name"]) ??
      readString(topic.authorName),
    replies:
      readNumber(topic.replies) ??
      readNumber(topic.posts) ??
      readNumber(topic.comments) ??
      readNumber(topic.commentCount),
    views: readNumber(topic.views) ?? readNumber(topic.viewsCount),
    lastPostAt:
      readString(topic.lastPost) ??
      readNestedString(topic.lastPost, ["date"]) ??
      readNestedString(topic.firstPost, ["date"]) ??
      readString(topic.last_post) ??
      readString(topic.updated) ??
      readString(topic.date),
  };
}

function fallbackForumStatus(
  message: ForumStatusResponse["message"],
  status: ForumStatusResponse["status"] = "offline",
): ForumStatusResponse {
  return {
    status,
    ok: false,
    forumUrl: cleanEnvValue(process.env.FORUM_BASE_URL, DEFAULT_FORUM_BASE_URL),
    latestTopics: [],
    checkedAt: new Date().toISOString(),
    message,
  };
}

function normalizeError(error: unknown): ForumStatusResponse["message"] {
  if (error instanceof Error) {
    if (error.message === "permission_denied" || error.message === "rate_limited") {
      return error.message;
    }
  }

  return "api_failed";
}

export async function queryForumStatus(): Promise<ForumStatusResponse> {
  const config = getForumConfig();

  if (!config) {
    return fallbackForumStatus("missing_config", "missing_config");
  }

  try {
    const topicsPayload = await fetchIpsEndpoint(config, "forums/topics", {
      perPage: String(TOPIC_LIMIT),
    });
    const [postsResult, membersResult] = await Promise.allSettled([
      fetchIpsEndpoint(config, "forums/posts", {
        perPage: "1",
      }),
      fetchIpsEndpoint(config, "core/members", {
        perPage: "1",
      }),
    ]);
    const fulfilledPayloads = [postsResult, membersResult]
      .filter((result): result is PromiseFulfilledResult<IpsPayload> => result.status === "fulfilled")
      .map((result) => result.value);
    const postsPayload = postsResult.status === "fulfilled" ? postsResult.value : undefined;
    const membersPayload = membersResult.status === "fulfilled" ? membersResult.value : undefined;
    const latestTopics = extractItems(topicsPayload)
      .map((topic) => normalizeTopic(topic, config.baseUrl))
      .filter((topic): topic is ForumTopic => topic !== null)
      .slice(0, TOPIC_LIMIT);

    return {
      status: fulfilledPayloads.length === 2 ? "online" : "degraded",
      ok: latestTopics.length > 0 || fulfilledPayloads.length > 0,
      forumUrl: config.baseUrl,
      membersTotal: membersPayload ? extractTotal(membersPayload) : undefined,
      topicsTotal: extractTotal(topicsPayload),
      postsTotal: postsPayload ? extractTotal(postsPayload) : undefined,
      latestTopics,
      checkedAt: new Date().toISOString(),
      message: fulfilledPayloads.length === 2 ? undefined : "api_failed",
    };
  } catch (error) {
    return fallbackForumStatus(normalizeError(error));
  }
}
