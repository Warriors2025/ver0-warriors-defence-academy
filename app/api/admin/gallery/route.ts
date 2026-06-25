import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { listRows, createRow } from "@/lib/admin-crud"

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const items = await listRows("gallery_images")
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const item = await createRow("gallery_images", await req.json())
    revalidatePath("/gallery")
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: "Failed to create image" }, { status: 500 })
  }
}
