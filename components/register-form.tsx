"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  BookOpen,
  FileText,
  CreditCard,
  Phone,
  Mail,
  Loader2,
  Receipt,
  Download,
  MessageCircle,
} from "lucide-react"
import { SEAT_BOOKING_FEE_INR } from "@/lib/pricing"
import { buildWhatsAppShareUrl } from "@/lib/registration-receipt"

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Course Selection", icon: BookOpen },
  { id: 3, title: "Education Details", icon: FileText },
  { id: 4, title: "Confirmation", icon: CreditCard },
]

const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js"

type RazorpayCheckoutOptions = {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description?: string
  prefill?: { name?: string; email?: string; contact?: string }
  theme?: { color?: string }
  handler: (response: {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  }) => void
  modal?: { ondismiss?: () => void }
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void }
  }
}

function loadRazorpayCheckout(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const existing = document.querySelector(`script[src="${RAZORPAY_CHECKOUT_SRC}"]`)
    if (existing) {
      existing.addEventListener("load", () => resolve(true))
      existing.addEventListener("error", () => resolve(false))
      return
    }
    const script = document.createElement("script")
    script.src = RAZORPAY_CHECKOUT_SRC
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const courses = [
  { id: "ssb", name: "SSB Interview Training", duration: "1 Year" },
]

const batchTypes = [
  { id: "offline", name: "Offline (On-Campus)", description: "Full-time on-campus training" },
]

const ssbSubtypes = [
  { id: "nda", name: "NDA" },
  { id: "cds", name: "CDS" },
  { id: "afcat", name: "AFCAT" },
]

const preferredBatchMonths = [
  { id: "january-2026", name: "January 2026" },
  { id: "february-2026", name: "February 2026" },
  { id: "march-2026", name: "March 2026" },
  { id: "april-2026", name: "April 2026" },
  { id: "may-2026", name: "May 2026" },
  { id: "june-2026", name: "June 2026" },
  { id: "july-2026", name: "July 2026" },
  { id: "august-2026", name: "August 2026" },
  { id: "september-2026", name: "September 2026" },
  { id: "october-2026", name: "October 2026" },
  { id: "november-2026", name: "November 2026" },
  { id: "december-2026", name: "December 2026" },
]

function postIframeHeight() {
  if (typeof window === "undefined") return
  requestAnimationFrame(() => {
    const height = Math.ceil(
      Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight ?? 0)
    )
    window.parent?.postMessage({ type: "wda-iframe-height", height }, "*")
  })
}

