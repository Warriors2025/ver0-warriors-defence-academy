export type CmsPage = {
  slug: string
  title: string
  path: string
  description: string
  editable: boolean
  visualEditor?: boolean
  adminPath?: string
  sections: string[]
}

export const CMS_PAGES: CmsPage[] = [
  {
    slug: "home",
    title: "Homepage",
    path: "/",
    description: "Hero, features, stats, director message, mentors, FAQs, and CTA.",
    editable: true,
    visualEditor: true,
    adminPath: "/admin/editor/home",
    sections: ["hero", "features", "stats", "director", "cta", "activities", "books", "videos"],
  },
  {
    slug: "about",
    title: "About Us",
    path: "/about",
    description: "About page hero, mission, vision, milestones, and values.",
    editable: true,
    adminPath: "/admin/site-pages",
    sections: ["hero", "mission", "vision", "milestones", "values"],
  },
  {
    slug: "courses",
    title: "Courses",
    path: "/courses",
    description: "Course listings and individual course pages.",
    editable: true,
    adminPath: "/admin/courses",
    sections: ["hero", "stats", "courses"],
  },
  {
    slug: "contact",
    title: "Contact",
    path: "/contact",
    description: "Contact details, office hours, and map.",
    editable: true,
    adminPath: "/admin/site-pages",
    sections: ["contact", "hero"],
  },
  {
    slug: "blog",
    title: "Blog",
    path: "/blog",
    description: "Articles and defence exam guides.",
    editable: true,
    adminPath: "/admin/blog",
    sections: ["posts"],
  },
  {
    slug: "gallery",
    title: "Gallery",
    path: "/gallery",
    description: "Campus photos and training images.",
    editable: true,
    adminPath: "/admin/gallery",
    sections: ["images"],
  },
  {
    slug: "facilities",
    title: "Facilities",
    path: "/facilities",
    description: "Campus facilities including GTO ground, library, sports, and mentorship.",
    editable: false,
    sections: ["facilities"],
  },
  {
    slug: "results",
    title: "Results",
    path: "/results",
    description: "Student selections and achievements.",
    editable: true,
    adminPath: "/admin/results",
    sections: ["hero", "stats", "selections"],
  },
  {
    slug: "admissions",
    title: "Admissions",
    path: "/admissions",
    description: "Admission process, batches, fees, and scholarships.",
    editable: true,
    adminPath: "/admin/admissions",
    sections: ["hero", "batches", "steps", "fees"],
  },
  {
    slug: "register",
    title: "Register",
    path: "/register",
    description: "Student registration form.",
    editable: true,
    adminPath: "/admin/site-pages",
    sections: ["hero", "form"],
  },
]

export function getCmsPage(slug: string) {
  return CMS_PAGES.find((page) => page.slug === slug)
}
