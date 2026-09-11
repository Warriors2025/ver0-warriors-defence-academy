/**
 * Pure pricing constants for the registration seat-booking fee. Kept separate
 * from lib/razorpay.ts (which pulls in the Razorpay SDK and server env vars)
 * so this can also be imported from client components to show the price
 * before checkout opens.
 */

/**
 * Seat-booking fee charged at registration (in INR, whole rupees).
 * The full course fee is settled separately later via the manual /fee-payment flow.
 * Change this single constant to adjust the amount charged at registration.
 */
export const SEAT_BOOKING_FEE_INR = 1000

/**
 * Razorpay's own transaction fee is passed on to the student instead of being
 * absorbed by the academy. Razorpay charges ~2% + 18% GST on cards/netbanking/
 * wallets (UPI is typically fee-free under the RBI zero-MDR rule, but the exact
 * rate depends on the payment method the student picks inside the checkout
 * widget, which isn't known until after checkout opens). We approximate this
 * upfront with a fixed pass-through percentage so the amount is fixed before
 * the Razorpay order is created. Adjust to match your actual negotiated rate.
 */
export const GATEWAY_FEE_PASS_THROUGH_PERCENT = 2.36

export function calculateTotalPayable(baseAmountInr: number) {
  const gatewayFee = Math.round(baseAmountInr * (GATEWAY_FEE_PASS_THROUGH_PERCENT / 100))
  const total = baseAmountInr + gatewayFee
  return { baseAmountInr, gatewayFee, total }
}
