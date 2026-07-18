"use client"

import { useState, useEffect } from "react"
import { Save, CheckCircle, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrayEditor } from "@/components/admin/array-editor"
import {
  DEFAULT_NAVIGATION,
  NAV_ICON_OPTIONS,
  type NavigationContent,
} from "@/lib/navigation"

export default function AdminNavigationPage() {
  const [nav, setNav] = useState<NavigationContent>(DEFAULT_NAVIGATION)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((json) => {
        if (json.navigation) setNav(json.navigation)
        setLoading(false)
      })
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
        body: JSON.stringify({ navigation: nav }),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save navigation.")
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
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Menu className="h-6 w-6 text-primary" /> Navigation & Footer
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit header links, course mega-menu, and footer links without touching code.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}
      {error && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>}

      <form onSubmit={handleSave} className="space-y-6">
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Header Nav Links</h2>
          <ArrayEditor
            label="Links"
            items={nav.navLinks}
            onChange={(items) => setNav({ ...nav, navLinks: items.map((i) => ({ title: String(i.title ?? ""), href: String(i.href ?? "") })) })}
            emptyItem={{ title: "", href: "/" }}
            fields={[
              { key: "title", label: "Label" },
              { key: "href", label: "URL", placeholder: "/about" },
            ]}
            itemLabel={(item, i) => String(item.title || `Link ${i + 1}`)}
          />
        </section>

        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Courses Mega Menu</h2>
          <ArrayEditor
            label="Courses"
            items={nav.courses}
            onChange={(items) =>
              setNav({
                ...nav,
                courses: items.map((i) => ({
                  title: String(i.title ?? ""),
                  href: String(i.href ?? ""),
                  description: String(i.description ?? ""),
                  icon: String(i.icon ?? "BookOpen"),
                  badge: i.badge ? String(i.badge) : null,
                })),
              })
            }
            emptyItem={{ title: "", href: "/courses/", description: "", icon: "BookOpen", badge: "" }}
            fields={[
              { key: "title", label: "Title" },
              { key: "href", label: "URL", placeholder: "/courses/nda" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "icon", label: `Icon (${NAV_ICON_OPTIONS.join(", ")})`, placeholder: "Sword" },
              { key: "badge", label: "Badge (optional)", placeholder: "Popular" },
            ]}
            itemLabel={(item, i) => String(item.title || `Course ${i + 1}`)}
          />
        </section>

        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Footer</h2>
          <div className="space-y-1.5">
            <Label>About blurb</Label>
            <Textarea
              value={nav.footerAbout}
              onChange={(e) => setNav({ ...nav, footerAbout: e.target.value })}
              rows={3}
            />
          </div>
          <ArrayEditor
            label="Quick Links"
            items={nav.footerQuickLinks}
            onChange={(items) => setNav({ ...nav, footerQuickLinks: items.map((i) => ({ title: String(i.title ?? ""), href: String(i.href ?? "") })) })}
            emptyItem={{ title: "", href: "/" }}
            fields={[
              { key: "title", label: "Label" },
              { key: "href", label: "URL" },
            ]}
            itemLabel={(item, i) => String(item.title || `Link ${i + 1}`)}
          />
          <ArrayEditor
            label="Footer Courses"
            items={nav.footerCourses}
            onChange={(items) => setNav({ ...nav, footerCourses: items.map((i) => ({ title: String(i.title ?? ""), href: String(i.href ?? "") })) })}
            emptyItem={{ title: "", href: "/courses/" }}
            fields={[
              { key: "title", label: "Label" },
              { key: "href", label: "URL" },
            ]}
            itemLabel={(item, i) => String(item.title || `Course ${i + 1}`)}
          />
        </section>

        <Button type="submit" disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Navigation"}
        </Button>
      </form>
    </div>
  )
}
