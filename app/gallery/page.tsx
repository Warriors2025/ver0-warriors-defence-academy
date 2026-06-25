import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryContent } from "@/components/gallery-client"
import { getGalleryItems } from "@/lib/gallery"
import type { Metadata } from "next"
import { getPageSeo, buildPageMetadata, getPageSchemaJsonLd } from "@/lib/seo.server"
import { PageJsonLd } from "@/components/seo/page-json-ld"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("gallery")
  return buildPageMetadata("gallery", seo)
}

export default async function GalleryPage() {
  const [items, schema] = await Promise.all([
    getGalleryItems(),
    getPageSchemaJsonLd("gallery"),
  ])
  return (
    <main className="min-h-screen">
      <PageJsonLd data={schema} />
      <Header />
      <GalleryContent items={items} />
      <Footer />
    </main>
  )
}
