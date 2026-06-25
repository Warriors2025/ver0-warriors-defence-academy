import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogContent } from "@/components/blog-client"
import { getBlogPosts } from "@/lib/blog"
import type { Metadata } from "next"
import { getPageSeo, buildPageMetadata, getPageSchemaJsonLd } from "@/lib/seo.server"
import { PageJsonLd } from "@/components/seo/page-json-ld"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blog")
  return buildPageMetadata("blog", seo)
}

export default async function BlogPage() {
  const [posts, schema] = await Promise.all([
    getBlogPosts(),
    getPageSchemaJsonLd("blog"),
  ])
  return (
    <div className="min-h-screen bg-background">
      <PageJsonLd data={schema} />
      <Header />
      <BlogContent posts={posts} />
      <Footer />
    </div>
  )
}
