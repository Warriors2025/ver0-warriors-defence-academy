"use client"

import { 
  Building2, 
  BookOpen, 
  MapPin, 
  FileCheck, 
  Trophy, 
  MessageCircle, 
  HelpCircle,
  Users
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Building2,
    title: "Largest GTO Ground",
    description: "India's largest GTO training ground with modern facilities for comprehensive physical and tactical preparation.",
  },
  {
    icon: BookOpen,
    title: "Library Facilities",
    description: "Extensive library with NDA, CDS syllabi reference books, practice manuals, and study guides for thorough preparation.",
  },
  {
    icon: MapPin,
    title: "IMA Dehradun Visits",
    description: "Regular educational trips to Indian Military Academy for real-world exposure and inspiration.",
  },
  {
    icon: FileCheck,
    title: "Mock Test Facilities",
    description: "Regular mock exams mirroring actual NDA/CDS papers to track progress and build confidence.",
  },
  {
    icon: Trophy,
    title: "National Games Facilities",
    description: "Extensive sports and fitness resources to build strength, stamina, and meet rigorous physical standards.",
  },
  {
    icon: MessageCircle,
    title: "Spoken English Classes",
    description: "Dedicated English communication classes for group discussions and personal interviews.",
  },
  {
    icon: HelpCircle,
    title: "Doubt Counter Center",
    description: "One-on-one guidance from subject experts to clear doubts and strengthen comprehension.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Learn from distinguished military leaders with decades of service and expertise.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Facilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Why Choose Warriors Defence Academy
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide world-class facilities and comprehensive training to prepare you for every aspect of defence examinations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-card hover:bg-primary hover:shadow-xl transition-all duration-300 border-border hover:border-primary cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 group-hover:bg-primary-foreground/20 flex items-center justify-center mb-4 transition-colors">
                  <feature.icon className="h-7 w-7 text-accent group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary-foreground mb-2 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-primary-foreground/80 text-sm leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
