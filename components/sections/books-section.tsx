"use client"

import Image from "next/image"
import Link from "next/link"
import { BookOpen, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const books = [
  {
    id: 1,
    title: "WDA NDA Mathematics",
    subtitle: "Complete Guide",
    author: "Warriors Defence Academy",
    price: "₹450",
    originalPrice: "₹599",
    rating: 4.8,
    image: "/images/books/nda-books.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "WDA General Knowledge",
    subtitle: "NDA & CDS Edition",
    author: "Warriors Defence Academy",
    price: "₹350",
    originalPrice: "₹499",
    rating: 4.7,
    image: "/images/books/nda-books.jpg",
    badge: null,
  },
  {
    id: 3,
    title: "WDA English Grammar",
    subtitle: "For Defence Exams",
    author: "Warriors Defence Academy",
    price: "₹299",
    originalPrice: "₹399",
    rating: 4.9,
    image: "/images/books/nda-books.jpg",
    badge: "New",
  },
  {
    id: 4,
    title: "WDA SSB Interview Guide",
    subtitle: "Complete Preparation",
    author: "Warriors Defence Academy",
    price: "₹550",
    originalPrice: "₹699",
    rating: 4.8,
    image: "/images/books/nda-books.jpg",
    badge: "Top Rated",
  },
  {
    id: 5,
    title: "WDA Physics for NDA",
    subtitle: "Concept & Practice",
    author: "Warriors Defence Academy",
    price: "₹399",
    originalPrice: "₹549",
    rating: 4.6,
    image: "/images/books/nda-books.jpg",
    badge: null,
  },
]

export function BooksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Study Materials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Books for NDA Exam
          </h2>
          <p className="text-muted-foreground text-lg">
            To clear the NDA exam, you need the right preparation and the right books. A good NDA study plan starts with strong basics in Mathematics, English, and General Knowledge. The correct books make self-study easier, improve your understanding, and help you practice in the same pattern as the real NDA paper.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="group overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative aspect-[3/4] bg-gradient-to-b from-primary/10 to-primary/5">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {book.badge && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                    {book.badge}
                  </Badge>
                )}
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.subtitle}</p>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{book.rating}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{book.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{book.originalPrice}</span>
                </div>

                <Button size="sm" className="w-full gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/contact">
            <Button variant="outline" size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              View All Study Materials
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
