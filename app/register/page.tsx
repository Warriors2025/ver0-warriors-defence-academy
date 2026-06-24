import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { RegisterForm } from "@/components/register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register | Warriors Defence Academy",
  description: "Register for NDA, CDS, SSB, AFCAT and other defence courses at Warriors Defence Academy, Lucknow.",
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="bg-primary text-primary-foreground py-12 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-0 mb-4">
              Enroll Now
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Start Your Defence Journey
            </h1>
            <p className="text-primary-foreground/80">
              Fill in your details to register for your preferred course.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <RegisterForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
