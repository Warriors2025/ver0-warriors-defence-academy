"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  Image as ImageIcon,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Video,
  Trophy,
  Users,
  Building2,
  GraduationCap,
  Shield,
  Eye,
} from "lucide-react"

const categories = [
  { id: "all",     label: "All",            icon: Camera },
  { id: "campus",  label: "Campus",         icon: Building2 },
  { id: "training",label: "Training",       icon: Users },
  { id: "gto",     label: "GTO Ground",     icon: Trophy },
  { id: "success", label: "Success Stories",icon: GraduationCap },
]

const galleryItems = [
  { id: 1,  category: "campus",   type: "image", title: "Main Academic Building",   description: "State-of-the-art classrooms and facilities" },
  { id: 2,  category: "campus",   type: "image", title: "Library",                  description: "Comprehensive collection of defence study materials" },
  { id: 3,  category: "campus",   type: "image", title: "Hostel Facility",           description: "Comfortable accommodation for students" },
  { id: 4,  category: "training", type: "image", title: "Physical Training",         description: "Daily PT sessions with expert trainers" },
  { id: 5,  category: "training", type: "image", title: "Classroom Session",         description: "Interactive learning environment" },
  { id: 6,  category: "training", type: "video", title: "SSB Mock Interview",        description: "Real-time interview practice" },
  { id: 7,  category: "gto",      type: "image", title: "Group Discussion",          description: "GTO task preparation" },
  { id: 8,  category: "gto",      type: "image", title: "Individual Obstacles",      description: "Physical fitness training on GTO ground" },
  { id: 9,  category: "gto",      type: "image", title: "Command Task",              description: "Leadership assessment activities" },
  { id: 10, category: "success",  type: "image", title: "NDA Selection 2024",        description: "Celebrating our top performers" },
  { id: 11, category: "success",  type: "image", title: "CDS Batch Success",         description: "Another successful batch" },
  { id: 12, category: "success",  type: "video", title: "Success Story",             description: "Watch our student's journey" },
  { id: 13, category: "campus",   type: "image", title: "Sports Complex",            description: "Multi-purpose sports facilities" },
  { id: 14, category: "training", type: "image", title: "Psychology Session",        description: "SSB psychology preparation" },
  { id: 15, category: "gto",      type: "image", title: "Half Group Task",           description: "Team coordination exercises" },
  { id: 16, category: "success",  type: "image", title: "IMA Passing Out",           description: "Our students at IMA Dehradun" },
]

const videoGallery = [
  { id: 1, title: "Campus Tour",                  duration: "5:23",  views: "15K" },
  { id: 2, title: "GTO Ground Training",           duration: "8:45",  views: "22K" },
  { id: 3, title: "Student Testimonial — Rahul",   duration: "3:12",  views: "8K" },
  { id: 4, title: "SSB Interview Tips",            duration: "12:30", views: "45K" },
  { id: 5, title: "Physical Training Session",     duration: "6:18",  views: "18K" },
  { id: 6, title: "Success Story — Priya Patel",  duration: "4:55",  views: "12K" },
]

const successWall = [
  { name: "Arjun Singh",    year: 2025, exam: "NDA" },
  { name: "Priya Sharma",   year: 2025, exam: "CDS" },
  { name: "Rahul Verma",    year: 2024, exam: "NDA" },
  { name: "Anjali Gupta",   year: 2024, exam: "AFCAT" },
  { name: "Vikram Yadav",   year: 2024, exam: "NDA" },
  { name: "Neha Patel",     year: 2023, exam: "CDS" },
  { name: "Suresh Kumar",   year: 2023, exam: "NDA" },
  { name: "Meena Joshi",    year: 2023, exam: "AFCAT" },
  { name: "Karan Mehta",    year: 2022, exam: "NDA" },
  { name: "Divya Tiwari",   year: 2022, exam: "CDS" },
  { name: "Abhishek Roy",   year: 2022, exam: "NDA" },
  { name: "Pooja Mishra",   year: 2021, exam: "MNS" },
]

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
}

