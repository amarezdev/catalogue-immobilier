import type { Currency, PropertyType, TransactionType } from "./types";

const CURRENCY_SYMBOL: Record<Currency, string> = {
  DA: "DA",
  EUR: "€",
  USD: "$",
};

export function formatPrice(
  price: number,
  currency: Currency,
  transaction?: TransactionType,
): string {
  const formatted = new Intl.NumberFormat("fr-FR").format(price);
  const base = `${formatted} ${CURRENCY_SYMBOL[currency]}`;
  return transaction === "location" ? `${base} / mois` : base;
}

export const TYPE_LABELS: Record<PropertyType, string> = {
  terrain: "Terrain",
  appartement: "Appartement",
  garage: "Garage",
  villa: "Villa",
};

export const TRANSACTION_LABELS: Record<TransactionType, string> = {
  vente: "Vente",
  location: "Location",
  echange: "Échange",
};

export const PROPERTY_TYPES: PropertyType[] = [
  "terrain",
  "appartement",
  "garage",
  "villa",
];

export const TRANSACTION_TYPES: TransactionType[] = [
  "vente",
  "location",
  "echange",
];
