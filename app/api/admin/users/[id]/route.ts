import { NextRequest, NextResponse } from "next/server"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { updateAdminUser, deleteAdminUser } from "@/lib/admin-users"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const { id } = await params
  try {
    const body = await req.json()
    if (body.password && String(body.password).length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }
    const item = await updateAdminUser(id, {
      email: body.email,
      name: body.name,
      password: body.password || undefined,
      is_active: body.is_active,
    })
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const { id } = await params
  try {
    await deleteAdminUser(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
