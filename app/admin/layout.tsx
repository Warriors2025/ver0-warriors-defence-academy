"use client"

import { SessionProvider, useSession, signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"
import {
  LayoutDashboard, Megaphone, Image as ImageIcon, Phone,
  BarChart3, BookOpen, LogOut, Shield, ChevronRight, ExternalLink,
  FileText, Eye, Users, MessageSquare, HelpCircle, Star, Newspaper,
  Images, Inbox, UserCheck, Trophy, GraduationCap, Layers, UserCog, Search, Bot,
  Building2, Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/pages", label: "Pages", icon: FileText, exact: false },
  { href: "/admin/seo", label: "SEO", icon: Search, exact: false },
  { href: "/admin/ai", label: "AI Assistant", icon: Bot, exact: false },
  { href: "/admin/editor/home", label: "Visual Editor", icon: Eye, exact: false },
  { href: "/admin/site-pages", label: "Site Pages", icon: FileText, exact: false },
  { href: "/admin/home-sections", label: "Home Sections", icon: Layers, exact: false },
  { href: "/admin/navigation", label: "Navigation", icon: Menu, exact: false },
  { href: "/admin/media", label: "Media", icon: Images, exact: false },
  { href: "/admin/general", label: "Announcement", icon: Megaphone, exact: false },
  { href: "/admin/hero", label: "Hero Section", icon: ImageIcon, exact: false },
  { href: "/admin/contact", label: "Contact Info", icon: Phone, exact: false },
  { href: "/admin/stats", label: "Stats Numbers", icon: BarChart3, exact: false },
  { href: "/admin/mentors", label: "Mentors", icon: Users, exact: false },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star, exact: false },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle, exact: false },
  { href: "/admin/blog", label: "Blog", icon: Newspaper, exact: false },
  { href: "/admin/gallery", label: "Gallery", icon: Images, exact: false },
  { href: "/admin/facilities", label: "Facilities", icon: Building2, exact: false },
  { href: "/admin/courses", label: "Courses", icon: BookOpen, exact: false },
  { href: "/admin/results", label: "Results", icon: Trophy, exact: false },
  { href: "/admin/admissions", label: "Admissions", icon: GraduationCap, exact: false },
  { href: "/admin/users", label: "Users", icon: UserCog, exact: false },
  { href: "/admin/submissions", label: "Messages", icon: Inbox, exact: false },
  { href: "/admin/registrations", label: "Registrations", icon: UserCheck, exact: false },
]

function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-primary min-h-screen border-r border-primary-foreground/10">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-primary-foreground/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
            <Shield className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-primary-foreground text-sm font-bold leading-none">WDA Admin</p>
            <p className="text-primary-foreground/50 text-[10px] mt-0.5">Warriors Defence Academy</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href) && (!item.exact || pathname === item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-accent/15 text-accent border border-accent/20"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/8 hover:text-primary-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-accent" : "text-primary-foreground/50")} />
              {item.label}
              {active && <ChevronRight className="h-3 w-3 ml-auto text-accent/70" />}
            </Link>
          )
        })}
      </nav>

      {/* View site + user */}
      <div className="px-3 pb-5 space-y-2 border-t border-primary-foreground/10 pt-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Website
        </a>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-primary-foreground/5">
          <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary-foreground truncate">{session?.user?.email ?? "Admin"}</p>
            <p className="text-[10px] text-primary-foreground/40">Administrator</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-primary-foreground/40 hover:text-destructive transition-colors"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "loading") return
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      const loginUrl = pathname.startsWith("/admin")
        ? `/admin/login?callbackUrl=${encodeURIComponent(pathname)}`
        : "/admin/login"
      router.replace(loginUrl)
    }
  }, [status, router, pathname])

  if (pathname === "/admin/login") return <>{children}</>

  // Full-screen visual editor — wait for session before rendering
  if (pathname.startsWith("/admin/editor")) {
    if (status === "loading") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )
    }
    if (status === "unauthenticated") return null
    return <>{children}</>
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") return null

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground border-b border-primary-foreground/10">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <span className="font-bold text-sm">WDA Admin</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/70 hover:text-primary-foreground text-xs gap-1"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </Button>
        </div>
        {/* Mobile nav strip */}
        <div className="lg:hidden flex overflow-x-auto gap-1 px-3 py-2 bg-background border-b border-border">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </Link>
            )
          })}
        </div>
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  )
}
