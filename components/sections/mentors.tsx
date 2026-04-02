"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

const mentors = [
  {
    name: "Lt. Gen. Dushyant Singh",
    designation: "Chief Mentor",
    expertise: "Strategic Leadership & NDA Preparation",
    experience: "35+ Years",
    image: null,
  },
  {
    name: "Cmdr. Sudarshan Chakrapani (Retd.)",
    designation: "Senior Faculty",
    expertise: "Naval Operations & SSB Training",
    experience: "28+ Years",
    image: null,
  },
  {
    name: "Col. R.K. Tiwari (Retd.)",
    designation: "GTO Expert",
    expertise: "Group Testing & Physical Training",
    experience: "25+ Years",
    image: null,
  },
  {
    name: "Wg. Cdr. Priya Sharma (Retd.)",
    designation: "AFCAT Specialist",
    expertise: "Air Force Selection & Interview",
    experience: "22+ Years",
    image: null,
  },
  {
    name: "Maj. Gen. A.K. Verma (Retd.)",
    designation: "Academic Director",
    expertise: "Defence Studies & Strategy",
    experience: "30+ Years",
    image: null,
  },
  {
    name: "Dr. Anjali Mishra",
    designation: "Psychology Expert",
    expertise: "SSB Psychology & Personality Development",
    experience: "18+ Years",
    image: null,
  },
]

export function MentorsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Expert Guidance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Meet Our Distinguished Mentors
          </h2>
          <p className="text-muted-foreground text-lg">
            Learn from retired military officers and defence experts who bring decades of experience and invaluable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <Card
              key={index}
              className="group bg-card border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                      {mentor.name}
                    </h3>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-0 mb-2">
                      {mentor.designation}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-2">
                      {mentor.expertise}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {mentor.experience} Experience
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
