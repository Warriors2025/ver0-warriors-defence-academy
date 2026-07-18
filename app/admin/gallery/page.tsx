"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminGalleryPage() {
  return (
    <EntityManager
      title="Gallery"
      description="Manage photos and videos shown on the gallery page."
      apiPath="/api/admin/gallery"
      emptyRow={{
        title: "",
        alt: "",
        image_url: "",
        description: "",
        category: "general",
        media_type: "image",
        video_url: "",
        sort_order: 0,
        is_active: true,
      }}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "alt", label: "Alt Text", type: "text", required: true },
        {
          key: "media_type",
          label: "Media Type",
          type: "select",
          options: [
            { label: "Image", value: "image" },
            { label: "Video", value: "video" },
          ],
        },
        { key: "image_url", label: "Image / Thumbnail", type: "image", required: true, imagePreset: "gallery" },
        { key: "video_url", label: "Video URL (YouTube or direct)", type: "text", placeholder: "https://www.youtube.com/watch?v=..." },
        { key: "description", label: "Description", type: "textarea" },
        { key: "category", label: "Category", type: "text", placeholder: "campus, training, events" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_active", label: "Active", type: "boolean" },
      ]}
    />
  )
}
