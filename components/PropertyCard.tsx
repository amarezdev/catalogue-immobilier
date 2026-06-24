import Image from "next/image";
import Link from "next/link";
import { Maximize } from "lucide-react";
import type { Property } from "@/lib/types";
import { formatPrice, TRANSACTION_LABELS, TYPE_LABELS } from "@/lib/format";

export function PropertyCard({ property }: { property: Property }) {
  const {
    slug,
    title,
    city,
    price,
    currency,
    surface,
    images,
    featured,
    transaction,
    type,
    status,
  } = property;
  const sold = status === "vendu";

  return (
    <Link href={`/biens/${slug}`} className="group block">
      {/* L'image arrondie EST la carte : ni bordure, ni fond. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
            sold ? "grayscale" : ""
          }`}
        />

        {featured && !sold && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-stone-900 shadow-sm">
            À la une
          </span>
        )}
        {sold && (
          <span className="absolute left-3 top-3 rounded-full bg-stone-900/90 px-3 py-1 text-xs font-medium text-white">
            Vendu
          </span>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-stone-700 shadow-sm">
          {TRANSACTION_LABELS[transaction]}
        </span>
      </div>

      {/* Texte posé dessous, sans cadre. */}
      <div className="mt-3 space-y-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate font-medium text-stone-900">{title}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm text-stone-500">
            <Maximize className="h-3.5 w-3.5" />
            {surface} m²
          </span>
        </div>
        <p className="text-sm text-stone-500">
          {TYPE_LABELS[type]} · {city}
        </p>
        <p className="pt-1 font-semibold text-stone-900">
          {formatPrice(price, currency, transaction)}
        </p>
      </div>
    </Link>
  );
}
