import { NextRequest, NextResponse } from "next/server"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { getTrackingTags, normalizeTrackingTags, saveTrackingTags } from "@/lib/tracking"

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const tags = await getTrackingTags()
  return NextResponse.json(tags)
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const body = await req.json()
    const tags = await saveTrackingTags(normalizeTrackingTags(body))
    return NextResponse.json({ success: true, ...tags })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to save tracking tags" }, { status: 500 })
  }
}
