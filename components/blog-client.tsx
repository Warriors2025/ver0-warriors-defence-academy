"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  Tag,
} from "lucide-react"
import type { BlogPost } from "@/lib/blog"

const POSTS_PER_PAGE = 6

const blogPostsFallback: BlogPost[] = [
  {
    id: 1,
    title: "Complete Guide to NDA 2025 Exam: Syllabus, Pattern & Preparation Strategy",
    excerpt:
      "Everything you need to know about the NDA 2025 examination including detailed syllabus breakdown, exam pattern analysis, and expert preparation strategies.",
    category: "NDA Preparation",
    tags: ["NDA", "Exam Guide", "Syllabus", "Strategy"],
    author: "Col. Rajesh Kumar (Retd.)",
    date: "March 15, 2025",
    readTime: "12 min read",
    image: "/images/blog/nda-guide.webp",
    featured: true,
  },
  {
    id: 2,
    title: "SSB Interview: 5 Day Testing Procedure Explained",
    excerpt:
      "A comprehensive breakdown of the 5-day SSB interview process, what to expect each day, and how to prepare for psychological and group testing.",
    category: "SSB Interview",
    tags: ["SSB", "Interview", "5-Day Process", "Testing"],
    author: "Maj. Priya Singh (Retd.)",
    date: "March 10, 2025",
    readTime: "15 min read",
    image: "/images/blog/ssb-interview.webp",
    featured: true,
  },
  {
    id: 3,
    title: "Physical Fitness Standards for Defence Exams",
    excerpt:
      "Detailed guide on physical fitness requirements for NDA, CDS, and AFCAT examinations with training schedules and tips.",
    category: "Physical Training",
    tags: ["Fitness", "Physical Training", "Health", "Standards"],
    author: "Capt. Vikram Yadav",
    date: "March 5, 2025",
    readTime: "8 min read",
    image: "/images/blog/physical-fitness.webp",
    featured: false,
  },
  {
    id: 4,
    title: "Mathematics Preparation Tips for NDA Exam",
    excerpt:
      "Master mathematics for NDA with these proven strategies, important topics, and practice techniques from our expert faculty.",
    category: "NDA Preparation",
    tags: ["Mathematics", "NDA", "Tips", "Techniques"],
    author: "Prof. Amit Sharma",
    date: "February 28, 2025",
    readTime: "10 min read",
    image: "/images/courses/cds.webp",
    featured: false,
  },
  {
    id: 5,
    title: "Understanding OLQ: Officer Like Qualities for SSB",
    excerpt:
      "Deep dive into the 15 Officer Like Qualities assessed during SSB interviews and how to develop them effectively.",
    category: "SSB Interview",
    tags: ["OLQ", "Qualities", "Personality", "Leadership"],
    author: "Col. Rajesh Kumar (Retd.)",
    date: "February 20, 2025",
    readTime: "14 min read",
    image: "/images/courses/ssb.webp",
    featured: false,
  },
  {
    id: 6,
    title: "CDS vs NDA: Which Exam Should You Choose?",
    excerpt:
      "A comparative analysis of CDS and NDA examinations to help you decide the best path for your defence career.",
    category: "Career Guidance",
    tags: ["CDS", "NDA", "Comparison", "Career"],
    author: "Maj. Priya Singh (Retd.)",
    date: "February 15, 2025",
    readTime: "9 min read",
    image: "/images/courses/nda.webp",
    featured: false,
  },
  {
    id: 7,
    title: "AFCAT Exam 2025: Latest Updates and Preparation Tips",
    excerpt:
      "Stay updated with the latest changes in AFCAT examination and get expert tips for successful preparation.",
    category: "AFCAT Preparation",
    tags: ["AFCAT", "Updates", "Tips", "Exam"],
    author: "Wg. Cdr. Arun Mehta (Retd.)",
    date: "February 10, 2025",
    readTime: "11 min read",
    image: "/images/blog/nda-guide.webp",
    featured: false,
  },
  {
    id: 8,
    title: "Success Stories: From Academy to Officer",
    excerpt:
      "Inspiring stories of our students who successfully cleared defence exams and are now serving the nation.",
    category: "Success Stories",
    tags: ["Success", "Motivation", "Inspiration", "Testimonial"],
    author: "Warriors Team",
    date: "February 5, 2025",
    readTime: "7 min read",
    image: "/images/blog/ssb-interview.webp",
    featured: false,
  },
  {
    id: 9,
    title: "Current Affairs Topics Important for Defence Exams",
    excerpt:
      "Curated list of important current affairs topics that frequently appear in NDA and CDS examinations.",
    category: "Current Affairs",
    tags: ["Current Affairs", "News", "GK", "Exam Tips"],
    author: "Prof. Neha Verma",
    date: "January 30, 2025",
    readTime: "10 min read",
    image: "/images/blog/physical-fitness.webp",
    featured: false,
  },
]

