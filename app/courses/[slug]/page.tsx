import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight, Clock, Users, Star, CheckCircle, Calendar,
  BookOpen, Target, Award, FileText, GraduationCap, Phone,
  Shield, ChevronRight, MapPin,
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
  badgeColor: string
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
    duration: "6–12 Months",
    students: "2,000+",
    rating: 4.8,
    badge: "Best Seller",
    badgeColor: "bg-accent text-accent-foreground",
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
    duration: "2–3 Years",
    students: "500+",
    rating: 4.9,
    badge: "Popular",
    badgeColor: "bg-primary text-primary-foreground",
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
      "2–3 NDA attempts during course",
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
    students: "1,500+",
    rating: 4.8,
    badge: null,
    badgeColor: "",
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
    students: "3,000+",
    rating: 4.9,
    badge: "Top Rated",
    badgeColor: "bg-accent text-accent-foreground",
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
      { section: "Day 1 — Screening", marks: "OIR + PP&DT", time: "Half day" },
      { section: "Day 2–4 — Psychology", marks: "4 Tests", time: "3 days" },
      { section: "Day 2–4 — GTO", marks: "9 Tasks", time: "3 days" },
      { section: "Day 2–4 — Interview", marks: "Personal", time: "45–60 min" },
      { section: "Day 5 — Conference", marks: "Final", time: "Morning" },
    ],
  },
  "afcat": {
    id: "afcat",
    title: "AFCAT Course",
    tagline: "Air Force Common Admission Test Preparation",
    description: "Our AFCAT coaching program provides step-by-step preparation for the Air Force Common Admission Test and AFSB interview. Join the Indian Air Force with our expert guidance.",
    duration: "4–6 Months",
    students: "800+",
    rating: 4.7,
    badge: null,
    badgeColor: "",
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
    duration: "3–4 Months",
    students: "600+",
    rating: 4.7,
    badge: "New",
    badgeColor: "bg-primary text-primary-foreground",
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
    title: "Airforce X / Y Group",
    tagline: "Indian Air Force Airmen Selection Preparation",
    description: "Our Airforce X/Y Group coaching provides comprehensive preparation for Indian Air Force Airmen selection. We cover both technical and non-technical streams.",
    duration: "4–6 Months",
    students: "700+",
    rating: 4.6,
    badge: null,
    badgeColor: "",
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
    duration: "3–6 Months",
    students: "400+",
    rating: 4.8,
    badge: "For Women",
    badgeColor: "bg-[#7c3aed] text-white",
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
      { section: "Personal Interview", marks: "Merit based", time: "15–20 min" },
      { section: "Medical Examination", marks: "Qualifying", time: "As scheduled" },
    ],
  },
  "territorial-army": {
    id: "territorial-army",
    title: "Territorial Army Officer",
    tagline: "Serve the Nation While Pursuing Your Career",
    description: "The Territorial Army provides an opportunity for working professionals to serve the nation in uniform while continuing their primary occupation. Our program prepares candidates for the written examination and SSB interview.",
    duration: "3 Months",
    students: "400+",
    rating: 4.8,
    badge: null,
    badgeColor: "",
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
    tagline: "Join the Indian Navy — Sailors Entry",
    description: "Complete preparation for Indian Navy recruitment examinations including MR, AA, and SSR with physical fitness training.",
    duration: "4 Months",
    students: "600+",
    rating: 4.7,
    badge: null,
    badgeColor: "",
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
  return Object.keys(courseDetails).map((slug) => ({ slug }))
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
  if (!course) notFound()

  return (
    <main className="min-h-screen">
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="container mx-auto px-4 py-14 md:py-20 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-primary-foreground/50 mb-6">
            <Link href="/" className="hover:text-primary-foreground/80 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/courses" className="hover:text-primary-foreground/80 transition-colors">Courses</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/70">{course.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-3.5 py-1.5">
                <Shield className="h-3.5 w-3.5 text-accent" />
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">Warriors Defence Academy</span>
              </div>
              {course.badge && (
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${course.badgeColor}`}>
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              {course.title}
            </h1>
            <p className="text-accent font-medium text-lg mb-5">{course.tagline}</p>
            <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-2xl">
              {course.description}
            </p>

            {/* Meta strip */}
            <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/75 mb-8">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                Duration: <strong className="text-primary-foreground">{course.duration}</strong>
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <strong className="text-primary-foreground">{course.students}</strong> trained
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <strong className="text-primary-foreground">{course.rating}</strong> rating
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                {course.batchStart}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-7 font-semibold gap-2">
                  Enroll Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+919452245729">
                <Button size="lg" variant="outline" className="h-12 px-7 font-semibold gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Tabs (left 2/3) ── */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="flex w-full rounded-xl bg-muted/60 p-1 mb-8 gap-0.5">
                  <TabsTrigger value="overview" className="flex-1 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="syllabus" className="flex-1 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    Syllabus
                  </TabsTrigger>
                  <TabsTrigger value="eligibility" className="flex-1 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    Eligibility
                  </TabsTrigger>
                  <TabsTrigger value="exam" className="flex-1 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    Exam Pattern
                  </TabsTrigger>
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview" className="space-y-6 mt-0">
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Target className="h-4 w-4 text-accent" />
                      </div>
                      Course Features
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {course.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors">
                          <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      Why Choose This Course
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {course.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Syllabus */}
                <TabsContent value="syllabus" className="mt-0">
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-accent" />
                      </div>
                      Course Syllabus
                    </h3>
                    <div className="space-y-5">
                      {course.syllabus.map((section, i) => (
                        <div key={i} className="border border-border rounded-xl overflow-hidden">
                          <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border">
                            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <h4 className="font-semibold text-foreground text-sm">{section.title}</h4>
                          </div>
                          <div className="p-4 flex flex-wrap gap-2">
                            {section.topics.map((t, j) => (
                              <Badge key={j} variant="secondary" className="text-xs font-medium bg-secondary/50 text-secondary-foreground">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Eligibility */}
                <TabsContent value="eligibility" className="mt-0">
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      Eligibility Criteria
                    </h3>
                    <ul className="space-y-3">
                      {course.eligibility.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/30">
                          <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm leading-relaxed">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                {/* Exam Pattern */}
                <TabsContent value="exam" className="mt-0">
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-accent" />
                      </div>
                      Exam Pattern
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/60 border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Section</th>
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Marks / Details</th>
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Time / Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {course.examPattern.map((row, i) => (
                            <tr key={i} className={`border-b border-border/60 last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                              <td className="py-3 px-4 text-foreground font-medium">{row.section}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.marks}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* ── Sticky Sidebar ── */}
            <div className="space-y-5">

              {/* Enrollment card */}
              <div className="sticky top-24 space-y-5">
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
                  {/* Card header */}
                  <div className="bg-primary px-6 py-5">
                    <p className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-widest mb-1">Enroll in this Programme</p>
                    <h3 className="text-xl font-bold text-primary-foreground">{course.title}</h3>
                  </div>

                  {/* Details */}
                  <div className="px-6 py-5 space-y-3">
                    <div className="flex items-center justify-between py-2.5 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" /> Duration
                      </span>
                      <span className="text-sm font-semibold text-foreground">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" /> Next Batch
                      </span>
                      <span className="text-sm font-semibold text-foreground">{course.batchStart}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5">
                      <span className="text-sm text-muted-foreground">Course Fee</span>
                      <span className="text-sm font-semibold text-primary">{course.fee}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="px-6 pb-6 space-y-2.5">
                    <Link href="/register">
                      <Button className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2">
                        Enroll Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full h-11 gap-2 border-primary text-primary hover:bg-primary/5 font-medium">
                        <Calendar className="h-4 w-4" />
                        Schedule a Call
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Contact card */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h4 className="font-semibold text-foreground mb-2">Have Questions?</h4>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    Our counselors help you choose the right course based on your age, qualification, and goals.
                  </p>

                  <div className="space-y-2.5">
                    <a href="tel:+919452245729" className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Call Us</p>
                        <p className="text-sm font-semibold text-primary group-hover:underline">+91 94522 45729</p>
                      </div>
                    </a>
                    <a href="tel:+917081011964" className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Alternate</p>
                        <p className="text-sm font-semibold text-primary group-hover:underline">+91 70810 11964</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="text-xs text-foreground leading-relaxed">545-Ga/1 Chha, Near Kapoorthala Chauraha, Lucknow — 226024</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other courses link */}
                <div className="rounded-2xl border border-border bg-secondary/50 px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Explore all courses</p>
                    <p className="text-xs text-muted-foreground">9 programmes available</p>
                  </div>
                  <Link href="/courses">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-primary hover:text-primary">
                      View all <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
