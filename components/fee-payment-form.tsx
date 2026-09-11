"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  ImagePlus,
  Loader2,
  Phone,
  QrCode,
  Shield,
  User,
  X,
} from "lucide-react"
import { FEE_COURSES } from "@/lib/fee-payments"
import { cn } from "@/lib/utils"

const QR_SRC =
  "https://warriorsdefenceacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-1.34.36-PM.jpeg"
const VPA = "worreorsdefence@icici"
const MAX_FILE_BYTES = 8 * 1024 * 1024
const PAY_APPS = ["UPI", "GPay", "PhonePe", "Paytm", "BHIM", "iMobile"]

const STAGES = [
  { id: 1, label: "Pay", hint: "Scan UPI", icon: QrCode },
  { id: 2, label: "Details", hint: "Student info", icon: User },
  { id: 3, label: "Proof", hint: "Screenshot", icon: ImagePlus },
] as const

type FormState = {
  studentName: string
  regNo: string
  fatherName: string
  course: string
  courseValidity: string
  amount: string
  paymentDate: string
  contactNumber: string
}

type FieldKey = keyof FormState
type Errors = Partial<Record<FieldKey | "screenshot" | "paid", string>>

function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function emptyForm(): FormState {
  return {
    studentName: "",
    regNo: "",
    fatherName: "",
    course: "",
    courseValidity: "",
    amount: "",
    paymentDate: todayISO(),
    contactNumber: "",
  }
}

function rupee(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)
}

function amountWords(n: number) {
  if (!n || n < 1) return ""
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
  const two = (v: number) => {
    if (v < 20) return ones[v]
    return `${tens[Math.floor(v / 10)]}${v % 10 ? " " + ones[v % 10] : ""}`
  }
  const three = (v: number) => {
    if (v < 100) return two(v)
    return `${ones[Math.floor(v / 100)]} hundred${v % 100 ? " " + two(v % 100) : ""}`
  }
  const crore = Math.floor(n / 10000000)
  const lakh = Math.floor((n % 10000000) / 100000)
  const thousand = Math.floor((n % 100000) / 1000)
  const rest = n % 1000
  const parts: string[] = []
  if (crore) parts.push(`${three(crore)} crore`)
  if (lakh) parts.push(`${three(lakh)} lakh`)
  if (thousand) parts.push(`${three(thousand)} thousand`)
  if (rest) parts.push(three(rest))
  return `${parts.join(" ")} rupees`
}

function compressImage(file: File): Promise<{ blob: Blob; previewUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Could not read that image."))
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const maxDim = 1280
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
        const canvas = document.createElement("canvas")
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not process that image."))
          return
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not compress that image."))
              return
            }
            resolve({ blob, previewUrl: canvas.toDataURL("image/jpeg", 0.75) })
          },
          "image/jpeg",
          0.75
        )
      }
      img.onerror = () => reject(new Error("That file is not a valid image."))
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

function validateStage(stage: number, form: FormState, paid: boolean, hasScreenshot: boolean): Errors {
  const errors: Errors = {}
  if (stage === 1 && !paid) errors.paid = "Confirm you have paid via UPI before continuing."
  if (stage >= 2) {
    if (!form.studentName.trim()) errors.studentName = "Enter the student's full name."
    if (!form.fatherName.trim()) errors.fatherName = "Enter father's name."
    if (!form.course) errors.course = "Select a course."
    const amount = Number.parseInt(form.amount, 10)
    if (!form.amount || !Number.isFinite(amount) || amount < 1) errors.amount = "Enter the amount paid."
    if (!form.paymentDate) errors.paymentDate = "Select the payment date."
    if (!/^[6-9]\d{9}$/.test(form.contactNumber)) errors.contactNumber = "Enter a valid 10-digit mobile number."
  }
  if (stage === 3 && !hasScreenshot) errors.screenshot = "Attach your payment screenshot."
  return errors
}

