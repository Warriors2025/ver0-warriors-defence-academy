import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { requirePaymentsAccess } from "@/lib/payments-auth"
import { PaymentsLoginForm } from "@/components/payments-login-form"

export const metadata: Metadata = {
  title: "Fee Payments Login",
  robots: { index: false, follow: false },
}

export default async function PaymentsLoginPage() {
  const session = await requirePaymentsAccess()
  if (session) redirect("/payments")
  return <PaymentsLoginForm />
}
