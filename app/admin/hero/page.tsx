"use client"

import { useState, useEffect } from "react"
import { Image as ImageIcon, Save, CheckCircle, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type HeroData = {
  badge: string
  headline: string
  highlightText: string
  tagline: string
  features: string[]
  stats: { value: string; label: string }[]
}

export default function HeroEditorPage() {
  const [data, setData] = useState<HeroData>({
    badge: "",
    headline: "",
    highlightText: "",
    tagline: "",
    features: [],
    stats: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => { setData(json.hero); setLoading(false) })
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
        body: JSON.stringify({ hero: data }),
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

  function updateFeature(i: number, val: string) {
    const f = [...data.features]; f[i] = val; setData({ ...data, features: f })
  }
  function addFeature() { setData({ ...data, features: [...data.features, ""] }) }
  function removeFeature(i: number) {
    setData({ ...data, features: data.features.filter((_, idx) => idx !== i) })
  }

  function updateStat(i: number, field: "value" | "label", val: string) {
    const s = [...data.stats]; s[i] = { ...s[i], [field]: val }; setData({ ...data, stats: s })
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
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <ImageIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground text-sm">The main banner on your homepage.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Basic text */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground text-sm uppercase tracking-wide text-muted-foreground">Text Content</h2>

          <div className="space-y-2">
            <Label htmlFor="badge">Badge Label (small text above headline)</Label>
            <Input
              id="badge"
              value={data.badge}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              placeholder="India's Premier Defence Academy"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="headline">Main Headline</Label>
              <Input
                id="headline"
                value={data.headline}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                placeholder="Shape India's Future"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highlight">Gold Highlight Word</Label>
              <Input
                id="highlight"
                value={data.highlightText}
                onChange={(e) => setData({ ...data, highlightText: e.target.value })}
                placeholder="Defence Officer"
              />
              <p className="text-[10px] text-muted-foreground">This word appears in gold/gradient on the homepage</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline / Description</Label>
            <Textarea
              id="tagline"
              value={data.tagline}
              onChange={(e) => setData({ ...data, tagline: e.target.value })}
              placeholder="Join the ranks of India's finest military officers..."
              rows={3}
            />
          </div>
        </div>

        {/* Feature bullets */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground text-sm uppercase tracking-wide text-muted-foreground">Feature Bullets</h2>
            <Button type="button" variant="outline" size="sm" onClick={addFeature} className="h-8 gap-1.5 text-xs">
              <Plus className="h-3 w-3" /> Add
            </Button>
          </div>
          <div className="space-y-2">
            {data.features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={f}
                  onChange={(e) => updateFeature(i, e.target.value)}
                  placeholder={`Feature ${i + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFeature(i)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-sm uppercase tracking-wide text-muted-foreground">Stats Strip (4 numbers)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.stats.map((s, i) => (
              <div key={i} className="border border-border rounded-lg p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Stat {i + 1}</p>
                <Input
                  value={s.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                  placeholder="50,000+"
                />
                <Input
                  value={s.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                  placeholder="Students Trained"
                />
              </div>
            ))}
          </div>
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
