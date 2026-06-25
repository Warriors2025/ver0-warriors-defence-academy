export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export type ToolAction = {
  tool: string
  summary: string
}

export type AiProvider = "google" | "anthropic"
