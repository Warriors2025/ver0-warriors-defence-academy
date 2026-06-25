import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroMenuBanner } from "@/components/sections/hero-menu-banner"
import { HeroSection } from "@/components/sections/hero"
import { FeaturesSection } from "@/components/sections/features"
import { CoursesSection } from "@/components/sections/courses"
import { StatsSection } from "@/components/sections/stats"
import { DirectorMessageSection } from "@/components/sections/director-message"
import { OutdoorActivitiesSection } from "@/components/sections/outdoor-activities"
import { VideoGallerySection } from "@/components/sections/video-gallery"
import { BooksSection } from "@/components/sections/books-section"
import { MentorsSection } from "@/components/sections/mentors"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FAQSection } from "@/components/sections/faq"
import { CTASection } from "@/components/sections/cta"
import { getCourses } from "@/lib/courses"
import { getTestimonials } from "@/lib/testimonials"
import { getMentors } from "@/lib/mentors-data"
import { getFaqs } from "@/lib/faqs-data"
import { getSiteContent } from "@/lib/site-content.server"
import { CmsEditorBridge } from "@/components/cms/cms-editor-bridge"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { getPageSchemaJsonLd, getPageSeo, buildPageMetadata } from "@/lib/seo.server"
import { mergeSeoStore, resolveImageSeo } from "@/lib/seo"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home")
  return buildPageMetadata("home", seo)
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ cmsEditor?: string }>
}) {
  const { cmsEditor } = await searchParams
  const cmsEditMode = cmsEditor === "1"

  const [courses, testimonials, mentors, faqs, content, schema] = await Promise.all([
    getCourses(),
    getTestimonials(),
    getMentors(),
    getFaqs(),
    getSiteContent(),
    getPageSchemaJsonLd("home"),
  ])

  const { hero, contact, sections } = content
  const seoStore = mergeSeoStore(content.seo)
  const heroSlides = sections.heroSlides.map((slide) => {
    const imgSeo = resolveImageSeo(seoStore, slide.src, { alt: slide.alt, caption: slide.caption })
    return { ...slide, alt: imgSeo.alt || slide.alt, caption: imgSeo.caption || slide.caption }
  })

  return (
    <main className="min-h-screen">
      <PageJsonLd data={schema} />
      {cmsEditMode && <CmsEditorBridge />}
      <HeroMenuBanner />
      <Header />
      <HeroSection hero={hero} slides={heroSlides} achievement={sections.heroAchievement} />
      <FeaturesSection
        eyebrow={sections.featuresHeader.eyebrow}
        title={sections.featuresHeader.title}
        subtitle={sections.featuresHeader.subtitle}
        features={sections.features}
      />
      <StatsSection
        eyebrow={sections.statsSection.eyebrow}
        title={sections.statsSection.title}
        stats={sections.statsSection.stats}
      />
      <CoursesSection courses={courses} />
      <DirectorMessageSection director={sections.director} />
      <OutdoorActivitiesSection
        eyebrow={sections.activities.eyebrow}
        title={sections.activities.title}
        subtitle={sections.activities.subtitle}
        items={sections.activities.items}
      />
      <VideoGallerySection
        eyebrow={sections.videos.eyebrow}
        title={sections.videos.title}
        subtitle={sections.videos.subtitle}
        items={sections.videos.items}
      />
      <BooksSection
        eyebrow={sections.books.eyebrow}
        title={sections.books.title}
        subtitle={sections.books.subtitle}
        promoCode={sections.books.promoCode}
        items={sections.books.items}
      />
      <MentorsSection mentors={mentors} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <CTASection cta={sections.cta} phone1={contact.phone1} phone2={contact.phone2} />
      <Footer />
    </main>
  )
}
