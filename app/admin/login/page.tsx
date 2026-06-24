import Link from "next/link";
import { Building2, Lock } from "lucide-react";
import { SITE } from "@/lib/config";

export const metadata = { title: "Connexion — Espace annonceur" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2 text-stone-900">
          <Building2 className="h-5 w-5" />
          <span className="font-semibold">{SITE.name}</span>
        </div>

        <h1 className="text-xl font-semibold text-stone-900">
          Espace annonceur
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Accès réservé au bureau d&apos;affaires.
        </p>

        {/* Formulaire maquette — l'authentification réelle arrive en Phase 3. */}
        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Identifiant
            </label>
            <input
              type="text"
              placeholder="bureau@exemple.dz"
              className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 focus:outline-none"
            />
          </div>
          <Link
            href="/admin"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            <Lock className="h-4 w-4" />
            Se connecter
          </Link>
        </form>

        <p className="mt-6 text-center text-xs text-stone-400">
          Maquette — l&apos;authentification sécurisée sera branchée en Phase 3.
        </p>
      </div>
    </main>
  );
}
