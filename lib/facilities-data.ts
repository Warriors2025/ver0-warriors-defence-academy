export type FacilityPhoto = { src: string; alt: string }

export type Facility = {
  slug: string
  title: string
  tagline: string
  description: string
  image: string
  highlights: string[]
  benefits: string[]
  relatedCourses: { title: string; href: string }[]
}

export const FACILITIES: Facility[] = [
  {
    slug: "gto-ground",
    title: "Largest GTO Ground",
    tagline: "India's largest GTO training ground for SSB readiness",
    description:
      "Our dedicated Group Testing Officer ground is built to mirror real SSB task environments. Students practice progressive obstacle tasks, group planning exercises, and leadership drills under retired GTO experts — building the stamina, coordination, and officer-like qualities assessors look for.",
    image: "/images/features/gto-ground.webp",
    highlights: [
      "Full-scale individual and group obstacle tasks",
      "Daily supervised GTO sessions with ex-military trainers",
      "Progressive difficulty levels for beginners to advanced batches",
      "Team-building and command-task practice areas",
    ],
    benefits: [
      "Build physical confidence before your actual SSB",
      "Learn task strategy from officers who have assessed thousands of candidates",
      "Reduce anxiety by practising on terrain similar to selection boards",
    ],
    relatedCourses: [
      { title: "SSB Interview Training", href: "/courses/ssb" },
      { title: "NDA Course", href: "/courses/nda" },
    ],
  },
  {
    slug: "library",
    title: "Library Facilities",
    tagline: "Complete reference library for NDA, CDS & SSB preparation",
    description:
      "Our campus library houses an extensive collection of defence exam reference books, previous-year papers, current affairs compilations, and SSB preparation manuals — all available to enrolled students throughout their coaching programme.",
    image: "/images/features/library.webp",
    highlights: [
      "NDA, CDS, AFCAT & SSB reference books",
      "Previous year question papers and solved examples",
      "Quiet reading zones and group study areas",
      "Regularly updated current affairs material",
    ],
    benefits: [
      "Study without additional book purchases",
      "Access curated material aligned with latest exam patterns",
      "Focused environment away from classroom distractions",
    ],
    relatedCourses: [
      { title: "NDA Course", href: "/courses/nda" },
      { title: "CDS Course", href: "/courses/cds" },
    ],
  },
  {
    slug: "ima-visit",
    title: "IMA Dehradun Visits",
    tagline: "Educational visits to the Indian Military Academy",
    description:
      "Warriors Defence Academy organises guided educational trips to the Indian Military Academy, Dehradun, giving aspirants firsthand exposure to officer training life, academy discipline, and the standards they are working toward.",
    image: "/images/features/ima-visit.webp",
    highlights: [
      "Guided campus tours with structured briefings",
      "Motivational sessions with serving and retired officers",
      "Real-world context for NDA & CDS career goals",
      "Photo and learning documentation for aspirants",
    ],
    benefits: [
      "Strengthen commitment to a defence career",
      "Understand academy life beyond textbooks",
      "Return to coaching with renewed motivation and clarity",
    ],
    relatedCourses: [
      { title: "NDA Foundation Course", href: "/courses/nda-foundation" },
      { title: "NDA Course", href: "/courses/nda" },
    ],
  },
  {
    slug: "mock-test",
    title: "Mock Test Facilities",
    tagline: "Exam-style tests that mirror NDA & CDS papers",
    description:
      "Regular mock examinations simulate actual NDA and CDS written papers under timed conditions. Detailed performance analysis helps students identify weak subjects, improve speed, and build exam-day confidence.",
    image: "/images/features/mock-test.webp",
    highlights: [
      "Full-length and sectional mock tests",
      "OMR-style practice for objective papers",
      "Performance reports with rank and subject-wise analysis",
      "Remedial guidance based on test results",
    ],
    benefits: [
      "Track progress with measurable benchmarks",
      "Reduce exam anxiety through repeated practice",
      "Focus revision on areas that need the most improvement",
    ],
    relatedCourses: [
      { title: "NDA Course", href: "/courses/nda" },
      { title: "CDS Course", href: "/courses/cds" },
      { title: "AFCAT Course", href: "/courses/afcat" },
    ],
  },
  {
    slug: "sports",
    title: "National Sports Facilities",
    tagline: "Physical training infrastructure for defence standards",
    description:
      "Defence selection demands peak physical fitness. Our sports facilities support daily PT, endurance training, and sport-specific conditioning so students meet the rigorous physical standards of NDA, CDS, and SSB boards.",
    image: "/images/features/sports.webp",
    highlights: [
      "Dedicated PT grounds and running tracks",
      "Strength and endurance training equipment",
      "Team sports for coordination and stamina",
      "Structured fitness plans for boys and girls",
    ],
    benefits: [
      "Improve running, strength, and agility systematically",
      "Build discipline through daily physical routine",
      "Meet medical and GTO physical expectations confidently",
    ],
    relatedCourses: [
      { title: "SSB Interview Training", href: "/courses/ssb" },
      { title: "NDA Course", href: "/courses/nda" },
    ],
  },
  {
    slug: "english-class",
    title: "Spoken English Classes",
    tagline: "Communication skills for GTO discussions and interviews",
    description:
      "Clear spoken English is essential for group discussions, lecturettes, and personal interviews. Dedicated English classes help students express ideas confidently, expand vocabulary, and communicate with the polish expected of future officers.",
    image: "/images/features/english-class.webp",
    highlights: [
      "Daily spoken English and articulation sessions",
      "Group discussion and lecturette practice",
      "Vocabulary building for defence topics",
      "Interview-style communication drills",
    ],
    benefits: [
      "Speak clearly under pressure in SSB tasks",
      "Improve confidence in classroom and board settings",
      "Complement academic preparation with communication skills",
    ],
    relatedCourses: [
      { title: "SSB Interview Training", href: "/courses/ssb" },
      { title: "CDS Course", href: "/courses/cds" },
    ],
  },
  {
    slug: "doubt-clearing",
    title: "Doubt Counter Center",
    tagline: "One-on-one academic support from subject experts",
    description:
      "Our doubt counter gives every student direct access to faculty for individual questions. Whether it is mathematics, general knowledge, or SSB psychology, experts provide personalised explanations until concepts are fully understood.",
    image: "/images/features/doubt-clearing.webp",
    highlights: [
      "Scheduled and walk-in doubt sessions",
      "Subject-wise expert faculty availability",
      "Personalised problem-solving approach",
      "Follow-up until the concept is clear",
    ],
    benefits: [
      "Never stay stuck on difficult topics",
      "Strengthen weak subjects with targeted help",
      "Learn at your own pace with expert guidance",
    ],
    relatedCourses: [
      { title: "NDA Course", href: "/courses/nda" },
      { title: "NDA Foundation Course", href: "/courses/nda-foundation" },
    ],
  },
  {
    slug: "mentorship",
    title: "Expert Mentorship",
    tagline: "Guidance from retired military officers and defence experts",
    description:
      "Students benefit from mentorship by distinguished retired officers and senior faculty who bring decades of service experience. From written exam strategy to officer grooming and SSB assessment, mentors guide every step of the journey.",
    image: "/images/features/mentorship.webp",
    highlights: [
      "Chief mentors with 20–35+ years of service",
      "Officer grooming and leadership development",
      "SSB psychology and interview mentoring",
      "Career counselling for NDA, CDS & AFCAT paths",
    ],
    benefits: [
      "Learn from people who have lived the defence career",
      "Receive honest feedback on OLQs and preparation gaps",
      "Build the mindset of a future officer, not just an exam candidate",
    ],
    relatedCourses: [
      { title: "SSB Interview Training", href: "/courses/ssb" },
      { title: "NDA Course", href: "/courses/nda" },
    ],
  },
]

