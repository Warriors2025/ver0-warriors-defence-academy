import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { getRazorpayClient, makeReceiptNo, verifyPaymentSignature } from "@/lib/razorpay"

export const runtime = "nodejs"

/**
 * Called from the browser right after Razorpay Checkout reports success.
 * This is a fast-path confirmation for the UI; the webhook route is the
 * source of truth in case the user closes the tab before this call lands.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      registrationId,
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = body ?? {}

    if (!registrationId || !orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment details" },
        { status: 400 }
      )
    }

    const isValid = verifyPaymentSignature({ orderId, paymentId, signature })
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed. Please contact support." },
        { status: 400 }
      )
    }

    const db = createServerClient()
    const { data: registration, error: fetchError } = await db
      .from("registrations")
      .select("registration_id, razorpay_order_id, receipt_no, payment_status")
      .eq("registration_id", registrationId)
      .single()

    if (fetchError || !registration) {
      console.error("Razorpay verify: registration lookup failed:", fetchError)
      return NextResponse.json(
        { success: false, message: "Registration not found. Please contact support." },
        { status: 400 }
      )
    }

    // Retrying checkout can overwrite razorpay_order_id with a newer unpaid order.
    // If the paid order no longer matches the stored one, confirm via Razorpay notes.
    if (registration.razorpay_order_id !== orderId) {
      try {
        const razorpay = getRazorpayClient()
        const order = await razorpay.orders.fetch(orderId)
        const orderRegistrationId =
          order?.notes && typeof order.notes === "object"
            ? (order.notes as Record<string, string>).registrationId
            : undefined
        if (orderRegistrationId !== registrationId) {
          return NextResponse.json(
            { success: false, message: "Registration/order mismatch. Please contact support." },
            { status: 400 }
          )
        }
      } catch (orderError) {
        console.error("Razorpay verify: could not fetch order for mismatch check:", orderError)
        return NextResponse.json(
          { success: false, message: "Registration/order mismatch. Please contact support." },
          { status: 400 }
        )
      }
    }

    const receiptNo = registration.receipt_no || makeReceiptNo(registrationId)
    if (registration.payment_status !== "paid") {
      // status must be one of: pending | contacted | enrolled | rejected
      const { error: updateError } = await db
        .from("registrations")
        .update({
          payment_status: "paid",
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          receipt_no: receiptNo,
          status: "enrolled",
        })
        .eq("registration_id", registrationId)

      if (updateError) {
        console.error("Failed to mark registration as paid:", updateError)
        return NextResponse.json(
          {
            success: false,
            message: "Payment succeeded but could not be recorded. Please contact support.",
            detail: updateError.message,
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true, receiptNo })
  } catch (error) {
    console.error("Razorpay verify error:", error)
    return NextResponse.json(
      { success: false, message: "Could not verify payment. Please contact support." },
      { status: 500 }
    )
  }
}
