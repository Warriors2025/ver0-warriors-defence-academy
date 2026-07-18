import { getSiteContent } from "@/lib/site-content.server"
import { HeaderNav } from "@/components/header-nav"
import { CmsField } from "@/components/cms/cms-field"
import { Phone } from "lucide-react"

export async function Header() {
  const content = await getSiteContent()
  const { text, phone } = content.announcement
  const navigation = content.navigation

  return (
    <>
      {/* Announcement bar — server rendered, reads from content.json */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <CmsField id="announcement.text" label="Announcement Text" section="announcement">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {text}
            </span>
          </CmsField>
          <span className="hidden sm:block text-primary-foreground/30">|</span>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-accent hover:underline font-medium"
          >
            <Phone className="h-3 w-3" />
            <CmsField id="announcement.phone" label="Announcement Phone" section="announcement">{phone}</CmsField>
          </a>
        </div>
      </div>

      {/* Interactive sticky nav — client component */}
      <HeaderNav
        phone={phone}
        navLinks={navigation?.navLinks}
        courses={navigation?.courses}
      />
    </>
  )
}