/** Default photo galleries per facility — override via CMS at sections.facilityPhotos */
export const DEFAULT_FACILITY_PHOTOS: Record<string, FacilityPhoto[]> = {
  "gto-ground": [
    { src: "/images/features/gto-ground.webp", alt: "GTO training ground overview" },
    { src: "/images/gallery/gto-1.jpg", alt: "Students on GTO obstacle course" },
    { src: "/images/activities/activity-2.webp", alt: "Group task practice session" },
    { src: "/images/gallery/training-1.jpg", alt: "Physical training on campus" },
  ],
  library: [
    { src: "/images/features/library.webp", alt: "Academy library" },
    { src: "/images/gallery/campus-1.jpg", alt: "Academic building and study areas" },
    { src: "/images/gallery/campus-2.jpg", alt: "Campus facilities" },
    { src: "/images/books/physics.jpg", alt: "Defence exam reference books" },
  ],
  "ima-visit": [
    { src: "/images/features/ima-visit.webp", alt: "IMA Dehradun educational visit" },
    { src: "/images/gallery/event-1.jpg", alt: "Academy event and excursion" },
    { src: "/images/gallery/campus-2.jpg", alt: "Campus gathering" },
    { src: "/images/hero/carousel-3.webp", alt: "Inspirational academy visit" },
  ],
  "mock-test": [
    { src: "/images/features/mock-test.webp", alt: "Mock test examination hall" },
    { src: "/images/gallery/training-1.jpg", alt: "Exam preparation session" },
    { src: "/images/gallery/event-2.jpg", alt: "Students during assessment" },
    { src: "/images/gallery/campus-1.jpg", alt: "Classroom testing environment" },
  ],
  sports: [
    { src: "/images/features/sports.webp", alt: "Sports and PT facilities" },
    { src: "/images/activities/activity-1.webp", alt: "Morning physical training" },
    { src: "/images/activities/activity-3.webp", alt: "Team sports session" },
    { src: "/images/activities/activity-4.webp", alt: "Parade and discipline training" },
  ],
  "english-class": [
    { src: "/images/features/english-class.webp", alt: "Spoken English classroom" },
    { src: "/images/gallery/event-3.jpg", alt: "Group discussion practice" },
    { src: "/images/activities/activity-6.webp", alt: "Communication skills session" },
    { src: "/images/gallery/campus-1.jpg", alt: "Interactive classroom" },
  ],
  "doubt-clearing": [
    { src: "/images/features/doubt-clearing.webp", alt: "Doubt counter with faculty" },
    { src: "/images/gallery/campus-2.jpg", alt: "One-on-one academic support" },
    { src: "/images/gallery/training-1.jpg", alt: "Study and guidance session" },
    { src: "/images/books/chemistry.jpg", alt: "Subject reference materials" },
  ],
  mentorship: [
    { src: "/images/features/mentorship.webp", alt: "Expert mentor session" },
    { src: "/images/mentors/lt-gen-dushyant.webp", alt: "Lt. Gen. Dushyant Singh — Chief Mentor" },
    { src: "/images/mentors/col-tiwari.webp", alt: "Col. R.K. Tiwari — GTO Expert" },
    { src: "/images/director.webp", alt: "Academy leadership guidance" },
  ],
}

