import type { CmsPage } from "@/lib/cms-pages"
import { CMS_PAGES } from "@/lib/cms-pages"

export const SITE_URL = "https://warriorsdefenceacademy.com"
export const SITE_NAME = "Warriors Defence Academy"

export const SCHEMA_TYPES = [
  "Organization",
  "LocalBusiness",
  "EducationalOrganization",
  "Course",
  "FAQPage",
  "Article",
  "BlogPosting",
  "Event",
  "Person",
  "Product",
  "Service",
  "BreadcrumbList",
  "VideoObject",
  "Review",
  "HowTo",
  "WebPage",
] as const

export type SchemaType = (typeof SCHEMA_TYPES)[number]

export const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6", "p"] as const
export type HeadingLevel = (typeof HEADING_LEVELS)[number]

export type PageSeo = {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  canonicalUrl: string
  robotsIndex: boolean
  robotsFollow: boolean
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterCard: "summary" | "summary_large_image"
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  focusKeyword: string
  featuredSnippet: string
  schemaType: SchemaType | "custom" | "none"
  schemaCustomJson: string
}

export type ImageSeo = {
  alt: string
  title: string
  description: string
  caption: string
}

export type SeoStore = {
  pages: Record<string, Partial<PageSeo>>
  images: Record<string, Partial<ImageSeo>>
  headings: Record<string, HeadingLevel>
}

export type HeadingFieldDef = {
  key: string
  label: string
  defaultLevel: HeadingLevel
  pageSlug: string
}

export const DEFAULT_PAGE_SEO: PageSeo = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  canonicalUrl: "",
  robotsIndex: true,
  robotsFollow: true,
  ogTitle: "",
  ogDescription: "",
  ogImage: "/images/og-image.webp",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "/images/og-image.webp",
  focusKeyword: "",
  featuredSnippet: "",
  schemaType: "none",
  schemaCustomJson: "",
}

export const DEFAULT_IMAGE_SEO: ImageSeo = {
  alt: "",
  title: "",
  description: "",
  caption: "",
}

export const DEFAULT_SEO_STORE: SeoStore = {
  pages: {},
  images: {},
  headings: {},
}

