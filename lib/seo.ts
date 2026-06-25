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
  const title = page.slug === "home"
    ? `${SITE_NAME} | Best NDA Coaching in Lucknow, India`
    : `${page.title} | ${SITE_NAME}`

  return {
    ...DEFAULT_PAGE_SEO,
    metaTitle: title,
    metaDescription: page.description,
    canonicalUrl: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    ogTitle: page.title,
    ogDescription: page.description,
    twitterTitle: page.title,
    twitterDescription: page.description,
    schemaType: page.slug === "home" ? "EducationalOrganization" : "WebPage",
  }
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
  return {
    ...DEFAULT_PAGE_SEO,
    metaTitle: `${data.title} | ${SITE_NAME}`,
    metaDescription: data.description,
    canonicalUrl: `${SITE_URL}${data.path}`,
    ogTitle: data.title,
    ogDescription: data.description,
    ogImage: data.image || "/images/og-image.webp",
    twitterTitle: data.title,
    twitterDescription: data.description,
    twitterImage: data.image || "/images/og-image.webp",
    schemaType: type === "blog" ? "BlogPosting" : "Course",
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
