import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { getSiteContent } from "@/lib/site-content.server"
import { getCourseOptions } from "@/lib/courses"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Shield,
  ArrowRight,
  MessageSquare,
} from "lucide-react"
import type { Metadata } from "next"
import { getPageSeo, buildPageMetadata, getPageSchemaJsonLd } from "@/lib/seo.server"
import { PageJsonLd } from "@/components/seo/page-json-ld"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("contact")
  return buildPageMetadata("contact", seo)
}

export default async function ContactPage() {
  const [{ contact, pages }, courseOptions, schema] = await Promise.all([
    getSiteContent(),
    getCourseOptions(),
    getPageSchemaJsonLd("contact"),
  ])

  const page = pages.contact

  const contactCards = [
    {
      icon: MapPin,
      title: "Our Address",
      details: contact.address.split(",").map((s) => s.trim()),
      accent: false,
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [contact.phone1, contact.phone2].filter(Boolean),
      accent: false,
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [contact.email],
      accent: false,
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [page.officeHours, page.sundayHours].filter(Boolean),
      accent: false,
    },
  ]

  return (
    <main className="min-h-screen">
      <PageJsonLd data={schema} />
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
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
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-accent/15 border border-accent/30 rounded-full px-6 py-2.5">
              <MessageSquare className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                {page.hero.eyebrow ?? "Get In Touch"}
              </span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              {page.hero.title}
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              {page.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ───────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, i) => (
              <div
                key={i}
                className="group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 group-hover:border-accent/40 transition-colors">
                  <card.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-3">{card.title}</h3>
                <div className="space-y-1">
                  {card.details.map((d, j) => (
                    <p key={j} className="text-muted-foreground text-sm">
                      {d}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ───────────────────────────────────────────── */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left — Form */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-6 w-1 bg-accent rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Send Us a Message</h2>
              </div>
              <p className="text-muted-foreground mb-8 pl-4">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              <ContactForm courseOptions={courseOptions} />
            </div>

            {/* Right — Map + Quick Contact + Social */}
            <div className="space-y-6">

              {/* Map placeholder */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-video bg-secondary relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(135deg, #000 0, #000 1px, transparent 0, transparent 50%)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="relative text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-8 w-8 text-accent" />
                    </div>
                    <p className="text-foreground font-semibold text-sm">Warriors Defence Academy</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Near Kapoorthala Chauraha, Lucknow — 226024
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact — dark card */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-accent" />
                    <h3 className="text-base font-bold text-primary-foreground">Quick Contact</h3>
                  </div>
                  <p className="text-primary-foreground/70 text-sm mb-5">
                    Need immediate assistance? Reach us directly.
                  </p>
                  <div className="space-y-3">
                    <a
                      href={`tel:${contact.phone1.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-accent hover:text-accent/80 transition-colors group/link"
                    >
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium group-hover/link:underline">{contact.phone1}</span>
                    </a>
                    {contact.phone2 && (
                      <a
                        href={`tel:${contact.phone2.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 text-accent hover:text-accent/80 transition-colors group/link"
                      >
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-medium group-hover/link:underline">{contact.phone2}</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 text-accent hover:text-accent/80 transition-colors group/link"
                    >
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium group-hover/link:underline">{contact.email}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-bold text-foreground mb-1">Follow Us</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stay updated with the latest news, exam tips, and success stories.
                </p>
                <div className="flex gap-3">
                  <a
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/8 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 text-sm font-medium text-foreground"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/8 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 text-sm font-medium text-foreground"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                  <a
                    href={contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/8 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 text-sm font-medium text-foreground"
                  >
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-5 py-2 mb-6">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase">
                Visit Our Campus
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have More
              <span className="text-accent"> Questions?</span>
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-base leading-relaxed">
              Schedule a campus visit and get personalised guidance from our experienced counsellors.
              See our facilities, meet the faculty, and take the first step toward your dream.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                View Courses
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 hover:border-accent hover:text-accent text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
