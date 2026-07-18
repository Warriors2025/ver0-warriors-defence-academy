import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FACILITIES, getFacilityBySlug, getFacilityPhotos, getFacilities } from "@/lib/facilities-data"
import { getSiteContent } from "@/lib/site-content.server"
import { FacilityPhotosGallery } from "@/components/facility-photos-gallery"
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Phone,
  Sparkles,
} from "lucide-react"

export async function generateStaticParams() {
  return FACILITIES.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const content = await getSiteContent()
  const facility = getFacilityBySlug(slug, content.sections.facilityItems)
  if (!facility) return { title: "Facility Not Found" }

  return {
    title: `${facility.title} | Warriors Defence Academy`,
    description: facility.description,
    openGraph: {
      title: `${facility.title} | Warriors Defence Academy`,
      description: facility.tagline,
      images: [{ url: facility.image }],
    },
  }
}

export default async function FacilityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = await getSiteContent()
  const facility = getFacilityBySlug(slug, content.sections.facilityItems)
  if (!facility) notFound()

  const photos = getFacilityPhotos(slug, content.sections.facilityPhotos)

  const others = getFacilities(content.sections.facilityItems).filter((f) => f.slug !== slug).slice(0, 3)

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
        <div className="container mx-auto px-4 py-14 md:py-16 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-primary-foreground/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-primary-foreground/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/facilities" className="hover:text-primary-foreground/80 transition-colors">
              Facilities
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/70">{facility.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest">
                <Sparkles className="h-4 w-4" />
                Campus Facility
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">{facility.title}</h1>
              <p className="text-primary-foreground/75 text-lg mt-4 leading-relaxed">{facility.tagline}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/register">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 w-full sm:w-auto">
                    Enroll Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-2 w-full sm:w-auto"
                  >
                    <Phone className="h-4 w-4" />
                    Book a Visit
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-primary-foreground/15 shadow-2xl">
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Facility</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{facility.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">What You Get</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {facility.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 bg-muted/40 border border-border rounded-xl p-4 text-sm text-foreground"
                    >
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Why It Matters</h2>
                <ul className="space-y-3">
                  {facility.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  Related Courses
                </h3>
                <ul className="space-y-2">
                  {facility.relatedCourses.map((course) => (
                    <li key={course.href}>
                      <Link
                        href={course.href}
                        className="flex items-center justify-between gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border last:border-0"
                      >
                        {course.title}
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary text-primary-foreground rounded-2xl p-6">
                <h3 className="font-bold mb-2">Ready to join?</h3>
                <p className="text-primary-foreground/75 text-sm mb-4">
                  This facility is available to enrolled students. Start your defence preparation with us today.
                </p>
                <Link href="/admissions">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    View Admissions
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FacilityPhotosGallery title={facility.title} photos={photos} />

      {others.length > 0 && (
        <section className="py-16 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-foreground">More Facilities</h2>
              <Link href="/facilities" className="text-sm font-semibold text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/facilities/${item.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-colors"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
