import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const CODE_PREFIX = "FA-DIA";
const CODE_TTL_MS = 72 * 60 * 60 * 1000;
const REWARD_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const BRIDGE_CHECK_THROTTLE_MS = 60 * 1000;
const FORUM_TOPIC_URL = "https://free-arena.ro/viewtopic.php?t=41";

const transientBridgeReasons = new Set([
  "code_not_found",
  "not_enough_posts",
  "post_not_approved",
  "topic_not_visible",
]);

type ForumVipInput = {
  ip?: string | null;
  nickname?: string | null;
  serverKey?: string | null;
  steamId?: string | null;
  subnet?: string | null;
};

type BridgeFirstPost = {
  forumId?: number;
  postId?: number;
  postTime?: number;
  topicId?: number;
};

type BridgeResponse = {
  approvedPostCount?: number;
  eligible?: boolean;
  firstPost?: BridgeFirstPost;
  forumUserId?: number;
  ok?: boolean;
  reason?: string;
  username?: string;
};

export type ForumVipValidation =
  | {
      data: {
        ip: string | null;
        nickname: string;
        serverKey: string;
        steamId: string;
        subnet: string | null;
      };
      ok: true;
    }
  | {
      errors: string[];
      ok: false;
    };

export function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isForumVipApiAuthorized(headers: Headers) {
  const configuredKey = process.env.FORUM_VIP_API_KEY?.trim();

  if (!configuredKey) {
    return {
      configured: false,
      ok: false,
    };
  }

  const providedKey = headers.get("x-forum-vip-key")?.trim() ?? "";

  return {
    configured: true,
    ok: safeEquals(providedKey, configuredKey),
  };
}

function normalizeServerKey(value: string | null | undefined) {
  const normalized = (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[.\s]+/g, "-")
    .slice(0, 40);

  if (!/^[a-z0-9_-]+$/.test(normalized)) {
    return null;
  }

  return normalized;
}

function normalizeSteamId(value: string | null | undefined) {
  const normalized = (value ?? "").trim().replace(/\s+/g, "").toUpperCase();

  if (normalized.length < 3 || normalized.length > 80) {
    return null;
  }

  if (!/^[A-Z0-9_:.-]+$/.test(normalized)) {
    return null;
  }

  return normalized;
}

function normalizeNickname(value: string | null | undefined) {
  return (value ?? "").trim().replace(/\s+/g, " ").slice(0, 80) || "Player";
}

function normalizeNetworkValue(value: string | null | undefined) {
  const normalized = (value ?? "").trim().slice(0, 80);

  return normalized || null;
}

function getHashSecret() {
  return (
    process.env.FORUM_VIP_HASH_SECRET?.trim()
    || process.env.AUTH_SECRET?.trim()
    || process.env.FORUM_VIP_API_KEY?.trim()
    || ""
  );
}

