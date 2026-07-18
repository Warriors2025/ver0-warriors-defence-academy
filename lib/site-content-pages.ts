export type PageHero = {
  eyebrow?: string
  title: string
  subtitle: string
  image?: string
}

export type PageStat = { value: string; label: string }

export type SitePages = {
  contact: {
    hero: PageHero
    officeHours: string
    sundayHours: string
    mapEmbedUrl: string
  }
  courses: {
    hero: PageHero
    stats: PageStat[]
  }
  results: {
    hero: PageHero
    stats: PageStat[]
    examBreakdown: { exam: string; count: string }[]
    awards: string[]
  }
  register: {
    hero: PageHero
  }
  admissions: {
    hero: PageHero
    steps: { title: string; description: string }[]
    documents: string[]
    scholarships: { title: string; description: string }[]
    fees: { course: string; amount: string; note: string }[]
  }
  about: {
    hero: PageHero
    mission: string
    vision: string
    milestones: { year: string; title: string; description: string }[]
    values: { title: string; description: string }[]
    stats: PageStat[]
  }
}

export type ActivityItem = { image: string; title: string; tag: string }
export type BookItem = {
  title: string
  subtitle: string
  price: string
  originalPrice: string
  rating: number
  image: string
  badge: string | null
}
export type VideoItem = { title: string; thumbnail: string; videoId: string }

export const defaultPages: SitePages = {
  contact: {
    hero: {
      eyebrow: "Get in Touch — Lucknow",
      title: "Contact Warriors Defence Academy",
      subtitle: "Reach India's best NDA coaching institute in Lucknow. Call +91 94522 45729 or visit us at Kapoorthala Chauraha, Lucknow — Mon to Sat, 9 AM to 6 PM.",
    },
    officeHours: "Mon – Sat, 9:00 AM – 6:00 PM",
    sundayHours: "Sunday: Closed",
    mapEmbedUrl: "",
  },
  courses: {
    hero: {
      eyebrow: "NDA, CDS & SSB Coaching",
      title: "Best NDA & Defence Coaching Courses in Lucknow",
      subtitle: "Expert-designed NDA, CDS, AFCAT & SSB coaching programmes in Lucknow led by retired military officers — 5,000+ selections, 15+ years of proven results.",
    },
    stats: [
      { value: "9+", label: "Programmes" },
      { value: "5,000+", label: "Selections" },
      { value: "4.8", label: "Avg. Rating" },
      { value: "15+", label: "Years" },
    ],
  },
  results: {
    hero: {
      eyebrow: "Our Proud Selections",
      title: "NDA & SSB Selections — Warriors Defence Academy",
      subtitle: "5,000+ students from Warriors Defence Academy Lucknow have secured commissions in the Indian Army, Navy and Air Force. AIR #1 multiple years.",
    },
    stats: [
      { value: "5,000+", label: "Total Selections" },
      { value: "450+", label: "Selections in 2024" },
      { value: "68%", label: "SSB Recommendation Rate" },
      { value: "1,200+", label: "Officer Entries" },
    ],
    examBreakdown: [
      { exam: "NDA", count: "2,500+" },
      { exam: "CDS", count: "1,200+" },
      { exam: "AFCAT", count: "800+" },
      { exam: "SSB", count: "500+" },
    ],
    awards: [
      "Best NDA Coaching Institute — Lucknow 2024",
      "Highest NDA Selection Rate — North India",
      "Excellence in SSB Training Award",
    ],
  },
  register: {
    hero: {
      eyebrow: "Apply for NDA Coaching",
      title: "Register for NDA Coaching at Warriors Defence Academy",
      subtitle: "Take the first step towards your defence career. Fill the form below and our counselors will contact you within 24 hours. Free counseling session for all applicants.",
    },
  },
  admissions: {
    hero: {
      eyebrow: "NDA Coaching Admissions 2026–27",
      title: "Join India's Best NDA Coaching — Admissions Open",
      subtitle: "Warriors Defence Academy Lucknow admissions are open for NDA, CDS & SSB coaching. Limited seats — apply early to secure your 2026-27 batch.",
    },
    steps: [
      { title: "Submit Enquiry", description: "Fill the online registration form or visit our campus at Kapoorthala Chauraha, Lucknow." },
      { title: "Counseling Session", description: "Meet our expert counselors to choose the right NDA/CDS/SSB programme." },
      { title: "Entrance Assessment", description: "Basic aptitude test to assess your readiness for defence coaching." },
      { title: "Confirm Admission", description: "Complete documentation and fee payment to secure your seat." },
    ],
    documents: [
      "10th & 12th Mark Sheets",
      "Aadhaar Card / ID Proof",
      "Passport-size Photographs",
      "Medical Fitness Certificate",
      "Transfer Certificate (if applicable)",
    ],
    scholarships: [
      { title: "Merit Scholarship", description: "Up to 25% fee waiver for students scoring 90%+ in board exams." },
      { title: "Defence Family Discount", description: "10% concession for children of serving/retired defence personnel." },
      { title: "Sibling Discount", description: "5% off when two siblings enroll together at Warriors Defence Academy." },
    ],
    fees: [
      { course: "NDA Coaching", amount: "₹85,000", note: "6-month programme" },
      { course: "CDS Coaching", amount: "₹55,000", note: "6-month programme" },
      { course: "SSB Interview Training", amount: "₹35,000", note: "21-day intensive" },
    ],
  },
  about: {
    hero: {
      eyebrow: "Est. 2010 — Lucknow, Uttar Pradesh",
      title: "About Warriors Defence Academy — India's Best NDA Coaching",
      subtitle: "15+ years of excellence in NDA, CDS & SSB coaching in Lucknow. Shaping India's future officers through discipline, expert military faculty, and India's largest GTO ground.",
      image: "/images/hero/carousel-3.webp",
    },
    mission: "To provide world-class NDA and defence coaching that transforms aspirants in Lucknow and across India into confident, capable officers ready to serve the nation.",
    vision: "To be India's most trusted NDA coaching institute, known for integrity, results, and holistic officer grooming across every armed force.",
    milestones: [
      { year: "2010", title: "Foundation Year", description: "Warriors Defence Academy was established in Lucknow with a bold vision to build a centre of excellence." },
      { year: "2016", title: "New Campus & GTO Ground", description: "Moved to current campus with India's largest GTO ground." },
      { year: "2024", title: "5,000+ Selections", description: "Achieved 5,000+ successful selections nationwide." },
    ],
    values: [
      { title: "Discipline", description: "Military-grade discipline in every aspect of training and life on campus." },
      { title: "Excellence", description: "Uncompromising standards in academics, physical training, and character building." },
      { title: "Integrity", description: "Honest guidance and transparent practices in all our dealings with students and parents." },
    ],
    stats: [
      { value: "15+", label: "Years of Excellence" },
      { value: "5,000+", label: "Selections" },
      { value: "200+", label: "Expert Mentors" },
      { value: "50,000+", label: "Students Trained" },
    ],
  },
}

