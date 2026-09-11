/**
 * Pure pricing constants for the registration seat-booking fee. Kept separate
 * from lib/razorpay.ts (which pulls in the Razorpay SDK and server env vars)
 * so this can also be imported from client components to show the price
 * before checkout opens.
 */

/**
 * Seat-booking fee charged at registration (in INR, whole rupees).
 * Inclusive of tax and payment gateway charges. The full course fee is settled
 * separately later via the manual /fee-payment flow.
 * Change this single constant to adjust the amount charged at registration.
 */
export const SEAT_BOOKING_FEE_INR = 1499

/**
 * Returns the amount charged at registration. Kept as a function so call sites
 * (UI + Razorpay order creation) share one source of truth.
 */
export function calculateTotalPayable(baseAmountInr: number = SEAT_BOOKING_FEE_INR) {
  return {
    baseAmountInr,
    gatewayFee: 0,
    total: baseAmountInr,
  }
}
