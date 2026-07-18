"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Pencil, Trash2, Save, X, CheckCircle, Search, GripVertical } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImagePicker } from "@/components/admin/image-picker"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { ColorPickerField } from "@/components/admin/color-picker-field"
import { CourseDetailsEditor } from "@/components/admin/course-details-editor"
import { SeoFieldsPanel } from "@/components/admin/seo-fields-panel"
import {
  mergeEntitySeo, entitySeoKey, entityHeadingKey, defaultEntitySeo,
  type PageSeo, type HeadingLevel,
} from "@/lib/seo"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export type FieldDef = {
  key: string
  label: string
  type: "text" | "textarea" | "number" | "image" | "boolean" | "json" | "lines" | "password" | "richtext" | "color" | "select" | "course-details"
  required?: boolean
  editOptional?: boolean
  placeholder?: string
  imagePreset?: import("@/lib/image-presets").ImagePreset
  options?: { label: string; value: string }[]
}

export type SeoEntityConfig = {
  type: "blog" | "course"
  pathPrefix: string
  slugField?: string
  titleField?: string
  descField?: string
  imageField?: string
  authorField?: string
}

type EntityManagerProps = {
  title: string
  description: string
  apiPath: string
  fields: FieldDef[]
  emptyRow: Record<string, unknown>
  seoEntity?: SeoEntityConfig
  /** Enable drag-and-drop reorder via sort_order */
  sortable?: boolean
}

function SortableListItem({
  id,
  children,
}: {
  id: string
  children: (handleProps: {
    attributes: React.HTMLAttributes<HTMLButtonElement>
    listeners: React.HTMLAttributes<HTMLButtonElement> | undefined
  }) => React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  }
  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners })}
    </div>
  )
}

