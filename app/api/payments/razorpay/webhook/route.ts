import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { makeReceiptNo, verifyWebhookSignature } from "@/lib/razorpay"

export const runtime = "nodejs"

/**
 * Server-to-server confirmation from Razorpay. Configure this URL under
 * Dashboard -> Settings -> Webhooks, subscribed to `payment.captured` and
 * `payment.failed`. This is the source of truth for payment status — it
 * fires even if the student closes the browser right after paying, unlike
 * the client-side /verify callback.
 */
export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get("x-razorpay-signature")

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 })
  }

  let event: {
    event?: string
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } }
  }
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 })
  }

  const payment = event.payload?.payment?.entity
  const orderId = payment?.order_id
  const paymentId = payment?.id

  if (event.event === "payment.captured" && orderId) {
    const db = createServerClient()
    const { data: registration, error: fetchError } = await db
      .from("registrations")
      .select("registration_id, receipt_no, payment_status")
      .eq("razorpay_order_id", orderId)
      .single()

    if (!fetchError && registration && registration.payment_status !== "paid") {
      const receiptNo = registration.receipt_no || makeReceiptNo(registration.registration_id)
      const { error: updateError } = await db
        .from("registrations")
        .update({
          payment_status: "paid",
          razorpay_payment_id: paymentId ?? null,
          receipt_no: receiptNo,
          status: "enrolled",
        })
        .eq("registration_id", registration.registration_id)

      if (updateError) {
        console.error("Webhook: failed to mark registration as paid:", updateError)
      }
    }
  } else if (event.event === "payment.failed" && orderId) {
    const db = createServerClient()
    await db
      .from("registrations")
      .update({ payment_status: "failed" })
      .eq("razorpay_order_id", orderId)
      .neq("payment_status", "paid")
  }

  // Always acknowledge with 200 so Razorpay doesn't keep retrying a handled event.
  return NextResponse.json({ success: true })
}
