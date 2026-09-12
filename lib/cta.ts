/** Site-wide contact CTAs — prefer Call / WhatsApp over /register links. */

export const SITE_PHONE_DISPLAY = "+91 94522 45729"
export const SITE_PHONE_TEL = "tel:+919452245729"
export const SITE_PHONE_SECONDARY_DISPLAY = "+91 70810 11964"
export const SITE_PHONE_SECONDARY_TEL = "tel:+917081011964"
export const SITE_WHATSAPP_NUMBER = "919452245729"

const DEFAULT_WA_MESSAGE =
  "Hi! I want to know more about defence coaching at Warriors Defence Academy."

export function siteWhatsAppHref(message: string = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${SITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function toTelHref(phone: string) {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return SITE_PHONE_TEL
  return `tel:+${digits.startsWith("91") ? digits : `91${digits.replace(/^0+/, "")}`}`
}
