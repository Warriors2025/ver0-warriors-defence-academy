"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddCustomSchemaButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState("")
  const [title, setTitle] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleCreate() {
    const normalized = path.trim().startsWith("/") ? path.trim() : `/${path.trim()}`
    if (!normalized || normalized === "/") {
      setError("Enter a page path like /privacy or /terms")
      return
    }
    setSaving(true)
    setError("")
    try {
      const key = `custom:${normalized}`
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          seo: {
            pages: {
              [key]: {
                metaTitle: title.trim() || normalized,
                metaDescription: "",
                schemaType: "WebPage",
                schemaCustomJson: "",
                canonicalUrl: `https://warriorsdefenceacademy.com${normalized}`,
              },
            },
          },
        }),
      })
      if (!res.ok) throw new Error("Failed to create")
      router.push(`/admin/schema/edit?key=${encodeURIComponent(key)}`)
    } catch {
      setError("Could not create schema entry")
      setSaving(false)
    }
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} className="gap-1.5 shrink-0">
        <Plus className="h-4 w-4" /> Add Page Schema
      </Button>
    )
  }

  return (
    <div className="bg-card border border-primary/30 rounded-xl p-4 space-y-3 w-full max-w-sm shrink-0">
      <p className="text-sm font-semibold">Add schema for any page</p>
      <div className="space-y-1.5">
        <Label className="text-xs">Page path</Label>
        <Input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="/privacy"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Label (optional)</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Privacy Policy"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button size="sm" onClick={handleCreate} disabled={saving}>
          {saving ? "Creating…" : "Create"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
