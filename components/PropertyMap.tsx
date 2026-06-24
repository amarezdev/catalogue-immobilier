/**
 * Carte de localisation via OpenStreetMap (iframe, zéro dépendance).
 * Évolution prévue : passage à Leaflet interactif (cf. roadmap Phase 2).
 */
export function PropertyMap({
  lat,
  lng,
  title,
}: {
  lat: number;
  lng: number;
  title: string;
}) {
  const dLng = 0.012;
  const dLat = 0.008;
  const bbox = `${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200">
      <iframe
        title={`Localisation — ${title}`}
        src={src}
        className="h-72 w-full"
        loading="lazy"
      />
    </div>
  );
}
