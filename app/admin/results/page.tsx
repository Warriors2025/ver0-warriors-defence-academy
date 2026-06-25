"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminResultsPage() {
  return (
    <EntityManager
      title="Results & Selections"
      description="Manage student selection records shown on the Results page."
      apiPath="/api/admin/results"
      emptyRow={{
        student_name: "",
        exam: "NDA",
        rank: "",
        batch_year: "2025",
        branch: "Indian Army",
        image_url: "",
        is_featured: false,
        sort_order: 0,
      }}
      fields={[
        { key: "student_name", label: "Student Name", type: "text", required: true },
        { key: "exam", label: "Exam", type: "text", required: true, placeholder: "NDA, CDS, AFCAT..." },
        { key: "rank", label: "Rank", type: "text", placeholder: "AIR 12" },
        { key: "batch_year", label: "Year", type: "text", placeholder: "2025" },
        { key: "branch", label: "Branch", type: "text", placeholder: "Indian Army" },
        { key: "image_url", label: "Photo", type: "image", imagePreset: "mentor" },
        { key: "is_featured", label: "Featured (Top Ranker)", type: "boolean" },
        { key: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  )
}
