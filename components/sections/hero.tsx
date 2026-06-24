"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, ChevronLeft, ChevronRight, Shield, Trophy, Users, GraduationCap } from "lucide-react"

const stats = [
  { value: "50,000+", label: "Students Trained", icon: Users },
  { value: "5,000+", label: "Selections", icon: Trophy },
  { value: "200+", label: "Expert Mentors", icon: GraduationCap },
  { value: "15+", label: "Years of Excellence", icon: Shield },
]

const slides = [
  {
    src: "/images/hero/carousel-1.jpg",
    alt: "GTO Training Ground",
    caption: "India's Largest GTO Ground",
  },
  {
    src: "/images/hero/carousel-2.jpg",
    alt: "Expert Faculty",
    caption: "Learn from Retired Military Officers",
  },
  {
    src: "/images/hero/carousel-3.jpg",
    alt: "Academy Campus",
    caption: "World-Class Campus Infrastructure",
  },
  {
    src: "/images/hero/carousel-4.jpg",
    alt: "SSB Preparation",
    caption: "Complete SSB Interview Readiness",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-pattern opacity-40" />

      {/* Gold accent line — left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent hidden lg:block" />

      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="space-y-6 order-2 lg:order-1">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5">
              <Shield className="h-3.5 w-3.5 text-accent" />
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                India's No. 1 Defence Coaching Institute
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-foreground">
              Shape Your Future as a{" "}
              <span className="text-gradient">Defence Officer</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
              Join Warriors Defence Academy — expert coaching for NDA, CDS, AFCAT & SSB
              with India's finest faculty and largest GTO ground.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "India's Largest GTO Ground",
                "Ex-Military Faculty",
                "SSB Interview Prep",
                "15+ Years Track Record",
              ].map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/8 text-primary border border-primary/20 rounded-full px-3 py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  {f}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto h-12 px-7 gap-2 text-base font-semibold shadow-lg shadow-primary/20">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-7 gap-2 text-base font-semibold border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto h-12 px-5 gap-2 text-base text-muted-foreground hover:text-foreground"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary/40">
                  <Play className="h-3 w-3 fill-primary text-primary ml-0.5" />
                </span>
                Campus Tour
              </Button>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border">
              {stats.map((s, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-xl font-bold text-accent">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image carousel ── */}
          <div className="order-1 lg:order-2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/60">
              {/* Images */}
              <div className="relative h-[300px] sm:h-[400px] lg:h-[520px]">
                {slides.map((slide, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  </div>
                ))}

                {/* Caption */}
                <div className="absolute bottom-16 left-0 right-0 px-6">
                  <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-white text-sm font-medium">{slides[current].caption}</span>
                  </div>
                </div>

                {/* Arrow nav */}
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-accent" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating achievement badge */}
            <div className="absolute -bottom-4 -left-4 hidden lg:flex items-center gap-3 bg-card border border-border shadow-xl rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">AIR #1</div>
                <div className="text-xs text-muted-foreground">Multiple Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
