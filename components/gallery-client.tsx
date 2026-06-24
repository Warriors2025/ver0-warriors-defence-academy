"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"

const categories = [
  { id: "all", label: "All", icon: Camera },
  { id: "campus", label: "Campus", icon: Building2 },
  { id: "training", label: "Training", icon: Users },
  { id: "gto", label: "GTO Ground", icon: Trophy },
  { id: "success", label: "Success Stories", icon: GraduationCap },
]

const galleryItems = [
  { id: 1, category: "campus", type: "image", title: "Main Academic Building", description: "State-of-the-art classrooms and facilities" },
  { id: 2, category: "campus", type: "image", title: "Library", description: "Comprehensive collection of defence study materials" },
  { id: 3, category: "campus", type: "image", title: "Hostel Facility", description: "Comfortable accommodation for students" },
  { id: 4, category: "training", type: "image", title: "Physical Training", description: "Daily PT sessions with expert trainers" },
  { id: 5, category: "training", type: "image", title: "Classroom Session", description: "Interactive learning environment" },
  { id: 6, category: "training", type: "video", title: "SSB Mock Interview", description: "Real-time interview practice" },
  { id: 7, category: "gto", type: "image", title: "Group Discussion", description: "GTO task preparation" },
  { id: 8, category: "gto", type: "image", title: "Individual Obstacles", description: "Physical fitness training on GTO ground" },
  { id: 9, category: "gto", type: "image", title: "Command Task", description: "Leadership assessment activities" },
  { id: 10, category: "success", type: "image", title: "NDA Selection 2024", description: "Celebrating our top performers" },
  { id: 11, category: "success", type: "image", title: "CDS Batch Success", description: "Another successful batch" },
  { id: 12, category: "success", type: "video", title: "Success Story", description: "Watch our student's journey" },
  { id: 13, category: "campus", type: "image", title: "Sports Complex", description: "Multi-purpose sports facilities" },
  { id: 14, category: "training", type: "image", title: "Psychology Session", description: "SSB psychology preparation" },
  { id: 15, category: "gto", type: "image", title: "Half Group Task", description: "Team coordination exercises" },
  { id: 16, category: "success", type: "image", title: "IMA Passing Out", description: "Our students at IMA Dehradun" },
]

const videoGallery = [
  { id: 1, title: "Campus Tour", duration: "5:23", views: "15K" },
  { id: 2, title: "GTO Ground Training", duration: "8:45", views: "22K" },
  { id: 3, title: "Student Testimonial - Rahul", duration: "3:12", views: "8K" },
  { id: 4, title: "SSB Interview Tips", duration: "12:30", views: "45K" },
  { id: 5, title: "Physical Training Session", duration: "6:18", views: "18K" },
  { id: 6, title: "Success Story - Priya Patel", duration: "4:55", views: "12K" },
]

export function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const handlePrevious = () => {
    if (selectedImage === null) return
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage)
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1
    setSelectedImage(filteredItems[newIndex].id)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage)
    const newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(filteredItems[newIndex].id)
  }

  const selectedItem = selectedImage
    ? galleryItems.find(item => item.id === selectedImage)
    : null

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-0 mb-4">
              Our Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Glimpses of Excellence
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Explore our campus, training facilities, and success stories through our photo and video gallery.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Photo Gallery</h2>
              <p className="text-muted-foreground">
                {filteredItems.length} photos
              </p>
            </div>

            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="flex-wrap h-auto gap-1">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <cat.icon className="h-4 w-4 mr-1.5" />
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square bg-primary/10 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
                onClick={() => setSelectedImage(item.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {item.type === "video" ? (
                    <Video className="h-12 w-12 text-primary/40" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-primary/40" />
                  )}
                </div>

                {item.type === "video" && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-accent text-accent-foreground p-2 rounded-full">
                      <Play className="h-4 w-4" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-sm">{item.title}</h3>
                    <p className="text-white/70 text-xs">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-0 p-0">
          <VisuallyHidden>
            <DialogTitle>Gallery Image</DialogTitle>
          </VisuallyHidden>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-white/20 z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="relative aspect-video flex items-center justify-center">
            <div className="flex items-center justify-center w-full h-full bg-primary/10">
              {selectedItem?.type === "video" ? (
                <Video className="h-24 w-24 text-primary/40" />
              ) : (
                <ImageIcon className="h-24 w-24 text-primary/40" />
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {selectedItem && (
            <div className="p-4 text-center">
              <h3 className="text-white font-semibold">{selectedItem.title}</h3>
              <p className="text-white/60 text-sm">{selectedItem.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Gallery */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Videos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
              Video Gallery
            </h2>
            <p className="text-muted-foreground">
              Watch our training sessions, success stories, and campus life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoGallery.map((video) => (
              <div
                key={video.id}
                className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="aspect-video bg-primary/10 flex items-center justify-center relative">
                  <Video className="h-16 w-16 text-primary/40" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-accent text-accent-foreground p-4 rounded-full">
                      <Play className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button>
              <Play className="h-4 w-4 mr-2" />
              View All Videos on YouTube
            </Button>
          </div>
        </div>
      </section>

      {/* Success Wall */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Hall of Fame
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mt-2 mb-4">
              Our Success Wall
            </h2>
            <p className="text-primary-foreground/80">
              Celebrating the achievements of our students who are now serving the nation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-primary-foreground/10 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-primary-foreground/20 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <p className="text-primary-foreground text-xs text-center font-medium">
                  Selection {2020 + Math.floor(index / 3)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
