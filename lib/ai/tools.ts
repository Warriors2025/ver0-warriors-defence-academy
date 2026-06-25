import { revalidatePath } from "next/cache"
import Anthropic from "@anthropic-ai/sdk"
import { CMS_PAGES } from "@/lib/cms-pages"
import { getSiteContent, saveSiteContent } from "@/lib/site-content.server"
import { mergePageSeo, mergeEntitySeo, entitySeoKey, analyzePageSeo, mergeSeoStore } from "@/lib/seo"
import { listRows, createRow, updateRow } from "@/lib/admin-crud"

export const AI_TOOLS: Anthropic.Tool[] = [
  {
    name: "list_cms_pages",
    description: "List all main site pages (home, about, courses listing, contact, blog, etc.) with slug, title, path, and admin paths.",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_site_content_summary",
    description: "Get current homepage/CMS content summary: announcement, hero, contact, and page heroes.",
    input_schema: {
      type: "object",
      properties: {
        section: { type: "string", enum: ["all", "hero", "announcement", "contact", "pages"], description: "Which section to read" },
      },
    },
  },
  {
    name: "update_hero",
    description: "Update homepage hero section text (badge, headline, highlight, tagline, feature pills).",
    input_schema: {
      type: "object",
      properties: {
        badge: { type: "string" },
        headline: { type: "string" },
        highlightText: { type: "string" },
        tagline: { type: "string" },
        features: { type: "array", items: { type: "string" }, description: "Feature pill strings" },
      },
    },
  },
  {
    name: "update_announcement",
    description: "Update the top announcement bar on every page.",
    input_schema: {
      type: "object",
      properties: {
        text: { type: "string" },
        phone: { type: "string" },
      },
    },
  },
  {
    name: "update_page_hero",
    description: "Update hero title/subtitle for a site page (about, contact, courses, results, admissions, register).",
    input_schema: {
      type: "object",
      properties: {
        page: { type: "string", enum: ["about", "contact", "courses", "results", "admissions", "register"] },
        title: { type: "string" },
        subtitle: { type: "string" },
        eyebrow: { type: "string" },
      },
      required: ["page"],
    },
  },
  {
    name: "get_seo",
    description: "Read SEO settings for a page, blog post, or course. Returns meta title, description, schema type, and SEO score.",
    input_schema: {
      type: "object",
      properties: {
        target_type: { type: "string", enum: ["page", "blog", "course"], description: "Type of content" },
        slug: { type: "string", description: "Page slug (home, about...) or blog/course slug" },
      },
      required: ["target_type", "slug"],
    },
  },
  {
    name: "update_seo",
    description: "Update SEO meta title, description, keywords, schema, and robots for a page, blog post, or course.",
    input_schema: {
      type: "object",
      properties: {
        target_type: { type: "string", enum: ["page", "blog", "course"] },
        slug: { type: "string" },
        metaTitle: { type: "string" },
        metaDescription: { type: "string" },
        metaKeywords: { type: "string" },
        focusKeyword: { type: "string" },
        schemaType: { type: "string", description: "e.g. WebPage, BlogPosting, Course, EducationalOrganization, FAQPage, or none" },
        robotsIndex: { type: "boolean" },
        ogImage: { type: "string" },
        featuredSnippet: { type: "string", description: "Direct answer block for AI search" },
      },
      required: ["target_type", "slug"],
    },
  },
  {
    name: "list_blog_posts",
    description: "List all blog posts with id, title, slug, published status.",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "create_blog_post",
    description: "Create a new blog post with SEO-friendly content.",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        excerpt: { type: "string" },
        content: { type: "string", description: "Full article body (plain text or HTML)" },
        category: { type: "string" },
        author: { type: "string" },
        image_url: { type: "string" },
        is_published: { type: "boolean" },
        metaTitle: { type: "string" },
        metaDescription: { type: "string" },
      },
      required: ["title", "slug", "excerpt", "content"],
    },
  },
  {
    name: "update_blog_post",
    description: "Update an existing blog post by id.",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        slug: { type: "string" },
        excerpt: { type: "string" },
        content: { type: "string" },
        category: { type: "string" },
        is_published: { type: "boolean" },
      },
      required: ["id"],
    },
  },
  {
    name: "list_courses",
    description: "List all courses with id, title, slug, tagline.",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "update_course",
    description: "Update course fields (title, tagline, description, duration, features).",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Course UUID from list_courses" },
        title: { type: "string" },
        tagline: { type: "string" },
        short_description: { type: "string" },
        duration: { type: "string" },
        features: { type: "array", items: { type: "string" } },
        metaTitle: { type: "string" },
        metaDescription: { type: "string" },
      },
      required: ["id"],
    },
  },
]

