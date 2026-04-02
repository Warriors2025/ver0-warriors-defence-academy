import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Users, Star, BookOpen, CheckCircle } from "lucide-react"
const courses = [
  {
    id: "nda-foundation",
    title: "NDA Foundation Course",
    description: "Integrated program for students starting NDA preparation after Class 10 with schooling and hostel facilities.",
    duration: "2-3 Years",
    students: "500+",
    rating: 4.9,
    badge: "Popular",
    features: ["Schooling + NDA Prep", "Hostel Facility", "Physical Training", "SSB Preparation"],
    href: "/courses/nda",
  },
  {
    id: "nda",
    title: "NDA Course",
    description: "Complete preparation for NDA written exam and SSB interview with expert guidance and modern facilities.",
    duration: "6-12 Months",
    students: "2000+",
    rating: 4.8,
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
    badge: "New",
    features: ["Written Exam", "Physical Tests", "Medical Preparation", "Documentation"],
    href: "/courses/navy",
  },
  {
    id: "airforce-xy",
    title: "Airforce X/Y Group",
    description: "Structured coaching for Indian Air Force X and Y Group examinations.",
    duration: "4-6 Months",
    students: "700+",
    rating: 4.6,
    badge: null,
    features: ["Technical Training", "Non-Tech Prep", "Physical Fitness", "Mock Tests"],
    href: "/courses/afcat",
  },
  {
    id: "territorial-army",
    title: "Territorial Army",
    description: "Preparation for Territorial Army Officer recruitment for working professionals.",
    duration: "3 Months",
    students: "400+",
    rating: 4.8,
    badge: null,
    features: ["Weekend Batches", "SSB Training", "Flexible Timing", "Online Support"],
    href: "/courses/territorial-army",
  },
]

export const metadata = {
  title: "Our Courses | Warriors Defence Academy",
  description: "Explore our comprehensive defence courses including NDA, CDS, AFCAT, SSB, and MNS preparation programs.",
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Page Header */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-0 mb-4">
              Our Programs
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Defence Preparation Courses
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Choose from our expertly designed courses for NDA, CDS, AFCAT, SSB, and more. 
              Each program is crafted to maximize your chances of selection.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="group bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <CardHeader className="p-0 relative">
                  <div className="h-52 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-primary/40" />
                  </div>
                  {course.badge && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                      {course.badge}
                    </Badge>
                  )}
                </CardHeader>
                
                <CardContent className="p-6 flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
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
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Link href={course.href} className="w-full">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      View Course Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Not sure which course is right for you?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our counselors can help you choose the perfect program based on your goals and eligibility.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Free Counseling
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
