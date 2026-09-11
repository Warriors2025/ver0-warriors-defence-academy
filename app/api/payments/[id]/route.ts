import { NextResponse } from "next/server"
import { requirePaymentsAccess } from "@/lib/payments-auth"
import { FEE_PAYMENT_STATUSES, updateFeePaymentStatus, type FeePaymentStatus } from "@/lib/fee-payments"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requirePaymentsAccess()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing payment id." }, { status: 400 })
  }

  try {
    const body = await request.json()
    const status = body.status as FeePaymentStatus
    if (!FEE_PAYMENT_STATUSES.includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status." }, { status: 400 })
    }
    const notes = typeof body.notes === "string" ? body.notes : undefined
    await updateFeePaymentStatus(id, status, notes)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update fee payment error:", error)
    return NextResponse.json({ success: false, message: "Failed to update payment." }, { status: 500 })
  }
}
