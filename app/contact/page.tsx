import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react"
import { getSiteContent } from "@/lib/site-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Warriors Defence Academy",
  description: "Get in touch with Warriors Defence Academy, Lucknow. Phone: +91 94522 45729. Visit us at Kapoorthala Chauraha, Lucknow.",
}

export default function ContactPage() {
  const { contact } = getSiteContent()

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      details: contact.address.split(",").map((s) => s.trim()),
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [contact.phone1, contact.phone2].filter(Boolean),
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [contact.email],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Saturday", "9:00 AM - 6:00 PM", "Sunday: Closed"],
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-0 mb-4">Get In Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Contact Us</h1>
            <p className="text-primary-foreground/80 text-lg">
              Have questions about our courses or want to visit our campus?
              We&apos;re here to help you take the first step towards your defence career.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <Card key={i} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((d, j) => (
                      <p key={j} className="text-muted-foreground text-sm">{d}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-video bg-primary/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">Near Kapoorthala Chauraha, Lucknow - 226024</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-primary text-primary-foreground border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
                  <p className="text-primary-foreground/80 mb-4">Need immediate assistance? Call us directly.</p>
                  <div className="flex flex-col gap-3">
                    <a href={`tel:${contact.phone1.replace(/\s/g, "")}`} className="flex items-center gap-3 text-accent hover:underline">
                      <Phone className="h-5 w-5" />{contact.phone1}
                    </a>
                    {contact.phone2 && (
                      <a href={`tel:${contact.phone2.replace(/\s/g, "")}`} className="flex items-center gap-3 text-accent hover:underline">
                        <Phone className="h-5 w-5" />{contact.phone2}
                      </a>
                    )}
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-accent hover:underline">
                      <Mail className="h-5 w-5" />{contact.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Follow Us</h3>
                  <p className="text-muted-foreground text-sm mb-4">Stay updated with our latest news and success stories.</p>
                  <div className="flex gap-4">
                    <a href={contact.facebook} target="_blank" rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href={contact.youtube} target="_blank" rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Youtube className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Have More Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Schedule a campus visit for detailed guidance from our counselors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">View FAQs</Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Schedule Campus Visit
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
