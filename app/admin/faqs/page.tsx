"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminFaqsPage() {
  return (
    <EntityManager
      title="FAQs"
      description="Manage frequently asked questions on the homepage."
      apiPath="/api/admin/faqs"
      emptyRow={{ question: "", answer: "", sort_order: 0, is_active: true }}
      fields={[
        { key: "question", label: "Question", type: "text", required: true },
        { key: "answer", label: "Answer", type: "textarea", required: true },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_active", label: "Active", type: "boolean" },
      ]}
    />
  )
}
