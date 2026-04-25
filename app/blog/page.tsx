"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"

const POSTS_PER_PAGE = 6

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to NDA 2025 Exam: Syllabus, Pattern & Preparation Strategy",
    excerpt: "Everything you need to know about the NDA 2025 examination including detailed syllabus breakdown, exam pattern analysis, and expert preparation strategies.",
    content: "In-depth guide covering all aspects of NDA preparation...",
    category: "NDA Preparation",
    tags: ["NDA", "Exam Guide", "Syllabus", "Strategy"],
    author: "Col. Rajesh Kumar (Retd.)",
    date: "March 15, 2025",
    readTime: "12 min read",
    image: "/images/blog/nda-guide.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "SSB Interview: 5 Day Testing Procedure Explained",
    excerpt: "A comprehensive breakdown of the 5-day SSB interview process, what to expect each day, and how to prepare for psychological and group testing.",
    content: "The SSB interview is the most crucial stage...",
    category: "SSB Interview",
    tags: ["SSB", "Interview", "5-Day Process", "Testing"],
    author: "Maj. Priya Singh (Retd.)",
    date: "March 10, 2025",
    readTime: "15 min read",
    image: "/images/blog/ssb-interview.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Physical Fitness Standards for Defence Exams",
    excerpt: "Detailed guide on physical fitness requirements for NDA, CDS, and AFCAT examinations with training schedules and tips.",
    content: "Physical fitness is crucial for defence services...",
    category: "Physical Training",
    tags: ["Fitness", "Physical Training", "Health", "Standards"],
    author: "Capt. Vikram Yadav",
    date: "March 5, 2025",
    readTime: "8 min read",
    image: "/images/blog/physical-fitness.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Mathematics Preparation Tips for NDA Exam",
    excerpt: "Master mathematics for NDA with these proven strategies, important topics, and practice techniques from our expert faculty.",
    content: "Mathematics is a major component of NDA...",
    category: "NDA Preparation",
    tags: ["Mathematics", "NDA", "Tips", "Techniques"],
    author: "Prof. Amit Sharma",
    date: "February 28, 2025",
    readTime: "10 min read",
    image: "/images/blog/maths-prep.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Understanding OLQ: Officer Like Qualities",
    excerpt: "Deep dive into the 15 Officer Like Qualities assessed during SSB interviews and how to develop them effectively.",
    content: "Officer Like Qualities form the foundation...",
    category: "SSB Interview",
    tags: ["OLQ", "Qualities", "Personality", "Leadership"],
    author: "Col. Rajesh Kumar (Retd.)",
    date: "February 20, 2025",
    readTime: "14 min read",
    image: "/images/blog/olq-qualities.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "CDS vs NDA: Which Exam Should You Choose?",
    excerpt: "A comparative analysis of CDS and NDA examinations to help you decide the best path for your defence career.",
    content: "Choosing between CDS and NDA is important...",
    category: "Career Guidance",
    tags: ["CDS", "NDA", "Comparison", "Career"],
    author: "Maj. Priya Singh (Retd.)",
    date: "February 15, 2025",
    readTime: "9 min read",
    image: "/images/blog/cds-vs-nda.jpg",
    featured: false,
  },
  {
    id: 7,
    title: "AFCAT Exam 2025: Latest Updates and Preparation Tips",
    excerpt: "Stay updated with the latest changes in AFCAT examination and get expert tips for successful preparation.",
    category: "AFCAT Preparation",
    tags: ["AFCAT", "Updates", "Tips", "Exam"],
    author: "Wg. Cdr. Arun Mehta (Retd.)",
    date: "February 10, 2025",
    readTime: "11 min read",
    image: "/images/blog/nda-guide.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "Success Stories: From Academy to Officer",
    excerpt: "Inspiring stories of our students who successfully cleared defence exams and are now serving the nation.",
    category: "Success Stories",
    tags: ["Success", "Motivation", "Inspiration", "Testimonial"],
    author: "Warriors Team",
    date: "February 5, 2025",
    readTime: "7 min read",
    image: "/images/blog/ssb-interview.jpg",
    featured: false,
  },
  {
    id: 9,
    title: "Current Affairs Topics Important for Defence Exams",
    excerpt: "Curated list of important current affairs topics that frequently appear in NDA and CDS examinations.",
    category: "Current Affairs",
    tags: ["Current Affairs", "News", "GK", "Exam Tips"],
    author: "Prof. Neha Verma",
    date: "January 30, 2025",
    readTime: "10 min read",
    image: "/images/blog/physical-fitness.jpg",
    featured: false,
  },
]

