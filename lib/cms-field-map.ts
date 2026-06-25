/** Maps CMS field paths to visual editor sidebar section titles. */
export const CMS_SECTION_BY_FIELD: Record<string, string> = {
  "announcement.text": "Announcement Bar",
  "announcement.phone": "Announcement Bar",
  "hero.badge": "Hero Section",
  "hero.headline": "Hero Section",
  "hero.highlightText": "Hero Section",
  "hero.tagline": "Hero Section",
  "sections.heroAchievement.value": "Hero Section",
  "sections.heroAchievement.label": "Hero Section",
  "sections.featuresHeader.eyebrow": "Features Section",
  "sections.featuresHeader.title": "Features Section",
  "sections.featuresHeader.subtitle": "Features Section",
  "sections.statsSection.eyebrow": "Stats Section",
  "sections.statsSection.title": "Stats Section",
  "sections.director.eyebrow": "Director Message",
  "sections.director.title": "Director Message",
  "sections.director.name": "Director Message",
  "sections.director.role": "Director Message",
  "sections.cta.eyebrow": "Call to Action",
  "sections.cta.title": "Call to Action",
  "sections.cta.highlight": "Call to Action",
  "sections.cta.subtitle": "Call to Action",
  "contact.phone1": "Contact Info",
  "contact.phone2": "Contact Info",
  "contact.email": "Contact Info",
  "contact.address": "Contact Info",
}

export function resolveCmsSection(field: string): string | null {
  if (CMS_SECTION_BY_FIELD[field]) return CMS_SECTION_BY_FIELD[field]
  if (field.startsWith("hero.features.")) return "Hero Section"
  if (field.startsWith("hero.stats.")) return "Hero Section"
  if (field.startsWith("sections.heroSlides.")) return "Hero Section"
  if (field.startsWith("sections.features.")) return "Features Section"
  if (field.startsWith("sections.statsSection.stats.")) return "Stats Section"
  if (field.startsWith("sections.director.paragraphs.")) return "Director Message"
  if (field.startsWith("sections.director.")) return "Director Message"
  if (field.startsWith("sections.cta.")) return "Call to Action"
  if (field.startsWith("contact.")) return "Contact Info"
  if (field.startsWith("announcement.")) return "Announcement Bar"
  if (field.startsWith("hero.")) return "Hero Section"
  return null
}

export function fieldToInputId(field: string) {
  return `cms-edit-${field.replace(/\./g, "--")}`
}
