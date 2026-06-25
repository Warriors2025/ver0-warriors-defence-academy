import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { updateRow, deleteRow } from "@/lib/admin-crud"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const { id } = await params
  try {
    const body = await req.json()
    const item = await updateRow("admission_batches", id, body)
    revalidatePath("/admissions")
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update batch" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const { id } = await params
  try {
    await deleteRow("admission_batches", id)
    revalidatePath("/admissions")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete batch" }, { status: 500 })
  }
}
