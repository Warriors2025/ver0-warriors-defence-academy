"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageIcon, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"

import type { ImageSeo } from "@/lib/seo"
import type { ImagePreset } from "@/lib/image-presets"

type ImagePickerProps = {
  value: string
  onChange: (url: string) => void
  label?: string
  seo?: ImageSeo
  onSeoChange?: (seo: ImageSeo) => void
  showSeo?: boolean
  uploadPreset?: ImagePreset
  onUploadComplete?: (meta: { width: number; height: number; sizeLabel: string; savedPercent: number }) => void
}

export function ImagePicker({
  value,
  onChange,
  label = "Image",
  seo,
  onSeoChange,
  showSeo,
  uploadPreset = "general",
  onUploadComplete,
}: ImagePickerProps) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  async function loadMedia() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/media")
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Failed to load media")
      setImages(json.images ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load media")
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("file", file)
      form.append("preset", uploadPreset)
      const res = await fetch("/api/admin/media", { method: "POST", body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Upload failed")
      if (json.url) {
        onChange(json.url)
        if (json.meta && onUploadComplete) {
          onUploadComplete(json.meta)
        }
        setImages((prev) => [json.url, ...prev.filter((img) => img !== json.url)])
        setOpen(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-3 items-start">
        <div className="relative w-24 h-24 rounded-lg border border-border overflow-hidden bg-muted shrink-0">
          {value ? (
            <Image src={value} alt="" fill className="object-cover" sizes="96px" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/hero/carousel-1.webp"
          />
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) loadMedia() }}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="gap-1.5">
                <ImageIcon className="h-3.5 w-3.5" /> Choose Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Media Library</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2 mb-4">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                    <Upload className="h-3.5 w-3.5" />
                    {uploading ? "Uploading..." : "Upload New"}
                  </span>
                </label>
              </div>
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 mb-4">
                  {error}
                </p>
              )}
              {loading ? (
                <p className="text-sm text-muted-foreground text-center py-8">Loading images...</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {images.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => { onChange(img); setOpen(false) }}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${value === img ? "border-primary" : "border-transparent hover:border-primary/50"}`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="120px" />
                    </button>
                  ))}
                </div>
              )}
            </DialogContent>
          </Dialog>
          {value && (
            <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground" onClick={() => onChange("")}>
              <X className="h-3 w-3" /> Remove
            </Button>
          )}
        </div>
      </div>
      {showSeo && onSeoChange && (
        <div className="grid sm:grid-cols-2 gap-2 pt-2 border-t border-border">
          <div className="space-y-1">
            <Label className="text-xs">Alt Text</Label>
            <Input value={seo?.alt ?? ""} onChange={(e) => onSeoChange({ alt: e.target.value, title: seo?.title ?? "", description: seo?.description ?? "", caption: seo?.caption ?? "" })} placeholder="Describe image for SEO & accessibility" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Image Title</Label>
            <Input value={seo?.title ?? ""} onChange={(e) => onSeoChange({ alt: seo?.alt ?? "", title: e.target.value, description: seo?.description ?? "", caption: seo?.caption ?? "" })} placeholder="Title attribute" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label className="text-xs">Description</Label>
            <Input value={seo?.description ?? ""} onChange={(e) => onSeoChange({ alt: seo?.alt ?? "", title: seo?.title ?? "", description: e.target.value, caption: seo?.caption ?? "" })} placeholder="Longer SEO description" />
          </div>
        </div>
      )}
    </div>
  )
}
