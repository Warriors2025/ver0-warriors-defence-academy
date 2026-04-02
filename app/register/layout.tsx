import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register Now - Enroll for Defence Coaching",
  description: "Register for NDA, CDS, AFCAT, SSB courses at Warriors Defence Academy. Start your defence career journey today. Limited seats available for upcoming batches.",
  keywords: ["register for NDA coaching", "defence academy admission", "enroll for CDS course", "SSB training registration"],
  openGraph: {
    title: "Register at Warriors Defence Academy",
    description: "Enroll for NDA, CDS, AFCAT & SSB coaching. Limited seats. Start your defence career today.",
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
