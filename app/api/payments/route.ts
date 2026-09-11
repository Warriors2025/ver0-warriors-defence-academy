import { NextResponse } from "next/server"
import { requirePaymentsAccess } from "@/lib/payments-auth"
import { listFeePayments } from "@/lib/fee-payments"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await requirePaymentsAccess()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payments = await listFeePayments()
    return NextResponse.json({ success: true, payments })
  } catch (error) {
    console.error("List fee payments error:", error)
    return NextResponse.json({ success: false, message: "Failed to load payments." }, { status: 500 })
  }
}
