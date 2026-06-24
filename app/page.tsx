import Image from "next/image";
import { Header } from "@/components/Header";
import { Catalogue } from "@/components/Catalogue";
import { properties } from "@/lib/data";
import { SITE } from "@/lib/config";
import { asset } from "@/lib/asset";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Bannière d'en-tête */}
        <section className="relative mt-4 overflow-hidden rounded-2xl">
          <div className="relative h-[320px] w-full sm:h-[420px]">
            <Image
              src={asset("/images/hero.jpg")}
              alt={SITE.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/45 to-stone-900/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/80 sm:text-sm">
                {SITE.name}
              </p>
              <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Trouvez le bien qui vous ressemble
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 sm:text-base">
                Terrains, appartements, villas et garages — à la vente, en
                location ou en échange.
              </p>
            </div>
          </div>
        </section>

        <Catalogue properties={properties} />
      </main>

      <footer className="border-t border-stone-100 py-10 text-center text-sm text-stone-400">
        © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
      </footer>
    </>
  );
}
