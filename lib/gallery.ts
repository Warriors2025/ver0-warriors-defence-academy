import { supabase } from "@/lib/supabase"

export type GalleryItem = {
  id: string
  category: string
  type: "image" | "video"
  title: string
  description: string
  imageUrl: string
  videoUrl?: string
}

const STATIC_ITEMS: GalleryItem[] = [
  { id: "1", category: "campus", type: "image", title: "Main Academic Building", description: "State-of-the-art classrooms and facilities", imageUrl: "/images/gallery/campus-1.jpg" },
  { id: "2", category: "campus", type: "image", title: "Campus Aerial View", description: "Warriors Defence Academy campus in Lucknow", imageUrl: "/images/gallery/campus-2.jpg" },
  { id: "3", category: "training", type: "image", title: "Physical Training", description: "Daily PT sessions with expert trainers", imageUrl: "/images/gallery/training-1.jpg" },
  { id: "4", category: "gto", type: "image", title: "GTO Ground Training", description: "Group testing officer task preparation", imageUrl: "/images/gallery/gto-1.jpg" },
  { id: "5", category: "success", type: "image", title: "NDA Selection 2024", description: "Celebrating our top performers", imageUrl: "/images/gallery/success-1.webp" },
  { id: "6", category: "campus", type: "image", title: "Campus Event", description: "Students at academy events", imageUrl: "/images/gallery/event-1.jpg" },
  { id: "7", category: "training", type: "image", title: "Training Session", description: "Interactive classroom and field training", imageUrl: "/images/gallery/event-2.jpg" },
  { id: "8", category: "success", type: "image", title: "Selection Celebration", description: "Successful defence aspirants", imageUrl: "/images/gallery/event-3.jpg" },
]

function mapItem(row: Record<string, unknown>): GalleryItem {
  return {
    id: row.id as string,
    category: row.category as string,
    type: (row.media_type as "image" | "video") || "image",
    title: row.title as string,
    description: (row.description as string) || (row.alt as string) || "",
    imageUrl: row.image_url as string,
    videoUrl: (row.video_url as string) || undefined,
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")

    if (error || !data?.length) return STATIC_ITEMS
    return data.map(mapItem)
  } catch {
    return STATIC_ITEMS
  }
}
