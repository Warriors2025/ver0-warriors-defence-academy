import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Users, Star, BookOpen, CheckCircle } from "lucide-react"
import { courses } from "@/components/sections/courses"

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