const CATEGORIES = [
  "All",
  "NDA Preparation",
  "SSB Interview",
  "Physical Training",
  "Career Guidance",
  "Current Affairs",
  "Success Stories",
  "AFCAT Preparation",
]

function getCategoryColor(category: string) {
  const map: Record<string, string> = {
    "NDA Preparation":  "bg-primary/10 text-primary border-primary/20",
    "SSB Interview":    "bg-blue-50 text-blue-700 border-blue-200",
    "Physical Training":"bg-orange-50 text-orange-700 border-orange-200",
    "Career Guidance":  "bg-purple-50 text-purple-700 border-purple-200",
    "Current Affairs":  "bg-sky-50 text-sky-700 border-sky-200",
    "Success Stories":  "bg-green-50 text-green-700 border-green-200",
    "AFCAT Preparation":"bg-amber-50 text-amber-700 border-amber-200",
  }
  return map[category] ?? "bg-secondary text-secondary-foreground border-border"
}

interface FilterState {
  categories: string[]
  tags: string[]
}

export function BlogContent({ posts }: { posts?: BlogPost[] }) {
  const blogPosts = posts ?? blogPostsFallback
  const allTags = useMemo(
    () => Array.from(new Set(blogPosts.flatMap((p) => p.tags))),
    [blogPosts]
  )
  const [searchTerm, setSearchTerm]           = useState("")
  const [currentPage, setCurrentPage]         = useState(1)
  const [filters, setFilters]                 = useState<FilterState>({ categories: ["All"], tags: [] })
  const [showTagCloud, setShowTagCloud]       = useState(false)

  const handleCategoryToggle = (cat: string) => {
    if (cat === "All") {
      setFilters(prev => ({ ...prev, categories: ["All"] }))
    } else {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.includes("All")
          ? [cat]
          : prev.categories.includes(cat)
          ? prev.categories.filter(c => c !== cat).length === 0
            ? ["All"]
            : prev.categories.filter(c => c !== cat)
          : [...prev.categories, cat],
      }))
    }
    setCurrentPage(1)
  }

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag],
    }))
    setCurrentPage(1)
  }

  const clearAll = () => {
    setSearchTerm("")
    setFilters({ categories: ["All"], tags: [] })
    setCurrentPage(1)
  }

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCat =
        filters.categories.includes("All") || filters.categories.includes(post.category)
      const matchTag =
        filters.tags.length === 0 || filters.tags.some(t => post.tags.includes(t))
      return matchSearch && matchCat && matchTag
    })
  }, [searchTerm, filters])

  const featuredPosts = useMemo(() => filteredPosts.filter(p => p.featured).slice(0, 2), [filteredPosts])
  const totalPages    = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
  const hasActiveFilters = !filters.categories.includes("All") || filters.tags.length > 0 || searchTerm !== ""

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="absolute inset-0 hero-pattern opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-accent/15 border border-accent/30 rounded-full px-6 py-2.5">
              <BookOpen className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                Knowledge Hub — Warriors Defence Academy
              </span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Defence Preparation
              <span className="block text-accent">Blog &amp; Insights</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Expert strategies, exam guides, and success stories from our retired military
              faculty — everything you need to crack defence examinations.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search articles, topics, or exams..."
                className="pl-12 h-13 text-sm md:text-base bg-background text-foreground border-0 shadow-xl rounded-xl focus-visible:ring-2 focus-visible:ring-accent"
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
              />
              {searchTerm && (
                <button
                  onClick={() => { setSearchTerm(""); setCurrentPage(1) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER BAR ────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryToggle(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  filters.categories.includes(cat)
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Tag toggle */}
            <button
              onClick={() => setShowTagCloud(v => !v)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ml-auto ${
                showTagCloud || filters.tags.length > 0
                  ? "bg-accent/15 text-accent border-accent/30"
                  : "bg-card text-muted-foreground border-border hover:border-accent/30"
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              Tags
              {filters.tags.length > 0 && (
                <span className="ml-0.5 bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black">
                  {filters.tags.length}
                </span>
              )}
            </button>
          </div>

          {/* Tag cloud (expandable) */}
          {showTagCloud && (
            <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    filters.tags.includes(tag)
                      ? "bg-accent/15 text-accent border-accent/40"
                      : "bg-secondary text-muted-foreground border-border hover:border-accent/30 hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {filters.categories.filter(c => c !== "All").map(cat => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                >
                  {cat}
                  <button onClick={() => handleCategoryToggle(cat)} aria-label={`Remove ${cat}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {filters.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20"
                >
                  {tag}
                  <button onClick={() => handleTagToggle(tag)} aria-label={`Remove ${tag}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAll}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">

        {/* ── FEATURED ARTICLES ──────────────────────────────────────────── */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-6 w-1 bg-accent rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Featured Articles</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Featured badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                        <Shield className="h-3 w-3" />
                        Featured
                      </span>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                      <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/70 text-xs">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── ALL ARTICLES ───────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-accent rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                All Articles
                {filteredPosts.length > 0 && (
                  <span className="ml-2 text-base font-normal text-muted-foreground">
                    ({filteredPosts.length})
                  </span>
                )}
              </h2>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20 bg-secondary/30 rounded-2xl border border-border">
              <BookOpen className="w-14 h-14 mx-auto text-muted-foreground mb-4 opacity-40" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Try adjusting your search or removing some filters.
              </p>
              <Button variant="outline" onClick={clearAll} className="border-primary text-primary hover:bg-primary/5">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-44 bg-secondary overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Body */}
                      <div className="p-5 flex flex-col flex-grow">
                        {/* Category */}
                        <span className={`inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>

                        {/* Title */}
                        <h3 className="font-bold text-foreground text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-grow">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 bg-secondary text-muted-foreground border border-border rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-[10px] font-medium px-2 py-0.5 bg-secondary text-muted-foreground border border-border rounded-full">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {(currentPage - 1) * POSTS_PER_PAGE + 1}–{Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)}
                    </span>{" "}
                    of <span className="font-semibold text-foreground">{filteredPosts.length}</span> articles
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="border-border hover:border-primary/40 gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Prev</span>
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-9 w-9 rounded-lg text-sm font-semibold transition-all ${
                            currentPage === page
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="border-border hover:border-primary/40 gap-1"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* ── NEWSLETTER ─────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-5 py-2 mb-6">
              <BookOpen className="h-4 w-4 text-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase">
                Stay Ahead of the Curve
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss an
              <span className="text-accent"> Important Update</span>
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-base leading-relaxed">
              Subscribe to get the latest defence exam notifications, preparation tips,
              and exclusive content from our expert faculty — straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent flex-1"
              />
              <Button
                variant="secondary"
                className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>

            <p className="text-primary-foreground/50 text-xs mt-4">
              No spam. Unsubscribe anytime. Join 10,000+ defence aspirants.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
