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
    // Title + form for WordPress iframe on /ssb-registration/
    return (
      <main
        className="bg-background"
        data-iframe-height
        style={{ minHeight: 0, paddingBottom: 8 }}
      >
        <PageJsonLd data={schema} />
        <IframeResizerContent />
        <section className="pt-4 pb-2 sm:pt-6">
          <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
                {hero.title}
              </h1>
              {hero.subtitle ? (
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {hero.subtitle}
                </p>
              ) : null}
            </div>
            <RegisterForm embed />
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