const categories = ["All", "NDA Preparation", "SSB Interview", "Physical Training", "Career Guidance", "Current Affairs", "Success Stories", "AFCAT Preparation"]

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

interface FilterState {
  categories: string[]
  tags: string[]
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    categories: ["All"],
    tags: [],
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      setFilters(prev => ({
        ...prev,
        categories: ["All"]
      }))
    } else {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.includes("All") 
          ? [category]
          : prev.categories.includes(category)
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      }))
    }
    setCurrentPage(1)
  }

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
    setCurrentPage(1)
  }

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = filters.categories.includes("All") || 
                             filters.categories.includes(post.category)
      
      const matchesTags = filters.tags.length === 0 || 
                         filters.tags.some(tag => post.tags.includes(tag))
      
      return matchesSearch && matchesCategory && matchesTags
    })
  }, [searchTerm, filters])

  const featuredPosts = useMemo(() => {
    return filteredPosts.filter(post => post.featured).slice(0, 2)
  }, [filteredPosts])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const hasActiveFilters = filters.categories.length > 0 || filters.tags.length > 0 || searchTerm !== ""

  const clearAllFilters = () => {
    setSearchTerm("")
    setFilters({ categories: ["All"], tags: [] })
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-8 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <Badge className="mb-4 bg-accent text-accent-foreground">Knowledge Hub</Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                Defence Preparation Blog
              </h1>
              <p className="text-sm sm:text-base md:text-lg opacity-90 mb-6 md:mb-8">
                Expert insights, preparation strategies, and success tips from our experienced faculty to help you crack defence examinations.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-12 w-full text-sm md:text-base bg-background text-foreground"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-12 md:mb-16">
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-40 md:h-48 lg:h-56 bg-secondary w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <Badge className="absolute top-3 md:top-4 left-3 md:left-4 bg-accent text-accent-foreground text-xs md:text-sm">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                      <Badge variant="secondary" className="mb-2 md:mb-3 text-xs w-fit">{post.category}</Badge>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-grow">
                        {post.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1 truncate">
                          <User className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
                          <span className="truncate">{post.author}</span>
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <Calendar className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
                          <span className="truncate">{post.date}</span>
                        </span>
                      </div>
                      <Link 
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all text-sm md:text-base"
                      >
                        Read More <ArrowRight className="ml-1 w-3 md:w-4 h-3 md:h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Filters Section */}
          <section className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold">All Articles</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden w-full sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                {showMobileFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mb-4 p-3 md:p-4 bg-secondary/30 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {filters.categories.filter(c => c !== "All").map(cat => (
                    <Badge key={cat} variant="secondary" className="text-xs">
                      {cat}
                      <button
                        onClick={() => handleCategoryToggle(cat)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  {filters.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                      <button
                        onClick={() => handleTagToggle(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs whitespace-nowrap"
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Category & Tag Filters */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${showMobileFilters ? '' : 'hidden md:grid'}`}>
              {/* Categories */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={filters.categories.includes(category) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryToggle(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTagToggle(tag)}
                      className="text-xs"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="mb-8 md:mb-12">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground text-sm md:text-base mb-4">No articles found matching your criteria.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {paginatedPosts.map((post) => (
                    <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                      <div className="relative h-36 md:h-40 lg:h-48 bg-secondary w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-3 md:p-4 lg:p-5 flex flex-col flex-grow">
                        <Badge variant="secondary" className="mb-2 text-xs w-fit">{post.category}</Badge>
                        <h3 className="text-sm md:text-base font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-grow">
                          {post.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs py-0 px-1.5">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs py-0 px-1.5">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1 truncate">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{post.date}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center text-primary font-medium hover:gap-1 transition-all text-xs md:text-sm"
                        >
                          Read <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Showing {(currentPage - 1) * POSTS_PER_PAGE + 1} - {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} articles
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline ml-1">Previous</span>
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1 md:gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="text-xs md:text-sm h-8 md:h-9 w-8 md:w-9 p-0"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <span className="hidden sm:inline mr-1">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>

          {/* Newsletter CTA */}
          <section className="py-8 md:py-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl">
            <div className="max-w-2xl mx-auto text-center px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Stay Updated</h2>
              <p className="text-sm md:text-base opacity-90 mb-6 md:mb-8">
                Subscribe to our newsletter for the latest defence exam updates, preparation tips, and exclusive content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-primary-foreground text-foreground text-sm"
                />
                <Button variant="secondary" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
