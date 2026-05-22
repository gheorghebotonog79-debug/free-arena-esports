import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
};

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

function getLoginErrorMessage(error: string | undefined) {
  if (error === "csrf") {
    return "Cererea de autentificare a expirat. Reincarca pagina si incearca din nou.";
  }

  if (error === "server") {
    return "Serviciul admin nu poate valida autentificarea acum. Verifica baza de date si configurarea ENV.";
  }

  if (error === "rate_limit") {
    return "Prea multe incercari de autentificare. Asteapta cateva minute si incearca din nou.";
  }

  if (error === "session") {
    return "Sesiunea admin nu mai este valida. Autentifica-te din nou.";
  }

  if (error === "invalid") {
    return "Datele de autentificare nu sunt corecte sau contul nu are acces activ.";
  }

  return null;
}

function getSafeNextPath(value: string | undefined) {
  if (!value?.startsWith("/admin") || value.startsWith("/admin/login")) {
    return "/admin/dashboard";
  }

  return value;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const activeSession = await getCurrentAdminSession();

  if (activeSession) {
    redirect("/admin/dashboard");
  }

  const errorMessage = getLoginErrorMessage(params.error);
  const nextPath = getSafeNextPath(params.next);

  return (
    <main className="min-h-screen overflow-hidden bg-[#020711] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,216,255,0.1),transparent_34%),linear-gradient(180deg,rgba(2,7,17,0.1),#020711_82%)]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-5 py-10">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-red-200">
              <ShieldCheck className="h-4 w-4 text-red-400" />
              Admin secure access
            </div>
            <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl">
              FREE-ARENA.RO Control Center
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-300 sm:text-base">
              Acces operational protejat pentru servere, continut, turnee, VIP si integrarile
              comunitatii. Zona publica ramane separata de panoul admin.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-red-500/10 blur-3xl" />
            <form
              action="/api/admin/auth/login"
              method="post"
              className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-8"
            >
              <input name="next" type="hidden" value={nextPath} />

              <div className="mb-7 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-red-300/20 bg-red-500/15 text-red-200">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">
                    Protected
                  </p>
                  <h2 className="text-xl font-black uppercase text-white">Admin login</h2>
                </div>
              </div>

              {errorMessage ? (
                <div className="mb-6 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
                  {errorMessage}
                </div>
              ) : null}

              <label className="mb-5 block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Email sau username
                </span>
                <input
                  autoComplete="username"
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-red-300/50 focus:bg-black/55 focus:ring-4 focus:ring-red-500/10"
                  name="identifier"
                  required
                  type="text"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Parola
                </span>
                <input
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-red-300/50 focus:bg-black/55 focus:ring-4 focus:ring-red-500/10"
                  name="password"
                  required
                  type="password"
                />
              </label>

              <button
                className="mt-7 w-full rounded-2xl border border-red-200/20 bg-red-500 px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_55px_rgba(239,68,68,0.28)] transition hover:bg-red-400 hover:shadow-[0_24px_70px_rgba(239,68,68,0.38)] active:scale-[0.99]"
                type="submit"
              >
                Intra in admin
              </button>

              <Link
                className="mt-4 block text-center text-xs font-black uppercase tracking-[0.18em] text-zinc-500 transition hover:text-red-100"
                href="/admin/setup"
              >
                Verifica setup backend
              </Link>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
