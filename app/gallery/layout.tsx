import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Photo Gallery - Campus, Training & Events",
  description: "Explore Warriors Defence Academy's photo gallery. View our GTO training ground, classroom facilities, student activities, and successful candidates at India's best defence coaching institute.",
  keywords: ["defence academy photos", "NDA coaching campus", "GTO training photos", "defence institute gallery"],
  openGraph: {
    title: "Gallery | Warriors Defence Academy",
    description: "View photos of our world-class facilities, training sessions, and successful candidates.",
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