export function RegisterForm({ embed = false }: { embed?: boolean }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [registrationId, setRegistrationId] = useState<string | null>(null)
  const [paymentPending, setPaymentPending] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState("")
  const [paidAmount, setPaidAmount] = useState<number | null>(null)
  const [receiptNo, setReceiptNo] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    course: "ssb",
    ssbSubtype: "",
    examRollNo: "",
    batchType: "offline",
    preferredBatch: "",
    hostelRequired: false,
    highestQualification: "",
    termsAccepted: false,
  })

  // Dev/QA: /register?previewSuccess=1 shows the post-payment receipt UI
  useEffect(() => {
    if (typeof window === "undefined") return
    if (process.env.NODE_ENV === "production") return
    const params = new URLSearchParams(window.location.search)
    if (params.get("previewSuccess") !== "1") return
    setFormData((prev) => ({
      ...prev,
      firstName: prev.firstName || "Amit",
      lastName: prev.lastName || "Singh",
      phone: prev.phone || "9876543210",
      course: prev.course || "ssb",
      ssbSubtype: prev.ssbSubtype || "nda",
    }))
    setRegistrationId("WDA-PREVIEW-001")
    setReceiptNo("WDA-RCPT-PREVIEW-001")
    setPaymentId("pay_preview_demo")
    setPaidAmount(SEAT_BOOKING_FEE_INR)
    setIsSubmitted(true)
  }, [])

  useEffect(() => {
    if (isSubmitted || paymentPending) postIframeHeight()
  }, [isSubmitted, paymentPending])

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const nextStep = () => {
    if (currentStep === 2) {
      if (!formData.ssbSubtype) {
        setSubmitError("Please select an SSB sub-type (NDA, CDS, or AFCAT).")
        return
      }
      if (!formData.examRollNo.trim()) {
        setSubmitError("Please enter your NDA/CDS(UPSC) roll number.")
        return
      }
    }
    setSubmitError("")
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1) }

  const handleSubmit = async () => {
    setIsLoading(true)
    setSubmitError("")
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, dateOfBirth: formData.dob }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setSubmitError(json.message || "Registration failed. Please try again.")
        return
      }
      setRegistrationId(json.registrationId)
      setPaymentPending(true)
      await startPayment(json.registrationId)
    } catch {
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  /** Creates a Razorpay order for the registration and opens the checkout widget. */
  const startPayment = async (regId: string) => {
    setIsProcessingPayment(true)
    setPaymentError("")
    try {
      const orderRes = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: regId }),
      })
      const order = await orderRes.json()
      if (!orderRes.ok || !order.success) {
        setPaymentError(order.message || "Could not start payment. Please try again.")
        return
      }
      if (!order.keyId) {
        setPaymentError(
          "Payment gateway Key Id is missing on the server. Add NEXT_PUBLIC_RAZORPAY_KEY_ID and redeploy."
        )
        return
      }
      setPaidAmount(order.amount / 100)

      const loaded = await loadRazorpayCheckout()
      if (!loaded || !window.Razorpay) {
        setPaymentError("Could not load the payment gateway. Check your connection and try again.")
        return
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Warriors Defence Academy",
        description: "Seat booking fee",
        prefill: { name: order.name, email: order.email, contact: order.phone },
        handler: async (response) => {
          const fallbackReceipt = `WDA-RCPT-${regId.replace(/^WDA/, "")}`
          const showSuccess = (opts: {
            receiptNo?: string
            paymentId?: string
            amount?: number
            softError?: string
          }) => {
            setReceiptNo(opts.receiptNo || fallbackReceipt)
            setPaymentId(opts.paymentId || response.razorpay_payment_id || null)
            if (typeof opts.amount === "number") setPaidAmount(opts.amount)
            if (opts.softError) setPaymentError(opts.softError)
            setPaymentPending(false)
            setIsSubmitted(true)
            postIframeHeight()
          }

          try {
            const verifyRes = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ registrationId: regId, ...response }),
            })
            const verified = await verifyRes.json()
            if (!verifyRes.ok || !verified.success) {
              // Razorpay already collected payment — still show receipt so the student can download it
              showSuccess({
                paymentId: response.razorpay_payment_id,
                softError:
                  verified.message ||
                  "Payment received. If your receipt looks incomplete, contact support with your Payment ID.",
              })
              return
            }
            showSuccess({
              receiptNo:
                (typeof verified.receiptNo === "string" && verified.receiptNo) || fallbackReceipt,
              paymentId:
                (typeof verified.paymentId === "string" && verified.paymentId) ||
                response.razorpay_payment_id,
              amount: typeof verified.amount === "number" ? verified.amount : undefined,
            })
          } catch {
            showSuccess({
              paymentId: response.razorpay_payment_id,
              softError:
                "Payment received but confirmation was delayed. Keep your Payment ID and contact support if needed.",
            })
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentError("Payment was not completed. Your registration is saved — you can retry payment below.")
          },
        },
      })
      checkout.open()
    } catch {
      setPaymentError("Network error while starting payment. Please try again.")
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const progressValue = (currentStep / steps.length) * 100
  const seatBookingFee = SEAT_BOOKING_FEE_INR
  const displayReceiptNo = receiptNo || (registrationId ? `WDA-RCPT-${registrationId.replace(/^WDA/, "")}` : null)
  const displayAmount = paidAmount ?? seatBookingFee

  const downloadReceipt = () => {
    if (!displayReceiptNo || !registrationId) return
    const paidOn = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Receipt ${displayReceiptNo}</title>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; max-width: 640px; margin: 40px auto; padding: 24px; }
    h1 { color: #1F5B2D; font-size: 22px; margin: 0 0 4px; }
    .muted { color: #666; font-size: 13px; }
    .box { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-top: 24px; }
    .row { display: flex; justify-content: space-between; gap: 16px; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; }
    .row:last-child { border-bottom: 0; }
    .label { color: #666; }
    .value { font-weight: 600; text-align: right; }
    .total { font-size: 18px; color: #1F5B2D; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>Warriors Defence Academy</h1>
  <p class="muted">545-Ga/1 Chha, Near Kapoorthala Chauraha, Lucknow - 226024<br/>+91 70810 11964 · info@warriorsdefenceacademy.com</p>
  <div class="box">
    <h2 style="margin:0 0 16px;font-size:18px;">Payment Receipt</h2>
    <div class="row"><span class="label">Receipt No.</span><span class="value">${displayReceiptNo}</span></div>
    <div class="row"><span class="label">Registration ID</span><span class="value">${registrationId}</span></div>
    <div class="row"><span class="label">Student</span><span class="value">${formData.firstName} ${formData.lastName}</span></div>
    <div class="row"><span class="label">Phone</span><span class="value">${formData.phone}</span></div>
    <div class="row"><span class="label">Course</span><span class="value">SSB Interview Training${formData.ssbSubtype ? ` (${formData.ssbSubtype.toUpperCase()})` : ""}</span></div>
    ${paymentId ? `<div class="row"><span class="label">Payment ID</span><span class="value">${paymentId}</span></div>` : ""}
    <div class="row"><span class="label">Paid on</span><span class="value">${paidOn}</span></div>
    <div class="row total"><span class="label">Amount Paid</span><span class="value">₹${displayAmount.toFixed(2)}</span></div>
  </div>
  <p class="muted" style="margin-top:24px;">This is a computer-generated receipt for the seat-booking fee. Jai Hind!</p>
  <script>window.onload = function(){ window.print(); }</script>
</body>
</html>`
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const w = window.open(url, "_blank", "noopener,noreferrer")
    if (!w) {
      const a = document.createElement("a")
      a.href = url
      a.download = `${displayReceiptNo}.html`
      a.click()
    }
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  }

  const whatsappConfirmHref = displayReceiptNo && registrationId
    ? buildWhatsAppShareUrl({
        phone: formData.phone,
        name: `${formData.firstName} ${formData.lastName}`.trim() || "Cadet",
        receiptNo: displayReceiptNo,
        registrationId,
        amount: displayAmount,
        paymentId,
      })
    : null

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-6 sm:py-8 px-2 sm:px-0">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-1">
          Welcome to Warriors Defence Academy, {formData.firstName}!
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 px-1">
          Your seat for SSB Interview Training is confirmed. Download your receipt and save the confirmation on WhatsApp.
        </p>

        {paymentError && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 text-left">
            {paymentError}
          </p>
        )}

        <Card className="bg-primary/5 border-primary/20 mb-4 sm:mb-6 text-left">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <Receipt className="h-8 w-8 text-primary flex-shrink-0 mx-auto sm:mx-0" />
              <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Receipt Number</p>
                <p className="text-lg sm:text-xl font-bold text-foreground break-all">
                  {displayReceiptNo || "Generating…"}
                </p>
                {registrationId && (
                  <p className="text-sm text-muted-foreground">
                    Registration ID: <span className="font-medium break-all">{registrationId}</span>
                  </p>
                )}
                {paymentId && (
                  <p className="text-sm text-muted-foreground">
                    Payment ID: <span className="font-medium break-all">{paymentId}</span>
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Amount Paid: <span className="font-medium">₹{displayAmount.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Button
                type="button"
                className="w-full sm:w-auto gap-2"
                onClick={downloadReceipt}
                disabled={!displayReceiptNo}
              >
                <Download className="h-4 w-4" />
                Download / Print Receipt
              </Button>
              {whatsappConfirmHref && (
                <a href={whatsappConfirmHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button type="button" variant="outline" className="w-full gap-2 border-primary text-primary">
                    <MessageCircle className="h-4 w-4" />
                    Save on WhatsApp
                  </Button>
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-0 mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-semibold text-foreground mb-4">What&apos;s Next?</h3>
            <ul className="space-y-3 text-left text-muted-foreground text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Download your receipt above and keep it for admission queries</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Tap &quot;Save on WhatsApp&quot; to keep a confirmation message on your phone</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Our counselor will call you within 24 hours on {formData.phone || "your registered number"}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>If SMS/WhatsApp from the academy is enabled, you will also get an automatic confirmation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <p className="text-primary font-semibold mb-6">Jai Hind!</p>

        {!embed && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full">Back to Home</Button>
            </Link>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                Explore Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    )
  }

  if (paymentPending) {
    return (
      <div className="max-w-2xl mx-auto text-center py-6 sm:py-8 px-2 sm:px-0">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CreditCard className="h-8 w-8 sm:h-12 sm:w-12 text-accent" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Complete Your Payment</h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-2 px-1">
          Your registration is saved{registrationId ? ` (ID: ${registrationId})` : ""}. Pay the
          seat-booking fee via Razorpay to confirm your seat.
        </p>
        <p className="text-2xl font-bold text-foreground mb-1">₹{seatBookingFee}</p>
        <p className="text-xs text-muted-foreground mb-6">Inclusive of tax</p>
        {paymentError && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 mb-6 max-w-md mx-auto">
            {paymentError}
          </p>
        )}
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 w-full sm:w-auto"
          disabled={isProcessingPayment}
          onClick={() => registrationId && startPayment(registrationId)}
        >
          {isProcessingPayment ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Opening Payment...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" /> Pay Now
            </>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pb-2 w-full overflow-x-hidden">
      {/* Progress */}
      <div className="mb-4 sm:mb-6 px-1">
        <div className="flex justify-between items-center mb-3 sm:mb-4 gap-1">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-center min-w-0 ${index < steps.length - 1 ? "flex-1" : ""}`}>
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-colors shrink-0 ${
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <step.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-1 sm:mx-2 transition-colors min-w-[8px] ${
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <Progress value={progressValue} className="h-2" />
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4 sm:p-6 md:p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-5 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter first name" value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)} className="h-12 w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter last name" value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)} className="h-12 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email (optional)" value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)} className="h-12 w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" inputMode="numeric" placeholder="10-digit mobile number" value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)} className="h-12 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input id="dob" type="date" value={formData.dob}
                    onChange={(e) => updateFormData("dob", e.target.value)} className="h-12 w-full" />
                </div>
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}
                    className="flex flex-wrap gap-3 sm:gap-6 mt-2">
                    <div className="flex items-center gap-2 min-h-11">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal cursor-pointer py-2">Male</Label>
                    </div>
                    <div className="flex items-center gap-2 min-h-11">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal cursor-pointer py-2">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea id="address" placeholder="Enter your full address" value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)} rows={3} className="w-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="City" value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)} className="h-12 w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" placeholder="State" value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)} className="h-12 w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input id="pincode" inputMode="numeric" placeholder="Pincode" value={formData.pincode}
                    onChange={(e) => updateFormData("pincode", e.target.value)} className="h-12 w-full" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Course Selection */}
          {currentStep === 2 && (
            <div className="space-y-5 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-6">Course Selection</h2>

              <div className="space-y-2">
                <Label>Select Course *</Label>
                <RadioGroup value={formData.course} onValueChange={(value) => updateFormData("course", value)}
                  className="grid gap-4 mt-2">
                  {courses.map((course) => (
                    <div key={course.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        formData.course === course.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}>
                      <RadioGroupItem value={course.id} id={course.id} />
                      <div className="flex-1">
                        <Label htmlFor={course.id} className="font-medium cursor-pointer">{course.name}</Label>
                        <p className="text-sm text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>SSB Sub-Type *</Label>
                <RadioGroup
                  value={formData.ssbSubtype}
                  onValueChange={(value) => updateFormData("ssbSubtype", value)}
                  className="grid sm:grid-cols-3 gap-4 mt-2"
                >
                  {ssbSubtypes.map((subtype) => (
                    <div
                      key={subtype.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        formData.ssbSubtype === subtype.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={subtype.id} id={`ssb-${subtype.id}`} />
                      <Label htmlFor={`ssb-${subtype.id}`} className="font-medium cursor-pointer">
                        {subtype.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examRollNo">NDA/CDS(UPSC) roll no *</Label>
                <Input
                  id="examRollNo"
                  placeholder="Enter your NDA/CDS(UPSC) roll number"
                  value={formData.examRollNo}
                  onChange={(e) => updateFormData("examRollNo", e.target.value)}
                  className="h-12 w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Batch Type *</Label>
                <RadioGroup value={formData.batchType} onValueChange={(value) => updateFormData("batchType", value)}
                  className="grid gap-4 mt-2">
                  {batchTypes.map((batch) => (
                    <div key={batch.id}
                      className={`flex flex-col p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        formData.batchType === batch.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={batch.id} id={batch.id} />
                        <Label htmlFor={batch.id} className="font-medium cursor-pointer">{batch.name}</Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 ml-6">{batch.description}</p>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="preferredBatch">Preferred Batch Month</Label>
                  <Select value={formData.preferredBatch} onValueChange={(value) => updateFormData("preferredBatch", value)}>
                    <SelectTrigger className="h-12 w-full"><SelectValue placeholder="Select month" /></SelectTrigger>
                    <SelectContent>
                      {preferredBatchMonths.map((month) => (
                        <SelectItem key={month.id} value={month.id}>{month.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Hostel Required?</Label>
                  <div className="flex items-center space-x-2 h-12">
                    <Checkbox id="hostel" checked={formData.hostelRequired}
                      onCheckedChange={(checked) => updateFormData("hostelRequired", checked === true)} />
                    <Label htmlFor="hostel" className="font-normal cursor-pointer">
                      Yes, I need hostel accommodation
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Education Details */}
          {currentStep === 3 && (
            <div className="space-y-5 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-6">Education Details</h2>

              <div className="space-y-2 w-full max-w-md">
                <Label htmlFor="qualification">Highest Qualification *</Label>
                <Select value={formData.highestQualification} onValueChange={(value) => updateFormData("highestQualification", value)}>
                  <SelectTrigger className="h-12 w-full"><SelectValue placeholder="Select qualification" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12th-appearing">12th Appearing</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="post-graduate">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-5 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-6">Review &amp; Confirm</h2>

              <div className="space-y-6">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Name:</span>{" "}<span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                    <div><span className="text-muted-foreground">Email:</span>{" "}<span className="font-medium">{formData.email || "—"}</span></div>
                    <div><span className="text-muted-foreground">Phone:</span>{" "}<span className="font-medium">{formData.phone}</span></div>
                    <div><span className="text-muted-foreground">DOB:</span>{" "}<span className="font-medium">{formData.dob}</span></div>
                    <div className="md:col-span-2">
                      <span className="text-muted-foreground">Address:</span>{" "}
                      <span className="font-medium">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Course Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Course:</span>{" "}<span className="font-medium">{courses.find(c => c.id === formData.course)?.name || "-"}</span></div>
                    <div><span className="text-muted-foreground">SSB Sub-Type:</span>{" "}<span className="font-medium">{ssbSubtypes.find(s => s.id === formData.ssbSubtype)?.name || "-"}</span></div>
                    <div><span className="text-muted-foreground">Exam Roll No:</span>{" "}<span className="font-medium">{formData.examRollNo || "-"}</span></div>
                    <div><span className="text-muted-foreground">Batch Type:</span>{" "}<span className="font-medium">{batchTypes.find(b => b.id === formData.batchType)?.name || "-"}</span></div>
                    <div><span className="text-muted-foreground">Preferred Batch:</span>{" "}<span className="font-medium">{preferredBatchMonths.find(m => m.id === formData.preferredBatch)?.name || "-"}</span></div>
                    <div><span className="text-muted-foreground">Hostel:</span>{" "}<span className="font-medium">{formData.hostelRequired ? "Yes" : "No"}</span></div>
                  </div>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Education Details
                  </h3>
                  <div className="text-sm">
                    <div><span className="text-muted-foreground">Qualification:</span>{" "}<span className="font-medium">{formData.highestQualification || "-"}</span></div>
                  </div>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Seat-Booking Payment
                  </h3>
                  <div className="flex justify-between items-baseline text-base font-semibold">
                    <span>Total payable now</span>
                    <span>₹{seatBookingFee}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Inclusive of all tax.
                  </p>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Checkbox id="terms" checked={formData.termsAccepted}
                    onCheckedChange={(checked) => updateFormData("termsAccepted", checked === true)} />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I confirm that all the information provided is accurate. I agree to the{" "}
                    <Link href="/terms" className="text-primary underline">Terms &amp; Conditions</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>{" "}
                    of Warriors Defence Academy.
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="space-y-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
            {submitError && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2 w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep} className="gap-2 w-full sm:w-auto">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={!formData.termsAccepted || isLoading}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" /> Submit & Pay ₹{seatBookingFee}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      {!embed && (
      <div className="mt-4 mb-1 text-center">
        <p className="text-muted-foreground mb-3">Need help with registration?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+917081011964" className="flex items-center justify-center gap-2 text-primary hover:underline">
            <Phone className="h-4 w-4" />
            +91 70810 11964
          </a>
          <a href="mailto:info@warriorsdefenceacademy.com" className="flex items-center justify-center gap-2 text-primary hover:underline">
            <Mail className="h-4 w-4" />
            info@warriorsdefenceacademy.com
          </a>
        </div>
      </div>
      )}
    </div>
  )
}
