export type PropertyType = "terrain" | "appartement" | "garage" | "villa";
export type TransactionType = "vente" | "location" | "echange";
export type Currency = "DA" | "EUR" | "USD";
export type PropertyStatus = "en_cours" | "vendu";

/**
 * Champs conditionnels selon le type de bien.
 * En base de données, cet objet correspond à une colonne JSONB (cf. mémoire projet) :
 * cela permet d'absorber les variations sans multiplier les colonnes.
 */
export interface PropertyDetails {
  pieces?: number;
  chambres?: number;
  etage?: number;
  constructible?: boolean;
  /** Bien souhaité en contrepartie, uniquement pour transaction = "echange". */
  trocSouhaite?: string;
}

export interface Property {
  id: string;
  slug: string;
  type: PropertyType;
  transaction: TransactionType;
  status: PropertyStatus;
  title: string;
  description: string;
  city: string;
  lat: number;
  lng: number;
  price: number;
  currency: Currency;
  surface: number; // en m²
  featured: boolean; // "À la une"
  acteNotarie: boolean;
  livretFoncier: boolean;
  details: PropertyDetails;
  images: string[];
  createdAt: string; // ISO
}
