"use client"

import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Shield } from "lucide-react"
import type { CtaContent } from "@/lib/site-content"
import { defaultSections, defaultContent } from "@/lib/site-content"
import { CmsField } from "@/components/cms/cms-field"
import { HeadingTag } from "@/components/seo/heading-tag"
import type { HeadingLevel } from "@/lib/seo"
import { SITE_PHONE_TEL, siteWhatsAppHref } from "@/lib/cta"

type CTASectionProps = {
  cta?: CtaContent
  phone1?: string
  phone2?: string
  titleLevel?: HeadingLevel
}

function isHttp(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
}

export function CTASection({
  cta = defaultSections.cta,
  phone1 = defaultContent.contact.phone1,
  phone2 = defaultContent.contact.phone2,
  titleLevel = "h2",
}: CTASectionProps) {
  const primaryHref =
    !cta.primaryHref || cta.primaryHref.includes("/register")
      ? SITE_PHONE_TEL
      : cta.primaryHref
  const secondaryHref =
    !cta.secondaryHref ||
    cta.secondaryHref.includes("/register") ||
    cta.secondaryHref === "/contact"
      ? siteWhatsAppHref()
      : cta.secondaryHref

  const primaryLabel = cta.primaryLabel === "Enroll Now" ? "Call Now" : cta.primaryLabel
  const secondaryLabel =
    cta.secondaryLabel === "Schedule a Campus Visit" ? "WhatsApp Us" : cta.secondaryLabel

  return (
    <section className="relative py-24 overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
        backgroundSize: "20px 20px",
      }} />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
        <Shield className="h-96 w-96 text-primary-foreground" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <CmsField id="sections.cta.eyebrow" label="CTA Eyebrow" section="cta">
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">{cta.eyebrow}</span>
            </CmsField>
          </div>

          <HeadingTag level={titleLevel} className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            <CmsField id="sections.cta.title" label="CTA Title" section="cta">{cta.title}</CmsField>{" "}
            <span className="text-accent">
              <CmsField id="sections.cta.highlight" label="CTA Highlight" section="cta">{cta.highlight}</CmsField>
            </span>
          </HeadingTag>

          <p className="text-primary-foreground/75 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            <CmsField id="sections.cta.subtitle" label="CTA Subtitle" section="cta" block>{cta.subtitle}</CmsField>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={primaryHref}>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-13 px-8 text-base font-semibold gap-2 shadow-lg shadow-black/20 min-h-[48px] cursor-pointer">
                <Phone className="h-4 w-4" />
                {primaryLabel}
              </Button>
            </a>
            <a
              href={secondaryHref}
              {...(isHttp(secondaryHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Button size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground h-13 px-8 text-base font-semibold gap-2 min-h-[48px] cursor-pointer">
                <MessageCircle className="h-4 w-4" />
                {secondaryLabel}
              </Button>
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-primary-foreground/70">
            <a href={`tel:${phone1.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4 text-accent" />{phone1}
            </a>
            <span className="hidden sm:block text-primary-foreground/25">|</span>
            <a href={`tel:${phone2.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4 text-accent" />{phone2}
            </a>
            <span className="hidden sm:block text-primary-foreground/25">|</span>
            <span>{cta.hours}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
