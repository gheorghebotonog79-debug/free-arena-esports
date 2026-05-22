import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adminRoles = [
  {
    name: "helper",
    priority: 10,
    permissions: ["tickets:read", "news:read", "servers:read"],
  },
  {
    name: "moderator",
    priority: 30,
    permissions: [
      "tickets:read",
      "tickets:moderate",
      "news:read",
      "servers:read",
      "players:moderate",
    ],
  },
  {
    name: "admin",
    priority: 50,
    permissions: [
      "tickets:read",
      "tickets:moderate",
      "news:read",
      "news:write",
      "servers:read",
      "servers:write",
      "tournaments:read",
      "tournaments:write",
      "vip:read",
      "vip:write",
    ],
  },
  {
    name: "head_admin",
    priority: 80,
    permissions: [
      "tickets:*",
      "news:*",
      "servers:*",
      "tournaments:*",
      "vip:*",
      "players:*",
      "audit:read",
      "settings:read",
      "settings:write",
    ],
  },
  {
    name: "co_owner",
    priority: 100,
    permissions: ["*"],
  },
];

const gameServers = [
  {
    name: "CS 1.6",
    game: "counterstrike16",
    host: "cs.free-arena.ro",
    port: 27015,
    featured: true,
    maintenance: false,
    displayOrder: 10,
  },
  {
    name: "Respawn",
    game: "counterstrike16",
    host: "respawn.free-arena.ro",
    port: 27015,
    featured: true,
    maintenance: false,
    displayOrder: 20,
  },
  {
    name: "CS2",
    game: "counterstrike2",
    host: "cs2.free-arena.ro",
    port: 27015,
    featured: true,
    maintenance: false,
    displayOrder: 30,
  },
  {
    name: "Global",
    game: "counterstrike16",
    host: "global.free-arena.ro",
    port: 27015,
    featured: false,
    maintenance: true,
    displayOrder: 40,
  },
];

const systemSettings = [
  {
    key: "platform.locale.default",
    value: { locale: "ro" },
  },
  {
    key: "platform.contact.email",
    value: { email: "contact@free-arena.ro" },
  },
  {
    key: "integrations.discord.status",
    value: { configured: false },
  },
  {
    key: "integrations.steam.status",
    value: { configured: false },
  },
];

async function seedAdminRoles() {
  for (const role of adminRoles) {
    await prisma.adminRole.upsert({
      where: { name: role.name },
      update: {
        permissions: role.permissions,
        priority: role.priority,
      },
      create: role,
    });
  }
}

async function seedGameServers() {
  for (const server of gameServers) {
    await prisma.gameServer.upsert({
      where: {
        host_port: {
          host: server.host,
          port: server.port,
        },
      },
      update: server,
      create: server,
    });
  }
}

async function seedSystemSettings() {
  for (const setting of systemSettings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
}

async function seedFirstAdminFromEnv() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const username = process.env.ADMIN_SEED_USERNAME;
  const passwordHash = process.env.ADMIN_SEED_PASSWORD_HASH;

  if (!email || !username || !passwordHash) {
    console.log("Admin seed skipped: ADMIN_SEED_EMAIL, ADMIN_SEED_USERNAME, and ADMIN_SEED_PASSWORD_HASH are required.");
    return;
  }

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      username,
      passwordHash,
      role: "co_owner",
      isActive: true,
    },
    create: {
      email,
      username,
      passwordHash,
      role: "co_owner",
      isActive: true,
    },
  });

  await prisma.adminAuditLog.create({
    data: {
      actorId: admin.id,
      action: "admin.seed",
      target: "User",
      metadata: { email, role: "co_owner" },
    },
  });
}

async function main() {
  await seedAdminRoles();
  await seedGameServers();
  await seedSystemSettings();
  await seedFirstAdminFromEnv();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