export const defaultActivities: ActivityItem[] = [
  { image: "/images/activities/activity-1.webp", title: "Morning Physical Training", tag: "Fitness" },
  { image: "/images/activities/activity-2.webp", title: "GTO Group Tasks", tag: "SSB Prep" },
  { image: "/images/activities/activity-3.webp", title: "Team Sports", tag: "Teamwork" },
  { image: "/images/activities/activity-4.webp", title: "Parade Practice", tag: "Discipline" },
  { image: "/images/activities/activity-5.webp", title: "Adventure Training", tag: "Leadership" },
  { image: "/images/activities/activity-6.webp", title: "Group Discussions", tag: "Communication" },
]

export const defaultBooks: { header: { eyebrow: string; title: string; subtitle: string; promoCode: string }; items: BookItem[] } = {
  header: {
    eyebrow: "Study Materials",
    title: "In-House Books for Our Students",
    subtitle: "Expert-authored books and practice manuals are provided to enrolled students — aligned with the latest NDA, CDS, and SSB exam patterns.",
    promoCode: "",
  },
  items: [
    { title: "WDA Physics for NDA", subtitle: "Concept & Practice", price: "", originalPrice: "", rating: 4.8, image: "/images/books/physics.jpg", badge: "Popular" },
    { title: "WDA Indian Polity", subtitle: "NDA & CDS Edition", price: "", originalPrice: "", rating: 4.7, image: "/images/books/polity.jpg", badge: null },
    { title: "WDA Geography", subtitle: "For Defence Exams", price: "", originalPrice: "", rating: 4.9, image: "/images/books/geography.jpg", badge: "New" },
    { title: "WDA Chemistry", subtitle: "Complete Preparation", price: "", originalPrice: "", rating: 4.8, image: "/images/books/chemistry.jpg", badge: "Top Rated" },
    { title: "WDA NDA Mathematics", subtitle: "Complete Guide", price: "", originalPrice: "", rating: 4.6, image: "/images/books/physics.jpg", badge: null },
  ],
}

export const defaultVideos: { header: { eyebrow: string; title: string; subtitle: string }; items: VideoItem[] } = {
  header: {
    eyebrow: "Video Gallery",
    title: "Watch Our Training Videos",
    subtitle: "Real training videos, student success stories, and motivational sessions from our campus.",
  },
  items: [
    { title: "Warriors Defence Academy Campus Tour", thumbnail: "/images/hero/carousel-3.webp", videoId: "dQw4w9WgXcQ" },
    { title: "NDA Preparation Tips & Strategies", thumbnail: "/images/hero/carousel-2.webp", videoId: "dQw4w9WgXcQ" },
    { title: "SSB Interview Success Stories", thumbnail: "/images/hero/carousel-1.webp", videoId: "dQw4w9WgXcQ" },
    { title: "Physical Training at WDA", thumbnail: "/images/hero/carousel-4.webp", videoId: "dQw4w9WgXcQ" },
  ],
}
