import Razorpay from "razorpay"
import crypto from "crypto"

export { SEAT_BOOKING_FEE_INR, calculateTotalPayable } from "@/lib/pricing"

let client: Razorpay | null = null

export function getRazorpayClient(): Razorpay {
  if (client) return client
  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET
  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment."
    )
  }
  client = new Razorpay({ key_id, key_secret })
  return client
}

/** Verifies the signature returned by Razorpay Checkout after a successful payment. */
export function verifyPaymentSignature(params: {
  orderId: string
  paymentId: string
  signature: string
}) {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) throw new Error("RAZORPAY_KEY_SECRET is not set.")
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex")
  return timingSafeEqualHex(expected, params.signature)
}

/** Verifies the `X-Razorpay-Signature` header on incoming webhook requests. */
export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET is not set.")
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex")
  return timingSafeEqualHex(expected, signature)
}

function timingSafeEqualHex(a: string, b: string) {
  const bufA = Buffer.from(a, "hex")
  const bufB = Buffer.from(b, "hex")
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export function makeReceiptNo(registrationId: string) {
  return `WDA-RCPT-${registrationId.replace(/^WDA/, "")}`
}