/** Default SEO per CMS page slug. */
export function defaultSeoForPage(page: CmsPage): PageSeo {
  if (page.slug === "home") {
    // GSC 3m: "best nda coaching in lucknow" pos 3.4 / 1.9K impr;
    // "best nda coaching in india" still pos 13.2 — keep as secondary.
    const homeTitle = "Best NDA Coaching in Lucknow | Warriors Defence Academy"
    const homeDesc =
      "Best NDA coaching in Lucknow at Warriors Defence Academy — 50,000+ students, 5,000+ selections, India's largest GTO ground. Enroll now!"
    return {
      ...DEFAULT_PAGE_SEO,
      metaTitle: homeTitle,
      metaDescription: homeDesc,
      metaKeywords:
        "best nda coaching in lucknow, nda coaching in lucknow, best nda coaching, best nda coaching in india, top nda coaching in lucknow, defence academy lucknow, ssb coaching in lucknow, cds coaching lucknow, warriors defence academy fees, warriors defence academy",
      canonicalUrl: SITE_URL,
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: "Best NDA Coaching in Lucknow | Warriors Defence Academy",
      ogDescription:
        "Best NDA coaching in Lucknow — 50,000+ trained students, 5,000+ selections, retired military faculty & India's largest GTO ground. Apply today.",
      ogImage: "/images/og-image.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Best NDA Coaching in Lucknow | Warriors Defence Academy",
      twitterDescription:
        "Best NDA coaching in Lucknow — 50,000+ trained students, 5,000+ selections, retired military faculty & India's largest GTO ground. Apply today.",
      twitterImage: "/images/og-image.webp",
      focusKeyword: "best nda coaching in lucknow",
      featuredSnippet:
        "Warriors Defence Academy is the best NDA coaching in Lucknow, with 50,000+ students trained, 5,000+ selections, and India's largest GTO ground.",
      schemaType: "EducationalOrganization",
    }
  }

  // Per-page optimised defaults
  const pageSeoMap: Record<string, Partial<PageSeo>> = {
    about: {
      metaTitle: "Warriors Defence Academy Lucknow | Best Defence Academy",
      metaDescription:
        "About Warriors Defence Academy Lucknow — best defence academy with 50,000+ students, 5,000+ selections & retired military faculty. Know our story.",
      metaKeywords:
        "warriors defence academy lucknow, defence academy lucknow, best defence academy lucknow, wda academy lucknow, nda coaching institute lucknow",
      ogTitle: "Warriors Defence Academy Lucknow | Best Defence Academy",
      ogDescription:
        "Warriors Defence Academy Lucknow since 2010 — 50,000+ students, 5,000+ selections, retired military faculty & India's largest GTO ground.",
      focusKeyword: "warriors defence academy lucknow",
      schemaType: "EducationalOrganization",
    },
    courses: {
      metaTitle: "NDA Coaching in Lucknow Courses | CDS SSB AFCAT",
      metaDescription:
        "NDA coaching in Lucknow plus CDS, AFCAT & SSB coaching at Warriors Defence Academy. 9+ courses, 5,000+ selections. Enroll today!",
      metaKeywords:
        "nda coaching in lucknow, nda coaching courses lucknow, cds coaching in lucknow, ssb coaching in lucknow, afcat coaching, defence academy lucknow courses",
      ogTitle: "NDA Coaching in Lucknow | CDS SSB AFCAT Courses",
      ogDescription:
        "NDA, CDS, AFCAT & SSB coaching in Lucknow at Warriors Defence Academy — 9+ programmes, retired officers, 5,000+ selections. Apply now.",
      focusKeyword: "nda coaching in lucknow",
      schemaType: "EducationalOrganization",
    },
    contact: {
      metaTitle: "Warriors Defence Academy Lucknow Address & Contact",
      metaDescription:
        "Warriors Defence Academy Lucknow address: Kapoorthala Chauraha, 226024. Call +91 94522 45729 | +91 70810 11964. Visit Mon–Sat 9 AM–6 PM.",
      metaKeywords:
        "warriors defence academy lucknow address, warriors defence academy contact number, nda coaching lucknow address, wda lucknow contact",
      ogTitle: "Warriors Defence Academy Lucknow Address & Contact",
      ogDescription:
        "Visit Warriors Defence Academy — Kapoorthala Chauraha, Lucknow 226024. Call +91 94522 45729 for NDA coaching admissions.",
      focusKeyword: "warriors defence academy lucknow address",
      schemaType: "LocalBusiness",
    },
    results: {
      metaTitle: "NDA Coaching Results & Selections | Warriors Defence Academy",
      metaDescription:
        "5,000+ NDA, CDS & SSB selections from Warriors Defence Academy Lucknow. AIR #1 multiple years. 68% SSB recommendation rate. See our proud achievers.",
      metaKeywords:
        "nda coaching results, warriors defence academy selections, best nda results lucknow, nda selections 2024, ssb success rate, defence coaching results india",
      ogTitle: "NDA & SSB Results — Warriors Defence Academy Lucknow",
      ogDescription:
        "5,000+ selections, AIR #1 multiple years, 68% SSB recommendation rate — Warriors Defence Academy is India's top-performing NDA coaching institute.",
      focusKeyword: "nda coaching results lucknow",
      schemaType: "EducationalOrganization",
    },
    admissions: {
      metaTitle: "NDA Coaching Admissions 2026-27 | Warriors Defence Academy",
      metaDescription:
        "Admissions open for NDA, CDS & SSB coaching at Warriors Defence Academy, Lucknow. Limited seats. Scholarships available. Apply online or call +91 94522 45729.",
      metaKeywords:
        "nda coaching admission 2026, warriors defence academy admission, defence coaching lucknow admission, nda admission process, ssb coaching enrollment",
      ogTitle: "NDA Coaching Admissions 2026-27 | Warriors Defence Academy Lucknow",
      ogDescription:
        "Apply now for NDA, CDS & SSB coaching at Warriors Defence Academy Lucknow. 2026-27 batch open — limited seats. Scholarships available.",
      focusKeyword: "nda coaching admission lucknow 2026",
      schemaType: "EducationalOrganization",
    },
    register: {
      metaTitle: "Register for NDA Coaching | Warriors Defence Academy Lucknow",
      metaDescription:
        "Register for NDA or CDS coaching at Warriors Defence Academy, Lucknow. Counselors call you within 24 hours. Free counseling session included. Enroll now!",
      metaKeywords:
        "register warriors defence academy, nda coaching registration, defence academy lucknow enrollment, apply nda coaching lucknow",
      ogTitle: "Register — Warriors Defence Academy | NDA Coaching Lucknow",
      ogDescription:
        "Take the first step towards your defence career. Register for NDA, CDS or SSB coaching at Warriors Defence Academy, Lucknow.",
      focusKeyword: "register nda coaching lucknow",
      schemaType: "EducationalOrganization",
    },
    blog: {
      metaTitle: "NDA Exam Date, SSB OIR & Defence Guides | WDA Blog",
      metaDescription:
        "NDA 2026 exam dates, SSB OIR questions, lecturette topics, army badges & Agniveer guides from Warriors Defence Academy Lucknow. Read free tips.",
      metaKeywords:
        "nda exam date 2026, ssb oir questions, lecturette topics for ssb, indian army badges, agniveer recruitment 2026, nda syllabus, warriors defence academy blog",
      ogTitle: "NDA Exam Date, SSB OIR & Defence Guides | WDA Blog",
      ogDescription:
        "Free NDA exam date 2026 updates, SSB OIR practice, lecturette topics and defence career guides from Warriors Defence Academy Lucknow.",
      focusKeyword: "nda exam date 2026",
      schemaType: "Article",
    },
    gallery: {
      metaTitle: "Warriors Defence Academy Photos | Campus Gallery Lucknow",
      metaDescription:
        "Warriors Defence Academy photos — GTO ground, training & campus life in Lucknow. See why students choose the best NDA coaching in Lucknow.",
      metaKeywords:
        "warriors defence academy photos, warriors defence academy gallery, nda coaching campus lucknow, gto ground photos lucknow",
      ogTitle: "Warriors Defence Academy Photos | Campus Gallery Lucknow",
      ogDescription:
        "Browse Warriors Defence Academy photos — India's largest GTO ground, hostel life and training at Lucknow campus.",
      focusKeyword: "warriors defence academy photos",
      schemaType: "WebPage",
    },
    facilities: {
      metaTitle: "World-Class Facilities | Warriors Defence Academy Lucknow",
      metaDescription:
        "Warriors Defence Academy Lucknow — India's largest GTO ground, library, mock test centre, sports facilities & SSB coaching infrastructure for NDA aspirants.",
      metaKeywords:
        "warriors defence academy facilities, gto ground lucknow, nda coaching infrastructure, defence academy sports facilities, ssb training ground india",
      ogTitle: "Facilities at Warriors Defence Academy | India's Largest GTO Ground",
      ogDescription:
        "India's largest GTO ground, library, sports facilities, mock test centre & more at Warriors Defence Academy, Lucknow — India's best NDA coaching institute.",
      focusKeyword: "warriors defence academy facilities lucknow",
      schemaType: "EducationalOrganization",
    },
    "best-nda-coaching-in-india": {
      metaTitle: "Best NDA Coaching in India",
      metaDescription:
        "Best NDA coaching in India at Warriors Defence Academy — 50,000+ students, 5,000+ selections & India's largest GTO ground. Enroll now!",
      metaKeywords:
        "best nda coaching in india, best nda coaching, top nda coaching, top nda coaching in india, best nda academy india, warriors defence academy, nda coaching institute india",
      ogTitle: "Best NDA Coaching in India | Warriors Defence Academy",
      ogDescription:
        "Top NDA coaching in India with 5,000+ selections, retired military faculty and India's largest GTO ground. Apply for counselling today.",
      twitterTitle: "Best NDA Coaching in India | Warriors Defence Academy",
      twitterDescription:
        "Top NDA coaching in India — 50,000+ trained, 5,000+ selections, retired officers & India's largest GTO ground. Call +91 94522 45729.",
      focusKeyword: "best nda coaching in india",
      featuredSnippet:
        "Warriors Defence Academy is among the best NDA coaching institutes in India, with 50,000+ students trained, 5,000+ selections, and India's largest GTO ground in Lucknow, Uttar Pradesh.",
      schemaType: "EducationalOrganization",
    },
  }

  const overrides = pageSeoMap[page.slug] ?? {}
  const fallbackTitle = `${page.title} | ${SITE_NAME}`
  const canonicalUrl = `${SITE_URL}${page.path === "/" ? "" : page.path}`
  const base: PageSeo = {
    ...DEFAULT_PAGE_SEO,
    metaTitle: fallbackTitle,
    metaDescription: page.description,
    canonicalUrl,
    ogTitle: page.title,
    ogDescription: page.description,
    twitterTitle: page.title,
    twitterDescription: page.description,
    twitterImage: "/images/og-image.webp",
    schemaType: "WebPage",
    ...overrides,
  }
  // Enforce canonical and fill twitter from og/meta if not explicitly set
  base.canonicalUrl = canonicalUrl
  if (!overrides.twitterTitle) base.twitterTitle = base.ogTitle || base.metaTitle
  if (!overrides.twitterDescription) base.twitterDescription = base.ogDescription || base.metaDescription
  return base
}

