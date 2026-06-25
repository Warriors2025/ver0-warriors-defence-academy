"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminAdmissionsPage() {
  return (
    <EntityManager
      title="Admission Batches"
      description="Manage upcoming batch dates shown on the Admissions page."
      apiPath="/api/admin/admissions"
      emptyRow={{
        course_name: "",
        start_date: "",
        seats_left: "",
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: "course_name", label: "Course Name", type: "text", required: true },
        { key: "start_date", label: "Start Date", type: "text", placeholder: "April 15, 2025" },
        { key: "seats_left", label: "Seats Left", type: "text", placeholder: "10 seats left" },
        { key: "is_active", label: "Active", type: "boolean" },
        { key: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  )
}
