import { supabase } from "@/lib/supabase"
import { COURSE_SEED_DETAILS } from "@/lib/course-seed-data"

export type CourseListItem = {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  duration: string
  students: string
  rating: number
  badge: string | null
  badgeColor: string
  category: string
  image: string
  features: string[]
  href: string
}

export type CourseDetail = CourseListItem & {
  eligibility: string[]
  syllabus: { title: string; topics: string[] }[]
  benefits: string[]
  fee: string
  batchStart: string
  examPattern: { section: string; marks: string; time: string }[]
  highlights?: string[]
}

const STATIC_COURSES: CourseListItem[] = [
  { id: "nda-foundation", slug: "nda-foundation", title: "NDA Foundation Course", tagline: "Integrated school + NDA prep for Class 10 passouts", description: "Integrated schooling + NDA prep program for Class 10 students with hostel facility.", duration: "2–3 Years", students: "500+", rating: 4.9, badge: "Popular", badgeColor: "bg-primary text-primary-foreground", category: "officer", image: "/images/courses/nda-foundation.webp", features: ["Integrated Schooling", "Hostel Facility", "Daily Physical Training", "Early SSB Grooming"], href: "/courses/nda-foundation" },
  { id: "nda", slug: "nda", title: "NDA Course", tagline: "Complete written exam + SSB preparation", description: "Complete NDA written exam and SSB interview preparation with expert guidance.", duration: "6–12 Months", students: "2,000+", rating: 4.8, badge: "Best Seller", badgeColor: "bg-accent text-accent-foreground", category: "officer", image: "/images/courses/nda.webp", features: ["Written Exam Prep", "SSB Interview Training", "Weekly Mock Tests", "Physical Fitness"], href: "/courses/nda" },
  { id: "cds", slug: "cds", title: "CDS Course", tagline: "For graduates aiming for officer commission", description: "Structured CDS exam preparation for graduates with focused subject coaching.", duration: "6 Months", students: "1,500+", rating: 4.8, badge: null, badgeColor: "", category: "officer", image: "/images/courses/cds.webp", features: ["Complete Syllabus", "Daily Current Affairs", "Previous Year Analysis", "SSB Prep Included"], href: "/courses/cds" },
  { id: "ssb", slug: "ssb", title: "SSB Interview Training", tagline: "21-day intensive SSB prep on real GTO ground", description: "Intensive SSB interview preparation on India's largest GTO ground.", duration: "21 Days", students: "3,000+", rating: 4.9, badge: "Top Rated", badgeColor: "bg-accent text-accent-foreground", category: "officer", image: "/images/courses/ssb.webp", features: ["Live GTO Tasks", "Mock SSB Interviews", "Psychology Tests", "OLQ Development"], href: "/courses/ssb" },
  { id: "afcat", slug: "afcat", title: "AFCAT Course", tagline: "Air Force Common Admission Test coaching", description: "Specialized AFCAT coaching with AFSB interview preparation.", duration: "4–6 Months", students: "800+", rating: 4.7, badge: null, badgeColor: "", category: "officer", image: "/images/courses/afcat.webp", features: ["Full AFCAT Syllabus", "AFSB Interview Prep", "EKT for Technical", "Physical Training"], href: "/courses/afcat" },
  { id: "navy-agniveer", slug: "navy-agniveer", title: "Indian Navy Agniveer", tagline: "Navy SSR / AA exam coaching with swim training", description: "Navy Agniveer written exam coaching with swimming and physical training.", duration: "3–4 Months", students: "600+", rating: 4.7, badge: "New", badgeColor: "bg-primary text-primary-foreground", category: "soldier", image: "/images/courses/navy.webp", features: ["Written Exam Coaching", "Physical Training", "Swimming Sessions", "Medical Guidance"], href: "/courses/navy-agniveer" },
  { id: "airforce-xy", slug: "airforce-xy", title: "Airforce X / Y Group", tagline: "IAF Airmen selection — technical & non-technical", description: "Airforce X/Y group preparation for technical and non-technical trades.", duration: "4–6 Months", students: "700+", rating: 4.6, badge: null, badgeColor: "", category: "soldier", image: "/images/courses/airforce.webp", features: ["Separate X & Y Batches", "Technical Subjects", "Reasoning & GK", "Physical Fitness"], href: "/courses/airforce-xy" },
  { id: "mns", slug: "mns", title: "MNS Course", tagline: "Military Nursing Service — for female candidates", description: "MNS preparation covering science, English, and interview training.", duration: "3–6 Months", students: "400+", rating: 4.8, badge: "For Women", badgeColor: "bg-[#7c3aed] text-white", category: "specialist", image: "/images/courses/mns.webp", features: ["Science Subjects", "English Prep", "Interview Training", "Personality Development"], href: "/courses/mns" },
  { id: "territorial-army", slug: "territorial-army", title: "Territorial Army", tagline: "Serve the nation — flexible batches for professionals", description: "Territorial Army coaching with weekend batches for working professionals.", duration: "3 Months", students: "400+", rating: 4.8, badge: "Working Professionals", badgeColor: "bg-secondary text-secondary-foreground", category: "specialist", image: "/images/courses/cds.webp", features: ["Weekend Batches", "Flexible Timing", "SSB Training", "Online Support"], href: "/courses/territorial-army" },
]

