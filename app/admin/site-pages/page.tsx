"use client"

import { useState, useEffect } from "react"
import { Save, CheckCircle, FileText, Eye, FileClock, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { SitePages } from "@/lib/site-content"
import { ArrayEditor } from "@/components/admin/array-editor"

const PAGE_TABS: { key: keyof SitePages; label: string }[] = [
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
  { key: "courses", label: "Courses" },
  { key: "results", label: "Results" },
  { key: "admissions", label: "Admissions" },
  { key: "register", label: "Register" },
]

export default function SitePagesEditorPage() {
  const [pages, setPages] = useState<SitePages | null>(null)
  const [tab, setTab] = useState<keyof SitePages>("about")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState("")
  const [error, setError] = useState("")
  const [hasDraft, setHasDraft] = useState(false)

  function load(includeDraft = false) {
    setLoading(true)
    fetch(`/api/content${includeDraft ? "?draft=1" : ""}`)
      .then((r) => r.json())
      .then((json) => {
        setPages(json.pages)
        setHasDraft(Boolean(json.draft))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function save(mode: "publish" | "draft") {
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
      setSaved(mode === "draft" ? "Draft saved" : "Published successfully")
      setHasDraft(mode === "draft" || hasDraft)
      if (mode === "publish") setHasDraft(false)
      setTimeout(() => setSaved(""), 3000)
    } catch {
      setError("Failed to save. Check Supabase service role key in .env.local")
    } finally {
      setSaving(false)
    }
  }

  async function publishDraft() {
    setSaving(true)
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "publish-draft" }),
      })
      setSaved("Draft published")
      setHasDraft(false)
      load()
      setTimeout(() => setSaved(""), 3000)
    } catch {
      setError("Failed to publish draft")
    } finally {
      setSaving(false)
    }
  }

  async function previewDraft() {
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "preview-on" }),
    })
    const path =
      tab === "about" ? "/about" :
      tab === "contact" ? "/contact" :
      tab === "courses" ? "/courses" :
      tab === "results" ? "/results" :
      tab === "admissions" ? "/admissions" :
      "/register"
    window.open(`${path}?cms_preview=1`, "_blank")
  }

  function updateHero(page: keyof SitePages, field: string, value: string) {
    if (!pages) return
    setPages({
      ...pages,
      [page]: { ...pages[page], hero: { ...pages[page].hero, [field]: value } },
    })
  }

  function updateField(page: keyof SitePages, field: string, value: unknown) {
    if (!pages) return
    setPages({ ...pages, [page]: { ...pages[page], [field]: value } })
  }

  function updateStat(page: "courses" | "results" | "about", i: number, field: "value" | "label", val: string) {
    if (!pages) return
    const stats = [...pages[page].stats]
    stats[i] = { ...stats[i], [field]: val }
    setPages({ ...pages, [page]: { ...pages[page], stats } })
  }

  if (loading || !pages) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const current = pages[tab]

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" /> Site Pages
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit hero text, stats, and page content. Save as draft to preview before publishing.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PAGE_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4" /> {saved}
        </div>
      )}
      {hasDraft && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <FileClock className="h-4 w-4" />
          <span className="flex-1">You have an unpublished draft.</span>
          <Button type="button" size="sm" variant="outline" onClick={() => load(true)}>Load draft</Button>
          <Button type="button" size="sm" onClick={publishDraft} disabled={saving}>Publish draft</Button>
        </div>
      )}
      {error && <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>}

      <form
        onSubmit={(e) => { e.preventDefault(); save("publish") }}
        className="bg-card border border-border rounded-xl p-6 space-y-5"
      >
        <h2 className="font-semibold text-foreground capitalize">{tab} Page</h2>

        {"hero" in current && current.hero && (
          <div className="space-y-4 pb-4 border-b border-border">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Hero Section</p>
            {"eyebrow" in current.hero && (
              <div className="space-y-1.5">
                <Label>Eyebrow</Label>
                <Input value={current.hero.eyebrow ?? ""} onChange={(e) => updateHero(tab, "eyebrow", e.target.value)} />
              </div>
            )}
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={current.hero.title} onChange={(e) => updateHero(tab, "title", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Subtitle</Label>
              <Textarea value={current.hero.subtitle} onChange={(e) => updateHero(tab, "subtitle", e.target.value)} rows={2} />
            </div>
          </div>
        )}

        {tab === "contact" && (
          <>
            <div className="space-y-1.5">
              <Label>Office Hours (Weekdays)</Label>
              <Input value={pages.contact.officeHours} onChange={(e) => updateField("contact", "officeHours", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Sunday Hours</Label>
              <Input value={pages.contact.sundayHours} onChange={(e) => updateField("contact", "sundayHours", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Google Maps Embed URL</Label>
              <Input value={pages.contact.mapEmbedUrl} onChange={(e) => updateField("contact", "mapEmbedUrl", e.target.value)} placeholder="https://www.google.com/maps/embed?..." />
            </div>
          </>
        )}

        {tab === "about" && (
          <>
            <div className="space-y-1.5">
              <Label>Mission</Label>
              <Textarea value={pages.about.mission} onChange={(e) => updateField("about", "mission", e.target.value)} rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label>Vision</Label>
              <Textarea value={pages.about.vision} onChange={(e) => updateField("about", "vision", e.target.value)} rows={3} />
            </div>
            <ArrayEditor
              label="Milestones"
              items={pages.about.milestones}
              onChange={(items) => updateField("about", "milestones", items)}
              emptyItem={{ year: "", title: "", description: "" }}
              fields={[
                { key: "year", label: "Year", placeholder: "2010" },
                { key: "title", label: "Title", placeholder: "Academy founded" },
                { key: "description", label: "Description", type: "textarea" },
              ]}
              itemLabel={(item, i) => String(item.title || item.year || `Milestone ${i + 1}`)}
            />
            <ArrayEditor
              label="Values"
              items={pages.about.values}
              onChange={(items) => updateField("about", "values", items)}
              emptyItem={{ title: "", description: "" }}
              fields={[
                { key: "title", label: "Title" },
                { key: "description", label: "Description", type: "textarea" },
              ]}
              itemLabel={(item, i) => String(item.title || `Value ${i + 1}`)}
            />
          </>
        )}

        {(tab === "courses" || tab === "results" || tab === "about") && "stats" in current && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Stats</p>
            {current.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <Input value={s.value} onChange={(e) => updateStat(tab as "courses" | "results" | "about", i, "value", e.target.value)} placeholder="Value" />
                <Input value={s.label} onChange={(e) => updateStat(tab as "courses" | "results" | "about", i, "label", e.target.value)} placeholder="Label" />
              </div>
            ))}
          </div>
        )}

        {tab === "results" && (
          <>
            <ArrayEditor
              label="Exam Breakdown"
              items={pages.results.examBreakdown}
              onChange={(items) => updateField("results", "examBreakdown", items)}
              emptyItem={{ exam: "", count: "" }}
              fields={[
                { key: "exam", label: "Exam", placeholder: "NDA" },
                { key: "count", label: "Count", placeholder: "1200+" },
              ]}
              itemLabel={(item, i) => String(item.exam || `Exam ${i + 1}`)}
            />
            <div className="space-y-1.5">
              <Label>Awards (one per line)</Label>
              <Textarea
                value={pages.results.awards.join("\n")}
                onChange={(e) => updateField("results", "awards", e.target.value.split("\n").filter(Boolean))}
                rows={4}
              />
            </div>
          </>
        )}

        {tab === "admissions" && (
          <>
            <ArrayEditor
              label="Admission Steps"
              items={pages.admissions.steps}
              onChange={(items) => updateField("admissions", "steps", items)}
              emptyItem={{ title: "", description: "" }}
              fields={[
                { key: "title", label: "Title" },
                { key: "description", label: "Description", type: "textarea" },
              ]}
              itemLabel={(item, i) => String(item.title || `Step ${i + 1}`)}
            />
            <div className="space-y-1.5">
              <Label>Required Documents (one per line)</Label>
              <Textarea
                value={pages.admissions.documents.join("\n")}
                onChange={(e) => updateField("admissions", "documents", e.target.value.split("\n").filter(Boolean))}
                rows={5}
              />
            </div>
            <ArrayEditor
              label="Scholarships"
              items={pages.admissions.scholarships}
              onChange={(items) => updateField("admissions", "scholarships", items)}
              emptyItem={{ title: "", description: "" }}
              fields={[
                { key: "title", label: "Title" },
                { key: "description", label: "Description", type: "textarea" },
              ]}
              itemLabel={(item, i) => String(item.title || `Scholarship ${i + 1}`)}
            />
            <ArrayEditor
              label="Fee Structure"
              items={pages.admissions.fees}
              onChange={(items) => updateField("admissions", "fees", items)}
              emptyItem={{ course: "", amount: "", note: "" }}
              fields={[
                { key: "course", label: "Course" },
                { key: "amount", label: "Amount", placeholder: "₹85,000" },
                { key: "note", label: "Note", placeholder: "Includes study material" },
              ]}
              itemLabel={(item, i) => String(item.course || `Fee ${i + 1}`)}
            />
          </>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" disabled={saving} className="gap-2">
            <Upload className="h-4 w-4" />
            {saving ? "Saving..." : "Publish"}
          </Button>
          <Button type="button" variant="outline" disabled={saving} onClick={() => save("draft")} className="gap-2">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button type="button" variant="secondary" onClick={previewDraft} className="gap-2">
            <Eye className="h-4 w-4" />
            Preview Draft
          </Button>
        </div>
      </form>
    </div>
  )
}
