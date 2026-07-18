"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const PRESETS = [
  { label: "Accent", value: "bg-accent text-accent-foreground" },
  { label: "Primary", value: "bg-primary text-primary-foreground" },
  { label: "Emerald", value: "bg-emerald-600 text-white" },
  { label: "Amber", value: "bg-amber-500 text-white" },
  { label: "Rose", value: "bg-rose-600 text-white" },
  { label: "Sky", value: "bg-sky-600 text-white" },
  { label: "Violet", value: "bg-violet-600 text-white" },
  { label: "Slate", value: "bg-slate-700 text-white" },
]

type Props = {
  label?: string
  value: string
  onChange: (value: string) => void
}

export function ColorPickerField({ label = "Badge Color", value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            type="button"
            title={p.label}
            onClick={() => onChange(p.value)}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium border transition-all",
              p.value,
              value === p.value ? "ring-2 ring-offset-1 ring-primary" : "opacity-80 hover:opacity-100"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste custom Tailwind classes"
        className="font-mono text-xs"
      />
      {value && (
        <span className={cn("inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-semibold", value)}>
          Preview badge
        </span>
      )}
    </div>
  )
}
