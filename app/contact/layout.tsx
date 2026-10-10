import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Warriors Defence Academy Lucknow",
  description: "Contact Warriors Defence Academy for NDA, CDS, AFCAT & SSB coaching inquiries. Visit our campus in Lucknow or call +91 70810 11964. Get free career counseling.",
  keywords: ["contact defence academy", "NDA coaching Lucknow address", "defence coaching near me", "Warriors Defence Academy contact"],
  openGraph: {
    title: "Contact Warriors Defence Academy",
    description: "Get in touch for defence coaching inquiries. Free counseling available. Call +91 70810 11964.",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
