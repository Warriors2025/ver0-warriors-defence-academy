"use client"

import { useState, useEffect } from "react"
import { Save, CheckCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { SitePages } from "@/lib/site-content"

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
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => { setPages(json.pages); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!pages) return
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages }),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save. Check Supabase service role key in .env.local")
    } finally {
      setSaving(false)
    }
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
          Edit hero text, stats, and page content for About, Contact, Courses, Results, Admissions, and Register.
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
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}
      {error && <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>}

      <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 space-y-5">
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
            <div className="space-y-1.5">
              <Label>Milestones (JSON array)</Label>
              <Textarea
                value={JSON.stringify(pages.about.milestones, null, 2)}
                onChange={(e) => { try { updateField("about", "milestones", JSON.parse(e.target.value)) } catch { /* ignore */ } }}
                rows={6}
                className="font-mono text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Values (JSON array)</Label>
              <Textarea
                value={JSON.stringify(pages.about.values, null, 2)}
                onChange={(e) => { try { updateField("about", "values", JSON.parse(e.target.value)) } catch { /* ignore */ } }}
                rows={5}
                className="font-mono text-xs"
              />
            </div>
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
            <div className="space-y-1.5">
              <Label>Exam Breakdown (JSON)</Label>
              <Textarea
                value={JSON.stringify(pages.results.examBreakdown, null, 2)}
                onChange={(e) => { try { updateField("results", "examBreakdown", JSON.parse(e.target.value)) } catch { /* ignore */ } }}
                rows={5}
                className="font-mono text-xs"
              />
            </div>
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
            <div className="space-y-1.5">
              <Label>Admission Steps (JSON)</Label>
              <Textarea
                value={JSON.stringify(pages.admissions.steps, null, 2)}
                onChange={(e) => { try { updateField("admissions", "steps", JSON.parse(e.target.value)) } catch { /* ignore */ } }}
                rows={6}
                className="font-mono text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Required Documents (one per line)</Label>
              <Textarea
                value={pages.admissions.documents.join("\n")}
                onChange={(e) => updateField("admissions", "documents", e.target.value.split("\n").filter(Boolean))}
                rows={5}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Scholarships (JSON)</Label>
              <Textarea
                value={JSON.stringify(pages.admissions.scholarships, null, 2)}
                onChange={(e) => { try { updateField("admissions", "scholarships", JSON.parse(e.target.value)) } catch { /* ignore */ } }}
                rows={5}
                className="font-mono text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Fee Structure (JSON)</Label>
              <Textarea
                value={JSON.stringify(pages.admissions.fees, null, 2)}
                onChange={(e) => { try { updateField("admissions", "fees", JSON.parse(e.target.value)) } catch { /* ignore */ } }}
                rows={5}
                className="font-mono text-xs"
              />
            </div>
          </>
        )}

        <Button type="submit" disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}
