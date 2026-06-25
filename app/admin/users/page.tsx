"use client"

import { EntityManager } from "@/components/admin/entity-manager"

export default function AdminUsersPage() {
  return (
    <EntityManager
      title="Admin Users"
      description="Add dashboard login accounts for your team. Passwords are stored securely (hashed)."
      apiPath="/api/admin/users"
      emptyRow={{ name: "", email: "", password: "", is_active: true }}
      fields={[
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "email", label: "Email", type: "text", required: true, placeholder: "admin@warriorsdefenceacademy.com" },
        { key: "password", label: "Password", type: "password", required: true, editOptional: true, placeholder: "Min. 8 characters (leave blank when editing to keep current)" },
        { key: "is_active", label: "Active", type: "boolean" },
      ]}
    />
  )
}
