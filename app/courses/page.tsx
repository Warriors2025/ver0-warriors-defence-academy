import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Users, Star, CheckCircle, Shield, Phone } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Defence Courses — NDA, CDS, AFCAT, SSB Coaching | Warriors Defence Academy",
  description: "Explore Warriors Defence Academy's comprehensive courses: NDA, CDS, AFCAT, SSB, Navy Agniveer, MNS. Expert faculty, 5000+ selections, India's best defence coaching in Lucknow.",
  keywords: ["NDA course", "CDS coaching", "AFCAT preparation", "SSB training", "defence courses Lucknow", "military coaching"],
}

const categories = [
  { label: "All Courses", value: "all" },
  { label: "Officer Entry", value: "officer" },
  { label: "Soldier / Airman Entry", value: "soldier" },
  { label: "Specialist Entry", value: "specialist" },
]

const courses = [
  {
    id: "nda-foundation",
    category: "officer",
    title: "NDA Foundation Course",
    tagline: "Integrated school + NDA prep for Class 10 passouts",
    duration: "2–3 Years",
    students: "500+",
    rating: 4.9,
    image: "/images/courses/nda-foundation.jpg",
    badge: "Popular",
    badgeColor: "bg-primary text-primary-foreground",
    features: ["Integrated Schooling", "Hostel Facility", "Daily Physical Training", "Early SSB Grooming"],
    href: "/courses/nda-foundation",
  },
  {
    id: "nda",
    category: "officer",
    title: "NDA Course",
    tagline: "Complete written exam + SSB preparation",
    duration: "6–12 Months",
    students: "2,000+",
    rating: 4.8,
    image: "/images/courses/nda.jpg",
    badge: "Best Seller",
    badgeColor: "bg-accent text-accent-foreground",
    features: ["Written Exam Prep", "SSB Interview Training", "Weekly Mock Tests", "Physical Fitness"],
    href: "/courses/nda",
  },
  {
    id: "cds",
    category: "officer",
    title: "CDS Course",
    tagline: "For graduates aiming for officer commission",
    duration: "6 Months",
    students: "1,500+",
    rating: 4.8,
    image: "/images/courses/cds.jpg",
    badge: null,
    badgeColor: "",
    features: ["Complete Syllabus", "Daily Current Affairs", "Previous Year Analysis", "SSB Prep Included"],
    href: "/courses/cds",
  },
  {
    id: "ssb",
    category: "officer",
    title: "SSB Interview Training",
    tagline: "21-day intensive SSB prep on real GTO ground",
    duration: "21 Days",
    students: "3,000+",
    rating: 4.9,
    image: "/images/courses/ssb.jpg",
    badge: "Top Rated",
    badgeColor: "bg-accent text-accent-foreground",
    features: ["Live GTO Tasks", "Mock SSB Interviews", "Psychology Tests", "OLQ Development"],
    href: "/courses/ssb",
  },
  {
    id: "afcat",
    category: "officer",
    title: "AFCAT Course",
    tagline: "Air Force Common Admission Test coaching",
    duration: "4–6 Months",
    students: "800+",
    rating: 4.7,
    image: "/images/courses/afcat.jpg",
    badge: null,
    badgeColor: "",
    features: ["Full AFCAT Syllabus", "AFSB Interview Prep", "EKT for Technical", "Physical Training"],
    href: "/courses/afcat",
  },
  {
    id: "navy-agniveer",
    category: "soldier",
    title: "Indian Navy Agniveer",
    tagline: "Navy SSR / AA exam coaching with swim training",
    duration: "3–4 Months",
    students: "600+",
    rating: 4.7,
    image: "/images/courses/navy.jpg",
    badge: "New",
    badgeColor: "bg-primary text-primary-foreground",
    features: ["Written Exam Coaching", "Physical Training", "Swimming Sessions", "Medical Guidance"],
    href: "/courses/navy-agniveer",
  },
  {
    id: "airforce-xy",
    category: "soldier",
    title: "Airforce X / Y Group",
    tagline: "IAF Airmen selection — technical & non-technical",
    duration: "4–6 Months",
    students: "700+",
    rating: 4.6,
    image: "/images/courses/airforce.jpg",
    badge: null,
    badgeColor: "",
    features: ["Separate X & Y Batches", "Technical Subjects", "Reasoning & GK", "Physical Fitness"],
    href: "/courses/airforce-xy",
  },
  {
    id: "mns",
    category: "specialist",
    title: "MNS Course",
    tagline: "Military Nursing Service — for female candidates",
    duration: "3–6 Months",
    students: "400+",
    rating: 4.8,
    image: "/images/courses/mns.jpg",
    badge: "For Women",
    badgeColor: "bg-[#7c3aed] text-white",
    features: ["Science Subjects", "English Prep", "Interview Training", "Personality Development"],
    href: "/courses/mns",
  },
  {
    id: "territorial-army",
    category: "specialist",
    title: "Territorial Army",
    tagline: "Serve the nation — flexible batches for professionals",
    duration: "3 Months",
    students: "400+",
    rating: 4.8,
    image: "/images/courses/cds.jpg",
    badge: "Working Professionals",
    badgeColor: "bg-secondary text-secondary-foreground",
    features: ["Weekend Batches", "Flexible Timing", "SSB Training", "Online Support"],
    href: "/courses/territorial-army",
  },
]

const stats = [
  { value: "9+", label: "Courses Offered" },
  { value: "5,000+", label: "Successful Selections" },
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Expert Mentors" },
]

export default function CoursesPage() {
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

        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
              <Shield className="h-3.5 w-3.5 text-accent" />
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">Our Programmes</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
              Defence Preparation Courses
            </h1>
            <p className="text-primary-foreground/75 text-lg leading-relaxed max-w-2xl">
              Expert coaching for NDA, CDS, AFCAT, SSB and more — designed by retired military officers
              with a proven track record of 5,000+ selections.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-primary-foreground/15">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-accent">{s.value}</div>
                  <div className="text-xs text-primary-foreground/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Course grid ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">

          {/* Section label */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">All Programmes</h2>
              <p className="text-muted-foreground text-sm mt-1">{courses.length} courses available</p>
            </div>
            <a href="tel:+919452245729" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-4 w-4 text-accent" />
              <span>Need help choosing? <span className="text-accent font-medium">+91 94522 45729</span></span>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <article
                key={course.id}
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-primary/10">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badge */}
                  {course.badge && (
                    <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                  )}

                  {/* Duration chip */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <Clock className="h-3 w-3 text-white/80" />
                    <span className="text-white text-xs font-medium">{course.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {course.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1 mb-4">{course.tagline}</p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.students} trained
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      {course.rating} rating
                    </span>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-1.5 mb-5">
                    {course.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-accent shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link href={course.href}>
                      <Button className="w-full gap-2 group-hover:shadow-md transition-shadow">
                        View Course Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Counseling CTA ── */}
      <section className="py-16 bg-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Not sure which course suits you?
            </h2>
            <p className="text-muted-foreground mb-8 text-base leading-relaxed">
              Our counselors will assess your eligibility, goals, and academic background
              to recommend the best programme — completely free of charge.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8 font-semibold gap-2">
                  Get Free Counseling
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+919452245729">
                <Button size="lg" variant="outline" className="h-12 px-8 font-semibold gap-2 border-primary text-primary hover:bg-primary/5">
                  <Phone className="h-4 w-4" />
                  Call +91 94522 45729
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
