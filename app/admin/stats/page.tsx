"use client"

import { useState, useEffect } from "react"
import { BarChart3, Save, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type StatItem = { value: string; label: string; description: string }

export default function StatsEditorPage() {
  const [stats, setStats] = useState<StatItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => { setStats(json.stats); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function updateStat(i: number, field: keyof StatItem, val: string) {
    setStats((s) => { const copy = [...s]; copy[i] = { ...copy[i], [field]: val }; return copy })
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats }),
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
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <BarChart3 className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Stats Section</h1>
          <p className="text-muted-foreground text-sm">The achievement numbers shown in the dark stats band on the homepage.</p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-primary rounded-xl px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-2xl font-bold text-accent">{s.value || "—"}</p>
            <p className="text-xs text-primary-foreground/60 mt-0.5">{s.label || "Label"}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground -mt-2">Live preview</p>

      <form onSubmit={handleSave} className="space-y-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Stat {i + 1}</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Value</Label>
                <Input value={s.value} onChange={(e) => updateStat(i, "value", e.target.value)} placeholder="50,000+" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Label</Label>
                <Input value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Students Trained" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Description (subtitle)</Label>
                <Input value={s.description} onChange={(e) => updateStat(i, "description", e.target.value)} placeholder="From across India" />
              </div>
            </div>
          </div>
        ))}

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
