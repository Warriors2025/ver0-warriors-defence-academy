"use client"

import { useState, useEffect } from "react"
import { Save, CheckCircle, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePicker } from "@/components/admin/image-picker"
import { ArrayEditor } from "@/components/admin/array-editor"
import type { SiteSections } from "@/lib/site-content"

export default function HomeSectionsEditorPage() {
  const [sections, setSections] = useState<Pick<SiteSections, "activities" | "books" | "videos"> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => {
        setSections({
          activities: json.sections.activities,
          books: json.sections.books,
          videos: json.sections.videos,
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!sections) return
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save. Check Supabase service role key.")
    } finally {
      setSaving(false)
    }
  }

  if (loading || !sections) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" /> Homepage Sections
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit Activities, Books, and Video Gallery. Drag to reorder; add or remove items freely.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}
      {error && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>}

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Outdoor Activities</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-1.5"><Label>Eyebrow</Label><Input value={sections.activities.eyebrow} onChange={(e) => setSections({ ...sections, activities: { ...sections.activities, eyebrow: e.target.value } })} /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Title</Label><Input value={sections.activities.title} onChange={(e) => setSections({ ...sections, activities: { ...sections.activities, title: e.target.value } })} /></div>
          </div>
          <div className="space-y-1.5"><Label>Subtitle</Label><Textarea value={sections.activities.subtitle} onChange={(e) => setSections({ ...sections, activities: { ...sections.activities, subtitle: e.target.value } })} rows={2} /></div>
          <ArrayEditor
            label="Activity Items"
            items={sections.activities.items}
            onChange={(items) => setSections({ ...sections, activities: { ...sections.activities, items } })}
            emptyItem={{ image: "", title: "", tag: "" }}
            fields={[
              { key: "image", label: "Image", type: "image", imagePreset: "feature" },
              { key: "title", label: "Title" },
              { key: "tag", label: "Tag" },
            ]}
            itemLabel={(item, i) => String(item.title || `Activity ${i + 1}`)}
          />
        </section>

        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Books Section</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Eyebrow</Label><Input value={sections.books.eyebrow} onChange={(e) => setSections({ ...sections, books: { ...sections.books, eyebrow: e.target.value } })} /></div>
            <div className="space-y-1.5"><Label>Footer Note (optional)</Label><Input value={sections.books.promoCode} onChange={(e) => setSections({ ...sections, books: { ...sections.books, promoCode: e.target.value } })} placeholder="Leave blank for default message" /></div>
          </div>
          <div className="space-y-1.5"><Label>Title</Label><Input value={sections.books.title} onChange={(e) => setSections({ ...sections, books: { ...sections.books, title: e.target.value } })} /></div>
          <div className="space-y-1.5"><Label>Subtitle</Label><Textarea value={sections.books.subtitle} onChange={(e) => setSections({ ...sections, books: { ...sections.books, subtitle: e.target.value } })} rows={2} /></div>
          <ArrayEditor
            label="Books"
            items={sections.books.items}
            onChange={(items) => setSections({
              ...sections,
              books: {
                ...sections.books,
                items: items.map((b) => ({
                  title: String(b.title ?? ""),
                  subtitle: String(b.subtitle ?? ""),
                  price: String(b.price ?? ""),
                  originalPrice: String(b.originalPrice ?? ""),
                  rating: Number(b.rating ?? 5),
                  image: String(b.image ?? ""),
                  badge: b.badge ? String(b.badge) : null,
                })),
              },
            })}
            emptyItem={{ title: "", subtitle: "", price: "", originalPrice: "", rating: 5, image: "", badge: "" }}
            fields={[
              { key: "image", label: "Cover", type: "image", imagePreset: "book" },
              { key: "title", label: "Title" },
              { key: "subtitle", label: "Subtitle" },
              { key: "rating", label: "Rating", type: "number" },
              { key: "badge", label: "Badge (optional)" },
            ]}
            itemLabel={(item, i) => String(item.title || `Book ${i + 1}`)}
          />
        </section>

        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Video Gallery</h2>
          <div className="space-y-1.5"><Label>Eyebrow</Label><Input value={sections.videos.eyebrow} onChange={(e) => setSections({ ...sections, videos: { ...sections.videos, eyebrow: e.target.value } })} /></div>
          <div className="space-y-1.5"><Label>Title</Label><Input value={sections.videos.title} onChange={(e) => setSections({ ...sections, videos: { ...sections.videos, title: e.target.value } })} /></div>
          <div className="space-y-1.5"><Label>Subtitle</Label><Textarea value={sections.videos.subtitle} onChange={(e) => setSections({ ...sections, videos: { ...sections.videos, subtitle: e.target.value } })} rows={2} /></div>
          <ArrayEditor
            label="Videos"
            items={sections.videos.items}
            onChange={(items) => setSections({ ...sections, videos: { ...sections.videos, items } })}
            emptyItem={{ title: "", thumbnail: "", videoId: "" }}
            fields={[
              { key: "title", label: "Title" },
              { key: "thumbnail", label: "Thumbnail", type: "image", imagePreset: "thumbnail" },
              { key: "videoId", label: "YouTube Video ID", placeholder: "dQw4w9WgXcQ" },
            ]}
            itemLabel={(item, i) => String(item.title || `Video ${i + 1}`)}
          />
        </section>

        <Button type="submit" disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />{saving ? "Saving..." : "Save All Sections"}
        </Button>
      </form>
    </div>
  )
}
