import type { Metadata } from "next";
import { Zap } from "lucide-react";
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
  title: "VIP",
};

export default async function AdminVipPage() {
  const access = await requireAdminPageAccess("vip:read");

  if (!access.allowed) {
    return <AdminAccessDenied requiredPermission="vip:read" session={access.session} />;
  }

  const packages = await db.vipPackage.findMany({
    orderBy: [{ enabled: "desc" }, { price: "asc" }, { name: "asc" }],
  });
  const canWrite = hasAdminPermission(access.session.user.permissions, "vip:write");

  return (
    <AdminShell
      active="vip"
      description="Pachete VIP reale din baza de date. Granturile si integrarea cu player accounts vin dupa autentificarea conturilor."
      session={access.session}
      title="VIP"
    >
      <div className="grid gap-5">
        <AdminPanel icon={Zap} title="Pachete VIP">
          {packages.length > 0 ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {packages.map((vipPackage) => (
                <article
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  key={vipPackage.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-base font-black uppercase text-white">
                        {vipPackage.name}
                      </h2>
                      <p className="mt-2 text-sm text-zinc-400">
                        {vipPackage.durationDays} zile / {String(vipPackage.price)} RON
                      </p>
                    </div>
                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em]",
                        vipPackage.enabled
                          ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-100"
                          : "border-zinc-300/15 bg-zinc-500/10 text-zinc-300",
                      ].join(" ")}
                    >
                      {vipPackage.enabled ? "enabled" : "disabled"}
                    </span>
                  </div>
                  <pre className="mt-4 max-h-44 overflow-auto rounded-2xl border border-white/10 bg-black/35 p-3 text-xs leading-5 text-zinc-400">
                    {JSON.stringify(vipPackage.perks, null, 2)}
                  </pre>
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Nu exista pachete VIP in baza de date. Nu am creat pachete fake." />
          )}
        </AdminPanel>

        {canWrite ? (
          <AdminPanel icon={Zap} title="Adauga pachet VIP">
            <AdminApiForm
              endpoint="/api/admin/vip"
              fields={[
                { label: "Nume", name: "name", placeholder: "VIP Gold", required: true, type: "text" },
                { defaultValue: 30, label: "Durata zile", min: 1, name: "durationDays", required: true, type: "number" },
                { defaultValue: "0", label: "Pret RON", min: 0, name: "price", required: true, step: "0.01", type: "number" },
                { defaultValue: true, label: "Enabled", name: "enabled", type: "checkbox" },
                {
                  defaultValue: "{\n  \"benefits\": []\n}",
                  helper: "JSON valid cu perk-urile pachetului.",
                  label: "Perks JSON",
                  name: "perks",
                  required: true,
                  rows: 8,
                  type: "json",
                },
              ]}
              submitLabel="Creeaza pachet"
              successMessage="Pachetul VIP a fost creat."
            />
          </AdminPanel>
        ) : null}
      </div>
    </AdminShell>
  );
}
