import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Target,
  Users,
  Trophy,
  Star,
  Heart,
  CheckCircle,
  ArrowRight,
  Medal,
  Building2,
  Sword,
  BookOpen,
  Flag,
  Quote,
  Phone,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us — Warriors Defence Academy | Best NDA Coaching Lucknow",
  description:
    "Warriors Defence Academy: 15+ years of excellence, 5000+ selections, India's largest GTO ground. Meet our expert faculty of ex-military officers. Best NDA, CDS & SSB coaching in Lucknow.",
  keywords: ["about Warriors Defence Academy", "best defence coaching Lucknow", "NDA coaching history", "defence academy faculty"],
  openGraph: {
    title: "About Warriors Defence Academy",
    description: "15+ years of excellence, 5000+ successful selections. India's most trusted defence coaching institute.",
    images: ["/images/og-image.jpg"],
  },
}

const milestones = [
  {
    year: "2010",
    title: "Foundation Year",
    description: "Warriors Defence Academy was established in Lucknow with a bold vision — to build a centre of excellence that produces India's finest defence officers.",
    side: "left",
  },
  {
    year: "2013",
    title: "First 100 Selections",
    description: "Achieved the landmark of 100 successful selections across NDA, CDS, and SSB examinations — a testament to our rigorous training methodology.",
    side: "right",
  },
  {
    year: "2016",
    title: "New Campus & GTO Ground",
    description: "Moved to our current state-of-the-art campus, home to India's largest GTO (Group Testing Officer) ground, setting new benchmarks in practical SSB training.",
    side: "left",
  },
  {
    year: "2019",
    title: "1,000+ Selections",
    description: "Crossed the 1,000-selection milestone, cementing our position as the leading defence coaching institute in North India.",
    side: "right",
  },
  {
    year: "2022",
    title: "Women's Wing Launched",
    description: "Launched dedicated programs for women aspiring to join the armed forces — because the nation's defence is not limited by gender.",
    side: "left",
  },
  {
    year: "2024",
    title: "5,000+ Selections",
    description: "Achieved the landmark of 5,000+ successful selections nationwide, with students serving across Army, Navy, Air Force, and para-military forces.",
    side: "right",
  },
]

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue academic and physical excellence in every aspect of our training — no shortcuts, no compromises.",
  },
  {
    icon: Shield,
    title: "Discipline",
    description: "Military-grade discipline is woven into our daily schedule. It is the foundation upon which great officers are built.",
  },
  {
    icon: Heart,
    title: "Dedication",
    description: "Every faculty member, mentor, and staff is personally dedicated to the success of each student in our programme.",
  },
  {
    icon: Users,
    title: "Brotherhood",
    description: "We foster a lifelong bond among students — the spirit of teamwork and camaraderie that defines the armed forces.",
  },
]

const leadership = [
  {
    name: "Mr. Gulab Singh",
    role: "Founder & Director",
    description:
      "A visionary leader with an unwavering passion for developing future defence officers. His guidance and philosophy have shaped the careers of thousands of successful candidates across India.",
    image: "/images/director.jpg",
  },
  {
    name: "Lt. Gen. Dushyant Singh (Retd.)",
    role: "Chief Mentor",
    description:
      "With 35+ years of distinguished military service, he brings strategic insights, operational experience, and leadership wisdom to our SSB and personality development programmes.",
    image: null,
  },
  {
    name: "Dr. Anjali Mishra",
    role: "Academic Director",
    description:
      "Leading our academic curriculum with innovative teaching methods, comprehensive study material design, and a data-driven approach to exam preparation.",
    image: null,
  },
]

