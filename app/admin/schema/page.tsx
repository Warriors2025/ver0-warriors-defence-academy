import Link from "next/link"
import { Code2, ChevronRight, FileText, BookOpen, Building2, Plus, Newspaper } from "lucide-react"
import { CMS_PAGES } from "@/lib/cms-pages"
import { FACILITIES } from "@/lib/facilities-data"
import { getSiteContent } from "@/lib/site-content.server"
import { createServerClient } from "@/lib/supabase"
import {
  mergePageSeo,
  mergeEntitySeo,
  entitySeoKey,
  DEFAULT_PAGE_SEO,
  type PageSeo,
} from "@/lib/seo"
import { AddCustomSchemaButton } from "@/components/admin/add-custom-schema-button"

function SchemaBadge({ type }: { type: PageSeo["schemaType"] }) {
  if (type === "none") {
    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Off</span>
  }
  if (type === "custom") {
    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">Custom</span>
  }
  return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{type}</span>
}

function Row({
  href,
  title,
  path,
  schemaType,
}: {
  href: string
  title: string
  path: string
  schemaType: PageSeo["schemaType"]
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/40 transition-colors group"
    >
      <div className="min-w-0">
        <p className="font-medium text-foreground group-hover:text-primary transition-colors">{title}</p>
        <p className="text-xs text-muted-foreground truncate font-mono">{path}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <SchemaBadge type={schemaType} />
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </Link>
  )
}

function editHref(key: string) {
  return `/admin/schema/edit?key=${encodeURIComponent(key)}`
}

export default async function AdminSchemaIndexPage() {
  const content = await getSiteContent()
  const store = content.seo ?? { pages: {}, images: {}, headings: {} }

  const pageRows = CMS_PAGES.map((page) => {
    const seo = mergePageSeo(page.slug, store.pages[page.slug])
    return { page, schemaType: seo.schemaType }
  })

  const facilityRows = FACILITIES.map((f) => {
    const key = `facility:${f.slug}`
    const seo = { ...DEFAULT_PAGE_SEO, ...store.pages[key] }
    return { key, title: f.title, path: `/facilities/${f.slug}`, schemaType: seo.schemaType }
  })

  let blogRows: { slug: string; title: string; schemaType: PageSeo["schemaType"] }[] = []
  let courseRows: { slug: string; title: string; schemaType: PageSeo["schemaType"] }[] = []

  try {
    const db = createServerClient()
    const [{ data: posts }, { data: courses }] = await Promise.all([
      db.from("blog_posts").select("slug, title, excerpt").order("title"),
      db.from("courses").select("slug, title, short_description").order("sort_order"),
    ])
    blogRows = (posts ?? []).map((post) => {
      const key = entitySeoKey("blog", post.slug as string)
      const seo = mergeEntitySeo("blog", post.slug as string, store.pages[key], {
        title: post.title as string,
        description: (post.excerpt as string) || "",
        path: `/blog/${post.slug}`,
      })
      return { slug: post.slug as string, title: post.title as string, schemaType: seo.schemaType }
    })
    courseRows = (courses ?? []).map((course) => {
      const key = entitySeoKey("course", course.slug as string)
      const seo = mergeEntitySeo("course", course.slug as string, store.pages[key], {
        title: (course as { title?: string }).title || "",
        description: ((course as { short_description?: string }).short_description) || "",
        path: `/courses/${(course as { slug?: string }).slug}`,
      })
      return {
        slug: (course as { slug: string }).slug,
        title: (course as { title: string }).title,
        schemaType: seo.schemaType,
      }
    })
  } catch {
    // DB unavailable
  }

  // Custom schema pages (keys starting with custom:)
  const knownKeys = new Set([
    ...CMS_PAGES.map((p) => p.slug),
    ...FACILITIES.map((f) => `facility:${f.slug}`),
    ...blogRows.map((b) => entitySeoKey("blog", b.slug)),
    ...courseRows.map((c) => entitySeoKey("course", c.slug)),
  ])
  const customRows = Object.keys(store.pages)
    .filter((k) => k.startsWith("custom:") || !knownKeys.has(k) && !k.includes(":"))
    .filter((k) => !CMS_PAGES.some((p) => p.slug === k))
    .map((key) => {
      const seo = { ...DEFAULT_PAGE_SEO, ...store.pages[key] }
      const path = key.startsWith("custom:") ? key.slice(7) : `/${key}`
      return {
        key,
        title: seo.metaTitle || path,
        path,
        schemaType: seo.schemaType,
      }
    })
    .filter((r) => r.key.startsWith("custom:"))

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" /> Schema Markup
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Edit JSON-LD schema for any page — presets or fully custom markup.
          </p>
        </div>
        <AddCustomSchemaButton />
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <FileText className="h-4 w-4" /> Site Pages
        </h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {pageRows.map(({ page, schemaType }) => (
            <Row
              key={page.slug}
              href={editHref(page.slug)}
              title={page.title}
              path={page.path}
              schemaType={schemaType}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Building2 className="h-4 w-4" /> Facility Pages
        </h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {facilityRows.map((row) => (
            <Row
              key={row.key}
              href={editHref(row.key)}
              title={row.title}
              path={row.path}
              schemaType={row.schemaType}
            />
          ))}
        </div>
      </section>

      {courseRows.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Course Pages
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {courseRows.map((row) => (
              <Row
                key={row.slug}
                href={editHref(entitySeoKey("course", row.slug))}
                title={row.title}
                path={`/courses/${row.slug}`}
                schemaType={row.schemaType}
              />
            ))}
          </div>
        </section>
      )}

      {blogRows.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <Newspaper className="h-4 w-4" /> Blog Posts
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {blogRows.map((row) => (
              <Row
                key={row.slug}
                href={editHref(entitySeoKey("blog", row.slug))}
                title={row.title}
                path={`/blog/${row.slug}`}
                schemaType={row.schemaType}
              />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Plus className="h-4 w-4" /> Custom Pages
        </h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {customRows.length === 0 ? (
            <p className="text-sm text-muted-foreground px-5 py-8 text-center">
              No custom pages yet. Click &quot;Add Page Schema&quot; to create one for any URL.
            </p>
          ) : (
            customRows.map((row) => (
              <Row
                key={row.key}
                href={editHref(row.key)}
                title={row.title}
                path={row.path}
                schemaType={row.schemaType}
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}
