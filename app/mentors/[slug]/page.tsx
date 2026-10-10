import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { branchColors } from "@/components/sections/mentors"
import { getMentorBySlug, getMentors, type Mentor } from "@/lib/mentors-data"
import { SITE_NAME, SITE_URL } from "@/lib/seo"
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL, SITE_WHATSAPP_NUMBER } from "@/lib/cta"
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  GraduationCap,
  MessageCircle,
  Phone,
  Shield,
} from "lucide-react"

function shortName(name: string) {
  const [first] = name.split(",")
  return name.includes("(Retd.)") && !first.includes("(Retd.)") ? `${first.trim()} (Retd.)` : first.trim()
}

function metaDescription(m: Mentor) {
  const cta = " Call now!"
  const base = `${shortName(m.name)}, ${m.designation} at Warriors Defence Academy Lucknow`
  const baseShort = `${shortName(m.name)}, ${m.designation} at Warriors Defence Academy`
  const firstClause = m.expertise.split(/;| and /)[0].trim()
  const candidates = [
    m.expertise && `${base} — ${m.expertise}.${cta}`,
    firstClause && `${base} — ${firstClause}.${cta}`,
    firstClause && `${baseShort} — ${firstClause}.${cta}`,
    `${base}. Retired military mentor for NDA, CDS & SSB aspirants.${cta}`,
  ].filter(Boolean) as string[]
  return candidates.find((c) => c.length <= 160) ?? candidates[candidates.length - 1].slice(0, 160)
}

function absoluteUrl(src?: string) {
  if (!src) return undefined
  return src.startsWith("http") ? src : `${SITE_URL}${src}`
}

export async function generateStaticParams() {
  const mentors = await getMentors()
  return mentors.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const mentor = await getMentorBySlug(slug)
  if (!mentor) return { title: "Mentor Not Found" }

  const title = `${shortName(mentor.name)} | ${SITE_NAME}`
  const description = metaDescription(mentor)
  const url = `${SITE_URL}/mentors/${mentor.slug}`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "profile",
      images: mentor.image ? [{ url: mentor.image, alt: mentor.name }] : undefined,
    },
    twitter: { card: "summary", title, description },
  }
}

export default async function MentorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mentors = await getMentors()
  const mentor = mentors.find((m) => m.slug === slug)
  if (!mentor) notFound()

  const name = shortName(mentor.name)
  const others = mentors.filter((m) => m.slug !== mentor.slug)
  const bio = mentor.bio.length ? mentor.bio : [mentor.expertise].filter(Boolean)
  const url = `${SITE_URL}/mentors/${mentor.slug}`
  const whatsappHref = `https://wa.me/${SITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I'd like to know more about training with ${name} at Warriors Defence Academy.`
  )}`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: `${name} | ${SITE_NAME}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${url}#person` },
        inLanguage: "en-IN",
      },
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: mentor.name,
        jobTitle: mentor.designation,
        description: bio[0] ?? mentor.expertise,
        image: absoluteUrl(mentor.image),
        url,
        worksFor: { "@type": "EducationalOrganization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
        ...(mentor.branch ? { affiliation: { "@type": "GovernmentOrganization", name: mentor.branch } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Mentors", item: `${SITE_URL}/mentors` },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen">
      <PageJsonLd data={schema} />
      <Header />

      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-primary-foreground/50 mb-8 flex-wrap">
            <Link href="/" className="hover:text-primary-foreground/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/mentors" className="hover:text-primary-foreground/80 transition-colors">
              Mentors
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/70">{name}</span>
          </nav>

          <div className="grid md:grid-cols-[minmax(0,20rem)_1fr] lg:grid-cols-[minmax(0,24rem)_1fr] gap-8 lg:gap-14 items-center">
            <div className="relative aspect-square w-full max-w-sm mx-auto md:max-w-none rounded-2xl overflow-hidden ring-1 ring-primary-foreground/20 shadow-2xl bg-primary-foreground/10">
              {mentor.image ? (
                <Image
                  src={mentor.image}
                  alt={`${mentor.name} — ${mentor.designation}, Warriors Defence Academy Lucknow`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 384px, 384px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bold text-6xl tracking-wide">{mentor.initials}</span>
                </div>
              )}
            </div>

            <div>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest">
                <Shield className="h-4 w-4" />
                {mentor.designation}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-tight text-balance">{mentor.name}</h1>
              {mentor.expertise && (
                <p className="text-primary-foreground/80 text-lg mt-4 leading-relaxed max-w-2xl">{mentor.expertise}</p>
              )}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                {mentor.branch && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/20 px-3 py-1.5 text-sm">
                    <Award className="h-4 w-4 text-accent" />
                    {mentor.branch}
                  </span>
                )}
                {mentor.experience && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/20 px-3 py-1.5 text-sm">
                    <Clock className="h-4 w-4 text-accent" />
                    {mentor.experience} of service
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 cursor-pointer">
                  <a href={SITE_PHONE_TEL}>
                    <Phone className="h-4 w-4" />
                    Call {SITE_PHONE_DISPLAY}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-2 cursor-pointer"
                >
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            <article className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Profile &amp; service record</h2>
              <div className="mt-6 space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-prose">
                {bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {mentor.highlights.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">Career highlights</h2>
                  <ul className="mt-5 grid sm:grid-cols-2 gap-3">
                    {mentor.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 bg-muted/40 border border-border rounded-xl p-4 text-sm text-foreground leading-relaxed"
                      >
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 self-start">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-foreground text-lg">At a glance</h2>
                <dl className="mt-4 divide-y divide-border text-sm">
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-muted-foreground">Role</dt>
                    <dd className="font-medium text-foreground text-right">{mentor.designation}</dd>
                  </div>
                  {mentor.branch && (
                    <div className="flex justify-between items-center gap-4 py-3">
                      <dt className="text-muted-foreground">Service</dt>
                      <dd>
                        <Badge variant="outline" className={branchColors[mentor.branch] ?? "text-foreground border-border"}>
                          {mentor.branch}
                        </Badge>
                      </dd>
                    </div>
                  )}
                  {mentor.experience && (
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="text-muted-foreground">Experience</dt>
                      <dd className="font-medium text-foreground">{mentor.experience}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  Train with our mentors
                </h2>
                <ul className="mt-3 text-sm">
                  {[
                    { href: "/courses/ssb", label: "SSB interview coaching" },
                    { href: "/courses/nda", label: "NDA coaching in Lucknow" },
                    { href: "/courses/cds", label: "CDS coaching" },
                    { href: "/admissions", label: "Admissions & batch dates" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between gap-2 py-2.5 border-b border-border last:border-0 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-14 md:py-16 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-foreground">Other mentors</h2>
              <Link href="/mentors" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" />
                All mentors
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/mentors/${m.slug}`}
                    className="group flex items-center gap-4 bg-card border border-border rounded-xl p-3 hover:border-accent/40 hover:shadow-md transition-all"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-primary/10">
                      {m.image ? (
                        <Image src={m.image} alt={m.name} fill className="object-cover" sizes="80px" />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground font-bold">
                          {m.initials}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">{m.designation}</p>
                      <p className="mt-1 font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {m.name}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
