"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminMentorsPage() {
  return (
    <EntityManager
      title="Mentors"
      description="Manage the mentors shown on the homepage."
      apiPath="/api/admin/mentors"
      emptyRow={{ name: "", designation: "", expertise: "", experience: "", branch: "", initials: "", image_url: "", sort_order: 0, is_active: true }}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "designation", label: "Designation", type: "text" },
        { key: "expertise", label: "Expertise", type: "text" },
        { key: "experience", label: "Experience", type: "text" },
        { key: "branch", label: "Branch", type: "text" },
        { key: "initials", label: "Initials", type: "text" },
        { key: "image_url", label: "Photo", type: "image", imagePreset: "mentor" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_active", label: "Active", type: "boolean" },
      ]}
    />
  )
}
