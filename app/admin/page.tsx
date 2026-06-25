import Link from "next/link"
import { getSiteContent } from "@/lib/site-content.server"
import { createServerClient } from "@/lib/supabase"
import {
  Megaphone, Image as ImageIcon, Phone, BarChart3,
  BookOpen, ArrowRight, CheckCircle, Clock, MessageSquare, Users,
  Eye, FileText, Images, AlertTriangle, Trophy, GraduationCap, Layers, UserCog, Search, Bot,
} from "lucide-react"

const serviceRoleConfigured =
  Boolean(process.env.WDA_SUPABASE_SERVICE_ROLE_KEY) &&
  process.env.WDA_SUPABASE_SERVICE_ROLE_KEY !== "YOUR_SERVICE_ROLE_KEY_HERE"

const sections = [
  {
    href: "/admin/editor/home",
    icon: Eye,
    label: "Visual Editor",
    desc: "Edit homepage content and images with live preview — like WordPress Elementor.",
    color: "bg-[#2271b1]/10 border-[#2271b1]/20",
    iconColor: "text-[#2271b1]",
  },
  {
    href: "/admin/pages",
    icon: FileText,
    label: "All Pages",
    desc: "View and manage every page on the website.",
    color: "bg-indigo-500/10 border-indigo-500/20",
    iconColor: "text-indigo-600",
  },
  {
    href: "/admin/ai",
    icon: Bot,
    label: "AI Assistant",
    desc: "Connect Claude to automate SEO, content edits, blog posts, and course updates.",
    color: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-600",
  },
  {
    href: "/admin/seo",
    icon: Search,
    label: "SEO Manager",
    desc: "Meta titles, descriptions, schema markup, image alt text, and heading tags.",
    color: "bg-teal-500/10 border-teal-500/20",
    iconColor: "text-teal-600",
  },
  {
    href: "/admin/media",
    icon: Images,
    label: "Media Library",
    desc: "Upload and manage images used across the site.",
    color: "bg-orange-500/10 border-orange-500/20",
    iconColor: "text-orange-600",
  },
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
    desc: "Add, edit, and remove defence coaching programmes with full syllabus details.",
    color: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-600",
  },
  {
    href: "/admin/site-pages",
    icon: FileText,
    label: "Site Pages",
    desc: "Edit About, Contact, Courses, Results, Admissions, and Register page content.",
    color: "bg-indigo-500/10 border-indigo-500/20",
    iconColor: "text-indigo-600",
  },
  {
    href: "/admin/home-sections",
    icon: Layers,
    label: "Home Sections",
    desc: "Manage Activities, Books, and Video Gallery on the homepage.",
    color: "bg-cyan-500/10 border-cyan-500/20",
    iconColor: "text-cyan-600",
  },
  {
    href: "/admin/results",
    icon: Trophy,
    label: "Results",
    desc: "Manage student selection records and featured rankers.",
    color: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-600",
  },
  {
    href: "/admin/admissions",
    icon: GraduationCap,
    label: "Admissions",
    desc: "Manage upcoming batch dates shown on the Admissions page.",
    color: "bg-rose-500/10 border-rose-500/20",
    iconColor: "text-rose-600",
  },
  {
    href: "/admin/users",
    icon: UserCog,
    label: "Admin Users",
    desc: "Add team members who can log in to the dashboard.",
    color: "bg-slate-500/10 border-slate-500/20",
    iconColor: "text-slate-600",
  },
]

export default async function AdminDashboardPage() {
  let content = await getSiteContent()
  let newMsgs = 0
  let pendingRegs = 0

  try {
    const db = createServerClient()
    const [{ count: msgs }, { count: regs }] = await Promise.all([
      db.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
      db.from("registrations").select("*", { count: "exact", head: true }).eq("status", "pending"),
    ])
    newMsgs = msgs ?? 0
    pendingRegs = regs ?? 0
  } catch {
    // Supabase service role not configured — inbox counts unavailable
  }
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

      {!serviceRoleConfigured && (
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="font-semibold">Supabase service role key required for full dashboard access</p>
            <p className="mt-1 text-amber-800">
              Add your real <code className="bg-amber-100 px-1 rounded text-xs">WDA_SUPABASE_SERVICE_ROLE_KEY</code> to{" "}
              <code className="bg-amber-100 px-1 rounded text-xs">.env.local</code> from Supabase Dashboard → Settings → API.
              Without it, CMS saves fall back to local files and entity CRUD (courses, results, blog, etc.) will not work.
            </p>
          </div>
        </div>
      )}

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <Link href="/admin/submissions"
          className="bg-card border border-border rounded-xl p-5 hover:border-blue-300 transition-colors group">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            New Messages
          </div>
          <p className="text-xl font-bold text-foreground">{newMsgs ?? 0}</p>
          <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-blue-600 transition-colors">View inbox →</p>
        </Link>

        <Link href="/admin/registrations"
          className="bg-card border border-border rounded-xl p-5 hover:border-yellow-300 transition-colors group">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Users className="h-4 w-4 text-yellow-500" />
            Pending Registrations
          </div>
          <p className="text-xl font-bold text-foreground">{pendingRegs ?? 0}</p>
          <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-yellow-600 transition-colors">View all →</p>
        </Link>
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
