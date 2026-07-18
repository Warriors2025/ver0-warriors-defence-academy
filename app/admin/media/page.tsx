"use client"

import { useState, useEffect } from "react"
import { Upload, ImageIcon, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IMAGE_PRESETS } from "@/lib/image-presets"

type UploadMeta = {
  width: number
  height: number
  sizeLabel: string
  savedPercent: number
  format: string
}

export default function AdminMediaPage() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [uploadNote, setUploadNote] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState("")

  function load() {
    setLoading(true)
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then((json) => { setImages(json.images ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError("")
    setUploadNote(null)
    const form = new FormData()
    form.append("file", file)
    form.append("preset", "general")
    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Upload failed")
      const meta = json.meta as UploadMeta | undefined
      if (meta) {
        setUploadNote(
          meta.format === "svg"
            ? "SVG saved as-is (vector files are not converted)."
            : `Saved as WebP ${meta.width}×${meta.height} (${meta.sizeLabel}, ${meta.savedPercent}% smaller).`
        )
      }
      load()
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Uploads go to Supabase Storage, compressed as WebP ({IMAGE_PRESETS.general.label}).
          </p>
        </div>
        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <Button asChild disabled={uploading}>
            <span className="gap-1.5">
              <Upload className="h-4 w-4" />
              {uploading ? "Optimizing..." : "Upload Image"}
            </span>
          </Button>
        </label>
      </div>

      {uploadNote && (
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4 shrink-0" /> {uploadNote}
        </div>
      )}
      {uploadError && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{uploadError}</p>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img) => (
            <div key={img} className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <p className="text-white text-[10px] text-center truncate w-full">{img}</p>
                <Button size="sm" variant="secondary" className="h-7 text-xs gap-1" onClick={() => copyUrl(img)}>
                  {copied === img ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied === img ? "Copied!" : "Copy URL"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No images found. Upload your first image above.</p>
        </div>
      )}
    </div>
  )
}
