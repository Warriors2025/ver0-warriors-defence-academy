"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CreditCard, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react"

export function PaymentsLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/payments/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.message || "Invalid email or password.")
        return
      }
      router.push("/payments")
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b2e59] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
          color: "#e0a72e",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#e0a72e] to-transparent" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <div className="bg-[#0b2e59] px-8 py-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e0a72e]/15 border border-[#e0a72e]/40 mb-4">
              <CreditCard className="h-7 w-7 text-[#e0a72e]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Fee Payments Dashboard</h1>
            <p className="text-white/60 text-sm mt-1">Warriors Defence Academy</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="payments-email" className="text-sm font-medium text-[#0b2e59]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="payments-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="payments@warriorsdefenceacademy.com"
                  className="w-full h-11 rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-[#0b2e59] focus:ring-2 focus:ring-[#0b2e59]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="payments-password" className="text-sm font-medium text-[#0b2e59]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="payments-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 rounded-lg border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none focus:border-[#0b2e59] focus:ring-2 focus:ring-[#0b2e59]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#0b2e59] text-white font-semibold hover:bg-[#082243] disabled:bg-slate-400 transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <Shield className="h-3 w-3" />
              Restricted access — accounts team only
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
