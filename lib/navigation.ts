export type NavLinkItem = {
  title: string
  href: string
}

export type NavCourseItem = {
  title: string
  href: string
  description: string
  icon: string
  badge: string | null
}

export type NavigationContent = {
  navLinks: NavLinkItem[]
  courses: NavCourseItem[]
  footerQuickLinks: NavLinkItem[]
  footerCourses: NavLinkItem[]
  footerAbout: string
}

export const DEFAULT_NAVIGATION: NavigationContent = {
  navLinks: [
    { title: "About Us", href: "/about" },
    { title: "Results", href: "/results" },
    { title: "Blog", href: "/blog" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact", href: "/contact" },
  ],
  courses: [
    { title: "NDA Course", href: "/courses/nda", description: "Written exam + SSB prep", icon: "Sword", badge: "Popular" },
    { title: "NDA Foundation", href: "/courses/nda-foundation", description: "Integrated Class 10-12 programme", icon: "BookOpen", badge: null },
    { title: "CDS Course", href: "/courses/cds", description: "For graduate defence aspirants", icon: "GraduationCap", badge: null },
    { title: "SSB Interview", href: "/courses/ssb", description: "21-day intensive SSB training", icon: "Users", badge: "Top Rated" },
    { title: "AFCAT Course", href: "/courses/afcat", description: "Air Force admission test prep", icon: "Plane", badge: null },
    { title: "Indian Navy Agniveer", href: "/courses/navy-agniveer", description: "Navy SSR/AA exam coaching", icon: "Anchor", badge: "New" },
    { title: "Airforce X/Y", href: "/courses/airforce-xy", description: "IAF Group X & Y preparation", icon: "Sword", badge: null },
    { title: "MNS Course", href: "/courses/mns", description: "Military Nursing Service prep", icon: "Heart", badge: "For Women" },
  ],
  footerQuickLinks: [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Courses", href: "/courses" },
    { title: "Results", href: "/results" },
    { title: "Blog", href: "/blog" },
    { title: "Gallery", href: "/gallery" },
    { title: "Facilities", href: "/facilities" },
    { title: "Contact", href: "/contact" },
    { title: "Register", href: "/register" },
  ],
  footerCourses: [
    { title: "NDA Course", href: "/courses/nda" },
    { title: "NDA Foundation", href: "/courses/nda-foundation" },
    { title: "CDS Course", href: "/courses/cds" },
    { title: "SSB Interview", href: "/courses/ssb" },
    { title: "AFCAT Course", href: "/courses/afcat" },
    { title: "MNS Course", href: "/courses/mns" },
  ],
  footerAbout:
    "India's premier defence coaching institute preparing future officers for NDA, CDS, AFCAT, and SSB with excellence and dedication.",
}

export const NAV_ICON_OPTIONS = [
  "Sword",
  "BookOpen",
  "GraduationCap",
  "Users",
  "Plane",
  "Anchor",
  "Heart",
  "Shield",
  "Target",
  "Award",
] as const

export function mergeNavigation(raw?: Partial<NavigationContent> | null): NavigationContent {
  if (!raw) return DEFAULT_NAVIGATION
  return {
    navLinks: raw.navLinks?.length ? raw.navLinks : DEFAULT_NAVIGATION.navLinks,
    courses: raw.courses?.length ? raw.courses : DEFAULT_NAVIGATION.courses,
    footerQuickLinks: raw.footerQuickLinks?.length ? raw.footerQuickLinks : DEFAULT_NAVIGATION.footerQuickLinks,
    footerCourses: raw.footerCourses?.length ? raw.footerCourses : DEFAULT_NAVIGATION.footerCourses,
    footerAbout: raw.footerAbout?.trim() ? raw.footerAbout : DEFAULT_NAVIGATION.footerAbout,
  }
}
