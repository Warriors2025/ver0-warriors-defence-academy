import type { SitePages, ActivityItem, BookItem, VideoItem } from "@/lib/site-content-pages"
import { defaultPages, defaultActivities, defaultBooks, defaultVideos } from "@/lib/site-content-pages"
import type { Facility, FacilityPhoto } from "@/lib/facilities-data"
import { FACILITIES } from "@/lib/facilities-data"
import type { SeoStore } from "@/lib/seo"
import { DEFAULT_SEO_STORE } from "@/lib/seo"
import type { NavigationContent } from "@/lib/navigation"
import { DEFAULT_NAVIGATION } from "@/lib/navigation"

export type { SitePages, ActivityItem, BookItem, VideoItem, NavigationContent }

export type HeroSlide = { src: string; alt: string; caption: string }

export type FeatureItem = {
  title: string
  description: string
  image: string
  href: string
  large?: boolean
}

export type AnimatedStat = {
  value: number
  suffix: string
  label: string
  description: string
}

export type DirectorContent = {
  eyebrow: string
  title: string
  name: string
  role: string
  image: string
  paragraphs: string[]
  badgeValue: string
  badgeLabel: string
  stats: { value: string; label: string }[]
}

export type CtaContent = {
  eyebrow: string
  title: string
  highlight: string
  subtitle: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  hours: string
}

export type SiteSections = {
  heroSlides: HeroSlide[]
  heroAchievement: { value: string; label: string }
  featuresHeader: { eyebrow: string; title: string; subtitle: string }
  features: FeatureItem[]
  statsSection: { eyebrow: string; title: string; stats: AnimatedStat[] }
  director: DirectorContent
  cta: CtaContent
  activities: { eyebrow: string; title: string; subtitle: string; items: ActivityItem[] }
  books: { eyebrow: string; title: string; subtitle: string; promoCode: string; items: BookItem[] }
  videos: { eyebrow: string; title: string; subtitle: string; items: VideoItem[] }
  facilityPhotos?: Record<string, FacilityPhoto[]>
  /** Full facility page copy — overrides hardcoded FACILITIES defaults when set */
  facilityItems?: Facility[]
}

/** Unpublished CMS changes stored in site_content.settings.draft */
export type SiteContentDraft = {
  announcement?: SiteContent["announcement"]
  hero?: SiteContent["hero"]
  contact?: SiteContent["contact"]
  stats?: SiteContent["stats"]
  sections?: Partial<SiteSections>
  pages?: Partial<SitePages>
  navigation?: NavigationContent
  updatedAt?: string
}

export type SiteContent = {
  announcement: { text: string; phone: string }
  hero: {
    badge: string
    headline: string
    highlightText: string
    tagline: string
    features: string[]
    stats: { value: string; label: string }[]
  }
  contact: {
    phone1: string
    phone2: string
    email: string
    address: string
    facebook: string
    instagram: string
    youtube: string
  }
  stats: { value: string; label: string; description: string }[]
  sections: SiteSections
  pages: SitePages
  seo?: SeoStore
  navigation?: NavigationContent
  draft?: SiteContentDraft | null
  updatedAt?: string
}

