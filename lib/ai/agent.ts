import Anthropic from "@anthropic-ai/sdk"
import { AI_TOOLS, executeAiTool } from "@/lib/ai/tools"
import { getActiveAiCredentials } from "@/lib/ai/config"
import { runGeminiAgent, testGeminiConnection } from "@/lib/ai/gemini-agent"
import { AI_SYSTEM_PROMPT, summarizeToolInput } from "@/lib/ai/system-prompt"
import type { ChatMessage, ToolAction } from "@/lib/ai/types"

export type { ChatMessage, ToolAction }

const DEFAULT_TEST_MODEL = "claude-sonnet-4-20250514"
const MAX_TOOL_ROUNDS = 12

function extractText(content: Anthropic.ContentBlock[]): string {
  return content.filter((b) => b.type === "text").map((b) => (b as Anthropic.TextBlock).text).join("\n")
}

async function runAnthropicAgent(history: ChatMessage[]): Promise<{
  reply: string
  toolActions: ToolAction[]
}> {
  const creds = await getActiveAiCredentials()
  if (!creds || creds.provider !== "anthropic") {
    throw new Error("Claude is not connected. Add your Anthropic API key in AI Assistant settings.")
  }

  const client = new Anthropic({ apiKey: creds.apiKey })
  const toolActions: ToolAction[] = []
  const messages: Anthropic.MessageParam[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }))

  let rounds = 0
  while (rounds < MAX_TOOL_ROUNDS) {
    rounds++
    const response = await client.messages.create({
      model: creds.model,
      max_tokens: 8192,
      system: AI_SYSTEM_PROMPT,
      tools: AI_TOOLS,
      messages,
    })

    if (response.stop_reason === "end_turn" || response.stop_reason === "max_tokens") {
      return { reply: extractText(response.content), toolActions }
    }

    if (response.stop_reason !== "tool_use") {
      return { reply: extractText(response.content) || "Done.", toolActions }
    }

    messages.push({ role: "assistant", content: response.content })

    const toolResults: Anthropic.ToolResultBlockParam[] = []
    for (const block of response.content) {
      if (block.type !== "tool_use") continue
      const result = await executeAiTool(block.name, block.input as Record<string, unknown>)
      toolActions.push({
        tool: block.name,
        summary: summarizeToolInput(block.name, block.input as Record<string, unknown>),
      })
      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: result,
      })
    }

    messages.push({ role: "user", content: toolResults })
  }

  return { reply: "I completed several steps but hit the tool limit. Check the dashboard for changes made.", toolActions }
}

export async function runAiAgent(history: ChatMessage[]): Promise<{
  reply: string
  toolActions: ToolAction[]
}> {
  const creds = await getActiveAiCredentials()
  if (!creds) {
    throw new Error("AI is not connected. Connect Google Gemini (free) or Claude in AI Assistant settings.")
  }
  if (creds.provider === "google") return runGeminiAgent(history)
  return runAnthropicAgent(history)
}

export async function testClaudeConnection(apiKey: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const client = new Anthropic({ apiKey })
    await client.messages.create({
      model: DEFAULT_TEST_MODEL,
      max_tokens: 32,
      messages: [{ role: "user", content: "Reply with OK only." }],
    })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Connection failed" }
  }
}

export { testGeminiConnection }
