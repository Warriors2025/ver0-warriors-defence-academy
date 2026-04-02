import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Defence Exam Tips & Career Guidance",
  description: "Read expert tips for NDA, CDS, AFCAT & SSB preparation. Get career guidance, exam strategies, current affairs updates, and success stories from Warriors Defence Academy.",
  keywords: ["NDA preparation tips", "CDS exam strategy", "SSB interview tips", "defence career guidance", "current affairs for NDA"],
  openGraph: {
    title: "Blog | Warriors Defence Academy",
    description: "Expert tips, exam strategies & career guidance for defence aspirants.",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
