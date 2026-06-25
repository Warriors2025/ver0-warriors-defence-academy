import { NextRequest, NextResponse } from "next/server"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import { runAiAgent, type ChatMessage } from "@/lib/ai/agent"
import { getActiveAiCredentials } from "@/lib/ai/config"

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  if (!(await getActiveAiCredentials())) {
    return NextResponse.json({ error: "AI is not connected. Connect Google Gemini (free) or Claude first." }, { status: 400 })
  }
  try {
    const body = await req.json()
    const messages = body.messages as ChatMessage[]
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array is required" }, { status: 400 })
    }
    const last = messages[messages.length - 1]
    if (last.role !== "user" || !last.content?.trim()) {
      return NextResponse.json({ error: "Last message must be a user message" }, { status: 400 })
    }
    const result = await runAiAgent(messages)
    return NextResponse.json(result)
  } catch (err) {
    console.error("AI chat error:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI request failed" },
      { status: 500 }
    )
  }
}
