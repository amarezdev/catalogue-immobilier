"use client";

import { SlidersHorizontal } from "lucide-react";
import type { Filters } from "@/lib/filters";
import {
  PROPERTY_TYPES,
  TRANSACTION_TYPES,
  TYPE_LABELS,
  TRANSACTION_LABELS,
} from "@/lib/format";

interface SearchBarProps {
  filters: Filters;
  onPatch: (patch: Partial<Filters>) => void;
  onOpenFilters: () => void;
  activeCount: number;
}

export function SearchBar({
  filters,
  onPatch,
  onOpenFilters,
  activeCount,
}: SearchBarProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center rounded-full border border-stone-200 bg-white p-1.5 shadow-sm transition-shadow hover:shadow-md">
      {/* Où */}
      <div className="min-w-0 flex-1 px-4 py-1.5">
        <label className="block text-xs font-medium text-stone-900">Où</label>
        <input
          value={filters.q ?? ""}
          onChange={(e) => onPatch({ q: e.target.value || undefined })}
          placeholder="Ville, quartier…"
          className="w-full bg-transparent text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none"
        />
      </div>

      <div className="hidden h-8 w-px bg-stone-200 sm:block" />

      {/* Type */}
      <div className="hidden min-w-0 flex-1 px-4 py-1.5 sm:block">
        <label className="block text-xs font-medium text-stone-900">Type</label>
        <select
          value={filters.type ?? ""}
          onChange={(e) => onPatch({ type: e.target.value || undefined })}
          className="w-full cursor-pointer appearance-none bg-transparent text-sm text-stone-700 focus:outline-none"
        >
          <option value="">Tous les biens</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden h-8 w-px bg-stone-200 sm:block" />

      {/* Transaction */}
      <div className="hidden min-w-0 flex-1 px-4 py-1.5 sm:block">
        <label className="block text-xs font-medium text-stone-900">
          Transaction
        </label>
        <select
          value={filters.transaction ?? ""}
          onChange={(e) => onPatch({ transaction: e.target.value || undefined })}
          className="w-full cursor-pointer appearance-none bg-transparent text-sm text-stone-700 focus:outline-none"
        >
          <option value="">Indifférent</option>
          {TRANSACTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {TRANSACTION_LABELS[t]}
            </option>
          ))}
        </select>
      </div>

      {/* Filtres avancés (bottom-sheet) */}
      <button
        onClick={onOpenFilters}
        aria-label="Filtres avancés"
        className="relative m-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white transition-colors hover:bg-stone-700"
      >
        <SlidersHorizontal className="h-4 w-4" />
        {activeCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-semibold text-white">
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}
