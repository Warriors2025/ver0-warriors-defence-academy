"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Save, CheckCircle, ExternalLink, ArrowLeft, ChevronDown, ChevronRight,
  Plus, Trash2, RefreshCw, Heading1,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePicker } from "@/components/admin/image-picker"
import type { SiteContent } from "@/lib/site-content"
import { getCmsPage } from "@/lib/cms-pages"
import { fieldToInputId, resolveCmsSection } from "@/lib/cms-field-map"
import {
  HEADING_LEVELS,
  headingFieldsForPage,
  mergeSeoStore,
  type HeadingLevel,
} from "@/lib/seo"

type Props = { slug: string }

function Section({
  title, open: defaultOpen = false, highlight = false, children,
}: { title: string; open?: boolean; highlight?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen || highlight)
  useEffect(() => {
    if (highlight) setOpen(true)
  }, [highlight])
  return (
    <div className={`border rounded-xl overflow-hidden bg-card ${highlight ? "border-primary ring-2 ring-primary/30" : "border-border"}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm hover:bg-muted/50 transition-colors"
      >
        {title}
        {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">{children}</div>}
    </div>
  )
}

function HeadingSelect({
  value,
  onChange,
  inputId,
}: {
  value: HeadingLevel
  onChange: (level: HeadingLevel) => void
  inputId?: string
}) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <Heading1 className="h-3.5 w-3.5 text-muted-foreground" />
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value as HeadingLevel)}
        className="h-8 rounded-md border border-input bg-background px-2 text-xs font-mono"
        title="Heading tag (H1–H6)"
        aria-label="Heading tag"
      >
        {HEADING_LEVELS.map((l) => (
          <option key={l} value={l}>{l.toUpperCase()}</option>
        ))}
      </select>
    </div>
  )
}

function TextField({
  label,
  fieldId,
  value,
  onChange,
  multiline = false,
  rows = 2,
  headingKey,
  headingLevel,
  onHeadingChange,
}: {
  label: string
  fieldId: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  rows?: number
  headingKey?: string
  headingLevel?: HeadingLevel
  onHeadingChange?: (level: HeadingLevel) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={fieldToInputId(fieldId)}>{label}</Label>
        {headingKey && headingLevel && onHeadingChange && (
          <HeadingSelect
            value={headingLevel}
            onChange={onHeadingChange}
            inputId={fieldToInputId(`${headingKey}__tag`)}
          />
        )}
      </div>
      {multiline ? (
        <Textarea
          id={fieldToInputId(fieldId)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
        />
      ) : (
        <Input
          id={fieldToInputId(fieldId)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

export function VisualPageEditor({ slug }: Props) {
  const page = getCmsPage(slug)
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [previewKey, setPreviewKey] = useState(0)
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [selectedLabel, setSelectedLabel] = useState<string>("")

  const activeSection = selectedField ? resolveCmsSection(selectedField) : null
  const headingDefs = headingFieldsForPage(slug)

  const getHeading = (key: string, fallback: HeadingLevel = "h2"): HeadingLevel => {
    const stored = content?.seo?.headings?.[key]
    if (stored) return stored
    const def = headingDefs.find((f) => f.key === key)
    return def?.defaultLevel ?? fallback
  }

  const setHeading = (key: string, level: HeadingLevel) => {
    if (!content) return
    const seo = mergeSeoStore(content.seo)
    setContent({
      ...content,
      seo: {
        ...seo,
        headings: { ...seo.headings, [key]: level },
      },
    })
  }

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return
      if (e.data?.type !== "CMS_SELECT" || !e.data.field) return
      setSelectedField(e.data.field)
      setSelectedLabel(e.data.label || e.data.field)
      const inputId = fieldToInputId(e.data.field)
      setTimeout(() => {
        const el = document.getElementById(inputId)
        el?.scrollIntoView({ behavior: "smooth", block: "center" })
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.focus()
      }, 200)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  const load = useCallback(() => {
    setLoading(true)
    setError("")
    fetch("/api/content", { credentials: "include" })
      .then(async (r) => {
        const json = await r.json()
        if (!r.ok) throw new Error(json.error || "Unauthorized — please sign in again")
        if (!json.hero || !json.sections) throw new Error("Invalid content response")
        setContent({
          ...json,
          seo: mergeSeoStore(json.seo),
        })
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load content")
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  async function handleSave() {
    if (!content) return
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setPreviewKey((k) => k + 1)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save. Check Supabase service role key in .env.local")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6 text-center">
        <p className="text-destructive mb-4">{error || "Failed to load editor"}</p>
        <Link href="/admin/login" className="text-primary underline">Sign in again</Link>
        <Link href="/admin/pages" className="text-muted-foreground mt-2 text-sm">Back to Pages</Link>
      </div>
    )
  }

  const { hero, sections } = content

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Top toolbar — WordPress-style */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1d2327] text-white border-b border-white/10 shrink-0">
        <Link href="/admin/pages" className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <span className="text-white/30 mx-1">|</span>
        <span className="font-semibold text-sm">Editing: {page?.title ?? slug}</span>
        {selectedLabel && (
          <span className="text-xs bg-[#2271b1]/30 text-[#72aee6] px-2 py-0.5 rounded hidden sm:inline">
            Selected: {selectedLabel}
          </span>
        )}
        <div className="flex-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white hover:bg-white/10 gap-1.5"
          onClick={() => setPreviewKey((k) => k + 1)}
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh Preview
        </Button>
        <a href={page?.path ?? "/"} target="_blank" rel="noopener noreferrer">
          <Button type="button" variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" /> View Live
          </Button>
        </a>
        <Button
          type="button"
          size="sm"
          className="bg-[#2271b1] hover:bg-[#135e96] text-white gap-1.5"
          onClick={handleSave}
          disabled={saving}
        >
          {saved ? <><CheckCircle className="h-3.5 w-3.5" /> Saved!</> : <><Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save Changes"}</>}
        </Button>
      </div>

      {error && (
        <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm border-b border-destructive/20">{error}</div>
      )}

      {/* Split pane */}
      <div className="flex flex-1 min-h-0">
        {/* Left: field editor */}
        <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 overflow-y-auto border-r border-border p-4 space-y-3 bg-muted/20">
          <p className="text-xs text-muted-foreground px-1 pb-1">
            Edit text below, or click blue outlines in the preview. Use the H1–H6 dropdown next to titles to change heading tags.
          </p>

          <Section title="Announcement Bar" open highlight={activeSection === "Announcement Bar"}>
            <TextField
              label="Banner Text"
              fieldId="announcement.text"
              value={content.announcement.text}
              onChange={(text) => setContent({ ...content, announcement: { ...content.announcement, text } })}
            />
            <TextField
              label="Phone Number"
              fieldId="announcement.phone"
              value={content.announcement.phone}
              onChange={(phone) => setContent({ ...content, announcement: { ...content.announcement, phone } })}
            />
          </Section>

          <Section title="Hero Section" open highlight={activeSection === "Hero Section"}>
            <TextField
              label="Badge"
              fieldId="hero.badge"
              value={hero.badge}
              onChange={(badge) => setContent({ ...content, hero: { ...hero, badge } })}
            />
            <TextField
              label="Headline"
              fieldId="hero.headline"
              value={hero.headline}
              onChange={(headline) => setContent({ ...content, hero: { ...hero, headline } })}
              headingKey="hero.headline"
              headingLevel={getHeading("hero.headline", "h1")}
              onHeadingChange={(level) => setHeading("hero.headline", level)}
            />
            <TextField
              label="Highlight Text (gold)"
              fieldId="hero.highlightText"
              value={hero.highlightText}
              onChange={(highlightText) => setContent({ ...content, hero: { ...hero, highlightText } })}
            />
            <TextField
              label="Tagline"
              fieldId="hero.tagline"
              value={hero.tagline}
              onChange={(tagline) => setContent({ ...content, hero: { ...hero, tagline } })}
              multiline
              rows={2}
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Feature Pills</Label>
                <Button type="button" variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setContent({ ...content, hero: { ...hero, features: [...hero.features, ""] } })}>
                  <Plus className="h-3 w-3" /> Add text
                </Button>
              </div>
              {hero.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <Input id={fieldToInputId(`hero.features.${i}`)} value={f} onChange={(e) => { const features = [...hero.features]; features[i] = e.target.value; setContent({ ...content, hero: { ...hero, features } }) }} />
                  <Button type="button" variant="ghost" size="icon" className="shrink-0 h-10" onClick={() => setContent({ ...content, hero: { ...hero, features: hero.features.filter((_, idx) => idx !== i) } })}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <Label>Hero Stats Strip</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={() => setContent({ ...content, hero: { ...hero, stats: [...hero.stats, { value: "", label: "" }] } })}
                >
                  <Plus className="h-3 w-3" /> Add text
                </Button>
              </div>
              {hero.stats.map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 p-3 border border-border rounded-lg">
                  <Input id={fieldToInputId(`hero.stats.${i}.value`)} placeholder="Value" value={s.value} onChange={(e) => { const stats = [...hero.stats]; stats[i] = { ...stats[i], value: e.target.value }; setContent({ ...content, hero: { ...hero, stats } }) }} />
                  <Input id={fieldToInputId(`hero.stats.${i}.label`)} placeholder="Label" value={s.label} onChange={(e) => { const stats = [...hero.stats]; stats[i] = { ...stats[i], label: e.target.value }; setContent({ ...content, hero: { ...hero, stats } }) }} />
                  <Button type="button" variant="ghost" size="icon" className="shrink-0 h-10" onClick={() => setContent({ ...content, hero: { ...hero, stats: hero.stats.filter((_, idx) => idx !== i) } })}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
              <TextField
                label="Achievement Badge Value"
                fieldId="sections.heroAchievement.value"
                value={sections.heroAchievement.value}
                onChange={(value) => setContent({ ...content, sections: { ...sections, heroAchievement: { ...sections.heroAchievement, value } } })}
              />
              <TextField
                label="Achievement Badge Label"
                fieldId="sections.heroAchievement.label"
                value={sections.heroAchievement.label}
                onChange={(label) => setContent({ ...content, sections: { ...sections, heroAchievement: { ...sections.heroAchievement, label } } })}
              />
            </div>
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <Label>Carousel Slides</Label>
                <Button type="button" variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setContent({ ...content, sections: { ...sections, heroSlides: [...sections.heroSlides, { src: "", alt: "", caption: "" }] } })}>
                  <Plus className="h-3 w-3" /> Add Slide
                </Button>
              </div>
              {sections.heroSlides.map((slide, i) => (
                <div key={i} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground">Slide {i + 1}</p>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => setContent({ ...content, sections: { ...sections, heroSlides: sections.heroSlides.filter((_, idx) => idx !== i) } })}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <ImagePicker uploadPreset="hero" label={`Image`} value={slide.src} onChange={(src) => { const slides = [...sections.heroSlides]; slides[i] = { ...slides[i], src }; setContent({ ...content, sections: { ...sections, heroSlides: slides } }) }} />
                  <Input placeholder="Alt text" value={slide.alt} onChange={(e) => { const slides = [...sections.heroSlides]; slides[i] = { ...slides[i], alt: e.target.value }; setContent({ ...content, sections: { ...sections, heroSlides: slides } }) }} />
                  <Input id={fieldToInputId(`sections.heroSlides.${i}.caption`)} placeholder="Caption text" value={slide.caption} onChange={(e) => { const slides = [...sections.heroSlides]; slides[i] = { ...slides[i], caption: e.target.value }; setContent({ ...content, sections: { ...sections, heroSlides: slides } }) }} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Features Section" highlight={activeSection === "Features Section"}>
            <TextField
              label="Eyebrow"
              fieldId="sections.featuresHeader.eyebrow"
              value={sections.featuresHeader.eyebrow}
              onChange={(eyebrow) => setContent({ ...content, sections: { ...sections, featuresHeader: { ...sections.featuresHeader, eyebrow } } })}
            />
            <TextField
              label="Section Title"
              fieldId="sections.featuresHeader.title"
              value={sections.featuresHeader.title}
              onChange={(title) => setContent({ ...content, sections: { ...sections, featuresHeader: { ...sections.featuresHeader, title } } })}
              headingKey="sections.featuresHeader.title"
              headingLevel={getHeading("sections.featuresHeader.title", "h2")}
              onHeadingChange={(level) => setHeading("sections.featuresHeader.title", level)}
            />
            <TextField
              label="Subtitle"
              fieldId="sections.featuresHeader.subtitle"
              value={sections.featuresHeader.subtitle}
              onChange={(subtitle) => setContent({ ...content, sections: { ...sections, featuresHeader: { ...sections.featuresHeader, subtitle } } })}
              multiline
              rows={2}
            />
            <div className="flex items-center justify-between pt-2">
              <Label>Feature Cards</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => setContent({
                  ...content,
                  sections: {
                    ...sections,
                    features: [...sections.features, { title: "New Feature", description: "", image: "", href: "/facilities" }],
                  },
                })}
              >
                <Plus className="h-3 w-3" /> Add text card
              </Button>
            </div>
            {sections.features.map((f, i) => (
              <div key={i} className="p-3 border border-border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">Feature {i + 1}</p>
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => setContent({ ...content, sections: { ...sections, features: sections.features.filter((_, idx) => idx !== i) } })}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Input id={fieldToInputId(`sections.features.${i}.title`)} placeholder="Title" value={f.title} onChange={(e) => { const features = [...sections.features]; features[i] = { ...features[i], title: e.target.value }; setContent({ ...content, sections: { ...sections, features } }) }} />
                <Textarea id={fieldToInputId(`sections.features.${i}.description`)} placeholder="Description" value={f.description} onChange={(e) => { const features = [...sections.features]; features[i] = { ...features[i], description: e.target.value }; setContent({ ...content, sections: { ...sections, features } }) }} rows={2} />
                <ImagePicker uploadPreset="feature" value={f.image} onChange={(image) => { const features = [...sections.features]; features[i] = { ...features[i], image }; setContent({ ...content, sections: { ...sections, features } }) }} />
              </div>
            ))}
          </Section>

          <Section title="Stats Section" highlight={activeSection === "Stats Section"}>
            <TextField
              label="Eyebrow"
              fieldId="sections.statsSection.eyebrow"
              value={sections.statsSection.eyebrow}
              onChange={(eyebrow) => setContent({ ...content, sections: { ...sections, statsSection: { ...sections.statsSection, eyebrow } } })}
            />
            <TextField
              label="Section Title"
              fieldId="sections.statsSection.title"
              value={sections.statsSection.title}
              onChange={(title) => setContent({ ...content, sections: { ...sections, statsSection: { ...sections.statsSection, title } } })}
              headingKey="sections.statsSection.title"
              headingLevel={getHeading("sections.statsSection.title", "h2")}
              onHeadingChange={(level) => setHeading("sections.statsSection.title", level)}
            />
            {sections.statsSection.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 p-3 border border-border rounded-lg">
                <Input id={fieldToInputId(`sections.statsSection.stats.${i}.value`)} placeholder="Value" type="number" value={s.value} onChange={(e) => { const stats = [...sections.statsSection.stats]; stats[i] = { ...stats[i], value: Number(e.target.value) }; setContent({ ...content, sections: { ...sections, statsSection: { ...sections.statsSection, stats } } }) }} />
                <Input id={fieldToInputId(`sections.statsSection.stats.${i}.suffix`)} placeholder="Suffix" value={s.suffix} onChange={(e) => { const stats = [...sections.statsSection.stats]; stats[i] = { ...stats[i], suffix: e.target.value }; setContent({ ...content, sections: { ...sections, statsSection: { ...sections.statsSection, stats } } }) }} />
                <Input id={fieldToInputId(`sections.statsSection.stats.${i}.label`)} placeholder="Label" value={s.label} onChange={(e) => { const stats = [...sections.statsSection.stats]; stats[i] = { ...stats[i], label: e.target.value }; setContent({ ...content, sections: { ...sections, statsSection: { ...sections.statsSection, stats } } }) }} />
                <Input id={fieldToInputId(`sections.statsSection.stats.${i}.description`)} placeholder="Description" value={s.description} onChange={(e) => { const stats = [...sections.statsSection.stats]; stats[i] = { ...stats[i], description: e.target.value }; setContent({ ...content, sections: { ...sections, statsSection: { ...sections.statsSection, stats } } }) }} />
              </div>
            ))}
          </Section>

          <Section title="Director Message" highlight={activeSection === "Director Message"}>
            <ImagePicker uploadPreset="mentor" label="Director Photo" value={sections.director.image} onChange={(image) => setContent({ ...content, sections: { ...sections, director: { ...sections.director, image } } })} />
            <TextField
              label="Eyebrow"
              fieldId="sections.director.eyebrow"
              value={sections.director.eyebrow}
              onChange={(eyebrow) => setContent({ ...content, sections: { ...sections, director: { ...sections.director, eyebrow } } })}
            />
            <TextField
              label="Section Title"
              fieldId="sections.director.title"
              value={sections.director.title}
              onChange={(title) => setContent({ ...content, sections: { ...sections, director: { ...sections.director, title } } })}
              headingKey="sections.director.title"
              headingLevel={getHeading("sections.director.title", "h2")}
              onHeadingChange={(level) => setHeading("sections.director.title", level)}
            />
            <TextField
              label="Name"
              fieldId="sections.director.name"
              value={sections.director.name}
              onChange={(name) => setContent({ ...content, sections: { ...sections, director: { ...sections.director, name } } })}
            />
            <TextField
              label="Role"
              fieldId="sections.director.role"
              value={sections.director.role}
              onChange={(role) => setContent({ ...content, sections: { ...sections, director: { ...sections.director, role } } })}
            />
            <div className="flex items-center justify-between">
              <Label>Paragraphs</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => setContent({
                  ...content,
                  sections: {
                    ...sections,
                    director: { ...sections.director, paragraphs: [...sections.director.paragraphs, ""] },
                  },
                })}
              >
                <Plus className="h-3 w-3" /> Add text
              </Button>
            </div>
            {sections.director.paragraphs.map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Paragraph {i + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setContent({
                      ...content,
                      sections: {
                        ...sections,
                        director: {
                          ...sections.director,
                          paragraphs: sections.director.paragraphs.filter((_, idx) => idx !== i),
                        },
                      },
                    })}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Textarea
                  id={fieldToInputId(`sections.director.paragraphs.${i}`)}
                  value={p}
                  onChange={(e) => {
                    const paragraphs = [...sections.director.paragraphs]
                    paragraphs[i] = e.target.value
                    setContent({ ...content, sections: { ...sections, director: { ...sections.director, paragraphs } } })
                  }}
                  rows={3}
                />
              </div>
            ))}
          </Section>

          <Section title="Call to Action" highlight={activeSection === "Call to Action"}>
            <TextField
              label="Eyebrow"
              fieldId="sections.cta.eyebrow"
              value={sections.cta.eyebrow}
              onChange={(eyebrow) => setContent({ ...content, sections: { ...sections, cta: { ...sections.cta, eyebrow } } })}
            />
            <TextField
              label="Title"
              fieldId="sections.cta.title"
              value={sections.cta.title}
              onChange={(title) => setContent({ ...content, sections: { ...sections, cta: { ...sections.cta, title } } })}
              headingKey="sections.cta.title"
              headingLevel={getHeading("sections.cta.title", "h2")}
              onHeadingChange={(level) => setHeading("sections.cta.title", level)}
            />
            <TextField
              label="Highlight"
              fieldId="sections.cta.highlight"
              value={sections.cta.highlight}
              onChange={(highlight) => setContent({ ...content, sections: { ...sections, cta: { ...sections.cta, highlight } } })}
            />
            <TextField
              label="Subtitle"
              fieldId="sections.cta.subtitle"
              value={sections.cta.subtitle}
              onChange={(subtitle) => setContent({ ...content, sections: { ...sections, cta: { ...sections.cta, subtitle } } })}
              multiline
              rows={2}
            />
            <TextField
              label="Primary Button Label"
              fieldId="sections.cta.primaryLabel"
              value={sections.cta.primaryLabel}
              onChange={(primaryLabel) => setContent({ ...content, sections: { ...sections, cta: { ...sections.cta, primaryLabel } } })}
            />
            <TextField
              label="Secondary Button Label"
              fieldId="sections.cta.secondaryLabel"
              value={sections.cta.secondaryLabel}
              onChange={(secondaryLabel) => setContent({ ...content, sections: { ...sections, cta: { ...sections.cta, secondaryLabel } } })}
            />
            <TextField
              label="Hours Text"
              fieldId="sections.cta.hours"
              value={sections.cta.hours}
              onChange={(hours) => setContent({ ...content, sections: { ...sections, cta: { ...sections.cta, hours } } })}
            />
          </Section>

          <Section title="Contact Info" highlight={activeSection === "Contact Info"}>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Phone 1" fieldId="contact.phone1" value={content.contact.phone1} onChange={(phone1) => setContent({ ...content, contact: { ...content.contact, phone1 } })} />
              <TextField label="Phone 2" fieldId="contact.phone2" value={content.contact.phone2} onChange={(phone2) => setContent({ ...content, contact: { ...content.contact, phone2 } })} />
            </div>
            <TextField label="Email" fieldId="contact.email" value={content.contact.email} onChange={(email) => setContent({ ...content, contact: { ...content.contact, email } })} />
            <TextField label="Address" fieldId="contact.address" value={content.contact.address} onChange={(address) => setContent({ ...content, contact: { ...content.contact, address } })} multiline rows={2} />
          </Section>
        </div>

        {/* Right: live preview iframe */}
        <div className="hidden lg:flex flex-1 flex-col min-w-0 bg-muted/40">
          <div className="px-4 py-2 text-xs border-b border-border bg-background flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Live Preview — click any blue-outlined text to edit</span>
            {selectedLabel && <span className="text-primary font-medium truncate">Editing: {selectedLabel}</span>}
          </div>
          <iframe
            key={previewKey}
            src={`${page?.path ?? "/"}?cmsEditor=1`}
            className="flex-1 w-full border-0"
            title="Page preview"
          />
        </div>
      </div>
    </div>
  )
}
