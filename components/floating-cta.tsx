import { getSiteContent } from "@/lib/site-content.server"
import { FloatingCtaButtons } from "@/components/floating-cta-buttons"

/** Site-wide floating Call + WhatsApp CTAs (hidden on /admin). */
export async function FloatingCta() {
  const { contact } = await getSiteContent()
  const phone = contact.phone1 || contact.phone2
  if (!phone) return null
  return <FloatingCtaButtons phone={phone} />
}
