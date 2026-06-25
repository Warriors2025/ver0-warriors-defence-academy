import { createServerClient } from "@/lib/supabase"

type Row = Record<string, unknown>

export async function listRows(tableName: string, orderBy = "sort_order") {
  const db = createServerClient()
  // Dynamic table access for admin CRUD across multiple entity types
  const query = db.from(tableName as "mentors")
  const { data, error } = await query.select("*").order(orderBy)
  if (error) throw error
  return (data ?? []) as Row[]
}

export async function createRow(tableName: string, row: Row) {
  const db = createServerClient()
  const { data, error } = await db.from(tableName as "mentors").insert(row as never).select("*").single()
  if (error) throw error
  return data as Row
}

export async function updateRow(tableName: string, id: string, row: Row) {
  const db = createServerClient()
  const { data, error } = await db.from(tableName as "mentors").update(row as never).eq("id", id).select("*").single()
  if (error) throw error
  return data as Row
}

export async function deleteRow(tableName: string, id: string) {
  const db = createServerClient()
  const { error } = await db.from(tableName as "mentors").delete().eq("id", id)
  if (error) throw error
}
