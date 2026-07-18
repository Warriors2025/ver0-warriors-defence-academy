"use client"

import { useMemo, useState } from "react"
import { Eye, CheckCircle, Save, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  SCHEMA_TYPES,
  validateSchemaJson,
  buildPresetSchema,
  type PageSeo,
} from "@/lib/seo"

type Props = {
  pageSeo: PageSeo
  onChange: (patch: Partial<PageSeo>) => void
  path: string
  title?: string
  onSave: () => Promise<void>
  saving?: boolean
  saved?: boolean
  error?: string
  homeNote?: boolean
}

const TEMPLATES: { label: string; json: string }[] = [
  {
    label: "WebPage",
    json: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Page Title",
      description: "Page description",
      url: "https://warriorsdefenceacademy.com/",
    }, null, 2),
  },
  {
    label: "FAQPage",
    json: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Sample question?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sample answer.",
          },
        },
      ],
    }, null, 2),
  },
  {
    label: "BreadcrumbList",
    json: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://warriorsdefenceacademy.com/" },
        { "@type": "ListItem", position: 2, name: "Page", item: "https://warriorsdefenceacademy.com/page" },
      ],
    }, null, 2),
  },
  {
    label: "Organization",
    json: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Warriors Defence Academy",
      url: "https://warriorsdefenceacademy.com",
      logo: "https://warriorsdefenceacademy.com/images/logo/warriors-defence-logo.svg",
      telephone: "+91-94522-45729",
    }, null, 2),
  },
]

export function SchemaMarkupEditor({
  pageSeo,
  onChange,
  path,
  title,
  onSave,
  saving,
  saved,
  error,
  homeNote,
}: Props) {
  const [schemaError, setSchemaError] = useState("")

  const schemaPreview = useMemo(() => {
    if (pageSeo.schemaType === "none") return null
    if (pageSeo.schemaType === "custom") {
      const result = validateSchemaJson(pageSeo.schemaCustomJson)
      return result.valid ? result.parsed : null
    }
    return buildPresetSchema(pageSeo.schemaType, pageSeo, path)
  }, [pageSeo, path])

  async function handleSave() {
    if (pageSeo.schemaType === "custom" && pageSeo.schemaCustomJson.trim()) {
      const result = validateSchemaJson(pageSeo.schemaCustomJson)
      if (!result.valid) {
        setSchemaError(result.error ?? "Invalid schema JSON")
        return
      }
    }
    setSchemaError("")
    await onSave()
  }

  function applyTemplate(json: string) {
    onChange({ schemaType: "custom", schemaCustomJson: json })
    setSchemaError("")
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {title && (
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            {title}
          </h2>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{path}</p>
        </div>
      )}

      {homeNote && (
        <div className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Homepage uses a built-in rich schema graph for presets. Choose <strong>Custom JSON-LD</strong> to fully replace it, or <strong>None</strong> to disable.
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4" /> Schema saved
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="space-y-2">
          <Label>Schema Type</Label>
          <select
            value={pageSeo.schemaType}
            onChange={(e) => onChange({ schemaType: e.target.value as PageSeo["schemaType"] })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="none">None (disabled)</option>
            {SCHEMA_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
            <option value="custom">Custom JSON-LD</option>
          </select>
          <p className="text-xs text-muted-foreground">
            Presets auto-build from this page&apos;s SEO title/description. Use Custom for full control.
          </p>
        </div>

        {pageSeo.schemaType !== "none" && pageSeo.schemaType !== "custom" && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs">Name used in schema (SEO title)</Label>
              <Input
                value={pageSeo.metaTitle}
                onChange={(e) => onChange({ metaTitle: e.target.value })}
                placeholder="Page name for schema.org"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs">Description used in schema</Label>
              <Textarea
                value={pageSeo.metaDescription}
                onChange={(e) => onChange({ metaDescription: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        )}

        {pageSeo.schemaType === "custom" && (
          <>
            <div className="space-y-2">
              <Label>Start from template</Label>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((t) => (
                  <Button key={t.label} type="button" variant="outline" size="sm" onClick={() => applyTemplate(t.json)}>
                    {t.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Custom JSON-LD</Label>
              <Textarea
                value={pageSeo.schemaCustomJson}
                onChange={(e) => {
                  onChange({ schemaCustomJson: e.target.value })
                  setSchemaError("")
                }}
                rows={16}
                className="font-mono text-xs"
                placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "..."\n}'}
              />
              {schemaError && <p className="text-sm text-destructive">{schemaError}</p>}
            </div>
          </>
        )}
      </div>

      {schemaPreview != null && (
        <div className="bg-muted/40 border border-border rounded-xl p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> Live Preview
          </p>
          <pre className="text-xs overflow-auto max-h-80 font-mono whitespace-pre-wrap">
            {JSON.stringify(schemaPreview, null, 2)}
          </pre>
        </div>
      )}

      <Button onClick={handleSave} disabled={saving} className="gap-2">
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : "Save Schema"}
      </Button>
    </div>
  )
}
