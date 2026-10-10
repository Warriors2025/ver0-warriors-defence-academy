"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { VideoItem } from "@/lib/site-content"

type VideoGalleryProps = {
  eyebrow: string
  title: string
  subtitle: string
  items: VideoItem[]
  channelUrl?: string
}

export function VideoGallerySection({ eyebrow, title, subtitle, items, channelUrl }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const videos = items.length ? items : []

  if (!videos.length) return null

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, i) => (
            <button
              key={`${video.videoId}-${i}`}
              type="button"
              onClick={() => setActiveVideo(video.videoId)}
              aria-label={`Play video: ${video.title}`}
              className="group text-left rounded-xl overflow-hidden bg-card ring-1 ring-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={video.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-accent/95 flex items-center justify-center shadow-lg ring-4 ring-black/15 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <Play className="w-5 h-5 text-accent-foreground fill-current ml-0.5" />
                  </span>
                </div>
              </div>
              <p className="px-4 py-3 text-sm font-semibold leading-snug text-foreground line-clamp-2 min-h-[3.75rem]">
                {video.title}
              </p>
            </button>
          ))}
        </div>

        {channelUrl && (
          <div className="mt-10 text-center">
            <a href={channelUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 cursor-pointer">
                <Youtube className="h-5 w-5 text-red-600" />
                View all videos on YouTube
              </Button>
            </a>
          </div>
        )}

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
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title={videos.find((v) => v.videoId === activeVideo)?.title ?? "Video Player"}
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
