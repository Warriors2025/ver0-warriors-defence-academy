"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Save, CheckCircle, Plus, Trash2, Building2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePicker } from "@/components/admin/image-picker"
import {
  FACILITIES,
  DEFAULT_FACILITY_PHOTOS,
  type FacilityPhoto,
} from "@/lib/facilities-data"

export default function AdminFacilitiesPhotosPage() {
  const [photosBySlug, setPhotosBySlug] = useState<Record<string, FacilityPhoto[]>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => {
        const cms = json.sections?.facilityPhotos as Record<string, FacilityPhoto[]> | undefined
        const merged: Record<string, FacilityPhoto[]> = {}
        for (const f of FACILITIES) {
          merged[f.slug] = cms?.[f.slug]?.length
            ? cms[f.slug]
            : DEFAULT_FACILITY_PHOTOS[f.slug] ?? []
        }
        setPhotosBySlug(merged)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function updatePhoto(slug: string, index: number, field: keyof FacilityPhoto, value: string) {
    setPhotosBySlug((prev) => {
      const items = [...(prev[slug] ?? [])]
      items[index] = { ...items[index], [field]: value }
      return { ...prev, [slug]: items }
    })
  }

  function addPhoto(slug: string) {
    setPhotosBySlug((prev) => ({
      ...prev,
      [slug]: [...(prev[slug] ?? []), { src: "", alt: "" }],
    }))
  }

  function removePhoto(slug: string, index: number) {
    setPhotosBySlug((prev) => ({
      ...prev,
      [slug]: (prev[slug] ?? []).filter((_, i) => i !== index),
    }))
  }

  function resetToDefaults(slug: string) {
    setPhotosBySlug((prev) => ({
      ...prev,
      [slug]: DEFAULT_FACILITY_PHOTOS[slug] ?? [],
    }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: { facilityPhotos: photosBySlug } }),
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

  if (loading) {
    return <p className="text-muted-foreground text-sm">Loading facility photos...</p>
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          Facility Photos
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Upload and manage photo galleries shown on each facility page at{" "}
          <code className="text-xs bg-muted px-1 rounded">/facilities/[slug]</code>.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {FACILITIES.map((facility) => (
          <section key={facility.slug} className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-foreground">{facility.title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">/facilities/{facility.slug}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/facilities/${facility.slug}`} target="_blank">
                  <Button type="button" variant="outline" size="sm" className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" /> Preview
                  </Button>
                </Link>
                <Button type="button" variant="outline" size="sm" onClick={() => resetToDefaults(facility.slug)}>
                  Reset defaults
                </Button>
                <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => addPhoto(facility.slug)}>
                  <Plus className="h-3.5 w-3.5" /> Add photo
                </Button>
              </div>
            </div>

            {(photosBySlug[facility.slug] ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center border border-dashed border-border rounded-lg">
                No photos yet. Click &quot;Add photo&quot; to upload images for this facility.
              </p>
            ) : (
              <div className="space-y-4">
                {(photosBySlug[facility.slug] ?? []).map((photo, i) => (
                  <div key={i} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">Photo {i + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removePhoto(facility.slug, i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <ImagePicker
                      uploadPreset="gallery"
                      value={photo.src}
                      onChange={(src) => updatePhoto(facility.slug, i, "src", src)}
                      label="Image"
                    />
                    <div className="space-y-1.5">
                      <Label>Caption / alt text</Label>
                      <Input
                        value={photo.alt}
                        onChange={(e) => updatePhoto(facility.slug, i, "alt", e.target.value)}
                        placeholder="Describe this photo for accessibility"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        <Button type="submit" disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save All Facility Photos"}
        </Button>
      </form>
    </div>
  )
}
