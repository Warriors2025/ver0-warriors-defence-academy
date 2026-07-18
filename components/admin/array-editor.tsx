"use client"

import { Plus, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePicker } from "@/components/admin/image-picker"
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

export type ArrayFieldDef = {
  key: string
  label: string
  type?: "text" | "textarea" | "number" | "image" | "lines"
  placeholder?: string
  imagePreset?: import("@/lib/image-presets").ImagePreset
}

type ArrayEditorProps<T extends Record<string, unknown>> = {
  label: string
  items: T[]
  onChange: (items: T[]) => void
  fields: ArrayFieldDef[]
  emptyItem: T
  itemLabel?: (item: T, index: number) => string
}

function SortableRow<T extends Record<string, unknown>>({
  id,
  item,
  index,
  fields,
  itemLabel,
  onUpdate,
  onRemove,
}: {
  id: string
  item: T
  index: number
  fields: ArrayFieldDef[]
  itemLabel?: (item: T, index: number) => string
  onUpdate: (key: string, value: unknown) => void
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="border border-border rounded-lg p-4 space-y-3 bg-background">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0"
            aria-label="Drag to reorder"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <span className="text-xs font-semibold text-muted-foreground truncate">
            {itemLabel?.(item, index) ?? `Item ${index + 1}`}
          </span>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove} className="text-destructive hover:text-destructive shrink-0">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {fields.map((field) => {
          const value = item[field.key]
          const span = field.type === "textarea" || field.type === "image" || field.type === "lines" ? "sm:col-span-2" : ""
          return (
            <div key={field.key} className={`space-y-1.5 ${span}`}>
              {field.type !== "image" && <Label className="text-xs">{field.label}</Label>}
              {field.type === "image" ? (
                <ImagePicker
                  value={String(value ?? "")}
                  onChange={(v) => onUpdate(field.key, v)}
                  label={field.label}
                  uploadPreset={field.imagePreset ?? "general"}
                />
              ) : field.type === "textarea" || field.type === "lines" ? (
                <Textarea
                  value={
                    field.type === "lines" && Array.isArray(value)
                      ? value.join("\n")
                      : String(value ?? "")
                  }
                  onChange={(e) =>
                    onUpdate(
                      field.key,
                      field.type === "lines"
                        ? e.target.value.split("\n").filter(Boolean)
                        : e.target.value
                    )
                  }
                  rows={field.type === "lines" ? 3 : 2}
                  placeholder={field.placeholder}
                />
              ) : field.type === "number" ? (
                <Input
                  type="number"
                  value={Number(value ?? 0)}
                  onChange={(e) => onUpdate(field.key, Number(e.target.value))}
                  placeholder={field.placeholder}
                />
              ) : (
                <Input
                  value={String(value ?? "")}
                  onChange={(e) => onUpdate(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ArrayEditor<T extends Record<string, unknown>>({
  label,
  items,
  onChange,
  fields,
  emptyItem,
  itemLabel,
}: ArrayEditorProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const ids = items.map((_, i) => `item-${i}`)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = ids.indexOf(String(active.id))
    const newIndex = ids.indexOf(String(over.id))
    if (oldIndex < 0 || newIndex < 0) return
    onChange(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => onChange([...items, { ...emptyItem }])}
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((item, index) => (
              <SortableRow
                key={ids[index]}
                id={ids[index]}
                item={item}
                index={index}
                fields={fields}
                itemLabel={itemLabel}
                onUpdate={(key, value) => {
                  const next = [...items]
                  next[index] = { ...next[index], [key]: value }
                  onChange(next)
                }}
                onRemove={() => onChange(items.filter((_, i) => i !== index))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4 border border-dashed border-border rounded-lg">
          No items yet. Click Add to create one.
        </p>
      )}
    </div>
  )
}
