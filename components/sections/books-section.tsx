"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, BookOpen, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { BookItem } from "@/lib/site-content"

type BooksSectionProps = {
  eyebrow: string
  title: string
  subtitle: string
  promoCode: string
  items: BookItem[]
}

export function BooksSection({ eyebrow, title, subtitle, promoCode, items }: BooksSectionProps) {
  const books = items.length ? items : []

  if (!books.length) return null

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              {eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 leading-tight">
              {title}
            </h2>
            <p className="text-muted-foreground text-base mt-3 max-w-lg leading-relaxed">
              {subtitle}
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <BookOpen className="h-4 w-4" />
              View All Materials
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {books.map((book, i) => (
            <div key={`${book.title}-${i}`} className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300">
              <div className="relative aspect-[3/4] bg-primary/8 overflow-hidden">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {book.badge && (
                  <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] px-2 py-0.5">
                    {book.badge}
                  </Badge>
                )}
              </div>
              <div className="p-3 flex flex-col flex-1 gap-2">
                <div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{book.subtitle}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  <span className="text-xs font-medium text-foreground">{book.rating}</span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-auto">
                  <span className="text-base font-bold text-primary">{book.price}</span>
                  <span className="text-xs text-muted-foreground line-through">{book.originalPrice}</span>
                </div>
                <Button size="sm" className="w-full gap-1.5 h-9 text-xs mt-1">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {promoCode && (
          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Tag className="h-4 w-4 text-accent" />
            <span>Use code <strong className="text-foreground">{promoCode}</strong> for 10% off on all study materials</span>
          </div>
        )}
      </div>
    </section>
  )
}
