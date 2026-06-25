import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { updateRow, deleteRow } from "@/lib/admin-crud"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const { id } = await params
  try {
    const item = await updateRow("gallery_images", id, await req.json())
    revalidatePath("/gallery")
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const { id } = await params
  try {
    await deleteRow("gallery_images", id)
    revalidatePath("/gallery")
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
