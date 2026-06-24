"use client"

import { useState, useEffect } from "react"
import { Megaphone, Save, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AnnouncementData = { text: string; phone: string }

export default function GeneralSettingsPage() {
  const [data, setData] = useState<AnnouncementData>({ text: "", phone: "" })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => { setData(json.announcement); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ announcement: data }),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Megaphone className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Announcement Bar</h1>
          <p className="text-muted-foreground text-sm">Shown at the top of every page on the website.</p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-primary rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
        <span className="flex items-center gap-1.5 font-medium text-primary-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {data.text || "Your announcement text here"}
        </span>
        <span className="text-accent font-medium">{data.phone || "+91 XXXXX XXXXX"}</span>
      </div>
      <p className="text-xs text-muted-foreground -mt-2">Live preview of the announcement bar</p>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="ann-text" className="font-medium">Announcement Text</Label>
          <Input
            id="ann-text"
            value={data.text}
            onChange={(e) => setData({ ...data, text: e.target.value })}
            placeholder="Admissions Open for 2026–27 Batch"
            maxLength={120}
          />
          <p className="text-xs text-muted-foreground">{data.text.length}/120 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ann-phone" className="font-medium">Phone Number (displayed next to text)</Label>
          <Input
            id="ann-phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            placeholder="+91 94522 45729"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button type="submit" disabled={saving} className="gap-2">
          {saved ? (
            <><CheckCircle className="h-4 w-4" /> Saved!</>
          ) : (
            <><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}</>
          )}
        </Button>
      </form>
    </div>
  )
}
