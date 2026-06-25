import { supabase } from "@/lib/supabase"

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
}

const STATIC_POSTS: BlogPost[] = [
  { id: "1", slug: "complete-guide-nda-2025", title: "Complete Guide to NDA 2025 Exam: Syllabus, Pattern & Preparation Strategy", excerpt: "Everything you need to know about the NDA 2025 examination including detailed syllabus breakdown, exam pattern analysis, and expert preparation strategies.", category: "NDA Preparation", tags: ["NDA", "Exam Guide", "Syllabus", "Strategy"], author: "Col. Rajesh Kumar (Retd.)", date: "March 15, 2025", readTime: "12 min read", image: "/images/blog/nda-guide.webp", featured: true },
  { id: "2", slug: "ssb-interview-5-day-procedure", title: "SSB Interview: 5 Day Testing Procedure Explained", excerpt: "A comprehensive breakdown of the 5-day SSB interview process, what to expect each day, and how to prepare for psychological and group testing.", category: "SSB Interview", tags: ["SSB", "Interview", "5-Day Process", "Testing"], author: "Maj. Priya Singh (Retd.)", date: "March 10, 2025", readTime: "15 min read", image: "/images/blog/ssb-interview.webp", featured: true },
  { id: "3", slug: "physical-fitness-standards-defence", title: "Physical Fitness Standards for Defence Exams", excerpt: "Detailed guide on physical fitness requirements for NDA, CDS, and AFCAT examinations with training schedules and tips.", category: "Physical Training", tags: ["Fitness", "Physical Training", "Health", "Standards"], author: "Capt. Vikram Yadav", date: "March 5, 2025", readTime: "8 min read", image: "/images/blog/physical-fitness.webp", featured: false },
]

function mapPost(row: Record<string, unknown>): BlogPost {
  const published = row.published_at ? new Date(row.published_at as string) : new Date()
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: (row.excerpt as string) || "",
    category: (row.category as string) || "general",
    tags: (row.tags as string[]) || [],
    author: (row.author as string) || "Warriors Defence Academy",
    date: published.toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }),
    readTime: (row.read_time as string) || "5 min read",
    image: (row.image_url as string) || "/images/blog/nda-guide.webp",
    featured: Boolean(row.is_featured),
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })

    if (error || !data?.length) return STATIC_POSTS
    return data.map(mapPost)
  } catch {
    return STATIC_POSTS
  }
}

export type BlogPostDetail = BlogPost & { content: string }

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()

    if (error || !data) {
      const fallback = STATIC_POSTS.find((p) => p.slug === slug)
      if (!fallback) return null
      return { ...fallback, content: `<p>${fallback.excerpt}</p>` }
    }

    return { ...mapPost(data), content: (data.content as string) || "" }
  } catch {
    const fallback = STATIC_POSTS.find((p) => p.slug === slug)
    return fallback ? { ...fallback, content: `<p>${fallback.excerpt}</p>` } : null
  }
}
