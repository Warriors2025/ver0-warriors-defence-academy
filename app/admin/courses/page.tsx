"use client"

import Link from "next/link"
import { EntityManager } from "@/components/admin/entity-manager"

const DETAILS_TEMPLATE = `{
  "eligibility": ["Age 16.5–19.5 years", "Passed 10+2"],
  "syllabus": [{ "title": "Mathematics", "topics": ["Algebra", "Trigonometry"] }],
  "benefits": ["Expert faculty", "Mock tests"],
  "fee": "₹85,000",
  "batchStart": "April 2025",
  "examPattern": [{ "section": "Math", "marks": "300", "time": "2.5 hrs" }]
}`

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
        <p className="font-semibold mb-1">How to edit course pages</p>
        <ul className="list-disc list-inside space-y-1 text-blue-800">
          <li>Click <strong>Edit</strong> on any course below to change title, image, duration, features, and full syllabus.</li>
          <li>Use the <strong>Full Details (JSON)</strong> field for eligibility, syllabus, fees, and exam pattern.</li>
          <li>Edit the Courses listing page hero/stats under <Link href="/admin/site-pages" className="underline font-medium">Site Pages → Courses</Link>.</li>
        </ul>
      </div>
      <EntityManager
      title="Courses"
      description="Manage all defence coaching programmes — titles, images, syllabus, and fees."
      apiPath="/api/admin/courses"
      emptyRow={{
        slug: "",
        title: "",
        tagline: "",
        short_description: "",
        duration: "",
        students: "",
        rating: 4.8,
        badge: "",
        badge_color: "",
        category: "officer",
        image_url: "",
        features: "",
        details: DETAILS_TEMPLATE,
        highlights: "",
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "slug", label: "URL Slug", type: "text", required: true, placeholder: "nda-foundation" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "short_description", label: "Description", type: "textarea" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "students", label: "Students Count", type: "text", placeholder: "500+" },
        { key: "rating", label: "Rating", type: "number" },
        { key: "badge", label: "Badge", type: "text", placeholder: "Popular" },
        { key: "badge_color", label: "Badge CSS Classes", type: "text", placeholder: "bg-accent text-accent-foreground" },
        { key: "category", label: "Category", type: "text", placeholder: "officer | soldier | specialist" },
        { key: "image_url", label: "Course Image", type: "image", imagePreset: "course" },
        { key: "features", label: "Features (one per line)", type: "lines" },
        { key: "highlights", label: "Highlights (one per line)", type: "lines" },
        { key: "details", label: "Full Details (JSON)", type: "json", placeholder: DETAILS_TEMPLATE },
        { key: "is_active", label: "Active", type: "boolean" },
        { key: "sort_order", label: "Sort Order", type: "number" },
      ]}
      seoEntity={{ type: "course", pathPrefix: "/courses/", descField: "short_description" }}
    />
    </div>
  )
}
