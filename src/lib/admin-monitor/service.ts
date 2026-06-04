import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { fetchRsuPlayedTimeMinutes } from "@/lib/admin-monitor/rsu";
import {
  ADMIN_MONITOR_LIMITS,
  calculateDailyScore,
  getCommandActionPoints,
  getMonthRange,
  getRewardTier,
  getUtcDateOnly,
  isUpgradeEligible,
  type ValidatedAdminMonitorEvent,
} from "@/lib/admin-monitor/scoring";

const SESSION_CONTINUATION_WINDOW_MS = 45 * 60 * 1000;

function isUniqueConstraintError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

async function ensureDailyScore(input: {
  adminSteamId: string;
  date: Date;
  serverKey: string;
}) {
  const existing = await db.adminMonitorDailyScore.findUnique({
    where: {
      serverKey_adminSteamId_date: input,
    },
  });

  if (existing) {
    return existing;
  }

  try {
    return await db.adminMonitorDailyScore.create({
      data: {
        adminSteamId: input.adminSteamId,
        date: input.date,
        serverKey: input.serverKey,
      },
    });
  } catch (error) {
    if (!isUniqueConstraintError(error)) {
      throw error;
    }

    return db.adminMonitorDailyScore.findUniqueOrThrow({
      where: {
        serverKey_adminSteamId_date: input,
      },
    });
  }
}

async function saveDailyScore(score: Awaited<ReturnType<typeof ensureDailyScore>>, data: {
  actionPoints?: number;
  minutesOnline?: number;
  penaltyPoints?: number;
  recruitPoints?: number;
}) {
  const calculated = calculateDailyScore({
    actionPoints: data.actionPoints ?? score.actionPoints,
    minutesOnline: data.minutesOnline ?? score.minutesOnline,
    penaltyPoints: data.penaltyPoints ?? score.penaltyPoints,
    recruitPoints: data.recruitPoints ?? score.recruitPoints,
  });

  return db.adminMonitorDailyScore.update({
    data: calculated,
    where: {
      id: score.id,
    },
  });
}

async function recordHeartbeatSession(input: {
  adminName: string;
  adminSteamId: string;
  minutes: number;
  occurredAt: Date;
  serverKey: string;
}) {
  const openSession = await db.adminMonitorSession.findFirst({
    orderBy: {
      lastHeartbeatAt: "desc",
    },
    where: {
      adminSteamId: input.adminSteamId,
      endedAt: null,
      serverKey: input.serverKey,
    },
  });

  if (
    openSession &&
    Math.abs(input.occurredAt.getTime() - openSession.lastHeartbeatAt.getTime()) <=
      SESSION_CONTINUATION_WINDOW_MS
  ) {
    return db.adminMonitorSession.update({
      data: {
        adminName: input.adminName,
        lastHeartbeatAt: input.occurredAt,
        minutesOnline: Math.min(
          openSession.minutesOnline + input.minutes,
          ADMIN_MONITOR_LIMITS.minutesPerDay,
        ),
      },
      where: {
        id: openSession.id,
      },
    });
  }

  if (openSession) {
    await db.adminMonitorSession.update({
      data: {
        endedAt: openSession.lastHeartbeatAt,
      },
      where: {
        id: openSession.id,
      },
    });
  }

  return db.adminMonitorSession.create({
    data: {
      adminName: input.adminName,
      adminSteamId: input.adminSteamId,
      lastHeartbeatAt: input.occurredAt,
      minutesOnline: input.minutes,
      serverKey: input.serverKey,
      startedAt: input.occurredAt,
    },
  });
}

async function applyHeartbeat(input: ValidatedAdminMonitorEvent) {
  const minutes = input.minutes ?? 0;
  const date = getUtcDateOnly(input.occurredAt);
  const score = await ensureDailyScore({
    adminSteamId: input.adminSteamId,
    date,
    serverKey: input.serverKey,
  });

  await recordHeartbeatSession({
    adminName: input.adminName,
    adminSteamId: input.adminSteamId,
    minutes,
    occurredAt: input.occurredAt,
    serverKey: input.serverKey,
  });

  return saveDailyScore(score, {
    minutesOnline: Math.min(score.minutesOnline + minutes, ADMIN_MONITOR_LIMITS.minutesPerDay),
  });
}

async function applyAdminAction(input: ValidatedAdminMonitorEvent) {
  const actionPoints = getCommandActionPoints(input.command);
  const date = getUtcDateOnly(input.occurredAt);
  const score = await ensureDailyScore({
    adminSteamId: input.adminSteamId,
    date,
    serverKey: input.serverKey,
  });

  if (actionPoints <= 0) {
    return score;
  }

  return saveDailyScore(score, {
    actionPoints: Math.min(
      score.actionPoints + actionPoints,
      ADMIN_MONITOR_LIMITS.actionPointsPerDay,
    ),
  });
}

