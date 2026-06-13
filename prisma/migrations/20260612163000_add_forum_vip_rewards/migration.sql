-- CreateTable
CREATE TABLE "ForumVipCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "steamId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "ipHash" TEXT,
    "subnetHash" TEXT,
    "status" TEXT NOT NULL DEFAULT 'issued',
    "reason" TEXT,
    "forumUserId" INTEGER,
    "forumUsername" TEXT,
    "approvedPosts" INTEGER,
    "firstPostId" INTEGER,
    "firstPostTopicId" INTEGER,
    "firstPostForumId" INTEGER,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "redeemedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumVipCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumVipReward" (
    "id" TEXT NOT NULL,
    "serverKey" TEXT NOT NULL,
    "steamId" TEXT NOT NULL,
    "forumUserId" INTEGER NOT NULL,
    "forumUsername" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "rewardType" TEXT NOT NULL DEFAULT 'vip_diamond',
    "flags" TEXT NOT NULL DEFAULT 'tx',
    "status" TEXT NOT NULL DEFAULT 'active',
    "ipHash" TEXT,
    "subnetHash" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumVipReward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForumVipCode_code_key" ON "ForumVipCode"("code");

-- CreateIndex
CREATE INDEX "ForumVipCode_serverKey_steamId_status_idx" ON "ForumVipCode"("serverKey", "steamId", "status");

-- CreateIndex
CREATE INDEX "ForumVipCode_expiresAt_idx" ON "ForumVipCode"("expiresAt");

-- CreateIndex
CREATE INDEX "ForumVipCode_forumUserId_idx" ON "ForumVipCode"("forumUserId");

-- CreateIndex
CREATE INDEX "ForumVipCode_ipHash_idx" ON "ForumVipCode"("ipHash");

-- CreateIndex
CREATE INDEX "ForumVipCode_subnetHash_idx" ON "ForumVipCode"("subnetHash");

-- CreateIndex
CREATE UNIQUE INDEX "ForumVipReward_steamId_key" ON "ForumVipReward"("steamId");

-- CreateIndex
CREATE UNIQUE INDEX "ForumVipReward_forumUserId_key" ON "ForumVipReward"("forumUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ForumVipReward_code_key" ON "ForumVipReward"("code");

-- CreateIndex
CREATE INDEX "ForumVipReward_serverKey_status_expiresAt_idx" ON "ForumVipReward"("serverKey", "status", "expiresAt");

-- CreateIndex
CREATE INDEX "ForumVipReward_expiresAt_idx" ON "ForumVipReward"("expiresAt");

-- CreateIndex
CREATE INDEX "ForumVipReward_ipHash_idx" ON "ForumVipReward"("ipHash");

-- CreateIndex
CREATE INDEX "ForumVipReward_subnetHash_idx" ON "ForumVipReward"("subnetHash");
