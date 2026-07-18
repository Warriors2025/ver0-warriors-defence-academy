"use client"

import { useState, useEffect } from "react"
import {
  Tags, Save, CheckCircle, BarChart3, Search, Megaphone, Facebook, Code2, Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { emptyTrackingTags, type TrackingTags } from "@/lib/tracking"

export default function TagsAdminPage() {
  const [data, setData] = useState<TrackingTags>(emptyTrackingTags)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/admin/tracking")
      .then((r) => r.json())
      .then((json) => {
        setData({ ...emptyTrackingTags, ...json })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/admin/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Save failed")
      const json = await res.json()
      setData({ ...emptyTrackingTags, ...json })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  function set(field: keyof TrackingTags, val: string) {
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
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Tags className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Tracking Tags</h1>
          <p className="text-muted-foreground text-sm">
            Add GA4, Search Console, Google Ads, Meta Pixel, or custom scripts site-wide.
          </p>
        </div>
      </div>

      <div className="flex gap-2.5 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-foreground/60" />
        <p>
          Leave a field blank to disable that tag. If you use <strong className="font-medium text-foreground">Google Tag Manager</strong>,
          configure GA4 / Ads / Meta inside GTM instead of filling those IDs here (to avoid double-firing).
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* GA4 */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-orange-600" />
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Google Analytics 4
            </h2>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ga4Id">Measurement ID</Label>
            <Input
              id="ga4Id"
              value={data.ga4Id}
              onChange={(e) => set("ga4Id", e.target.value)}
              placeholder="G-XXXXXXXXXX"
              autoComplete="off"
              spellCheck={false}
            />
            <p className="text-xs text-muted-foreground">
              From Google Analytics → Admin → Data streams → Web.
            </p>
          </div>
        </div>

        {/* GTM */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-blue-600" />
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Google Tag Manager
            </h2>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gtmId">Container ID</Label>
            <Input
              id="gtmId"
              value={data.gtmId}
              onChange={(e) => set("gtmId", e.target.value)}
              placeholder="GTM-XXXXXXX"
              autoComplete="off"
              spellCheck={false}
            />
            <p className="text-xs text-muted-foreground">
              When set, GA4 and Google Ads IDs above are skipped — add those tags inside GTM.
            </p>
          </div>
        </div>

        {/* Search Console */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-emerald-600" />
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Google Search Console
            </h2>
          </div>
          <div className="space-y-2">
            <Label htmlFor="searchConsoleVerification">HTML tag verification code</Label>
            <Input
              id="searchConsoleVerification"
              value={data.searchConsoleVerification}
              onChange={(e) => set("searchConsoleVerification", e.target.value)}
              placeholder="abc123def456..."
              autoComplete="off"
              spellCheck={false}
            />
            <p className="text-xs text-muted-foreground">
              Paste only the <code className="text-[11px] bg-muted px-1 rounded">content</code> value from the meta tag
              Google gives you (not the full HTML).
            </p>
          </div>
        </div>

        {/* Google Ads */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-yellow-600" />
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Google Ads
            </h2>
          </div>
          <div className="space-y-2">
            <Label htmlFor="googleAdsId">Conversion / Tag ID</Label>
            <Input
              id="googleAdsId"
              value={data.googleAdsId}
              onChange={(e) => set("googleAdsId", e.target.value)}
              placeholder="AW-XXXXXXXXX"
              autoComplete="off"
              spellCheck={false}
            />
            <p className="text-xs text-muted-foreground">
              Loads the Google Ads global site tag. Conversion events can still be set in Ads or GTM.
            </p>
          </div>
        </div>

        {/* Meta Pixel */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Facebook className="h-4 w-4 text-sky-600" />
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Meta Pixel (Facebook / Instagram Ads)
            </h2>
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaPixelId">Pixel ID</Label>
            <Input
              id="metaPixelId"
              value={data.metaPixelId}
              onChange={(e) => set("metaPixelId", e.target.value)}
              placeholder="123456789012345"
              autoComplete="off"
              spellCheck={false}
            />
            <p className="text-xs text-muted-foreground">
              From Meta Events Manager → Data sources → Pixel.
            </p>
          </div>
        </div>

        {/* Custom snippets */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-violet-600" />
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Custom snippets
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            For Microsoft Clarity, Hotjar, LinkedIn Insight, TikTok Pixel, or any other vendor script.
          </p>
          <div className="space-y-2">
            <Label htmlFor="customHeadHtml">Custom &lt;head&gt; HTML</Label>
            <Textarea
              id="customHeadHtml"
              value={data.customHeadHtml}
              onChange={(e) => set("customHeadHtml", e.target.value)}
              placeholder={'<script>...</script>\n<meta name="..." content="..." />'}
              rows={5}
              className="font-mono text-xs"
              spellCheck={false}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customBodyHtml">Custom &lt;body&gt; HTML</Label>
            <Textarea
              id="customBodyHtml"
              value={data.customBodyHtml}
              onChange={(e) => set("customBodyHtml", e.target.value)}
              placeholder={"<noscript>...</noscript>"}
              rows={4}
              className="font-mono text-xs"
              spellCheck={false}
            />
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
            <><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Tags"}</>
          )}
        </Button>
      </form>
    </div>
  )
}
