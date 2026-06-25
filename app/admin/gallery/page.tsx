"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminGalleryPage() {
  return (
    <EntityManager
      title="Gallery"
      description="Manage photos shown on the gallery page."
      apiPath="/api/admin/gallery"
      emptyRow={{ title: "", alt: "", image_url: "", category: "general", sort_order: 0, is_active: true }}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "alt", label: "Alt Text", type: "text", required: true },
        { key: "image_url", label: "Image", type: "image", required: true, imagePreset: "gallery" },
        { key: "category", label: "Category", type: "text", placeholder: "campus, training, events" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_active", label: "Active", type: "boolean" },
      ]}
    />
  )
}
