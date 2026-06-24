"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const activities = [
  { id: 1, image: "/images/activities/activity-1.jpg", title: "Morning Physical Training", tag: "Fitness" },
  { id: 2, image: "/images/activities/activity-2.jpg", title: "GTO Group Tasks",           tag: "SSB Prep" },
  { id: 3, image: "/images/activities/activity-3.jpg", title: "Team Sports",               tag: "Teamwork" },
  { id: 4, image: "/images/activities/activity-4.jpg", title: "Parade Practice",            tag: "Discipline" },
  { id: 5, image: "/images/activities/activity-5.jpg", title: "Adventure Training",         tag: "Leadership" },
  { id: 6, image: "/images/activities/activity-6.jpg", title: "Group Discussions",          tag: "Communication" },
]

export function OutdoorActivitiesSection() {
  const [idx, setIdx] = useState(0)
  const perPage = 3

  const next = useCallback(() => setIdx((p) => (p + 1) % activities.length), [])
  const prev = () => setIdx((p) => (p - 1 + activities.length) % activities.length)

  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next])

  const visible = Array.from({ length: perPage }, (_, i) => activities[(idx + i) % activities.length])

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">

        {/* Header — left-aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Life at Warriors
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 leading-tight">
              Building Character Through Action
            </h2>
            <p className="text-muted-foreground text-base mt-3 max-w-lg leading-relaxed">
              Training beyond the classroom — physical challenges, group tasks, and leadership
              drills that build teamwork, confidence, and mental toughness.
            </p>
          </div>

          {/* Arrow controls */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={prev}
              aria-label="Previous activity"
              className="w-10 h-10 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next activity"
              className="w-10 h-10 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((a, i) => (
            <div
              key={`${a.id}-${i}`}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={a.image}
                alt={a.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Permanent subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              {/* Tag chip */}
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1">
                <span className="text-white text-xs font-medium">{a.tag}</span>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-semibold text-base leading-snug">{a.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
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
