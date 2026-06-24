import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/config";

export function WhatsAppButton({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const message = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par l'annonce « ${title} ». Est-elle toujours disponible ?`,
  );
  const href = `https://wa.me/${SITE.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700 ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      Contacter via WhatsApp
    </a>
  );
}
