import type { Property } from "./types";

export interface Filters {
  q?: string;
  type?: string;
  transaction?: string;
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
  maxSurface?: number;
  acteNotarie?: boolean;
  livretFoncier?: boolean;
}

/**
 * Filtrage côté client pour la démo (données en mémoire).
 * En production, cette logique sera traduite en requête SQL indexée
 * (cf. architecture : pagination par curseur pour gérer de gros volumes).
 */
export function filterProperties(properties: Property[], f: Filters): Property[] {
  return properties.filter((p) => {
    if (f.q) {
      const q = f.q.trim().toLowerCase();
      const haystack = `${p.title} ${p.city}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.type && p.type !== f.type) return false;
    if (f.transaction && p.transaction !== f.transaction) return false;
    if (f.minPrice != null && p.price < f.minPrice) return false;
    if (f.maxPrice != null && p.price > f.maxPrice) return false;
    if (f.minSurface != null && p.surface < f.minSurface) return false;
    if (f.maxSurface != null && p.surface > f.maxSurface) return false;
    if (f.acteNotarie && !p.acteNotarie) return false;
    if (f.livretFoncier && !p.livretFoncier) return false;
    return true;
  });
}

export function hasActiveFilters(f: Filters): boolean {
  return Boolean(
    f.q ||
      f.type ||
      f.transaction ||
      f.minPrice ||
      f.maxPrice ||
      f.minSurface ||
      f.maxSurface ||
      f.acteNotarie ||
      f.livretFoncier,
  );
}
