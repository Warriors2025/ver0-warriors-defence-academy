import { getCourseBySlug } from "@/lib/courses"
import { COURSE_SEED_DETAILS } from "@/lib/course-seed-data"
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
import {
  getEntitySeo, buildPathMetadata, getEntitySchemaJsonLd, getEntityHeadingLevel,
} from "@/lib/seo.server"
import { getSiteContent } from "@/lib/site-content.server"
import { mergeSeoStore, resolveImageSeo } from "@/lib/seo"
import { HeadingTag } from "@/components/seo/heading-tag"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return Object.keys(COURSE_SEED_DETAILS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) return { title: "Course Not Found" }
  const seo = await getEntitySeo("course", slug, {
    title: course.title,
    description: course.description,
    path: `/courses/${slug}`,
    image: course.image,
  })
  return buildPathMetadata(seo, `/courses/${slug}`)
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) notFound()

  const [schema, titleHeading, content] = await Promise.all([
    getEntitySchemaJsonLd("course", slug, {
      title: course.title,
      description: course.description,
      path: `/courses/${slug}`,
      image: course.image,
    }),
    getEntityHeadingLevel("course", slug, "title", "h1"),
    getSiteContent(),
  ])

  const imgSeo = resolveImageSeo(mergeSeoStore(content.seo), course.image, { alt: course.title })

  return (
    <main className="min-h-screen">
      <PageJsonLd data={schema} />
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

            <HeadingTag level={titleHeading} className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              {course.title}
            </HeadingTag>
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
                <Button size="lg" variant="outline" className="h-12 px-7 font-semibold gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
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
