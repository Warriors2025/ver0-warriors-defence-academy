import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/blog"
import { getSiteContent } from "@/lib/site-content.server"
import {
  getEntitySeo, buildPathMetadata, getEntitySchemaJsonLd, getEntityHeadingLevel,
} from "@/lib/seo.server"
import { mergeSeoStore, resolveImageSeo } from "@/lib/seo"
import { HeadingTag } from "@/components/seo/heading-tag"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import type { Metadata } from "next"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }
  const seo = await getEntitySeo("blog", slug, {
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image,
    author: post.author,
  })
  return buildPathMetadata(seo, `/blog/${slug}`, false, "article")
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const [schema, titleHeading, content] = await Promise.all([
    getEntitySchemaJsonLd("blog", slug, {
      title: post.title,
      description: post.excerpt,
      path: `/blog/${slug}`,
      image: post.image,
      author: post.author,
    }),
    getEntityHeadingLevel("blog", slug, "title", "h1"),
    getSiteContent(),
  ])

  const imgSeo = resolveImageSeo(mergeSeoStore(content.seo), post.image, { alt: post.title })

  return (
    <main className="min-h-screen">
      <PageJsonLd data={schema} />
      <Header />

      <article>
        <section className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground mb-6 gap-1.5 -ml-2">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Button>
            </Link>
            <Badge className="bg-accent text-accent-foreground mb-4">{post.category}</Badge>
            <HeadingTag level={titleHeading} className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </HeadingTag>
            <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
            </div>
          </div>
        </section>

        {post.image && (
          <div className="container mx-auto px-4 -mt-8 max-w-4xl relative z-10">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-border">
              <Image src={post.image} alt={imgSeo.alt || post.title} title={imgSeo.title || undefined} fill className="object-cover" priority />
            </div>
          </div>
        )}

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
            />
          </div>
        </section>
      </article>

      <Footer />
    </main>
  )
}