export async function executeAiTool(name: string, input: Record<string, unknown>): Promise<string> {
  try {
    switch (name) {
      case "list_cms_pages":
        return JSON.stringify(CMS_PAGES.map((p) => ({
          slug: p.slug, title: p.title, path: p.path, adminPath: p.adminPath, visualEditor: p.visualEditor,
        })), null, 2)

      case "get_site_content_summary": {
        const content = await getSiteContent()
        const section = (input.section as string) || "all"
        const summary: Record<string, unknown> = {}
        if (section === "all" || section === "announcement") summary.announcement = content.announcement
        if (section === "all" || section === "hero") summary.hero = content.hero
        if (section === "all" || section === "contact") summary.contact = content.contact
        if (section === "all" || section === "pages") {
          summary.pages = Object.fromEntries(
            Object.entries(content.pages).map(([k, v]) => [k, { hero: v.hero, title: (v as { title?: string }).title }])
          )
        }
        return JSON.stringify(summary, null, 2)
      }

      case "update_hero": {
        const content = await getSiteContent()
        const hero = { ...content.hero }
        if (input.badge) hero.badge = String(input.badge)
        if (input.headline) hero.headline = String(input.headline)
        if (input.highlightText) hero.highlightText = String(input.highlightText)
        if (input.tagline) hero.tagline = String(input.tagline)
        if (Array.isArray(input.features)) hero.features = input.features.map(String)
        await saveSiteContent({ ...content, hero })
        revalidatePath("/")
        return JSON.stringify({ success: true, message: "Homepage hero updated", hero })
      }

      case "update_announcement": {
        const content = await getSiteContent()
        const announcement = { ...content.announcement }
        if (input.text) announcement.text = String(input.text)
        if (input.phone) announcement.phone = String(input.phone)
        await saveSiteContent({ ...content, announcement })
        revalidatePath("/")
        return JSON.stringify({ success: true, announcement })
      }

      case "update_page_hero": {
        const pageKey = String(input.page) as "about" | "contact" | "courses" | "results" | "admissions" | "register"
        const content = await getSiteContent()
        const pages = { ...content.pages }
        const current = pages[pageKey]
        if (!current) return JSON.stringify({ error: `Unknown page: ${pageKey}` })
        pages[pageKey] = {
          ...current,
          hero: {
            ...current.hero,
            ...(input.title ? { title: String(input.title) } : {}),
            ...(input.subtitle ? { subtitle: String(input.subtitle) } : {}),
            ...(input.eyebrow ? { eyebrow: String(input.eyebrow) } : {}),
          },
        }
        await saveSiteContent({ ...content, pages })
        const cmsPage = CMS_PAGES.find((p) => p.slug === pageKey)
        if (cmsPage?.path) revalidatePath(cmsPage.path)
        return JSON.stringify({ success: true, page: pageKey, hero: pages[pageKey].hero })
      }

      case "get_seo": {
        const targetType = String(input.target_type)
        const slug = String(input.slug)
        const content = await getSiteContent()
        const store = mergeSeoStore(content.seo)
        if (targetType === "page") {
          const seo = mergePageSeo(slug, store.pages[slug])
          return JSON.stringify({ seo, analysis: analyzePageSeo(seo) })
        }
        if (targetType === "blog" || targetType === "course") {
          const posts = targetType === "blog" ? await listRows("blog_posts", "created_at") : await listRows("courses", "sort_order")
          const item = posts.find((r) => r.slug === slug)
          const path = targetType === "blog" ? `/blog/${slug}` : `/courses/${slug}`
          const seo = mergeEntitySeo(targetType, slug, store.pages[entitySeoKey(targetType, slug)], {
            title: String(item?.title ?? slug),
            description: String(item?.excerpt ?? item?.short_description ?? ""),
            path,
          })
          return JSON.stringify({ seo, analysis: analyzePageSeo(seo), item: item ? { id: item.id, title: item.title } : null })
        }
        return JSON.stringify({ error: "Invalid target_type" })
      }

      case "update_seo": {
        const targetType = String(input.target_type)
        const slug = String(input.slug)
        const content = await getSiteContent()
        const store = mergeSeoStore(content.seo)
        const patch: Record<string, unknown> = {}
        for (const key of ["metaTitle", "metaDescription", "metaKeywords", "focusKeyword", "schemaType", "robotsIndex", "ogImage", "featuredSnippet"] as const) {
          if (input[key] !== undefined) patch[key] = input[key]
        }
        let seoKey: string
        if (targetType === "page") {
          seoKey = slug
          const merged = { ...mergePageSeo(slug, store.pages[slug]), ...patch }
          await saveSiteContent({
            ...content,
            seo: { ...store, pages: { ...store.pages, [seoKey]: merged } },
          })
          const cmsPage = CMS_PAGES.find((p) => p.slug === slug)
          if (cmsPage?.path) revalidatePath(cmsPage.path)
        } else if (targetType === "blog" || targetType === "course") {
          seoKey = entitySeoKey(targetType, slug)
          const posts = targetType === "blog" ? await listRows("blog_posts", "created_at") : await listRows("courses", "sort_order")
          const item = posts.find((r) => r.slug === slug)
          const path = targetType === "blog" ? `/blog/${slug}` : `/courses/${slug}`
          const merged = { ...mergeEntitySeo(targetType, slug, store.pages[seoKey], {
            title: String(item?.title ?? slug),
            description: String(item?.excerpt ?? item?.short_description ?? ""),
            path,
          }), ...patch }
          await saveSiteContent({
            ...content,
            seo: { ...store, pages: { ...store.pages, [seoKey]: merged } },
          })
          revalidatePath(path)
        } else {
          return JSON.stringify({ error: "Invalid target_type" })
        }
        return JSON.stringify({ success: true, seoKey, updated: patch })
      }

      case "list_blog_posts": {
        const items = await listRows("blog_posts", "created_at")
        return JSON.stringify(items.map((r) => ({
          id: r.id, title: r.title, slug: r.slug, is_published: r.is_published, category: r.category,
        })))
      }

      case "create_blog_post": {
        const item = await createRow("blog_posts", {
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt,
          content: input.content,
          category: input.category ?? "general",
          author: input.author ?? "Warriors Defence Academy",
          image_url: input.image_url ?? "/images/blog/nda-guide.webp",
          is_published: input.is_published ?? false,
          published_at: input.is_published ? new Date().toISOString() : null,
        })
        if (input.metaTitle || input.metaDescription) {
          const content = await getSiteContent()
          const store = mergeSeoStore(content.seo)
          const slug = String(input.slug)
          await saveSiteContent({
            ...content,
            seo: {
              ...store,
              pages: {
                ...store.pages,
                [entitySeoKey("blog", slug)]: {
                  ...mergeEntitySeo("blog", slug, store.pages[entitySeoKey("blog", slug)], {
                    title: String(input.title),
                    description: String(input.metaDescription ?? input.excerpt),
                    path: `/blog/${slug}`,
                  }),
                  ...(input.metaTitle ? { metaTitle: input.metaTitle } : {}),
                  ...(input.metaDescription ? { metaDescription: input.metaDescription } : {}),
                  schemaType: "BlogPosting",
                },
              },
            },
          })
        }
        revalidatePath("/blog")
        revalidatePath(`/blog/${input.slug}`)
        return JSON.stringify({ success: true, item: { id: item.id, slug: item.slug, title: item.title } })
      }

      case "update_blog_post": {
        const id = String(input.id)
        const patch: Record<string, unknown> = {}
        for (const k of ["title", "slug", "excerpt", "content", "category", "is_published"]) {
          if (input[k] !== undefined) patch[k] = input[k]
        }
        if (patch.is_published === true) patch.published_at = new Date().toISOString()
        const item = await updateRow("blog_posts", id, patch)
        revalidatePath("/blog")
        if (item.slug) revalidatePath(`/blog/${item.slug}`)
        return JSON.stringify({ success: true, item: { id: item.id, slug: item.slug, title: item.title } })
      }

      case "list_courses": {
        const items = await listRows("courses", "sort_order")
        return JSON.stringify(items.map((r) => ({
          id: r.id, title: r.title, slug: r.slug, tagline: r.tagline, is_active: r.is_active,
        })))
      }

      case "update_course": {
        const id = String(input.id)
        const patch: Record<string, unknown> = {}
        for (const k of ["title", "tagline", "short_description", "duration"]) {
          if (input[k] !== undefined) patch[k] = input[k]
        }
        if (Array.isArray(input.features)) patch.features = input.features
        const item = await updateRow("courses", id, patch)
        if (input.metaTitle || input.metaDescription) {
          const slug = String(item.slug)
          const content = await getSiteContent()
          const store = mergeSeoStore(content.seo)
          await saveSiteContent({
            ...content,
            seo: {
              ...store,
              pages: {
                ...store.pages,
                [entitySeoKey("course", slug)]: {
                  ...mergeEntitySeo("course", slug, store.pages[entitySeoKey("course", slug)], {
                    title: String(item.title),
                    description: String(input.metaDescription ?? item.short_description ?? ""),
                    path: `/courses/${slug}`,
                  }),
                  ...(input.metaTitle ? { metaTitle: input.metaTitle } : {}),
                  ...(input.metaDescription ? { metaDescription: input.metaDescription } : {}),
                },
              },
            },
          })
        }
        revalidatePath("/courses")
        if (item.slug) revalidatePath(`/courses/${item.slug}`)
        return JSON.stringify({ success: true, item: { id: item.id, slug: item.slug, title: item.title } })
      }

      default:
        return JSON.stringify({ error: `Unknown tool: ${name}` })
    }
  } catch (err) {
    return JSON.stringify({ error: err instanceof Error ? err.message : "Tool execution failed" })
  }
}
