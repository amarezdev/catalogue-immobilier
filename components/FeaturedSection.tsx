import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";

export function FeaturedSection({ properties }: { properties: Property[] }) {
  if (properties.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-5 text-lg font-medium text-stone-900">À la une</h2>
      <div className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {properties.map((p) => (
          <div key={p.id} className="w-64 shrink-0 sm:w-72">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
