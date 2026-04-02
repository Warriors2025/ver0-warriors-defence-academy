"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const videos = [
  {
    id: 1,
    title: "Warriors Defence Academy Campus Tour",
    thumbnail: "/images/hero/carousel-3.jpg",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
  {
    id: 2,
    title: "NDA Preparation Tips & Strategies",
    thumbnail: "/images/hero/carousel-2.jpg",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
  {
    id: 3,
    title: "SSB Interview Success Stories",
    thumbnail: "/images/hero/carousel-1.jpg",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
  {
    id: 4,
    title: "Physical Training at WDA",
    thumbnail: "/images/hero/carousel-4.jpg",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
]

export function VideoGallerySection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Video Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Watch Our Training Videos
          </h2>
          <p className="text-muted-foreground text-lg">
            Welcome to the Video Gallery of Warriors Defence Academy. Here you can watch real training videos, student success stories, and motivational sessions from our campus. These videos show the hard work, discipline, and daily practice behind every selection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-lg"
              onClick={() => setActiveVideo(video.videoId)}
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-7 h-7 text-accent-foreground fill-current ml-1" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-medium text-sm line-clamp-2">{video.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl aspect-video">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </Button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Video Player"
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