export function mergePageSeo(slug: string, raw?: Partial<PageSeo>): PageSeo {
  const page = CMS_PAGES.find((p) => p.slug === slug)
  const base = page ? defaultSeoForPage(page) : { ...DEFAULT_PAGE_SEO }
  if (!raw) return base
  return { ...base, ...raw }
}

export function mergeImageSeo(raw?: Partial<ImageSeo>): ImageSeo {
  return { ...DEFAULT_IMAGE_SEO, ...raw }
}

export function mergeSeoStore(raw?: Partial<SeoStore> | null): SeoStore {
  if (!raw) return { ...DEFAULT_SEO_STORE }
  return {
    pages: raw.pages ?? {},
    images: raw.images ?? {},
    headings: raw.headings ?? {},
  }
}

export function resolveHeading(store: SeoStore, field: string, defaultLevel: HeadingLevel): HeadingLevel {
  return store.headings[field] ?? defaultLevel
}

export function resolveImageSeo(store: SeoStore, src: string, fallback?: Partial<ImageSeo>): ImageSeo {
  const stored = store.images[src]
  return mergeImageSeo({ alt: fallback?.alt, title: fallback?.title, description: fallback?.description, caption: fallback?.caption, ...stored })
}

/** Collect image URLs used across CMS content for SEO editing. */
export function collectContentImageUrls(content: {
  sections?: {
    heroSlides?: { src: string }[]
    features?: { image: string }[]
    director?: { image: string }
    activities?: { items?: { image: string }[] }
    books?: { items?: { image: string }[] }
  }
  hero?: unknown
  pages?: Record<string, { hero?: { image?: string } }>
}): string[] {
  const urls = new Set<string>()
  const sections = content.sections
  sections?.heroSlides?.forEach((s) => s.src && urls.add(s.src))
  sections?.features?.forEach((f) => f.image && urls.add(f.image))
  if (sections?.director?.image) urls.add(sections.director.image)
  sections?.activities?.items?.forEach((a) => a.image && urls.add(a.image))
  sections?.books?.items?.forEach((b) => b.image && urls.add(b.image))
  if (content.pages) {
    for (const page of Object.values(content.pages)) {
      if (page?.hero?.image) urls.add(page.hero.image)
    }
  }
  urls.add("/images/og-image.webp")
  return [...urls].filter(Boolean).sort()
}

