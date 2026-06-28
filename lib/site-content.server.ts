import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"
import { createServerClient } from "@/lib/supabase"
import {
  defaultContent,
  type SiteContent,
  type SiteSections,
  type SitePages,
} from "@/lib/site-content"
import { mergeSeoStore } from "@/lib/seo"

const CMS_FILE = path.join(process.cwd(), "data", "cms", "site-content.json")

function mergeSections(raw: Partial<SiteSections> | null | undefined): SiteSections {
  if (!raw) return defaultContent.sections
  const base = defaultContent.sections
  return {
    heroSlides: raw.heroSlides?.length ? raw.heroSlides : base.heroSlides,
    heroAchievement: { ...base.heroAchievement, ...raw.heroAchievement },
    featuresHeader: { ...base.featuresHeader, ...raw.featuresHeader },
    features: raw.features?.length ? raw.features : base.features,
    statsSection: {
      ...base.statsSection,
      ...raw.statsSection,
      stats: raw.statsSection?.stats?.length ? raw.statsSection.stats : base.statsSection.stats,
    },
    director: {
      ...base.director,
      ...raw.director,
      paragraphs: raw.director?.paragraphs?.length ? raw.director.paragraphs : base.director.paragraphs,
      stats: raw.director?.stats?.length ? raw.director.stats : base.director.stats,
    },
    cta: { ...base.cta, ...raw.cta },
    activities: {
      ...base.activities,
      ...raw.activities,
      items: raw.activities?.items?.length ? raw.activities.items : base.activities.items,
    },
    books: {
      ...base.books,
      ...raw.books,
      items: raw.books?.items?.length ? raw.books.items : base.books.items,
    },
    videos: {
      ...base.videos,
      ...raw.videos,
      items: raw.videos?.items?.length ? raw.videos.items : base.videos.items,
    },
    facilityPhotos: raw.facilityPhotos ?? base.facilityPhotos,
  }
}

function mergePages(raw: Partial<SitePages> | null | undefined): SitePages {
  if (!raw) return defaultContent.pages
  const base = defaultContent.pages
  return {
    contact: { ...base.contact, ...raw.contact, hero: { ...base.contact.hero, ...raw.contact?.hero } },
    courses: { ...base.courses, ...raw.courses, hero: { ...base.courses.hero, ...raw.courses?.hero }, stats: raw.courses?.stats?.length ? raw.courses.stats : base.courses.stats },
    results: { ...base.results, ...raw.results, hero: { ...base.results.hero, ...raw.results?.hero }, stats: raw.results?.stats?.length ? raw.results.stats : base.results.stats, examBreakdown: raw.results?.examBreakdown?.length ? raw.results.examBreakdown : base.results.examBreakdown, awards: raw.results?.awards?.length ? raw.results.awards : base.results.awards },
    register: { ...base.register, ...raw.register, hero: { ...base.register.hero, ...raw.register?.hero } },
    admissions: { ...base.admissions, ...raw.admissions, hero: { ...base.admissions.hero, ...raw.admissions?.hero }, steps: raw.admissions?.steps?.length ? raw.admissions.steps : base.admissions.steps, documents: raw.admissions?.documents?.length ? raw.admissions.documents : base.admissions.documents, scholarships: raw.admissions?.scholarships?.length ? raw.admissions.scholarships : base.admissions.scholarships, fees: raw.admissions?.fees?.length ? raw.admissions.fees : base.admissions.fees },
    about: { ...base.about, ...raw.about, hero: { ...base.about.hero, ...raw.about?.hero }, milestones: raw.about?.milestones?.length ? raw.about.milestones : base.about.milestones, values: raw.about?.values?.length ? raw.about.values : base.about.values, stats: raw.about?.stats?.length ? raw.about.stats : base.about.stats },
  }
}

async function loadFromFile(): Promise<SiteContent | null> {
  try {
    const raw = await readFile(CMS_FILE, "utf-8")
    return JSON.parse(raw) as SiteContent
  } catch {
    return null
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const db = createServerClient()
    const { data, error } = await db
      .from("site_content")
      .select("*")
      .eq("id", 1)
      .maybeSingle()

    if (error || !data) return (await loadFromFile()) ?? defaultContent

    return {
      announcement: { ...defaultContent.announcement, ...(data.announcement as SiteContent["announcement"]) },
      hero: { ...defaultContent.hero, ...(data.hero as SiteContent["hero"]) },
      contact: { ...defaultContent.contact, ...(data.contact as SiteContent["contact"]) },
      stats: (data.stats as SiteContent["stats"]) ?? defaultContent.stats,
      sections: mergeSections(data.sections as Partial<SiteSections> | undefined),
      pages: mergePages(data.pages as Partial<SitePages> | undefined),
      seo: mergeSeoStore(data.seo as SiteContent["seo"]),
      updatedAt: data.updated_at as string | undefined,
    }
  } catch {
    return (await loadFromFile()) ?? defaultContent
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  try {
    const db = createServerClient()
    await db.from("site_content").upsert({
      id: 1,
      announcement: content.announcement,
      hero: content.hero,
      contact: content.contact,
      stats: content.stats,
      sections: content.sections,
      pages: content.pages,
      seo: content.seo ?? mergeSeoStore(),
      updated_at: new Date().toISOString(),
    })
  } catch {
    await mkdir(path.dirname(CMS_FILE), { recursive: true })
    await writeFile(CMS_FILE, JSON.stringify({ ...content, updatedAt: new Date().toISOString() }, null, 2))
  }
}
