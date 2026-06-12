import type { ForumStatusResponse, ForumTopic } from "@/lib/forum-status";

const DEFAULT_FORUM_BASE_URL = "https://free-arena.ro";
const FORUM_TIMEOUT_MS = 7_000;
const TOPIC_LIMIT = 4;

type PhpBbForumConfig = {
  baseUrl: string;
  feedUrl: string;
};

function cleanEnvValue(value: string | undefined, fallback = "") {
  return (value || fallback).replace(/^\uFEFF/, "").trim();
}

function getForumConfig(): PhpBbForumConfig {
  const baseUrl = cleanEnvValue(process.env.FORUM_BASE_URL, DEFAULT_FORUM_BASE_URL).replace(/\/+$/, "");

  return {
    baseUrl,
    feedUrl: cleanEnvValue(process.env.FORUM_FEED_URL, `${baseUrl}/feed.php?mode=topics`),
  };
}

function decodeHtmlEntities(value: string) {
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: "\"",
  };

  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity.startsWith("#x")) {
      const codePoint = Number.parseInt(entity.slice(2), 16);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    if (entity.startsWith("#")) {
      const codePoint = Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    return named[entity] ?? match;
  });
}

function normalizeText(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  return decodeHtmlEntities(value)
    .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/u, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim() || undefined;
}

function readXmlTag(block: string, tagName: string) {
  const match = block.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return normalizeText(match?.[1]);
}

function readXmlAuthor(block: string) {
  const authorBlock = block.match(/<author(?:\s[^>]*)?>([\s\S]*?)<\/author>/i)?.[1];
  return authorBlock ? readXmlTag(authorBlock, "name") : undefined;
}

function readXmlHref(block: string) {
  return block.match(/<link\b[^>]*href="([^"]+)"/i)?.[1];
}

function normalizeForumUrl(value: string | undefined, baseUrl: string) {
  if (!value) {
    return baseUrl;
  }

  try {
    const url = new URL(decodeHtmlEntities(value), baseUrl);
    url.searchParams.delete("sid");
    return url.href;
  } catch {
    return baseUrl;
  }
}

function readTopicId(url: string, fallback: string) {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get("t") ?? parsed.searchParams.get("p") ?? fallback;
  } catch {
    return fallback;
  }
}

function parseAtomFeed(xml: string, baseUrl: string): ForumTopic[] {
  return [...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/gi)]
    .map((match, index): ForumTopic | null => {
      const entry = match[1] ?? "";
      const title = readXmlTag(entry, "title");

      if (!title) {
        return null;
      }

      const url = normalizeForumUrl(readXmlHref(entry), baseUrl);

      return {
        id: readTopicId(url, readXmlTag(entry, "id") ?? String(index + 1)),
        title,
        url,
        authorName: readXmlAuthor(entry),
        lastPostAt: readXmlTag(entry, "updated") ?? readXmlTag(entry, "published"),
      };
    })
    .filter((topic): topic is ForumTopic => topic !== null)
    .slice(0, TOPIC_LIMIT);
}

function readTotal(label: string, text: string) {
  const match = text.match(new RegExp(`${label}\\s+([0-9.,]+)`, "i"));

  if (!match?.[1]) {
    return undefined;
  }

  const value = Number(match[1].replace(/[.,]/g, ""));
  return Number.isFinite(value) ? value : undefined;
}

function parseForumStats(html: string) {
  const text = normalizeText(html) ?? "";

  return {
    membersTotal: readTotal("Total members", text),
    postsTotal: readTotal("Total posts", text),
    topicsTotal: readTotal("Total topics", text),
  };
}

async function fetchForumText(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FORUM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/atom+xml, application/xml, text/html;q=0.9",
        "User-Agent": "FREE-ARENA play.free-arena.ro forum monitor",
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

    return response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function fallbackForumStatus(
  message: ForumStatusResponse["message"],
  status: ForumStatusResponse["status"] = "offline",
): ForumStatusResponse {
  return {
    status,
    ok: false,
    forumUrl: getForumConfig().baseUrl,
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

  try {
    const [feedResult, indexResult] = await Promise.allSettled([
      fetchForumText(config.feedUrl),
      fetchForumText(config.baseUrl),
    ]);

    if (feedResult.status === "rejected" && indexResult.status === "rejected") {
      return fallbackForumStatus(normalizeError(feedResult.reason));
    }

    const latestTopics = feedResult.status === "fulfilled"
      ? parseAtomFeed(feedResult.value, config.baseUrl)
      : [];
    const stats = indexResult.status === "fulfilled" ? parseForumStats(indexResult.value) : {};
    const ok = latestTopics.length > 0 || Object.values(stats).some((value) => typeof value === "number");
    const status = feedResult.status === "fulfilled" && indexResult.status === "fulfilled"
      ? "online"
      : "degraded";

    return {
      status,
      ok,
      forumUrl: config.baseUrl,
      ...stats,
      latestTopics,
      checkedAt: new Date().toISOString(),
      message: status === "online" ? undefined : "api_failed",
    };
  } catch (error) {
    return fallbackForumStatus(normalizeError(error));
  }
}
