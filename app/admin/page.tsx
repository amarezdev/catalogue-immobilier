import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Star,
  Eye,
  Trash2,
  LogOut,
  Building2,
} from "lucide-react";
import { properties } from "@/lib/data";
import { formatPrice, TYPE_LABELS, TRANSACTION_LABELS } from "@/lib/format";
import { SITE } from "@/lib/config";

export const metadata = { title: "Tableau de bord — Espace annonceur" };

export default function AdminDashboardPage() {
  const total = properties.length;
  const enCours = properties.filter((p) => p.status === "en_cours").length;
  const vendus = properties.filter((p) => p.status === "vendu").length;
  const aLaUne = properties.filter((p) => p.featured).length;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Barre admin */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-stone-900">
            <Building2 className="h-5 w-5" />
            <span>{SITE.name}</span>
            <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
              Annonceur
            </span>
          </div>
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">
              Tableau de bord
            </h1>
            <p className="text-sm text-stone-500">
              Gérez l&apos;ensemble de votre catalogue.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700">
            <Plus className="h-4 w-4" />
            Ajouter un bien
          </button>
        </div>

        {/* Indicateurs */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total", value: total },
            { label: "En cours", value: enCours },
            { label: "Vendus", value: vendus },
            { label: "À la une", value: aLaUne },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-stone-200 bg-white p-4"
            >
              <p className="text-2xl font-semibold text-stone-900">
                {stat.value}
              </p>
              <p className="text-sm text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Liste des biens */}
        <div className="mt-8 overflow-hidden rounded-xl border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Bien</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Type
                </th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Prix
                </th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md bg-stone-100">
                        <Image
                          src={p.images[0]}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 truncate font-medium text-stone-900">
                          {p.title}
                          {p.featured && (
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          )}
                        </p>
                        <p className="truncate text-xs text-stone-500">
                          {p.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-stone-600 sm:table-cell">
                    {TYPE_LABELS[p.type]} · {TRANSACTION_LABELS[p.transaction]}
                  </td>
                  <td className="hidden px-4 py-3 text-stone-600 md:table-cell">
                    {formatPrice(p.price, p.currency, p.transaction)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.status === "vendu"
                          ? "bg-stone-200 text-stone-600"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {p.status === "vendu" ? "Vendu" : "En cours"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 text-stone-400">
                      <Link
                        href={`/biens/${p.slug}`}
                        className="rounded-md p-1.5 hover:bg-stone-100 hover:text-stone-900"
                        aria-label="Voir"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        className="rounded-md p-1.5 hover:bg-stone-100 hover:text-stone-900"
                        aria-label="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-md p-1.5 hover:bg-stone-100 hover:text-stone-900"
                        aria-label="Mettre à la une"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-md p-1.5 hover:bg-red-50 hover:text-red-600"
                        aria-label="Retirer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-xs text-stone-400">
          Maquette — les actions (ajout, modification, suppression) seront
          fonctionnelles une fois la base de données branchée (Phase 1 & 3).
        </p>
      </main>
    </div>
  );
}
