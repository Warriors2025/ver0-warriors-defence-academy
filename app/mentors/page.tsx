import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MentorsGrid, MentorsTrustSignals } from "@/components/sections/mentors"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { getMentors } from "@/lib/mentors-data"
import { getPageSeo, buildPageMetadata, getPageSchemaJsonLd } from "@/lib/seo.server"
import { SITE_URL } from "@/lib/seo"
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/cta"
import { Brain, ChevronRight, ClipboardCheck, Medal, Phone, Shield, Users } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("mentors")
  return buildPageMetadata("mentors", seo)
}

const assessorExperience = [
  {
    icon: ClipboardCheck,
    title: "Interviewing Officer insight",
    text: "Former SSB Interviewing Officers run mock personal interviews exactly the way the board does — and tell you what they look for.",
  },
  {
    icon: Users,
    title: "GTO task practice",
    text: "Ex-Group Testing Officers coach group discussions, planning exercises and outdoor tasks on India's largest GTO ground.",
  },
  {
    icon: Brain,
    title: "Psychology assessment",
    text: "A DIPR-qualified psychology assessor prepares you for TAT, WAT, SRT and the self-description test.",
  },
  {
    icon: Medal,
    title: "Leadership from the top",
    text: "Retired generals who commanded corps, divisions and the Army War College shape the officer-like qualities the SSB tests for.",
  },
]

export default async function MentorsPage() {
  const [mentors, schema] = await Promise.all([getMentors(), getPageSchemaJsonLd("mentors")])

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Warriors Defence Academy Mentors",
    itemListElement: mentors.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/mentors/${m.slug}`,
      name: m.name,
    })),
  }

  return (
    <main className="min-h-screen">
      <PageJsonLd data={schema ? [schema, itemList] : itemList} />
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
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-primary-foreground/50 mb-6">
            <Link href="/" className="hover:text-primary-foreground/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/70">Mentors</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest">
              <Shield className="h-4 w-4" />
              Expert Guidance
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
              Meet the Warriors Defence Academy Mentors
            </h1>
            <p className="text-primary-foreground/75 text-lg mt-5 leading-relaxed">
              The Warriors Defence Academy mentors are retired military officers — generals, former SSB Interviewing
              Officers, Group Testing Officers and psychologists — with more than 190 years of combined service in the
              Army, Navy and Coast Guard. Their first-hand experience of the NDA, CDS, SSB and Air Force selection
              process gives our aspirants insight no textbook can.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Retired military officers who mentor our aspirants</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              More than instructors, they inspire and motivate every student, building the confidence and discipline
              needed at each stage of a defence career. Open a profile to read each mentor&apos;s full service record.
            </p>
          </div>

          <MentorsGrid mentors={mentors} priorityCount={3} />

          <div className="mt-12">
            <MentorsTrustSignals />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-t border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How our mentors prepare you for the SSB</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Our mentors have sat on the other side of the table — they have assessed candidates at the Services
              Selection Board, so our{" "}
              <Link href="/courses/ssb" className="font-medium text-primary underline-offset-4 hover:underline">
                SSB interview coaching
              </Link>{" "}
              mirrors the real five-day procedure.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {assessorExperience.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-card border border-border rounded-2xl p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold">Train under India&apos;s finest defence mentors</h2>
            <p className="text-primary-foreground/75 mt-3 leading-relaxed">
              Join our{" "}
              <Link href="/courses/nda" className="font-medium text-accent underline-offset-4 hover:underline">
                NDA coaching in Lucknow
              </Link>{" "}
              or{" "}
              <Link href="/courses/cds" className="font-medium text-accent underline-offset-4 hover:underline">
                CDS coaching
              </Link>{" "}
              and learn directly from the officers above. See the{" "}
              <Link href="/admissions" className="font-medium text-accent underline-offset-4 hover:underline">
                admission process and batch dates
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
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
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground cursor-pointer"
            >
              <Link href="/contact">Visit the campus</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
