import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  MapPin,
  Phone,
  Shield,
  Target,
  Trophy,
  Users,
  Building2,
  GraduationCap,
  Star,
  ChevronRight,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { LeadEnquiryForm } from "@/components/lead-enquiry-form"
import { FeaturesSection } from "@/components/sections/features"
import { getPageSeo, buildPageMetadata, getPageSchemaJsonLd } from "@/lib/seo.server"
import { getTestimonials } from "@/lib/testimonials"
import { getSiteContent } from "@/lib/site-content.server"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("best-nda-coaching-in-india")
  return buildPageMetadata("best-nda-coaching-in-india", seo)
}

const PROOF_POINTS = [
  {
    icon: Users,
    value: "50,000+",
    label: "Students trained",
    detail: "Aspirants from across India prepared for NDA, CDS, AFCAT and SSB.",
  },
  {
    icon: Trophy,
    value: "5,000+",
    label: "Defence selections",
    detail: "Officers and cadets recommended across Army, Navy and Air Force pathways.",
  },
  {
    icon: Award,
    value: "15+",
    label: "Years of excellence",
    detail: "Consistent results since 2010 with AIR #1 in multiple NDA cycles.",
  },
  {
    icon: Building2,
    value: "India's largest",
    label: "GTO ground",
    detail: "Full outdoor SSB obstacle and group-task infrastructure on campus.",
  },
]

const WHY_CHOOSE = [
  {
    title: "Written + SSB under one roof",
    body: "Top NDA coaching in India must cover both UPSC written papers and the 5-day SSB. Warriors Defence Academy runs integrated batches so you do not switch institutes mid-journey.",
  },
  {
    title: "Retired military mentors",
    body: "Faculty includes officers and specialists who understand what assessors look for — leadership, OLQs, and exam technique — not generic school tuition.",
  },
  {
    title: "National reach, Lucknow campus",
    body: "Students travel from UP, Bihar, Rajasthan, Madhya Pradesh, Delhi-NCR and beyond. Hostel options and structured residential routines support outstation aspirants.",
  },
  {
    title: "Measurable selection culture",
    body: "Weekly tests, interview drills, and GTO practice turn preparation into a selection pipeline — the reason families shortlist us as best NDA coaching in India.",
  },
]

const PROGRAMMES = [
  {
    title: "NDA Coaching",
    href: "/courses/nda",
    blurb: "Complete written exam + SSB pathway for Class 12 and 12-pass aspirants.",
    image: "/images/courses/nda.webp",
  },
  {
    title: "NDA Foundation",
    href: "/courses/nda-foundation",
    blurb: "Early start after Class 10 — maths, English, GK and habit-building for NDA.",
    image: "/images/courses/nda-foundation.webp",
  },
  {
    title: "SSB Interview",
    href: "/courses/ssb",
    blurb: "Intensive psychology, GTO and personal interview training on a full ground.",
    image: "/images/courses/ssb.webp",
  },
  {
    title: "CDS Coaching",
    href: "/courses/cds",
    blurb: "Graduate-level coaching for IMA, INA, AFA and OTA entries.",
    image: "/images/courses/cds.webp",
  },
]

const SELECTION_CRITERIA = [
  {
    q: "Faculty depth",
    a: "Ask who teaches maths, English, GAT and SSB. Best NDA coaching teams mix subject experts with serving/retired officers.",
  },
  {
    q: "SSB infrastructure",
    a: "Classroom-only institutes struggle at GTO. Prefer campuses with a real obstacle and group-task ground.",
  },
  {
    q: "Track record",
    a: "Look for named selections, AIR ranks and year-wise results — not vague “100% success” claims.",
  },
  {
    q: "Batch discipline",
    a: "Top NDA coaching in India runs timed mocks, PT, and counselling — not open-ended lectures.",
  },
  {
    q: "Transparency on fees",
    a: "Clear fee structures, scholarships and what is included (hostel, material, SSB module) avoid mid-course surprises.",
  },
]

const JOURNEY = [
  {
    step: "1",
    title: "Counselling & batch fit",
    text: "Share your class, attempt timeline and strengths. We map NDA written, foundation or SSB-only paths.",
  },
  {
    step: "2",
    title: "Written mastery",
    text: "Maths, English and GAT with weekly tests, doubt desks and UPSC-pattern mocks.",
  },
  {
    step: "3",
    title: "SSB & personality",
    text: "OIR, PP&DT, psychology, GTO tasks and interview practice with assessor-style feedback.",
  },
  {
    step: "4",
    title: "Selection & beyond",
    text: "Medical guidance, documentation support and alumni mentorship after recommendation.",
  },
]

