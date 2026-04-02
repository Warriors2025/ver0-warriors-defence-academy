"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Users, Star, CheckCircle } from "lucide-react"

export const courses = [
  {
    id: "nda-foundation",
    title: "NDA Foundation Course",
    description: "An integrated program designed for students starting their NDA preparation journey after Class 10. This comprehensive course combines regular schooling with intensive NDA coaching, offering hostel facilities and a structured daily routine that includes academics, physical training, and personality development. Students receive focused attention from experienced faculty members who guide them through the complete NDA syllabus while ensuring they excel in their board examinations.",
    shortDescription: "Integrated schooling + NDA prep program for Class 10 students with hostel facility.",
    duration: "2-3 Years",
    students: "500+",
    rating: 4.9,
    image: "/images/courses/nda-foundation.jpg",
    badge: "Popular",
    features: ["Integrated Schooling", "Hostel Facility", "Physical Training", "SSB Grooming", "Personality Development", "Board Exam Support"],
    highlights: [
      "Combined Class 11 & 12 with NDA preparation",
      "Daily physical training and sports activities",
      "Regular mock tests and assessments",
      "Dedicated mentors for each student"
    ],
    href: "/courses/nda-foundation",
  },
  {
    id: "nda",
    title: "NDA Course",
    description: "Our flagship NDA preparation program offers comprehensive coaching for the National Defence Academy written examination and subsequent SSB interview. The course covers Mathematics, General Ability Test (English, GK, Physics, Chemistry, Geography, History), and includes extensive practice through mock tests. Students benefit from our experienced faculty of ex-defence officers who provide insights into the examination pattern and effective preparation strategies.",
    shortDescription: "Complete NDA written exam and SSB interview preparation with expert guidance.",
    duration: "6-12 Months",
    students: "2000+",
    rating: 4.8,
    image: "/images/courses/nda.jpg",
    badge: "Best Seller",
    features: ["Written Exam Prep", "SSB Training", "Mock Tests", "Physical Fitness", "GK Updates", "Interview Skills"],
    highlights: [
      "Complete syllabus coverage for NDA written exam",
      "Weekly mock tests with detailed analysis",
      "Physical fitness training included",
      "SSB interview preparation module"
    ],
    href: "/courses/nda",
  },
  {
    id: "cds",
    title: "CDS Course",
    description: "A structured program designed specifically for graduate candidates preparing for the Combined Defence Services Examination. Our CDS course covers English, General Knowledge, and Elementary Mathematics with a focus on exam-oriented preparation. The faculty includes subject matter experts who break down complex topics into easily understandable concepts, ensuring students build a strong foundation for both the written exam and the subsequent SSB interview.",
    shortDescription: "Structured CDS exam preparation for graduates with focused subject coaching.",
    duration: "6 Months",
    students: "1500+",
    rating: 4.8,
    image: "/images/courses/cds.jpg",
    badge: null,
    features: ["Complete Syllabus", "Personal Guidance", "Practice Tests", "Current Affairs", "Essay Writing", "Interview Prep"],
    highlights: [
      "Comprehensive coverage of all three papers",
      "Daily current affairs and GK updates",
      "Previous year paper analysis",
      "One-on-one doubt clearing sessions"
    ],
    href: "/courses/cds",
  },
  {
    id: "ssb",
    title: "SSB Interview Training",
    description: "Our comprehensive SSB Interview preparation program is designed to develop the Officer Like Qualities (OLQs) required to clear the Services Selection Board. The 21-day intensive course covers all aspects of the 5-day SSB process including Screening Test, Psychological Tests (TAT, WAT, SRT, SD), Group Testing Officer Tasks (GD, GPE, PGT, HGT, Command Task, FGT), and Personal Interview. Training is conducted by ex-SSB board members and psychologists.",
    shortDescription: "Intensive 21-day SSB preparation covering psychology, GTO, and interview.",
    duration: "21 Days",
    students: "3000+",
    rating: 4.9,
    image: "/images/courses/ssb.jpg",
    badge: "Top Rated",
    features: ["Psychology Tests", "GTO Tasks", "Mock Interviews", "Personality Development", "OLQ Building", "Conference Prep"],
    highlights: [
      "Training by ex-SSB board members",
      "Live GTO tasks on actual obstacles",
      "Multiple mock SSB sessions",
      "Individual feedback and improvement plan"
    ],
    href: "/courses/ssb",
  },
  {
    id: "afcat",
    title: "AFCAT Course",
    description: "Our Air Force Common Admission Test preparation course offers specialized coaching for aspiring Indian Air Force officers. The program covers General Awareness, Verbal Ability, Numerical Ability, Reasoning & Military Aptitude. Students also receive guidance for the AFSB interview process including EKT (Engineering Knowledge Test) preparation for technical candidates. Physical fitness training ensures students meet the rigorous standards of the Indian Air Force.",
    shortDescription: "Complete AFCAT exam and AFSB interview preparation for IAF aspirants.",
    duration: "4-6 Months",
    students: "800+",
    rating: 4.7,
    image: "/images/courses/afcat.jpg",
    badge: null,
    features: ["AFCAT Syllabus", "AFSB Training", "Physical Training", "EKT Preparation", "Aptitude Tests", "Mock Tests"],
    highlights: [
      "Complete AFCAT syllabus coverage",
      "EKT preparation for technical branches",
      "AFSB interview coaching",
      "Aviation knowledge sessions"
    ],
    href: "/courses/afcat",
  },
  {
    id: "navy-agniveer",
    title: "Indian Navy Agniveer",
    description: "Expert coaching program for the Indian Navy Agniveer SSR (Senior Secondary Recruit) and AA (Artificer Apprentice) examinations. Our course provides comprehensive preparation for the written test covering English, Science, Mathematics, and General Knowledge. Students also receive physical fitness training to meet Navy standards, guidance for the medical examination, and document verification support throughout the recruitment process.",
    shortDescription: "Complete Navy SSR/AA exam preparation with physical training support.",
    duration: "3-4 Months",
    students: "600+",
    rating: 4.7,
    image: "/images/courses/navy.jpg",
    badge: "New",
    features: ["Written Exam", "Physical Tests", "Medical Guidance", "Documentation", "Swimming Training", "Mock Tests"],
    highlights: [
      "Navy exam pattern focused preparation",
      "Physical fitness as per Navy standards",
      "Swimming training available",
      "Complete recruitment guidance"
    ],
    href: "/courses/navy",
  },
  {
    id: "airforce-xy",
    title: "Airforce X/Y Group",
    description: "Structured coaching program for the Indian Air Force X (Technical) and Y (Non-Technical) Group examinations. The course covers English, Physics, Mathematics for X Group, and Reasoning & General Awareness for Y Group. Our experienced faculty provides exam-focused preparation with regular practice tests and doubt-clearing sessions. Physical training ensures students meet the strict fitness requirements of the Indian Air Force.",
    shortDescription: "IAF X/Y Group exam coaching with technical and non-technical preparation.",
    duration: "4-6 Months",
    students: "700+",
    rating: 4.6,
    image: "/images/courses/airforce.jpg",
    badge: null,
    features: ["Technical Training", "Non-Tech Prep", "Physical Fitness", "Mock Tests", "Reasoning Skills", "GK Updates"],
    highlights: [
      "Separate batches for X and Y groups",
      "Technical subjects by expert faculty",
      "Regular assessment and feedback",
      "Physical training included"
    ],
    href: "/courses/afcat",
  },
  {
    id: "mns",
    title: "MNS Course",
    description: "Complete preparation program for Military Nursing Service examination for female candidates. Our MNS course covers the written examination including General English, Biology, Physics, Chemistry, and General Intelligence. The program also includes personality development, interview preparation, and guidance for the medical examination. Experienced faculty provide focused coaching to help candidates secure positions in the prestigious Indian Army nursing corps.",
    shortDescription: "Military Nursing Service exam and interview preparation for female candidates.",
    duration: "3-6 Months",
    students: "400+",
    rating: 4.8,
    image: "/images/courses/mns.jpg",
    badge: "For Women",
    features: ["Science Subjects", "English Prep", "Interview Training", "Medical Knowledge", "Personality Dev", "Mock Tests"],
    highlights: [
      "NEET-based syllabus coverage",
      "Female faculty available",
      "Interview and personality grooming",
      "Complete admission guidance"
    ],
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
            Each program is crafted by experienced military officers and educators to maximize your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.slice(0, 8).map((course) => (
            <Card
              key={course.id}
              className="group bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <CardHeader className="p-0 relative">
                <div className="relative h-48 overflow-hidden">
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
              
              <CardContent className="p-5 flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {course.shortDescription}
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

                {/* Course Highlights */}
                <div className="space-y-2 mb-4">
                  {course.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
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
