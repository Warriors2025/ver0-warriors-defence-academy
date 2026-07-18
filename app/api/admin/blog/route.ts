import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { listRows, createRow } from "@/lib/admin-crud"

function normalizeBlogBody(body: Record<string, unknown>) {
  const row = { ...body }
  if (typeof row.tags === "string") {
    row.tags = row.tags.split("\n").map((s) => s.trim()).filter(Boolean)
  }
  return row
}

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const items = await listRows("blog_posts", "created_at")
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: "Failed to load blog posts" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const body = normalizeBlogBody(await req.json())
    const item = await createRow("blog_posts", {
      ...body,
      published_at: body.is_published ? new Date().toISOString() : null,
    })
    revalidatePath("/blog")
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
