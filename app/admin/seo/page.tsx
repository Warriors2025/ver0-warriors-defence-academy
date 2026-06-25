import Link from "next/link"
import { Search, ChevronRight, AlertTriangle, CheckCircle2, FileText, BookOpen } from "lucide-react"
import { CMS_PAGES } from "@/lib/cms-pages"
import { getSiteContent } from "@/lib/site-content.server"
import { createServerClient } from "@/lib/supabase"
import { mergePageSeo, mergeEntitySeo, entitySeoKey, analyzePageSeo, SITE_URL } from "@/lib/seo"

function ScoreBadge({ score, warnings }: { score: number; warnings: string[] }) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${score >= 80 ? "bg-emerald-100 text-emerald-700" : score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
        {score}/100
      </span>
      {warnings.length === 0 ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-amber-600" />
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}

export default async function AdminSeoIndexPage() {
  const content = await getSiteContent()
  const store = content.seo ?? { pages: {}, images: {}, headings: {} }

  const pageRows = CMS_PAGES.map((page) => {
    const seo = mergePageSeo(page.slug, store.pages[page.slug])
    const analysis = analyzePageSeo(seo)
    return { page, analysis }
  })

  let blogRows: { slug: string; title: string; analysis: ReturnType<typeof analyzePageSeo> }[] = []
  let courseRows: { slug: string; title: string; analysis: ReturnType<typeof analyzePageSeo> }[] = []

  try {
    const db = createServerClient()
    const [{ data: posts }, { data: courses }] = await Promise.all([
      db.from("blog_posts").select("slug, title, excerpt").order("title"),
      db.from("courses").select("slug, title, short_description").order("sort_order"),
    ])
    blogRows = (posts ?? []).map((post) => {
      const seo = mergeEntitySeo("blog", post.slug as string, store.pages[entitySeoKey("blog", post.slug as string)], {
        title: post.title as string,
        description: (post.excerpt as string) || "",
        path: `/blog/${post.slug}`,
      })
      return { slug: post.slug as string, title: post.title as string, analysis: analyzePageSeo(seo) }
    })
    courseRows = (courses ?? []).map((course) => {
      const seo = mergeEntitySeo("course", course.slug as string, store.pages[entitySeoKey("course", course.slug as string)], {
        title: course.title as string,
        description: (course.short_description as string) || "",
        path: `/courses/${course.slug}`,
      })
      return { slug: course.slug as string, title: course.title as string, analysis: analyzePageSeo(seo) }
    })
  } catch {
    // Supabase unavailable — show static pages only
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" /> SEO Manager
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Meta titles, descriptions, schema, image alt text, and heading tags across your site.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Sitemap: <a href={`${SITE_URL}/sitemap.xml`} target="_blank" rel="noopener noreferrer" className="text-primary underline">{SITE_URL}/sitemap.xml</a>
          {" · "}
          Robots: <a href={`${SITE_URL}/robots.txt`} target="_blank" rel="noopener noreferrer" className="text-primary underline">{SITE_URL}/robots.txt</a>
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <FileText className="h-4 w-4" /> Site Pages
        </h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {pageRows.map(({ page, analysis }) => (
            <Link
              key={page.slug}
              href={`/admin/seo/${page.slug}`}
              className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/40 transition-colors group"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">{page.title}</p>
                <p className="text-xs text-muted-foreground truncate">{page.path}</p>
              </div>
              <ScoreBadge score={analysis.score} warnings={analysis.warnings} />
            </Link>
          ))}
        </div>
      </section>

      {courseRows.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Course Pages
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {courseRows.map(({ slug, title, analysis }) => (
              <Link
                key={slug}
                href={`/admin/seo/entity/course/${slug}`}
                className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/40 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">{title}</p>
                  <p className="text-xs text-muted-foreground truncate">/courses/{slug}</p>
                </div>
                <ScoreBadge score={analysis.score} warnings={analysis.warnings} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {blogRows.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <FileText className="h-4 w-4" /> Blog Posts
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {blogRows.map(({ slug, title, analysis }) => (
              <Link
                key={slug}
                href={`/admin/seo/entity/blog/${slug}`}
                className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/40 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">{title}</p>
                  <p className="text-xs text-muted-foreground truncate">/blog/{slug}</p>
                </div>
                <ScoreBadge score={analysis.score} warnings={analysis.warnings} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
