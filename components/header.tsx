"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, Phone, Mail, ChevronDown, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const courses = [
  { title: "NDA Course", href: "/courses/nda", description: "Complete NDA written exam and SSB preparation" },
  { title: "NDA Foundation", href: "/courses/nda-foundation", description: "Early preparation for Class 10-12 students" },
  { title: "CDS Course", href: "/courses/cds", description: "Combined Defence Services exam preparation" },
  { title: "SSB Interview", href: "/courses/ssb", description: "Comprehensive SSB interview training" },
  { title: "AFCAT Course", href: "/courses/afcat", description: "Air Force Common Admission Test prep" },
  { title: "Indian Navy Agniveer", href: "/courses/navy-agniveer", description: "Navy SSR/AA exam coaching" },
  { title: "Airforce X/Y", href: "/courses/airforce-xy", description: "Air Force Group X & Y preparation" },
  { title: "MNS Course", href: "/courses/mns", description: "Military Nursing Service preparation" },
]

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Gallery", href: "/gallery" },
  { title: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@warriorsdefence.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@warriorsdefence.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-foreground/80">Admissions Open for 2026-27</span>
            <Link href="/register">
              <Button size="sm" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
            : "bg-background"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Shield className="h-10 w-10 lg:h-12 lg:w-12 text-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">W</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold text-primary leading-tight">Warriors Defence</span>
                <span className="text-xs text-muted-foreground leading-tight">Academy</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary focus:bg-accent/10 focus:text-primary focus:outline-none">
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10">
                      Courses
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                        {courses.map((course) => (
                          <li key={course.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={course.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-primary focus:bg-accent/10 focus:text-primary"
                              >
                                <div className="text-sm font-medium leading-none">{course.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {course.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary focus:bg-accent/10 focus:text-primary focus:outline-none">
                        About Us
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/gallery" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary focus:bg-accent/10 focus:text-primary focus:outline-none">
                        Gallery
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary focus:bg-accent/10 focus:text-primary focus:outline-none">
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link href="/register" className="hidden sm:block">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Enroll Now
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-primary">Courses</p>
                      <div className="pl-4 space-y-2">
                        {courses.map((course) => (
                          <Link
                            key={course.title}
                            href={course.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-muted-foreground hover:text-primary transition-colors"
                          >
                            {course.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {navLinks.slice(1).map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {link.title}
                      </Link>
                    ))}
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                        Enroll Now
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
