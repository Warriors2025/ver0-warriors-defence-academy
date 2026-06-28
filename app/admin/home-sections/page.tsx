"use client"

import { useState, useEffect } from "react"
import { Save, CheckCircle, Plus, Trash2, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePicker } from "@/components/admin/image-picker"
import type { SiteSections, ActivityItem, BookItem, VideoItem } from "@/lib/site-content"

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

  function updateActivity(i: number, field: keyof ActivityItem, val: string) {
    const items = [...sections!.activities.items]
    items[i] = { ...items[i], [field]: val }
    setSections({ ...sections!, activities: { ...sections!.activities, items } })
  }

  function updateBook(i: number, field: keyof BookItem, val: string | number | null) {
    const items = [...sections!.books.items]
    items[i] = { ...items[i], [field]: val }
    setSections({ ...sections!, books: { ...sections!.books, items } })
  }

  function updateVideo(i: number, field: keyof VideoItem, val: string) {
    const items = [...sections!.videos.items]
    items[i] = { ...items[i], [field]: val }
    setSections({ ...sections!, videos: { ...sections!.videos, items } })
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" /> Homepage Sections
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Edit Activities, Books, and Video Gallery on the homepage.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}
      {error && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Activities */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Outdoor Activities</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-1.5"><Label>Eyebrow</Label><Input value={sections.activities.eyebrow} onChange={(e) => setSections({ ...sections, activities: { ...sections.activities, eyebrow: e.target.value } })} /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Title</Label><Input value={sections.activities.title} onChange={(e) => setSections({ ...sections, activities: { ...sections.activities, title: e.target.value } })} /></div>
          </div>
          <div className="space-y-1.5"><Label>Subtitle</Label><Textarea value={sections.activities.subtitle} onChange={(e) => setSections({ ...sections, activities: { ...sections.activities, subtitle: e.target.value } })} rows={2} /></div>
          {sections.activities.items.map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex justify-between"><span className="text-xs font-semibold text-muted-foreground">Activity {i + 1}</span></div>
              <ImagePicker uploadPreset="feature" value={item.image} onChange={(v) => updateActivity(i, "image", v)} label="Image" />
              <Input value={item.title} onChange={(e) => updateActivity(i, "title", e.target.value)} placeholder="Title" />
              <Input value={item.tag} onChange={(e) => updateActivity(i, "tag", e.target.value)} placeholder="Tag" />
            </div>
          ))}
        </section>

        {/* Books */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Books Section</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Eyebrow</Label><Input value={sections.books.eyebrow} onChange={(e) => setSections({ ...sections, books: { ...sections.books, eyebrow: e.target.value } })} /></div>
            <div className="space-y-1.5"><Label>Footer Note (optional)</Label><Input value={sections.books.promoCode} onChange={(e) => setSections({ ...sections, books: { ...sections.books, promoCode: e.target.value } })} placeholder="Leave blank for default student-provided message" /></div>
          </div>
          <div className="space-y-1.5"><Label>Title</Label><Input value={sections.books.title} onChange={(e) => setSections({ ...sections, books: { ...sections.books, title: e.target.value } })} /></div>
          <div className="space-y-1.5"><Label>Subtitle</Label><Textarea value={sections.books.subtitle} onChange={(e) => setSections({ ...sections, books: { ...sections.books, subtitle: e.target.value } })} rows={2} /></div>
          {sections.books.items.map((book, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-3">
              <span className="text-xs font-semibold text-muted-foreground">Book {i + 1}</span>
              <ImagePicker uploadPreset="book" value={book.image} onChange={(v) => updateBook(i, "image", v)} label="Cover" />
              <Input value={book.title} onChange={(e) => updateBook(i, "title", e.target.value)} placeholder="Title" />
              <Input value={book.subtitle} onChange={(e) => updateBook(i, "subtitle", e.target.value)} placeholder="Subtitle" />
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" step="0.1" min="0" max="5" value={book.rating} onChange={(e) => updateBook(i, "rating", Number(e.target.value))} placeholder="Rating" />
                <Input value={book.badge ?? ""} onChange={(e) => updateBook(i, "badge", e.target.value || null)} placeholder="Badge (optional)" />
              </div>
            </div>
          ))}
        </section>

        {/* Videos */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Video Gallery</h2>
          <div className="space-y-1.5"><Label>Eyebrow</Label><Input value={sections.videos.eyebrow} onChange={(e) => setSections({ ...sections, videos: { ...sections.videos, eyebrow: e.target.value } })} /></div>
          <div className="space-y-1.5"><Label>Title</Label><Input value={sections.videos.title} onChange={(e) => setSections({ ...sections, videos: { ...sections.videos, title: e.target.value } })} /></div>
          <div className="space-y-1.5"><Label>Subtitle</Label><Textarea value={sections.videos.subtitle} onChange={(e) => setSections({ ...sections, videos: { ...sections.videos, subtitle: e.target.value } })} rows={2} /></div>
          {sections.videos.items.map((video, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-3">
              <span className="text-xs font-semibold text-muted-foreground">Video {i + 1}</span>
              <Input value={video.title} onChange={(e) => updateVideo(i, "title", e.target.value)} placeholder="Title" />
              <ImagePicker uploadPreset="thumbnail" value={video.thumbnail} onChange={(v) => updateVideo(i, "thumbnail", v)} label="Thumbnail" />
              <Input value={video.videoId} onChange={(e) => updateVideo(i, "videoId", e.target.value)} placeholder="YouTube Video ID" />
            </div>
          ))}
        </section>

        <Button type="submit" disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />{saving ? "Saving..." : "Save All Sections"}
        </Button>
      </form>
    </div>
  )
}
