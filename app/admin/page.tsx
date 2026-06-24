import Link from "next/link"
import { getSiteContent } from "@/lib/site-content"
import {
  Megaphone, Image as ImageIcon, Phone, BarChart3,
  BookOpen, ArrowRight, CheckCircle, Clock,
} from "lucide-react"

const sections = [
  {
    href: "/admin/general",
    icon: Megaphone,
    label: "Announcement Bar",
    desc: "Edit the top banner text and phone number shown on every page.",
    color: "bg-accent/10 border-accent/20",
    iconColor: "text-accent",
  },
  {
    href: "/admin/hero",
    icon: ImageIcon,
    label: "Hero Section",
    desc: "Update the homepage headline, tagline, feature bullets, and stats.",
    color: "bg-primary/10 border-primary/20",
    iconColor: "text-primary",
  },
  {
    href: "/admin/contact",
    icon: Phone,
    label: "Contact Info",
    desc: "Change phone numbers, email, address, and social media links.",
    color: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-600",
  },
  {
    href: "/admin/stats",
    icon: BarChart3,
    label: "Stats Section",
    desc: "Update the achievement numbers shown across the website.",
    color: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-600",
  },
  {
    href: "/admin/courses",
    icon: BookOpen,
    label: "Courses",
    desc: "View and manage the courses listed on the website.",
    color: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-600",
  },
]

export default function AdminDashboardPage() {
  const content = getSiteContent()
  const lastUpdated = content.updatedAt
    ? new Date(content.updatedAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—"

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage website content from here. Changes are live immediately.
        </p>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            Website Status
          </div>
          <p className="text-xl font-bold text-foreground">Live</p>
          <p className="text-xs text-muted-foreground mt-0.5">warriorsdefenceacademy.com</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4 text-accent" />
            Last Content Update
          </div>
          <p className="text-xl font-bold text-foreground truncate">{lastUpdated}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Auto-saved on every change</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <BookOpen className="h-4 w-4 text-primary" />
            Editable Sections
          </div>
          <p className="text-xl font-bold text-foreground">{sections.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Announcement, Hero, Contact, Stats, Courses</p>
        </div>
      </div>

      {/* Quick preview of current values */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide text-muted-foreground">Current Live Values</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground shrink-0">Announcement:</span>
            <span className="text-foreground font-medium text-right">{content.announcement.text}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground shrink-0">Phone 1:</span>
            <span className="text-foreground font-medium">{content.contact.phone1}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground shrink-0">Hero Headline:</span>
            <span className="text-foreground font-medium text-right">{content.hero.headline}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground shrink-0">Email:</span>
            <span className="text-foreground font-medium">{content.contact.email}</span>
          </div>
        </div>
      </div>

      {/* Sections grid */}
      <div>
        <h2 className="font-semibold text-foreground mb-4">Edit Sections</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border mb-4 ${s.color}`}>
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{s.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center text-xs font-medium text-primary gap-1 group-hover:gap-2 transition-all">
                Edit now <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
