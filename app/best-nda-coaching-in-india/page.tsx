import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle,
  ChevronRight,
  Clock,
  GraduationCap,
  MapPin,
  Phone,
  Shield,
  Star,
  Target,
  Trophy,
  TriangleAlert,
  Users,
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
import { BEST_NDA_FAQS } from "@/lib/best-nda-faqs"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("best-nda-coaching-in-india")
  return buildPageMetadata("best-nda-coaching-in-india", seo)
}

const chip =
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-full border border-border bg-card px-4 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"

const TOC = [
  { id: "selections", label: "Latest selections" },
  { id: "quick-answer", label: "Quick answer" },
  { id: "nda-exam", label: "NDA exam" },
  { id: "compare", label: "Compare institutes" },
  { id: "why-warriors", label: "Why Warriors" },
  { id: "your-path", label: "Your path" },
  { id: "cost", label: "Fees" },
  { id: "faq", label: "FAQs" },
]

const PROOF_POINTS = [
  { icon: Users, value: "50,000+", label: "Students trained" },
  { icon: Trophy, value: "5,000+", label: "Defence selections" },
  { icon: Award, value: "Since 2010", label: "15+ years of results" },
  { icon: Building2, value: "Largest", label: "GTO ground in India" },
]

/** Real selection posters published by the academy (NDA-II / CDS-II qualifiers). */
const SELECTIONS = [
  {
    name: "Dhanraj Jat",
    exam: "NDA-II",
    origin: "Ajmer, Rajasthan",
    image: "/images/selections/selection-1.webp",
  },
  {
    name: "Nitin Singh Tomar",
    exam: "NDA-II",
    origin: "Gwalior, Madhya Pradesh",
    image: "/images/selections/selection-3.webp",
  },
  {
    name: "Palak Singh",
    exam: "NDA-II",
    origin: "11th Foundation programme",
    image: "/images/selections/selection-2.webp",
  },
  {
    name: "Akanksha Pandey",
    exam: "CDS-II",
    origin: "Lucknow · OTA preference",
    image: "/images/selections/selection-4.webp",
  },
]

const EXAM_ROWS = [
  { stage: "Written — Mathematics", marks: "300", detail: "2.5 hours, UPSC objective paper" },
  { stage: "Written — General Ability Test", marks: "600", detail: "English 200 + General Knowledge 400, 2.5 hours" },
  { stage: "SSB interview (5 days)", marks: "900", detail: "OIR, PP&DT, psychology, GTO tasks, personal interview" },
  { stage: "Final merit", marks: "1,800", detail: "Written 900 + SSB 900 — half of selection is decided at SSB" },
]

const COMPARE_ROWS = [
  {
    check: "SSB training ground",
    ask: "Is group and command-task practice outdoors on a real ground, or only in a classroom?",
    wda: "India's largest GTO ground on campus — obstacles, group tasks and command tasks.",
  },
  {
    check: "Faculty background",
    ask: "Who teaches Maths, English, GAT and SSB, and have they served or assessed?",
    wda: "Retired military officers, ex-SSB interviewing officers, GTOs and psychologists.",
    href: "/mentors",
    hrefLabel: "Meet the mentors",
  },
  {
    check: "Results you can verify",
    ask: "Are results named, not just “100% success”?",
    wda: "Named qualifiers with UPSC admit cards, 5,000+ selections since 2010.",
    href: "/results",
    hrefLabel: "See NDA results",
  },
  {
    check: "Written + SSB together",
    ask: "Is one batch covering both, or do you switch institutes mid-way?",
    wda: "Integrated NDA programme: UPSC written, SSB and physical training in one pipeline.",
    href: "/courses/nda",
    hrefLabel: "NDA course",
  },
  {
    check: "Hostel & routine",
    ask: "Is there supervised residential support for outstation students?",
    wda: "Hostel accommodation for outstation aspirants with a structured daily routine.",
    href: "/facilities",
    hrefLabel: "Facilities",
  },
  {
    check: "Fee transparency",
    ask: "Is every inclusion (material, mocks, hostel, SSB module) stated in writing?",
    wda: "Exact fee and inclusions explained in a free counselling call before you enrol.",
    href: "/admissions",
    hrefLabel: "Admissions",
  },
]

