"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/lib/types";
import {
  type Filters,
  filterProperties,
  hasActiveFilters,
} from "@/lib/filters";
import { TRANSACTION_TYPES, TRANSACTION_LABELS } from "@/lib/format";
import { SearchBar } from "./SearchBar";
import { FilterSheet } from "./FilterSheet";
import { FeaturedSection } from "./FeaturedSection";
import { PropertyGrid } from "./PropertyGrid";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-stone-900 text-white"
          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
      }`}
    >
      {children}
    </button>
  );
}

/** Nombre de filtres "avancés" actifs (hors recherche/type/transaction rapides). */
function countAdvanced(f: Filters): number {
  return [
    f.minPrice,
    f.maxPrice,
    f.minSurface,
    f.maxSurface,
    f.acteNotarie,
    f.livretFoncier,
  ].filter((v) => v !== undefined).length;
}

export function Catalogue({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<Filters>({});
  const [sheetOpen, setSheetOpen] = useState(false);

  const patch = (p: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...p }));

  const results = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters],
  );
  const featured = useMemo(
    () => properties.filter((p) => p.featured && p.status === "en_cours"),
    [properties],
  );

  const active = hasActiveFilters(filters);

  return (
    <div className="pb-24">
      <SearchBar
        filters={filters}
        onPatch={patch}
        onOpenFilters={() => setSheetOpen(true)}
        activeCount={countAdvanced(filters)}
      />

      {/* Raccourcis transaction */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Chip
          active={!filters.transaction}
          onClick={() => patch({ transaction: undefined })}
        >
          Tout
        </Chip>
        {TRANSACTION_TYPES.map((t) => (
          <Chip
            key={t}
            active={filters.transaction === t}
            onClick={() => patch({ transaction: t })}
          >
            {TRANSACTION_LABELS[t]}
          </Chip>
        ))}
      </div>

      {!active && <FeaturedSection properties={featured} />}

      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-medium text-stone-900">
            {active ? "Résultats" : "Tout le catalogue"}
          </h2>
          <span className="text-sm text-stone-500">
            {results.length} bien{results.length > 1 ? "s" : ""}
          </span>
        </div>
        <PropertyGrid properties={results} />
      </section>

      <FilterSheet
        open={sheetOpen}
        filters={filters}
        onPatch={patch}
        onClose={() => setSheetOpen(false)}
        onReset={() => setFilters({})}
        resultCount={results.length}
      />
    </div>
  );
}
