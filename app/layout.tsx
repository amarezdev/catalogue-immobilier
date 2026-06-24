import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Terrains, appartements, villas et garages à la vente, en location ou en échange. Un catalogue immobilier clair et rapide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-white font-sans text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
