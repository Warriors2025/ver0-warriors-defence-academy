"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Save, CheckCircle, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SeoFieldsPanel } from "@/components/admin/seo-fields-panel"
import {
  mergeEntitySeo, entitySeoKey, entityHeadingKey, defaultEntitySeo,
  type PageSeo, type HeadingLevel,
} from "@/lib/seo"

type Props = { type: "blog" | "course"; slug: string }

export function SeoEntityEditor({ type, slug }: Props) {
  const path = type === "blog" ? `/blog/${slug}` : `/courses/${slug}`
  const [seo, setSeo] = useState<PageSeo>(() => defaultEntitySeo(type, { title: slug, description: "", path }))
  const [heading, setHeading] = useState<HeadingLevel>("h1")
  const [title, setTitle] = useState(slug)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(type === "blog" ? "/api/admin/blog" : "/api/admin/courses", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/content", { credentials: "include" }).then((r) => r.json()),
    ])
      .then(([entityJson, contentJson]) => {
        const item = (entityJson.items ?? []).find((r: { slug: string }) => r.slug === slug)
        const store = contentJson.seo ?? { pages: {}, headings: {} }
        const fallback = {
          title: item?.title ?? slug,
          description: type === "blog" ? (item?.excerpt ?? "") : (item?.short_description ?? ""),
          path,
          image: item?.image_url ?? "",
          author: item?.author,
        }
        setTitle(fallback.title)
        setSeo(mergeEntitySeo(type, slug, store.pages?.[entitySeoKey(type, slug)], fallback))
        setHeading(store.headings?.[entityHeadingKey(type, slug, "title")] ?? "h1")
      })
      .catch(() => setError("Failed to load SEO data"))
      .finally(() => setLoading(false))
  }, [type, slug, path])

  async function handleSave() {
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          seo: {
            pages: { [entitySeoKey(type, slug)]: seo },
            headings: { [entityHeadingKey(type, slug, "title")]: heading },
          },
        }),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save SEO settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link href="/admin/seo" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-3.5 w-3.5" /> SEO Manager
          </Link>
          <h1 className="text-2xl font-bold">{title} — SEO</h1>
          <p className="text-sm text-muted-foreground mt-1 capitalize">{type} · {path}</p>
        </div>
        <div className="flex gap-2">
          <a href={path} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" /> View
            </Button>
          </a>
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            {saved ? <><CheckCircle className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save SEO"}</>}
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>}

      <div className="bg-card border border-border rounded-xl p-6">
        <SeoFieldsPanel
          seo={seo}
          onChange={(patch) => setSeo((prev) => ({ ...prev, ...patch }))}
          path={path}
          showHeading
          headingLevel={heading}
          onHeadingChange={setHeading}
        />
      </div>
    </div>
  )
}
