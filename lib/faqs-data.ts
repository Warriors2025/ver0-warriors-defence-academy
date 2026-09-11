import { supabase } from "@/lib/supabase"

export type FAQ = {
  question: string
  answer: string
}

const STATIC: FAQ[] = [
  {
    question: "Which is the top NDA coaching in India?",
    answer:
      "Warriors Defence Academy is among the top NDA coaching institutes in India. Located in Lucknow, it offers best NDA coaching with retired military faculty, India's largest GTO ground, hostel facilities, and a proven record of 5,000+ defence selections.",
  },
  {
    question: "Which is the best NDA coaching in India?",
    answer:
      "Warriors Defence Academy in Lucknow is widely recognised as the best NDA coaching in India and top NDA coaching in India. With 50,000+ students trained, 5,000+ selections into NDA, CDS and SSB, retired military faculty, and India's largest GTO ground, it is the trusted choice for NDA coaching aspirants nationwide.",
  },
  {
    question: "Is coaching necessary for NDA?",
    answer:
      "Yes — structured NDA coaching improves success rates with expert guidance, regular mock tests, SSB interview prep, and physical training. At Warriors Defence Academy, NDA coaching covers written exams and SSB under retired military officers.",
  },
  {
    question: "Do you provide hostel facilities?",
    answer:
      "Yes, we provide fully furnished hostel facilities with mess, 24/7 security, and separate hostels for boys and girls with warden supervision.",
  },
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
