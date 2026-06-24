import Link from "next/link";
import { Building2 } from "lucide-react";
import { SITE } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-stone-900"
        >
          <Building2 className="h-5 w-5" />
          <span>{SITE.name}</span>
        </Link>
        <Link
          href="/admin"
          className="text-sm text-stone-500 transition-colors hover:text-stone-900"
        >
          Espace annonceur
        </Link>
      </div>
    </header>
  );
}
