import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { updateRow, deleteRow } from "@/lib/admin-crud"

function normalizeCourseBody(body: Record<string, unknown>) {
  const row = { ...body }
  delete row.id
  delete row.created_at
  delete row.updated_at
  delete row.id
  if (typeof row.features === "string") {
    row.features = row.features.split("\n").map((s) => s.trim()).filter(Boolean)
  }
  if (typeof row.details === "string" && row.details.trim()) {
    try {
      row.details = JSON.parse(row.details)
    } catch {
      throw new Error("Invalid JSON in course details")
    }
  }
  if (typeof row.highlights === "string") {
    row.highlights = row.highlights.split("\n").map((s) => s.trim()).filter(Boolean)
  }
  return row
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const { id } = await params
  try {
    const body = normalizeCourseBody(await req.json())
    const item = await updateRow("courses", id, body)
    revalidatePath("/courses")
    if (body.slug) revalidatePath(`/courses/${body.slug}`)
    revalidatePath("/")
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const { id } = await params
  try {
    await deleteRow("courses", id)
    revalidatePath("/courses")
    revalidatePath("/")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
