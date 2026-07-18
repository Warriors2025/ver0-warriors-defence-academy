import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import {
  getSiteContent,
  saveSiteContent,
  clearCmsDraft,
  CMS_PREVIEW_COOKIE,
} from "@/lib/site-content.server"
import type { SiteContent } from "@/lib/site-content"
import { mergeSeoStore } from "@/lib/seo"
import { mergeNavigation } from "@/lib/navigation"

async function revalidateSite(body?: Partial<SiteContent>) {
  revalidatePath("/")
  revalidatePath("/contact")
  revalidatePath("/courses")
  revalidatePath("/results")
  revalidatePath("/register")
  revalidatePath("/admissions")
  revalidatePath("/about")
  revalidatePath("/blog")
  revalidatePath("/gallery")
  revalidatePath("/facilities")
  const content = await getSiteContent()
  const facilities = content.sections.facilityItems ?? []
  for (const f of facilities) revalidatePath(`/facilities/${f.slug}`)
  if (body?.seo?.pages) {
    const { getCmsPage } = await import("@/lib/cms-pages")
    for (const key of Object.keys(body.seo.pages)) {
      if (key.startsWith("blog:")) revalidatePath(`/blog/${key.slice(5)}`)
      else if (key.startsWith("course:")) revalidatePath(`/courses/${key.slice(7)}`)
      else if (key.startsWith("facility:")) revalidatePath(`/facilities/${key.slice(9)}`)
      else if (key.startsWith("custom:")) revalidatePath(key.slice(7) || "/")
      else {
        const page = getCmsPage(key)
        if (page?.path) revalidatePath(page.path)
      }
    }
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const includeDraft = req.nextUrl.searchParams.get("draft") === "1"
  const content = await getSiteContent({ includeDraft })
  return NextResponse.json(content)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await req.json() as Partial<SiteContent> & {
      mode?: "publish" | "draft" | "publish-draft" | "discard-draft" | "preview-on" | "preview-off"
    }
    const mode = body.mode ?? "publish"
    const current = await getSiteContent({ includeDraft: false })

    if (mode === "preview-on") {
      const res = NextResponse.json({ success: true, preview: true })
      res.cookies.set(CMS_PREVIEW_COOKIE, "1", { path: "/", httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 8 })
      return res
    }
    if (mode === "preview-off") {
      const res = NextResponse.json({ success: true, preview: false })
      res.cookies.set(CMS_PREVIEW_COOKIE, "", { path: "/", httpOnly: true, maxAge: 0 })
      return res
    }
    if (mode === "discard-draft") {
      await clearCmsDraft()
      return NextResponse.json({ success: true, discarded: true })
    }

    if (mode === "publish-draft") {
      const withDraft = await getSiteContent({ includeDraft: true })
      const published: SiteContent = { ...withDraft, draft: null }
      await saveSiteContent(published)
      await clearCmsDraft()
      await revalidateSite()
      return NextResponse.json({ success: true, published: true, updatedAt: new Date().toISOString() })
    }

    const updated: SiteContent = {
      ...current,
      ...body,
      announcement: body.announcement ? { ...current.announcement, ...body.announcement } : current.announcement,
      hero: body.hero ? { ...current.hero, ...body.hero } : current.hero,
      contact: body.contact ? { ...current.contact, ...body.contact } : current.contact,
      stats: body.stats ?? current.stats,
      sections: body.sections ? { ...current.sections, ...body.sections } : current.sections,
      pages: body.pages ? { ...current.pages, ...body.pages } : current.pages,
      navigation: body.navigation ? mergeNavigation(body.navigation) : current.navigation,
      seo: body.seo
        ? {
            pages: { ...(current.seo?.pages ?? {}), ...body.seo.pages },
            images: { ...(current.seo?.images ?? {}), ...body.seo.images },
            headings: { ...(current.seo?.headings ?? {}), ...body.seo.headings },
          }
        : current.seo ?? mergeSeoStore(),
      draft: current.draft,
    }

    if (mode === "draft") {
      const draftPayload: SiteContent = {
        ...current,
        announcement: body.announcement ? updated.announcement : current.announcement,
        hero: body.hero ? updated.hero : current.hero,
        contact: body.contact ? updated.contact : current.contact,
        stats: body.stats ? updated.stats : current.stats,
        sections: body.sections ? updated.sections : current.sections,
        pages: body.pages ? updated.pages : current.pages,
        navigation: body.navigation ? updated.navigation : current.navigation,
      }
      // Merge into existing draft rather than overwriting unrelated keys
      const existingDraft = current.draft ?? {}
      const mergedForDraft: SiteContent = {
        ...current,
        announcement: body.announcement ? { ...current.announcement, ...body.announcement } : (existingDraft.announcement ?? current.announcement),
        hero: body.hero ? { ...current.hero, ...body.hero } : (existingDraft.hero ?? current.hero),
        contact: body.contact ? { ...current.contact, ...body.contact } : (existingDraft.contact ?? current.contact),
        stats: body.stats ?? existingDraft.stats ?? current.stats,
        sections: body.sections
          ? { ...current.sections, ...(existingDraft.sections ?? {}), ...body.sections }
          : { ...current.sections, ...(existingDraft.sections ?? {}) },
        pages: body.pages
          ? { ...current.pages, ...(existingDraft.pages ?? {}), ...body.pages }
          : { ...current.pages, ...(existingDraft.pages ?? {}) },
        navigation: body.navigation
          ? mergeNavigation(body.navigation)
          : mergeNavigation(existingDraft.navigation ?? current.navigation),
      }
      void draftPayload
      await saveSiteContent(mergedForDraft, { asDraft: true })
      return NextResponse.json({ success: true, draft: true, updatedAt: new Date().toISOString() })
    }

    await saveSiteContent({ ...updated, draft: null })
    await revalidateSite(body)
    return NextResponse.json({ success: true, updatedAt: new Date().toISOString() })
  } catch (err) {
    console.error("Content save error:", err)
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
  }
}
