// Nom du dépôt GitHub (sert de base d'URL pour GitHub Pages : /<repo>/).
const repo = "catalogue-immobilier";
// Activé uniquement lors du build GitHub Pages (cf. workflow), pour ne pas
// préfixer les URLs en développement local.
const isGithubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export 100 % statique : génère un dossier `out/` hébergeable sur GitHub Pages.
  output: "export",
  // URLs en /chemin/ -> chaque page devient un dossier/index.html (robuste sur Pages).
  trailingSlash: true,
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : undefined,
  images: {
    // Obligatoire en export statique : pas de serveur d'optimisation d'images.
    // Nos images sont locales (public/images), elles sont servies telles quelles.
    unoptimized: true,
  },
  // Exposé au code (build + client) pour préfixer manuellement les chemins
  // d'images : next/image n'applique pas le basePath aux sources locales.
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repo}` : "",
  },
};

export default nextConfig;
