import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CoursesSection />
      <DirectorMessageSection />
      <OutdoorActivitiesSection />
      <VideoGallerySection />
      <BooksSection />
      <MentorsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
