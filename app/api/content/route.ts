import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const content = getSiteContent()
  return NextResponse.json(content)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await req.json() as Partial<SiteContent>
    const current = getSiteContent()
    const updated: SiteContent = { ...current, ...body }
    saveSiteContent(updated)
    return NextResponse.json({ success: true, updatedAt: new Date().toISOString() })
  } catch (err) {
    console.error("Content save error:", err)
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
  }
}
