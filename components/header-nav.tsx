"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu, Phone, X, GraduationCap, ChevronDown, ChevronRight,
  BookOpen, Users, Sword, Plane, Anchor, Heart, Shield, Target, Award,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavCourseItem, NavLinkItem } from "@/lib/navigation"
import { DEFAULT_NAVIGATION } from "@/lib/navigation"

const ICON_MAP: Record<string, LucideIcon> = {
  Sword,
  BookOpen,
  GraduationCap,
  Users,
  Plane,
  Anchor,
  Heart,
  Shield,
  Target,
  Award,
}

function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? BookOpen
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center h-11 px-4 text-sm font-medium transition-colors duration-150",
        active ? "text-primary" : "text-foreground/75 hover:text-foreground"
      )}
    >
      {children}
      <span className={cn(
        "absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-accent transition-all duration-200",
        active ? "opacity-100" : "opacity-0"
      )} />
    </Link>
  )
}

type Props = {
  phone: string
  navLinks?: NavLinkItem[]
  courses?: NavCourseItem[]
}

export function HeaderNav({
  phone,
  navLinks = DEFAULT_NAVIGATION.navLinks,
  courses = DEFAULT_NAVIGATION.courses,
}: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-shadow duration-300",
        scrolled
          ? "bg-background shadow-md border-border/80"
          : "bg-background border-border/50"
      )}
    >
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/70 to-transparent transition-opacity duration-300 pointer-events-none",
        scrolled ? "opacity-100" : "opacity-0"
      )} />

      <div className="container mx-auto px-4">
        <div className="flex h-16 lg:h-[68px] items-center">
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1" aria-label="Main navigation">
            <NavLink href="/">Home</NavLink>

            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen((v) => !v)}
                aria-expanded={dropOpen}
                aria-haspopup="true"
                className={cn(
                  "inline-flex items-center gap-1.5 h-11 px-4 text-sm font-medium rounded-md transition-colors duration-150 select-none",
                  dropOpen ? "text-primary bg-accent/8" : "text-foreground/75 hover:text-foreground hover:bg-muted/60"
                )}
              >
                Courses
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", dropOpen && "rotate-180")} />
              </button>

              {dropOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] z-[200] w-[600px] rounded-xl border border-border bg-background shadow-2xl shadow-black/10 overflow-hidden"
                  role="menu"
                >
                  <div className="flex items-center justify-between px-5 py-3 bg-muted/50 border-b border-border">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Defence Programmes</p>
                      <p className="text-xs text-muted-foreground">Expert coaching for every defence exam</p>
                    </div>
                    <Link
                      href="/courses"
                      onClick={() => setDropOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                    >
                      View all <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <ul className="grid grid-cols-2 gap-px bg-border p-px">
                    {courses.map((c) => {
                      const Icon = resolveIcon(c.icon)
                      return (
                        <li key={c.title} className="bg-background">
                          <Link
                            href={c.href}
                            role="menuitem"
                            onClick={() => setDropOpen(false)}
                            className="group flex items-center gap-3 px-4 py-3 hover:bg-accent/8 transition-colors duration-150"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground leading-none">{c.title}</span>
                                {c.badge && (
                                  <span className="text-[10px] font-semibold bg-accent/15 text-accent rounded-full px-1.5 py-0.5">
                                    {c.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">{c.description}</p>
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">15+ years · 5,000+ selections · Lucknow</span>
                    <Link href="/register" onClick={() => setDropOpen(false)}>
                      <Button size="sm" className="h-7 text-xs px-3">Enroll Now</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <NavLink key={link.title} href={link.href}>{link.title}</NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              <span className="font-medium">{phone}</span>
            </a>
            <Link href="/register">
              <Button className="h-9 px-5 text-sm font-semibold">Enroll Now</Button>
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <Link href="/register">
              <Button size="sm" className="h-9 px-4 text-xs font-semibold">Enroll Now</Button>
            </Link>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 bg-primary text-primary-foreground border-b border-primary-foreground/10">
                  <div>
                    <p className="text-sm font-bold">Warriors Defence Academy</p>
                    <p className="text-xs text-primary-foreground/60 mt-0.5">Lucknow, Uttar Pradesh</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <nav className="flex-1 overflow-y-auto py-3 px-4 space-y-0.5">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center h-11 px-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                  >
                    Home
                  </Link>

                  <div>
                    <button
                      onClick={() => setCoursesOpen((v) => !v)}
                      aria-expanded={coursesOpen}
                      className="flex items-center justify-between w-full h-11 px-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      Courses
                      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", coursesOpen && "rotate-180")} />
                    </button>

                    {coursesOpen && (
                      <div className="mt-1 mb-1 ml-3 pl-3 border-l-2 border-accent/40 space-y-0.5">
                        {courses.map((c) => {
                          const Icon = resolveIcon(c.icon)
                          return (
                            <Link
                              key={c.title}
                              href={c.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 h-10 px-2 text-sm text-muted-foreground rounded-md hover:bg-muted hover:text-primary transition-colors"
                            >
                              <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
                              {c.title}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {navLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center h-11 px-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-border p-4 space-y-2 bg-muted/30">
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full h-11 font-semibold">Enroll Now</Button>
                  </Link>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-accent" />
                    {phone}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
