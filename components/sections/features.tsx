"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, BookOpen, MapPin, FileCheck, Trophy, MessageCircle, HelpCircle, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FeatureItem } from "@/lib/site-content"
import { defaultSections } from "@/lib/site-content"
import { getFacilityHref } from "@/lib/facilities-data"
import { CmsField } from "@/components/cms/cms-field"
import { HeadingTag } from "@/components/seo/heading-tag"
import type { HeadingLevel } from "@/lib/seo"

const ICONS = [Building2, BookOpen, MapPin, FileCheck, Trophy, MessageCircle, HelpCircle, Users]

type FeaturesSectionProps = {
  eyebrow?: string
  title?: string
  subtitle?: string
  features?: FeatureItem[]
  titleLevel?: HeadingLevel
}

export function FeaturesSection({
  eyebrow = defaultSections.featuresHeader.eyebrow,
  title = defaultSections.featuresHeader.title,
  subtitle = defaultSections.featuresHeader.subtitle,
  features = defaultSections.features,
  titleLevel = "h2",
}: FeaturesSectionProps) {
  const [hero, ...rest] = features

  return (
    <section className="py-20 bg-muted/30 border-y border-border/60">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <CmsField id="sections.featuresHeader.eyebrow" label="Features Eyebrow" section="features">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</span>
            </CmsField>
            <HeadingTag level={titleLevel} className="text-3xl md:text-4xl font-bold text-foreground mt-3 leading-tight">
              <CmsField id="sections.featuresHeader.title" label="Features Title" section="features">{title}</CmsField>
            </HeadingTag>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              <CmsField id="sections.featuresHeader.subtitle" label="Features Subtitle" section="features" block>{subtitle}</CmsField>
            </p>
          </div>
          <Link href="/facilities" className="shrink-0">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Building2 className="h-4 w-4" />
              Explore Campus
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {hero && (
            <Link href={getFacilityHref(hero)} className="relative rounded-2xl overflow-hidden group sm:col-span-2 lg:col-span-2 lg:row-span-2 block focus-visible:ring-2 focus-visible:ring-accent">
              <Image src={hero.image} alt={hero.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="inline-flex w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 items-center justify-center mb-3">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  <CmsField id="sections.features.0.title" label="Feature 1 Title" section="features">{hero.title}</CmsField>
                </h3>
                <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
                  <CmsField id="sections.features.0.description" label="Feature 1 Description" section="features">{hero.description}</CmsField>
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                  See campus <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          )}

          {rest.map((f, i) => {
            const idx = i + 1
            const Icon = ICONS[(i + 1) % ICONS.length]
            return (
              <Link key={i} href={getFacilityHref(f)} className="relative rounded-2xl overflow-hidden group block focus-visible:ring-2 focus-visible:ring-accent">
                <Image src={f.image} alt={f.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    <CmsField id={`sections.features.${idx}.title`} label={`Feature ${idx + 1} Title`} section="features">{f.title}</CmsField>
                  </h3>
                  <p className="text-white/70 text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-sm:opacity-100">
                    <CmsField id={`sections.features.${idx}.description`} label={`Feature ${idx + 1} Description`} section="features">{f.description}</CmsField>
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-accent text-xs font-semibold group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/facilities">
            <Button size="lg" className="gap-2">
              View All Facilities
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
