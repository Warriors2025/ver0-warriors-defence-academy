"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminTestimonialsPage() {
  return (
    <EntityManager
      title="Testimonials"
      description="Manage student testimonials on the homepage."
      apiPath="/api/admin/testimonials"
      emptyRow={{ name: "", achievement: "", course: "", content: "", rating: 5, image_url: "", sort_order: 0, is_active: true }}
      fields={[
        { key: "name", label: "Student Name", type: "text", required: true },
        { key: "achievement", label: "Achievement", type: "text" },
        { key: "course", label: "Course", type: "text" },
        { key: "content", label: "Testimonial", type: "textarea", required: true },
        { key: "image_url", label: "Student Photo", type: "image", imagePreset: "general" },
        { key: "rating", label: "Rating (1-5)", type: "number" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_active", label: "Active", type: "boolean" },
      ]}
    />
  )
}