const bySlug = new Map(FACILITIES.map((f) => [f.slug, f]))
const byImage = new Map(FACILITIES.map((f) => [f.image, f]))
const byTitle = new Map(FACILITIES.map((f) => [f.title, f]))

/** Prefer CMS facilityItems when present; fall back to hardcoded FACILITIES. */
export function resolveFacilities(cmsItems?: Facility[] | null): Facility[] {
  if (cmsItems?.length) return cmsItems
  return FACILITIES
}

export function getFacilities(cmsItems?: Facility[] | null): Facility[] {
  return resolveFacilities(cmsItems)
}

export function getFacilityBySlug(slug: string, cmsItems?: Facility[] | null): Facility | null {
  const list = resolveFacilities(cmsItems)
  return list.find((f) => f.slug === slug) ?? bySlug.get(slug) ?? null
}

/** Resolve homepage feature card link to its dedicated facility page when possible. */
export function getFacilityHref(feature: { title: string; image: string; href: string }): string {
  if (feature.href.startsWith("/facilities/")) return feature.href
  const match = byImage.get(feature.image) ?? byTitle.get(feature.title)
  return match ? `/facilities/${match.slug}` : feature.href
}

export function getFacilitySlugFromFeature(feature: { title: string; image: string }): string | null {
  return (byImage.get(feature.image) ?? byTitle.get(feature.title))?.slug ?? null
}

/** CMS photos take priority; falls back to DEFAULT_FACILITY_PHOTOS. */
export function getFacilityPhotos(
  slug: string,
  cmsPhotos?: Record<string, FacilityPhoto[]>,
): FacilityPhoto[] {
  const cms = cmsPhotos?.[slug]
  if (cms?.length) return cms
  return DEFAULT_FACILITY_PHOTOS[slug] ?? []
}

export function buildDefaultFacilityPhotosMap(): Record<string, FacilityPhoto[]> {
  return { ...DEFAULT_FACILITY_PHOTOS }
}
