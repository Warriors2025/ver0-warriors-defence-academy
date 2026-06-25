"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import type { SiteContent } from "@/lib/site-content"
import { CmsField } from "@/components/cms/cms-field"

type Props = { contact: SiteContent["contact"] }

export function FooterContactInfo({ contact }: Props) {
  return (
    <ul className="space-y-4">
      <li className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
        <CmsField id="contact.address" label="Address" section="contact" block>
          <span className="text-brand-deep-foreground/80">{contact.address}</span>
        </CmsField>
      </li>
      <li className="flex items-center gap-3">
        <Phone className="h-5 w-5 text-accent flex-shrink-0" />
        <a href={`tel:${contact.phone1.replace(/\s/g, "")}`} className="text-brand-deep-foreground/80 hover:text-accent transition-colors">
          <CmsField id="contact.phone1" label="Phone 1" section="contact">{contact.phone1}</CmsField>
        </a>
      </li>
      {contact.phone2 && (
        <li className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-accent flex-shrink-0" />
          <a href={`tel:${contact.phone2.replace(/\s/g, "")}`} className="text-brand-deep-foreground/80 hover:text-accent transition-colors">
            <CmsField id="contact.phone2" label="Phone 2" section="contact">{contact.phone2}</CmsField>
          </a>
        </li>
      )}
      <li className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-accent flex-shrink-0" />
        <a href={`mailto:${contact.email}`} className="text-brand-deep-foreground/80 hover:text-accent transition-colors">
          <CmsField id="contact.email" label="Email" section="contact">{contact.email}</CmsField>
        </a>
      </li>
    </ul>
  )
}
