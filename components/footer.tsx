import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSiteContent } from "@/lib/site-content.server"
import { FooterContactInfo } from "@/components/footer-contact-info"

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Courses", href: "/courses" },
  { title: "Results", href: "/results" },
  { title: "Blog", href: "/blog" },
  { title: "Gallery", href: "/gallery" },
  { title: "Contact", href: "/contact" },
  { title: "Register", href: "/register" },
]

const courses = [
  { title: "NDA Course", href: "/courses/nda" },
  { title: "NDA Foundation", href: "/courses/nda-foundation" },
  { title: "CDS Course", href: "/courses/cds" },
  { title: "SSB Interview", href: "/courses/ssb" },
  { title: "AFCAT Course", href: "/courses/afcat" },
  { title: "MNS Course", href: "/courses/mns" },
]

export async function Footer() {
  const { contact } = await getSiteContent()

  return (
    <footer className="bg-brand-deep text-brand-deep-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group" aria-label="Warriors Defence Academy home">
              <span className="text-xl font-bold text-accent leading-tight group-hover:underline underline-offset-4">
                Warriors Defence Academy
              </span>
            </Link>
            <p className="text-brand-deep-foreground/80 leading-relaxed">
              India&apos;s premier defence coaching institute preparing future officers for NDA, CDS, AFCAT, and SSB with excellence and dedication.
            </p>
            <div className="flex gap-4">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-brand-deep-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-brand-deep-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-brand-deep-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-brand-deep-foreground/80 hover:text-accent transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-6">Our Courses</h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.title}>
                  <Link href={course.href} className="text-brand-deep-foreground/80 hover:text-accent transition-colors">
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-6">Contact Us</h3>
            <FooterContactInfo contact={contact} />

            <div className="mt-6">
              <h4 className="text-sm font-medium text-accent mb-3">Subscribe to Updates</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-brand-deep-foreground/10 border-brand-deep-foreground/20 text-brand-deep-foreground placeholder:text-brand-deep-foreground/50"
                />
                <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-deep-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-deep-foreground/60">
            <p>&copy; {new Date().getFullYear()} Warriors Defence Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