function hashNetworkValue(value: string | null) {
  const secret = getHashSecret();

  if (!value || !secret) {
    return null;
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

function isUniqueConstraintError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function buildCode() {
  return `${CODE_PREFIX}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export function validateForumVipInput(input: ForumVipInput): ForumVipValidation {
  const errors: string[] = [];
  const serverKey = normalizeServerKey(input.serverKey);
  const steamId = normalizeSteamId(input.steamId);
  const nickname = normalizeNickname(input.nickname);
  const ip = normalizeNetworkValue(input.ip);
  const subnet = normalizeNetworkValue(input.subnet);

  if (!serverKey) {
    errors.push("serverKey must use lowercase letters, numbers, underscores or hyphens.");
  }

  if (!steamId) {
    errors.push("steamId is required.");
  }

  if (errors.length > 0 || !serverKey || !steamId) {
    return {
      errors,
      ok: false,
    };
  }

  return {
    data: {
      ip,
      nickname,
      serverKey,
      steamId,
      subnet,
    },
    ok: true,
  };
}

async function expireOldRewards(now = new Date()) {
  await db.forumVipReward.updateMany({
    data: {
      status: "expired",
    },
    where: {
      expiresAt: {
        lte: now,
      },
      status: "active",
    },
  });
}

async function createUniqueCode(input: {
  expiresAt: Date;
  ipHash: string | null;
  nickname: string;
  serverKey: string;
  steamId: string;
  subnetHash: string | null;
}) {
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      return await db.forumVipCode.create({
        data: {
          code: buildCode(),
          expiresAt: input.expiresAt,
          ipHash: input.ipHash,
          nickname: input.nickname,
          serverKey: input.serverKey,
          steamId: input.steamId,
          subnetHash: input.subnetHash,
        },
      });
    } catch (error) {
      if (!isUniqueConstraintError(error)) {
        throw error;
      }
    }
  }

  throw new Error("forum_vip_code_generation_failed");
}

export async function issueForumVipCode(input: ForumVipInput) {
  const validated = validateForumVipInput(input);

  if (!validated.ok) {
    return {
      errors: validated.errors,
      ok: false as const,
      status: "validation_error",
    };
  }

  const now = new Date();
  await expireOldRewards(now);

  const existingReward = await db.forumVipReward.findUnique({
    where: {
      steamId: validated.data.steamId,
    },
  });

  if (existingReward) {
    return {
      active: existingReward.status === "active" && existingReward.expiresAt > now,
      expiresAt: existingReward.expiresAt,
      flags: existingReward.flags,
      forumTopicUrl: FORUM_TOPIC_URL,
      ok: true as const,
      reason: existingReward.status,
      steamId: validated.data.steamId,
      status: "already_used",
    };
  }

  const existingCode = await db.forumVipCode.findFirst({
    orderBy: {
      issuedAt: "desc",
    },
    where: {
      expiresAt: {
        gt: now,
      },
      serverKey: validated.data.serverKey,
      status: {
        in: ["issued", "pending_review"],
      },
      steamId: validated.data.steamId,
    },
  });

  if (existingCode) {
    return {
      code: existingCode.code,
      expiresAt: existingCode.expiresAt,
      forumTopicUrl: FORUM_TOPIC_URL,
      ok: true as const,
      reason: existingCode.reason,
      steamId: validated.data.steamId,
      status: existingCode.status,
    };
  }

  const code = await createUniqueCode({
    expiresAt: new Date(now.getTime() + CODE_TTL_MS),
    ipHash: hashNetworkValue(validated.data.ip),
    nickname: validated.data.nickname,
    serverKey: validated.data.serverKey,
    steamId: validated.data.steamId,
    subnetHash: hashNetworkValue(validated.data.subnet),
  });

  return {
    code: code.code,
    expiresAt: code.expiresAt,
    forumTopicUrl: FORUM_TOPIC_URL,
    ok: true as const,
    steamId: validated.data.steamId,
    status: code.status,
  };
}

async function fetchBridgeResult(code: string) {
  const bridgeUrl = process.env.FORUM_VIP_BRIDGE_URL?.trim()
    || "https://free-arena.ro/fa-api/forum-vip/check";
  const bridgeKey = process.env.FORUM_VIP_BRIDGE_API_KEY?.trim();

  if (!bridgeKey) {
    return {
      ok: false as const,
      reason: "forum_bridge_key_not_configured",
    };
  }

  const url = new URL(bridgeUrl);
  url.searchParams.set("code", code);

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "x-fa-forum-api-key": bridgeKey,
    },
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) {
    return {
      ok: false as const,
      reason: `forum_bridge_http_${response.status}`,
    };
  }

  const body = (await response.json()) as BridgeResponse;

  return {
    body,
    ok: true as const,
  };
}

function shouldKeepCodeIssued(reason: string | undefined) {
  return !reason || transientBridgeReasons.has(reason);
}

async function hasFingerprintCollision(input: {
  ipHash: string | null;
  steamId: string;
  subnetHash: string | null;
}) {
  if (!input.ipHash && !input.subnetHash) {
    return false;
  }

  const existing = await db.forumVipReward.findFirst({
    where: {
      OR: [
        ...(input.ipHash ? [{ ipHash: input.ipHash }] : []),
        ...(input.subnetHash ? [{ subnetHash: input.subnetHash }] : []),
      ],
      NOT: {
        steamId: input.steamId,
      },
    },
  });

  return Boolean(existing);
}

export async function verifyForumVipCode(codeValue: string) {
  const codeText = codeValue.trim().toUpperCase();

  if (!/^[A-Z0-9-]{6,64}$/.test(codeText)) {
    return {
      ok: false as const,
      reason: "invalid_code",
      status: "validation_error",
    };
  }

  const now = new Date();
  await expireOldRewards(now);

  const code = await db.forumVipCode.findUnique({
    where: {
      code: codeText,
    },
  });

  if (!code) {
    return {
      ok: true as const,
      reason: "code_not_found",
      status: "not_found",
    };
  }

  if (code.expiresAt <= now && code.status === "issued") {
    const expired = await db.forumVipCode.update({
      data: {
        reason: "code_expired",
        status: "expired",
        verifiedAt: now,
      },
      where: {
        id: code.id,
      },
    });

    return {
      code: expired.code,
      ok: true as const,
      reason: expired.reason,
      status: expired.status,
    };
  }

  if (code.status !== "issued") {
    return {
      code: code.code,
      expiresAt: code.expiresAt,
      ok: true as const,
      reason: code.reason,
      status: code.status,
    };
  }

  const bridge = await fetchBridgeResult(code.code);

  if (!bridge.ok) {
    await db.forumVipCode.update({
      data: {
        reason: bridge.reason,
        verifiedAt: now,
      },
      where: {
        id: code.id,
      },
    });

    return {
      code: code.code,
      ok: true as const,
      reason: bridge.reason,
      status: "issued",
    };
  }

  const body = bridge.body;
  const reason = body.reason ?? (body.eligible ? "eligible" : "not_eligible");

  if (!body.eligible) {
    const status = shouldKeepCodeIssued(reason) ? "issued" : "rejected";
    const updated = await db.forumVipCode.update({
      data: {
        approvedPosts: body.approvedPostCount,
        firstPostForumId: body.firstPost?.forumId,
        firstPostId: body.firstPost?.postId,
        firstPostTopicId: body.firstPost?.topicId,
        forumUserId: body.forumUserId,
        forumUsername: body.username,
        reason,
        status,
        verifiedAt: now,
      },
      where: {
        id: code.id,
      },
    });

    return {
      code: updated.code,
      ok: true as const,
      reason,
      status,
    };
  }

  if (!body.forumUserId || !body.username) {
    await db.forumVipCode.update({
      data: {
        reason: "forum_identity_missing",
        status: "issued",
        verifiedAt: now,
      },
      where: {
        id: code.id,
      },
    });

    return {
      code: code.code,
      ok: true as const,
      reason: "forum_identity_missing",
      status: "issued",
    };
  }

  const [existingSteamReward, existingForumReward] = await Promise.all([
    db.forumVipReward.findUnique({
      where: {
        steamId: code.steamId,
      },
    }),
    db.forumVipReward.findUnique({
      where: {
        forumUserId: body.forumUserId,
      },
    }),
  ]);

  if (existingSteamReward || existingForumReward) {
    const updated = await db.forumVipCode.update({
      data: {
        approvedPosts: body.approvedPostCount,
        firstPostForumId: body.firstPost?.forumId,
        firstPostId: body.firstPost?.postId,
        firstPostTopicId: body.firstPost?.topicId,
        forumUserId: body.forumUserId,
        forumUsername: body.username,
        reason: existingSteamReward ? "already_used_steamid" : "already_used_forum_user",
        status: "rejected",
        verifiedAt: now,
      },
      where: {
        id: code.id,
      },
    });

    return {
      code: updated.code,
      ok: true as const,
      reason: updated.reason,
      status: updated.status,
    };
  }

  if (await hasFingerprintCollision({
    ipHash: code.ipHash,
    steamId: code.steamId,
    subnetHash: code.subnetHash,
  })) {
    const updated = await db.forumVipCode.update({
      data: {
        approvedPosts: body.approvedPostCount,
        firstPostForumId: body.firstPost?.forumId,
        firstPostId: body.firstPost?.postId,
        firstPostTopicId: body.firstPost?.topicId,
        forumUserId: body.forumUserId,
        forumUsername: body.username,
        reason: "duplicate_fingerprint",
        status: "pending_review",
        verifiedAt: now,
      },
      where: {
        id: code.id,
      },
    });

    return {
      code: updated.code,
      ok: true as const,
      reason: updated.reason,
      status: updated.status,
    };
  }

  const reward = await db.forumVipReward.create({
    data: {
      code: code.code,
      expiresAt: new Date(now.getTime() + REWARD_TTL_MS),
      flags: "tx",
      forumUserId: body.forumUserId,
      forumUsername: body.username,
      ipHash: code.ipHash,
      serverKey: code.serverKey,
      steamId: code.steamId,
      subnetHash: code.subnetHash,
    },
  });

  await db.forumVipCode.update({
    data: {
      approvedPosts: body.approvedPostCount,
      firstPostForumId: body.firstPost?.forumId,
      firstPostId: body.firstPost?.postId,
      firstPostTopicId: body.firstPost?.topicId,
      forumUserId: body.forumUserId,
      forumUsername: body.username,
      reason: "eligible",
      redeemedAt: now,
      status: "redeemed",
      verifiedAt: now,
    },
    where: {
      id: code.id,
    },
  });

  return {
    code: code.code,
    expiresAt: reward.expiresAt,
    flags: reward.flags,
    ok: true as const,
    status: "redeemed",
  };
}

export async function getForumVipStatus(input: ForumVipInput) {
  const validated = validateForumVipInput(input);

  if (!validated.ok) {
    return {
      active: false,
      errors: validated.errors,
      ok: false as const,
      status: "validation_error",
    };
  }

  const now = new Date();
  await expireOldRewards(now);

  const code = await db.forumVipCode.findFirst({
    orderBy: {
      issuedAt: "desc",
    },
    where: {
      expiresAt: {
        gt: now,
      },
      serverKey: validated.data.serverKey,
      status: "issued",
      steamId: validated.data.steamId,
    },
  });

  if (
    code
    && (
      !code.verifiedAt
      || now.getTime() - code.verifiedAt.getTime() >= BRIDGE_CHECK_THROTTLE_MS
    )
  ) {
    await verifyForumVipCode(code.code).catch(() => null);
  }

  const reward = await db.forumVipReward.findUnique({
    where: {
      steamId: validated.data.steamId,
    },
  });

  if (reward && reward.status === "active" && reward.expiresAt > now) {
    return {
      active: true,
      expiresAt: reward.expiresAt,
      flags: reward.flags,
      ok: true as const,
      steamId: validated.data.steamId,
      status: reward.status,
    };
  }

  const latestCode = await db.forumVipCode.findFirst({
    orderBy: {
      issuedAt: "desc",
    },
    where: {
      serverKey: validated.data.serverKey,
      steamId: validated.data.steamId,
    },
  });

  return {
    active: false,
    code: latestCode?.code,
    ok: true as const,
    reason: latestCode?.reason,
    steamId: validated.data.steamId,
    status: latestCode?.status ?? "not_found",
  };
}