export const SEO_HEADING_FIELDS: HeadingFieldDef[] = [
  { pageSlug: "home", key: "hero.headline", label: "Hero Headline", defaultLevel: "h1" },
  { pageSlug: "home", key: "sections.featuresHeader.title", label: "Features Section Title", defaultLevel: "h2" },
  { pageSlug: "home", key: "sections.statsSection.title", label: "Stats Section Title", defaultLevel: "h2" },
  { pageSlug: "home", key: "sections.director.title", label: "Director Section Title", defaultLevel: "h2" },
  { pageSlug: "home", key: "sections.cta.title", label: "CTA Section Title", defaultLevel: "h2" },
  { pageSlug: "about", key: "pages.about.hero.title", label: "About Hero Title", defaultLevel: "h1" },
  { pageSlug: "about", key: "pages.about.missionTitle", label: "Mission Title", defaultLevel: "h2" },
  { pageSlug: "about", key: "pages.about.visionTitle", label: "Vision Title", defaultLevel: "h2" },
  { pageSlug: "contact", key: "pages.contact.hero.title", label: "Contact Hero Title", defaultLevel: "h1" },
  { pageSlug: "courses", key: "pages.courses.hero.title", label: "Courses Hero Title", defaultLevel: "h1" },
  { pageSlug: "results", key: "pages.results.hero.title", label: "Results Hero Title", defaultLevel: "h1" },
  { pageSlug: "admissions", key: "pages.admissions.hero.title", label: "Admissions Hero Title", defaultLevel: "h1" },
  { pageSlug: "register", key: "pages.register.hero.title", label: "Register Hero Title", defaultLevel: "h1" },
  { pageSlug: "blog", key: "blog.hero.title", label: "Blog Hero Title", defaultLevel: "h1" },
  { pageSlug: "gallery", key: "gallery.hero.title", label: "Gallery Hero Title", defaultLevel: "h1" },
]

export function headingFieldsForPage(slug: string) {
  return SEO_HEADING_FIELDS.filter((f) => f.pageSlug === slug)
}

export function validateSchemaJson(json: string): { valid: boolean; error?: string; parsed?: unknown } {
  if (!json.trim()) return { valid: true, parsed: null }
  try {
    const parsed = JSON.parse(json)
    if (typeof parsed !== "object" || parsed === null) {
      return { valid: false, error: "Schema must be a JSON object" }
    }
    return { valid: true, parsed }
  } catch {
    return { valid: false, error: "Invalid JSON syntax" }
  }
}

export function entitySeoKey(type: "blog" | "course", slug: string) {
  return `${type}:${slug}`
}

export function entityHeadingKey(type: "blog" | "course", slug: string, field = "title") {
  return `${type}:${slug}.${field}`
}

