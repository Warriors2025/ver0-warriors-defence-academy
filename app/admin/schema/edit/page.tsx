"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SchemaMarkupEditor } from "@/components/admin/schema-markup-editor"
import {
  CMS_PAGES,
  getCmsPage,
} from "@/lib/cms-pages"
import { FACILITIES } from "@/lib/facilities-data"
import {
  mergePageSeo,
  mergeEntitySeo,
  entitySeoKey,
  DEFAULT_PAGE_SEO,
  SITE_URL,
  type PageSeo,
} from "@/lib/seo"

function resolveMeta(key: string): { title: string; path: string; homeNote?: boolean } {
  if (key.startsWith("blog:")) {
    const slug = key.slice(5)
    return { title: `Blog: ${slug}`, path: `/blog/${slug}` }
  }
  if (key.startsWith("course:")) {
    const slug = key.slice(7)
    return { title: `Course: ${slug}`, path: `/courses/${slug}` }
  }
  if (key.startsWith("facility:")) {
    const slug = key.slice(9)
    const facility = FACILITIES.find((f) => f.slug === slug)
    return {
      title: facility?.title ?? `Facility: ${slug}`,
      path: `/facilities/${slug}`,
    }
  }
  if (key.startsWith("custom:")) {
    const path = key.slice(7)
    return { title: path, path }
  }
  const page = getCmsPage(key)
  if (page) {
    return { title: page.title, path: page.path, homeNote: key === "home" }
  }
  return { title: key, path: key.startsWith("/") ? key : `/${key}` }
}

function SchemaEditInner() {
  const searchParams = useSearchParams()
  const key = searchParams.get("key") ?? ""
  const meta = resolveMeta(key)

  const [pageSeo, setPageSeo] = useState<PageSeo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [displayTitle, setDisplayTitle] = useState(meta.title)

  useEffect(() => {
    if (!key) {
      setLoading(false)
      return
    }
    setLoading(true)
    fetch("/api/content", { credentials: "include" })
      .then((r) => r.json())
      .then(async (json) => {
        const store = json.seo ?? { pages: {} }
        let seo: PageSeo

        if (key.startsWith("blog:") || key.startsWith("course:")) {
          const type = key.startsWith("blog:") ? "blog" : "course"
          const slug = key.slice(type === "blog" ? 5 : 7)
          // Try to load title from list APIs
          try {
            const listRes = await fetch(`/api/admin/${type === "blog" ? "blog" : "courses"}`, { credentials: "include" })
            const listJson = await listRes.json()
            const item = (listJson.items ?? []).find((i: { slug?: string }) => i.slug === slug)
            const title = item?.title ?? slug
            const description = item?.excerpt || item?.short_description || ""
            const path = type === "blog" ? `/blog/${slug}` : `/courses/${slug}`
            seo = mergeEntitySeo(type, slug, store.pages[entitySeoKey(type, slug)], {
              title,
              description,
              path,
              image: item?.image_url,
            })
            setDisplayTitle(title)
          } catch {
            seo = mergeEntitySeo(type as "blog" | "course", slug, store.pages[key], {
              title: slug,
              description: "",
              path: meta.path,
            })
          }
        } else if (key.startsWith("facility:")) {
          const slug = key.slice(9)
          const facility = FACILITIES.find((f) => f.slug === slug)
          seo = {
            ...DEFAULT_PAGE_SEO,
            metaTitle: facility ? `${facility.title} | Warriors Defence Academy` : slug,
            metaDescription: facility?.description ?? "",
            canonicalUrl: `${SITE_URL}/facilities/${slug}`,
            schemaType: "WebPage",
            ...store.pages[key],
          }
          if (facility) setDisplayTitle(facility.title)
        } else if (key.startsWith("custom:")) {
          seo = {
            ...DEFAULT_PAGE_SEO,
            metaTitle: key.slice(7),
            canonicalUrl: `${SITE_URL}${key.slice(7)}`,
            schemaType: "WebPage",
            ...store.pages[key],
          }
          if (seo.metaTitle) setDisplayTitle(seo.metaTitle)
        } else if (CMS_PAGES.some((p) => p.slug === key)) {
          seo = mergePageSeo(key, store.pages[key])
        } else {
          seo = { ...DEFAULT_PAGE_SEO, ...store.pages[key] }
        }

        setPageSeo(seo)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load content")
        setLoading(false)
      })
  }, [key, meta.path])

  async function handleSave() {
    if (!pageSeo || !key) return
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          seo: {
            pages: {
              [key]: pageSeo,
            },
          },
        }),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setError("Failed to save schema")
    } finally {
      setSaving(false)
    }
  }

  if (!key) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive">Missing schema key.</p>
        <Link href="/admin/schema"><Button variant="outline">Back to Schema</Button></Link>
      </div>
    )
  }

  if (loading || !pageSeo) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/schema">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Schema
          </Button>
        </Link>
      </div>
      <SchemaMarkupEditor
        pageSeo={pageSeo}
        onChange={(patch) => setPageSeo((prev) => (prev ? { ...prev, ...patch } : prev))}
        path={meta.path}
        title={displayTitle}
        onSave={handleSave}
        saving={saving}
        saved={saved}
        error={error}
        homeNote={meta.homeNote}
      />
    </div>
  )
}

export default function AdminSchemaEditPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <SchemaEditInner />
    </Suspense>
  )
}
