"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote, Star, User } from "lucide-react"

const successStories = [
  {
    name: "Rahul Sharma",
    achievement: "AIR 15 - NDA 156",
    year: "2024",
    branch: "Indian Army",
    story: "From a small town in UP to achieving AIR 15 in NDA, my journey at Warriors Defence Academy was transformational. The structured approach and dedicated mentors helped me realize my dream.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    achievement: "Selected - CDS",
    year: "2024",
    branch: "Indian Air Force",
    story: "Being a woman in defence was my dream since childhood. Warriors Defence Academy's Women Special Entry program gave me the confidence and preparation I needed.",
    rating: 5,
  },
  {
    name: "Aditya Kumar",
    achievement: "AIR 8 - AFCAT",
    year: "2023",
    branch: "Indian Air Force",
    story: "The mock tests and interview preparation here are unmatched. I was well-prepared for every aspect of the AFCAT exam and AFSB interview.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    achievement: "SSB Recommended",
    year: "2024",
    branch: "Indian Army",
    story: "After two conference outs, the 21-day SSB course was a game changer. The GTO ground training and psychology sessions helped me finally crack it.",
    rating: 5,
  },
]

export function SuccessStoriesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Our Pride, Our Success
          </h2>
          <p className="text-muted-foreground text-lg">
            Read inspiring journeys of our students who turned their defence dreams into reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Quote className="h-10 w-10 text-accent/30 mb-4" />
                
                <p className="text-muted-foreground italic mb-6 leading-relaxed">
                  &quot;{story.story}&quot;
                </p>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.branch}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-accent/10 text-accent border-0">
                      {story.achievement}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{story.year}</p>
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
