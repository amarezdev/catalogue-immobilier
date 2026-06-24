# Catalogue Immobilier — Bureau d'Affaires

Première version (MVP) d'un catalogue immobilier moderne, **mobile-first**, au design épuré
inspiré des grandes plateformes (Airbnb, Idealista, Sotheby's).

> ⚠️ Cette version tourne avec des **données de démonstration en mémoire**
> (`lib/data.ts`). Aucune base de données n'est encore branchée : l'objectif est de
> valider le design et le parcours utilisateur. Le branchement Supabase/Postgres
> est prévu en Phase 1.

## ✨ Ce qui est inclus

**Partie publique**
- Page d'accueil + barre de recherche segmentée (Où · Type · Transaction)
- Filtres avancés ultra-discrets en bottom-sheet (budget, superficie, acte notarié, livret foncier)
- Section « À la une » (biens épinglés)
- Grille de cartes responsive (1 → 4 colonnes) au style « image = carte »
- Fiche détail : galerie, caractéristiques **conditionnelles selon le type**, échange (troc),
  accordéon juridique, carte OpenStreetMap, bouton WhatsApp (message pré-rempli)
- Multi-devises : DA / € / $

**Espace annonceur (maquette)**
- Écran de connexion
- Tableau de bord : indicateurs, liste des biens, statuts « En cours / Vendu », actions

## 🚀 Lancer le projet

### 1. Installer Node.js (requis, absent de la machine)
Télécharge la version **LTS** sur https://nodejs.org puis installe-la.
Vérifie ensuite dans un nouveau terminal :
```powershell
node --version
npm --version
```

### 2. Installer les dépendances
```powershell
npm install
```

### 3. Démarrer le serveur de développement
```powershell
npm run dev
```
Ouvre ensuite http://localhost:3000

> Les images de démo proviennent de `picsum.photos` : une connexion Internet est
> nécessaire au premier chargement.

## 🛠️ Stack technique

| Couche | Choix |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Style | Tailwind CSS |
| Icônes | lucide-react |
| Carte | OpenStreetMap (iframe) → Leaflet à venir |
| Données | Mock en mémoire → **Supabase/Postgres** (à venir) |

## 📁 Structure

```
app/
  layout.tsx              Layout racine (police, métadonnées)
  page.tsx                Accueil / catalogue
  biens/[slug]/page.tsx   Fiche détail d'un bien
  admin/
    page.tsx              Tableau de bord (maquette)
    login/page.tsx        Connexion (maquette)
components/               Composants UI réutilisables
lib/
  types.ts               Modèle de données (Property)
  data.ts                Données de démonstration
  format.ts              Formatage prix / libellés
  filters.ts             Logique de filtrage
  config.ts              ⚙️ Numéro WhatsApp + nom du site
```

## ⚙️ À personnaliser en premier

- **Numéro WhatsApp** : `lib/config.ts` → `SITE.whatsapp`
- **Nom du bureau** : `lib/config.ts` → `SITE.name`
- **Couleur d'accent** : `tailwind.config.ts` (`accent`) — actuellement charbon premium
- **Biens affichés** : `lib/data.ts`

## 🗺️ Prochaines étapes (roadmap)

1. **Phase 1** — Base de données (Supabase), schéma `Property` + `details` JSONB, upload/compression images (WebP)
2. **Phase 2** — Pagination/infinite scroll (gros volume), Leaflet interactif, SEO (sitemap, OG)
3. **Phase 3** — Authentification de l'unique compte annonceur, CRUD réel des annonces
4. **Phase 4** — Perf (Lighthouse mobile > 90), sécurité, déploiement Vercel
