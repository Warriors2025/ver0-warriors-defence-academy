"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ActivityItem } from "@/lib/site-content"

type OutdoorActivitiesProps = {
  eyebrow: string
  title: string
  subtitle: string
  items: ActivityItem[]
}

export function OutdoorActivitiesSection({ eyebrow, title, subtitle, items }: OutdoorActivitiesProps) {
  const [idx, setIdx] = useState(0)
  const perPage = 3
  const activities = items.length ? items : []

  const next = useCallback(() => {
    if (!activities.length) return
    setIdx((p) => (p + 1) % activities.length)
  }, [activities.length])
  const prev = () => {
    if (!activities.length) return
    setIdx((p) => (p - 1 + activities.length) % activities.length)
  }

  useEffect(() => {
    if (!activities.length) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next, activities.length])

  if (!activities.length) return null

  const visible = Array.from({ length: Math.min(perPage, activities.length) }, (_, i) => activities[(idx + i) % activities.length])

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              {eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 leading-tight">
              {title}
            </h2>
            <p className="text-muted-foreground text-base mt-3 max-w-lg leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prev}
              aria-label="Previous activities"
              className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next activities"
              className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((a, i) => (
            <div key={`${a.title}-${i}`} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={a.image}
                alt={a.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1">
                <span className="text-white text-xs font-medium">{a.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-semibold text-base leading-snug">{a.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-8">
          {activities.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to activity ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
