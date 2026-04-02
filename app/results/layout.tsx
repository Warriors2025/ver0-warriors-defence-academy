import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Results & Selections - 5000+ Success Stories",
  description: "View Warriors Defence Academy's proven track record. 5000+ successful selections in NDA, CDS, AFCAT & SSB. See our toppers and success stories from India's best defence coaching.",
  keywords: ["NDA results", "CDS selections", "defence academy results", "SSB success stories", "NDA toppers"],
  openGraph: {
    title: "Results | Warriors Defence Academy",
    description: "5000+ successful selections. View our NDA, CDS, AFCAT toppers and success stories.",
  },
}

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
