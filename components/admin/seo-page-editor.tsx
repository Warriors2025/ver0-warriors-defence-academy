"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Save, CheckCircle, ArrowLeft, Search, Code2, ImageIcon, Heading1,
  AlertTriangle, Eye, ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { CMS_PAGES, getCmsPage } from "@/lib/cms-pages"
import {
  SCHEMA_TYPES,
  HEADING_LEVELS,
  mergePageSeo,
  mergeImageSeo,
  analyzePageSeo,
  validateSchemaJson,
  headingFieldsForPage,
  collectContentImageUrls,
  type PageSeo,
  type SeoStore,
  type ImageSeo,
  type HeadingLevel,
  buildPresetSchema,
} from "@/lib/seo"

type Tab = "meta" | "schema" | "images" | "headings"

type Props = { slug: string }

export function SeoPageEditor({ slug }: Props) {
  const page = getCmsPage(slug)
  const [tab, setTab] = useState<Tab>("meta")
  const [pageSeo, setPageSeo] = useState<PageSeo>(() => mergePageSeo(slug))
  const [seoStore, setSeoStore] = useState<SeoStore>({ pages: {}, images: {}, headings: {} })
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [schemaError, setSchemaError] = useState("")

  const analysis = useMemo(() => analyzePageSeo(pageSeo), [pageSeo])
  const headingFields = headingFieldsForPage(slug)

  const schemaPreview = useMemo(() => {
    if (pageSeo.schemaType === "none") return null
    if (pageSeo.schemaType === "custom") {
      const result = validateSchemaJson(pageSeo.schemaCustomJson)
      return result.valid ? result.parsed : null
    }
    return buildPresetSchema(pageSeo.schemaType, pageSeo, page?.path ?? "/")
  }, [pageSeo, page?.path])

  useEffect(() => {
    setLoading(true)
    fetch("/api/content", { credentials: "include" })
      .then((r) => r.json())
      .then((json) => {
        const store = json.seo ?? { pages: {}, images: {}, headings: {} }
        setSeoStore(store)
        setPageSeo(mergePageSeo(slug, store.pages?.[slug]))
        setImageUrls(collectContentImageUrls(json))
      })
      .catch(() => setError("Failed to load SEO data"))
      .finally(() => setLoading(false))
  }, [slug])

  function updatePageSeo(patch: Partial<PageSeo>) {
    setPageSeo((prev) => ({ ...prev, ...patch }))
  }

  function updateImageSeo(src: string, patch: Partial<ImageSeo>) {
    setSeoStore((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [src]: { ...mergeImageSeo(prev.images[src]), ...patch },
      },
    }))
  }

  function updateHeading(key: string, level: HeadingLevel) {
    setSeoStore((prev) => ({
      ...prev,
      headings: { ...prev.headings, [key]: level },
    }))
  }

  async function handleSave() {
    if (pageSeo.schemaType === "custom" && pageSeo.schemaCustomJson.trim()) {
      const result = validateSchemaJson(pageSeo.schemaCustomJson)
      if (!result.valid) {
        setSchemaError(result.error ?? "Invalid schema JSON")
        setTab("schema")
        return
      }
    }
    setSchemaError("")
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          seo: {
            pages: { [slug]: pageSeo },
            images: seoStore.images,
            headings: seoStore.headings,
          },
        }),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save SEO settings")
    } finally {
      setSaving(false)
    }
  }

  if (!page) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Page not found.</p>
        <Link href="/admin/seo" className="text-primary underline text-sm mt-2 inline-block">Back to SEO</Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const tabs: { id: Tab; label: string; icon: typeof Search }[] = [
    { id: "meta", label: "Meta SEO", icon: Search },
    { id: "schema", label: "Schema", icon: Code2 },
    { id: "images", label: "Image SEO", icon: ImageIcon },
    { id: "headings", label: "Headings", icon: Heading1 },
  ]

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link href="/admin/seo" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-3.5 w-3.5" /> All Pages SEO
          </Link>
          <h1 className="text-2xl font-bold">{page.title} — SEO</h1>
          <p className="text-sm text-muted-foreground mt-1">{page.path} · Meta tags, schema, images & heading tags</p>
        </div>
        <div className="flex gap-2">
          <a href={page.path} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" /> View Page
            </Button>
          </a>
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            {saved ? <><CheckCircle className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save SEO"}</>}
          </Button>
        </div>
      </div>

      {/* Score card */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">SEO Score</p>
          <p className={cn("text-3xl font-bold mt-1", analysis.score >= 80 ? "text-emerald-600" : analysis.score >= 50 ? "text-amber-600" : "text-destructive")}>
            {analysis.score}/100
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Google Preview</p>
          <p className="text-[#1a0dab] text-sm font-medium truncate mt-1">{pageSeo.metaTitle || page.title}</p>
          <p className="text-[#006621] text-xs truncate">{pageSeo.canonicalUrl || `https://warriorsdefenceacademy.com${page.path === "/" ? "" : page.path}`}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{pageSeo.metaDescription || page.description}</p>
        </div>
      </div>

      {analysis.warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1">
          {analysis.warnings.map((w) => (
            <p key={w} className="text-sm text-amber-800 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> {w}
            </p>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>}

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border pb-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
              tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-3.5 w-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* Meta tab */}
      {tab === "meta" && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <div className="space-y-2">
            <Label>SEO Title (Meta Title)</Label>
            <Input value={pageSeo.metaTitle} onChange={(e) => updatePageSeo({ metaTitle: e.target.value })} placeholder="Page title for search engines" />
            <p className="text-xs text-muted-foreground">{pageSeo.metaTitle.length} characters · aim for 50–60</p>
          </div>
          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Textarea value={pageSeo.metaDescription} onChange={(e) => updatePageSeo({ metaDescription: e.target.value })} rows={3} placeholder="Brief description shown in search results" />
            <p className="text-xs text-muted-foreground">{pageSeo.metaDescription.length} characters · aim for 120–160</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Meta Keywords (optional)</Label>
              <Input value={pageSeo.metaKeywords} onChange={(e) => updatePageSeo({ metaKeywords: e.target.value })} placeholder="NDA coaching, SSB training" />
            </div>
            <div className="space-y-2">
              <Label>Focus Keyword</Label>
              <Input value={pageSeo.focusKeyword} onChange={(e) => updatePageSeo({ focusKeyword: e.target.value })} placeholder="Primary keyword for this page" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Canonical URL</Label>
            <Input value={pageSeo.canonicalUrl} onChange={(e) => updatePageSeo({ canonicalUrl: e.target.value })} placeholder={`https://warriorsdefenceacademy.com${page.path === "/" ? "" : page.path}`} />
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={pageSeo.robotsIndex} onCheckedChange={(v) => updatePageSeo({ robotsIndex: v })} />
              <Label>Index (allow search engines)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={pageSeo.robotsFollow} onCheckedChange={(v) => updatePageSeo({ robotsFollow: v })} />
              <Label>Follow links</Label>
            </div>
          </div>
          <div className="border-t border-border pt-5 space-y-4">
            <p className="text-sm font-semibold">Open Graph & Social</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>OG Title</Label>
                <Input value={pageSeo.ogTitle} onChange={(e) => updatePageSeo({ ogTitle: e.target.value })} placeholder="Facebook / LinkedIn title" />
              </div>
              <div className="space-y-2">
                <Label>OG Image URL</Label>
                <Input value={pageSeo.ogImage} onChange={(e) => updatePageSeo({ ogImage: e.target.value })} placeholder="/images/og-image.webp" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>OG Description</Label>
              <Textarea value={pageSeo.ogDescription} onChange={(e) => updatePageSeo({ ogDescription: e.target.value })} rows={2} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Twitter Title</Label>
                <Input value={pageSeo.twitterTitle} onChange={(e) => updatePageSeo({ twitterTitle: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Twitter Image URL</Label>
                <Input value={pageSeo.twitterImage} onChange={(e) => updatePageSeo({ twitterImage: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Featured Snippet / Direct Answer (AEO)</Label>
              <Textarea value={pageSeo.featuredSnippet} onChange={(e) => updatePageSeo({ featuredSnippet: e.target.value })} rows={2} placeholder="Concise answer block for AI/voice search" />
            </div>
          </div>
        </div>
      )}

      {/* Schema tab */}
      {tab === "schema" && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="space-y-2">
              <Label>Schema Type</Label>
              <select
                value={pageSeo.schemaType}
                onChange={(e) => updatePageSeo({ schemaType: e.target.value as PageSeo["schemaType"] })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="none">None</option>
                {SCHEMA_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
                <option value="custom">Custom JSON-LD</option>
              </select>
            </div>
            {pageSeo.schemaType === "custom" && (
              <div className="space-y-2">
                <Label>Custom JSON-LD Schema</Label>
                <Textarea
                  value={pageSeo.schemaCustomJson}
                  onChange={(e) => { updatePageSeo({ schemaCustomJson: e.target.value }); setSchemaError("") }}
                  rows={12}
                  className="font-mono text-xs"
                  placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "..."\n}'}
                />
                {schemaError && <p className="text-sm text-destructive">{schemaError}</p>}
              </div>
            )}
          </div>
          {schemaPreview && (
            <div className="bg-muted/40 border border-border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> Schema Preview
              </p>
              <pre className="text-xs overflow-auto max-h-64 font-mono">{JSON.stringify(schemaPreview, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {/* Images tab */}
      {tab === "images" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Edit alt text, title, and description for images used on this site. These improve accessibility and image SEO.</p>
          {imageUrls.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">No images found in content.</p>
          ) : (
            imageUrls.map((src) => {
              const img = mergeImageSeo(seoStore.images[src])
              return (
                <div key={src} className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div className="flex gap-4 items-start">
                    <div className="relative w-20 h-20 rounded-lg border border-border overflow-hidden shrink-0 bg-muted">
                      <Image src={src} alt={img.alt || ""} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-muted-foreground truncate mb-2">{src}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Alt Text *</Label>
                          <Input value={img.alt} onChange={(e) => updateImageSeo(src, { alt: e.target.value })} placeholder="Describe the image" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Image Title</Label>
                          <Input value={img.title} onChange={(e) => updateImageSeo(src, { title: e.target.value })} placeholder="Title attribute" />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <Label className="text-xs">Description</Label>
                          <Input value={img.description} onChange={(e) => updateImageSeo(src, { description: e.target.value })} placeholder="Longer description for SEO" />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <Label className="text-xs">Caption</Label>
                          <Input value={img.caption} onChange={(e) => updateImageSeo(src, { caption: e.target.value })} placeholder="Visible caption text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Headings tab */}
      {tab === "headings" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {headingFields.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">No configurable headings for this page yet.</p>
          ) : (
            headingFields.map((field) => {
              const current = seoStore.headings[field.key] ?? field.defaultLevel
              return (
                <div key={field.key} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{field.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">{field.key}</p>
                  </div>
                  <select
                    value={current}
                    onChange={(e) => updateHeading(field.key, e.target.value as HeadingLevel)}
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm shrink-0"
                  >
                    {HEADING_LEVELS.map((l) => (
                      <option key={l} value={l}>{l.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              )
            })
          )}
          <div className="px-5 py-3 bg-muted/30 text-xs text-muted-foreground">
            Tip: Use only one H1 per page. Section titles are usually H2.
          </div>
        </div>
      )}
    </div>
  )
}
