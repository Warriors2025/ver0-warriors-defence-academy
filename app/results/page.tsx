import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Medal,
  Star,
  Award,
  Users,
  TrendingUp,
  ArrowRight,
  Shield,
  Flag,
  CheckCircle,
  Target,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Results & Selections | Warriors Defence Academy Lucknow",
  description:
    "5,000+ selections from Warriors Defence Academy. Top AIR rankers in NDA, CDS, AFCAT and SSB. Proud of our students serving in Indian Army, Navy, and Air Force.",
}

const results: Record<string, { name: string; exam: string; rank: string; rankNum: number; branch: string }[]> = {
  "2025": [
    { name: "Rahul Sharma",  exam: "NDA",   rank: "AIR 12", rankNum: 12, branch: "Indian Army" },
    { name: "Sneha Patel",   exam: "AFCAT", rank: "AIR 8",  rankNum: 8,  branch: "Indian Air Force" },
    { name: "Priya Singh",   exam: "CDS",   rank: "AIR 28", rankNum: 28, branch: "Indian Air Force" },
    { name: "Amit Kumar",    exam: "NDA",   rank: "AIR 45", rankNum: 45, branch: "Indian Navy" },
    { name: "Anjali Mishra", exam: "CDS",   rank: "AIR 34", rankNum: 34, branch: "Indian Army" },
    { name: "Vikram Yadav",  exam: "NDA",   rank: "AIR 67", rankNum: 67, branch: "Indian Army" },
  ],
  "2024": [
    { name: "Arjun Reddy",   exam: "NDA",   rank: "AIR 5",  rankNum: 5,  branch: "Indian Air Force" },
    { name: "Sanjay Gupta",  exam: "AFCAT", rank: "AIR 11", rankNum: 11, branch: "Indian Air Force" },
    { name: "Kavita Sharma", exam: "CDS",   rank: "AIR 19", rankNum: 19, branch: "Indian Army" },
    { name: "Ritu Agarwal",  exam: "AFCAT", rank: "AIR 15", rankNum: 15, branch: "Indian Air Force" },
    { name: "Pooja Kumari",  exam: "CDS",   rank: "AIR 27", rankNum: 27, branch: "Indian Air Force" },
    { name: "Neha Verma",    exam: "NDA",   rank: "AIR 38", rankNum: 38, branch: "Indian Navy" },
    { name: "Rohan Joshi",   exam: "NDA",   rank: "AIR 52", rankNum: 52, branch: "Indian Army" },
    { name: "Deepak Singh",  exam: "NDA",   rank: "AIR 73", rankNum: 73, branch: "Indian Army" },
  ],
  "2023": [
    { name: "Manish Tiwari",  exam: "NDA",   rank: "AIR 3",  rankNum: 3,  branch: "Indian Air Force" },
    { name: "Priyanka Rao",   exam: "AFCAT", rank: "AIR 7",  rankNum: 7,  branch: "Indian Air Force" },
    { name: "Swati Pandey",   exam: "CDS",   rank: "AIR 14", rankNum: 14, branch: "Indian Army" },
    { name: "Karan Malhotra", exam: "NDA",   rank: "AIR 22", rankNum: 22, branch: "Indian Navy" },
    { name: "Megha Sinha",    exam: "CDS",   rank: "AIR 31", rankNum: 31, branch: "Indian Army" },
    { name: "Ashish Dubey",   exam: "NDA",   rank: "AIR 41", rankNum: 41, branch: "Indian Army" },
  ],
}

const examBreakdown = [
  { exam: "NDA",   count: "1,200+", icon: Shield,    desc: "National Defence Academy" },
  { exam: "CDS",   count: "800+",   icon: Target,    desc: "Combined Defence Services" },
  { exam: "SSB",   count: "500+",   icon: Users,     desc: "Services Selection Board" },
  { exam: "AFCAT", count: "300+",   icon: TrendingUp, desc: "Air Force Common Admission" },
]

