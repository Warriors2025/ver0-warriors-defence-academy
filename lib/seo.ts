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
    const homeTitle = "Best NDA Coaching in India | Warriors Defence Academy"
    // 156 chars — within the 120-160 target range
    const homeDesc =
      "Warriors Defence Academy — India's best NDA coaching in Lucknow. 50,000+ students, 5,000+ selections. Retired military faculty & largest GTO ground. Enroll now!"
    return {
      ...DEFAULT_PAGE_SEO,
      metaTitle: homeTitle,
      metaDescription: homeDesc,
      metaKeywords:
        "best nda coaching, nda coaching in india, best nda coaching in lucknow, nda coaching lucknow, nda coaching, cds coaching lucknow, ssb interview coaching, defence academy lucknow, warriors defence academy, nda preparation india",
      canonicalUrl: SITE_URL,
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: "Best NDA Coaching in India | Warriors Defence Academy Lucknow",
      ogDescription:
        "India's top NDA coaching institute in Lucknow — 50,000+ trained students, 5,000+ selections, retired military faculty & India's largest GTO ground.",
      ogImage: "/images/og-image.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Best NDA Coaching in India | Warriors Defence Academy Lucknow",
      twitterDescription:
        "India's top NDA coaching institute in Lucknow — 50,000+ trained students, 5,000+ selections, retired military faculty & India's largest GTO ground.",
      twitterImage: "/images/og-image.webp",
      focusKeyword: "best nda coaching in india",
      schemaType: "EducationalOrganization",
    }
  }

  // Per-page optimised defaults
  const pageSeoMap: Record<string, Partial<PageSeo>> = {
    about: {
      metaTitle: "About Warriors Defence Academy | Best NDA Coaching Lucknow",
      metaDescription:
        "Warriors Defence Academy — India's best NDA coaching in Lucknow since 2010. 50,000+ students, 5,000+ selections & retired military faculty. Know our story.",
      metaKeywords:
        "warriors defence academy lucknow, about warriors defence academy, best defence academy lucknow, nda coaching institute lucknow, defence academy india",
      ogTitle: "About Warriors Defence Academy | Best NDA Coaching in Lucknow",
      ogDescription:
        "India's top NDA coaching institute in Lucknow since 2010 — 50,000+ students trained, 5,000+ selections, retired military faculty & India's largest GTO ground.",
      focusKeyword: "warriors defence academy lucknow",
      schemaType: "EducationalOrganization",
    },
    courses: {
      metaTitle: "NDA CDS SSB Coaching Courses | Warriors Defence Academy",
      metaDescription:
        "Explore NDA, CDS, AFCAT & SSB coaching programmes at Warriors Defence Academy, Lucknow. 9+ courses, retired military faculty, 5,000+ selections. Enroll today!",
      metaKeywords:
        "nda coaching courses, cds coaching lucknow, ssb interview coaching, afcat coaching, defence coaching programmes lucknow, warriors defence academy courses",
      ogTitle: "NDA & CDS Coaching Courses | Warriors Defence Academy Lucknow",
      ogDescription:
        "NDA, CDS, AFCAT & SSB coaching at Warriors Defence Academy Lucknow — 9+ programmes led by retired military officers. 5,000+ selections. Apply now.",
      focusKeyword: "nda coaching courses lucknow",
      schemaType: "EducationalOrganization",
    },
    contact: {
      metaTitle: "Contact Warriors Defence Academy | NDA Coaching Lucknow",
      metaDescription:
        "Contact Warriors Defence Academy, Lucknow — India's best NDA coaching. Call +91 94522 45729. Visit: Kapoorthala Chauraha, Lucknow 226024. Mon–Sat 9 AM–6 PM.",
      metaKeywords:
        "warriors defence academy contact, nda coaching lucknow address, warriors academy phone number, defence coaching lucknow contact",
      ogTitle: "Contact Warriors Defence Academy | NDA Coaching Lucknow",
      ogDescription:
        "Get in touch with Warriors Defence Academy — Lucknow's #1 NDA coaching. +91 94522 45729 | Kapoorthala Chauraha, Lucknow.",
      focusKeyword: "warriors defence academy contact lucknow",
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
      metaTitle: "NDA CDS SSB Exam Tips & Guides | Warriors Defence Academy",
      metaDescription:
        "Expert NDA, CDS & SSB preparation tips, exam guides and defence career advice from Warriors Defence Academy — India's best NDA coaching institute in Lucknow.",
      metaKeywords:
        "nda exam tips, nda coaching blog, cds exam preparation guide, ssb interview tips, defence exam 2026, warriors defence academy blog",
      ogTitle: "NDA & Defence Exam Blog | Warriors Defence Academy",
      ogDescription:
        "Expert NDA, CDS & SSB preparation tips and guides from Warriors Defence Academy — India's best NDA coaching institute.",
      focusKeyword: "nda exam preparation tips",
      schemaType: "Article",
    },
    gallery: {
      metaTitle: "Campus Gallery | Warriors Defence Academy Lucknow",
      metaDescription:
        "Warriors Defence Academy campus gallery — India's largest GTO ground, training sessions & student life. Photos from Lucknow's top NDA coaching institute.",
      metaKeywords:
        "warriors defence academy gallery, nda coaching campus lucknow, gto ground photos, defence academy campus india",
      ogTitle: "Campus Gallery | Warriors Defence Academy Lucknow",
      ogDescription:
        "See the campus of India's best NDA coaching institute — Warriors Defence Academy, Lucknow. India's largest GTO ground, training & student life.",
      focusKeyword: "warriors defence academy campus lucknow",
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
    // Append location + brand to course titles for pan-India keyword coverage
    const metaTitle = `${data.title} Coaching in Lucknow | Warriors Defence Academy`
    const metaDesc = data.description.length > 155
      ? data.description.slice(0, 152) + "..."
      : data.description
    return {
      ...DEFAULT_PAGE_SEO,
      metaTitle,
      metaDescription: metaDesc,
      metaKeywords: `${data.title.toLowerCase()} coaching lucknow, ${data.title.toLowerCase()} coaching india, warriors defence academy, best ${data.title.toLowerCase()} coaching`,
      canonicalUrl: `${SITE_URL}${data.path}`,
      ogTitle: metaTitle,
      ogDescription: metaDesc,
      ogImage,
      twitterTitle: metaTitle,
      twitterDescription: metaDesc,
      twitterImage: ogImage,
      focusKeyword: `${data.title.toLowerCase()} coaching lucknow`,
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
          "NDA Exam Preparation",
          "CDS Coaching",
          "SSB Interview Preparation",
          "AFCAT Exam",
          "Defence Career Coaching",
          "Military Training",
          "Sainik School Coaching",
          "Physical Fitness Training for Defence",
          "GTO Task Training",
        ],
        keywords:
          "best nda coaching in india, best nda coaching in lucknow, nda coaching, nda coaching lucknow, cds coaching, ssb coaching, defence academy lucknow",
      },

      /* ── 2. WebSite ── */
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: "Warriors Defence Academy",
        description: "Best NDA Coaching in India — Warriors Defence Academy, Lucknow",
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
          "Join Warriors Defence Academy — India's best NDA coaching in Lucknow. 50,000+ students trained, 5,000+ selections. Expert military faculty & largest GTO ground. Enroll now!",
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
              text: "Warriors Defence Academy in Lucknow is widely recognised as the best NDA coaching institute in India. With 50,000+ students trained, 5,000+ successful selections into NDA, CDS and SSB, and a 15+ year track record, it is led by retired military officers and features India's largest GTO training ground. Located at Kapoorthala Chauraha, Lucknow.",
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
              text: "You can register online at warriorsdefenceacademy.com/register or visit the campus at 545-Ga/1 Chha, Near Kapoorthala Chauraha, Lucknow - 226024. Admissions for the 2026-27 batch are currently open. Call +91 94522 45729 or +91 70810 11964 for enquiries.",
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
