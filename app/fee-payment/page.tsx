import type { Metadata } from "next"
import { FeePaymentForm } from "@/components/fee-payment-form"
import "./fee-form.css"

export const metadata: Metadata = {
  title: {
    absolute: "Warriors Defence Academy Fees | Pay Online Lucknow",
  },
  description:
    "Warriors Defence Academy fees & fee structure — pay NDA/SSB coaching fees online via UPI in Lucknow. Submit payment proof to confirm registration. Pay now!",
  keywords: [
    "warriors defence academy fees",
    "warriors defence academy lucknow fees structure",
    "warrior defence academy lucknow fees",
    "wda academy lucknow fees",
    "nda coaching fees lucknow",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://warriorsdefenceacademy.com/fee-payment" },
  openGraph: {
    title: "Warriors Defence Academy Fees | Pay Online Lucknow",
    description:
      "Check Warriors Defence Academy fees and pay online securely. NDA, CDS & SSB coaching fee payment for Lucknow campus.",
    url: "https://warriorsdefenceacademy.com/fee-payment",
  },
}

export default function FeePaymentPage() {
  return <FeePaymentForm />
}
