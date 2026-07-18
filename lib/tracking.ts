import { createServerClient } from "@/lib/supabase"

export type TrackingTags = {
  /** Google Analytics 4 Measurement ID, e.g. G-XXXXXXXXXX */
  ga4Id: string
  /** Google Tag Manager container ID, e.g. GTM-XXXXXXX */
  gtmId: string
  /** Google Search Console HTML tag verification content value */
  searchConsoleVerification: string
  /** Google Ads conversion ID, e.g. AW-XXXXXXXXX */
  googleAdsId: string
  /** Meta (Facebook) Pixel ID */
  metaPixelId: string
  /** Raw HTML/scripts injected in <head> (Microsoft Clarity, Hotjar, etc.) */
  customHeadHtml: string
  /** Raw HTML injected at start of <body> (noscript fallbacks, etc.) */
  customBodyHtml: string
}

export const emptyTrackingTags: TrackingTags = {
  ga4Id: "",
  gtmId: "",
  searchConsoleVerification: "",
  googleAdsId: "",
  metaPixelId: "",
  customHeadHtml: "",
  customBodyHtml: "",
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

/** Allow only safe tag ID characters (letters, digits, hyphens, underscores). */
function asTagId(value: unknown): string {
  const raw = asString(value)
  if (!raw) return ""
  return /^[A-Za-z0-9_-]+$/.test(raw) ? raw : ""
}

export function normalizeTrackingTags(raw: unknown): TrackingTags {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>
  return {
    ga4Id: asTagId(obj.ga4Id),
    gtmId: asTagId(obj.gtmId),
    searchConsoleVerification: asTagId(obj.searchConsoleVerification),
    googleAdsId: asTagId(obj.googleAdsId),
    metaPixelId: asTagId(obj.metaPixelId),
    customHeadHtml: typeof obj.customHeadHtml === "string" ? obj.customHeadHtml : "",
    customBodyHtml: typeof obj.customBodyHtml === "string" ? obj.customBodyHtml : "",
  }
}

/** True when at least one configured tag should render on the public site. */
export function hasAnyTrackingTag(tags: TrackingTags): boolean {
  return Boolean(
    tags.ga4Id ||
      tags.gtmId ||
      tags.searchConsoleVerification ||
      tags.googleAdsId ||
      tags.metaPixelId ||
      tags.customHeadHtml.trim() ||
      tags.customBodyHtml.trim()
  )
}

async function readSettingsBag(): Promise<Record<string, unknown>> {
  try {
    const db = createServerClient()
    const { data } = await db.from("site_content").select("settings").eq("id", 1).maybeSingle()
    return ((data?.settings as Record<string, unknown>) ?? {}) as Record<string, unknown>
  } catch {
    return {}
  }
}

export async function getTrackingTags(): Promise<TrackingTags> {
  const settings = await readSettingsBag()
  return normalizeTrackingTags(settings.tracking)
}

export async function saveTrackingTags(tags: TrackingTags): Promise<TrackingTags> {
  const db = createServerClient()
  const current = await readSettingsBag()
  const tracking = normalizeTrackingTags(tags)
  await db
    .from("site_content")
    .update({
      settings: { ...current, tracking },
      updated_at: new Date().toISOString(),
    } as never)
    .eq("id", 1)
  return tracking
}