const FAQS = [
  {
    q: "Which is the best NDA coaching in India?",
    a: "Warriors Defence Academy in Lucknow, Uttar Pradesh ranks among the best NDA coaching institutes in India for integrated written + SSB training, with 50,000+ students trained, 5,000+ selections, and India's largest GTO ground.",
  },
  {
    q: "Is Warriors Defence Academy among the top NDA coaching institutes?",
    a: "Yes. Families shortlist us as top NDA coaching in India because of consistent NDA/CDS/AFCAT results, retired military mentors, residential options for outstation students, and a selection-focused campus culture.",
  },
  {
    q: "Can I join if I live outside Lucknow?",
    a: "Absolutely. Aspirants from across India enrol for day and residential programmes. Call +91 94522 45729 for hostel availability and batch start dates.",
  },
  {
    q: "What is the difference between best NDA coaching and ordinary tuition?",
    a: "Ordinary tuition stops at textbooks. Best NDA coaching builds officer-like qualities — fitness, communication, group behaviour and interview presence — alongside UPSC written scores.",
  },
  {
    q: "How soon can I start?",
    a: "New batches open regularly for NDA written, foundation and SSB. Submit the counselling form on this page or register online — a counsellor will confirm the next available seat.",
  },
  {
    q: "Where can I see results and campus facilities?",
    a: "Browse our NDA coaching results, facilities including the GTO ground, and campus gallery — then book a visit or counselling call.",
  },
]

