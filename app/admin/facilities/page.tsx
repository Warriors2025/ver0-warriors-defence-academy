"use client"

import { useState, useEffect } from "react"
import { Save, CheckCircle, Building2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePicker } from "@/components/admin/image-picker"
import { ArrayEditor } from "@/components/admin/array-editor"
import { cn } from "@/lib/utils"
import type { Facility, FacilityPhoto } from "@/lib/facilities-data"
import { FACILITIES, DEFAULT_FACILITY_PHOTOS } from "@/lib/facilities-data"

export default function AdminFacilitiesPage() {
  const [items, setItems] = useState<Facility[]>([])
  const [photosBySlug, setPhotosBySlug] = useState<Record<string, FacilityPhoto[]>>({})
  const [activeSlug, setActiveSlug] = useState("")
  const [tab, setTab] = useState<"copy" | "photos">("copy")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => {
        const facilityItems: Facility[] = json.sections?.facilityItems?.length
          ? json.sections.facilityItems
          : FACILITIES
        setItems(facilityItems)
        setActiveSlug(facilityItems[0]?.slug ?? "")
        setPhotosBySlug(json.sections?.facilityPhotos ?? DEFAULT_FACILITY_PHOTOS)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const active = items.find((f) => f.slug === activeSlug) ?? items[0]

  async function handleSave() {
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sections: {
            facilityItems: items,
            facilityPhotos: photosBySlug,
          },
        }),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save facilities.")
    } finally {
      setSaving(false)
    }
  }

  function updateActive(patch: Partial<Facility>) {
    if (!active) return
    setItems(items.map((f) => (f.slug === active.slug ? { ...f, ...patch } : f)))
  }

  if (loading || !active) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const photos = photosBySlug[active.slug] ?? []

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" /> Facilities
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit facility page copy and photo galleries — no code changes needed.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}
      {error && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>}

      <div className="flex flex-wrap gap-2">
        {items.map((f) => (
          <button
            key={f.slug}
            type="button"
            onClick={() => setActiveSlug(f.slug)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              active.slug === f.slug ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {f.title}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button type="button" size="sm" variant={tab === "copy" ? "default" : "outline"} onClick={() => setTab("copy")}>
          Page Copy
        </Button>
        <Button type="button" size="sm" variant={tab === "photos" ? "default" : "outline"} onClick={() => setTab("photos")} className="gap-1">
          <ImageIcon className="h-3.5 w-3.5" /> Photos
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        {tab === "copy" ? (
          <>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={active.title} onChange={(e) => updateActive({ title: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>URL Slug</Label>
                <Input value={active.slug} disabled className="opacity-60" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Tagline</Label>
              <Input value={active.tagline} onChange={(e) => updateActive({ tagline: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea value={active.description} onChange={(e) => updateActive({ description: e.target.value })} rows={4} />
            </div>
            <ImagePicker
              value={active.image}
              onChange={(v) => updateActive({ image: v })}
              label="Hero Image"
              uploadPreset="feature"
            />
            <ArrayEditor
              label="Highlights"
              items={active.highlights.map((text) => ({ text }))}
              onChange={(rows) => updateActive({ highlights: rows.map((r) => String(r.text ?? "")) })}
              emptyItem={{ text: "" }}
              fields={[{ key: "text", label: "Highlight" }]}
              itemLabel={(_, i) => `Highlight ${i + 1}`}
            />
            <ArrayEditor
              label="Benefits"
              items={active.benefits.map((text) => ({ text }))}
              onChange={(rows) => updateActive({ benefits: rows.map((r) => String(r.text ?? "")) })}
              emptyItem={{ text: "" }}
              fields={[{ key: "text", label: "Benefit" }]}
              itemLabel={(_, i) => `Benefit ${i + 1}`}
            />
            <ArrayEditor
              label="Related Courses"
              items={active.relatedCourses}
              onChange={(rows) =>
                updateActive({
                  relatedCourses: rows.map((r) => ({
                    title: String(r.title ?? ""),
                    href: String(r.href ?? ""),
                  })),
                })
              }
              emptyItem={{ title: "", href: "/courses/" }}
              fields={[
                { key: "title", label: "Course Title" },
                { key: "href", label: "Link", placeholder: "/courses/nda" },
              ]}
              itemLabel={(item, i) => String(item.title || `Course ${i + 1}`)}
            />
          </>
        ) : (
          <ArrayEditor
            label={`${active.title} Photos`}
            items={photos}
            onChange={(rows) =>
              setPhotosBySlug({
                ...photosBySlug,
                [active.slug]: rows.map((r) => ({
                  src: String(r.src ?? ""),
                  alt: String(r.alt ?? ""),
                })),
              })
            }
            emptyItem={{ src: "", alt: "" }}
            fields={[
              { key: "src", label: "Photo", type: "image", imagePreset: "gallery" },
              { key: "alt", label: "Alt text" },
            ]}
            itemLabel={(item, i) => String(item.alt || `Photo ${i + 1}`)}
          />
        )}
      </div>

      <Button onClick={handleSave} disabled={saving} className="gap-2">
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : "Save Facilities"}
      </Button>
    </div>
  )
}
