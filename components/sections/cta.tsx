"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Calendar } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Begin Your Defence Career?
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful officers who started their journey with Warriors Defence Academy. Your dream of serving the nation is just one step away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-14 px-8 text-lg"
              >
                Enroll Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 h-14 px-8 text-lg"
              >
                <Calendar className="h-5 w-5" />
                Schedule a Visit
              </Button>
            </Link>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-accent" />
              <span>Call us: <a href="tel:+919876543210" className="text-accent hover:underline">+91 98765 43210</a></span>
            </div>
            <span className="hidden sm:block">|</span>
            <span>Admissions Open for 2026-27 Batch</span>
          </div>
        </div>
      </div>
    </section>
  )
}
