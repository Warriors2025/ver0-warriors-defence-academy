import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getSiteContent, saveSiteContent } from "@/lib/site-content.server"
import type { SiteContent } from "@/lib/site-content"
import { mergeSeoStore } from "@/lib/seo"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const content = await getSiteContent()
  return NextResponse.json(content)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await req.json() as Partial<SiteContent>
    const current = await getSiteContent()
    const updated: SiteContent = {
      ...current,
      ...body,
      announcement: body.announcement ? { ...current.announcement, ...body.announcement } : current.announcement,
      hero: body.hero ? { ...current.hero, ...body.hero } : current.hero,
      contact: body.contact ? { ...current.contact, ...body.contact } : current.contact,
      stats: body.stats ?? current.stats,
      sections: body.sections ? { ...current.sections, ...body.sections } : current.sections,
      pages: body.pages ? { ...current.pages, ...body.pages } : current.pages,
      seo: body.seo
        ? {
            pages: { ...(current.seo?.pages ?? {}), ...body.seo.pages },
            images: { ...(current.seo?.images ?? {}), ...body.seo.images },
            headings: { ...(current.seo?.headings ?? {}), ...body.seo.headings },
          }
        : current.seo ?? mergeSeoStore(),
    }
    await saveSiteContent(updated)
    revalidatePath("/")
    revalidatePath("/contact")
    revalidatePath("/courses")
    revalidatePath("/results")
    revalidatePath("/register")
    revalidatePath("/admissions")
    revalidatePath("/about")
    revalidatePath("/blog")
    revalidatePath("/gallery")
    if (body.seo?.pages) {
      const { getCmsPage } = await import("@/lib/cms-pages")
      for (const key of Object.keys(body.seo.pages)) {
        if (key.startsWith("blog:")) revalidatePath(`/blog/${key.slice(5)}`)
        else if (key.startsWith("course:")) revalidatePath(`/courses/${key.slice(7)}`)
        else {
          const page = getCmsPage(key)
          if (page?.path) revalidatePath(page.path)
        }
      }
    }
    return NextResponse.json({ success: true, updatedAt: new Date().toISOString() })
  } catch (err) {
    console.error("Content save error:", err)
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
  }
}