export function EntityManager({ title, description, apiPath, fields, emptyRow, seoEntity, sortable = true }: EntityManagerProps) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [entitySeo, setEntitySeo] = useState<PageSeo>(() => defaultEntitySeo("blog", { title: "", description: "", path: "" }))
  const [titleHeading, setTitleHeading] = useState<HeadingLevel>("h1")
  const [seoPagesCache, setSeoPagesCache] = useState<Record<string, Partial<PageSeo>>>({})
  const [headingsCache, setHeadingsCache] = useState<Record<string, HeadingLevel>>({})

  const slugField = seoEntity?.slugField ?? "slug"
  const titleField = seoEntity?.titleField ?? "title"
  const descField = seoEntity?.descField ?? (seoEntity?.type === "blog" ? "excerpt" : "short_description")
  const imageField = seoEntity?.imageField ?? "image_url"

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const loadSeoStore = useCallback(() => {
    if (!seoEntity) return
    fetch("/api/content", { credentials: "include" })
      .then((r) => r.json())
      .then((json) => {
        setSeoPagesCache(json.seo?.pages ?? {})
        setHeadingsCache(json.seo?.headings ?? {})
      })
      .catch(() => {})
  }, [seoEntity])

  const load = useCallback(() => {
    setLoading(true)
    setError("")
    fetch(apiPath, { credentials: "include" })
      .then(async (r) => {
        const json = await r.json()
        if (!r.ok) throw new Error(json.error || "Failed to load items")
        setRows(json.items ?? [])
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load items")
      })
      .finally(() => setLoading(false))
  }, [apiPath])

  useEffect(() => { load(); loadSeoStore() }, [load, loadSeoStore])

  function loadEntitySeoForRow(row: Record<string, unknown>) {
    if (!seoEntity) return
    const slug = String(row[slugField] ?? "")
    const path = `${seoEntity.pathPrefix}${slug}`
    const fallback = {
      title: String(row[titleField] ?? ""),
      description: String(row[descField] ?? ""),
      path,
      image: String(row[imageField] ?? ""),
      author: seoEntity.authorField ? String(row[seoEntity.authorField] ?? "") : undefined,
    }
    setEntitySeo(mergeEntitySeo(seoEntity.type, slug, seoPagesCache[entitySeoKey(seoEntity.type, slug)], fallback))
    setTitleHeading(headingsCache[entityHeadingKey(seoEntity.type, slug, "title")] ?? "h1")
  }

  function fieldClass(field: FieldDef) {
    return field.type === "textarea" || field.type === "image" || field.type === "json" || field.type === "lines" || field.type === "richtext" || field.type === "course-details" || field.type === "color"
      ? "sm:col-span-2"
      : ""
  }

  function prepareRowForEdit(row: Record<string, unknown>) {
    const prepared = { ...row }
    for (const field of fields) {
      if (field.type === "json" && prepared[field.key] != null && typeof prepared[field.key] !== "string") {
        prepared[field.key] = JSON.stringify(prepared[field.key], null, 2)
      }
    }
    return prepared
  }

  function startNew() {
    setEditing({ ...emptyRow })
    setIsNew(true)
    if (seoEntity) {
      setEntitySeo(defaultEntitySeo(seoEntity.type, { title: "", description: "", path: seoEntity.pathPrefix }))
      setTitleHeading("h1")
    }
  }

  function startEdit(row: Record<string, unknown>) {
    const prepared = prepareRowForEdit(row)
    if ("password" in prepared) prepared.password = ""
    setEditing(prepared)
    setIsNew(false)
    loadEntitySeoForRow(prepared)
  }

  async function saveEntitySeo(slug: string) {
    if (!seoEntity || !slug) return
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        seo: {
          pages: { [entitySeoKey(seoEntity.type, slug)]: entitySeo },
          headings: { [entityHeadingKey(seoEntity.type, slug, "title")]: titleHeading },
        },
      }),
    })
  }

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    setError("")
    try {
      const url = isNew ? apiPath : `${apiPath}/${editing.id}`
      const payload = { ...editing }
      if (!payload.password) delete payload.password
      const res = await fetch(url, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Save failed")
      const slug = String(editing[slugField] ?? "")
      if (seoEntity && slug) await saveEntitySeo(slug)
      setSaved(true)
      setEditing(null)
      load()
      loadSeoStore()
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return
    await fetch(`${apiPath}/${id}`, { method: "DELETE", credentials: "include" })
    load()
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id || !sortable) return
    const oldIndex = rows.findIndex((r) => String(r.id) === String(active.id))
    const newIndex = rows.findIndex((r) => String(r.id) === String(over.id))
    if (oldIndex < 0 || newIndex < 0) return
    const reordered: Record<string, unknown>[] = arrayMove(rows, oldIndex, newIndex).map((row, i) => ({
      ...row,
      sort_order: i,
    }))
    setRows(reordered)
    await Promise.all(
      reordered.map((row) =>
        fetch(`${apiPath}/${String(row.id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ sort_order: row.sort_order }),
        })
      )
    )
  }

  function renderField(field: FieldDef, value: unknown, onChange: (val: unknown) => void) {
    switch (field.type) {
      case "textarea":
        return <Textarea value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={field.placeholder} />
      case "richtext":
        return <RichTextEditor value={String(value ?? "")} onChange={(html) => onChange(html)} placeholder={field.placeholder} />
      case "color":
        return <ColorPickerField label={field.label} value={String(value ?? "")} onChange={(v) => onChange(v)} />
      case "course-details":
        return <CourseDetailsEditor value={value} onChange={(details) => onChange(details)} />
      case "select":
        return (
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          >
            {(field.options ?? []).map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )
      case "json":
        return (
          <Textarea
            value={typeof value === "string" ? value : JSON.stringify(value ?? {}, null, 2)}
            onChange={(e) => onChange(e.target.value)}
            rows={8}
            className="font-mono text-xs"
            placeholder={field.placeholder ?? "{}"}
          />
        )
      case "lines":
        return (
          <Textarea
            value={Array.isArray(value) ? value.join("\n") : String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            placeholder={field.placeholder ?? "One item per line"}
          />
        )
      case "number":
        return <Input type="number" value={Number(value ?? 0)} onChange={(e) => onChange(Number(e.target.value))} />
      case "boolean":
        return <Switch checked={Boolean(value)} onCheckedChange={onChange} />
      case "image":
        return (
          <ImagePicker
            value={String(value ?? "")}
            onChange={(v) => onChange(v)}
            label={field.label}
            uploadPreset={field.imagePreset ?? "general"}
          />
        )
      case "password":
        return <Input type="password" autoComplete="new-password" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />
      default:
        return <Input value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} required={field.required && !(field.editOptional && !isNew)} />
    }
  }

  const displayField = fields[0]?.key ?? "name"
  const editSlug = editing ? String(editing[slugField] ?? "") : ""
  const editPath = seoEntity ? `${seoEntity.pathPrefix}${editSlug || "your-slug"}` : ""
  const canSort = sortable && rows.every((r) => r.id != null)

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
          {canSort && (
            <p className="text-xs text-muted-foreground mt-1">Drag rows to reorder.</p>
          )}
        </div>
        <Button onClick={startNew} className="gap-1.5 shrink-0">
          <Plus className="h-4 w-4" /> Add New
        </Button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}
      {error && <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>}

      {editing && (
        <div className="bg-card border border-primary/30 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{isNew ? "Add New" : "Edit"}</h2>
            <Button variant="ghost" size="icon" onClick={() => setEditing(null)}><X className="h-4 w-4" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={`space-y-2 ${fieldClass(field)}`}>
                {field.type !== "image" && field.type !== "color" && field.type !== "course-details" && (
                  <Label>{field.label}</Label>
                )}
                {renderField(field, editing[field.key], (val) => {
                  const next = { ...editing, [field.key]: val }
                  setEditing(next)
                  if (seoEntity && (field.key === slugField || field.key === titleField || field.key === descField || field.key === imageField)) {
                    loadEntitySeoForRow(next)
                  }
                })}
              </div>
            ))}
          </div>
          {seoEntity && (
            <SeoFieldsPanel
              seo={entitySeo}
              onChange={(patch) => setEntitySeo((prev) => ({ ...prev, ...patch }))}
              path={editPath}
              showHeading
              headingLevel={titleHeading}
              onHeadingChange={setTitleHeading}
            />
          )}
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {rows.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 text-sm">No items yet. Click &quot;Add New&quot; to create one.</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={rows.map((r) => String(r.id))} strategy={verticalListSortingStrategy}>
                {rows.map((row) => (
                  <SortableListItem key={String(row.id)} id={String(row.id)}>
                    {({ attributes, listeners }) => (
                      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0">
                        <div className="flex items-center gap-3 min-w-0">
                          {canSort && (
                            <button
                              type="button"
                              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0"
                              aria-label="Drag to reorder"
                              {...attributes}
                              {...listeners}
                            >
                              <GripVertical className="h-4 w-4" />
                            </button>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">{String(row[displayField] ?? "Untitled")}</p>
                            {fields[1] && <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-md">{String(row[fields[1].key] ?? "")}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {seoEntity && Boolean(row[slugField]) && (
                            <Link href={`/admin/seo/entity/${seoEntity.type}/${String(row[slugField])}`}>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Search className="h-3.5 w-3.5" /> SEO
                              </Button>
                            </Link>
                          )}
                          <Button variant="outline" size="sm" onClick={() => startEdit(row)} className="gap-1">
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(String(row.id))} className="text-destructive hover:text-destructive gap-1">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </SortableListItem>
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}
    </div>
  )
}
