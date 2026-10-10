"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, ChevronLeft, ChevronRight, Shield, Trophy, Phone } from "lucide-react"
import type { HeroSlide, SiteContent } from "@/lib/site-content"
import { defaultContent } from "@/lib/site-content"
import { CmsField } from "@/components/cms/cms-field"
import { HeadingTag } from "@/components/seo/heading-tag"
import type { HeadingLevel } from "@/lib/seo"

type HeroSectionProps = {
  hero?: SiteContent["hero"]
  slides?: HeroSlide[]
  achievement?: { value: string; label: string }
  headlineLevel?: HeadingLevel
}

export function HeroSection({
  hero = defaultContent.hero,
  slides = defaultContent.sections.heroSlides,
  achievement = defaultContent.sections.heroAchievement,
  headlineLevel = "h1",
}: HeroSectionProps) {
  const visibleSlides = slides
    .map((slide, index) => ({ slide, index }))
    .filter(({ slide }) => Boolean(slide.src))
  const count = visibleSlides.length

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((p) => (count ? (p + 1) % count : 0)), [count])
  const prev = useCallback(() => setCurrent((p) => (count ? (p - 1 + count) % count : 0)), [count])

  useEffect(() => {
    if (paused || count < 2) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next, paused, count])

  const active = visibleSlides[current] ?? visibleSlides[0]

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 hero-pattern opacity-40" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent hidden lg:block" />

      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5">
              <Shield className="h-3.5 w-3.5 text-accent" />
              <CmsField id="hero.badge" label="Hero Badge" section="hero">
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                  {hero.badge}
                </span>
              </CmsField>
            </div>

            <HeadingTag level={headlineLevel} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-foreground">
              <CmsField id="hero.headline" label="Hero Headline" section="hero">{hero.headline}</CmsField>{" "}
              <span className="text-gradient">
                <CmsField id="hero.highlightText" label="Hero Highlight Text" section="hero">{hero.highlightText}</CmsField>
              </span>
            </HeadingTag>

            <div className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
              <CmsField id="hero.tagline" label="Hero Tagline" section="hero" block>{hero.tagline}</CmsField>
            </div>

            <div className="flex flex-wrap gap-2">
              {hero.features.map((f, i) => (
                <CmsField key={i} id={`hero.features.${i}`} label={`Feature Pill ${i + 1}`} section="hero">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/8 text-primary border border-primary/20 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                    {f}
                  </span>
                </CmsField>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto h-12 px-7 gap-2 text-base font-semibold shadow-lg shadow-primary/20">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+917081011964">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-7 gap-2 text-base font-semibold border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  Call Now
                  <Phone className="h-4 w-4" />
                </Button>
              </a>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto h-12 px-5 gap-2 text-base text-muted-foreground hover:text-foreground">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary/40">
                  <Play className="h-3 w-3 fill-primary text-primary ml-0.5" />
                </span>
                Campus Tour
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border">
              {hero.stats.map((s, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-xl font-bold text-accent">
                    <CmsField id={`hero.stats.${i}.value`} label={`Hero Stat ${i + 1} Value`} section="hero">{s.value}</CmsField>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    <CmsField id={`hero.stats.${i}.label`} label={`Hero Stat ${i + 1} Label`} section="hero">{s.label}</CmsField>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="order-1 lg:order-2 w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <figure className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/15 ring-1 ring-border/70 bg-[oklch(0.3_0.09_145)]">
              <div className="relative aspect-[3/2] overflow-hidden bg-[oklch(0.2_0.04_145)]">
                {visibleSlides.map(({ slide }, i) => (
                  <div
                    key={slide.src + i}
                    aria-hidden={i !== current}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${i === current ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image
                      src={slide.src}
                      alt=""
                      fill
                      sizes="96px"
                      quality={40}
                      className="object-cover scale-125 blur-2xl opacity-70 saturate-125 bg-transparent!"
                    />
                    <div className="absolute inset-0 bg-[oklch(0.2_0.04_145)]/45" />
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] bg-transparent!"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>

              <figcaption className="relative text-white">
                {count > 1 && (
                  <div className="absolute -top-px left-0 right-0 flex gap-1 px-4 sm:px-5">
                    {visibleSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === current ? "true" : undefined}
                        className="group flex-1 h-4 -mt-1.5 flex items-center cursor-pointer"
                      >
                        <span
                          className={`block h-[3px] w-full rounded-full transition-colors duration-300 ${i === current ? "bg-accent" : "bg-white/25 group-hover:bg-white/50"}`}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 px-4 sm:px-5 pt-4 pb-3.5">
                  <span className="w-2 h-2 shrink-0 rounded-full bg-accent motion-safe:animate-pulse" />
                  <div className="min-w-0 flex-1" aria-live="polite">
                    {active && (
                      <CmsField id={`sections.heroSlides.${active.index}.caption`} label={`Slide ${active.index + 1} Caption`} section="hero">
                        <span className="block text-sm sm:text-base font-semibold leading-snug">{active.slide.caption}</span>
                      </CmsField>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center gap-2.5 pl-3 pr-1 border-l border-white/15">
                    <Trophy className="h-4 w-4 text-accent shrink-0" />
                    <div className="leading-tight">
                      <div className="text-sm font-bold text-accent">
                        <CmsField id="sections.heroAchievement.value" label="Achievement Badge Value" section="hero">{achievement.value}</CmsField>
                      </div>
                      <div className="text-[11px] text-white/70">
                        <CmsField id="sections.heroAchievement.label" label="Achievement Badge Label" section="hero">{achievement.label}</CmsField>
                      </div>
                    </div>
                  </div>

                  {count > 1 && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={prev}
                        aria-label="Previous slide"
                        className="w-11 h-11 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next slide"
                        className="w-11 h-11 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