export function defaultEntitySeo(
  type: "blog" | "course",
  data: { title: string; description: string; path: string; image?: string }
): PageSeo {
  const ogImage = data.image || "/images/og-image.webp"
  if (type === "course") {
    // GSC-aligned course titles (local commercial intent)
    const courseSeoOverrides: Record<string, Partial<PageSeo>> = {
      "/courses/nda": {
        metaTitle: "NDA Coaching in Lucknow | Best NDA Course WDA",
        metaDescription:
          "NDA coaching in Lucknow at Warriors Defence Academy — written exam + SSB, India's largest GTO ground, 5,000+ selections. Enroll now!",
        focusKeyword: "nda coaching in lucknow",
        metaKeywords:
          "nda coaching in lucknow, best nda coaching in lucknow, nda coaching lucknow, nda course lucknow, warriors defence academy",
      },
      "/courses/nda-foundation": {
        metaTitle: "NDA Foundation Coaching After 10th in Lucknow",
        metaDescription:
          "NDA foundation coaching after 10th in Lucknow — school + NDA prep, hostel, PT & SSB grooming at Warriors Defence Academy. Apply today!",
        focusKeyword: "nda foundation coaching after 10th in lucknow",
        metaKeywords:
          "nda foundation coaching after 10th, nda foundation course lucknow, nda coaching after 10th, best nda foundation lucknow",
      },
      "/courses/ssb": {
        metaTitle: "SSB Coaching in Lucknow | Best SSB Training WDA",
        metaDescription:
          "Best SSB coaching in Lucknow on India's largest GTO ground — OIR, psychology, GTO & interview drills. 21-day intensive. Enroll now!",
        focusKeyword: "ssb coaching in lucknow",
        metaKeywords:
          "ssb coaching in lucknow, best ssb coaching in lucknow, ssb training center lucknow, ssb interview coaching lucknow",
      },
      "/courses/cds": {
        metaTitle: "CDS Coaching in Lucknow | Warriors Defence Academy",
        metaDescription:
          "CDS coaching in Lucknow with syllabus plan, mocks & SSB prep at Warriors Defence Academy. Graduate officer entry. Apply today!",
        focusKeyword: "cds coaching in lucknow",
        metaKeywords:
          "cds coaching in lucknow, best cds coaching lucknow, cds exam coaching, warriors defence academy cds",
      },
      "/courses/navy-agniveer": {
        metaTitle: "Agniveer Recruitment Coaching Lucknow | Navy SSR",
        metaDescription:
          "Agniveer recruitment 2026 coaching in Lucknow — Navy SSR/AA written, PT & swim training at Warriors Defence Academy. Enroll now!",
        focusKeyword: "agniveer recruitment 2026",
        metaKeywords:
          "agniveer recruitment 2026, agniveer vacancy 2026, navy agniveer coaching lucknow, agniveer notification 2026",
      },
    }
    const override = courseSeoOverrides[data.path] ?? {}
    const metaTitle =
      override.metaTitle || `${data.title} Coaching in Lucknow | Warriors Defence Academy`
    const metaDesc =
      override.metaDescription ||
      (data.description.length > 155 ? data.description.slice(0, 152) + "..." : data.description)
    const focusKeyword =
      override.focusKeyword || `${data.title.toLowerCase()} coaching lucknow`
    return {
      ...DEFAULT_PAGE_SEO,
      metaTitle,
      metaDescription: metaDesc,
      metaKeywords:
        override.metaKeywords ||
        `${data.title.toLowerCase()} coaching lucknow, ${data.title.toLowerCase()} coaching india, warriors defence academy, best ${data.title.toLowerCase()} coaching`,
      canonicalUrl: `${SITE_URL}${data.path}`,
      ogTitle: metaTitle,
      ogDescription: metaDesc,
      ogImage,
      twitterTitle: metaTitle,
      twitterDescription: metaDesc,
      twitterImage: ogImage,
      focusKeyword,
      schemaType: "Course",
    }
  }
  // Blog
  const metaTitle = `${data.title} | Warriors Defence Academy`
  return {
    ...DEFAULT_PAGE_SEO,
    metaTitle,
    metaDescription: data.description,
    metaKeywords: "nda exam tips, cds preparation, ssb interview guide, warriors defence academy blog",
    canonicalUrl: `${SITE_URL}${data.path}`,
    ogTitle: metaTitle,
    ogDescription: data.description,
    ogImage,
    twitterTitle: metaTitle,
    twitterDescription: data.description,
    twitterImage: ogImage,
    schemaType: "BlogPosting",
  }
}

/**
 * Builds a standard @graph schema for any non-home page.
 * Combines WebSite + WebPage + the page's specific schema type.
 */
