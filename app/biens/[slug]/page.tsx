import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Maximize,
  Layers,
  DoorOpen,
  BedDouble,
  Sprout,
  Repeat,
  FileCheck2,
  BookOpenCheck,
} from "lucide-react";
import { getPropertyBySlug, properties } from "@/lib/data";
import { formatPrice, TYPE_LABELS, TRANSACTION_LABELS } from "@/lib/format";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { PropertyMap } from "@/components/PropertyMap";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getPropertyBySlug(params.slug);
  if (!p) return { title: "Bien introuvable" };
  return {
    title: `${p.title} — ${formatPrice(p.price, p.currency, p.transaction)}`,
    description: p.description.slice(0, 155),
  };
}

function Attribute({
  icon: Icon,
  label,
}: {
  icon: typeof Maximize;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-700">
      <Icon className="h-4 w-4 text-stone-500" />
      {label}
    </span>
  );
}

export default function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const { details, type, transaction } = property;
  const isHabitat = type === "appartement" || type === "villa";

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-32 sm:px-6">
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour au catalogue
        </Link>

        <div className="mt-4">
          <Gallery images={property.images} title={property.title} />
        </div>

        {/* En-tête */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
                {TRANSACTION_LABELS[transaction]}
              </span>
              {property.featured && property.status === "en_cours" && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  À la une
                </span>
              )}
              {property.status === "vendu" && (
                <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700">
                  Vendu
                </span>
              )}
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              {property.title}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-stone-500">
              <MapPin className="h-4 w-4" />
              {property.city}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-stone-900">
              {formatPrice(property.price, property.currency, transaction)}
            </p>
            <p className="text-sm text-stone-500">{TYPE_LABELS[type]}</p>
          </div>
        </div>

        {/* Caractéristiques (chips conditionnelles selon le type) */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Attribute icon={Maximize} label={`${property.surface} m²`} />
          {isHabitat && details.pieces != null && (
            <Attribute icon={DoorOpen} label={`${details.pieces} pièces`} />
          )}
          {isHabitat && details.chambres != null && details.chambres > 0 && (
            <Attribute
              icon={BedDouble}
              label={`${details.chambres} chambres`}
            />
          )}
          {isHabitat && details.etage != null && (
            <Attribute
              icon={Layers}
              label={details.etage === 0 ? "Rez-de-chaussée" : `Étage ${details.etage}`}
            />
          )}
          {type === "terrain" && (
            <Attribute
              icon={Sprout}
              label={details.constructible ? "Constructible" : "Non constructible"}
            />
          )}
        </div>

        {/* Description */}
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-medium text-stone-900">
            Description
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-stone-600">
            {property.description}
          </p>
        </section>

        {/* Échange souhaité (uniquement si troc) */}
        {transaction === "echange" && details.trocSouhaite && (
          <section className="mt-8 rounded-2xl bg-stone-50 p-5">
            <h2 className="mb-2 flex items-center gap-2 text-base font-medium text-stone-900">
              <Repeat className="h-4 w-4" />
              Bien souhaité en échange
            </h2>
            <p className="leading-relaxed text-stone-600">
              {details.trocSouhaite}
            </p>
          </section>
        )}

        {/* Informations juridiques (accordéon natif, repliable) */}
        <details className="group mt-8 border-t border-stone-200 pt-4" open>
          <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-stone-900 [&::-webkit-details-marker]:hidden">
            Informations juridiques
            <span className="text-sm text-stone-400 transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div className="mt-4 flex flex-wrap gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                property.acteNotarie
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-stone-100 text-stone-400 line-through"
              }`}
            >
              <FileCheck2 className="h-4 w-4" />
              Acte notarié
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                property.livretFoncier
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-stone-100 text-stone-400 line-through"
              }`}
            >
              <BookOpenCheck className="h-4 w-4" />
              Livret foncier
            </span>
          </div>
        </details>

        {/* Localisation */}
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-medium text-stone-900">
            Localisation
          </h2>
          <PropertyMap
            lat={property.lat}
            lng={property.lng}
            title={property.title}
          />
        </section>

        {/* Contact (desktop) */}
        <div className="mt-10 hidden sm:block">
          <WhatsAppButton title={property.title} />
        </div>
      </main>

      {/* Barre de contact fixe (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-stone-200 bg-white/95 px-4 py-3 backdrop-blur sm:hidden">
        <span className="font-semibold text-stone-900">
          {formatPrice(property.price, property.currency, transaction)}
        </span>
        <WhatsAppButton title={property.title} className="flex-1" />
      </div>
    </>
  );
}
