export const adminRoleNames = [
  "helper",
  "moderator",
  "admin",
  "head_admin",
  "co_owner",
] as const;

export type AdminRoleName = (typeof adminRoleNames)[number];

export type AdminPermission =
  | "*"
  | "audit:read"
  | "news:*"
  | "news:read"
  | "news:write"
  | "players:*"
  | "players:moderate"
  | "servers:*"
  | "servers:read"
  | "servers:write"
  | "settings:read"
  | "settings:write"
  | "tickets:*"
  | "tickets:read"
  | "tickets:moderate"
  | "tournaments:*"
  | "tournaments:read"
  | "tournaments:write"
  | "vip:*"
  | "vip:read"
  | "vip:write";

export type AdminRoleDefinition = {
  name: AdminRoleName;
  priority: number;
  permissions: readonly AdminPermission[];
};

export const adminRoleDefinitions = [
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
] as const satisfies readonly AdminRoleDefinition[];

function matchesWildcardPermission(
  ownedPermission: AdminPermission,
  requiredPermission: AdminPermission,
) {
  if (!ownedPermission.endsWith(":*")) {
    return false;
  }

  const namespace = ownedPermission.slice(0, -1);
  return requiredPermission.startsWith(namespace);
}

export function hasAdminPermission(
  permissions: readonly string[],
  requiredPermission: AdminPermission,
) {
  return permissions.some((permission) => {
    if (permission === "*" || permission === requiredPermission) {
      return true;
    }

    return matchesWildcardPermission(permission as AdminPermission, requiredPermission);
  });
}

export function getAdminRoleDefinition(roleName: string) {
  return adminRoleDefinitions.find((role) => role.name === roleName) ?? null;
}
