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
  resolveHeading,
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
  return buildPresetSchema(seo.schemaType, seo, path)
}
