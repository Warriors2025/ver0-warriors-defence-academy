"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrayEditor } from "@/components/admin/array-editor"

export type CourseDetailsValue = {
  eligibility: string[]
  syllabus: { title: string; topics: string[] }[]
  benefits: string[]
  fee: string
  batchStart: string
  examPattern: { section: string; marks: string; time: string }[]
}

const EMPTY: CourseDetailsValue = {
  eligibility: [],
  syllabus: [],
  benefits: [],
  fee: "",
  batchStart: "",
  examPattern: [],
}

function parseDetails(raw: unknown): CourseDetailsValue {
  if (!raw) return { ...EMPTY }
  let obj: Record<string, unknown> = {}
  if (typeof raw === "string") {
    try {
      obj = JSON.parse(raw || "{}")
    } catch {
      return { ...EMPTY }
    }
  } else if (typeof raw === "object") {
    obj = raw as Record<string, unknown>
  }
  return {
    eligibility: Array.isArray(obj.eligibility) ? (obj.eligibility as string[]) : [],
    syllabus: Array.isArray(obj.syllabus) ? (obj.syllabus as CourseDetailsValue["syllabus"]) : [],
    benefits: Array.isArray(obj.benefits) ? (obj.benefits as string[]) : [],
    fee: String(obj.fee ?? ""),
    batchStart: String(obj.batchStart ?? ""),
    examPattern: Array.isArray(obj.examPattern) ? (obj.examPattern as CourseDetailsValue["examPattern"]) : [],
  }
}

type Props = {
  value: unknown
  onChange: (details: CourseDetailsValue) => void
}

export function CourseDetailsEditor({ value, onChange }: Props) {
  const details = parseDetails(value)

  function patch(partial: Partial<CourseDetailsValue>) {
    onChange({ ...details, ...partial })
  }

  return (
    <div className="space-y-5 sm:col-span-2 border border-border rounded-xl p-4 bg-muted/20">
      <p className="text-sm font-semibold">Course Details</p>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Fee</Label>
          <Input value={details.fee} onChange={(e) => patch({ fee: e.target.value })} placeholder="₹85,000" />
        </div>
        <div className="space-y-1.5">
          <Label>Batch Start</Label>
          <Input value={details.batchStart} onChange={(e) => patch({ batchStart: e.target.value })} placeholder="April 2025" />
        </div>
      </div>

      <ArrayEditor
        label="Eligibility"
        items={details.eligibility.map((text) => ({ text }))}
        onChange={(items) => patch({ eligibility: items.map((i) => String(i.text ?? "")) })}
        emptyItem={{ text: "" }}
        fields={[{ key: "text", label: "Requirement", placeholder: "Age 16.5–19.5 years" }]}
        itemLabel={(_, i) => `Requirement ${i + 1}`}
      />

      <ArrayEditor
        label="Syllabus"
        items={details.syllabus.map((s) => ({
          title: s.title,
          topics: Array.isArray(s.topics) ? s.topics.join("\n") : "",
        }))}
        onChange={(items) =>
          patch({
            syllabus: items.map((i) => ({
              title: String(i.title ?? ""),
              topics: String(i.topics ?? "")
                .split("\n")
                .map((t) => t.trim())
                .filter(Boolean),
            })),
          })
        }
        emptyItem={{ title: "", topics: "" }}
        fields={[
          { key: "title", label: "Subject", placeholder: "Mathematics" },
          { key: "topics", label: "Topics (one per line)", type: "textarea", placeholder: "Algebra\nTrigonometry" },
        ]}
        itemLabel={(item, i) => String(item.title || `Subject ${i + 1}`)}
      />

      <ArrayEditor
        label="Benefits"
        items={details.benefits.map((text) => ({ text }))}
        onChange={(items) => patch({ benefits: items.map((i) => String(i.text ?? "")) })}
        emptyItem={{ text: "" }}
        fields={[{ key: "text", label: "Benefit", placeholder: "Expert faculty" }]}
        itemLabel={(_, i) => `Benefit ${i + 1}`}
      />

      <ArrayEditor
        label="Exam Pattern"
        items={details.examPattern}
        onChange={(items) =>
          patch({
            examPattern: items.map((i) => ({
              section: String(i.section ?? ""),
              marks: String(i.marks ?? ""),
              time: String(i.time ?? ""),
            })),
          })
        }
        emptyItem={{ section: "", marks: "", time: "" }}
        fields={[
          { key: "section", label: "Section", placeholder: "Math" },
          { key: "marks", label: "Marks", placeholder: "300" },
          { key: "time", label: "Time", placeholder: "2.5 hrs" },
        ]}
        itemLabel={(item, i) => String(item.section || `Section ${i + 1}`)}
      />
    </div>
  )
}
