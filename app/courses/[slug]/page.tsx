import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Clock,
  Users,
  Star,
  CheckCircle,
  Calendar,
  BookOpen,
  Target,
  Award,
  FileText,
  GraduationCap,
} from "lucide-react"

const courseDetails: Record<string, {
  id: string
  title: string
  tagline: string
  description: string
  duration: string
  students: string
  rating: number
  badge: string | null
  eligibility: string[]
  syllabus: { title: string; topics: string[] }[]
  features: string[]
  benefits: string[]
  fee: string
  batchStart: string
  examPattern: { section: string; marks: string; time: string }[]
}> = {
  "nda": {
    id: "nda",
    title: "NDA Course",
    tagline: "Complete Preparation for National Defence Academy",
    description: "Our NDA Course provides comprehensive preparation for the NDA written exam and SSB interview. With expert guidance, rigorous practice, and complete physical training, we ensure you are fully prepared to join the prestigious National Defence Academy.",
    duration: "6-12 Months",
    students: "2000+",
    rating: 4.8,
    badge: "Best Seller",
    eligibility: [
      "Age: 16.5 to 19.5 years",
      "Educational Qualification: 10+2 or equivalent",
      "Unmarried male candidates (Female for Air Force & Navy)",
      "Physical fitness as per NDA standards",
    ],
    syllabus: [
      {
        title: "Mathematics",
        topics: ["Algebra", "Trigonometry", "Calculus", "Matrices & Determinants", "Analytical Geometry", "Statistics & Probability"],
      },
      {
        title: "General Ability",
        topics: ["English", "Physics", "Chemistry", "Biology", "History", "Geography", "Current Affairs"],
      },
      {
        title: "SSB Preparation",
        topics: ["Psychological Tests", "GTO Tasks", "Personal Interview", "Conference"],
      },
    ],
    features: [
      "Expert faculty with military background",
      "Daily physical training sessions",
      "Regular mock tests and assessments",
      "Complete SSB interview preparation",
      "GTO ground training",
      "Personality development classes",
    ],
    benefits: [
      "Proven track record of selections",
      "Individual attention and mentoring",
      "Modern infrastructure and facilities",
      "Hostel accommodation available",
      "Post-selection guidance",
      "Lifetime alumni support",
    ],
    fee: "Contact for fee details",
    batchStart: "New batches every month",
    examPattern: [
      { section: "Mathematics", marks: "300", time: "2.5 hours" },
      { section: "General Ability", marks: "600", time: "2.5 hours" },
      { section: "Total", marks: "900", time: "5 hours" },
    ],
  },
  "nda-foundation": {
    id: "nda-foundation",
    title: "NDA Foundation Course",
    tagline: "Start Your Defence Journey After Class 10",
    description: "Our NDA Foundation Course is an integrated program that combines regular schooling with NDA preparation. Students live and study on campus, following a disciplined schedule that prepares them for both board exams and NDA selection.",
    duration: "2-3 Years",
    students: "500+",
    rating: 4.9,
    badge: "Popular",
    eligibility: [
      "Students who have passed Class 10",
      "Age: Below 16 years at joining",
      "Good academic record",
      "Basic physical fitness",
    ],
    syllabus: [
      {
        title: "Academic Curriculum",
        topics: ["Class 11 & 12 CBSE/State Board", "Science Stream (PCM)", "English & General Studies"],
      },
      {
        title: "NDA Preparation",
        topics: ["Mathematics (NDA level)", "General Ability Test", "Logical Reasoning", "Current Affairs"],
      },
      {
        title: "Physical & SSB",
        topics: ["Daily PT sessions", "Sports activities", "GTO basics", "Communication skills"],
      },
    ],
    features: [
      "Integrated schooling with NDA prep",
      "Hostel facility on campus",
      "Daily physical training",
      "Military-style discipline",
      "Board exam preparation",
      "Early SSB exposure",
    ],
    benefits: [
      "Head start over other aspirants",
      "2-3 NDA attempts during course",
      "Holistic personality development",
      "Strong academic foundation",
      "Disciplined lifestyle habits",
      "Long-term mentorship",
    ],
    fee: "Contact for fee details",
    batchStart: "April & July every year",
    examPattern: [
      { section: "Class 11", marks: "As per CBSE", time: "Full year" },
      { section: "Class 12", marks: "As per CBSE", time: "Full year" },
      { section: "NDA Mock Tests", marks: "900", time: "Weekly" },
    ],
  },
  "cds": {
    id: "cds",
    title: "CDS Course",
    tagline: "Combined Defence Services Examination Preparation",
    description: "The CDS Course provides structured preparation for the Combined Defence Services Examination. Our comprehensive program covers all aspects of the written exam and SSB interview preparation.",
    duration: "6 Months",
    students: "1500+",
    rating: 4.8,
    badge: null,
    eligibility: [
      "Age: 19 to 25 years (varies by entry)",
      "Graduate degree from recognized university",
      "Unmarried candidates",
      "Physical fitness as per standards",
    ],
    syllabus: [
      {
        title: "English",
        topics: ["Grammar", "Vocabulary", "Comprehension", "Spotting Errors", "Sentence Arrangement"],
      },
      {
        title: "General Knowledge",
        topics: ["Current Affairs", "History", "Geography", "Polity", "Economics", "Science"],
      },
      {
        title: "Mathematics (OTA exempt)",
        topics: ["Arithmetic", "Algebra", "Geometry", "Trigonometry", "Mensuration", "Statistics"],
      },
    ],
    features: [
      "Comprehensive study material",
      "Daily current affairs updates",
      "Regular mock tests",
      "SSB interview training",
      "Physical fitness guidance",
      "Personal interview preparation",
    ],
    benefits: [
      "High selection rate",
      "Experienced faculty",
      "Flexible batch timings",
      "Online and offline modes",
      "Doubt clearing sessions",
      "Performance tracking",
    ],
    fee: "Contact for fee details",
    batchStart: "Monthly new batches",
    examPattern: [
      { section: "English", marks: "100", time: "2 hours" },
      { section: "General Knowledge", marks: "100", time: "2 hours" },
      { section: "Mathematics", marks: "100", time: "2 hours" },
    ],
  },
  "ssb": {
    id: "ssb",
    title: "SSB Interview Training",
    tagline: "21-Day Comprehensive SSB Preparation",
    description: "Our SSB Interview Training is a 21-day intensive program that prepares you for every aspect of the Service Selection Board interview. From psychological tests to GTO tasks, we ensure you develop officer-like qualities.",
    duration: "21 Days",
    students: "3000+",
    rating: 4.9,
    badge: "Top Rated",
    eligibility: [
      "Qualified NDA/CDS/AFCAT written exam",
      "Received SSB call letter",
      "Meeting physical standards",
      "Self-motivated candidates",
    ],
    syllabus: [
      {
        title: "Psychological Tests",
        topics: ["TAT", "WAT", "SRT", "Self Description"],
      },
      {
        title: "GTO Tasks",
        topics: ["GD", "GPE", "PGT", "HGT", "Individual Obstacles", "Command Task", "Final GD"],
      },
      {
        title: "Personal Interview",
        topics: ["Introduction", "Personal Questions", "Technical Questions", "Current Affairs", "Rapid Fire"],
      },
    ],
    features: [
      "Actual GTO ground practice",
      "Mock SSB interviews",
      "Psychology expert guidance",
      "Individual feedback",
      "Physical fitness training",
      "Confidence building",
    ],
    benefits: [
      "Highest recommendation rate",
      "Ex-SSB board members as faculty",
      "Real SSB simulation",
      "Personalized improvement plan",
      "Post-training support",
      "Success stories of students",
    ],
    fee: "Contact for fee details",
    batchStart: "Batches every 10 days",
    examPattern: [
      { section: "Day 1 - Screening", marks: "OIR + PP&DT", time: "Half day" },
      { section: "Day 2-4 - Psychology", marks: "4 Tests", time: "3 days" },
      { section: "Day 2-4 - GTO", marks: "9 Tasks", time: "3 days" },
      { section: "Day 2-4 - Interview", marks: "Personal", time: "45-60 min" },
      { section: "Day 5 - Conference", marks: "Final", time: "Morning" },
    ],
  },
  "afcat": {
    id: "afcat",
    title: "AFCAT Course",
    tagline: "Air Force Common Admission Test Preparation",
    description: "Our AFCAT coaching program provides step-by-step preparation for the Air Force Common Admission Test and AFSB interview. Join the Indian Air Force with our expert guidance.",
    duration: "4-6 Months",
    students: "800+",
    rating: 4.7,
    badge: null,
    eligibility: [
      "Age: 20 to 24 years",
      "Graduate with 60% in Physics & Maths (for Flying)",
      "Graduate in any discipline (for Ground Duty)",
      "Unmarried candidates",
    ],
    syllabus: [
      {
        title: "General Awareness",
        topics: ["History", "Geography", "Polity", "Economics", "Current Affairs", "Defence News"],
      },
      {
        title: "Verbal Ability",
        topics: ["Comprehension", "Error Detection", "Sentence Completion", "Synonyms & Antonyms"],
      },
      {
        title: "Numerical Ability",
        topics: ["Decimal & Fractions", "Ratio & Proportion", "Profit & Loss", "Time & Distance", "Percentage"],
      },
      {
        title: "Reasoning",
        topics: ["Verbal & Non-Verbal", "Spatial", "Logical", "Series Completion"],
      },
    ],
    features: [
      "Complete AFCAT syllabus coverage",
      "AFSB interview preparation",
      "Physical fitness training",
      "Mock tests series",
      "Current affairs updates",
      "EKT preparation (if applicable)",
    ],
    benefits: [
      "Experienced Air Force mentors",
      "High success rate",
      "Online and offline modes",
      "Flexible batch timings",
      "Study material included",
      "Doubt clearing support",
    ],
    fee: "Contact for fee details",
    batchStart: "New batches monthly",
    examPattern: [
      { section: "General Awareness", marks: "50", time: "Shared" },
      { section: "Verbal Ability", marks: "75", time: "Shared" },
      { section: "Numerical Ability", marks: "50", time: "Shared" },
      { section: "Reasoning", marks: "75", time: "Shared" },
      { section: "Total", marks: "250", time: "2 hours" },
    ],
  },
  "navy-agniveer": {
    id: "navy-agniveer",
    title: "Indian Navy Agniveer",
    tagline: "Navy SSR/AA Examination Preparation",
    description: "Our Indian Navy Agniveer coaching program provides complete preparation for the Navy SSR and AA examinations. We cover written tests, physical fitness, and medical preparation.",
    duration: "3-4 Months",
    students: "600+",
    rating: 4.7,
    badge: "New",
    eligibility: [
      "Age: 17.5 to 21 years",
      "10+2 with Maths & Physics (for SSR)",
      "10+2 in any stream (for AA)",
      "Physical & medical fitness",
    ],
    syllabus: [
      {
        title: "English",
        topics: ["Comprehension", "Grammar", "Vocabulary", "Verbal Ability"],
      },
      {
        title: "Science",
        topics: ["Physics", "Chemistry", "Biology basics"],
      },
      {
        title: "Mathematics",
        topics: ["Algebra", "Geometry", "Trigonometry", "Mensuration"],
      },
      {
        title: "General Knowledge",
        topics: ["Current Affairs", "Geography", "History", "Defence Awareness"],
      },
    ],
    features: [
      "Complete syllabus coverage",
      "Physical fitness training",
      "Medical preparation guidance",
      "Mock tests",
      "Documentation assistance",
      "Interview preparation",
    ],
    benefits: [
      "Experienced faculty",
      "High selection rate",
      "Comprehensive preparation",
      "Physical training ground",
      "Hostel facility",
      "Post-selection support",
    ],
    fee: "Contact for fee details",
    batchStart: "Regular batches",
    examPattern: [
      { section: "English", marks: "25", time: "Shared" },
      { section: "Science", marks: "25", time: "Shared" },
      { section: "Mathematics", marks: "25", time: "Shared" },
      { section: "General Knowledge", marks: "25", time: "Shared" },
      { section: "Total", marks: "100", time: "1 hour" },
    ],
  },
  "airforce-xy": {
    id: "airforce-xy",
    title: "Airforce X/Y Group",
    tagline: "Indian Air Force Airmen Selection Preparation",
    description: "Our Airforce X/Y Group coaching provides comprehensive preparation for Indian Air Force Airmen selection. We cover both technical and non-technical streams.",
    duration: "4-6 Months",
    students: "700+",
    rating: 4.6,
    badge: null,
    eligibility: [
      "Age: 17 to 21 years",
      "10+2 with PCM (for X Group)",
      "10+2 in any stream (for Y Group)",
      "Physical fitness standards",
    ],
    syllabus: [
      {
        title: "English",
        topics: ["Comprehension", "Grammar", "Vocabulary", "Verbal Ability"],
      },
      {
        title: "Physics (X Group)",
        topics: ["Mechanics", "Heat", "Optics", "Electricity", "Modern Physics"],
      },
      {
        title: "Mathematics (X Group)",
        topics: ["Algebra", "Trigonometry", "Calculus", "Coordinate Geometry"],
      },
      {
        title: "Reasoning (Y Group)",
        topics: ["Verbal Reasoning", "Non-Verbal Reasoning", "Series", "Analogy"],
      },
    ],
    features: [
      "Separate X and Y Group batches",
      "Complete syllabus coverage",
      "Physical fitness training",
      "Mock tests",
      "Interview preparation",
      "Medical guidance",
    ],
    benefits: [
      "Experienced technical faculty",
      "High success rate",
      "Comprehensive study material",
      "Practice test series",
      "Doubt clearing sessions",
      "Physical training ground",
    ],
    fee: "Contact for fee details",
    batchStart: "Regular batches",
    examPattern: [
      { section: "English", marks: "20", time: "Shared" },
      { section: "Physics", marks: "25", time: "Shared" },
      { section: "Mathematics", marks: "25", time: "Shared" },
      { section: "Total (X Group)", marks: "70", time: "60 min" },
    ],
  },
  "mns": {
    id: "mns",
    title: "MNS Course",
    tagline: "Military Nursing Service Preparation",
    description: "Our MNS course provides complete preparation for the Military Nursing Service examination. We cover NEET preparation, MNS written exam, and interview training.",
    duration: "3-6 Months",
    students: "400+",
    rating: 4.8,
    badge: "For Women",
    eligibility: [
      "Age: 17 to 25 years",
      "Female candidates only",
      "10+2 with PCB",
      "NEET qualification",
      "Physical & medical fitness",
    ],
    syllabus: [
      {
        title: "NEET Preparation",
        topics: ["Physics", "Chemistry", "Biology", "NEET mock tests"],
      },
      {
        title: "General English",
        topics: ["Grammar", "Comprehension", "Vocabulary", "Essay writing"],
      },
      {
        title: "General Intelligence",
        topics: ["Reasoning", "Problem solving", "Analytical ability"],
      },
      {
        title: "Interview Preparation",
        topics: ["Personal interview", "Medical knowledge", "Current affairs"],
      },
    ],
    features: [
      "NEET + MNS integrated prep",
      "Experienced medical faculty",
      "Interview training",
      "Physical fitness guidance",
      "Mock tests",
      "Medical knowledge sessions",
    ],
    benefits: [
      "High success rate",
      "Comprehensive preparation",
      "Female-friendly environment",
      "Hostel facility",
      "Post-selection guidance",
      "Career counseling",
    ],
    fee: "Contact for fee details",
    batchStart: "Annual batches",
    examPattern: [
      { section: "NEET Score", marks: "Qualifying", time: "As per NTA" },
      { section: "Personal Interview", marks: "Merit based", time: "15-20 min" },
      { section: "Medical Examination", marks: "Qualifying", time: "As scheduled" },
    ],
  },
  "territorial-army": {
    id: "territorial-army",
    title: "Territorial Army Officer",
    tagline: "Serve the Nation While Pursuing Your Career",
    description: "The Territorial Army provides an opportunity for working professionals to serve the nation in uniform while continuing their primary occupation. Our comprehensive program prepares candidates for the written examination and SSB interview.",
    duration: "3 Months",
    students: "400+",
    rating: 4.8,
    badge: null,
    eligibility: [
      "Age: 18 to 42 years",
      "Graduate from recognized university",
      "Employed in Central/State Govt. or Private Sector",
      "Physical fitness as per Army standards",
    ],
    syllabus: [
      {
        title: "Reasoning",
        topics: ["Verbal Reasoning", "Non-Verbal Reasoning", "Analytical Reasoning", "Problem Solving"],
      },
      {
        title: "Elementary Mathematics",
        topics: ["Arithmetic", "Algebra", "Geometry", "Statistics", "Mensuration"],
      },
      {
        title: "General Knowledge",
        topics: ["History", "Geography", "Polity", "Economics", "Current Affairs", "Defence Knowledge"],
      },
      {
        title: "English",
        topics: ["Grammar", "Vocabulary", "Comprehension", "Usage"],
      },
    ],
    features: [
      "Weekend batch option available",
      "Flexible timing for working professionals",
      "Complete syllabus coverage",
      "SSB interview preparation",
      "Online doubt sessions",
      "Mock tests series",
    ],
    benefits: [
      "Working professional friendly",
      "Experienced faculty",
      "High success rate",
      "Online and offline modes",
      "Post-selection guidance",
      "Alumni network",
    ],
    fee: "Contact for fee details",
    batchStart: "February & August",
    examPattern: [
      { section: "Reasoning", marks: "50", time: "Shared" },
      { section: "Elementary Mathematics", marks: "50", time: "Shared" },
      { section: "General Knowledge", marks: "50", time: "Shared" },
      { section: "English", marks: "50", time: "Shared" },
      { section: "Total", marks: "200", time: "2 hours" },
    ],
  },
  "navy": {
    id: "navy",
    title: "Indian Navy Recruitment",
    tagline: "Join the Indian Navy - Sailors Entry",
    description: "Complete preparation for Indian Navy recruitment examinations including MR, AA, and SSR with physical fitness training.",
    duration: "4 Months",
    students: "600+",
    rating: 4.7,
    badge: null,
    eligibility: [
      "Age: 17 to 21 years",
      "10th/12th Pass (as per entry)",
      "Physical & Medical fitness",
      "Swimming ability preferred",
    ],
    syllabus: [
      {
        title: "Mathematics",
        topics: ["Simplification", "Algebra", "Geometry", "Mensuration", "Trigonometry"],
      },
      {
        title: "Science",
        topics: ["Physics Fundamentals", "Chemistry Basics", "Biology Essentials"],
      },
      {
        title: "English",
        topics: ["Grammar", "Vocabulary", "Comprehension", "Common Errors"],
      },
      {
        title: "General Knowledge",
        topics: ["Geography", "History", "Current Affairs", "Naval Knowledge"],
      },
    ],
    features: [
      "Entry-specific preparation",
      "Physical fitness training",
      "Swimming training",
      "Mock tests & analysis",
      "Medical test guidance",
      "Document verification support",
    ],
    benefits: [
      "Experienced faculty",
      "High selection rate",
      "Hostel facility",
      "Complete preparation",
      "Physical training ground",
      "Post-selection support",
    ],
    fee: "Contact for fee details",
    batchStart: "Every Month",
    examPattern: [
      { section: "English", marks: "25", time: "Shared" },
      { section: "Science", marks: "25", time: "Shared" },
      { section: "Mathematics", marks: "25", time: "Shared" },
      { section: "General Knowledge", marks: "25", time: "Shared" },
      { section: "Total", marks: "100", time: "1 hour" },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(courseDetails).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = courseDetails[slug]
  if (!course) return { title: "Course Not Found" }
  
  return {
    title: `${course.title} | Warriors Defence Academy`,
    description: course.description,
  }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = courseDetails[slug]
  
  if (!course) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {course.badge && (
              <Badge className="bg-accent text-accent-foreground mb-4">
                {course.badge}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-accent mb-6">{course.tagline}</p>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-3xl">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-6 text-primary-foreground/90">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <span>Duration: {course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <span>{course.students} Students Trained</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span>{course.rating} Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="exam">Exam Pattern</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8">
                  {/* Features */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-accent" />
                        Course Features
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Benefits */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent" />
                        Why Choose This Course
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="syllabus">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-accent" />
                        Course Syllabus
                      </h3>
                      <div className="space-y-6">
                        {course.syllabus.map((section, index) => (
                          <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                            <h4 className="font-semibold text-primary mb-3">{section.title}</h4>
                            <div className="flex flex-wrap gap-2">
                              {section.topics.map((topic, tIndex) => (
                                <Badge key={tIndex} variant="secondary" className="bg-secondary/50">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="eligibility">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-accent" />
                        Eligibility Criteria
                      </h3>
                      <ul className="space-y-3">
                        {course.eligibility.map((criteria, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="exam">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-accent" />
                        Exam Pattern
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 font-semibold">Section</th>
                              <th className="text-left py-3 px-4 font-semibold">Marks/Details</th>
                              <th className="text-left py-3 px-4 font-semibold">Time/Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {course.examPattern.map((row, index) => (
                              <tr key={index} className="border-b border-border/50 last:border-0">
                                <td className="py-3 px-4 text-muted-foreground">{row.section}</td>
                                <td className="py-3 px-4 text-muted-foreground">{row.marks}</td>
                                <td className="py-3 px-4 text-muted-foreground">{row.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Enroll Now</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Next Batch</span>
                      <span className="font-medium">{course.batchStart}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Fee</span>
                      <span className="font-medium text-primary">{course.fee}</span>
                    </div>
                  </div>

                  <Link href="/register">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-3">
                      Enroll Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule a Call
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Have Questions?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our counselors are available to help you choose the right course.
                  </p>
                  <p className="text-primary font-medium">
                    Call: +91 98765 43210
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