export default async function BestNdaCoachingInIndiaPage() {
  const [schema, testimonials, content] = await Promise.all([
    getPageSchemaJsonLd("best-nda-coaching-in-india"),
    getTestimonials(),
    getSiteContent(),
  ])

  const { contact, sections } = content
  const featuredQuotes = testimonials.slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <PageJsonLd data={schema} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="absolute -right-24 top-1/4 hidden opacity-[0.07] lg:block">
          <Shield className="h-[28rem] w-[28rem]" />
        </div>

        <div className="container relative z-10 mx-auto grid gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/15 px-4 py-1.5">
              <Target className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Pan-India NDA aspirants
              </span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl lg:text-[3.25rem]">
              Best NDA Coaching in{" "}
              <span className="text-accent">India</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Warriors Defence Academy is trusted as best NDA coaching and top NDA coaching in India
              for students who want UPSC written mastery, full SSB training, and a campus built for
              selection — 50,000+ trained, 5,000+ selections, India&apos;s largest GTO ground in
              Lucknow, Uttar Pradesh.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-12 cursor-pointer gap-2 bg-accent px-7 font-semibold text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link href="/register">
                  Apply for admission
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 cursor-pointer gap-2 border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <a href={`tel:${contact.phone1.replace(/\s/g, "")}`}>
                  <Phone className="h-4 w-4" />
                  {contact.phone1}
                </a>
              </Button>
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary-foreground/65">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                Lucknow campus · students from across India
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-accent" />
                Last updated: September 2026
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-primary-foreground/15 bg-background p-5 text-foreground shadow-2xl shadow-black/25 md:p-6">
            <p className="text-sm font-semibold text-foreground">Free counselling for NDA aspirants</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us your class and goal — we call back with batch and fee guidance.
            </p>
            <div className="mt-5">
              <LeadEnquiryForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* Same campus image mosaic as homepage second section */}
      <FeaturesSection
        eyebrow="Campus & training edge"
        title="Why top NDA coaching in India needs real infrastructure"
        subtitle="India's largest GTO ground, library, mock tests, sports and mentorship — the same campus strengths students see on our homepage, built for selection."
        features={sections.features}
      />

      {/* Proof strip */}
      <section className="border-b border-border bg-muted/40 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {PROOF_POINTS.map((item) => (
              <div key={item.label} className="text-center md:text-left">
                <item.icon className="mx-auto mb-2 h-5 w-5 text-accent md:mx-0" />
                <p className="text-2xl font-bold text-foreground md:text-3xl">{item.value}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{item.label}</p>
                <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why best */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Why families choose us
            </Badge>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Why Warriors is best NDA coaching in India
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Searching for the best NDA coaching or top NDA coaching in India usually means one
              question: who actually prepares you for both the written exam and SSB? Here is what
              sets Warriors Defence Academy apart.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {WHY_CHOOSE.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visual proof */}
      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/features/gto-ground.webp"
                alt="Best NDA coaching in India — students training on India's largest GTO ground at Warriors Defence Academy Lucknow"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Top NDA coaching needs a real training ground
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Many institutes advertise &quot;SSB included&quot; but train only in classrooms.
                At Warriors Defence Academy, aspirants practise group tasks, command tasks and
                outdoor obstacles on India&apos;s largest GTO ground — a decisive edge for anyone
                comparing top NDA coaching in India.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Full outdoor GTO and obstacle practice",
                  "Psychology labs and interview rooms",
                  "Library, mock-test centre and PT routine",
                  "Mentorship from retired military officers",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="cursor-pointer gap-2">
                  <Link href="/facilities">
                    Explore facilities
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="cursor-pointer gap-2">
                  <Link href="/results">View NDA results</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to choose */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              How to choose the best NDA coaching in India
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Use this checklist when you compare academies. Best NDA coaching is not the loudest
              advertisement — it is the institute that can prove faculty, ground, results and
              routine.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {SELECTION_CRITERIA.map((item, i) => (
              <div
                key={item.q}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{item.q}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="bg-muted/35 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                NDA programmes that convert effort into selection
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Whether you need long-term foundation, NDA written, or SSB-only polish, pick the
                path that matches your timeline.
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              All courses <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMMES.map((course) => (
              <Link
                key={course.href}
                href={course.href}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/35 hover:shadow-xl"
              >
                <div className="relative h-40 overflow-hidden bg-primary/10">
                  <Image
                    src={course.image}
                    alt={`${course.title} at Warriors Defence Academy — top NDA coaching in India`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{course.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    View details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Student journey
            </Badge>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              From counselling call to NDA recommendation
            </h2>
            <p className="mt-4 text-muted-foreground">
              A clear pipeline is what separates top NDA coaching from scattered self-study.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="text-3xl font-bold text-accent/80">{item.step}</span>
                <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">What selected cadets say</h2>
            <p className="mt-3 text-primary-foreground/75">
              Social proof from aspirants who trusted Warriors Defence Academy for NDA and related
              defence entries.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredQuotes.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6"
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-primary-foreground/85">&ldquo;{t.content}&rdquo;</p>
                <footer className="mt-4 border-t border-primary-foreground/15 pt-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-accent">{t.achievement}</p>
                  <p className="text-xs text-primary-foreground/60">{t.course}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Local + India bridge */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Best NDA coaching in India — based in Lucknow
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our national reputation is built on a single high-discipline campus in Lucknow,
                Uttar Pradesh. If you are also searching locally, see our dedicated page for{" "}
                <Link href="/" className="font-medium text-accent hover:underline">
                  best NDA coaching in Lucknow
                </Link>
                . If you want the full India-wide comparison story — faculty, GTO ground, results
                and enrolment — you are on the right page.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Visit us at 545-Ga/1 Chha, Near Kapoorthala Chauraha, Beside Raidas Railway Crossing,
                Lucknow - 226024, or start with a phone counselling session before you travel.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="cursor-pointer gap-2">
                  <Link href="/admissions">
                    <GraduationCap className="h-4 w-4" />
                    Admission process
                  </Link>
                </Button>
                <Button asChild variant="outline" className="cursor-pointer gap-2">
                  <Link href="/contact">
                    <BookOpen className="h-4 w-4" />
                    Contact &amp; map
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/carousel-1.webp"
                alt="Top NDA coaching in India campus life at Warriors Defence Academy Lucknow"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/35 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              FAQs on best &amp; top NDA coaching in India
            </h2>
            <p className="mt-3 text-muted-foreground">
              Straight answers for parents and aspirants shortlisting institutes.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-border bg-card open:shadow-md"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {faq.q}
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                  </span>
                </summary>
                <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + form */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-20">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="container relative z-10 mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to join India&apos;s selection-focused NDA academy?
            </h2>
            <p className="mt-4 text-primary-foreground/80 leading-relaxed">
              Seats in flagship NDA and foundation batches are limited each cycle. Get a free
              counselling call, clarify fees, and lock your start date with Warriors Defence Academy —
              trusted for best NDA coaching in India.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-primary-foreground/85">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                Free career counselling within 24 hours
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                Guidance on NDA written, foundation &amp; SSB
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                Call {contact.phone1} or {contact.phone2}
              </li>
            </ul>
            <div className="mt-8">
              <Button
                size="lg"
                className="h-12 cursor-pointer gap-2 bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link href="/register">
                  Register online
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-primary-foreground/15 bg-background p-6 text-foreground">
            <p className="text-lg font-semibold">Request a callback</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Prefer WhatsApp or a quick form? Leave your number — we handle the rest.
            </p>
            <div className="mt-5">
              <LeadEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
