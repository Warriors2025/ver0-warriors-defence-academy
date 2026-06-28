"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Star } from "lucide-react"

import type { Mentor } from "@/lib/mentors-data"

const mentorsFallback: Mentor[] = [
  {
    name: "Lt. Gen. Dushyant Singh",
    designation: "Chief Mentor",
    expertise: "Strategic Leadership & NDA Preparation",
    experience: "35+ Years",
    branch: "Indian Army",
    initials: "DG",
    image: "/images/mentors/lt-gen-dushyant.webp",
  },
  {
    name: "Cmdr. Sudarshan Chakrapani",
    designation: "Senior Faculty",
    expertise: "Naval Operations & SSB Training",
    experience: "28+ Years",
    branch: "Indian Navy",
    initials: "SC",
    image: "/images/mentors/sudarshan-chakrapani.webp",
  },
  {
    name: "Col. R.K. Tiwari (Retd.)",
    designation: "GTO Expert",
    expertise: "Group Testing & Physical Training",
    experience: "25+ Years",
    branch: "Indian Army",
    initials: "RT",
    image: "/images/mentors/col-tiwari.webp",
  },
  {
    name: "Commandant Yogesh Datta",
    designation: "Training Director",
    expertise: "Officer Grooming & SSB Assessment",
    experience: "22+ Years",
    branch: "Indian Army",
    initials: "YD",
    image: "/images/mentors/yogesh-datta.webp",
  },
  {
    name: "Commander TLP Babu",
    designation: "SSB Mentor",
    expertise: "Psychology & Interview Training",
    experience: "20+ Years",
    branch: "Indian Navy",
    initials: "TB",
    image: "/images/mentors/cmdr-babu.webp",
  },
  {
    name: "Colonel Vijay Chauhan",
    designation: "Academic Mentor",
    expertise: "Written Exam Strategy & Discipline",
    experience: "24+ Years",
    branch: "Indian Army",
    initials: "VC",
    image: "/images/mentors/col-vijay-chauhan.webp",
  },
]

const branchColors: Record<string, string> = {
  "Indian Army": "text-primary border-primary/30 bg-primary/8",
  "Indian Navy": "text-blue-700 border-blue-300 bg-blue-50",
  "Indian Air Force": "text-sky-700 border-sky-300 bg-sky-50",
  "Psychology": "text-purple-700 border-purple-300 bg-purple-50",
}

export function MentorsSection({ mentors: items }: { mentors?: Mentor[] }) {
  const mentors = items ?? mentorsFallback
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
            Retired military officers and defence experts with decades of frontline experience,
            guiding every student towards their commission.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((m, i) => (
            <Card
              key={i}
              className="group bg-card border-border hover:border-accent/40 hover:shadow-xl transition-all duration-300 overflow-hidden pt-0"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden bg-primary/10">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary">
                    <span className="text-primary-foreground font-bold text-4xl tracking-wide">{m.initials}</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white text-lg leading-snug">{m.name}</h3>
                  <Badge
                    variant="outline"
                    className="mt-1.5 text-xs font-medium border bg-white/10 text-white border-white/30 backdrop-blur-sm"
                  >
                    {m.branch}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <Star className="h-4 w-4 text-accent-foreground fill-accent-foreground" />
                </div>
              </div>

              <CardContent className="p-5 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Role</span>
                    <span className="text-xs font-semibold text-foreground text-right">{m.designation}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Experience</span>
                    <span className="text-xs font-semibold text-accent">{m.experience}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">{m.expertise}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom trust signal */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent" />
            <span>All mentors are verified ex-defence officers</span>
          </div>
          <span className="hidden sm:block text-border">|</span>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-accent fill-accent" />
            <span>Combined 200+ years of military service</span>
          </div>
        </div>
      </div>
    </section>
  )
}
