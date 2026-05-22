import type { Metadata } from "next";
import { Activity } from "lucide-react";
import {
  AdminAccessDenied,
  AdminEmptyState,
  AdminPanel,
  AdminShell,
} from "@/components/admin/admin-shell";
import { requireAdminPageAccess } from "@/lib/admin/guards";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Audit",
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default async function AdminAuditPage() {
  const access = await requireAdminPageAccess("audit:read");

  if (!access.allowed) {
    return <AdminAccessDenied requiredPermission="audit:read" session={access.session} />;
  }

  const logs = await db.adminAuditLog.findMany({
    include: {
      actor: {
        select: {
          email: true,
          username: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  return (
    <AdminShell
      active="audit"
      description="Jurnal real pentru actiuni admin. Orice operatie importanta trebuie sa ajunga aici."
      session={access.session}
      title="Audit log"
    >
      <AdminPanel icon={Activity} title="Ultimele evenimente">
        {logs.length > 0 ? (
          <div className="grid gap-3">
            {logs.map((log) => (
              <article className="rounded-2xl border border-white/10 bg-black/25 p-4" key={log.id}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-red-300/20 bg-red-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-red-100">
                        {log.action}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-zinc-300">
                        {log.target}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {log.actor?.username ?? log.actor?.email ?? "system"}
                    </p>
                    {log.metadata ? (
                      <pre className="mt-3 max-h-44 overflow-auto rounded-2xl border border-white/10 bg-black/35 p-3 text-xs leading-5 text-zinc-400">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    ) : null}
                  </div>
                  <div className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 lg:text-right">
                    <p>{formatDate(log.createdAt)}</p>
                    <p className="mt-1">{log.ip ?? "ip unavailable"}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <AdminEmptyState message="Nu exista inca evenimente in audit log." />
        )}
      </AdminPanel>
    </AdminShell>
  );
}