const RED_FLAGS = [
  "“100% selection guaranteed” — no institute controls UPSC or SSB outcomes.",
  "SSB “included” but no outdoor ground to practise group and command tasks.",
  "Results shown without names, years or exam cycle.",
  "Fee quoted verbally, with hostel, material and mock tests unclear.",
  "No faculty names or service background on the website.",
]

const WHY_CHOOSE = [
  { title: "Written + SSB under one roof", body: "Selection is 900 marks written and 900 marks SSB. Integrated batches mean you never switch institutes between the two." },
  { title: "Retired military mentors", body: "Officers and specialists who know what assessors look for — leadership, OLQs and exam technique — not generic school tuition." },
  { title: "A real GTO ground", body: "Group discussion, group planning, command tasks and obstacles are practised outdoors, repeatedly, with assessor-style feedback." },
  { title: "National reach, Lucknow campus", body: "Qualifiers come from Rajasthan, Madhya Pradesh and Uttar Pradesh and beyond, supported by hostel and a disciplined routine." },
]

const PATHS = [
  {
    title: "After Class 10",
    text: "Integrated foundation programme: Class 11–12 schooling, NDA written, daily PT and early SSB grooming.",
    href: "/courses/nda-foundation",
    cta: "NDA Foundation course",
  },
  {
    title: "After Class 12",
    text: "Focused 6–12 month preparation for the UPSC written exam, mock tests and the full 5-day SSB.",
    href: "/courses/nda",
    cta: "NDA coaching course",
  },
  {
    title: "SSB only",
    text: "Cleared the written exam? Train OIR, psychology, GTO tasks and interview on the ground.",
    href: "/courses/ssb",
    cta: "SSB interview course",
  },
  {
    title: "Graduates (CDS)",
    text: "Finished graduation? CDS coaching covers IMA, INA, AFA and OTA entries with SSB prep.",
    href: "/courses/cds",
    cta: "CDS coaching course",
  },
]

const JOURNEY = [
  { step: "1", title: "Counselling & batch fit", text: "Share your class, attempt timeline and strengths; we map written, foundation or SSB-only paths." },
  { step: "2", title: "Written mastery", text: "Maths, English and GAT with weekly tests, doubt desks and UPSC-pattern mocks." },
  { step: "3", title: "SSB & personality", text: "OIR, PP&DT, psychology, GTO tasks and interviews with assessor-style feedback." },
  { step: "4", title: "Selection & beyond", text: "Medical guidance, documentation support and alumni mentorship after recommendation." },
]

/** Tailwind classes that restack a table into labelled cards below md, keeping one DOM for SEO. */
const stackTable = {
  table: "w-full text-left text-sm max-md:block",
  thead: "max-md:sr-only",
  tbody: "max-md:block max-md:space-y-3 md:divide-y md:divide-border",
  tr: "max-md:block max-md:rounded-xl max-md:border max-md:border-border max-md:bg-card max-md:p-4",
  cell:
    "px-4 py-4 max-md:block max-md:px-0 max-md:py-1.5 max-md:before:mb-0.5 max-md:before:block max-md:before:text-[0.68rem] max-md:before:font-semibold max-md:before:uppercase max-md:before:tracking-wider max-md:before:text-accent max-md:before:content-[attr(data-label)]",
}

