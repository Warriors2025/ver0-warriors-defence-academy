import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { RegisterForm } from "@/components/register-form"
import { getCourseOptions } from "@/lib/courses"
import { getSiteContent } from "@/lib/site-content.server"
import type { Metadata } from "next"
import { getPageSeo, buildPageMetadata, getPageSchemaJsonLd } from "@/lib/seo.server"
import { PageJsonLd } from "@/components/seo/page-json-ld"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("register")
  return buildPageMetadata("register", seo)
}

export default async function RegisterPage() {
  const [courseOptions, { pages }, schema] = await Promise.all([
    getCourseOptions(),
    getSiteContent(),
    getPageSchemaJsonLd("register"),
  ])
  const hero = pages.register.hero
  return (
    <main className="min-h-screen">
      <PageJsonLd data={schema} />
      <Header />

      <section className="bg-primary text-primary-foreground py-12 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-0 mb-4">
              {hero.eyebrow ?? "Enroll Now"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {hero.title}
            </h1>
            <p className="text-primary-foreground/80">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <RegisterForm courses={courseOptions} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
