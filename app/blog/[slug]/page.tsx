import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Phone,
  ChevronRight,
  BookOpen,
  Shield,
} from "lucide-react"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog"
import { getSiteContent } from "@/lib/site-content.server"
import {
  getEntitySeo,
  buildPathMetadata,
  getEntitySchemaJsonLd,
  getEntityHeadingLevel,
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

  const [schema, titleHeading, content, allPosts] = await Promise.all([
    getEntitySchemaJsonLd("blog", slug, {
      title: post.title,
      description: post.excerpt,
      path: `/blog/${slug}`,
      image: post.image,
      author: post.author,
    }),
    getEntityHeadingLevel("blog", slug, "title", "h1"),
    getSiteContent(),
    getBlogPosts(),
  ])

  const imgSeo = resolveImageSeo(mergeSeoStore(content.seo), post.image, { alt: post.title })
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aSame = a.category === post.category ? 1 : 0
      const bSame = b.category === post.category ? 1 : 0
      return bSame - aSame
    })
    .slice(0, 3)

  const phone = content.contact?.phone1 || "+91 94522 45729"

  return (
    <main className="min-h-screen bg-background">
      <PageJsonLd data={schema} />
      <Header />

      <article>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="absolute inset-0 hero-pattern opacity-40" />

          <div className="container relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-10 md:pb-20 md:pt-12">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-primary-foreground/60"
            >
              <Link href="/" className="transition-colors hover:text-primary-foreground">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
              <Link href="/blog" className="transition-colors hover:text-primary-foreground">
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
              <span className="line-clamp-1 text-primary-foreground/85">{post.title}</span>
            </nav>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-md bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
                {post.category}
              </span>
              {post.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                  <Shield className="h-3 w-3" />
                  Featured
                </span>
              )}
            </div>

            <HeadingTag
              level={titleHeading}
              className="mb-8 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]"
            >
              {post.title}
            </HeadingTag>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10">
                  <User className="h-3.5 w-3.5" />
                </span>
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 opacity-70" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 opacity-70" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* ── Featured image ───────────────────────────────────────────── */}
        {post.image && (
          <div className="container relative z-10 mx-auto -mt-8 max-w-4xl px-4 md:-mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border shadow-xl md:rounded-2xl">
              <Image
                src={post.image}
                alt={imgSeo.alt || post.title}
                title={imgSeo.title || undefined}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        )}

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <section className="bg-background py-10 md:py-14">
          <div className="container mx-auto max-w-3xl px-4">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags?.length > 0 && (
              <div className="mt-12 border-t border-border pt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="gap-2 border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all articles
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-20">
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5">
              <BookOpen className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
                Ready to begin?
              </span>
            </div>
            <h2 className="mb-4 text-2xl font-bold leading-tight md:text-3xl">
              Train with India&apos;s best{" "}
              <span className="text-accent">NDA coaching</span> in Lucknow
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-foreground/75 leading-relaxed">
              5,000+ selections, retired military faculty, and India&apos;s largest GTO ground —
              structured coaching for NDA, CDS, AFCAT &amp; SSB.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${phone.replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  className="h-12 gap-2 bg-accent px-7 font-semibold text-accent-foreground hover:bg-accent/90 cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
              <a
                href="https://wa.me/919452245729?text=Hi%21%20I%20read%20your%20blog%20and%20want%20counselling%20for%20NDA%20coaching."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 gap-2 border-primary-foreground/35 bg-transparent px-7 font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground cursor-pointer"
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ── Related ──────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-border bg-muted/30 py-14 md:py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-accent" />
                <h2 className="text-xl font-bold text-foreground md:text-2xl">
                  Related Articles
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.id} href={`/blog/${item.slug}`} className="group block">
                    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-lg">
                      <div className="relative h-40 shrink-0 overflow-hidden bg-secondary">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                          {item.category}
                        </span>
                        <h3 className="mb-3 line-clamp-2 flex-1 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.readTime}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary transition-all group-hover:gap-2">
                            Read <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  )
}
