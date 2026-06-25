import { supabase } from "@/lib/supabase"

export type FAQ = {
  question: string
  answer: string
}

const STATIC: FAQ[] = [
  { question: "Which is the best NDA coaching in India?", answer: "Warriors Defence Academy is widely recognized as one of the best NDA coaching institutes in India with expert teachers, India's largest GTO ground, and 5,000+ selections." },
  { question: "Is coaching necessary for NDA?", answer: "Coaching provides a structured study plan, expert guidance, regular mock tests, and comprehensive SSB preparation that significantly improves success rates." },
  { question: "Do you provide hostel facilities?", answer: "Yes, we provide fully furnished hostel facilities with mess, 24/7 security, and separate hostels for boys and girls with warden supervision." },
]

export async function getFaqs(): Promise<FAQ[]> {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")

    if (error || !data?.length) return STATIC
    return data.map((row) => ({ question: row.question, answer: row.answer }))
  } catch {
    return STATIC
  }
}
