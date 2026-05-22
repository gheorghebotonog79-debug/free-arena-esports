import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CircleDashed, Database, KeyRound, ShieldCheck, UserPlus } from "lucide-react";
import type { SetupReadinessCheck } from "@/lib/admin/setup-readiness";
import { getSetupReadiness } from "@/lib/admin/setup-readiness";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Setup",
};

const statusStyles = {
  missing: "border-red-300/25 bg-red-500/10 text-red-100",
  ok: "border-emerald-300/20 bg-emerald-500/10 text-emerald-100",
  pending: "border-amber-300/25 bg-amber-500/10 text-amber-100",
  warning: "border-amber-300/25 bg-amber-500/10 text-amber-100",
} as const;

function SetupCheckCard({
  check,
  icon: Icon,
}: {
  check: SetupReadinessCheck;
  icon: typeof Database;
}) {
  const IsOkIcon = check.status === "ok" ? CheckCircle2 : CircleDashed;

  return (
    <article className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-red-300/20 bg-red-500/12 text-red-200">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-black uppercase text-white">{check.label}</h2>
            <span
              className={[
                "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em]",
                statusStyles[check.status],
              ].join(" ")}
            >
              <IsOkIcon className="h-4 w-4" />
              {check.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{check.detail}</p>
        </div>
      </div>
    </article>
  );
}

export default async function AdminSetupPage() {
  const readiness = await getSetupReadiness();

  return (
    <main className="min-h-screen bg-[#020711] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-red-600/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_36%),radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_34%)]" />
      </div>

      <section className="relative mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
        <header className="border-b border-white/10 pb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-red-100">
            <ShieldCheck className="h-4 w-4" />
            backend readiness
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Admin setup status
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            Pagina asta verifica pregatirea pentru login admin real fara sa expuna secrete. Daca
            ceva lipseste, configurarea ramane blocata intentionat pana setam PostgreSQL si seed-ul.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-200 transition hover:border-red-300/35 hover:bg-red-500/10 hover:text-white"
              href="/admin/login"
            >
              Admin login
            </Link>
            <Link
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.085] hover:text-white"
              href="/api/admin/setup/status"
            >
              JSON status
            </Link>
          </div>
        </header>

        <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                overall status
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase text-white">{readiness.status}</h2>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              checked {readiness.timestamp}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <SetupCheckCard check={readiness.checks.database} icon={Database} />
          <SetupCheckCard check={readiness.checks.authSecret} icon={KeyRound} />
          <SetupCheckCard check={readiness.checks.adminSeed} icon={UserPlus} />
          <SetupCheckCard check={readiness.checks.migrationSeed} icon={ShieldCheck} />
        </div>

        <section className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <h2 className="text-lg font-black uppercase text-white">Ordinea corecta</h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-zinc-400">
            <li>1. Creeaza/conecteaza PostgreSQL si seteaza `DATABASE_URL` in Vercel.</li>
            <li>2. Genereaza un `AUTH_SECRET` puternic si seteaza-l in Vercel.</li>
            <li>3. Ruleaza local `npm run auth:hash-password` pentru parola primului admin.</li>
            <li>4. Seteaza `ADMIN_SEED_EMAIL`, `ADMIN_SEED_USERNAME`, `ADMIN_SEED_PASSWORD_HASH`.</li>
            <li>5. Ruleaza `npm run db:migrate` si `npm run db:seed` pe mediul cu DB real.</li>
          </ol>
        </section>
      </section>
    </main>
  );
}
