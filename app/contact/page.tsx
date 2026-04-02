"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Address",
    details: ["123 Defence Colony", "Lucknow, Uttar Pradesh", "India - 226001"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+91 98765 43210", "+91 98765 43211", "+91 522 1234567"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["info@warriorsdefence.com", "admissions@warriorsdefence.com", "support@warriorsdefence.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Saturday", "9:00 AM - 6:00 PM", "Sunday: Closed"],
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", course: "", message: "" })
    }, 3000)
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-0 mb-4">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Have questions about our courses or want to visit our campus? 
              We&apos;re here to help you take the first step towards your defence career.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, dIndex) => (
                      <p key={dIndex} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground">
                      Your message has been sent successfully. Our team will contact you soon.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name *</label>
                      <Input
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address *</label>
                      <Input
                        required
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number *</label>
                      <Input
                        required
                        type="tel"
                        placeholder="Enter your phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Interested Course</label>
                      <Select
                        value={formData.course}
                        onValueChange={(value) => setFormData({ ...formData, course: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nda">NDA Course</SelectItem>
                          <SelectItem value="nda-foundation">NDA Foundation</SelectItem>
                          <SelectItem value="cds">CDS Course</SelectItem>
                          <SelectItem value="ssb">SSB Interview</SelectItem>
                          <SelectItem value="afcat">AFCAT Course</SelectItem>
                          <SelectItem value="mns">MNS Course</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Your Message *</label>
                    <Textarea
                      required
                      placeholder="Write your message here..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                  >
                    Send Message
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Interactive Map
                    </p>
                    <p className="text-sm text-muted-foreground/60">
                      123 Defence Colony, Lucknow
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quick Contact */}
              <Card className="bg-primary text-primary-foreground border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <p className="text-primary-foreground/80">
                      Need immediate assistance? Call us directly or reach out on WhatsApp.
                    </p>
                    <div className="flex flex-col gap-3">
                      <a
                        href="tel:+919876543210"
                        className="flex items-center gap-3 text-accent hover:underline"
                      >
                        <Phone className="h-5 w-5" />
                        <span>+91 98765 43210</span>
                      </a>
                      <a
                        href="mailto:info@warriorsdefence.com"
                        className="flex items-center gap-3 text-accent hover:underline"
                      >
                        <Mail className="h-5 w-5" />
                        <span>info@warriorsdefence.com</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Follow Us</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Stay updated with our latest news, success stories, and tips.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Have More Questions?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Check out our frequently asked questions or schedule a campus visit for detailed guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View FAQs
            </Button>
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
