"use client"

import { useState, useEffect } from "react"
import { Phone, Save, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type ContactData = {
  phone1: string
  phone2: string
  email: string
  address: string
  facebook: string
  instagram: string
  youtube: string
}

export default function ContactEditorPage() {
  const [data, setData] = useState<ContactData>({
    phone1: "", phone2: "", email: "", address: "",
    facebook: "", instagram: "", youtube: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => { setData(json.contact); setLoading(false) })
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
        body: JSON.stringify({ contact: data }),
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

  function set(field: keyof ContactData, val: string) {
    setData((d) => ({ ...d, [field]: val }))
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
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Phone className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Contact Information</h1>
          <p className="text-muted-foreground text-sm">Used in footer, contact page, CTA section, and course pages.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Phones & Email */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Phone & Email</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone1">Primary Phone</Label>
              <Input id="phone1" value={data.phone1} onChange={(e) => set("phone1", e.target.value)} placeholder="+91 94522 45729" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone2">Secondary Phone</Label>
              <Input id="phone2" value={data.phone2} onChange={(e) => set("phone2", e.target.value)} placeholder="+91 70810 11964" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="info@warriorsdefenceacademy.com" />
          </div>
        </div>

        {/* Address */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Address</h2>
          <Textarea
            value={data.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="545-Ga/1 Chha, Near Kapoorthala Chauraha..."
            rows={3}
          />
        </div>

        {/* Social links */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Social Media Links</h2>

          <div className="space-y-2">
            <Label htmlFor="fb">Facebook URL</Label>
            <Input id="fb" value={data.facebook} onChange={(e) => set("facebook", e.target.value)} placeholder="https://facebook.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ig">Instagram URL</Label>
            <Input id="ig" value={data.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://instagram.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yt">YouTube URL</Label>
            <Input id="yt" value={data.youtube} onChange={(e) => set("youtube", e.target.value)} placeholder="https://youtube.com/..." />
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
