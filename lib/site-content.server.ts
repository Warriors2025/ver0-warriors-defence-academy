import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"
import { cookies } from "next/headers"
import { createServerClient } from "@/lib/supabase"
import {
  defaultContent,
  type SiteContent,
  type SiteSections,
  type SitePages,
  type SiteContentDraft,
} from "@/lib/site-content"
import { mergeSeoStore } from "@/lib/seo"
import { mergeNavigation, type NavigationContent } from "@/lib/navigation"
import { FACILITIES } from "@/lib/facilities-data"

const CMS_FILE = path.join(process.cwd(), "data", "cms", "site-content.json")
export const CMS_PREVIEW_COOKIE = "wda_cms_preview"

type CmsSettingsBag = {
  navigation?: NavigationContent
  draft?: SiteContentDraft | null
  [key: string]: unknown
}

async function readSettingsBag(): Promise<CmsSettingsBag> {
  try {
    const db = createServerClient()
    const { data } = await db.from("site_content").select("*").eq("id", 1).maybeSingle()
    const row = data as Record<string, unknown> | null
    return ((row?.settings as CmsSettingsBag) ?? {}) as CmsSettingsBag
  } catch {
    return {}
  }
}

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
      items: raw.activities?.items !== undefined ? raw.activities.items : base.activities.items,
    },
    books: {
      ...base.books,
      ...raw.books,
      items: raw.books?.items !== undefined ? raw.books.items : base.books.items,
    },
    videos: {
      ...base.videos,
      ...raw.videos,
      items: raw.videos?.items !== undefined ? raw.videos.items : base.videos.items,
    },
    facilityPhotos: raw.facilityPhotos ?? base.facilityPhotos,
    facilityItems: raw.facilityItems !== undefined ? raw.facilityItems : base.facilityItems ?? FACILITIES,
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

function applyDraft(live: SiteContent, draft: SiteContentDraft | null | undefined): SiteContent {
  if (!draft) return live
  return {
    ...live,
    announcement: draft.announcement ? { ...live.announcement, ...draft.announcement } : live.announcement,
    hero: draft.hero ? { ...live.hero, ...draft.hero } : live.hero,
    contact: draft.contact ? { ...live.contact, ...draft.contact } : live.contact,
    stats: draft.stats ?? live.stats,
    sections: draft.sections ? mergeSections({ ...live.sections, ...draft.sections }) : live.sections,
    pages: draft.pages ? mergePages({ ...live.pages, ...draft.pages }) : live.pages,
    navigation: draft.navigation ? mergeNavigation(draft.navigation) : live.navigation,
    draft,
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

function normalizeRow(data: Record<string, unknown>): SiteContent {
  const settings = (data.settings as CmsSettingsBag | undefined) ?? {}
  return {
    announcement: { ...defaultContent.announcement, ...(data.announcement as SiteContent["announcement"]) },
    hero: { ...defaultContent.hero, ...(data.hero as SiteContent["hero"]) },
    contact: { ...defaultContent.contact, ...(data.contact as SiteContent["contact"]) },
    stats: (data.stats as SiteContent["stats"]) ?? defaultContent.stats,
    sections: mergeSections(data.sections as Partial<SiteSections> | undefined),
    pages: mergePages(data.pages as Partial<SitePages> | undefined),
    seo: mergeSeoStore(data.seo as SiteContent["seo"]),
    navigation: mergeNavigation(settings.navigation),
    draft: settings.draft ?? null,
    updatedAt: data.updated_at as string | undefined,
  }
}

export async function getSiteContent(opts?: { includeDraft?: boolean }): Promise<SiteContent> {
  let live: SiteContent = defaultContent

  try {
    const db = createServerClient()
    const { data, error } = await db
      .from("site_content")
      .select("*")
      .eq("id", 1)
      .maybeSingle()

    if (!error && data) {
      live = normalizeRow(data as Record<string, unknown>)
    } else {
      live = (await loadFromFile()) ?? defaultContent
      if (!live.navigation) live = { ...live, navigation: mergeNavigation(live.navigation) }
    }
  } catch {
    live = (await loadFromFile()) ?? defaultContent
  }

  let includeDraft = opts?.includeDraft
  if (includeDraft === undefined) {
    try {
      const jar = await cookies()
      includeDraft = jar.get(CMS_PREVIEW_COOKIE)?.value === "1"
    } catch {
      includeDraft = false
    }
  }

  return includeDraft ? applyDraft(live, live.draft) : live
}

export async function saveSiteContent(content: SiteContent, opts?: { asDraft?: boolean }): Promise<void> {
  try {
    const db = createServerClient()
    const currentSettings = await readSettingsBag()

    if (opts?.asDraft) {
      const draft: SiteContentDraft = {
        announcement: content.announcement,
        hero: content.hero,
        contact: content.contact,
        stats: content.stats,
        sections: content.sections,
        pages: content.pages,
        navigation: content.navigation,
        updatedAt: new Date().toISOString(),
      }
      await db.from("site_content").upsert({
        id: 1,
        settings: { ...currentSettings, draft, navigation: currentSettings.navigation ?? content.navigation },
        updated_at: new Date().toISOString(),
      } as never)
      return
    }

    await db.from("site_content").upsert({
      id: 1,
      announcement: content.announcement,
      hero: content.hero,
      contact: content.contact,
      stats: content.stats,
      sections: content.sections,
      pages: content.pages,
      seo: content.seo ?? mergeSeoStore(),
      settings: {
        ...currentSettings,
        navigation: content.navigation ?? currentSettings.navigation,
        draft: content.draft === undefined ? null : content.draft,
      },
      updated_at: new Date().toISOString(),
    } as never)
  } catch {
    await mkdir(path.dirname(CMS_FILE), { recursive: true })
    await writeFile(CMS_FILE, JSON.stringify({ ...content, updatedAt: new Date().toISOString() }, null, 2))
  }
}

export async function clearCmsDraft(): Promise<void> {
  try {
    const db = createServerClient()
    const currentSettings = await readSettingsBag()
    const { draft: _removed, ...rest } = currentSettings
    await db.from("site_content").update({
      settings: { ...rest, draft: null },
      updated_at: new Date().toISOString(),
    } as never).eq("id", 1)
  } catch {
    // file fallback ignores draft
  }
}
