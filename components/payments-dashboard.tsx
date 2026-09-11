"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  LogOut,
  Phone,
  Search,
  Shield,
  User,
  XCircle,
} from "lucide-react"
import type { FeePaymentRow, FeePaymentStatus } from "@/lib/fee-payments"

const STATUS_STYLES: Record<FeePaymentStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  verified: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
}

function rupee(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatWhen(value: string | null) {
  if (!value) return "—"
  return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
}

export function PaymentsDashboard({ email }: { email: string }) {
  const router = useRouter()
  const [payments, setPayments] = useState<FeePaymentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | FeePaymentStatus>("all")
  const [selected, setSelected] = useState<FeePaymentRow | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  async function load() {
    setError("")
    try {
      const res = await fetch("/api/payments", { cache: "no-store" })
      if (res.status === 401) {
        router.replace("/payments/login")
        return
      }
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.message || "Failed to load payments.")
        return
      }
      setPayments(json.payments)
    } catch {
      setError("Network error while loading payments.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return payments.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false
      if (!q) return true
      return [
        row.student_name,
        row.father_name,
        row.contact_number,
        row.reg_no,
        row.course,
        row.submission_id,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    })
  }, [payments, query, statusFilter])

  const stats = useMemo(() => {
    const pending = payments.filter((p) => p.status === "pending")
    const verified = payments.filter((p) => p.status === "verified")
    const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0)
    const verifiedAmount = verified.reduce((sum, p) => sum + (p.amount || 0), 0)
    return {
      total: payments.length,
      pending: pending.length,
      verified: verified.length,
      rejected: payments.filter((p) => p.status === "rejected").length,
      totalAmount,
      verifiedAmount,
    }
  }, [payments])

  async function setStatus(id: string, status: FeePaymentStatus) {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("update failed")
      setPayments((rows) =>
        rows.map((row) => (row.id === id ? { ...row, status } : row))
      )
      setSelected((row) => (row?.id === id ? { ...row, status } : row))
    } catch {
      setError("Could not update status. Try again.")
    } finally {
      setUpdatingId(null)
    }
  }

  function exportCsv() {
    const header = [
      "Submission ID",
      "Student",
      "Father",
      "Reg No",
      "Course",
      "Validity",
      "Amount",
      "Payment Date",
      "Contact",
      "Status",
      "Submitted At",
    ]
    const lines = filtered.map((row) =>
      [
        row.submission_id,
        row.student_name,
        row.father_name,
        row.reg_no ?? "",
        row.course,
        row.course_validity ?? "",
        row.amount,
        row.payment_date,
        row.contact_number,
        row.status,
        row.created_at ?? "",
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fee-payments-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function logout() {
    await fetch("/api/payments/logout", { method: "POST" })
    router.replace("/payments/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#f2f4f7] text-[#1c2733]">
      <header className="bg-[#0b2e59] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#e0a72e]/15 border border-[#e0a72e]/40 flex items-center justify-center shrink-0">
              <CreditCard className="h-5 w-5 text-[#e0a72e]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold leading-tight truncate">Fee Payments Dashboard</p>
              <p className="text-white/60 text-xs truncate">Warriors Defence Academy · {email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/fee-payment"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white px-3 py-2"
            >
              Open form <ExternalLink className="h-3 w-3" />
            </a>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/15 rounded-lg px-3 py-2"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={CreditCard} label="Total submissions" value={String(stats.total)} />
          <StatCard icon={Clock} label="Pending" value={String(stats.pending)} accent="text-amber-600" />
          <StatCard icon={CheckCircle2} label="Verified" value={String(stats.verified)} accent="text-emerald-600" />
          <StatCard icon={Banknote} label="Verified amount" value={rupee(stats.verifiedAmount)} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, registration no, course…"
              className="w-full h-11 rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-[#0b2e59] focus:ring-2 focus:ring-[#0b2e59]/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | FeePaymentStatus)}
            className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#0b2e59]"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            type="button"
            onClick={exportCsv}
            className="h-11 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-medium hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-xl py-16 text-center text-slate-500">
            Loading submissions…
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl py-16 text-center">
            <Shield className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="font-medium">No submissions yet</p>
            <p className="text-sm text-slate-500 mt-1">New fee forms will appear here as students submit them.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((row) => (
              <article
                key={row.id}
                className={`bg-white border rounded-xl p-4 md:p-5 ${
                  row.status === "pending" ? "border-amber-200" : "border-slate-200"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelected(row)}
                    className="text-left space-y-2 min-w-0 flex-1"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[#0b2e59]">{row.student_name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${STATUS_STYLES[row.status]}`}>
                        {row.status}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{row.submission_id}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" />Father: {row.father_name}</span>
                      <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{row.contact_number}</span>
                      <span>{row.course}</span>
                      <span className="font-semibold text-[#c1121f]">{rupee(row.amount)}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      {row.reg_no && <span>Reg: {row.reg_no}</span>}
                      {row.course_validity && <span>Validity: {row.course_validity}</span>}
                      <span>Paid on {row.payment_date}</span>
                      <span>Submitted {formatWhen(row.created_at)}</span>
                    </div>
                  </button>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelected(row)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50"
                    >
                      View screenshot
                    </button>
                    {row.status !== "verified" && (
                      <button
                        type="button"
                        disabled={updatingId === row.id}
                        onClick={() => void setStatus(row.id, "verified")}
                        className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 inline-flex items-center gap-1"
                      >
                        <CheckCircle2 className="h-3 w-3" /> Verify
                      </button>
                    )}
                    {row.status !== "rejected" && (
                      <button
                        type="button"
                        disabled={updatingId === row.id}
                        onClick={() => void setStatus(row.id, "rejected")}
                        className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-50 inline-flex items-center gap-1"
                      >
                        <XCircle className="h-3 w-3" /> Reject
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/55 flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full max-w-3xl max-h-[92dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div>
                <p className="font-semibold text-[#0b2e59]">{selected.student_name}</p>
                <p className="text-xs text-slate-500 font-mono">{selected.submission_id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-sm text-slate-500 hover:text-slate-800 px-2 py-1"
              >
                Close
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-5 p-5">
              <dl className="space-y-3 text-sm">
                <Detail label="Father's name" value={selected.father_name} />
                <Detail label="Registration no." value={selected.reg_no || "—"} />
                <Detail label="Course" value={selected.course} />
                <Detail label="Course validity" value={selected.course_validity || "—"} />
                <Detail label="Amount paid" value={rupee(selected.amount)} />
                <Detail label="Payment date" value={selected.payment_date} />
                <Detail label="Contact" value={selected.contact_number} />
                <Detail label="Status" value={selected.status} />
                <Detail label="Submitted" value={formatWhen(selected.created_at)} />
              </dl>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Payment screenshot</p>
                {selected.screenshot_url ? (
                  <a href={selected.screenshot_url} target="_blank" rel="noreferrer">
                    <img
                      src={selected.screenshot_url}
                      alt={`Payment screenshot for ${selected.student_name}`}
                      className="w-full rounded-lg border border-slate-200"
                    />
                  </a>
                ) : (
                  <p className="text-sm text-slate-500">Screenshot is not available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof CreditCard
  label: string
  value: string
  accent?: string
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <Icon className={`h-4 w-4 ${accent || "text-[#0b2e59]"}`} />
        {label}
      </div>
      <p className={`text-xl font-bold ${accent || "text-[#0b2e59]"}`}>{value}</p>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
