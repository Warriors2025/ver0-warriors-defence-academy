"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Quote, ChevronLeft, ChevronRight, Star, User } from "lucide-react"

const testimonialsFallback = [
  {
    name: "Rahul Sharma",
    achievement: "AIR 15 - NDA 156",
    course: "NDA Course",
    content: "Warriors Defence Academy transformed my preparation journey. The structured approach, expert guidance, and comprehensive SSB training helped me achieve my dream of joining the Indian Army. The mentors here truly understand what it takes to succeed.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    achievement: "Selected - CDS",
    course: "CDS Course",
    content: "As a female aspirant, I was initially worried about finding the right coaching. But Warriors Defence Academy provided equal opportunities and personalized attention. Their Women Special Entry program is exceptional.",
    rating: 5,
  },
  {
    name: "Aditya Kumar",
    achievement: "AIR 8 - AFCAT",
    course: "AFCAT Course",
    content: "The mock tests and interview preparation at Warriors Defence Academy are unmatched. I was well-prepared for every aspect of the AFCAT exam and AFSB interview. Highly recommended for Air Force aspirants.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    achievement: "Selected - MNS",
    course: "MNS Course",
    content: "The MNS course here covers everything from NEET preparation to the final interview. The medical experts and psychology training helped me understand what the selection board looks for.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    achievement: "SSB Recommended",
    course: "SSB Interview",
    content: "After two conference outs, I joined Warriors Defence Academy's 21-day SSB course. The GTO ground training and psychology sessions were game changers. Got recommended in my third attempt!",
    rating: 5,
  },
  {
    name: "Anjali Verma",
    achievement: "AIR 23 - NDA",
    course: "NDA Foundation",
    content: "Starting NDA preparation after Class 10 at this academy was the best decision. The integrated schooling program helped me balance academics with defence preparation seamlessly.",
    rating: 5,
  },
]

import type { Testimonial } from "@/lib/testimonials"

export function TestimonialsSection({ testimonials: items }: { testimonials?: Testimonial[] }) {
  const testimonials = items ?? testimonialsFallback
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - itemsPerPage) : prev - itemsPerPage
    )
  }

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-balance">
              What Our Students Say
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Hear from our successful candidates who turned their defence dreams into reality.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(currentIndex, currentIndex + itemsPerPage).map((testimonial, index) => (
            <Card
              key={index}
              className="bg-primary-foreground/5 border-primary-foreground/10 backdrop-blur"
            >
              <CardContent className="p-6">
                <Quote className="h-10 w-10 text-accent mb-4" />
                
                <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-primary-foreground/10">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground">
                      {testimonial.name}
                    </h4>
                    <Badge className="bg-accent/20 text-accent border-0 mt-1">
                      {testimonial.achievement}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(Math.ceil(testimonials.length / itemsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? "bg-accent"
                  : "bg-primary-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