export function buildPageSchemaGraph(slug: string, seo: PageSeo, path: string): object {
  const url = seo.canonicalUrl || `${SITE_URL}${path === "/" ? "" : path}`
  const orgId = `${SITE_URL}/#organization`
  const siteId = `${SITE_URL}/#website`
  const pageId = `${url}#webpage`

  const webSite = {
    "@type": "WebSite",
    "@id": siteId,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": orgId },
    inLanguage: "en-IN",
  }

  const breadcrumbItems: object[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
  ]

  // Build path segments for breadcrumb
  const segments = path.split("/").filter(Boolean)
  let cumulativePath = ""
  segments.forEach((seg, i) => {
    cumulativePath += `/${seg}`
    breadcrumbItems.push({
      "@type": "ListItem",
      position: i + 2,
      name: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      item: `${SITE_URL}${cumulativePath}`,
    })
  })

  const webPage = {
    "@type": "WebPage",
    "@id": pageId,
    url,
    name: seo.metaTitle,
    description: seo.metaDescription,
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    inLanguage: "en-IN",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
  }

  // Page-specific extra schema node
  const extraNodes: object[] = []

  if (slug === "contact") {
    extraNodes.push({
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "@id": orgId,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: ["+91-94522-45729", "+91-70810-11964"],
      email: "info@warriorsdefenceacademy.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "545-Ga/1 Chha, Near Kapoorthala Chauraha, Beside Raidas Railway Crossing",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        postalCode: "226024",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: "26.8588", longitude: "80.9993" },
      openingHoursSpecification: [{
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      }],
    })
  } else if (slug === "courses") {
    extraNodes.push({
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: SITE_NAME,
      url: SITE_URL,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Defence Exam Coaching Programmes",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Course", name: "NDA Coaching", description: "Best NDA coaching in India — written exam preparation and SSB interview training by retired military officers in Lucknow.", provider: { "@id": orgId } } },
          { "@type": "Offer", itemOffered: { "@type": "Course", name: "CDS Coaching", description: "Complete CDS exam coaching in Lucknow for Army, Navy and Air Force officer roles.", provider: { "@id": orgId } } },
          { "@type": "Offer", itemOffered: { "@type": "Course", name: "SSB Interview Coaching", description: "Intensive SSB interview preparation in Lucknow — GTO tasks, psychology tests and personal interviews.", provider: { "@id": orgId } } },
          { "@type": "Offer", itemOffered: { "@type": "Course", name: "AFCAT Coaching", description: "Air Force Common Admission Test coaching at Warriors Defence Academy Lucknow.", provider: { "@id": orgId } } },
        ],
      },
    })
  } else if (slug === "results") {
    extraNodes.push({
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: SITE_NAME,
      url: SITE_URL,
      description: "Warriors Defence Academy Lucknow has achieved 5,000+ selections in NDA, CDS, AFCAT & SSB. AIR #1 multiple years. India's best NDA coaching institute.",
      numberOfStudents: 50000,
      award: "Best NDA Coaching Institute — Lucknow 2024, Highest NDA Selection Rate North India",
    })
  } else if (slug === "about") {
    extraNodes.push({
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: SITE_NAME,
      url: SITE_URL,
      foundingDate: "2010",
      numberOfStudents: 50000,
      sameAs: [
        "https://www.facebook.com/WarriorsDefenceAcademyLko",
        "https://www.instagram.com/warriorsdefenceacademy_/",
        "https://www.youtube.com/@WarriorsDefenceAcademy",
      ],
    })
  } else if (slug === "admissions" || slug === "register") {
    extraNodes.push({
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: SITE_NAME,
      url: SITE_URL,
      description: "Admissions open for NDA, CDS & SSB coaching at Warriors Defence Academy Lucknow. 2026-27 batch — limited seats.",
      telephone: ["+91-94522-45729", "+91-70810-11964"],
    })
  } else if (slug === "best-nda-coaching-in-india") {
    extraNodes.push(
      {
        "@type": "EducationalOrganization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Best NDA coaching in India at Warriors Defence Academy, Lucknow — 50,000+ students trained, 5,000+ selections, retired military faculty and India's largest GTO ground.",
        foundingDate: "2010",
        numberOfStudents: 50000,
        telephone: ["+91-94522-45729", "+91-70810-11964"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "545-Ga/1 Chha, Near Kapoorthala Chauraha, Beside Raidas Railway Crossing",
          addressLocality: "Lucknow",
          addressRegion: "Uttar Pradesh",
          postalCode: "226024",
          addressCountry: "IN",
        },
        areaServed: { "@type": "Country", name: "India" },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Which is the best NDA coaching in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Warriors Defence Academy in Lucknow, Uttar Pradesh is widely recognised among the best NDA coaching institutes in India, with 50,000+ students trained, 5,000+ selections, retired military faculty, and India's largest GTO ground for SSB preparation.",
            },
          },
          {
            "@type": "Question",
            name: "What makes top NDA coaching in India different from ordinary tuition?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Top NDA coaching in India combines written exam mastery with full SSB training — psychology tests, GTO tasks, interview practice, physical fitness, and mentorship by officers who have served in the forces — not classroom theory alone.",
            },
          },
          {
            "@type": "Question",
            name: "Do students from outside Lucknow join for NDA coaching?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Aspirants from across India enrol at Warriors Defence Academy for residential and day programmes. Hostel support, structured batches, and pan-India counselling make it accessible beyond Lucknow.",
            },
          },
          {
            "@type": "Question",
            name: "How do I enrol for the best NDA coaching at Warriors Defence Academy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Call +91 94522 45729 or +91 70810 11964, or message us on WhatsApp. Counsellors guide you on batch timing, fees, and the right NDA or foundation programme.",
            },
          },
        ],
      }
    )
  }

  return {
    "@context": "https://schema.org",
    "@graph": [webSite, webPage, ...extraNodes],
  }
}

/**
 * Comprehensive @graph schema for the homepage.
 * Combines EducationalOrganization + LocalBusiness + WebSite + WebPage + FAQPage
 * into a single JSON-LD block — the strongest possible on-page schema signal.
 */
