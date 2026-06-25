import { NextRequest, NextResponse } from "next/server"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { listAdminUsers, createAdminUser } from "@/lib/admin-users"

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const items = await listAdminUsers()
    return NextResponse.json({ items })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const body = await req.json()
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }
    if (String(body.password).length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }
    const item = await createAdminUser({
      email: body.email,
      name: body.name,
      password: body.password,
      is_active: body.is_active ?? true,
    })
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create user. Email may already exist." }, { status: 500 })
  }
}
