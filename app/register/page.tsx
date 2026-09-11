import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { RegisterForm } from "@/components/register-form"
import { IframeResizerContent } from "@/components/iframe-resizer-content"
import { getSiteContent } from "@/lib/site-content.server"
import type { Metadata } from "next"
import { getPageSeo, buildPageMetadata, getPageSchemaJsonLd } from "@/lib/seo.server"
import { PageJsonLd } from "@/components/seo/page-json-ld"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("register")
  return buildPageMetadata("register", seo)
}

type RegisterPageProps = {
  searchParams?: Promise<{ embed?: string }> | { embed?: string }
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await Promise.resolve(searchParams ?? {})
  const isEmbed = params.embed === "1" || params.embed === "true"

  const [{ pages }, schema] = await Promise.all([
    getSiteContent(),
    getPageSchemaJsonLd("register"),
  ])
  const hero = pages.register.hero

  if (isEmbed) {
    return (
      <main className="min-h-screen bg-background">
        <PageJsonLd data={schema} />
        <IframeResizerContent />
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {hero.title}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                {hero.subtitle}
              </p>
            </div>
            <RegisterForm />
          </div>
        </section>
      </main>
    )
  }

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
          <RegisterForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