function mapRow(row: Record<string, unknown>): CourseListItem {
  return {
    id: row.slug as string,
    slug: row.slug as string,
    title: row.title as string,
    tagline: (row.tagline as string) || (row.description as string) || "",
    description: (row.short_description as string) || (row.description as string) || "",
    duration: (row.duration as string) || "",
    students: (row.students as string) || "",
    rating: Number(row.rating) || 4.8,
    badge: (row.badge as string) || null,
    badgeColor: (row.badge_color as string) || "",
    category: (row.category as string) || "officer",
    image: (row.image_url as string) || "/images/courses/nda.webp",
    features: (row.features as string[]) || [],
    href: `/courses/${row.slug}`,
  }
}

function seedToDetail(slug: string, base: CourseListItem): CourseDetail {
  const seed = COURSE_SEED_DETAILS[slug]
  if (!seed) {
    return { ...base, eligibility: [], syllabus: [], benefits: [], fee: "Contact for fee details", batchStart: "Contact for batch dates", examPattern: [] }
  }
  return {
    ...base,
    title: seed.title,
    tagline: seed.tagline,
    description: seed.description,
    duration: seed.duration,
    students: seed.students,
    rating: seed.rating,
    badge: seed.badge,
    badgeColor: seed.badgeColor || base.badgeColor,
    features: seed.features?.length ? seed.features : base.features,
    eligibility: seed.eligibility || [],
    syllabus: seed.syllabus || [],
    benefits: seed.benefits || [],
    fee: seed.fee || "Contact for fee details",
    batchStart: seed.batchStart || "Contact for batch dates",
    examPattern: seed.examPattern || [],
  }
}

export async function getCourses(): Promise<CourseListItem[]> {
  try {
    const { data, error } = await supabase.from("courses").select("*").eq("is_active", true).order("sort_order")
    if (error || !data?.length) return STATIC_COURSES
    return data.map(mapRow)
  } catch {
    return STATIC_COURSES
  }
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const fallback = STATIC_COURSES.find((c) => c.slug === slug)
  const seedOnly = COURSE_SEED_DETAILS[slug]
  const base = fallback ?? (seedOnly ? {
    id: slug, slug, title: seedOnly.title, tagline: seedOnly.tagline, description: seedOnly.description,
    duration: seedOnly.duration, students: seedOnly.students, rating: seedOnly.rating, badge: seedOnly.badge,
    badgeColor: seedOnly.badgeColor, category: "officer", image: "/images/courses/nda.webp",
    features: seedOnly.features || [], href: `/courses/${slug}`,
  } : null)
  if (!base) return null

  try {
    const { data, error } = await supabase.from("courses").select("*").eq("slug", slug).eq("is_active", true).maybeSingle()
    if (error || !data) return seedToDetail(slug, base)

    const mapped = mapRow(data)
    const details = (data.details as Record<string, unknown>) || {}
    const seeded = seedToDetail(slug, { ...base, ...mapped })

    return {
      ...seeded,
      ...mapped,
      eligibility: (details.eligibility as string[])?.length ? details.eligibility as string[] : seeded.eligibility,
      syllabus: (details.syllabus as CourseDetail["syllabus"])?.length ? details.syllabus as CourseDetail["syllabus"] : seeded.syllabus,
      benefits: (details.benefits as string[])?.length ? details.benefits as string[] : seeded.benefits,
      fee: (details.fee as string) || seeded.fee,
      batchStart: (details.batchStart as string) || seeded.batchStart,
      examPattern: (details.examPattern as CourseDetail["examPattern"])?.length ? details.examPattern as CourseDetail["examPattern"] : seeded.examPattern,
      highlights: (data.highlights as string[]) || [],
    }
  } catch {
    return seedToDetail(slug, base)
  }
}

export async function getCourseOptions(): Promise<{ id: string; name: string; duration: string }[]> {
  const courses = await getCourses()
  return courses.map((c) => ({ id: c.slug, name: c.title, duration: c.duration }))
}

export { STATIC_COURSES }
