"use client"

import { useState, useEffect, useRef } from "react"
import {
  Bot, Send, Loader2, Sparkles, Unplug, CheckCircle, Wrench,
  ExternalLink, Info, KeyRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { AiProvider } from "@/lib/ai/types"

type Message = { role: "user" | "assistant"; content: string; toolActions?: { tool: string; summary: string }[] }

type ConnectionStatus = {
  connected: boolean
  provider?: AiProvider | null
  model?: string | null
  source?: string | null
  keyHint?: string | null
  providerLabel?: string | null
}

const SUGGESTIONS = [
  "Optimize SEO for the homepage — title, description, and schema",
  "Write and publish a new blog post about NDA 2026 preparation tips",
  "Update the homepage hero headline and tagline for admissions 2026–27",
  "Improve meta descriptions for all course pages",
  "Create SEO meta for the About page with focus keyword 'NDA coaching Lucknow'",
  "List all blog posts and suggest SEO improvements",
]

const SETUP = {
  google: {
    label: "Google Gemini",
    badge: "Free · Recommended",
    keyPlaceholder: "AIza...",
    consoleUrl: "https://aistudio.google.com/apikey",
    consoleLabel: "Open Google AI Studio",
    steps: [
      "Click Open Google AI Studio below",
      "Sign in with your Google account (Gmail)",
      "Click Create API key → copy the key",
      "Paste it here and click Connect",
    ],
    note: "Google gives a free tier — no credit card required for basic use. One key powers the whole admin team.",
  },
  anthropic: {
    label: "Claude (Anthropic)",
    badge: "Paid API",
    keyPlaceholder: "sk-ant-api03-...",
    consoleUrl: "https://console.anthropic.com/settings/keys",
    consoleLabel: "Open Anthropic Console",
    steps: [
      "Create an account at console.anthropic.com",
      "Add billing or use any free trial credits",
      "Create an API key and copy it",
      "Paste it here and click Connect",
    ],
    note: "Claude.ai Pro/Max website login cannot be used here — Anthropic only allows official API keys for website integrations.",
  },
} as const

export function AiAssistant() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [providerTab, setProviderTab] = useState<AiProvider>("google")
  const [apiKey, setApiKey] = useState("")
  const [connecting, setConnecting] = useState(false)
  const [connectError, setConnectError] = useState("")
  const [chatLog, setChatLog] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  function loadStatus() {
    fetch("/api/admin/ai/config", { credentials: "include" })
      .then((r) => r.json())
      .then((data: ConnectionStatus) => {
        setStatus(data)
        if (data.provider) setProviderTab(data.provider)
      })
      .catch(() => setStatus({ connected: false }))
  }

  useEffect(() => { loadStatus() }, [])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [chatLog, sending])

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault()
    setConnecting(true)
    setConnectError("")
    try {
      const res = await fetch("/api/admin/ai/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ provider: providerTab, apiKey }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Connection failed")
      setApiKey("")
      setStatus(data)
    } catch (err) {
      setConnectError(err instanceof Error ? err.message : "Connection failed")
    } finally {
      setConnecting(false)
    }
  }

  async function handleDisconnect() {
    const res = await fetch(`/api/admin/ai/config?provider=${status?.provider ?? providerTab}`, {
      method: "DELETE",
      credentials: "include",
    })
    const data = await res.json()
    if (!res.ok) {
      setConnectError(data.error || "Could not disconnect")
      return
    }
    setConnectError("")
    loadStatus()
  }

  async function sendMessage(text: string) {
    if (!text.trim() || sending) return
    setError("")
    const userMsg: Message = { role: "user", content: text.trim() }
    const apiMessages = [...chatLog, userMsg].map(({ role, content }) => ({ role, content }))
    setChatLog((prev) => [...prev, userMsg])
    setInput("")
    setSending(true)
    try {
      const res = await fetch("/api/admin/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ messages: apiMessages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Request failed")
      setChatLog((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, toolActions: data.toolActions },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSending(false)
    }
  }

  const connected = status?.connected
  const setup = SETUP[providerTab]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" /> AI Assistant
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Automate SEO, content updates, blog posts, and course edits with AI.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900 flex gap-3">
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Why can&apos;t I sign in with my Claude.ai account?</p>
          <p className="text-blue-800 mt-1">
            Anthropic does not allow Claude Pro/Max website login in third-party tools like this CMS.
            Use <strong>Google Gemini (free)</strong> with your Google account, or a Claude API key from the Anthropic Console.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", connected ? "bg-emerald-100" : "bg-muted")}>
              {connected ? <CheckCircle className="h-5 w-5 text-emerald-600" /> : <KeyRound className="h-5 w-5 text-muted-foreground" />}
            </div>
            <div>
              <p className="font-semibold text-sm">{connected ? `${status?.providerLabel} Connected` : "Connect AI"}</p>
              <p className="text-xs text-muted-foreground">
                {connected
                  ? `${status?.model}${status?.keyHint ? ` · ${status.keyHint}` : ""}${status?.source === "env" ? " · from .env.local" : " · site-wide key"}`
                  : "One key for your whole admin team — set up once"}
              </p>
            </div>
          </div>
          {connected && status?.source !== "env" && (
            <Button variant="outline" size="sm" onClick={handleDisconnect} className="gap-1.5 text-xs">
              <Unplug className="h-3.5 w-3.5" /> Disconnect
            </Button>
          )}
        </div>

        {!connected && (
          <>
            <div className="flex gap-2 flex-wrap">
              {(["google", "anthropic"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setProviderTab(p); setConnectError("") }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
                    providerTab === p
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/40"
                  )}
                >
                  {SETUP[p].label}
                  {p === "google" && (
                    <span className="ml-2 text-[10px] opacity-90 font-normal">({SETUP[p].badge})</span>
                  )}
                </button>
              ))}
            </div>

            <div className="rounded-lg bg-muted/40 border border-border p-4 space-y-3">
              <p className="text-sm font-medium">Setup in 4 steps</p>
              <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal list-inside">
                {setup.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <Button variant="outline" size="sm" className="gap-1.5" asChild>
                <a href={setup.consoleUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" /> {setup.consoleLabel}
                </a>
              </Button>
              <p className="text-[11px] text-muted-foreground">{setup.note}</p>
            </div>

            <form onSubmit={handleConnect} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 space-y-1">
                <Label htmlFor="apiKey" className="sr-only">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={setup.keyPlaceholder}
                  autoComplete="off"
                />
              </div>
              <Button type="submit" disabled={connecting || !apiKey.trim()} className="gap-1.5 shrink-0">
                {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {connecting ? "Testing..." : `Connect ${setup.label}`}
              </Button>
            </form>
          </>
        )}
        {connectError && <p className="text-sm text-destructive">{connectError}</p>}
        <p className="text-[11px] text-muted-foreground">
          Or set <code className="bg-muted px-1 rounded">GOOGLE_AI_API_KEY</code> / <code className="bg-muted px-1 rounded">ANTHROPIC_API_KEY</code> in <code className="bg-muted px-1 rounded">.env.local</code> for production.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col min-h-[480px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[520px]">
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed bg-muted text-foreground">
              Hi! I can update your site content, SEO, blogs, and courses. Connect Google Gemini (free with Google sign-in) or Claude via API key, then tell me what to change.
            </div>
          </div>
          {chatLog.map((msg, i) => (
            <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.toolActions && msg.toolActions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                    <p className="text-xs font-semibold flex items-center gap-1 opacity-80">
                      <Wrench className="h-3 w-3" /> Actions taken:
                    </p>
                    {msg.toolActions.map((a, j) => (
                      <p key={j} className="text-xs opacity-75">• {a.summary}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> AI is working...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {connected && (
          <div className="px-4 pb-3 flex flex-wrap gap-2 border-t border-border pt-3 bg-muted/20">
            {SUGGESTIONS.slice(0, 3).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-background border border-border hover:border-primary/40 hover:text-primary transition-colors text-left"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-border bg-background">
          {error && <p className="text-sm text-destructive mb-2">{error}</p>}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
            className="flex gap-2 items-end"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={connected ? "Ask AI to update SEO, write a blog, change homepage text..." : "Connect Google Gemini or Claude first to start chatting"}
              disabled={!connected || sending}
              rows={2}
              className="resize-none min-h-[60px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage(input)
                }
              }}
            />
            <Button type="submit" disabled={!connected || sending || !input.trim()} size="icon" className="h-11 w-11 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {!connected && (
        <div className="grid sm:grid-cols-2 gap-2">
          {SUGGESTIONS.map((s) => (
            <div key={s} className="text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-3 py-2 opacity-60">
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