async function getMonthlyRecruitPoints(input: {
  adminSteamId: string;
  date: Date;
  serverKey: string;
}) {
  const range = getMonthRange(input.date);
  const aggregate = await db.adminMonitorDailyScore.aggregate({
    _sum: {
      recruitPoints: true,
    },
    where: {
      adminSteamId: input.adminSteamId,
      date: {
        gte: range.start,
        lt: range.end,
      },
      serverKey: input.serverKey,
    },
  });

  return aggregate._sum.recruitPoints ?? 0;
}

async function applyRecruitPoints(input: {
  adminSteamId: string;
  occurredAt: Date;
  serverKey: string;
}) {
  const existingMonthlyPoints = await getMonthlyRecruitPoints({
    adminSteamId: input.adminSteamId,
    date: input.occurredAt,
    serverKey: input.serverKey,
  });
  const availablePoints = Math.max(
    ADMIN_MONITOR_LIMITS.recruitPointsPerMonth - existingMonthlyPoints,
    0,
  );
  const pointsToAdd = Math.min(ADMIN_MONITOR_LIMITS.recruitPoints, availablePoints);

  if (pointsToAdd <= 0) {
    return 0;
  }

  const score = await ensureDailyScore({
    adminSteamId: input.adminSteamId,
    date: getUtcDateOnly(input.occurredAt),
    serverKey: input.serverKey,
  });

  await saveDailyScore(score, {
    recruitPoints: score.recruitPoints + pointsToAdd,
  });

  return pointsToAdd;
}

async function createRecruitIfMissing(input: ValidatedAdminMonitorEvent) {
  if (!input.targetSteamId || !input.targetName) {
    return null;
  }

  const where = {
    serverKey_targetSteamId: {
      serverKey: input.serverKey,
      targetSteamId: input.targetSteamId,
    },
  };
  const existing = await db.adminMonitorRecruit.findUnique({ where });

  if (existing) {
    return {
      created: false,
      recruit: existing,
    };
  }

  const initialPlayedTime = await fetchRsuPlayedTimeMinutes({
    playerName: input.targetName,
    steamId: input.targetSteamId,
  });
  const isExistingPlayer = initialPlayedTime !== null
    && initialPlayedTime > ADMIN_MONITOR_LIMITS.recruitMaxInitialPlayedMinutes;

  try {
    const recruit = await db.adminMonitorRecruit.create({
      data: {
        adminName: input.adminName,
        adminSteamId: input.adminSteamId,
        currentPlayedTime: initialPlayedTime,
        initialPlayedTime,
        reportedAt: input.occurredAt,
        rejectedAt: isExistingPlayer ? input.occurredAt : null,
        serverKey: input.serverKey,
        status: isExistingPlayer ? "rejected" : "pending",
        targetName: input.targetName,
        targetSteamId: input.targetSteamId,
      },
    });

    return {
      created: true,
      recruit,
    };
  } catch (error) {
    if (!isUniqueConstraintError(error)) {
      throw error;
    }

    return {
      created: false,
      recruit: await db.adminMonitorRecruit.findUniqueOrThrow({ where }),
    };
  }
}

export async function refreshMonthlyReport(input: {
  adminSteamId: string;
  date?: Date;
  serverKey: string;
}) {
  const range = getMonthRange(input.date ?? new Date());
  const [dailyScores, actionsCount, recruitsAccepted, penaltyAggregate, penaltyCount] =
    await Promise.all([
      db.adminMonitorDailyScore.findMany({
        where: {
          adminSteamId: input.adminSteamId,
          date: {
            gte: range.start,
            lt: range.end,
          },
          serverKey: input.serverKey,
        },
      }),
      db.adminMonitorEvent.count({
        where: {
          adminSteamId: input.adminSteamId,
          eventType: "admin_action",
          occurredAt: {
            gte: range.start,
            lt: range.end,
          },
          serverKey: input.serverKey,
        },
      }),
      db.adminMonitorRecruit.count({
        where: {
          acceptedAt: {
            gte: range.start,
            lt: range.end,
          },
          adminSteamId: input.adminSteamId,
          serverKey: input.serverKey,
          status: "accepted",
        },
      }),
      db.adminMonitorPenalty.aggregate({
        _sum: {
          points: true,
        },
        where: {
          adminSteamId: input.adminSteamId,
          createdAt: {
            gte: range.start,
            lt: range.end,
          },
          serverKey: input.serverKey,
        },
      }),
      db.adminMonitorPenalty.count({
        where: {
          adminSteamId: input.adminSteamId,
          createdAt: {
            gte: range.start,
            lt: range.end,
          },
          serverKey: input.serverKey,
        },
      }),
    ]);
  const minutesOnline = dailyScores.reduce((total, score) => total + score.minutesOnline, 0);
  const activeDays = dailyScores.filter((score) => score.activeDayPoints > 0).length;
  const dailyTotalPoints = dailyScores.reduce((total, score) => total + score.totalPoints, 0);
  const penaltyPoints = penaltyAggregate._sum.points ?? 0;
  const totalPoints = dailyTotalPoints - penaltyPoints;
  const rewardTier = getRewardTier(totalPoints);
  const upgradeEligible = isUpgradeEligible({
    activeDays,
    totalPoints,
  });

  return db.adminMonitorMonthlyReport.upsert({
    create: {
      actionsCount,
      activeDays,
      adminSteamId: input.adminSteamId,
      minutesOnline,
      month: range.month,
      penalties: penaltyCount,
      recruitsAccepted,
      rewardTier,
      serverKey: input.serverKey,
      totalPoints,
      upgradeEligible,
    },
    update: {
      actionsCount,
      activeDays,
      minutesOnline,
      penalties: penaltyCount,
      recruitsAccepted,
      rewardTier,
      totalPoints,
      upgradeEligible,
    },
    where: {
      serverKey_adminSteamId_month: {
        adminSteamId: input.adminSteamId,
        month: range.month,
        serverKey: input.serverKey,
      },
    },
  });
}

