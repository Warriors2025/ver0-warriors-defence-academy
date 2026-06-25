"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, BookOpen, MapPin, FileCheck, Trophy, MessageCircle, HelpCircle, Users, ArrowRight } from "lucide-react"
import type { FeatureItem } from "@/lib/site-content"
import { defaultSections } from "@/lib/site-content"
import { CmsField } from "@/components/cms/cms-field"

const ICONS = [Building2, BookOpen, MapPin, FileCheck, Trophy, MessageCircle, HelpCircle, Users]

type FeaturesSectionProps = {
  eyebrow?: string
  title?: string
  subtitle?: string
  features?: FeatureItem[]
}

export function FeaturesSection({
  eyebrow = defaultSections.featuresHeader.eyebrow,
  title = defaultSections.featuresHeader.title,
  subtitle = defaultSections.featuresHeader.subtitle,
  features = defaultSections.features,
}: FeaturesSectionProps) {
  const [hero, ...rest] = features

  return (
    <section className="py-20 bg-muted/30 border-y border-border/60">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-14">
          <CmsField id="sections.featuresHeader.eyebrow" label="Features Eyebrow" section="features">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</span>
          </CmsField>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 leading-tight">
            <CmsField id="sections.featuresHeader.title" label="Features Title" section="features" block>{title}</CmsField>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            <CmsField id="sections.featuresHeader.subtitle" label="Features Subtitle" section="features" block>{subtitle}</CmsField>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {hero && (
            <Link href={hero.href} className="relative rounded-2xl overflow-hidden group sm:col-span-2 lg:col-span-2 lg:row-span-2 block focus-visible:ring-2 focus-visible:ring-accent">
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
              <Link key={i} href={f.href} className="relative rounded-2xl overflow-hidden group block focus-visible:ring-2 focus-visible:ring-accent">
                <Image src={f.image} alt={f.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    <CmsField id={`sections.features.${idx}.title`} label={`Feature ${idx + 1} Title`} section="features">{f.title}</CmsField>
                  </h3>
                  <p className="text-white/70 text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CmsField id={`sections.features.${idx}.description`} label={`Feature ${idx + 1} Description`} section="features">{f.description}</CmsField>
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
