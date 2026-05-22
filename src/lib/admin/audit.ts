import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

type WriteAdminAuditLogInput = {
  actorId?: string | null;
  action: string;
  target: string;
  metadata?: Prisma.InputJsonValue;
  ip?: string | null;
};

export async function writeAdminAuditLog({
  actorId,
  action,
  target,
  metadata,
  ip,
}: WriteAdminAuditLogInput) {
  return db.adminAuditLog.create({
    data: {
      actorId,
      action,
      target,
      metadata,
      ip,
    },
  });
}
