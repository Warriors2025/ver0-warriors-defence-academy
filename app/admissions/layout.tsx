import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admissions - Fee Structure & Eligibility",
  description: "Warriors Defence Academy admissions open. Check fee structure, eligibility criteria, scholarship options for NDA, CDS, AFCAT & SSB courses. Apply now for upcoming batches.",
  keywords: ["NDA coaching fees", "defence academy admission", "CDS course eligibility", "SSB training fees", "defence coaching scholarship"],
  openGraph: {
    title: "Admissions | Warriors Defence Academy",
    description: "Admissions open for NDA, CDS, AFCAT & SSB courses. Check fees, eligibility & scholarships.",
  },
}

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