export function buildHomeSchemaGraph(): object {
  const orgId = `${SITE_URL}/#organization`
  const siteId = `${SITE_URL}/#website`

  return {
    "@context": "https://schema.org",
    "@graph": [
      /* ── 1. Organisation (EducationalOrganization + LocalBusiness) ── */
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": orgId,
        name: SITE_NAME,
        alternateName: [
          "WDA",
          "Warriors Defence Academy Lucknow",
          "Best NDA Coaching Lucknow",
          "Warriors Academy",
        ],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/images/logo/warriors-defence-logo.svg`,
          contentUrl: `${SITE_URL}/images/logo/warriors-defence-logo.svg`,
          caption: "Warriors Defence Academy — Best NDA Coaching in India",
        },
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/og-image.webp`,
          width: 1200,
          height: 630,
        },
        description:
          "Warriors Defence Academy is India's best NDA coaching institute, located in Lucknow (Uttar Pradesh). Since 2010, we have trained 50,000+ students and achieved 5,000+ selections into NDA, CDS, SSB & AFCAT through retired military faculty and India's largest GTO training ground.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "545-Ga/1 Chha, Near Kapoorthala Chauraha, Beside Raidas Railway Crossing",
          addressLocality: "Lucknow",
          addressRegion: "Uttar Pradesh",
          postalCode: "226024",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "26.8588",
          longitude: "80.9993",
        },
        telephone: ["+91-94522-45729", "+91-70810-11964"],
        email: "info@warriorsdefenceacademy.com",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        sameAs: [
          "https://www.facebook.com/WarriorsDefenceAcademyLko",
          "https://www.instagram.com/warriorsdefenceacademy_/",
          "https://www.youtube.com/@WarriorsDefenceAcademy",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Defence Exam Coaching Programmes",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "NDA Coaching",
                description:
                  "Best NDA coaching in India — comprehensive NDA written exam preparation and SSB interview training by retired military officers in Lucknow.",
                provider: { "@id": orgId },
                url: `${SITE_URL}/courses`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "CDS Coaching",
                description:
                  "Complete CDS exam coaching in Lucknow for Army, Navy and Air Force officer roles, taught by experienced defence educators.",
                provider: { "@id": orgId },
                url: `${SITE_URL}/courses`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "SSB Interview Coaching",
                description:
                  "Intensive SSB interview preparation in Lucknow covering GTO tasks, psychology tests, group discussions and personal interviews.",
                provider: { "@id": orgId },
                url: `${SITE_URL}/courses`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "AFCAT Coaching",
                description:
                  "Air Force Common Admission Test (AFCAT) coaching at Warriors Defence Academy, Lucknow — flying and ground duty branches.",
                provider: { "@id": orgId },
                url: `${SITE_URL}/courses`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Sainik School Coaching",
                description:
                  "Sainik School entrance exam preparation coaching for classes 6 and 9 at Warriors Defence Academy, Lucknow.",
                provider: { "@id": orgId },
                url: `${SITE_URL}/courses`,
              },
            },
          ],
        },
        foundingDate: "2010",
        numberOfStudents: 50000,
        award: "AIR #1 — National Defence Academy Selection, Multiple Years",
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "City", name: "Lucknow" },
          { "@type": "State", name: "Uttar Pradesh" },
        ],
        knowsAbout: [
          "Best NDA Coaching in Lucknow",
          "NDA Coaching in Lucknow",
          "Best NDA Coaching",
          "Best NDA Coaching in India",
          "SSB Coaching in Lucknow",
          "CDS Coaching in Lucknow",
          "NDA Exam Date 2026",
          "SSB OIR Test",
          "NDA Foundation Coaching After 10th",
          "Agniveer Recruitment 2026",
          "Warriors Defence Academy Fees",
          "Defence Academy Lucknow",
          "GTO Task Training",
        ],
        keywords:
          "best nda coaching in lucknow, nda coaching in lucknow, best nda coaching in india, ssb coaching in lucknow, cds coaching in lucknow, defence academy lucknow, warriors defence academy fees, nda exam date 2026",
      },

      /* ── 2. WebSite ── */
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: "Warriors Defence Academy",
        description: "Best NDA Coaching in Lucknow — Warriors Defence Academy",
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },

      /* ── 3. WebPage (homepage) ── */
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Best NDA Coaching in India | Warriors Defence Academy Lucknow",
        description:
          "Best NDA coaching and top NDA coaching in India at Warriors Defence Academy, Lucknow. 50,000+ students trained, 5,000+ selections. Expert military faculty & largest GTO ground. Enroll now!",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        inLanguage: "en-IN",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }],
        },
      },

      /* ── 4. FAQPage — keyword-targeted Q&As for featured snippets & AI Overviews ── */
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faqpage`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Which is the best NDA coaching in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Warriors Defence Academy in Lucknow is widely recognised as the best NDA coaching in India. With 50,000+ students trained, 5,000+ successful selections into NDA, CDS and SSB, and a 15+ year track record, it is led by retired military officers and features India's largest GTO training ground. Located at Kapoorthala Chauraha, Lucknow.",
            },
          },
          {
            "@type": "Question",
            name: "Which is the top NDA coaching in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Warriors Defence Academy is among the top NDA coaching institutes in India. Located in Lucknow, it delivers best NDA coaching with retired military faculty, India's largest GTO ground, hostel facilities, and 5,000+ defence selections.",
            },
          },
          {
            "@type": "Question",
            name: "Which is the best NDA coaching in Lucknow?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Warriors Defence Academy is the top-ranked NDA coaching institute in Lucknow, Uttar Pradesh. It provides comprehensive NDA written exam preparation, SSB interview coaching, and physical training by experienced retired military officers. Address: 545-Ga/1 Chha, Near Kapoorthala Chauraha, Lucknow - 226024. Phone: +91 94522 45729.",
            },
          },
          {
            "@type": "Question",
            name: "How do I join Warriors Defence Academy for NDA coaching?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Call +91 94522 45729 or +91 70810 11964, or message us on WhatsApp for counselling. Visit the campus at 545-Ga/1 Chha, Near Kapoorthala Chauraha, Lucknow - 226024. Admissions for the 2026-27 batch are currently open.",
            },
          },
          {
            "@type": "Question",
            name: "What courses does Warriors Defence Academy offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Warriors Defence Academy offers coaching for NDA (National Defence Academy), CDS (Combined Defence Services), AFCAT (Air Force Common Admission Test), SSB Interview preparation, Sainik School entrance exam, and Rashtriya Indian Military College (RIMC). All courses are conducted by retired Indian Armed Forces officers in Lucknow.",
            },
          },
          {
            "@type": "Question",
            name: "Does Warriors Defence Academy provide hostel facilities?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Warriors Defence Academy provides hostel accommodation for outstation NDA coaching students in Lucknow. Facilities include a fully-equipped mess, sports grounds, library with NDA/CDS study material, and India's largest GTO training ground on campus.",
            },
          },
        ],
      },
    ],
  }
}

export function mergeEntitySeo(
  type: "blog" | "course",
  slug: string,
  raw: Partial<PageSeo> | undefined,
  fallback: { title: string; description: string; path: string; image?: string }
): PageSeo {
  const base = defaultEntitySeo(type, fallback)
  if (!raw) return base
  return { ...base, ...raw }
}

export function buildPresetSchema(
  type: SchemaType,
  seo: PageSeo,
  path: string,
  extra?: { image?: string; author?: string }
) {
  const url = seo.canonicalUrl || `${SITE_URL}${path === "/" ? "" : path}`
  const imageUrl = extra?.image
    ? (extra.image.startsWith("http") ? extra.image : `${SITE_URL}${extra.image}`)
    : seo.ogImage
      ? (seo.ogImage.startsWith("http") ? seo.ogImage : `${SITE_URL}${seo.ogImage}`)
      : undefined
  const base = {
    "@context": "https://schema.org",
    name: seo.metaTitle || SITE_NAME,
    description: seo.metaDescription,
    url,
  }

  switch (type) {
    case "Organization":
    case "EducationalOrganization":
    case "LocalBusiness":
      return {
        ...base,
        "@type": type,
        logo: `${SITE_URL}/images/logo/warriors-defence-logo.svg`,
      }
    case "WebPage":
      return { ...base, "@type": "WebPage", headline: seo.metaTitle }
    case "Article":
    case "BlogPosting":
      return {
        ...base,
        "@type": type,
        headline: seo.metaTitle,
        author: { "@type": "Organization", name: extra?.author || SITE_NAME },
        ...(imageUrl ? { image: imageUrl } : {}),
      }
    case "Course":
      return {
        ...base,
        "@type": "Course",
        name: seo.metaTitle,
        provider: { "@type": "Organization", name: SITE_NAME },
        ...(imageUrl ? { image: imageUrl } : {}),
      }
    case "FAQPage":
      return { ...base, "@type": "FAQPage" }
    case "BreadcrumbList":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: seo.metaTitle, item: url },
        ],
      }
    default:
      return { ...base, "@type": type }
  }
}

export function analyzePageSeo(seo: PageSeo) {
  const warnings: string[] = []
  const titleLen = seo.metaTitle.length
  const descLen = seo.metaDescription.length

  if (!seo.metaTitle.trim()) warnings.push("Missing SEO title")
  else if (titleLen < 30) warnings.push("SEO title is short (under 30 characters)")
  else if (titleLen > 60) warnings.push("SEO title may be truncated (over 60 characters)")

  if (!seo.metaDescription.trim()) warnings.push("Missing meta description")
  else if (descLen < 120) warnings.push("Meta description is short (under 120 characters)")
  else if (descLen > 160) warnings.push("Meta description may be truncated (over 160 characters)")

  if (!seo.ogImage) warnings.push("Missing Open Graph image")
  if (seo.schemaType === "none") warnings.push("No schema type selected")
  if (seo.schemaType === "custom" && !seo.schemaCustomJson.trim()) warnings.push("Custom schema selected but JSON is empty")

  let score = 100
  if (!seo.metaTitle.trim()) score -= 25
  if (!seo.metaDescription.trim()) score -= 25
  if (titleLen > 60 || titleLen < 30) score -= 5
  if (descLen > 160 || descLen < 120) score -= 5
  if (!seo.ogImage) score -= 10
  if (seo.schemaType === "none") score -= 10
  if (seo.focusKeyword && !seo.metaTitle.toLowerCase().includes(seo.focusKeyword.toLowerCase())) {
    warnings.push("Focus keyword not found in SEO title")
    score -= 5
  }

  return { score: Math.max(0, score), warnings }
}
