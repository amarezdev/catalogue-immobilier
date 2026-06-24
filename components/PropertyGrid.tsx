import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <p className="py-20 text-center text-stone-500">
        Aucun bien ne correspond à votre recherche.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
