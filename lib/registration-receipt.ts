/** Client-safe helpers for post-payment confirmation sharing. */

export type ReceiptShareParams = {
  phone: string
  name: string
  receiptNo: string
  registrationId: string
  amount: number
  paymentId?: string | null
}

export function confirmationText(p: ReceiptShareParams) {
  return [
    `Warriors Defence Academy — Seat Confirmed`,
    ``,
    `Hi ${p.name},`,
    `Your SSB seat booking is confirmed.`,
    `Receipt: ${p.receiptNo}`,
    `Registration ID: ${p.registrationId}`,
    `Amount paid: ₹${p.amount.toFixed(2)}`,
    p.paymentId ? `Payment ID: ${p.paymentId}` : null,
    ``,
    `Our counselor will call you within 24 hours.`,
    `Helpline: +91 70810 11964`,
    `Jai Hind!`,
  ]
    .filter(Boolean)
    .join("\n")
}

export function buildWhatsAppShareUrl(params: ReceiptShareParams) {
  return `https://wa.me/?text=${encodeURIComponent(confirmationText(params))}`
}