export default async function BestNdaCoachingInIndiaPage() {
  const [schema, testimonials, content] = await Promise.all([
    getPageSchemaJsonLd("best-nda-coaching-in-india"),
    getTestimonials(),
    getSiteContent(),
  ])

  const { contact, sections } = content
  const featuredQuotes = testimonials.slice(0, 3)
  const telHref = `tel:${contact.phone1.replace(/\s/g, "")}`

  return (
    <main className="min-h-screen bg-background">
      <PageJsonLd data={schema} />
      <Header />

      {/* Hero — thesis: selection is half written, half SSB */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="absolute -right-24 top-1/4 hidden opacity-[0.06] lg:block">
          <Shield className="h-[28rem] w-[28rem]" />
        </div>

        <div className="container relative z-10 mx-auto grid gap-10 px-4 py-12 md:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-primary-foreground/70">
              <Link href="/" className="hover:text-primary-foreground">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary-foreground/90">Best NDA Coaching in India</span>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5">
              <Target className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                2026 buyer&apos;s guide · NDA aspirants across India
              </span>
            </div>

            <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Best NDA Coaching in <span className="text-accent">India 2026</span>: How to Choose
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/90 md:text-lg">
              The best NDA coaching in India prepares you for both halves of selection — the UPSC
              written exam and the 5-day SSB — with officers who have served and a real GTO ground.
              Warriors Defence Academy in Lucknow has trained 50,000+ students, with 5,000+ defence
              selections since 2010.
            </p>

            {/* Signature: the 1,800-mark split */}
            <figure className="mt-8 max-w-2xl" aria-label="NDA merit marks: 900 written, 900 SSB">
              <div className="flex items-end justify-between font-mono text-[0.7rem] uppercase tracking-widest text-primary-foreground/70">
                <span>NDA merit · 1,800 marks</span>
                <span>50 / 50</span>
              </div>
              <div className="mt-2 grid grid-cols-2 overflow-hidden rounded-lg border border-primary-foreground/25 text-sm">
                <div className="bg-primary-foreground/10 px-4 py-3">
                  <p className="font-mono text-2xl font-bold tabular-nums md:text-3xl">900</p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/85">
                    Written · Maths 300 + GAT 600
                  </p>
                </div>
                <div className="bg-accent px-4 py-3 text-accent-foreground">
                  <p className="font-mono text-2xl font-bold tabular-nums md:text-3xl">900</p>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wider">SSB · 5 days on a ground</p>
                </div>
              </div>
              <figcaption className="mt-2 text-sm text-primary-foreground/80">
                Half of your selection is decided at SSB — so the ground you train on matters as much as
                the classroom.
              </figcaption>
            </figure>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-12 cursor-pointer gap-2 bg-accent px-7 font-semibold text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <a href={telHref}>
                  <Phone className="h-4 w-4" />
                  Call now for counselling
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 cursor-pointer gap-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <a
                  href="https://wa.me/917081011964?text=Hi%21%20I%20want%20counselling%20for%20best%20NDA%20coaching%20in%20India."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
              </Button>
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary-foreground/75">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                Lucknow campus · students from across India
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                Updated October 2026
              </span>
            </p>
            <p className="mt-2 text-xs text-primary-foreground/70">
              Written by the Warriors Defence Academy faculty team —{" "}
              <Link href="/mentors" className="underline underline-offset-2 hover:text-primary-foreground">
                retired armed forces officers
              </Link>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-primary-foreground/15 bg-background p-5 text-foreground shadow-2xl shadow-black/25 md:p-6 lg:mt-8">
            <p className="text-base font-semibold text-foreground">Free counselling for NDA aspirants</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us your class and goal — we call back with batch and fee guidance.
            </p>
            <div className="mt-5">
              <LeadEnquiryForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* Contents */}
      <nav aria-label="On this page" className="border-b border-border bg-background">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3">
          {TOC.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={chip}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Proof strip */}
      <section className="border-b border-border bg-muted/40 py-8">
        <div className="container mx-auto px-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
            {PROOF_POINTS.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <span>
                  <span className="block text-xl font-bold leading-tight text-foreground md:text-2xl">{item.value}</span>
                  <span className="block text-xs text-muted-foreground md:text-sm">{item.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest selections */}
      <section id="selections" className="scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                Verified with UPSC admit cards
              </Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Latest NDA &amp; CDS selections from Warriors Defence Academy
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Proof beats promises. These aspirants qualified NDA-II and CDS-II — from
                Rajasthan, Madhya Pradesh and our own Foundation programme. Each poster shows the UPSC
                admit card and roll number.
              </p>
            </div>
            <Link
              href="/results"
              className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              All results <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
            {SELECTIONS.map((s) => (
              <li
                key={s.name}
                className="w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-lg sm:w-[46%] md:w-auto"
              >
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={s.image}
                    alt={`${s.name} qualified ${s.exam} — NDA coaching selection at Warriors Defence Academy Lucknow`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 78vw, (max-width: 1024px) 45vw, 25vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{s.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{s.origin}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-primary px-2 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-primary-foreground">
                    {s.exam}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Showing our latest published qualifiers. Want to see a batch like yours? Call{" "}
            <a href={telHref} className="font-medium text-accent hover:underline">{contact.phone1}</a>.
          </p>
        </div>
      </section>

      {/* Quick answer */}
      <section id="quick-answer" className="scroll-mt-24 bg-secondary/30 py-16 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <Badge variant="secondary" className="mb-4">Quick answer</Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What makes the best NDA coaching in India?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              There is no official ranking of NDA coaching institutes, and most “top 10” lists online are
              written by the institutes themselves. Test every academy against the same five checks
              instead — and ask for each answer in writing.
            </p>
          </div>
          <ol className="space-y-3">
            {[
              ["Faculty with service experience", "Who teaches, and have they served or assessed?"],
              ["A real outdoor GTO ground", "SSB is 900 of 1,800 marks — it can't be learned from slides."],
              ["Named, verifiable results", "Admit cards and roll numbers, not “100% success”."],
              ["Written + SSB in one programme", "No switching institutes between the two halves."],
              ["Fees with inclusions in writing", "Hostel, material, mocks and SSB module stated up front."],
            ].map(([title, text]) => (
              <li key={title} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* NDA exam at a glance */}
      <section id="nda-exam" className="scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              NDA exam pattern and eligibility at a glance
            </h2>
            <p className="mt-4 text-muted-foreground">
              Know what you are preparing for before comparing institutes. UPSC conducts the NDA exam
              twice a year; confirm dates in the official{" "}
              <a
                href="https://upsc.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                UPSC notification
              </a>{" "}
              or our guide to{" "}
              <Link href="/blog/nda-2026-exam-dates-eligibility-application-process" className="font-medium text-accent hover:underline">
                NDA 2026 exam dates and application process
              </Link>
              .
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card md:bg-card">
            <table className={stackTable.table}>
              <caption className="sr-only">NDA selection stages and marks</caption>
              <thead className={`${stackTable.thead} bg-primary text-primary-foreground`}>
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Stage</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Marks</th>
                  <th scope="col" className="px-4 py-3 font-semibold">What it covers</th>
                </tr>
              </thead>
              <tbody className={`${stackTable.tbody} max-md:p-3`}>
                {EXAM_ROWS.map((row) => (
                  <tr key={row.stage} className={stackTable.tr}>
                    <th scope="row" data-label="Stage" className={`${stackTable.cell} font-medium text-foreground`}>
                      {row.stage}
                    </th>
                    <td data-label="Marks" className={`${stackTable.cell} font-mono text-base font-bold tabular-nums text-accent`}>
                      {row.marks}
                    </td>
                    <td data-label="What it covers" className={`${stackTable.cell} text-muted-foreground`}>
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Who can apply?</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />Unmarried Indian citizens; women eligible since 2022</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />Class 12 pass or appearing</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />Age roughly 16.5–19.5 years at course start</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />Army: any stream · Air Force &amp; Navy: Physics + Maths</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Why this matters when choosing coaching</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                One-third negative marking in both written papers rewards accuracy, not just speed — so look
                for weekly timed mocks. And because SSB carries equal weight, check where and how it is
                trained before you pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compare institutes */}
      <section id="compare" className="scroll-mt-24 bg-muted/35 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              How to compare NDA coaching institutes in India
            </h2>
            <p className="mt-4 text-muted-foreground">
              Use this checklist on every academy you shortlist — including us. The last column shows how
              Warriors Defence Academy answers each question.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card">
            <table className={stackTable.table}>
              <caption className="sr-only">Checklist to compare NDA coaching institutes</caption>
              <thead className={`${stackTable.thead} bg-primary text-primary-foreground`}>
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Check</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Ask every institute</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Warriors Defence Academy</th>
                </tr>
              </thead>
              <tbody className={`${stackTable.tbody} align-top max-md:p-3`}>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.check} className={stackTable.tr}>
                    <th scope="row" data-label="Check" className={`${stackTable.cell} font-semibold text-foreground md:w-1/5`}>
                      {row.check}
                    </th>
                    <td data-label="Ask every institute" className={`${stackTable.cell} text-muted-foreground md:w-2/5`}>
                      {row.ask}
                    </td>
                    <td data-label="Warriors Defence Academy" className={`${stackTable.cell} bg-accent/[0.07] text-foreground max-md:rounded-md max-md:px-3`}>
                      {row.wda}
                      {row.href && (
                        <Link
                          href={row.href}
                          className="mt-1.5 flex min-h-8 items-center gap-1 text-xs font-semibold text-accent hover:underline"
                        >
                          {row.hrefLabel} <ArrowRight className="h-3 w-3" aria-hidden />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <TriangleAlert className="h-5 w-5 text-destructive" aria-hidden />
              Red flags when choosing NDA coaching
            </h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              {RED_FLAGS.map((flag) => (
                <li key={flag} className="flex gap-2">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Campus mosaic from CMS */}
      <FeaturesSection
        eyebrow="Campus & training edge"
        title="Why top NDA coaching in India needs real infrastructure"
        subtitle="India's largest GTO ground, library, mock tests, sports and mentorship — built for selection, not just classes."
        features={sections.features}
      />

      {/* Why Warriors */}
      <section id="why-warriors" className="scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/features/gto-ground.webp"
                alt="NDA coaching students practising group tasks on India's largest GTO ground at Warriors Defence Academy Lucknow"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <Badge variant="secondary" className="mb-4">Why aspirants choose us</Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Why Warriors Defence Academy for NDA coaching
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Many institutes advertise “SSB included” but train only in classrooms. At Warriors,
                aspirants practise group tasks, command tasks and outdoor obstacles on India&apos;s largest
                GTO ground — the biggest difference when comparing NDA coaching in India.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="cursor-pointer gap-2">
                  <Link href="/facilities">Explore facilities<ChevronRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="cursor-pointer gap-2">
                  <Link href="/results">View NDA results</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {WHY_CHOOSE.map((item) => (
              <article key={item.title} className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow duration-200 hover:shadow-lg">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Your path */}
      <section id="your-path" className="scroll-mt-24 bg-muted/35 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Find the right NDA coaching for your situation
            </h2>
            <p className="mt-3 text-muted-foreground">
              The best NDA coaching depends on where you are today. Pick your path:
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PATHS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex cursor-pointer flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent/50 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <GraduationCap className="mb-3 h-6 w-6 text-accent" aria-hidden />
                <h3 className="font-semibold text-foreground group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  {p.cta} <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
            Outside Lucknow? Hostel accommodation is available for outstation students. Online classes suit
            Maths and GAT theory, but SSB group and command tasks need practice in person on a ground.
            Girls join too — Palak Singh qualified NDA-II from our 11th Foundation programme. Call{" "}
            <a href={telHref} className="font-medium text-accent hover:underline">{contact.phone1}</a>{" "}
            to check current batches.
          </p>
        </div>
      </section>

      {/* Cost */}
      <section id="cost" className="scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What does NDA coaching cost in India?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Fees differ sharply because programmes differ — a 3-month crash course, a one-year written + SSB
            batch and a multi-year foundation programme with schooling are not comparable. Published figures
            online also conflict, so compare these factors rather than headline prices:
          </p>
          <ul className="mt-5 space-y-3">
            {[
              "Programme length (crash course, 1 year or foundation)",
              "Whether SSB training and the GTO ground are included or charged separately",
              "Hostel, mess and transport — included or extra",
              "Study material, test series and mock interviews",
              "Scholarships and instalment options",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Warriors Defence Academy confirms the exact fee and everything it includes in a free counselling
            call, so you can compare like with like. See the{" "}
            <Link href="/admissions" className="font-medium text-accent hover:underline">admission process</Link>{" "}
            or{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">contact us</Link>.
          </p>
        </div>
      </section>

      {/* Journey — a true sequence, so numbered */}
      <section className="bg-muted/35 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Student journey</Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              From counselling call to NDA recommendation
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((item) => (
              <li key={item.step} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-3xl font-bold tabular-nums text-accent">{item.step}</span>
                <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">What selected cadets say</h2>
            <p className="mt-3 text-primary-foreground/80">
              Aspirants who trusted Warriors Defence Academy for NDA and related defence entries.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredQuotes.map((t) => (
              <blockquote key={t.name} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
                <div className="mb-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-primary-foreground/90">&ldquo;{t.content}&rdquo;</p>
                <footer className="mt-4 border-t border-primary-foreground/15 pt-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-accent">{t.achievement}</p>
                  <p className="text-xs text-primary-foreground/70">{t.course}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Local bridge */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Best NDA coaching in India — based in Lucknow
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our national reputation is built on a single high-discipline campus in Lucknow, Uttar
                Pradesh. Searching locally? See{" "}
                <Link href="/" className="font-medium text-accent hover:underline">best NDA coaching in Lucknow</Link>.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Visit us at 545-Ga/1 Chha, Near Kapoorthala Chauraha, Beside Raidas Railway Crossing,
                Lucknow - 226024, or start with a phone counselling session before you travel.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="cursor-pointer gap-2">
                  <Link href="/admissions"><GraduationCap className="h-4 w-4" />Admission process</Link>
                </Button>
                <Button asChild variant="outline" className="cursor-pointer gap-2">
                  <Link href="/contact"><BookOpen className="h-4 w-4" />Contact &amp; map</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/carousel-1.webp"
                alt="NDA coaching campus life at Warriors Defence Academy Lucknow"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — fully visible text, mirrored in FAQPage schema */}
      <section id="faq" className="scroll-mt-24 bg-muted/35 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              FAQs on the best NDA coaching in India
            </h2>
            <p className="mt-3 text-muted-foreground">Straight answers for parents and aspirants shortlisting institutes.</p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {BEST_NDA_FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + form */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-20">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="container relative z-10 mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Ready to start NDA coaching with India&apos;s selection-focused academy?
            </h2>
            <p className="mt-4 leading-relaxed text-primary-foreground/85">
              Seats in NDA and foundation batches are limited each cycle. Get a free counselling call,
              clarify fees and inclusions, and lock your start date.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-primary-foreground/90">
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" aria-hidden />Free career counselling within 24 hours</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" aria-hidden />Guidance on NDA written, foundation &amp; SSB</li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" aria-hidden />
                Call {contact.phone1}{contact.phone2 ? ` or ${contact.phone2}` : ""}
              </li>
            </ul>
            <div className="mt-8">
              <Button size="lg" className="h-12 cursor-pointer gap-2 bg-accent font-semibold text-accent-foreground hover:bg-accent/90" asChild>
                <a href={telHref}>
                  <Phone className="h-4 w-4" />
                  Call for admission
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-primary-foreground/15 bg-background p-6 text-foreground">
            <p className="text-lg font-semibold">Request a callback</p>
            <p className="mt-1 text-sm text-muted-foreground">Prefer WhatsApp or a quick form? Leave your number — we handle the rest.</p>
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
