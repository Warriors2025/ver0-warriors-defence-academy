import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogContent } from "@/components/blog-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Warriors Defence Academy",
  description: "Expert insights, preparation strategies, and success tips for NDA, CDS, SSB, and AFCAT examinations.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogContent />
      <Footer />
    </div>
  )
}
