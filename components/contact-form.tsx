"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export function ContactForm({
  courseOptions = [],
}: {
  courseOptions?: { id: string; name: string; duration: string }[]
}) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", course: "", message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        setError(json.message || "Failed to send message. Please try again.")
        return
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", course: "", message: "" })
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
          <p className="text-muted-foreground">Your message has been sent successfully. Our team will contact you soon.</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name *</label>
          <Input required placeholder="Enter your name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Address *</label>
          <Input required type="email" placeholder="Enter your email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <Input type="tel" placeholder="Enter your phone" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-12" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Interested Course</label>
          <Select value={formData.course} onValueChange={(v) => setFormData({ ...formData, course: v })}>
            <SelectTrigger className="h-12"><SelectValue placeholder="Select a course" /></SelectTrigger>
            <SelectContent>
              {courseOptions.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Your Message *</label>
        <Textarea required placeholder="Write your message here..." rows={5} value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="h-12 w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Message"}
        {!isLoading && <Send className="h-4 w-4 ml-2" />}
      </Button>
    </form>
  )
}
