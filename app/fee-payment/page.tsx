import type { Metadata } from "next"
import { FeePaymentForm } from "@/components/fee-payment-form"
import "./fee-form.css"

export const metadata: Metadata = {
  title: "Fee Payment & Submission Form",
  description:
    "Pay Warriors Defence Academy fees via UPI and submit your screenshot to confirm registration in Lucknow.",
  robots: { index: true, follow: true },
}

export default function FeePaymentPage() {
  return <FeePaymentForm />
}
