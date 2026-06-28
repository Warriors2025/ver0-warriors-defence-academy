import type { MetadataRoute } from "next"
import { CMS_PAGES } from "@/lib/cms-pages"
import { SITE_URL } from "@/lib/seo"
import { getBlogPosts } from "@/lib/blog"
import { getCourses } from "@/lib/courses"
import { getFacilities } from "@/lib/facilities-data"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = CMS_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    lastModified: now,
    changeFrequency: page.slug === "home" ? "daily" : "weekly",
    priority: page.slug === "home" ? 1 : 0.8,
  }))

  const [posts, courses, facilities] = await Promise.all([
    getBlogPosts(),
    getCourses(),
    Promise.resolve(getFacilities()),
  ])

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/courses/${course.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const facilityPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/facilities`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...facilities.map((facility) => ({
      url: `${SITE_URL}/facilities/${facility.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    })),
  ]

  return [...staticPages, ...coursePages, ...facilityPages, ...blogPages]
}
