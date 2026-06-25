import { supabase } from "@/lib/supabase"

export type Mentor = {
  name: string
  designation: string
  expertise: string
  experience: string
  branch: string
  initials: string
  image?: string
}

const STATIC: Mentor[] = [
  { name: "Lt. Gen. Dushyant Singh", designation: "Chief Mentor", expertise: "Strategic Leadership & NDA Preparation", experience: "35+ Years", branch: "Indian Army", initials: "DG", image: "/images/mentors/lt-gen-dushyant.webp" },
  { name: "Cmdr. Sudarshan Chakrapani", designation: "Senior Faculty", expertise: "Naval Operations & SSB Training", experience: "28+ Years", branch: "Indian Navy", initials: "SC", image: "/images/mentors/sudarshan-chakrapani.webp" },
  { name: "Col. R.K. Tiwari (Retd.)", designation: "GTO Expert", expertise: "Group Testing & Physical Training", experience: "25+ Years", branch: "Indian Army", initials: "RT", image: "/images/mentors/col-tiwari.webp" },
  { name: "Commandant Yogesh Datta", designation: "Training Director", expertise: "Officer Grooming & SSB Assessment", experience: "22+ Years", branch: "Indian Army", initials: "YD", image: "/images/mentors/yogesh-datta.webp" },
  { name: "Commander TLP Babu", designation: "SSB Mentor", expertise: "Psychology & Interview Training", experience: "20+ Years", branch: "Indian Navy", initials: "TB", image: "/images/mentors/cmdr-babu.webp" },
  { name: "Colonel Vijay Chauhan", designation: "Academic Mentor", expertise: "Written Exam Strategy & Discipline", experience: "24+ Years", branch: "Indian Army", initials: "VC", image: "/images/mentors/col-vijay-chauhan.webp" },
]

export async function getMentors(): Promise<Mentor[]> {
  try {
    const { data, error } = await supabase
      .from("mentors")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")

    if (error || !data?.length) return STATIC
    return data.map((row) => ({
      name: row.name,
      designation: row.designation || "",
      expertise: row.expertise || "",
      experience: row.experience || "",
      branch: row.branch || "",
      initials: row.initials || row.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2),
      image: (row.image_url as string) || undefined,
    }))
  } catch {
    return STATIC
  }
}
