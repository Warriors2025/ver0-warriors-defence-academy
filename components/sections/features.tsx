"use client"

import Image from "next/image"
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
    image: "/images/features/gto-ground.jpg",
  },
  {
    icon: BookOpen,
    title: "Library Facilities",
    description: "Extensive library with NDA, CDS syllabi reference books, practice manuals, and study guides for thorough preparation.",
    image: "/images/features/library.jpg",
  },
  {
    icon: MapPin,
    title: "IMA Dehradun Visits",
    description: "Regular educational trips to Indian Military Academy for real-world exposure and inspiration.",
    image: "/images/features/ima-visit.jpg",
  },
  {
    icon: FileCheck,
    title: "Mock Test Facilities",
    description: "Regular mock exams mirroring actual NDA/CDS papers to track progress and build confidence.",
    image: "/images/features/mock-test.jpg",
  },
  {
    icon: Trophy,
    title: "National Games Facilities",
    description: "Extensive sports and fitness resources to build strength, stamina, and meet rigorous physical standards.",
    image: "/images/features/sports.jpg",
  },
  {
    icon: MessageCircle,
    title: "Spoken English Classes",
    description: "Dedicated English communication classes for group discussions and personal interviews.",
    image: "/images/features/english-class.jpg",
  },
  {
    icon: HelpCircle,
    title: "Doubt Counter Center",
    description: "One-on-one guidance from subject experts to clear doubts and strengthen comprehension.",
    image: "/images/features/doubt-clearing.jpg",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Learn from distinguished military leaders with decades of service and expertise.",
    image: "/images/features/mentorship.jpg",
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
              className="group bg-card hover:shadow-xl transition-all duration-300 border-border overflow-hidden cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/90 flex items-center justify-center mb-2">
                    <feature.icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
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
