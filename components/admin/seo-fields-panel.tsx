"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  SCHEMA_TYPES, HEADING_LEVELS, analyzePageSeo, validateSchemaJson,
  type PageSeo, type HeadingLevel,
} from "@/lib/seo"
import { buildPresetSchema } from "@/lib/seo"
import { useMemo } from "react"

type Props = {
  seo: PageSeo
  onChange: (patch: Partial<PageSeo>) => void
  path: string
  headingLevel?: HeadingLevel
  onHeadingChange?: (level: HeadingLevel) => void
  showHeading?: boolean
}

export function SeoFieldsPanel({ seo, onChange, path, headingLevel, onHeadingChange, showHeading }: Props) {
  const analysis = useMemo(() => analyzePageSeo(seo), [seo])
  const schemaPreview = useMemo(() => {
    if (seo.schemaType === "none") return null
    if (seo.schemaType === "custom") {
      const result = validateSchemaJson(seo.schemaCustomJson)
      return result.valid ? result.parsed : null
    }
    return buildPresetSchema(seo.schemaType, seo, path)
  }, [seo, path])

  return (
    <div className="space-y-4 border-t border-border pt-4 mt-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">SEO Settings</p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${analysis.score >= 80 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
          {analysis.score}/100
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs">SEO Title</Label>
          <Input value={seo.metaTitle} onChange={(e) => onChange({ metaTitle: e.target.value })} placeholder="Meta title for search engines" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs">Meta Description</Label>
          <Textarea value={seo.metaDescription} onChange={(e) => onChange({ metaDescription: e.target.value })} rows={2} placeholder="Description for Google results" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Focus Keyword</Label>
          <Input value={seo.focusKeyword} onChange={(e) => onChange({ focusKeyword: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Meta Keywords</Label>
          <Input value={seo.metaKeywords} onChange={(e) => onChange({ metaKeywords: e.target.value })} placeholder="comma, separated" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs">Canonical URL</Label>
          <Input value={seo.canonicalUrl} onChange={(e) => onChange({ canonicalUrl: e.target.value })} placeholder={`https://warriorsdefenceacademy.com${path}`} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">OG Image</Label>
          <Input value={seo.ogImage} onChange={(e) => onChange({ ogImage: e.target.value, twitterImage: e.target.value })} placeholder="/images/og-image.webp" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Schema Type</Label>
          <select
            value={seo.schemaType}
            onChange={(e) => onChange({ schemaType: e.target.value as PageSeo["schemaType"] })}
            className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="none">None</option>
            {SCHEMA_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
            <option value="custom">Custom JSON-LD</option>
          </select>
        </div>
        {showHeading && onHeadingChange && (
          <div className="space-y-1">
            <Label className="text-xs">Page Title Heading Tag</Label>
            <select
              value={headingLevel ?? "h1"}
              onChange={(e) => onHeadingChange(e.target.value as HeadingLevel)}
              className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              {HEADING_LEVELS.map((l) => (
                <option key={l} value={l}>{l.toUpperCase()}</option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Switch checked={seo.robotsIndex} onCheckedChange={(v) => onChange({ robotsIndex: v })} />
          <Label className="text-xs">Index in search engines</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={seo.robotsFollow} onCheckedChange={(v) => onChange({ robotsFollow: v })} />
          <Label className="text-xs">Follow links</Label>
        </div>
      </div>

      {seo.schemaType === "custom" && (
        <div className="space-y-1">
          <Label className="text-xs">Custom JSON-LD</Label>
          <Textarea
            value={seo.schemaCustomJson}
            onChange={(e) => onChange({ schemaCustomJson: e.target.value })}
            rows={6}
            className="font-mono text-xs"
            placeholder='{"@context":"https://schema.org","@type":"BlogPosting",...}'
          />
        </div>
      )}

      {schemaPreview && (
        <pre className="text-[10px] bg-muted/50 border border-border rounded-lg p-2 overflow-auto max-h-32 font-mono">
          {JSON.stringify(schemaPreview, null, 2)}
        </pre>
      )}
    </div>
  )
}
