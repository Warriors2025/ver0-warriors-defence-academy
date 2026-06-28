import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getFacilities } from "@/lib/facilities-data"
import { ArrowRight, Building2, CheckCircle, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Campus Facilities | Warriors Defence Academy",
  description:
    "Explore world-class facilities at Warriors Defence Academy — GTO ground, library, mock tests, sports, English classes, doubt counter, and expert mentorship in Lucknow.",
}

export default function FacilitiesPage() {
  const facilities = getFacilities()

  return (
    <main className="min-h-screen">
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
            <span className="text-primary-foreground/70">Facilities</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest">
              <Building2 className="h-4 w-4" />
              World-Class Facilities
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
              Infrastructure Built for Defence Success
            </h1>
            <p className="text-primary-foreground/75 text-lg mt-5 leading-relaxed">
              From India&apos;s largest GTO ground to expert mentorship — every facility at Warriors Defence Academy
              is designed to support your NDA, CDS, AFCAT, and SSB preparation journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <Link
                key={facility.slug}
                href={`/facilities/${facility.slug}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {facility.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{facility.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                    View facility <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-muted/40 border border-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">See Our Campus in Person</h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Schedule a campus visit to experience our facilities, meet faculty, and get personalised course guidance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Schedule a Visit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  Photo Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30 border-t border-border/60">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Why Our Facilities Matter</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Purpose-built for defence exam and SSB preparation",
              "Supervised by retired military officers and experts",
              "Included with enrolled coaching programmes",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}