const defaultSections: SiteSections = {
  heroSlides: [
    { src: "/images/hero/carousel-1.webp", alt: "GTO Training Ground", caption: "India's Largest GTO Ground" },
    { src: "/images/hero/carousel-2.webp", alt: "Expert Faculty", caption: "Learn from Retired Military Officers" },
    { src: "/images/hero/carousel-3.webp", alt: "Academy Campus", caption: "World-Class Campus Infrastructure" },
    { src: "/images/hero/carousel-4.webp", alt: "SSB Preparation", caption: "Complete SSB Interview Readiness" },
  ],
  heroAchievement: { value: "AIR #1", label: "Multiple Years" },
  featuresHeader: {
    eyebrow: "World-Class Facilities",
    title: "Why Warriors Defence Academy Stands Apart",
    subtitle: "Infrastructure and training support designed for every stage of your defence career journey.",
  },
  features: [
    { title: "Largest GTO Ground", description: "India's largest GTO training ground with modern obstacles for comprehensive physical and tactical readiness.", image: "/images/features/gto-ground.webp", href: "/facilities/gto-ground", large: true },
    { title: "Library Facilities", description: "Extensive collection of NDA, CDS & SSB reference books and practice manuals.", image: "/images/features/library.webp", href: "/facilities/library" },
    { title: "IMA Dehradun Visits", description: "Regular educational trips for real-world exposure and inspiration.", image: "/images/features/ima-visit.webp", href: "/facilities/ima-visit" },
    { title: "Mock Test Facilities", description: "Regular exams mirroring actual NDA/CDS papers to track progress and build confidence.", image: "/images/features/mock-test.webp", href: "/facilities/mock-test" },
    { title: "National Sports Facilities", description: "Extensive sports resources to build strength, stamina and meet rigorous physical standards.", image: "/images/features/sports.webp", href: "/facilities/sports" },
    { title: "Spoken English Classes", description: "Dedicated English communication classes for group discussions and personal interviews.", image: "/images/features/english-class.webp", href: "/facilities/english-class" },
    { title: "Doubt Counter Center", description: "One-on-one guidance from subject experts to clear doubts and strengthen comprehension.", image: "/images/features/doubt-clearing.webp", href: "/facilities/doubt-clearing" },
    { title: "Expert Mentorship", description: "Distinguished military leaders with decades of service guiding every step.", image: "/images/features/mentorship.webp", href: "/facilities/mentorship" },
  ],
  statsSection: {
    eyebrow: "Our Track Record",
    title: "Numbers That Speak for Themselves",
    stats: [
      { value: 50000, suffix: "+", label: "Students Trained", description: "Across all defence programmes" },
      { value: 5000, suffix: "+", label: "Successful Selections", description: "Into NDA, CDS, AFCAT & more" },
      { value: 200, suffix: "+", label: "Expert Mentors", description: "Retired military officers & educators" },
      { value: 15, suffix: "+", label: "Years of Excellence", description: "India's most trusted defence academy" },
    ],
  },
  director: {
    eyebrow: "Director's Message",
    title: "A Message from Our Director",
    name: "Mr. Gulab Singh",
    role: "Director, Warriors Defence Academy",
    image: "/images/director.webp",
    paragraphs: [
      "In my experience, a successful life starts with the right mindset. If you begin each day with a positive attitude, you build confidence in yourself and you also motivate others. At Warriors Defence Academy, we teach students to stay disciplined, focused, and mentally strong - because these are the qualities needed to become an officer.",
      "We train our students to study with a clear goal, improve step by step, and develop leadership, courage, and responsibility. This is how we prepare aspirants for NDA written exams and SSB interviews, and why many students choose us for NDA coaching in India.",
      "We are proud of the trust students and parents have in us, and we work every day to maintain high standards in NDA, SSB, and CDS coaching. Our mission is simple: to help you become a confident, capable, and responsible future officer who serves the nation with pride.",
    ],
    badgeValue: "15+",
    badgeLabel: "Years of Excellence",
    stats: [
      { value: "5000+", label: "Students Trained" },
      { value: "1200+", label: "Selections" },
      { value: "98%", label: "Success Rate" },
    ],
  },
  cta: {
    eyebrow: "Admissions Open 2026–27",
    title: "Ready to Begin Your",
    highlight: "Defence Career?",
    subtitle: "Join thousands of officers who started their journey here. Your dream of serving the nation is one step away.",
    primaryLabel: "Enroll Now",
    primaryHref: "/register",
    secondaryLabel: "Schedule a Campus Visit",
    secondaryHref: "/contact",
    hours: "Mon – Sat, 9 AM – 6 PM",
  },
  activities: {
    eyebrow: "Life at Warriors",
    title: "Building Character Through Action",
    subtitle: "Training beyond the classroom — physical challenges, group tasks, and leadership drills that build teamwork, confidence, and mental toughness.",
    items: defaultActivities,
  },
  books: {
    eyebrow: defaultBooks.header.eyebrow,
    title: defaultBooks.header.title,
    subtitle: defaultBooks.header.subtitle,
    promoCode: defaultBooks.header.promoCode,
    items: defaultBooks.items,
  },
  videos: {
    eyebrow: defaultVideos.header.eyebrow,
    title: defaultVideos.header.title,
    subtitle: defaultVideos.header.subtitle,
    items: defaultVideos.items,
  },
  facilityItems: FACILITIES,
}

const defaultContent: SiteContent = {
  announcement: {
    text: "Admissions Open for 2026–27 Batch",
    phone: "+91 94522 45729",
  },
  hero: {
    badge: "India's No. 1 Defence Coaching Institute",
    headline: "Shape Your Future as a",
    highlightText: "Defence Officer",
    tagline: "Join Warriors Defence Academy — expert coaching for NDA, CDS, AFCAT & SSB with India's finest faculty and largest GTO ground.",
    features: [
      "India's Largest GTO Ground",
      "Ex-Military Faculty",
      "SSB Interview Prep",
      "15+ Years Track Record",
    ],
    stats: [
      { value: "50,000+", label: "Students Trained" },
      { value: "5,000+", label: "Selections" },
      { value: "200+", label: "Expert Mentors" },
      { value: "15+", label: "Years of Excellence" },
    ],
  },
  contact: {
    phone1: "+91 94522 45729",
    phone2: "+91 70810 11964",
    email: "info@warriorsdefenceacademy.com",
    address: "545-Ga/1 Chha, Near Kapoorthala Chauraha, Beside Raidas Railway Crossing, Lucknow - 226024",
    facebook: "https://www.facebook.com/WarriorsDefenceAcademyLko",
    instagram: "https://www.instagram.com/warriorsdefenceacademy_/",
    youtube: "https://www.youtube.com/@WarriorsDefenceAcademy",
  },
  stats: [
    { value: "50,000+", label: "Students Trained", description: "From across India" },
    { value: "5,000+", label: "Successful Selections", description: "In Armed Forces" },
    { value: "200+", label: "Expert Mentors", description: "Retired officers" },
    { value: "15+", label: "Years Experience", description: "Of excellence" },
  ],
  sections: defaultSections,
  pages: defaultPages,
  seo: DEFAULT_SEO_STORE,
  navigation: DEFAULT_NAVIGATION,
  draft: null,
}

export { defaultContent, defaultSections }
