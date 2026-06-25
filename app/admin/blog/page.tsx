"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminBlogPage() {
  return (
    <EntityManager
      title="Blog Posts"
      description="Create and publish blog articles."
      apiPath="/api/admin/blog"
      emptyRow={{ title: "", slug: "", excerpt: "", content: "", category: "general", image_url: "", author: "Warriors Defence Academy", is_published: false }}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "slug", label: "URL Slug", type: "text", required: true, placeholder: "nda-preparation-guide" },
        { key: "excerpt", label: "Excerpt", type: "textarea" },
        { key: "content", label: "Content", type: "textarea" },
        { key: "category", label: "Category", type: "text" },
        { key: "image_url", label: "Featured Image", type: "image", imagePreset: "blog" },
        { key: "author", label: "Author", type: "text" },
        { key: "is_published", label: "Published", type: "boolean" },
      ]}
      seoEntity={{ type: "blog", pathPrefix: "/blog/", descField: "excerpt", authorField: "author" }}
    />
  )
}
