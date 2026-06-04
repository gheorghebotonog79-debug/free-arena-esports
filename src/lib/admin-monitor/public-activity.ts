import { db } from "@/lib/db";
import { getMonthKey, getMonthRange } from "@/lib/admin-monitor/scoring";

export type PublicAdminActivitySummary = {
  actionsCount: number;
  activeDays: number;
  adminSteamId: string;
  currentName: string;
  lastSeenAt: Date;
  minutesOnline: number;
  month: string;
  recruitsAccepted: number;
  rewardTier: string | null;
  serverKey: string;
  totalPoints: number;
  upgradeEligible: boolean;
};

export type PublicAdminActivityDetail = {
  actions: Array<{
    command: string | null;
    occurredAt: Date;
    serverKey: string;
  }>;
  admin: {
    currentName: string;
    firstSeenAt: Date;
    lastSeenAt: Date;
    steamId: string;
  };
  dailyScores: Array<{
    actionPoints: number;
    activeDayPoints: number;
    date: Date;
    minutesOnline: number;
    recruitPoints: number;
    serverKey: string;
    timePoints: number;
    totalPoints: number;
  }>;
  monthlyReports: PublicAdminActivitySummary[];
  recruits: Array<{
    reportedAt: Date;
    serverKey: string;
    status: string;
    targetName: string;
  }>;
};

function pickBestReport(reports: PublicAdminActivitySummary[]) {
  return reports.reduce<PublicAdminActivitySummary | null>((best, report) => {
    if (!best || report.totalPoints > best.totalPoints) {
      return report;
    }

    return best;
  }, null);
}

export async function getPublicAdminActivityList(month = getMonthKey(new Date())) {
  const admins = await db.adminMonitorAdmin.findMany({
    orderBy: [
      {
        lastSeenAt: "desc",
      },
      {
        currentName: "asc",
      },
    ],
    take: 100,
  });
  const steamIds = admins.map((admin) => admin.steamId);

  if (steamIds.length === 0) {
    return {
      admins: [],
      month,
      totals: {
        actions: 0,
        admins: 0,
        minutes: 0,
        points: 0,
        recruits: 0,
      },
    };
  }

  const reports = await db.adminMonitorMonthlyReport.findMany({
    where: {
      adminSteamId: {
        in: steamIds,
      },
      month,
    },
  });
  const reportsByAdmin = new Map<string, PublicAdminActivitySummary[]>();

  for (const report of reports) {
    const admin = admins.find((item) => item.steamId === report.adminSteamId);

    if (!admin) {
      continue;
    }

    const item: PublicAdminActivitySummary = {
      actionsCount: report.actionsCount,
      activeDays: report.activeDays,
      adminSteamId: report.adminSteamId,
      currentName: admin.currentName,
      lastSeenAt: admin.lastSeenAt,
      minutesOnline: report.minutesOnline,
      month: report.month,
      recruitsAccepted: report.recruitsAccepted,
      rewardTier: report.rewardTier,
      serverKey: report.serverKey,
      totalPoints: report.totalPoints,
      upgradeEligible: report.upgradeEligible,
    };

    reportsByAdmin.set(report.adminSteamId, [
      ...(reportsByAdmin.get(report.adminSteamId) ?? []),
      item,
    ]);
  }

  const summaries = admins.map((admin) => {
    const best = pickBestReport(reportsByAdmin.get(admin.steamId) ?? []);

    return best ?? {
      actionsCount: 0,
      activeDays: 0,
      adminSteamId: admin.steamId,
      currentName: admin.currentName,
      lastSeenAt: admin.lastSeenAt,
      minutesOnline: 0,
      month,
      recruitsAccepted: 0,
      rewardTier: null,
      serverKey: "global",
      totalPoints: 0,
      upgradeEligible: false,
    };
  }).sort((left, right) => (
    right.totalPoints - left.totalPoints ||
    right.minutesOnline - left.minutesOnline ||
    right.lastSeenAt.getTime() - left.lastSeenAt.getTime()
  ));

  return {
    admins: summaries,
    month,
    totals: {
      actions: summaries.reduce((total, admin) => total + admin.actionsCount, 0),
      admins: summaries.length,
      minutes: summaries.reduce((total, admin) => total + admin.minutesOnline, 0),
      points: summaries.reduce((total, admin) => total + admin.totalPoints, 0),
      recruits: summaries.reduce((total, admin) => total + admin.recruitsAccepted, 0),
    },
  };
}

export async function getPublicAdminActivityDetail(steamId: string) {
  const admin = await db.adminMonitorAdmin.findUnique({
    where: {
      steamId,
    },
  });

  if (!admin) {
    return null;
  }

  const monthRange = getMonthRange(new Date());
  const [monthlyReports, dailyScores, actions, recruits] = await Promise.all([
    db.adminMonitorMonthlyReport.findMany({
      orderBy: [
        {
          month: "desc",
        },
        {
          totalPoints: "desc",
        },
      ],
      take: 12,
      where: {
        adminSteamId: steamId,
      },
    }),
    db.adminMonitorDailyScore.findMany({
      orderBy: {
        date: "asc",
      },
      where: {
        adminSteamId: steamId,
        date: {
          gte: monthRange.start,
          lt: monthRange.end,
        },
      },
    }),
    db.adminMonitorEvent.findMany({
      orderBy: {
        occurredAt: "desc",
      },
      select: {
        command: true,
        occurredAt: true,
        serverKey: true,
      },
      take: 20,
      where: {
        adminSteamId: steamId,
        eventType: "admin_action",
      },
    }),
    db.adminMonitorRecruit.findMany({
      orderBy: {
        reportedAt: "desc",
      },
      select: {
        reportedAt: true,
        serverKey: true,
        status: true,
        targetName: true,
      },
      take: 20,
      where: {
        adminSteamId: steamId,
      },
    }),
  ]);

  return {
    actions,
    admin: {
      currentName: admin.currentName,
      firstSeenAt: admin.firstSeenAt,
      lastSeenAt: admin.lastSeenAt,
      steamId: admin.steamId,
    },
    dailyScores,
    monthlyReports: monthlyReports.map((report) => ({
      actionsCount: report.actionsCount,
      activeDays: report.activeDays,
      adminSteamId: report.adminSteamId,
      currentName: admin.currentName,
      lastSeenAt: admin.lastSeenAt,
      minutesOnline: report.minutesOnline,
      month: report.month,
      recruitsAccepted: report.recruitsAccepted,
      rewardTier: report.rewardTier,
      serverKey: report.serverKey,
      totalPoints: report.totalPoints,
      upgradeEligible: report.upgradeEligible,
    })),
    recruits,
  } satisfies PublicAdminActivityDetail;
}
