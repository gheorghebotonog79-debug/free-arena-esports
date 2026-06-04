-- CreateTable
CREATE TABLE "AdminMonitorAdmin" (
    "id" TEXT NOT NULL,
    "steamId" TEXT NOT NULL,
    "currentName" TEXT NOT NULL,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminMonitorAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMonitorSession" (
    "id" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "adminSteamId" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "lastHeartbeatAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "minutesOnline" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminMonitorSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMonitorEvent" (
    "id" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "adminSteamId" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "targetSteamId" TEXT,
    "targetName" TEXT,
    "command" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminMonitorEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMonitorRecruit" (
    "id" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "adminSteamId" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "targetSteamId" TEXT NOT NULL,
    "targetName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reportedAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "initialPlayedTime" INTEGER,
    "currentPlayedTime" INTEGER,
    "requiredMinutes" INTEGER NOT NULL DEFAULT 60,
    "windowDays" INTEGER NOT NULL DEFAULT 7,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminMonitorRecruit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMonitorDailyScore" (
    "id" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "adminSteamId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "minutesOnline" INTEGER NOT NULL DEFAULT 0,
    "activeDayPoints" INTEGER NOT NULL DEFAULT 0,
    "timePoints" INTEGER NOT NULL DEFAULT 0,
    "actionPoints" INTEGER NOT NULL DEFAULT 0,
    "recruitPoints" INTEGER NOT NULL DEFAULT 0,
    "penaltyPoints" INTEGER NOT NULL DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminMonitorDailyScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMonitorMonthlyReport" (
    "id" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "month" VARCHAR(6) NOT NULL,
    "adminSteamId" TEXT NOT NULL,
    "minutesOnline" INTEGER NOT NULL DEFAULT 0,
    "activeDays" INTEGER NOT NULL DEFAULT 0,
    "actionsCount" INTEGER NOT NULL DEFAULT 0,
    "recruitsAccepted" INTEGER NOT NULL DEFAULT 0,
    "penalties" INTEGER NOT NULL DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "rewardTier" TEXT,
    "upgradeEligible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminMonitorMonthlyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMonitorPenalty" (
    "id" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "adminSteamId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminMonitorPenalty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMonitorReward" (
    "id" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "adminSteamId" TEXT NOT NULL,
    "month" VARCHAR(6) NOT NULL,
    "tier" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminMonitorReward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminMonitorAdmin_steamId_key" ON "AdminMonitorAdmin"("steamId");

-- CreateIndex
CREATE INDEX "AdminMonitorAdmin_lastSeenAt_idx" ON "AdminMonitorAdmin"("lastSeenAt");

-- CreateIndex
CREATE INDEX "AdminMonitorSession_serverKey_adminSteamId_lastHeartbeatAt_idx" ON "AdminMonitorSession"("serverKey", "adminSteamId", "lastHeartbeatAt");

-- CreateIndex
CREATE INDEX "AdminMonitorSession_endedAt_idx" ON "AdminMonitorSession"("endedAt");

-- CreateIndex
CREATE INDEX "AdminMonitorEvent_serverKey_occurredAt_idx" ON "AdminMonitorEvent"("serverKey", "occurredAt");

-- CreateIndex
CREATE INDEX "AdminMonitorEvent_adminSteamId_occurredAt_idx" ON "AdminMonitorEvent"("adminSteamId", "occurredAt");

-- CreateIndex
CREATE INDEX "AdminMonitorEvent_eventType_occurredAt_idx" ON "AdminMonitorEvent"("eventType", "occurredAt");

-- CreateIndex
CREATE INDEX "AdminMonitorEvent_targetSteamId_idx" ON "AdminMonitorEvent"("targetSteamId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminMonitorRecruit_serverKey_targetSteamId_key" ON "AdminMonitorRecruit"("serverKey", "targetSteamId");

-- CreateIndex
CREATE INDEX "AdminMonitorRecruit_serverKey_status_reportedAt_idx" ON "AdminMonitorRecruit"("serverKey", "status", "reportedAt");

-- CreateIndex
CREATE INDEX "AdminMonitorRecruit_adminSteamId_reportedAt_idx" ON "AdminMonitorRecruit"("adminSteamId", "reportedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AdminMonitorDailyScore_serverKey_adminSteamId_date_key" ON "AdminMonitorDailyScore"("serverKey", "adminSteamId", "date");

-- CreateIndex
CREATE INDEX "AdminMonitorDailyScore_date_idx" ON "AdminMonitorDailyScore"("date");

-- CreateIndex
CREATE INDEX "AdminMonitorDailyScore_adminSteamId_date_idx" ON "AdminMonitorDailyScore"("adminSteamId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "AdminMonitorMonthlyReport_serverKey_adminSteamId_month_key" ON "AdminMonitorMonthlyReport"("serverKey", "adminSteamId", "month");

-- CreateIndex
CREATE INDEX "AdminMonitorMonthlyReport_month_totalPoints_idx" ON "AdminMonitorMonthlyReport"("month", "totalPoints");

-- CreateIndex
CREATE INDEX "AdminMonitorMonthlyReport_adminSteamId_month_idx" ON "AdminMonitorMonthlyReport"("adminSteamId", "month");

-- CreateIndex
CREATE INDEX "AdminMonitorPenalty_serverKey_adminSteamId_createdAt_idx" ON "AdminMonitorPenalty"("serverKey", "adminSteamId", "createdAt");

-- CreateIndex
CREATE INDEX "AdminMonitorReward_serverKey_adminSteamId_month_idx" ON "AdminMonitorReward"("serverKey", "adminSteamId", "month");

-- CreateIndex
CREATE INDEX "AdminMonitorReward_status_month_idx" ON "AdminMonitorReward"("status", "month");