const differentiators = [
  {
    icon: Flag,
    title: "India's Largest GTO Ground",
    description:
      "Our purpose-built GTO ground is the largest in India — with full obstacle courses, group tasks, command tasks, and individual obstacles that mirror actual SSB testing grounds.",
    image: "/images/features/gto-ground.jpg",
  },
  {
    icon: BookOpen,
    title: "Ex-Military Expert Faculty",
    description:
      "Learn from retired Generals, Colonels, and service officers who have lived the military life and know exactly what it takes to clear SSB and crack defence exams.",
    image: "/images/features/mentorship.jpg",
  },
  {
    icon: Building2,
    title: "Residential Campus Life",
    description:
      "Students live on campus under a structured daily routine — morning PT, academics, physical training, and evening review — mirroring military life from day one.",
    image: "/images/features/library.jpg",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
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

        {/* Radial warmth */}
        <div className="absolute inset-0 hero-pattern opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Crest badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-accent/15 border border-accent/30 rounded-full px-6 py-2.5">
              <Shield className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                Est. 2010 — Lucknow, Uttar Pradesh
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Shaping India&apos;s Future
              <span className="block text-accent">Defence Officers</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              India&apos;s most trusted defence coaching institute — where military
              discipline, academic excellence, and unwavering dedication converge.
            </p>
          </div>

          {/* Stats strip */}
          <div className="mt-16 border-t border-primary-foreground/15 grid grid-cols-2 md:grid-cols-4">
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "5,000+", label: "Successful Selections" },
              { number: "50,000+", label: "Students Trained" },
              { number: "200+", label: "Expert Mentors" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-8 px-4 ${i > 0 ? "border-l border-primary-foreground/15" : ""}`}
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/65 text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text column */}
            <div>
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                More Than a Coaching Centre —<br />
                <span className="text-primary">A Mission to Serve the Nation</span>
              </h2>

              <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
                <p>
                  Warriors Defence Academy is widely recognised as the best NDA coaching
                  centre in India. Our campus offers a comprehensive environment where
                  aspiring officers benefit from modern classrooms, the country&apos;s largest
                  GTO ground, and expert instructors who have themselves served the nation.
                </p>
                <p>
                  We strike the right balance between rigorous academics, intensive physical
                  training, personality development, and communication skills — ensuring
                  students excel in both written exams and the five-day SSB interview.
                </p>
                <p>
                  Students joining after Class 10 or 12 study and live on campus under a
                  structured schedule that mirrors military life. Beyond the curriculum, we
                  instil leadership, ethics, and a service mindset. At Warriors Defence
                  Academy, we don&apos;t just prepare you for exams — we groom future officers.
                </p>
              </div>

              {/* Checkmarks */}
              <ul className="mt-8 space-y-3">
                {[
                  "India's only academy with a full-scale GTO obstacle ground",
                  "Faculty of retired Generals, Colonels & SSB board members",
                  "Residential campus with 24/7 mentorship and structured routine",
                  "Special programmes for girls aspiring to join the armed forces",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image column */}
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-primary/10 shadow-2xl">
                <Image
                  src="/images/hero/carousel-1.jpg"
                  alt="Warriors Defence Academy campus and training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-primary-foreground font-semibold text-lg">
                    Kapoorthala Chauraha, Lucknow
                  </p>
                  <p className="text-primary-foreground/70 text-sm">Main Training Campus</p>
                </div>
              </div>

              {/* Floating achievement badge */}
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-xl p-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold leading-none">AIR #1</div>
                    <div className="text-xs font-medium opacity-80 mt-0.5">Top Rank — Multiple Years</div>
                  </div>
                </div>
              </div>

              {/* Floating selection badge */}
              <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground rounded-xl p-5 shadow-xl border border-accent/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">5,000+</div>
                  <div className="text-xs text-primary-foreground/70 mt-0.5">Total Selections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Purpose & Direction
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Mission &amp; Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  To provide world-class defence coaching that transforms aspiring candidates
                  into confident, disciplined, and capable officers. We are committed to
                  nurturing leadership qualities, physical fitness, and academic excellence
                  in every student who walks through our gates.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-card border-l-4 border-accent rounded-2xl p-8 shadow-md">
              <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                <Star className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognised globally as the most trusted and successful defence coaching
                institute — producing officers who serve the nation with honour, integrity,
                and excellence. We envision a future where every Indian household takes pride
                in at least one member who serves in the armed forces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              These are not words on a wall — they are the principles we live by, train by, and judge ourselves by every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl p-7 hover:shadow-xl hover:border-accent/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 group-hover:border-accent/40 flex items-center justify-center mb-5 transition-colors">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECTOR'S MESSAGE ───────────────────────────────────────────── */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
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
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              {/* Photo column */}
              <div className="md:col-span-2 flex flex-col items-center text-center">
                <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-accent/50 shadow-2xl mb-5">
                  <Image
                    src="/images/director.jpg"
                    alt="Mr. Gulab Singh — Founder & Director, Warriors Defence Academy"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 208px, 256px"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground">Mr. Gulab Singh</h3>
                <div className="h-0.5 w-12 bg-accent mx-auto my-2" />
                <p className="text-accent text-sm font-semibold tracking-wide">Founder &amp; Director</p>
                <p className="text-primary-foreground/60 text-xs mt-1">Warriors Defence Academy</p>
              </div>

              {/* Quote column */}
              <div className="md:col-span-3">
                <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-4">
                  Director&apos;s Message
                </span>
                <Quote className="h-10 w-10 text-accent/40 mb-4" />

                <div className="space-y-5 text-primary-foreground/85 leading-relaxed text-[15px]">
                  <p>
                    &ldquo;In my experience, a successful life starts with the right mindset. If you
                    begin each day with a positive attitude, you build confidence in yourself
                    and you also motivate others around you.&rdquo;
                  </p>
                  <p>
                    &ldquo;At Warriors Defence Academy, we teach students to stay disciplined, focused,
                    and mentally strong — because these are the qualities needed to become an
                    officer. We train our students to study with a clear goal, improve step by
                    step, and develop the leadership, courage, and responsibility that this nation
                    demands.&rdquo;
                  </p>
                  <p>
                    &ldquo;We are proud of the trust that students and parents have placed in us, and
                    we work every day to maintain the highest standards. Our mission is simple:
                    to help you become a confident, capable, and responsible future officer who
                    serves the nation with pride.&rdquo;
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="tel:+919452245729"
                    className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent hover:bg-accent/30 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +91 94522 45729
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MILESTONES TIMELINE ──────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Milestones &amp; Achievements
            </h2>
            <p className="text-muted-foreground">
              Fourteen years of relentless progress — each milestone a testament to the dedication of our students, faculty, and staff.
            </p>
          </div>

          {/* Desktop timeline: alternating */}
          <div className="hidden md:block max-w-4xl mx-auto relative">
            {/* Centre line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-start gap-8 ${milestone.side === "right" ? "flex-row-reverse" : ""}`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div
                      className={`bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300 ${
                        milestone.side === "right" ? "text-right" : ""
                      }`}
                    >
                      <span className="inline-block bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Centre dot */}
                  <div className="absolute left-1/2 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-accent border-4 border-background shadow-md z-10" />

                  {/* Empty spacer */}
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline: single column */}
          <div className="md:hidden max-w-lg mx-auto">
            <div className="relative pl-8 space-y-10">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-5 top-4 w-4 h-4 rounded-full bg-accent border-4 border-background shadow" />
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                    <span className="inline-block text-accent text-xs font-bold tracking-widest bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-base font-bold text-foreground mb-1">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section className="py-24 bg-secondary/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              The WDA Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why 50,000+ Students Choose Warriors
            </h2>
            <p className="text-muted-foreground">
              Three pillars that separate us from every other coaching institute in India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 bg-primary/10 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/90 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ──────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The People Behind the Mission
            </h2>
            <p className="text-muted-foreground">
              Led by veterans and educators who have dedicated their lives to building India&apos;s next generation of officers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative h-64 bg-primary/10">
                  {leader.image ? (
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <Shield className="h-20 w-20 text-primary/20" />
                    </div>
                  )}
                  {/* Name strip overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{leader.name}</h3>
                  <p className="text-accent text-sm font-semibold mb-3">{leader.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS STRIP ───────────────────────────────────────────── */}
      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Trophy, title: "Best Defence Academy", sub: "Recognised 5 consecutive years" },
              { icon: Medal, title: "Highest NDA Selection Rate", sub: "National Excellence Award" },
              { icon: Star, title: "Top 10 in India", sub: "Featured by national press" },
              { icon: Sword, title: "AIR #1 — Multiple Years", sub: "All-India Rank holders" },
            ].map((award, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <award.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-primary-foreground text-sm">{award.title}</p>
                  <p className="text-primary-foreground/60 text-xs mt-0.5">{award.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-8">
              <Flag className="h-4 w-4 text-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase">Admissions Open — 2026 Batch</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ready to Begin Your
              <span className="text-primary block">Defence Journey?</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Take the first step towards your dream of serving the nation.
              Join the Warriors Defence Academy family — where every student becomes an officer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="h-13 px-8 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base">
                  Enroll Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-13 px-8 border-primary text-primary hover:bg-primary/5 gap-2 text-base">
                  <Phone className="h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              {[
                { icon: CheckCircle, text: "Free counselling session" },
                { icon: CheckCircle, text: "No hidden charges" },
                { icon: CheckCircle, text: "Scholarship available" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-accent" />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
