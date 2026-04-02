"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Play, Users, Trophy, GraduationCap, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

const stats = [
  { value: "50,000+", label: "Students Trained", icon: Users },
  { value: "5,000+", label: "Successful Selections", icon: Trophy },
  { value: "200+", label: "Expert Mentors", icon: GraduationCap },
  { value: "15+", label: "Years Experience", icon: Star },
]

const carouselImages = [
  {
    src: "/images/hero/carousel-1.jpg",
    alt: "Defence Academy Training Ground",
    title: "World-Class Training Facilities",
    subtitle: "State-of-the-art GTO ground and physical training infrastructure"
  },
  {
    src: "/images/hero/carousel-2.jpg",
    alt: "Classroom Learning",
    title: "Expert Faculty & Modern Classrooms",
    subtitle: "Learn from experienced military officers and educators"
  },
  {
    src: "/images/hero/carousel-3.jpg",
    alt: "Academy Campus",
    title: "Premium Campus Infrastructure",
    subtitle: "A prestigious environment designed for success"
  },
  {
    src: "/images/hero/carousel-4.jpg",
    alt: "GTO Tasks Training",
    title: "Comprehensive SSB Preparation",
    subtitle: "Real GTO obstacles and group tasks for complete readiness"
  },
]

export function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
  })
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

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
          {/* Left Content - Image Carousel */}
          <div className="space-y-6">
            {/* Image Carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <div className="relative h-[400px] md:h-[450px]">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{image.title}</h3>
                      <p className="text-white/80 text-sm md:text-base">{image.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Badge and Title Below Carousel */}
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5">
                India&apos;s No. 1 Defence Coaching Institute
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                Shape Your Future as a{" "}
                <span className="text-primary">Defence Officer</span>
              </h1>
              
              <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                Join Warriors Defence Academy and transform your dream of serving the nation into reality. 
                Expert coaching for NDA, CDS, AFCAT, SSB, and more.
              </p>
            </div>

            {/* Feature List */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "India's Largest GTO Training Ground",
                "Expert Faculty with Military Background",
                "Comprehensive SSB Interview Preparation",
                "Proven Track Record of Selections",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground/80 text-sm">{feature}</span>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <stat.icon className="h-5 w-5 text-accent" />
                    <span className="text-xl font-bold text-primary">{stat.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
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
