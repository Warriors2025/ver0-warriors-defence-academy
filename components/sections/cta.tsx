"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Calendar, Shield } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden bg-primary text-primary-foreground">
      {/* Diagonal stripe texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
        backgroundSize: "20px 20px",
      }} />

      {/* Gold accent borders */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Large shield watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
        <Shield className="h-96 w-96 text-primary-foreground" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-semibold uppercase tracking-widest">
              Admissions Open 2026–27
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Ready to Begin Your{" "}
            <span className="text-accent">Defence Career?</span>
          </h2>

          <p className="text-primary-foreground/75 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join thousands of officers who started their journey here.
            Your dream of serving the nation is one step away.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground h-13 px-8 text-base font-semibold gap-2 shadow-lg shadow-black/20 min-h-[48px]"
              >
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 h-13 px-8 text-base font-semibold gap-2 min-h-[48px]"
              >
                <Calendar className="h-4 w-4" />
                Schedule a Campus Visit
              </Button>
            </Link>
          </div>

          {/* Contact strip */}
          <div className="mt-10 pt-8 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-primary-foreground/70">
            <a
              href="tel:+919452245729"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4 text-accent" />
              +91 94522 45729
            </a>
            <span className="hidden sm:block text-primary-foreground/25">|</span>
            <a
              href="tel:+917081011964"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4 text-accent" />
              +91 70810 11964
            </a>
            <span className="hidden sm:block text-primary-foreground/25">|</span>
            <span>Mon – Sat, 9 AM – 6 PM</span>
          </div>
        </div>
      </div>
    </section>
  )
}
