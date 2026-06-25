import { GoogleGenAI, type Content, type Part } from "@google/genai"
import { AI_TOOLS, executeAiTool } from "@/lib/ai/tools"
import { getActiveAiCredentials } from "@/lib/ai/config"
import { AI_SYSTEM_PROMPT, summarizeToolInput } from "@/lib/ai/system-prompt"
import type { ChatMessage, ToolAction } from "@/lib/ai/types"

const MAX_TOOL_ROUNDS = 12
const DEFAULT_GOOGLE_MODEL = "gemini-2.0-flash"

const GEMINI_TOOLS = [{
  functionDeclarations: AI_TOOLS.map((tool) => ({
    name: tool.name,
    description: tool.description,
    parametersJsonSchema: tool.input_schema,
  })),
}]

export async function testGeminiConnection(apiKey: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const ai = new GoogleGenAI({ apiKey })
    await ai.models.generateContent({
      model: DEFAULT_GOOGLE_MODEL,
      contents: "Reply with OK only.",
    })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Connection failed" }
  }
}

export async function runGeminiAgent(history: ChatMessage[]): Promise<{
  reply: string
  toolActions: ToolAction[]
}> {
  const creds = await getActiveAiCredentials()
  if (!creds || creds.provider !== "google") {
    throw new Error("Google Gemini is not connected. Set up your free API key in AI Assistant settings.")
  }

  const ai = new GoogleGenAI({ apiKey: creds.apiKey })
  const toolActions: ToolAction[] = []
  const contents: Content[] = history.map((message) => ({
    role: message.role === "user" ? "user" : "model",
    parts: [{ text: message.content }],
  }))

  let rounds = 0
  while (rounds < MAX_TOOL_ROUNDS) {
    rounds++
    const response = await ai.models.generateContent({
      model: creds.model,
      contents,
      config: {
        systemInstruction: AI_SYSTEM_PROMPT,
        tools: GEMINI_TOOLS,
      },
    })

    const calls = response.functionCalls
    if (!calls?.length) {
      return { reply: response.text?.trim() || "Done.", toolActions }
    }

    const modelContent = response.candidates?.[0]?.content
    if (modelContent) contents.push(modelContent)

    const responseParts: Part[] = []
    for (const call of calls) {
      if (!call.name) continue
      const args = (call.args ?? {}) as Record<string, unknown>
      const result = await executeAiTool(call.name, args)
      toolActions.push({ tool: call.name, summary: summarizeToolInput(call.name, args) })
      responseParts.push({
        functionResponse: {
          id: call.id,
          name: call.name,
          response: { output: result },
        },
      })
    }

    contents.push({ role: "user", parts: responseParts })
  }

  return {
    reply: "I completed several steps but hit the tool limit. Check the dashboard for changes made.",
    toolActions,
  }
}
