"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, RefreshCw, Save, CheckCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrayEditor } from "@/components/admin/array-editor"
import type { SitePages } from "@/lib/site-content"
import { getCmsPage } from "@/lib/cms-pages"

type Props = { slug: "about" | "contact" | "courses" | "admissions" | "results" | "register" }

export function PagePreviewEditor({ slug }: Props) {
  const pageMeta = getCmsPage(slug)
  const [pages, setPages] = useState<SitePages | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [iframeKey, setIframeKey] = useState(0)
  const previewPath = pageMeta?.path ?? `/${slug}`

  const load = useCallback(() => {
    setLoading(true)
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => {
        setPages(json.pages)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  async function handleSave(mode: "publish" | "draft" = "publish") {
    if (!pages) return
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages, mode }),
      })
      if (!res.ok) throw new Error("Save failed")
      if (mode === "draft") {
        await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "preview-on" }),
        })
      }
      setSaved(true)
      setIframeKey((k) => k + 1)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  function updateHero(field: string, value: string) {
    if (!pages) return
    const current = pages[slug]
    setPages({
      ...pages,
      [slug]: { ...current, hero: { ...current.hero, [field]: value } },
    })
  }

  function updateField(field: string, value: unknown) {
    if (!pages) return
    setPages({ ...pages, [slug]: { ...pages[slug], [field]: value } })
  }

  if (loading || !pages) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const current = pages[slug]

  return (
    <div className="h-screen flex flex-col bg-muted/30">
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-background border-b border-border shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/admin/pages">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Pages
            </Button>
          </Link>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{pageMeta?.title ?? slug} — Visual Editor</p>
            <p className="text-xs text-muted-foreground truncate">Edit on the left, live preview on the right</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {saved && (
            <span className="text-xs text-emerald-600 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Saved
            </span>
          )}
          <Button variant="outline" size="sm" onClick={() => setIframeKey((k) => k + 1)} className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <a href={previewPath} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-3.5 w-3.5" /> Open
            </Button>
          </a>
          <Button size="sm" disabled={saving} onClick={() => handleSave("draft")} variant="secondary" className="gap-1">
            <Eye className="h-3.5 w-3.5" /> Save Draft
          </Button>
          <Button size="sm" disabled={saving} onClick={() => handleSave("publish")} className="gap-1">
            <Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Publish"}
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive px-4 py-2 bg-destructive/10">{error}</p>}

      <div className="flex-1 grid lg:grid-cols-[380px_1fr] min-h-0">
        <aside className="overflow-y-auto border-r border-border bg-background p-4 space-y-5">
          {"hero" in current && current.hero && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Hero</p>
              {"eyebrow" in current.hero && (
                <div className="space-y-1.5">
                  <Label>Eyebrow</Label>
                  <Input value={current.hero.eyebrow ?? ""} onChange={(e) => updateHero("eyebrow", e.target.value)} />
                </div>
              )}
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={current.hero.title} onChange={(e) => updateHero("title", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Subtitle</Label>
                <Textarea value={current.hero.subtitle} onChange={(e) => updateHero("subtitle", e.target.value)} rows={3} />
              </div>
            </div>
          )}

          {slug === "about" && (
            <>
              <div className="space-y-1.5">
                <Label>Mission</Label>
                <Textarea value={pages.about.mission} onChange={(e) => updateField("mission", e.target.value)} rows={3} />
              </div>
              <div className="space-y-1.5">
                <Label>Vision</Label>
                <Textarea value={pages.about.vision} onChange={(e) => updateField("vision", e.target.value)} rows={3} />
              </div>
              <ArrayEditor
                label="Milestones"
                items={pages.about.milestones}
                onChange={(items) => updateField("milestones", items)}
                emptyItem={{ year: "", title: "", description: "" }}
                fields={[
                  { key: "year", label: "Year" },
                  { key: "title", label: "Title" },
                  { key: "description", label: "Description", type: "textarea" },
                ]}
              />
            </>
          )}

          {slug === "contact" && (
            <>
              <div className="space-y-1.5">
                <Label>Office Hours</Label>
                <Input value={pages.contact.officeHours} onChange={(e) => updateField("officeHours", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Sunday Hours</Label>
                <Input value={pages.contact.sundayHours} onChange={(e) => updateField("sundayHours", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Map Embed URL</Label>
                <Input value={pages.contact.mapEmbedUrl} onChange={(e) => updateField("mapEmbedUrl", e.target.value)} />
              </div>
            </>
          )}

          {slug === "courses" && "stats" in current && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Stats</p>
              {current.stats.map((s, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Input
                    value={s.value}
                    onChange={(e) => {
                      const stats = [...pages.courses.stats]
                      stats[i] = { ...stats[i], value: e.target.value }
                      updateField("stats", stats)
                    }}
                  />
                  <Input
                    value={s.label}
                    onChange={(e) => {
                      const stats = [...pages.courses.stats]
                      stats[i] = { ...stats[i], label: e.target.value }
                      updateField("stats", stats)
                    }}
                  />
                </div>
              ))}
              <Link href="/admin/courses" className="text-xs text-primary underline">
                Manage individual courses →
              </Link>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Need more fields? Use{" "}
            <Link href="/admin/site-pages" className="underline text-primary">Site Pages</Link>.
          </p>
        </aside>

        <div className="bg-muted/50 p-3 min-h-0">
          <iframe
            key={iframeKey}
            src={previewPath}
            title={`${slug} preview`}
            className="w-full h-full rounded-lg border border-border bg-background"
          />
        </div>
      </div>
    </div>
  )
}
