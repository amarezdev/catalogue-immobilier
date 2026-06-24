"use client";

import { X } from "lucide-react";
import type { Filters } from "@/lib/filters";

interface FilterSheetProps {
  open: boolean;
  filters: Filters;
  onPatch: (patch: Partial<Filters>) => void;
  onClose: () => void;
  onReset: () => void;
  resultCount: number;
}

function num(value: string): number | undefined {
  if (value === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

export function FilterSheet({
  open,
  filters,
  onPatch,
  onClose,
  onReset,
  resultCount,
}: FilterSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-900">Filtres</h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Budget */}
        <fieldset className="mb-6">
          <legend className="mb-2 text-sm font-medium text-stone-900">
            Budget
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={filters.minPrice ?? ""}
              onChange={(e) => onPatch({ minPrice: num(e.target.value) })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
            />
            <span className="text-stone-400">—</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={filters.maxPrice ?? ""}
              onChange={(e) => onPatch({ maxPrice: num(e.target.value) })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
            />
          </div>
        </fieldset>

        {/* Superficie */}
        <fieldset className="mb-6">
          <legend className="mb-2 text-sm font-medium text-stone-900">
            Superficie (m²)
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={filters.minSurface ?? ""}
              onChange={(e) => onPatch({ minSurface: num(e.target.value) })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
            />
            <span className="text-stone-400">—</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={filters.maxSurface ?? ""}
              onChange={(e) => onPatch({ maxSurface: num(e.target.value) })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
            />
          </div>
        </fieldset>

        {/* Critères juridiques */}
        <fieldset className="mb-8">
          <legend className="mb-2 text-sm font-medium text-stone-900">
            Critères juridiques
          </legend>
          <label className="flex cursor-pointer items-center gap-3 py-2">
            <input
              type="checkbox"
              checked={filters.acteNotarie ?? false}
              onChange={(e) =>
                onPatch({ acteNotarie: e.target.checked || undefined })
              }
              className="h-4 w-4 rounded border-stone-300 accent-stone-900"
            />
            <span className="text-sm text-stone-700">Acte notarié</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 py-2">
            <input
              type="checkbox"
              checked={filters.livretFoncier ?? false}
              onChange={(e) =>
                onPatch({ livretFoncier: e.target.checked || undefined })
              }
              className="h-4 w-4 rounded border-stone-300 accent-stone-900"
            />
            <span className="text-sm text-stone-700">Livret foncier</span>
          </label>
        </fieldset>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onReset}
            className="text-sm font-medium text-stone-600 underline-offset-4 hover:underline"
          >
            Tout réinitialiser
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Voir {resultCount} bien{resultCount > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