export function FeePaymentForm() {
  const [stage, setStage] = useState(1)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [paid, setPaid] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [fileName, setFileName] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [screenshotBlob, setScreenshotBlob] = useState<Blob | null>(null)
  const [dragover, setDragover] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [qrFailed, setQrFailed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<string>("")
  const [successId, setSuccessId] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const amountNum = Number.parseInt(form.amount, 10) || 0
  const filled = [
    paid,
    form.studentName.trim(),
    form.fatherName.trim(),
    form.course,
    amountNum > 0,
    form.paymentDate,
    /^[6-9]\d{9}$/.test(form.contactNumber),
    Boolean(screenshotBlob),
  ].filter(Boolean).length
  const progress = Math.round((filled / 8) * 100)

  function update<K extends FieldKey>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  async function handleFile(file: File | undefined) {
    if (!file) return
    if (file.size > MAX_FILE_BYTES) {
      setErrors((prev) => ({ ...prev, screenshot: "That image is larger than 8 MB." }))
      return
    }
    try {
      const compressed = await compressImage(file)
      setScreenshotBlob(compressed.blob)
      setPreviewUrl(compressed.previewUrl)
      setFileName(file.name)
      setErrors((prev) => {
        const next = { ...prev }
        delete next.screenshot
        return next
      })
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        screenshot: err instanceof Error ? err.message : "Could not read that image.",
      }))
    }
  }

  function clearFile() {
    setScreenshotBlob(null)
    setPreviewUrl("")
    setFileName("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function copyVpa() {
    try {
      await navigator.clipboard.writeText(VPA)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  function goNext() {
    const nextErrors = validateStage(stage, form, paid, Boolean(screenshotBlob))
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStage((s) => Math.min(3, s + 1))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validateStage(3, form, paid, Boolean(screenshotBlob))
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length || !screenshotBlob) return

    setSubmitting(true)
    setStatus("Sending your details. Keep this page open.")
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([key, value]) => fd.append(key, value))
      fd.append("screenshot", screenshotBlob, fileName.replace(/\.[^.]+$/, "") + ".jpg")
      const res = await fetch("/api/fee-payment", { method: "POST", body: fd })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setStatus(json.message || "Submission failed. Try again.")
        return
      }
      setSuccessId(json.submissionId)
      setForm(emptyForm())
      setPaid(false)
      clearFile()
      setStatus("")
      setStage(1)
    } catch {
      setStatus("Network error. Check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const payStation = (
    <aside className="rounded-3xl overflow-hidden border border-white/10 bg-[#143c1d] text-white shadow-[0_20px_50px_rgba(20,60,29,0.35)]">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#c9a227]">UPI pay station</p>
          <p className="font-semibold mt-1">Scan, pay, then confirm</p>
        </div>
        <QrCode className="h-5 w-5 text-[#c9a227]" />
      </div>
      <div className="p-5 space-y-4">
        <button
          type="button"
          aria-label="Enlarge UPI QR code"
          onClick={() => !qrFailed && setQrOpen(true)}
          className="block w-full max-w-[220px] mx-auto paydesk-qr-live rounded-2xl overflow-hidden border-2 border-[#c9a227] bg-white"
        >
          {!qrFailed ? (
            <img src={QR_SRC} alt="Scan to pay Warriors Defence Academy via UPI" className="w-full h-auto" onError={() => setQrFailed(true)} />
          ) : (
            <div className="aspect-[2/3] grid place-items-center text-sm text-[#5d6758] p-4">
              QR did not load. Use the UPI ID below.
            </div>
          )}
        </button>
        <p className="text-center text-xs text-white/60">Tap the QR to enlarge</p>

        <div className="rounded-2xl bg-black/20 p-4 space-y-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/50">Pay to</p>
            <p className="font-semibold">WARRIORS DEFENCE ACADEMY</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/50">UPI ID</p>
            <div className="mt-1 flex items-center gap-2">
              <code className="text-sm font-bold text-[#c9a227] break-all">{VPA}</code>
              <button
                type="button"
                onClick={() => void copyVpa()}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold min-h-9 transition-colors",
                  copied ? "bg-[#c9a227] text-[#172117]" : "bg-white/10 hover:bg-white/15"
                )}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PAY_APPS.map((app) => (
              <span key={app} className="text-[10px] font-semibold tracking-wide uppercase bg-white/10 rounded-full px-2 py-1">
                {app}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#c9a227] text-[#172117] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider font-semibold">Amount on this form</p>
          <p className="text-2xl font-bold tabular-nums leading-tight">{amountNum ? rupee(amountNum) : "—"}</p>
          {amountNum > 0 && (
            <p className="text-xs capitalize mt-0.5 opacity-80">{amountWords(amountNum)}</p>
          )}
        </div>
      </div>
    </aside>
  )

  if (successId) {
    return (
      <div className="paydesk min-h-dvh bg-[#f3eee3] text-[#172117]">
        <TopBar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="relative inline-flex">
            <div className="w-24 h-24 rounded-full bg-[#1f5b2d] text-white grid place-items-center">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <span className="paydesk-stamp absolute -right-10 top-1 rotate-[-8deg] border-4 border-[#540413] text-[#540413] font-black tracking-widest text-sm px-3 py-1 bg-[#f3eee3]/90">
              RECEIVED
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl mt-8">Payment recorded</h1>
          <p className="mt-3 text-[#5d6758] leading-relaxed">
            Accounts will match your screenshot with the UPI credit and confirm the seat. Keep this reference for any follow-up call.
          </p>
          <p className="mt-6 inline-block rounded-full bg-[#1f5b2d] text-white font-mono font-bold tracking-wide px-5 py-2">
            {successId}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setSuccessId("")}
              className="min-h-12 rounded-full bg-[#1f5b2d] text-white font-semibold px-6 hover:bg-[#143c1d]"
            >
              Submit another payment
            </button>
            <Link href="/" className="min-h-12 rounded-full border border-[#1f5b2d]/30 px-6 grid place-items-center font-semibold hover:bg-white">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="paydesk min-h-dvh bg-[#f3eee3] text-[#172117]">
      <TopBar />

      <section className="bg-[#1f5b2d] text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.28em]">Fee desk · Lucknow campus</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl mt-3 max-w-2xl leading-tight">
            Confirm your fee payment
          </h1>
          <p className="mt-3 text-white/75 max-w-xl">
            Pay on the academy UPI, then send us the screenshot. Takes about two minutes.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-5 relative z-10">
        <ol className="grid grid-cols-3 gap-2 bg-white rounded-2xl border border-[#1f5b2d]/10 p-2 shadow-sm">
          {STAGES.map((item) => {
            const done = stage > item.id
            const active = stage === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (item.id < stage) setStage(item.id)
                  }}
                  className={cn(
                    "w-full rounded-xl px-3 py-3 text-left min-h-14 transition-colors",
                    active && "bg-[#1f5b2d] text-white",
                    done && !active && "bg-[#1f5b2d]/8",
                    !active && !done && "text-[#5d6758]"
                  )}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {done && <Check className="h-3.5 w-3.5 ml-auto" />}
                  </span>
                  <span className={cn("block text-[11px] mt-0.5", active ? "text-white/70" : "text-[#5d6758]")}>
                    {item.hint}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        <div className="h-1.5 mt-3 rounded-full bg-[#1f5b2d]/10 overflow-hidden">
          <div className="h-full bg-[#c9a227] transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[340px_1fr] gap-6 items-start">
        <div className="hidden lg:block lg:sticky lg:top-6">{payStation}</div>

        <form onSubmit={onSubmit} autoComplete="off" noValidate className="paydesk-stage bg-white rounded-3xl border border-[#1f5b2d]/10 p-5 md:p-8 shadow-sm">
          {stage === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl">Pay on UPI first</h2>
                <p className="text-[#5d6758] mt-2">
                  Use the QR or the UPI ID on the left. Then tick below so we know the transfer is done.
                </p>
              </div>
              <div className="lg:hidden">{payStation}</div>
              <label
                className={cn(
                  "flex items-start gap-3 rounded-2xl border-2 p-4 cursor-pointer min-h-16 transition-colors",
                  paid ? "border-[#1f5b2d] bg-[#1f5b2d]/5" : "border-[#1f5b2d]/15 hover:border-[#1f5b2d]/40",
                  errors.paid && "border-red-500"
                )}
              >
                <input
                  type="checkbox"
                  checked={paid}
                  onChange={(e) => {
                    setPaid(e.target.checked)
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.paid
                      return next
                    })
                  }}
                  className="mt-1 h-5 w-5 accent-[#1f5b2d]"
                />
                <span>
                  <span className="font-semibold block">I have paid via UPI</span>
                  <span className="text-sm text-[#5d6758]">The amount matches what accounts told me to pay.</span>
                </span>
              </label>
              {errors.paid && <p className="text-sm font-medium text-red-700">{errors.paid}</p>}
            </div>
          )}

          {stage === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl">Student details</h2>
                <p className="text-[#5d6758] mt-2">Same name as on the admission form, so accounts can match the payment.</p>
              </div>

              <Field label="Student full name" required error={errors.studentName}>
                <input
                  id="studentName"
                  value={form.studentName}
                  onChange={(e) => update("studentName", e.target.value)}
                  className={inputClass(errors.studentName)}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Registration no." hint="if allotted">
                  <input
                    value={form.regNo}
                    onChange={(e) => update("regNo", e.target.value)}
                    className={inputClass()}
                  />
                </Field>
                <Field label="Father's name" required error={errors.fatherName}>
                  <input
                    value={form.fatherName}
                    onChange={(e) => update("fatherName", e.target.value)}
                    className={inputClass(errors.fatherName)}
                  />
                </Field>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">
                  Course <span className="text-[#540413]">*</span>
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {FEE_COURSES.map((course) => (
                    <button
                      key={course}
                      type="button"
                      aria-pressed={form.course === course}
                      onClick={() => update("course", course)}
                      className={cn(
                        "text-left rounded-xl border px-3 py-3 text-sm min-h-12 transition-colors",
                        form.course === course
                          ? "border-[#1f5b2d] bg-[#1f5b2d] text-white"
                          : "border-[#1f5b2d]/15 hover:border-[#1f5b2d]/40"
                      )}
                    >
                      {course}
                    </button>
                  ))}
                </div>
                {errors.course && <p className="text-sm font-medium text-red-700 mt-2">{errors.course}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Course validity" hint="e.g. 3 Months">
                  <input
                    value={form.courseValidity}
                    onChange={(e) => update("courseValidity", e.target.value)}
                    placeholder="3 Months"
                    className={inputClass()}
                  />
                </Field>
                <Field label="Fee amount paid" required error={errors.amount}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5d6758] font-semibold">₹</span>
                    <input
                      inputMode="numeric"
                      value={form.amount}
                      onChange={(e) => update("amount", e.target.value.replace(/\D/g, ""))}
                      className={cn(inputClass(errors.amount), "pl-8 tabular-nums")}
                    />
                  </div>
                  {amountNum > 0 && (
                    <p className="text-xs text-[#5d6758] mt-1 capitalize">{amountWords(amountNum)}</p>
                  )}
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Payment date" required error={errors.paymentDate}>
                  <input
                    type="date"
                    value={form.paymentDate}
                    onChange={(e) => update("paymentDate", e.target.value)}
                    className={inputClass(errors.paymentDate)}
                  />
                </Field>
                <Field label="Contact number" required error={errors.contactNumber}>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={form.contactNumber}
                    onChange={(e) => update("contactNumber", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className={cn(inputClass(errors.contactNumber), "tabular-nums")}
                  />
                  <p className="text-xs text-[#5d6758] mt-1">{form.contactNumber.length}/10 digits</p>
                </Field>
              </div>
            </div>
          )}

          {stage === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl">Upload the screenshot</h2>
                <p className="text-[#5d6758] mt-2">JPG or PNG, under 8 MB. Crop so the UPI reference and amount are readable.</p>
              </div>

              <div className="rounded-2xl bg-[#f3eee3] p-4 grid sm:grid-cols-2 gap-2 text-sm">
                <Summary label="Student" value={form.studentName} />
                <Summary label="Course" value={form.course} />
                <Summary label="Amount" value={amountNum ? rupee(amountNum) : "—"} />
                <Summary label="Mobile" value={form.contactNumber} />
              </div>

              {!previewUrl ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click()
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragover(true)
                  }}
                  onDragLeave={() => setDragover(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragover(false)
                    void handleFile(e.dataTransfer.files[0])
                  }}
                  className={cn(
                    "rounded-2xl border-2 border-dashed min-h-40 grid place-items-center text-center px-4 py-8 cursor-pointer transition-colors",
                    dragover ? "border-[#1f5b2d] bg-[#1f5b2d]/5" : "border-[#1f5b2d]/25 hover:border-[#1f5b2d]",
                    errors.screenshot && "border-red-500"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => void handleFile(e.target.files?.[0])}
                  />
                  <ImagePlus className="h-8 w-8 text-[#1f5b2d] mx-auto mb-2" />
                  <p className="font-semibold">Drop the screenshot here, or tap to choose</p>
                  <p className="text-sm text-[#5d6758] mt-1">Phone screenshots work as-is</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-[#1f5b2d]/15 p-3">
                  <img src={previewUrl} alt="Payment screenshot preview" className="max-h-64 mx-auto rounded-xl" />
                  <p className="text-center text-xs text-[#5d6758] mt-2">{fileName}</p>
                  <button type="button" onClick={clearFile} className="mx-auto mt-2 flex items-center gap-1 text-sm text-[#540413] underline min-h-10">
                    <X className="h-3.5 w-3.5" /> Choose another
                  </button>
                </div>
              )}
              {errors.screenshot && <p className="text-sm font-medium text-red-700">{errors.screenshot}</p>}

              <p className="rounded-xl bg-[#540413]/8 border border-[#540413]/20 text-[#540413] text-sm font-semibold px-4 py-3">
                Fee once paid is not refundable under any condition.
              </p>
              {status && <p className="text-sm text-[#1f5b2d] font-medium">{status}</p>}
            </div>
          )}

          <div className="mt-8 pt-5 border-t border-[#1f5b2d]/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStage((s) => Math.max(1, s - 1))}
              disabled={stage === 1}
              className="inline-flex items-center gap-2 min-h-12 px-4 rounded-full font-semibold disabled:opacity-30 hover:bg-[#f3eee3]"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {stage < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 min-h-12 px-6 rounded-full bg-[#1f5b2d] text-white font-semibold hover:bg-[#143c1d]"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 min-h-12 px-6 rounded-full bg-[#c9a227] text-[#172117] font-bold hover:bg-[#b8911c] disabled:opacity-60"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                {submitting ? "Submitting…" : "Submit payment details"}
              </button>
            )}
          </div>
        </form>
      </div>

      <footer className="max-w-6xl mx-auto px-4 pb-10 text-sm text-[#5d6758]">
        <p>
          <a className="font-semibold text-[#1f5b2d]" href="tel:+919452245729">94522 45729</a>
          {" · "}
          <a className="font-semibold text-[#1f5b2d]" href="tel:+917081011964">70810 11964</a>
        </p>
        <p className="mt-1">
          545-GA/1, Beside Madhuban Guest House, Chandganj, Garden Road, Bara Chandganj, Chandralok, Lucknow, U.P. 226024
        </p>
      </footer>

      {qrOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4" onClick={() => setQrOpen(false)}>
          <div className="bg-white rounded-3xl p-4 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <img src={QR_SRC} alt="Enlarged UPI QR" className="w-full rounded-2xl" />
            <button type="button" onClick={() => setQrOpen(false)} className="mt-3 w-full min-h-12 rounded-full bg-[#1f5b2d] text-white font-semibold">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function TopBar() {
  return (
    <div className="bg-[#143c1d] text-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-semibold min-h-11">
          <Shield className="h-4 w-4 text-[#c9a227]" />
          Warriors Defence Academy
        </Link>
        <a href="tel:+919452245729" className="inline-flex items-center gap-1.5 text-sm text-[#c9a227] min-h-11">
          <Phone className="h-4 w-4" />
          94522 45729
        </a>
      </div>
    </div>
  )
}

function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">
        {label} {required && <span className="text-[#540413]">*</span>}{" "}
        {hint && <span className="font-normal text-[#5d6758]">({hint})</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="text-sm font-medium text-red-700 mt-1">{error}</p>}
    </label>
  )
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-[#5d6758]">{label}: </span>
      <span className="font-semibold">{value || "—"}</span>
    </p>
  )
}

function inputClass(error?: string) {
  return cn(
    "w-full min-h-12 rounded-xl border bg-white px-3 text-base outline-none transition-shadow",
    error
      ? "border-red-500 focus:ring-2 focus:ring-red-200"
      : "border-[#1f5b2d]/20 focus:border-[#1f5b2d] focus:ring-2 focus:ring-[#1f5b2d]/15"
  )
}
