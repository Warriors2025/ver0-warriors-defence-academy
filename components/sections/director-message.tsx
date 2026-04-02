"use client"

import Image from "next/image"
import { Quote } from "lucide-react"

export function DirectorMessageSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Director&apos;s Message
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            A Message from Our Director
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Director Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/director.jpg"
                alt="Mr. Gulab Singh - Director, Warriors Defence Academy"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Quote className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Mr. Gulab Singh</h3>
                <p className="text-muted-foreground">Director, Warriors Defence Academy</p>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                In my experience, a successful life starts with the right mindset. If you begin each day with a positive attitude, you build confidence in yourself and you also motivate others. At Warriors Defence Academy, we teach students to stay disciplined, focused, and mentally strong - because these are the qualities needed to become an officer.
              </p>
              <p>
                We train our students to study with a clear goal, improve step by step, and develop leadership, courage, and responsibility. This is how we prepare aspirants for NDA written exams and SSB interviews, and why many students choose us for NDA coaching in India.
              </p>
              <p>
                We are proud of the trust students and parents have in us, and we work every day to maintain high standards in NDA, SSB, and CDS coaching. Our mission is simple: to help you become a confident, capable, and responsible future officer who serves the nation with pride.
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold text-primary">5000+</p>
                  <p className="text-sm text-muted-foreground">Students Trained</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">1200+</p>
                  <p className="text-sm text-muted-foreground">Selections</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