export async function ingestAdminMonitorEvent(input: ValidatedAdminMonitorEvent) {
  await db.adminMonitorAdmin.upsert({
    create: {
      currentName: input.adminName,
      firstSeenAt: input.occurredAt,
      lastSeenAt: input.occurredAt,
      steamId: input.adminSteamId,
    },
    update: {
      currentName: input.adminName,
      lastSeenAt: input.occurredAt,
    },
    where: {
      steamId: input.adminSteamId,
    },
  });

  const event = await db.adminMonitorEvent.create({
    data: {
      adminName: input.adminName,
      adminSteamId: input.adminSteamId,
      command: input.command,
      eventType: input.eventType,
      metadata: input.metadata,
      occurredAt: input.occurredAt,
      serverKey: input.serverKey,
      targetName: input.targetName,
      targetSteamId: input.targetSteamId,
    },
  });
  const result: {
    dailyScoreId?: string;
    eventId: string;
    recruitCreated?: boolean;
    recruitId?: string;
  } = {
    eventId: event.id,
  };

  if (input.eventType === "heartbeat") {
    const dailyScore = await applyHeartbeat(input);
    result.dailyScoreId = dailyScore.id;
  }

  if (input.eventType === "admin_action") {
    const dailyScore = await applyAdminAction(input);
    result.dailyScoreId = dailyScore.id;
  }

  if (input.eventType === "recruit_reported") {
    const recruitResult = await createRecruitIfMissing(input);

    if (recruitResult) {
      result.recruitCreated = recruitResult.created;
      result.recruitId = recruitResult.recruit.id;
    }
  }

  await refreshMonthlyReport({
    adminSteamId: input.adminSteamId,
    date: input.occurredAt,
    serverKey: input.serverKey,
  });

  return result;
}

export async function verifyPendingRecruits(limit = 25) {
  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 100);
  const now = new Date();
  const recruits = await db.adminMonitorRecruit.findMany({
    orderBy: {
      reportedAt: "asc",
    },
    take: safeLimit,
    where: {
      status: "pending",
    },
  });
  const summary = {
    accepted: 0,
    checked: recruits.length,
    pointsAdded: 0,
    rejected: 0,
    unchanged: 0,
  };

  for (const recruit of recruits) {
    const currentPlayedTime = await fetchRsuPlayedTimeMinutes({
      playerName: recruit.targetName,
      steamId: recruit.targetSteamId,
    });

    if (currentPlayedTime === null) {
      summary.unchanged += 1;
      continue;
    }

    const initialPlayedTime = recruit.initialPlayedTime ?? currentPlayedTime;
    const gainedMinutes = currentPlayedTime - initialPlayedTime;
    const deadline = new Date(
      recruit.reportedAt.getTime() + recruit.windowDays * 24 * 60 * 60 * 1000,
    );

    if (gainedMinutes >= recruit.requiredMinutes) {
      await db.adminMonitorRecruit.update({
        data: {
          acceptedAt: now,
          currentPlayedTime,
          initialPlayedTime,
          status: "accepted",
        },
        where: {
          id: recruit.id,
        },
      });

      const pointsAdded = await applyRecruitPoints({
        adminSteamId: recruit.adminSteamId,
        occurredAt: now,
        serverKey: recruit.serverKey,
      });

      await refreshMonthlyReport({
        adminSteamId: recruit.adminSteamId,
        date: now,
        serverKey: recruit.serverKey,
      });

      summary.accepted += 1;
      summary.pointsAdded += pointsAdded;
      continue;
    }

    if (now >= deadline) {
      await db.adminMonitorRecruit.update({
        data: {
          currentPlayedTime,
          initialPlayedTime,
          rejectedAt: now,
          status: "rejected",
        },
        where: {
          id: recruit.id,
        },
      });
      await refreshMonthlyReport({
        adminSteamId: recruit.adminSteamId,
        date: now,
        serverKey: recruit.serverKey,
      });

      summary.rejected += 1;
      continue;
    }

    await db.adminMonitorRecruit.update({
      data: {
        currentPlayedTime,
        initialPlayedTime,
      },
      where: {
        id: recruit.id,
      },
    });
    summary.unchanged += 1;
  }

  return summary;
}
