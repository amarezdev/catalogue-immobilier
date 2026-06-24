"use client";

import Image from "next/image";
import { useState } from "react";

export function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-100">
        <Image
          src={images[active]}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1}`}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg transition ${
                i === active
                  ? "ring-2 ring-stone-900 ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
