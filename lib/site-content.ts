import fs from "fs"
import path from "path"

const CONTENT_FILE = path.join(process.cwd(), "data", "site-content.json")

export type SiteContent = {
  announcement: {
    text: string
    phone: string
  }
  hero: {
    badge: string
    headline: string
    highlightText: string
    tagline: string
    features: string[]
    stats: { value: string; label: string }[]
  }
  contact: {
    phone1: string
    phone2: string
    email: string
    address: string
    facebook: string
    instagram: string
    youtube: string
  }
  stats: {
    value: string
    label: string
    description: string
  }[]
  updatedAt?: string
}

const defaultContent: SiteContent = {
  announcement: {
    text: "Admissions Open for 2026–27 Batch",
    phone: "+91 94522 45729",
  },
  hero: {
    badge: "India's Premier Defence Academy",
    headline: "Shape India's Future",
    highlightText: "Defence Officer",
    tagline: "Join the ranks of India's finest military officers. Expert coaching for NDA, CDS, AFCAT, SSB and more.",
    features: [
      "NDA • CDS • AFCAT coaching",
      "SSB interview training",
      "Physical fitness programs",
      "Expert retired officer faculty",
    ],
    stats: [
      { value: "50,000+", label: "Students Trained" },
      { value: "5,000+", label: "Selections" },
      { value: "15+", label: "Years" },
      { value: "200+", label: "Mentors" },
    ],
  },
  contact: {
    phone1: "+91 94522 45729",
    phone2: "+91 70810 11964",
    email: "info@warriorsdefenceacademy.com",
    address: "545-Ga/1 Chha, Near Kapoorthala Chauraha, Beside Raidas Railway Crossing, Lucknow - 226024",
    facebook: "https://www.facebook.com/WarriorsDefenceAcademyLko",
    instagram: "https://www.instagram.com/warriorsdefenceacademy_/",
    youtube: "https://www.youtube.com/@WarriorsDefenceAcademy",
  },
  stats: [
    { value: "50,000+", label: "Students Trained", description: "From across India" },
    { value: "5,000+", label: "Successful Selections", description: "In Armed Forces" },
    { value: "200+", label: "Expert Mentors", description: "Retired officers" },
    { value: "15+", label: "Years Experience", description: "Of excellence" },
  ],
}

export function getSiteContent(): SiteContent {
  try {
    if (!fs.existsSync(CONTENT_FILE)) {
      saveSiteContent(defaultContent)
      return defaultContent
    }
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8")
    const parsed = JSON.parse(raw)
    return {
      ...defaultContent,
      ...parsed,
      contact: { ...defaultContent.contact, ...parsed.contact },
      hero: { ...defaultContent.hero, ...parsed.hero },
      announcement: { ...defaultContent.announcement, ...parsed.announcement },
    }
  } catch {
    return defaultContent
  }
}

export function saveSiteContent(content: SiteContent): void {
  const dir = path.dirname(CONTENT_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const toWrite = { ...content, updatedAt: new Date().toISOString() }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(toWrite, null, 2), "utf-8")
}