export function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage]   = useState<number | null>(null)

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const handlePrevious = () => {
    if (selectedImage === null) return
    const idx = filteredItems.findIndex(i => i.id === selectedImage)
    setSelectedImage(filteredItems[idx > 0 ? idx - 1 : filteredItems.length - 1].id)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const idx = filteredItems.findIndex(i => i.id === selectedImage)
    setSelectedImage(filteredItems[idx < filteredItems.length - 1 ? idx + 1 : 0].id)
  }

  const selectedItem = selectedImage ? galleryItems.find(i => i.id === selectedImage) : null

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="absolute inset-0 hero-pattern opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-accent/15 border border-accent/30 rounded-full px-6 py-2.5">
              <Camera className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                Photo &amp; Video Gallery — Warriors Defence Academy
              </span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Glimpses of
              <span className="block text-accent">Excellence</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Explore our campus, world-class training facilities, GTO ground, and the success
              stories of students who are now serving the nation with pride.
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-accent/20 rounded-2xl overflow-hidden max-w-3xl mx-auto mt-8">
            {[
              { value: "500+", label: "Photos" },
              { value: "50+",  label: "Videos" },
              { value: "12",   label: "Years of Legacy" },
              { value: "5,000+", label: "Students" },
            ].map((s, i) => (
              <div key={i} className="bg-primary/80 backdrop-blur py-5 text-center">
                <div className="text-2xl font-black text-accent">{s.value}</div>
                <div className="text-primary-foreground/70 text-xs font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ─────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-6 w-1 bg-accent rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Photo Gallery</h2>
              </div>
              <p className="text-muted-foreground text-sm pl-4">
                {filteredItems.length} {filteredItems.length === 1 ? "photo" : "photos"} in this collection
              </p>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <cat.icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="group relative aspect-square bg-secondary rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-border"
                onClick={() => setSelectedImage(item.id)}
              >
                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {item.type === "video"
                    ? <Video className="h-10 w-10 text-muted-foreground/30" />
                    : <ImageIcon className="h-10 w-10 text-muted-foreground/30" />}
                </div>

                {/* Video badge */}
                {item.type === "video" && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-accent text-accent-foreground p-1.5 rounded-full shadow-lg">
                      <Play className="h-3.5 w-3.5" />
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm leading-snug">{item.title}</h3>
                    <p className="text-white/70 text-xs mt-0.5">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────────── */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>{selectedItem?.title ?? "Gallery"}</DialogTitle>
          </VisuallyHidden>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-white/20 z-20 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="relative aspect-video flex items-center justify-center bg-zinc-900">
            <div className="flex items-center justify-center w-full h-full">
              {selectedItem?.type === "video"
                ? <Video className="h-20 w-20 text-zinc-700" />
                : <ImageIcon className="h-20 w-20 text-zinc-700" />}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12"
              onClick={handleNext}
            >
              <ChevronRight className="h-7 w-7" />
            </Button>
          </div>

          {selectedItem && (
            <div className="p-5 text-center border-t border-zinc-800">
              <h3 className="text-white font-semibold text-base">{selectedItem.title}</h3>
              <p className="text-zinc-400 text-sm mt-1">{selectedItem.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── VIDEO GALLERY ─────────────────────────────────────────────── */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-1 bg-accent rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Video Gallery</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-10 pl-4">
            Watch training sessions, campus tours, and student success stories.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoGallery.map(video => (
              <div
                key={video.id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-secondary flex items-center justify-center relative overflow-hidden">
                  <Video className="h-12 w-12 text-muted-foreground/25" />

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-accent text-accent-foreground p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Duration pill */}
                  <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-white text-xs font-mono px-2.5 py-1 rounded-full">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {video.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl px-8">
              <Play className="h-4 w-4" />
              View All Videos on YouTube
            </Button>
          </div>
        </div>
      </section>

      {/* ── SUCCESS WALL ──────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-5 py-2 mb-5">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase">Hall of Fame</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              Our Success Wall
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              Celebrating the achievements of Warriors who are now serving the nation with honour.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {successWall.map((student, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent/30 group-hover:border-accent/70 flex items-center justify-center transition-colors">
                  <span className="text-accent font-black text-sm">{getInitials(student.name)}</span>
                </div>
                <div className="text-center">
                  <p className="text-primary-foreground text-xs font-semibold leading-snug">{student.name}</p>
                  <p className="text-accent text-[10px] font-bold mt-0.5">{student.exam} · {student.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
