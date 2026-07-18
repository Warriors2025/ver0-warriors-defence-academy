import type { Metadata } from "next"
import { getSiteContent } from "@/lib/site-content.server"
import { getCmsPage } from "@/lib/cms-pages"
import {
  SITE_URL,
  SITE_NAME,
  mergePageSeo,
  mergeSeoStore,
  mergeEntitySeo,
  entitySeoKey,
  entityHeadingKey,
  defaultEntitySeo,
  buildPresetSchema,
  buildHomeSchemaGraph,
  buildPageSchemaGraph,
  resolveHeading,
  DEFAULT_PAGE_SEO,
  type PageSeo,
  type SeoStore,
  type HeadingLevel,
} from "@/lib/seo"

export async function getSeoStore(): Promise<SeoStore> {
  const content = await getSiteContent()
  return mergeSeoStore(content.seo)
}

export async function getPageSeo(slug: string): Promise<PageSeo> {
  const store = await getSeoStore()
  return mergePageSeo(slug, store.pages[slug])
}

export function buildPageMetadata(slug: string, seo: PageSeo): Metadata {
  const page = getCmsPage(slug)
  return buildPathMetadata(seo, page?.path ?? "/", slug === "home", "website")
}

export function buildPathMetadata(
  seo: PageSeo,
  path: string,
  isHome = false,
  ogType: "website" | "article" = "website"
): Metadata {
  const canonical = seo.canonicalUrl || `${SITE_URL}${path === "/" ? "" : path}`
  const title = seo.metaTitle || SITE_NAME
  const description = seo.metaDescription || ""
  const keywords = seo.metaKeywords
    ? seo.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined

  return {
    title: isHome ? { default: title } : title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: ogType,
      images: seo.ogImage
        ? [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogTitle || title }]
        : undefined,
    },
    twitter: {
      card: seo.twitterCard,
      title: seo.twitterTitle || seo.ogTitle || title,
      description: seo.twitterDescription || seo.ogDescription || description,
      images: seo.twitterImage ? [seo.twitterImage] : undefined,
    },
    robots: {
      index: seo.robotsIndex,
      follow: seo.robotsFollow,
      googleBot: {
        index: seo.robotsIndex,
        follow: seo.robotsFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export async function getEntitySeo(
  type: "blog" | "course",
  slug: string,
  fallback: { title: string; description: string; path: string; image?: string; author?: string }
): Promise<PageSeo> {
  const store = await getSeoStore()
  const key = entitySeoKey(type, slug)
  return mergeEntitySeo(type, slug, store.pages[key], fallback)
}

export async function getEntitySchemaJsonLd(
  type: "blog" | "course",
  slug: string,
  fallback: { title: string; description: string; path: string; image?: string; author?: string }
): Promise<object | null> {
  const seo = await getEntitySeo(type, slug, fallback)
  const path = fallback.path

  if (seo.schemaType === "none") return null
  if (seo.schemaType === "custom") {
    if (!seo.schemaCustomJson.trim()) return null
    try {
      return JSON.parse(seo.schemaCustomJson) as object
    } catch {
      return null
    }
  }
  return buildPresetSchema(seo.schemaType, seo, path, {
    image: fallback.image,
    author: fallback.author,
  })
}

export async function getEntityHeadingLevel(
  type: "blog" | "course",
  slug: string,
  field = "title",
  defaultLevel: HeadingLevel = "h1"
) {
  const store = await getSeoStore()
  return resolveHeading(store, entityHeadingKey(type, slug, field), defaultLevel)
}

export async function getPageSchemaJsonLd(slug: string): Promise<object | null> {
  const seo = await getPageSeo(slug)
  const page = getCmsPage(slug)
  const path = page?.path ?? "/"

  if (seo.schemaType === "none") return null
  if (seo.schemaType === "custom") {
    if (!seo.schemaCustomJson.trim()) return null
    try {
      return JSON.parse(seo.schemaCustomJson) as object
    } catch {
      return null
    }
  }
  // Home page gets the full @graph schema (EducationalOrg + LocalBusiness + WebSite + WebPage + FAQPage)
  // Admin can override by setting schemaType = "custom" with their own JSON in the CMS
  if (slug === "home") {
    return buildHomeSchemaGraph()
  }
  // All other pages get an @graph combining WebPage + the page-specific type
  return buildPageSchemaGraph(slug, seo, path)
}

/** Resolve JSON-LD for any seo.pages key: CMS slug, blog:, course:, facility:, custom: */
export async function getSchemaJsonLdByKey(
  key: string,
  opts?: { path?: string; title?: string; description?: string; image?: string }
): Promise<object | null> {
  if (key.startsWith("blog:") || key.startsWith("course:")) {
    const type = key.startsWith("blog:") ? "blog" : "course"
    const slug = key.slice(type === "blog" ? 5 : 7)
    return getEntitySchemaJsonLd(type, slug, {
      title: opts?.title ?? slug,
      description: opts?.description ?? "",
      path: opts?.path ?? (type === "blog" ? `/blog/${slug}` : `/courses/${slug}`),
      image: opts?.image,
    })
  }

  const store = await getSeoStore()
  const raw = store.pages[key]
  const path = opts?.path ?? (key.startsWith("custom:") ? key.slice(7) : key.startsWith("facility:") ? `/facilities/${key.slice(9)}` : `/${key}`)

  const seo = key.startsWith("facility:") || key.startsWith("custom:")
    ? {
        ...DEFAULT_PAGE_SEO,
        metaTitle: opts?.title ?? "",
        metaDescription: opts?.description ?? "",
        canonicalUrl: `${SITE_URL}${path}`,
        schemaType: "WebPage" as const,
        ...raw,
      }
    : await getPageSeo(key)

  if (seo.schemaType === "none") return null
  if (seo.schemaType === "custom") {
    if (!seo.schemaCustomJson.trim()) return null
    try {
      return JSON.parse(seo.schemaCustomJson) as object
    } catch {
      return null
    }
  }
  if (key === "home") return buildHomeSchemaGraph()
  return buildPresetSchema(seo.schemaType, seo, path, { image: opts?.image })
}
