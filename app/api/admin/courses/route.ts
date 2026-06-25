import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { listRows, createRow } from "@/lib/admin-crud"

function normalizeCourseBody(body: Record<string, unknown>) {
  const row = { ...body }
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

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const items = await listRows("courses")
    return NextResponse.json({ items })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to load courses" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const body = normalizeCourseBody(await req.json())
    const item = await createRow("courses", body)
    revalidatePath("/courses")
    revalidatePath(`/courses/${body.slug}`)
    revalidatePath("/")
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to create course" }, { status: 500 })
  }
}
