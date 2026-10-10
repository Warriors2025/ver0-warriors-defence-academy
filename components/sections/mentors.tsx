import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Star } from "lucide-react"

import type { Mentor } from "@/lib/mentors-data"

export const branchColors: Record<string, string> = {
  "Indian Army": "text-primary border-primary/30 bg-primary/5",
  "Indian Navy": "text-blue-700 border-blue-300 bg-blue-50",
  "Indian Coast Guard": "text-cyan-700 border-cyan-300 bg-cyan-50",
  "Indian Air Force": "text-sky-700 border-sky-300 bg-sky-50",
}

export function MentorCard({ mentor: m, priority = false }: { mentor: Mentor; priority?: boolean }) {
  const href = `/mentors/${m.slug}`
  return (
    <Card className="group relative gap-0 py-0 overflow-hidden bg-card border-border hover:border-accent/40 hover:shadow-xl hover:-translate-y-1 focus-within:ring-2 focus-within:ring-accent transition-all duration-300">
      {/* Photo (caption is part of the artwork, so keep it uncropped) */}
      <div className="relative aspect-square bg-primary/10">
        {m.image ? (
          <Image
            src={m.image}
            alt={`${m.name} — ${m.designation}, Warriors Defence Academy Lucknow`}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary">
            <span className="text-primary-foreground font-bold text-4xl tracking-wide">{m.initials}</span>
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{m.designation}</span>
          <h3 className="mt-1 font-bold text-foreground text-lg leading-snug">
            <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
              {m.name}
            </Link>
          </h3>
        </div>
        {m.expertise && <p className="text-sm text-muted-foreground leading-relaxed">{m.expertise}</p>}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-[gap] group-hover:gap-2.5"
        >
          Read full profile
          <ArrowRight className="h-4 w-4" />
        </span>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          {m.branch && (
            <Badge
              variant="outline"
              className={`text-xs font-medium ${branchColors[m.branch] ?? "text-foreground border-border"}`}
            >
              {m.branch}
            </Badge>
          )}
          {m.experience && (
            <span className="text-xs font-semibold text-foreground">
              {m.experience} <span className="font-normal text-muted-foreground">of service</span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function MentorsGrid({ mentors, priorityCount = 0 }: { mentors: Mentor[]; priorityCount?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {mentors.map((m, i) => (
        <MentorCard key={m.slug} mentor={m} priority={i < priorityCount} />
      ))}
    </div>
  )
}

export function MentorsTrustSignals() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-accent" />
        <span>All mentors are verified ex-defence officers</span>
      </div>
      <span className="hidden sm:block text-border">|</span>
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-accent fill-accent" />
        <span>190+ years of combined military service</span>
      </div>
    </div>
  )
}

export function MentorsSection({ mentors }: { mentors: Mentor[] }) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Expert Guidance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Distinguished Mentors
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Retired generals, ex-SSB interviewing officers, GTOs and psychologists guiding every
            student towards their commission.
          </p>
        </div>

        <MentorsGrid mentors={mentors} />

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" className="gap-2 cursor-pointer">
            <Link href="/mentors">
              Meet all our mentors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <MentorsTrustSignals />
        </div>
      </div>
    </section>
  )
}
