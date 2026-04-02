"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, ArrowRight, BookOpen } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to NDA 2025 Exam: Syllabus, Pattern & Preparation Strategy",
    excerpt: "Everything you need to know about the NDA 2025 examination including detailed syllabus breakdown, exam pattern analysis, and expert preparation strategies.",
    category: "NDA Preparation",
    author: "Col. Rajesh Kumar (Retd.)",
    date: "March 15, 2025",
    readTime: "12 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 2,
    title: "SSB Interview: 5 Day Testing Procedure Explained",
    excerpt: "A comprehensive breakdown of the 5-day SSB interview process, what to expect each day, and how to prepare for psychological and group testing.",
    category: "SSB Interview",
    author: "Maj. Priya Singh (Retd.)",
    date: "March 10, 2025",
    readTime: "15 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 3,
    title: "Physical Fitness Standards for Defence Exams",
    excerpt: "Detailed guide on physical fitness requirements for NDA, CDS, and AFCAT examinations with training schedules and tips.",
    category: "Physical Training",
    author: "Capt. Vikram Yadav",
    date: "March 5, 2025",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 4,
    title: "Mathematics Preparation Tips for NDA Exam",
    excerpt: "Master mathematics for NDA with these proven strategies, important topics, and practice techniques from our expert faculty.",
    category: "NDA Preparation",
    author: "Prof. Amit Sharma",
    date: "February 28, 2025",
    readTime: "10 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 5,
    title: "Understanding OLQ: Officer Like Qualities",
    excerpt: "Deep dive into the 15 Officer Like Qualities assessed during SSB interviews and how to develop them effectively.",
    category: "SSB Interview",
    author: "Col. Rajesh Kumar (Retd.)",
    date: "February 20, 2025",
    readTime: "14 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 6,
    title: "CDS vs NDA: Which Exam Should You Choose?",
    excerpt: "A comparative analysis of CDS and NDA examinations to help you decide the best path for your defence career.",
    category: "Career Guidance",
    author: "Maj. Priya Singh (Retd.)",
    date: "February 15, 2025",
    readTime: "9 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

const categories = ["All", "NDA Preparation", "SSB Interview", "Physical Training", "Career Guidance", "Current Affairs"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <Badge className="mb-4 bg-accent text-accent-foreground">Knowledge Hub</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Defence Preparation Blog
              </h1>
              <p className="text-lg opacity-90 mb-8">
                Expert insights, preparation strategies, and success tips from our 
                experienced faculty to help you crack defence examinations.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-12 bg-background text-foreground"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {activeCategory === "All" && searchTerm === "" && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 bg-secondary">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                      </div>
                      <Link 
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              {activeCategory === "All" ? "Latest Articles" : activeCategory}
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                    <div className="relative h-40 bg-secondary">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-10">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest defence exam updates, 
              preparation tips, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground text-foreground"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
