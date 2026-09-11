import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { requirePaymentsAccess } from "@/lib/payments-auth"
import { PaymentsDashboard } from "@/components/payments-dashboard"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Fee Payments Dashboard",
  robots: { index: false, follow: false },
}

export default async function PaymentsPage() {
  const session = await requirePaymentsAccess()
  if (!session) redirect("/payments/login")
  return <PaymentsDashboard email={session.email} />
}
