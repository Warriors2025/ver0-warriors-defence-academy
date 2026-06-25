import { supabase } from "@/lib/supabase"

export type Testimonial = {
  name: string
  achievement: string
  course: string
  content: string
  rating: number
}

const STATIC: Testimonial[] = [
  { name: "Rahul Sharma", achievement: "AIR 15 - NDA 156", course: "NDA Course", content: "Warriors Defence Academy transformed my preparation journey. The structured approach, expert guidance, and comprehensive SSB training helped me achieve my dream of joining the Indian Army.", rating: 5 },
  { name: "Priya Patel", achievement: "Selected - CDS", course: "CDS Course", content: "As a female aspirant, Warriors Defence Academy provided equal opportunities and personalized attention. Their Women Special Entry program is exceptional.", rating: 5 },
  { name: "Aditya Kumar", achievement: "AIR 8 - AFCAT", course: "AFCAT Course", content: "The mock tests and interview preparation at Warriors Defence Academy are unmatched. Highly recommended for Air Force aspirants.", rating: 5 },
]

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")

    if (error || !data?.length) return STATIC
    return data.map((row) => ({
      name: row.name,
      achievement: row.achievement || "",
      course: row.course || "",
      content: row.content,
      rating: row.rating ?? 5,
    }))
  } catch {
    return STATIC
  }
}
