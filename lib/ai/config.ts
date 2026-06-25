import { createServerClient } from "@/lib/supabase"

import type { AiProvider } from "@/lib/ai/types"

type AiSettings = {
  ai_provider?: AiProvider
  anthropic_api_key?: string
  anthropic_model?: string
  google_api_key?: string
  google_model?: string
}

export const DEFAULT_ANTHROPIC_MODEL = "claude-sonnet-4-20250514"
export const DEFAULT_GOOGLE_MODEL = "gemini-2.0-flash"

export async function getAiSettings(): Promise<AiSettings> {
  try {
    const db = createServerClient()
    const { data } = await db.from("site_content").select("settings").eq("id", 1).maybeSingle()
    return (data?.settings as AiSettings) ?? {}
  } catch {
    return {}
  }
}

function envProvider(): AiProvider | null {
  const explicit = process.env.AI_PROVIDER?.trim() as AiProvider | undefined
  if (explicit === "google" || explicit === "anthropic") return explicit
  if (process.env.GOOGLE_AI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim()) return "google"
  if (process.env.ANTHROPIC_API_KEY?.trim()) return "anthropic"
  return null
}

export async function getAiProvider(): Promise<AiProvider | null> {
  const env = envProvider()
  if (env) return env
  const settings = await getAiSettings()
  if (settings.ai_provider) return settings.ai_provider
  if (settings.google_api_key?.trim()) return "google"
  if (settings.anthropic_api_key?.trim()) return "anthropic"
  return null
}

export async function getAnthropicApiKey(): Promise<string | null> {
  const envKey = process.env.ANTHROPIC_API_KEY?.trim()
  if (envKey) return envKey
  const settings = await getAiSettings()
  return settings.anthropic_api_key?.trim() || null
}

export async function getGoogleApiKey(): Promise<string | null> {
  const envKey = process.env.GOOGLE_AI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim()
  if (envKey) return envKey
  const settings = await getAiSettings()
  return settings.google_api_key?.trim() || null
}

export async function getAnthropicModel(): Promise<string> {
  return process.env.ANTHROPIC_MODEL?.trim() || (await getAiSettings()).anthropic_model?.trim() || DEFAULT_ANTHROPIC_MODEL
}

export async function getGoogleModel(): Promise<string> {
  return process.env.GOOGLE_AI_MODEL?.trim() || process.env.GEMINI_MODEL?.trim() || (await getAiSettings()).google_model?.trim() || DEFAULT_GOOGLE_MODEL
}

export async function getActiveAiCredentials(): Promise<{
  provider: AiProvider
  apiKey: string
  model: string
  source: "env" | "dashboard"
} | null> {
  const provider = await getAiProvider()
  if (!provider) return null

  if (provider === "google") {
    const envKey = process.env.GOOGLE_AI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim()
    const dashboardKey = (await getAiSettings()).google_api_key?.trim()
    const apiKey = envKey || dashboardKey
    if (!apiKey) return null
    return {
      provider,
      apiKey,
      model: await getGoogleModel(),
      source: envKey ? "env" : "dashboard",
    }
  }

  const envKey = process.env.ANTHROPIC_API_KEY?.trim()
  const dashboardKey = (await getAiSettings()).anthropic_api_key?.trim()
  const apiKey = envKey || dashboardKey
  if (!apiKey) return null
  return {
    provider,
    apiKey,
    model: await getAnthropicModel(),
    source: envKey ? "env" : "dashboard",
  }
}

export async function saveAiSettings(patch: AiSettings) {
  const db = createServerClient()
  const current = await getAiSettings()
  const settings = { ...current, ...patch }
  await db.from("site_content").update({ settings, updated_at: new Date().toISOString() }).eq("id", 1)
}

export async function clearStoredApiKey(provider: AiProvider) {
  const settings = await getAiSettings()
  if (provider === "google") {
    delete settings.google_api_key
  } else {
    delete settings.anthropic_api_key
  }
  if (settings.ai_provider === provider) delete settings.ai_provider
  await saveAiSettings(settings)
}

export function maskApiKey(key: string) {
  if (key.length <= 8) return "••••••••"
  return `${key.slice(0, 7)}••••${key.slice(-4)}`
}

export async function getAiConnectionStatus() {
  const creds = await getActiveAiCredentials()
  if (!creds) {
    return {
      connected: false,
      provider: null as AiProvider | null,
      model: null as string | null,
      source: null as "env" | "dashboard" | null,
      keyHint: null as string | null,
      providerLabel: null as string | null,
    }
  }

  return {
    connected: true,
    provider: creds.provider,
    model: creds.model,
    source: creds.source,
    keyHint: maskApiKey(creds.apiKey),
    providerLabel: creds.provider === "google" ? "Google Gemini" : "Claude (Anthropic)",
  }
}

/** Backward-compatible helper used by chat route. */
export async function getAnthropicApiKeyOrAny(): Promise<string | null> {
  const creds = await getActiveAiCredentials()
  return creds?.apiKey ?? null
}
