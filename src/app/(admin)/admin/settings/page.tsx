import type { Metadata } from "next";
import { Settings } from "lucide-react";
import {
  AdminAccessDenied,
  AdminEmptyState,
  AdminPanel,
  AdminShell,
} from "@/components/admin/admin-shell";
import { AdminApiForm } from "@/components/admin/admin-api-form";
import { requireAdminPageAccess } from "@/lib/admin/guards";
import { hasAdminPermission } from "@/lib/admin/rbac";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Setari",
};

export default async function AdminSettingsPage() {
  const access = await requireAdminPageAccess("settings:read");

  if (!access.allowed) {
    return <AdminAccessDenied requiredPermission="settings:read" session={access.session} />;
  }

  const settings = await db.systemSetting.findMany({
    orderBy: { key: "asc" },
  });
  const canWrite = hasAdminPermission(access.session.user.permissions, "settings:write");

  return (
    <AdminShell
      active="settings"
      description="Setari operationale salvate in baza de date. Editarea este protejata cu validare si audit."
      session={access.session}
      title="Setari sistem"
    >
      <div className="grid gap-5">
        <AdminPanel icon={Settings} title="System settings">
          {settings.length > 0 ? (
            <div className="grid gap-3">
              {settings.map((setting) => (
                <article
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  key={setting.id}
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-[0.12em] text-white">
                        {setting.key}
                      </h2>
                      <pre className="mt-3 max-h-48 overflow-auto rounded-2xl border border-white/10 bg-black/35 p-3 text-xs leading-5 text-zinc-400">
                        {JSON.stringify(setting.value, null, 2)}
                      </pre>
                    </div>
                    <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      updated {setting.updatedAt.toISOString()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Nu exista setari in baza de date. Ruleaza seed-ul backend dupa configurarea DB." />
          )}
        </AdminPanel>

        {canWrite ? (
          <AdminPanel icon={Settings} title="Adauga setare">
            <AdminApiForm
              endpoint="/api/admin/settings"
              fields={[
                { label: "Key", name: "key", placeholder: "platform.feature.flag", required: true, type: "text" },
                {
                  defaultValue: "{\n  \"enabled\": true\n}",
                  helper: "Valoarea poate fi obiect, array, string, number sau boolean JSON.",
                  label: "Value JSON",
                  name: "value",
                  required: true,
                  rows: 8,
                  type: "json",
                },
              ]}
              submitLabel="Creeaza setare"
              successMessage="Setarea a fost creata."
            />
          </AdminPanel>
        ) : null}
      </div>
    </AdminShell>
  );
}
