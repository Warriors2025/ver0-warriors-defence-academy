"use client"

import Image from "next/image"
import { Quote } from "lucide-react"
import type { DirectorContent } from "@/lib/site-content"
import { defaultSections } from "@/lib/site-content"
import { CmsField } from "@/components/cms/cms-field"
import { HeadingTag } from "@/components/seo/heading-tag"
import type { HeadingLevel } from "@/lib/seo"

type DirectorMessageSectionProps = {
  director?: DirectorContent
  titleLevel?: HeadingLevel
}

export function DirectorMessageSection({
  director = defaultSections.director,
  titleLevel = "h2",
}: DirectorMessageSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <CmsField id="sections.director.eyebrow" label="Director Eyebrow" section="director">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{director.eyebrow}</span>
          </CmsField>
          <HeadingTag level={titleLevel} className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            <CmsField id="sections.director.title" label="Director Section Title" section="director">{director.title}</CmsField>
          </HeadingTag>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={director.image} alt={`${director.name} - ${director.role}`} fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
              <p className="text-2xl font-bold">{director.badgeValue}</p>
              <p className="text-sm">{director.badgeLabel}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Quote className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  <CmsField id="sections.director.name" label="Director Name" section="director">{director.name}</CmsField>
                </h3>
                <p className="text-muted-foreground">
                  <CmsField id="sections.director.role" label="Director Role" section="director">{director.role}</CmsField>
                </p>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {director.paragraphs.map((p, i) => (
                <CmsField key={i} id={`sections.director.paragraphs.${i}`} label={`Director Paragraph ${i + 1}`} section="director" block>
                  <p>{p}</p>
                </CmsField>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-8">
                {director.stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-primary">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
