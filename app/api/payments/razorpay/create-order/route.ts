import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { calculateTotalPayable, getRazorpayClient, SEAT_BOOKING_FEE_INR } from "@/lib/razorpay"

export const runtime = "nodejs"

/**
 * Creates (or re-creates, on retry) a Razorpay order for the seat-booking fee
 * of an already-saved registration, and stores the order id against it.
 */
export async function POST(request: Request) {
  try {
    const { registrationId } = await request.json()
    if (!registrationId || typeof registrationId !== "string") {
      return NextResponse.json(
        { success: false, message: "registrationId is required" },
        { status: 400 }
      )
    }

    const db = createServerClient()
    const { data: registration, error: fetchError } = await db
      .from("registrations")
      .select("registration_id, first_name, last_name, email, phone, payment_status")
      .eq("registration_id", registrationId)
      .single()

    if (fetchError || !registration) {
      console.error("Razorpay create-order: registration lookup failed:", fetchError)
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 404 }
      )
    }
    if (registration.payment_status === "paid") {
      return NextResponse.json(
        { success: false, message: "This registration has already been paid for." },
        { status: 409 }
      )
    }

    const { total } = calculateTotalPayable(SEAT_BOOKING_FEE_INR)
    const razorpay = getRazorpayClient()
    const order = await razorpay.orders.create({
      amount: total * 100, // paise
      currency: "INR",
      receipt: registrationId,
      notes: {
        registrationId,
        name: `${registration.first_name} ${registration.last_name}`,
        email: registration.email,
        phone: registration.phone,
      },
    })

    const { error: updateError } = await db
      .from("registrations")
      .update({ razorpay_order_id: order.id, amount: total })
      .eq("registration_id", registrationId)

    if (updateError) {
      console.error("Failed to store Razorpay order id:", updateError)
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: `${registration.first_name} ${registration.last_name}`,
      email: registration.email,
      phone: registration.phone,
    })
  } catch (error) {
    console.error("Razorpay create-order error:", error)
    return NextResponse.json(
      { success: false, message: "Could not start payment. Please try again." },
      { status: 500 }
    )
  }
}