const awards = [
  {
    icon: Trophy,
    title: "Best Defence Academy",
    description: "Recognised as the leading defence coaching institute for 5 consecutive years by national education bodies.",
  },
  {
    icon: Award,
    title: "NDA Excellence Award",
    description: "Awarded for achieving the highest NDA selection rate among all coaching institutes in North India.",
  },
  {
    icon: Medal,
    title: "National Recognition",
    description: "Featured among the Top 10 Defence Academies in India by multiple national publications.",
  },
]

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
}

function getBranchColor(branch: string) {
  if (branch.includes("Air Force")) return "bg-sky-100 text-sky-800 border-sky-200"
  if (branch.includes("Navy"))      return "bg-blue-100 text-blue-800 border-blue-200"
  return "bg-green-100 text-green-800 border-green-200"
}

export default function ResultsPage() {
  const topThreeAllTime = [
    { name: "Manish Tiwari",  rank: "AIR 3",  exam: "NDA",   branch: "Indian Air Force", year: "2023" },
    { name: "Arjun Reddy",    rank: "AIR 5",  exam: "NDA",   branch: "Indian Air Force", year: "2024" },
    { name: "Priyanka Rao",   rank: "AIR 7",  exam: "AFCAT", branch: "Indian Air Force", year: "2023" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="bg-primary text-primary-foreground pt-24 pb-0 relative overflow-hidden">
          {/* Gold top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

          {/* Diagonal stripe texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="absolute inset-0 hero-pattern opacity-30" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-accent/15 border border-accent/30 rounded-full px-6 py-2.5">
                <Trophy className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                  Hall of Fame — Warriors Defence Academy
                </span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Our Pride &amp;
                <span className="block text-accent">Legacy of Excellence</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
                We take immense pride in our students who have achieved their dreams of
                serving the nation. Every rank is a story of discipline, determination, and dedication.
              </p>
            </div>

            {/* Stats strip */}
            <div className="mt-16 border-t border-primary-foreground/15 grid grid-cols-2 md:grid-cols-4">
              {[
                { value: "5,000+",  label: "Total Selections",   icon: Users },
                { value: "450+",    label: "Top 100 Ranks",      icon: Trophy },
                { value: "68%",     label: "SSB Success Rate",   icon: TrendingUp },
                { value: "1,200+",  label: "NDA Selections",     icon: Medal },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center py-8 px-4 ${i > 0 ? "border-l border-primary-foreground/15" : ""}`}
                >
                  <stat.icon className="h-5 w-5 text-accent mx-auto mb-2 opacity-80" />
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-primary-foreground/65 text-sm tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOP ACHIEVERS SPOTLIGHT ──────────────────────────────────── */}
        <section className="py-20 bg-secondary/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                Pinnacle of Excellence
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                All-Time Top Achievers
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {topThreeAllTime.map((topper, index) => {
                const medals = ["#FFD700", "#C0C0C0", "#CD7F32"]
                const labels = ["Gold", "Silver", "Bronze"]
                return (
                  <div
                    key={index}
                    className="group relative bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl hover:border-accent/40 transition-all duration-300 overflow-hidden"
                  >
                    {/* Background accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-accent opacity-60" />

                    {/* Medal position badge */}
                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-md"
                      style={{ backgroundColor: medals[index], color: "#1a1a1a" }}
                    >
                      #{index + 1}
                    </div>

                    {/* Avatar */}
                    <div className="relative inline-block mb-5">
                      <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-2xl font-black shadow-lg mx-auto">
                        {getInitials(topper.name)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-1">{topper.name}</h3>
                    <div className="text-3xl font-black text-primary mb-3">{topper.rank}</div>

                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge className="bg-accent/15 text-accent border border-accent/30 font-semibold">
                        {topper.exam}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {topper.year}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground text-sm mt-3">{topper.branch}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── YEAR-WISE RESULTS ────────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                Year-wise Selections
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Consistent Track Record
              </h2>
              <p className="text-muted-foreground">
                Year after year, our students secure top ranks across all defence examinations — a testament
                to the quality of our training and the dedication of our faculty.
              </p>
            </div>

            <Tabs defaultValue="2025" className="max-w-6xl mx-auto">
              {/* Tab bar */}
              <div className="flex justify-center mb-10">
                <TabsList className="bg-secondary/60 border border-border p-1 rounded-xl h-auto gap-1">
                  {["2025", "2024", "2023"].map((year) => (
                    <TabsTrigger
                      key={year}
                      value={year}
                      className="px-8 py-2.5 rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
                    >
                      {year}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {Object.entries(results).map(([year, students]) => (
                <TabsContent key={year} value={year}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {students.map((student, index) => {
                      const isTopRanker = student.rankNum <= 20
                      const isTop3     = index < 3
                      return (
                        <div
                          key={index}
                          className={`group relative bg-card border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 overflow-hidden ${
                            isTop3
                              ? "border-accent/50 hover:border-accent"
                              : "border-border hover:border-accent/30"
                          }`}
                        >
                          {/* Top accent line for top rankers */}
                          {isTop3 && (
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
                          )}

                          {/* Header: avatar + star */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="relative">
                              <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black shadow-md ${
                                  isTop3
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-primary text-primary-foreground"
                                }`}
                              >
                                {getInitials(student.name)}
                              </div>
                              {isTop3 && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-card shadow">
                                  <Star className="w-3 h-3 text-accent-foreground fill-accent-foreground" />
                                </div>
                              )}
                            </div>

                            {/* Exam badge */}
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                                student.exam === "NDA"
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : student.exam === "CDS"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-sky-50 text-sky-700 border-sky-200"
                              }`}
                            >
                              {student.exam}
                            </span>
                          </div>

                          {/* Name */}
                          <h3 className="font-bold text-foreground mb-1 leading-tight">
                            {student.name}
                          </h3>

                          {/* AIR Rank — large and prominent */}
                          <div
                            className={`text-3xl font-black mb-2 ${
                              isTop3 ? "text-accent" : "text-primary"
                            }`}
                          >
                            {student.rank}
                          </div>

                          {/* Branch badge */}
                          <span
                            className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${getBranchColor(student.branch)}`}
                          >
                            {student.branch}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Year summary */}
                  <div className="mt-8 p-5 bg-secondary/40 border border-border rounded-xl flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Flag className="h-5 w-5 text-accent" />
                      <span className="font-semibold text-foreground text-sm">
                        {year} Batch — {students.length} selections shown
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      * Showing representative selections. Total selections exceed 300+ per year.
                    </span>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* ── EXAM BREAKDOWN ───────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                Exam-wise Breakdown
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Selections Across All Exams
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {examBreakdown.map((item, index) => (
                <div
                  key={index}
                  className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-6 text-center hover:bg-primary-foreground/10 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-accent" />
                  </div>
                  <div className="text-3xl font-black text-accent mb-1">{item.count}</div>
                  <div className="text-primary-foreground font-bold text-sm mb-1">{item.exam}</div>
                  <div className="text-primary-foreground/50 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACADEMY ACHIEVEMENTS ─────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                Recognition &amp; Awards
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Academy Achievements
              </h2>
              <p className="text-muted-foreground">
                Accolades that reflect our relentless commitment to producing India&apos;s finest officers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 group-hover:border-accent/40 flex items-center justify-center mb-6 transition-colors">
                    <award.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{award.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-24 bg-secondary/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-8">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase">
                  Your Name Could Be Here Next
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Ready to Write
                <span className="text-primary block">Your Success Story?</span>
              </h2>

              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Join Warriors Defence Academy and become part of our legacy of excellence.
                Every AIR you see above started exactly where you are — with a dream and
                the courage to pursue it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="h-13 px-8 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base">
                    Enroll Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button size="lg" variant="outline" className="h-13 px-8 border-primary text-primary hover:bg-primary/5 gap-2 text-base">
                    View Courses
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                {[
                  "Free counselling session",
                  "Scholarship available",
                  "15+ years of proven results",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
