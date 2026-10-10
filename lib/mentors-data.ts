import { supabase } from "@/lib/supabase"

export type Mentor = {
  slug: string
  name: string
  designation: string
  expertise: string
  experience: string
  branch: string
  initials: string
  image?: string
  highlights: string[]
  bio: string[]
}

type StaticMentor = Omit<Mentor, "highlights" | "bio"> & Partial<Pick<Mentor, "highlights" | "bio">>

const STATIC: StaticMentor[] = [
  { slug: "lt-gen-dushyant-singh", name: "Lt. Gen. Dushyant Singh, PVSM, AVSM (Retd.)", designation: "Mentor-Guide & Chief Advisor", expertise: "Former head of Army War College, Mhow and ex-IG (Operations), NSG", experience: "35+ Years", branch: "Indian Army", initials: "DS", image: "/images/mentors/lt-gen-dushyant-singh.webp" },
  { slug: "maj-gen-vikram-kumar", name: "Maj. Gen. Vikram Kumar (Retd.)", designation: "Chief Mentor", expertise: "Former Additional Director General, NCC Directorate, Uttar Pradesh and ex-Chief Instructor, OTA Chennai", experience: "37 Years", branch: "Indian Army", initials: "VK", image: "/images/mentors/maj-gen-vikram-kumar.webp" },
  { slug: "cdr-sudarshan-chakrapani", name: "Cdr. Sudarshan Chakrapani (Retd.)", designation: "SSB Expert", expertise: "Ex-Interviewing Officer, Bhopal & Allahabad SSB Boards", experience: "24+ Years", branch: "Indian Navy", initials: "SC", image: "/images/mentors/sudarshan-chakrapani.webp" },
  { slug: "commandant-yogesh-datta", name: "Commandant Yogesh Datta (Retd.)", designation: "SSB Expert & Psychologist", expertise: "Ex-Psych Assessor, Coast Guard Selection Board; DIPR-qualified psychology assessor", experience: "25 Years", branch: "Indian Coast Guard", initials: "YD", image: "/images/mentors/yogesh-datta.webp" },
  { slug: "cdr-tlp-babu", name: "Cdr. T.L.P. Babu (Retd.)", designation: "SSB Expert", expertise: "Ex-GTO, 24 & 12 SSB Bangalore; Nao Sena Medal (Gallantry)", experience: "36 Years", branch: "Indian Navy", initials: "TB", image: "/images/mentors/cmdr-tlp-babu.webp" },
  { slug: "col-vijay-chauhan", name: "Col. Vijay Chauhan", designation: "SSB Expert", expertise: "Ex-Medical Officer and personality development mentor", experience: "33+ Years", branch: "Indian Army", initials: "VC", image: "/images/mentors/col-vijay-chauhan.webp" },
]

const STATIC_MENTORS: Mentor[] = STATIC.map((m) => ({ ...m, highlights: m.highlights ?? [], bio: m.bio ?? [] }))

export function slugifyMentorName(name: string) {
  return name
    .replace(/\(.*?\)/g, "")
    .split(",")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function splitLines(value: string | null | undefined) {
  return (value ?? "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
}

function splitParagraphs(value: string | null | undefined) {
  return (value ?? "").split(/\r?\n\s*\r?\n/).map((p) => p.replace(/\s*\r?\n\s*/g, " ").trim()).filter(Boolean)
}

export async function getMentors(): Promise<Mentor[]> {
  try {
    const { data, error } = await supabase
      .from("mentors")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")

    if (error || !data?.length) return STATIC_MENTORS
    return data.map((row) => ({
      slug: row.slug?.trim() || slugifyMentorName(row.name),
      name: row.name,
      designation: row.designation || "",
      expertise: row.expertise || "",
      experience: row.experience || "",
      branch: row.branch || "",
      initials: row.initials || row.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2),
      image: row.image_url || undefined,
      highlights: splitLines(row.highlights),
      bio: splitParagraphs(row.bio),
    }))
  } catch {
    return STATIC_MENTORS
  }
}

export async function getMentorBySlug(slug: string): Promise<Mentor | undefined> {
  const mentors = await getMentors()
  return mentors.find((m) => m.slug === slug)
}
