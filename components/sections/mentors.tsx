"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Star } from "lucide-react"

const mentors = [
  {
    name: "Lt. Gen. Dushyant Singh",
    designation: "Chief Mentor",
    expertise: "Strategic Leadership & NDA Preparation",
    experience: "35+ Years",
    branch: "Indian Army",
    initials: "DG",
  },
  {
    name: "Cmdr. Sudarshan Chakrapani",
    designation: "Senior Faculty",
    expertise: "Naval Operations & SSB Training",
    experience: "28+ Years",
    branch: "Indian Navy",
    initials: "SC",
  },
  {
    name: "Col. R.K. Tiwari (Retd.)",
    designation: "GTO Expert",
    expertise: "Group Testing & Physical Training",
    experience: "25+ Years",
    branch: "Indian Army",
    initials: "RT",
  },
  {
    name: "Wg. Cdr. Priya Sharma",
    designation: "AFCAT Specialist",
    expertise: "Air Force Selection & Interview",
    experience: "22+ Years",
    branch: "Indian Air Force",
    initials: "PS",
  },
  {
    name: "Maj. Gen. A.K. Verma (Retd.)",
    designation: "Academic Director",
    expertise: "Defence Studies & Strategy",
    experience: "30+ Years",
    branch: "Indian Army",
    initials: "AV",
  },
  {
    name: "Dr. Anjali Mishra",
    designation: "Psychology Expert",
    expertise: "SSB Psychology & Personality Development",
    experience: "18+ Years",
    branch: "Psychology",
    initials: "AM",
  },
]

const branchColors: Record<string, string> = {
  "Indian Army": "text-primary border-primary/30 bg-primary/8",
  "Indian Navy": "text-blue-700 border-blue-300 bg-blue-50",
  "Indian Air Force": "text-sky-700 border-sky-300 bg-sky-50",
  "Psychology": "text-purple-700 border-purple-300 bg-purple-50",
}

export function MentorsSection() {
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
              className="group bg-card border-border hover:border-accent/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary/60 via-accent to-primary/60" />

              <CardContent className="p-6">
                <div className="flex items-start gap-4">

                  {/* Avatar with initials */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-primary-foreground font-bold text-lg tracking-wide">{m.initials}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <Star className="h-2.5 w-2.5 text-accent-foreground fill-accent-foreground" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground leading-snug line-clamp-2">{m.name}</h3>
                    <Badge
                      variant="outline"
                      className={`mt-1.5 text-xs font-medium border ${branchColors[m.branch] ?? ""}`}
                    >
                      {m.branch}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Role</span>
                    <span className="text-xs font-semibold text-foreground">{m.designation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Experience</span>
                    <span className="text-xs font-semibold text-accent">{m.experience}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1 leading-relaxed">{m.expertise}</p>
                </div>
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
