import bcrypt from "bcryptjs"
import { createServerClient } from "@/lib/supabase"

export type AdminUser = {
  id: string
  email: string
  name: string
  is_active: boolean
  created_at?: string
}

export async function verifyAdminUser(email: string, password: string): Promise<AdminUser | null> {
  try {
    const db = createServerClient()
    const { data, error } = await db
      .from("admin_users" as "mentors")
      .select("id, email, name, password_hash, is_active")
      .eq("email", email.toLowerCase().trim())
      .eq("is_active", true)
      .maybeSingle()

    if (error || !data) return null

    const valid = await bcrypt.compare(password, data.password_hash as string)
    if (!valid) return null

    return {
      id: data.id as string,
      email: data.email as string,
      name: data.name as string,
      is_active: Boolean(data.is_active),
    }
  } catch {
    return null
  }
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  const db = createServerClient()
  const { data, error } = await db.from("admin_users" as "mentors").select("id, email, name, is_active, created_at").order("created_at")
  if (error) throw error
  return (data ?? []) as AdminUser[]
}

export async function createAdminUser(input: {
  email: string
  name: string
  password: string
  is_active?: boolean
}) {
  const db = createServerClient()
  const password_hash = await bcrypt.hash(input.password, 12)
  const { data, error } = await db
    .from("admin_users" as "mentors")
    .insert({
      email: input.email.toLowerCase().trim(),
      name: input.name.trim(),
      password_hash,
      is_active: input.is_active ?? true,
    })
    .select("id, email, name, is_active, created_at")
    .single()
  if (error) throw error
  return data as AdminUser
}

export async function updateAdminUser(
  id: string,
  input: { email?: string; name?: string; password?: string; is_active?: boolean }
) {
  const db = createServerClient()
  const row: Record<string, unknown> = {}
  if (input.email) row.email = input.email.toLowerCase().trim()
  if (input.name) row.name = input.name.trim()
  if (input.password) row.password_hash = await bcrypt.hash(input.password, 12)
  if (input.is_active !== undefined) row.is_active = input.is_active

  const { data, error } = await db.from("admin_users" as "mentors").update(row).eq("id", id).select("id, email, name, is_active, created_at").single()
  if (error) throw error
  return data as AdminUser
}

export async function deleteAdminUser(id: string) {
  const db = createServerClient()
  const { error } = await db.from("admin_users" as "mentors").delete().eq("id", id)
  if (error) throw error
}
