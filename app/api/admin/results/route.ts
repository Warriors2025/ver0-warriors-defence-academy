import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { listRows, createRow } from "@/lib/admin-crud"

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const items = await listRows("results")
    return NextResponse.json({ items })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to load results" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const body = await req.json()
    const item = await createRow("results", body)
    revalidatePath("/results")
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create result" }, { status: 500 })
  }
}
