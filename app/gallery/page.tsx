import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryContent } from "@/components/gallery-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | Warriors Defence Academy",
  description: "Explore our campus, training facilities, and success stories through our photo and video gallery.",
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <GalleryContent />
      <Footer />
    </main>
  )
}
