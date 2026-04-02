"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Users, Star, BookOpen } from "lucide-react"

export const courses = [
  {
    id: "nda-foundation",
    title: "NDA Foundation Course",
    description: "Integrated program for students starting NDA preparation after Class 10 with schooling and hostel facilities.",
    duration: "2-3 Years",
    students: "500+",
    rating: 4.9,
    image: "/courses/nda-foundation.jpg",
    badge: "Popular",
    features: ["Schooling + NDA Prep", "Hostel Facility", "Physical Training", "SSB Preparation"],
    href: "/courses/nda-foundation",
  },
  {
    id: "nda",
    title: "NDA Course",
    description: "Complete preparation for NDA written exam and SSB interview with expert guidance and modern facilities.",
    duration: "6-12 Months",
    students: "2000+",
    rating: 4.8,
    image: "/courses/nda.jpg",
    badge: "Best Seller",
    features: ["Written Exam Prep", "SSB Training", "Mock Tests", "Physical Fitness"],
    href: "/courses/nda",
  },
  {
    id: "cds",
    title: "CDS Course",
    description: "Structured program to help candidates pass CDS examination with focused subject preparation.",
    duration: "6 Months",
    students: "1500+",
    rating: 4.8,
    image: "/courses/cds.jpg",
    badge: null,
    features: ["Complete Syllabus", "Personal Guidance", "Practice Tests", "Interview Prep"],
    href: "/courses/cds",
  },
  {
    id: "ssb",
    title: "SSB Interview Training",
    description: "Comprehensive SSB preparation covering psychological tests, GTO tasks, and personal interviews.",
    duration: "21 Days",
    students: "3000+",
    rating: 4.9,
    image: "/courses/ssb.jpg",
    badge: "Top Rated",
    features: ["Psychology Tests", "GTO Tasks", "Mock Interviews", "Personality Development"],
    href: "/courses/ssb",
  },
  {
    id: "afcat",
    title: "AFCAT Course",
    description: "Step-by-step preparation for Air Force Common Admission Test with experienced mentors.",
    duration: "4-6 Months",
    students: "800+",
    rating: 4.7,
    image: "/courses/afcat.jpg",
    badge: null,
    features: ["AFCAT Syllabus", "AFSB Training", "Physical Training", "Mock Tests"],
    href: "/courses/afcat",
  },
  {
    id: "navy-agniveer",
    title: "Indian Navy Agniveer",
    description: "Expert coaching for Navy SSR/AA examination with comprehensive practice and guidance.",
    duration: "3-4 Months",
    students: "600+",
    rating: 4.7,
    image: "/courses/navy.jpg",
    badge: "New",
    features: ["Written Exam", "Physical Tests", "Medical Preparation", "Documentation"],
    href: "/courses/navy-agniveer",
  },
  {
    id: "airforce-xy",
    title: "Airforce X/Y Group",
    description: "Structured coaching for Indian Air Force X and Y Group examinations.",
    duration: "4-6 Months",
    students: "700+",
    rating: 4.6,
    image: "/courses/airforce.jpg",
    badge: null,
    features: ["Technical Training", "Non-Tech Prep", "Physical Fitness", "Mock Tests"],
    href: "/courses/airforce-xy",
  },
  {
    id: "mns",
    title: "MNS Course",
    description: "Complete preparation for Military Nursing Service examination and interview.",
    duration: "3-6 Months",
    students: "400+",
    rating: 4.8,
    image: "/courses/mns.jpg",
    badge: "For Women",
    features: ["NEET Preparation", "MNS Written", "Interview Training", "Medical Knowledge"],
    href: "/courses/mns",
  },
]

export function CoursesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Comprehensive Defence Courses
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose from our range of expertly designed courses tailored for every defence examination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.slice(0, 8).map((course) => (
            <Card
              key={course.id}
              className="group bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <CardHeader className="p-0 relative">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary/40" />
                </div>
                {course.badge && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    {course.badge}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="p-5 flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent fill-accent" />
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-xs text-muted-foreground">rating</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-5 pt-0">
                <Link href={course.href} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View All Courses
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
