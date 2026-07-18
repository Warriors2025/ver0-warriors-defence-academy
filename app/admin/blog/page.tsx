"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminBlogPage() {
  return (
    <EntityManager
      title="Blog Posts"
      description="Create and publish blog articles with a rich text editor."
      apiPath="/api/admin/blog"
      sortable={false}
      emptyRow={{
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "general",
        tags: "",
        image_url: "",
        author: "Warriors Defence Academy",
        read_time: "5 min read",
        is_featured: false,
        is_published: false,
      }}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "slug", label: "URL Slug", type: "text", required: true, placeholder: "nda-preparation-guide" },
        { key: "excerpt", label: "Excerpt", type: "textarea" },
        { key: "content", label: "Content", type: "richtext", placeholder: "Write your article…" },
        { key: "category", label: "Category", type: "text" },
        { key: "tags", label: "Tags (one per line)", type: "lines", placeholder: "NDA\nSSB\nExam Guide" },
        { key: "image_url", label: "Featured Image", type: "image", imagePreset: "blog" },
        { key: "author", label: "Author", type: "text" },
        { key: "read_time", label: "Read Time", type: "text", placeholder: "8 min read" },
        { key: "is_featured", label: "Featured", type: "boolean" },
        { key: "is_published", label: "Published", type: "boolean" },
      ]}
      seoEntity={{ type: "blog", pathPrefix: "/blog/", descField: "excerpt" }}
    />
  )
}
