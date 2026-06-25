import { NextRequest, NextResponse } from "next/server"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import {
  getAiConnectionStatus,
  saveAiSettings,
  clearStoredApiKey,
} from "@/lib/ai/config"
import { testClaudeConnection, testGeminiConnection } from "@/lib/ai/agent"
import type { AiProvider } from "@/lib/ai/types"

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  const status = await getAiConnectionStatus()
  return NextResponse.json(status)
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()
  try {
    const body = await req.json()
    const provider = (body.provider === "anthropic" ? "anthropic" : "google") as AiProvider
    const apiKey = String(body.apiKey ?? "").trim()
    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    const test = provider === "google"
      ? await testGeminiConnection(apiKey)
      : await testClaudeConnection(apiKey)

    if (!test.ok) {
      return NextResponse.json({ error: test.error || "Invalid API key or connection failed" }, { status: 400 })
    }

    if (provider === "google") {
      await saveAiSettings({
        ai_provider: "google",
        google_api_key: apiKey,
        ...(body.model ? { google_model: String(body.model) } : {}),
      })
    } else {
      await saveAiSettings({
        ai_provider: "anthropic",
        anthropic_api_key: apiKey,
        ...(body.model ? { anthropic_model: String(body.model) } : {}),
      })
    }

    const status = await getAiConnectionStatus()
    return NextResponse.json({ success: true, ...status })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to save API key" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()

  const providerParam = req.nextUrl.searchParams.get("provider")
  const status = await getAiConnectionStatus()
  const provider = (providerParam === "anthropic" || providerParam === "google"
    ? providerParam
    : status.provider) as AiProvider | null

  if (!provider) {
    return NextResponse.json({ error: "No AI provider is connected." }, { status: 400 })
  }

  if (provider === "google" && (process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY)) {
    return NextResponse.json({
      error: "Google key is set via GOOGLE_AI_API_KEY or GEMINI_API_KEY in .env.local. Remove it there to disconnect.",
    }, { status: 400 })
  }

  if (provider === "anthropic" && process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      error: "API key is set via ANTHROPIC_API_KEY in .env.local. Remove it from .env.local to disconnect.",
    }, { status: 400 })
  }

  await clearStoredApiKey(provider)
  return NextResponse.json({ success: true, ...(await getAiConnectionStatus()) })
}
