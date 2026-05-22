import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import {
  AdminAccessDenied,
  AdminEmptyState,
  AdminPanel,
  AdminShell,
} from "@/components/admin/admin-shell";
import { AdminApiForm, AdminDeleteButton } from "@/components/admin/admin-api-form";
import { requireAdminPageAccess } from "@/lib/admin/guards";
import { hasAdminPermission } from "@/lib/admin/rbac";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Turnee",
};

function formatDate(value: Date | null) {
  if (!value) {
    return "nesetat";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function toDateTimeLocalValue(value: Date | null) {
  return value ? value.toISOString().slice(0, 16) : "";
}

export default async function AdminTournamentsPage() {
  const access = await requireAdminPageAccess("tournaments:read");

  if (!access.allowed) {
    return <AdminAccessDenied requiredPermission="tournaments:read" session={access.session} />;
  }

  const tournaments = await db.tournament.findMany({
    orderBy: [{ startsAt: "desc" }, { updatedAt: "desc" }],
    take: 30,
  });
  const canWrite = hasAdminPermission(access.session.user.permissions, "tournaments:write");

  return (
    <AdminShell
      active="tournaments"
      description="Turnee reale pregatite pentru programare, publicare si audit. Nu afisam competitii fake."
      session={access.session}
      title="Turnee"
    >
      <div className="grid gap-5">
        <AdminPanel icon={Trophy} title="Turnee in baza">
          {tournaments.length > 0 ? (
            <div className="grid gap-3">
              {tournaments.map((tournament) => (
                <article
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  key={tournament.id}
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-zinc-300">
                          {tournament.game}
                        </span>
                        <span className="rounded-full border border-red-300/20 bg-red-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-red-100">
                          {tournament.status}
                        </span>
                      </div>
                      <h2 className="text-base font-black uppercase text-white">
                        {tournament.title}
                      </h2>
                      <p className="mt-1 text-sm text-zinc-400">
                        {tournament.description ?? "Fara descriere publica inca."}
                      </p>
                    </div>
                    <div className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 lg:text-right">
                      <p>start {formatDate(tournament.startsAt)}</p>
                      <p className="mt-1">end {formatDate(tournament.endsAt)}</p>
                      <p className="mt-1">{tournament.prizePool ?? "fara prize pool setat"}</p>
                    </div>
                  </div>

                  {canWrite ? (
                    <details className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.18em] text-zinc-300">
                        Editeaza turneu
                      </summary>
                      <div className="mt-5 space-y-5">
                        <AdminApiForm
                          endpoint={`/api/admin/tournaments/${tournament.id}`}
                          fields={[
                            { defaultValue: tournament.title, label: "Titlu", name: "title", required: true, type: "text" },
                            { defaultValue: tournament.slug, label: "Slug", name: "slug", required: true, type: "text" },
                            { defaultValue: tournament.game, label: "Game", name: "game", required: true, type: "text" },
                            {
                              defaultValue: tournament.status,
                              label: "Status",
                              name: "status",
                              options: [
                                { label: "Draft", value: "draft" },
                                { label: "Scheduled", value: "scheduled" },
                                { label: "Live", value: "live" },
                                { label: "Completed", value: "completed" },
                                { label: "Cancelled", value: "cancelled" },
                              ],
                              required: true,
                              type: "select",
                            },
                            { defaultValue: toDateTimeLocalValue(tournament.startsAt), label: "Starts at", name: "startsAt", type: "datetime-local" },
                            { defaultValue: toDateTimeLocalValue(tournament.endsAt), label: "Ends at", name: "endsAt", type: "datetime-local" },
                            { defaultValue: tournament.prizePool ?? "", label: "Prize pool", name: "prizePool", type: "text" },
                            { defaultValue: tournament.description ?? "", label: "Descriere", name: "description", rows: 5, type: "textarea" },
                          ]}
                          method="PATCH"
                          resetOnSuccess={false}
                          submitLabel="Salveaza turneu"
                          successMessage="Turneul a fost actualizat."
                        />
                        <AdminDeleteButton
                          confirmMessage={`Stergi turneul ${tournament.title}?`}
                          endpoint={`/api/admin/tournaments/${tournament.id}`}
                          successMessage="Turneul a fost sters."
                        />
                      </div>
                    </details>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState message="Nu exista turnee reale in baza de date. Primul CRUD poate fi adaugat in faza urmatoare." />
          )}
        </AdminPanel>

        {canWrite ? (
          <AdminPanel icon={Trophy} title="Adauga turneu">
            <AdminApiForm
              endpoint="/api/admin/tournaments"
              fields={[
                { label: "Titlu", name: "title", required: true, type: "text" },
                { label: "Slug", name: "slug", placeholder: "free-arena-cup-1", required: true, type: "text" },
                { defaultValue: "counterstrike16", label: "Game", name: "game", required: true, type: "text" },
                {
                  defaultValue: "draft",
                  label: "Status",
                  name: "status",
                  options: [
                    { label: "Draft", value: "draft" },
                    { label: "Scheduled", value: "scheduled" },
                    { label: "Live", value: "live" },
                    { label: "Completed", value: "completed" },
                    { label: "Cancelled", value: "cancelled" },
                  ],
                  required: true,
                  type: "select",
                },
                { label: "Starts at", name: "startsAt", type: "datetime-local" },
                { label: "Ends at", name: "endsAt", type: "datetime-local" },
                { label: "Prize pool", name: "prizePool", placeholder: "VIP + premii comunitate", type: "text" },
                { label: "Descriere", name: "description", rows: 5, type: "textarea" },
              ]}
              submitLabel="Creeaza turneu"
              successMessage="Turneul a fost creat."
            />
          </AdminPanel>
        ) : null}
      </div>
    </AdminShell>
  );
}
