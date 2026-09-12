"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, AlertCircle, Loader2, Phone } from "lucide-react"

type LeadEnquiryFormProps = {
  source?: string
  compact?: boolean
}

export function LeadEnquiryForm({
  source = "best-nda-coaching-in-india",
  compact = false,
}: LeadEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          course: "NDA Coaching",
          message:
            formData.message ||
            `Counselling request from ${source} page — interested in best NDA coaching in India.`,
        }),
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        setError(json.message || "Failed to submit. Please call us instead.")
        return
      }

      setIsSubmitted(true)
      setFormData({ name: "", phone: "", email: "", message: "" })
    } catch {
      setError("Network error. Please call +91 94522 45729.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6 text-center">
        <CheckCircle className="mx-auto mb-3 h-12 w-12 text-accent" />
        <p className="text-lg font-semibold text-foreground">Request received</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Our counsellor will call you within 24 hours to discuss batches and fees.
        </p>
        <Button
          variant="outline"
          className="mt-4 cursor-pointer"
          onClick={() => setIsSubmitted(false)}
        >
          Submit another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-3" : "space-y-4"}
      aria-label="NDA coaching counselling form"
    >
      <div className="space-y-1.5">
        <label htmlFor="lead-name" className="text-sm font-medium text-foreground">
          Full name *
        </label>
        <Input
          id="lead-name"
          required
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="h-12"
          autoComplete="name"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="lead-phone" className="text-sm font-medium text-foreground">
          Mobile number *
        </label>
        <Input
          id="lead-phone"
          required
          type="tel"
          inputMode="tel"
          placeholder="10-digit mobile"
          pattern="[0-9+\s-]{10,15}"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="h-12"
          autoComplete="tel"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="lead-email" className="text-sm font-medium text-foreground">
          Email *
        </label>
        <Input
          id="lead-email"
          required
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="h-12"
          autoComplete="email"
        />
      </div>
      {!compact && (
        <div className="space-y-1.5">
          <label htmlFor="lead-message" className="text-sm font-medium text-foreground">
            What do you need help with?
          </label>
          <Textarea
            id="lead-message"
            placeholder="e.g. NDA after 12th, foundation after 10th, SSB only…"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="h-12 w-full cursor-pointer gap-2 font-semibold"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Phone className="h-4 w-4" />
            Get free counselling call
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Or call{" "}
        <a href="tel:+919452245729" className="font-medium text-accent hover:underline">
          +91 94522 45729
        </a>
      </p>
    </form>
  )
}
