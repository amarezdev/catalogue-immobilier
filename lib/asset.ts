/**
 * Préfixe un chemin public (image, fichier statique) avec le basePath du site.
 * Nécessaire pour GitHub Pages où le site est servi sous /<repo>/, car
 * `next/image` n'ajoute pas le basePath aux sources locales.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
