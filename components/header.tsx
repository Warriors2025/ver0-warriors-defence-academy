import { getSiteContent } from "@/lib/site-content"
import { HeaderNav } from "@/components/header-nav"
import { Phone } from "lucide-react"

export function Header() {
  const content = getSiteContent()
  const { text, phone } = content.announcement

  return (
    <>
      {/* Announcement bar — server rendered, reads from content.json */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {text}
          </span>
          <span className="hidden sm:block text-primary-foreground/30">|</span>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-accent hover:underline font-medium"
          >
            <Phone className="h-3 w-3" />
            {phone}
          </a>
        </div>
      </div>

      {/* Interactive sticky nav — client component */}
      <HeaderNav phone={phone} />
    </>
  )
}
