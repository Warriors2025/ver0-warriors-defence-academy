import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Users, Star, CheckCircle } from "lucide-react"

const courses = [
  {
    id: "nda-foundation",
    title: "NDA Foundation Course",
    description: "An integrated program for students starting NDA preparation after Class 10. Combines regular schooling with intensive coaching, hostel facilities, and comprehensive physical training to build a strong foundation for defence careers.",
    duration: "2-3 Years",
    students: "500+",
    rating: 4.9,
    image: "/images/courses/nda-foundation.jpg",
    badge: "Popular",
    features: ["Integrated Schooling + NDA Prep", "Hostel Facility Available", "Daily Physical Training", "SSB Grooming from Day 1"],
    href: "/courses/nda-foundation",
  },
  {
    id: "nda",
    title: "NDA Course",
    description: "Complete preparation for NDA written examination covering Mathematics and GAT with extensive mock tests. Includes SSB interview preparation and physical fitness training by experienced military faculty.",
    duration: "6-12 Months",
    students: "2000+",
    rating: 4.8,
    image: "/images/courses/nda.jpg",
    badge: "Best Seller",
    features: ["Written Exam Preparation", "SSB Interview Training", "Weekly Mock Tests", "Physical Fitness Program"],
    href: "/courses/nda",
  },
  {
    id: "cds",
    title: "CDS Course",
    description: "Structured program for graduates preparing for Combined Defence Services examination. Covers English, GK, and Mathematics with daily current affairs updates and comprehensive test series.",
    duration: "6 Months",
    students: "1500+",
    rating: 4.8,
    image: "/images/courses/cds.jpg",
    badge: null,
    features: ["Complete Syllabus Coverage", "Daily Current Affairs", "Previous Year Analysis", "SSB Interview Prep"],
    href: "/courses/cds",
  },
  {
    id: "ssb",
    title: "SSB Interview Training",
    description: "Intensive 21-day SSB preparation program covering all aspects including psychological tests, GTO tasks, and personal interviews. Training by ex-SSB board members on actual GTO obstacles.",
    duration: "21 Days",
    students: "3000+",
    rating: 4.9,
    image: "/images/courses/ssb.jpg",
    badge: "Top Rated",
    features: ["Psychology Test Training", "Live GTO Tasks", "Mock SSB Interviews", "OLQ Development"],
    href: "/courses/ssb",
  },
  {
    id: "afcat",
    title: "AFCAT Course",
    description: "Specialized preparation for Air Force Common Admission Test covering all sections. Includes AFSB interview coaching, EKT preparation for technical candidates, and aviation knowledge sessions.",
    duration: "4-6 Months",
    students: "800+",
    rating: 4.7,
    image: "/images/courses/afcat.jpg",
    badge: null,
    features: ["Complete AFCAT Syllabus", "AFSB Interview Prep", "EKT for Technical", "Physical Fitness"],
    href: "/courses/afcat",
  },
  {
    id: "navy-agniveer",
    title: "Indian Navy Agniveer",
    description: "Expert coaching for Navy SSR/AA examination with focused preparation for written test, physical fitness training, swimming sessions, and complete guidance through the recruitment process.",
    duration: "3-4 Months",
    students: "600+",
    rating: 4.7,
    image: "/images/courses/navy.jpg",
    badge: "New",
    features: ["Written Exam Coaching", "Physical Training", "Swimming Sessions", "Medical Guidance"],
    href: "/courses/navy",
  },
  {
    id: "airforce-xy",
    title: "Airforce X/Y Group",
    description: "Structured coaching for Indian Air Force X (Technical) and Y (Non-Technical) Group examinations with separate batches and specialized faculty for each stream.",
    duration: "4-6 Months",
    students: "700+",
    rating: 4.6,
    image: "/images/courses/airforce.jpg",
    badge: null,
    features: ["X Group Technical Prep", "Y Group Non-Tech", "Physical Fitness", "Regular Assessments"],
    href: "/courses/afcat",
  },
  {
    id: "mns",
    title: "MNS Course",
    description: "Complete preparation for Military Nursing Service examination for female candidates. Covers science subjects, English, and includes personality development and interview preparation.",
    duration: "3-6 Months",
    students: "400+",
    rating: 4.8,
    image: "/images/courses/mns.jpg",
    badge: "For Women",
    features: ["Science Subjects", "English Preparation", "Interview Training", "Personality Development"],
    href: "/courses/mns",
  },
  {
    id: "territorial-army",
    title: "Territorial Army",
    description: "Preparation for Territorial Army Officer recruitment designed for working professionals. Weekend batches and flexible timing with comprehensive SSB training included.",
    duration: "3 Months",
    students: "400+",
    rating: 4.8,
    image: "/images/courses/cds.jpg",
    badge: "Working Professionals",
    features: ["Weekend Batches", "Flexible Timing", "SSB Training", "Online Support"],
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
              Each program is crafted by experienced military officers to maximize your chances of selection.
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
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
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
            Our counselors can help you choose the perfect program based on your goals, eligibility, and career aspirations.
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
