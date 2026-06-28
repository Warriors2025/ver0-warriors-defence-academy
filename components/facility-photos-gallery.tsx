"use client"

import { useState } from "react"
import Image from "next/image"
import type { FacilityPhoto } from "@/lib/facilities-data"
import { Camera } from "lucide-react"

type FacilityPhotosGalleryProps = {
  title: string
  photos: FacilityPhoto[]
}

export function FacilityPhotosGallery({ title, photos }: FacilityPhotosGalleryProps) {
  const [active, setActive] = useState<number | null>(null)

  if (!photos.length) return null

  return (
    <section className="py-16 md:py-20 bg-muted/30 border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Camera className="h-5 w-5 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">Photos — {title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <button
              key={`${photo.src}-${i}`}
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                active === i ? "ring-2 ring-accent" : ""
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt || `${title} photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {photo.alt && (
                <span className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                  {photo.alt}
                </span>
              )}
            </button>
          ))}
        </div>

        {active !== null && photos[active]?.alt && (
          <p className="mt-4 text-sm text-muted-foreground text-center">{photos[active].alt}</p>
        )}
      </div>
    </section>
  )
}
