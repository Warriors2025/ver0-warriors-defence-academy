"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Play, Users, Trophy, GraduationCap, Star, CheckCircle } from "lucide-react"

const stats = [
  { value: "50,000+", label: "Students Trained", icon: Users },
  { value: "5,000+", label: "Successful Selections", icon: Trophy },
  { value: "200+", label: "Expert Mentors", icon: GraduationCap },
  { value: "15+", label: "Years Experience", icon: Star },
]

export function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
  })

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5">
                India&apos;s No. 1 Defence Coaching Institute
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Shape Your Future as a{" "}
                <span className="text-primary">Defence Officer</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Join Warriors Defence Academy and transform your dream of serving the nation into reality. 
                Expert coaching for NDA, CDS, AFCAT, SSB, and more.
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-3">
              {[
                "India's Largest GTO Training Ground",
                "Expert Faculty with Military Background",
                "Comprehensive SSB Interview Preparation",
                "Proven Track Record of Selections",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/courses">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/5">
                <Play className="h-4 w-4" />
                Watch Campus Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <stat.icon className="h-5 w-5 text-accent" />
                    <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:pl-8">
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="bg-primary p-6">
                <h2 className="text-xl font-semibold text-primary-foreground text-center">
                  Start Your Journey Today
                </h2>
                <p className="text-primary-foreground/80 text-center text-sm mt-1">
                  Get a free counseling session
                </p>
              </div>
              
              <form className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <Input
                    placeholder="Enter your phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Select Course</label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) => setFormData({ ...formData, course: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nda">NDA Course</SelectItem>
                      <SelectItem value="nda-foundation">NDA Foundation</SelectItem>
                      <SelectItem value="cds">CDS Course</SelectItem>
                      <SelectItem value="ssb">SSB Interview</SelectItem>
                      <SelectItem value="afcat">AFCAT Course</SelectItem>
                      <SelectItem value="mns">MNS Course</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12"
                >
                  Get Free Counseling
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our Terms & Conditions
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
