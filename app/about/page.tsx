import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Shield,
  Target,
  Users,
  Trophy,
  Star,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  CheckCircle,
  User,
  ArrowRight,
} from "lucide-react"

export const metadata = {
  title: "About Us | Warriors Defence Academy",
  description: "Learn about Warriors Defence Academy - India's premier defence coaching institute with 15+ years of excellence in NDA, CDS, and SSB preparation.",
}

const milestones = [
  { year: "2010", title: "Foundation", description: "Warriors Defence Academy was established with a vision to create future defence officers." },
  { year: "2013", title: "First 100 Selections", description: "Achieved the milestone of 100 successful selections in various defence exams." },
  { year: "2016", title: "New Campus", description: "Moved to our current campus with India's largest GTO ground." },
  { year: "2019", title: "1000+ Selections", description: "Crossed 1000 successful selections, becoming a leading defence academy." },
  { year: "2022", title: "Women's Wing", description: "Launched special programs for women aspiring for defence careers." },
  { year: "2024", title: "5000+ Selections", description: "Achieved the landmark of 5000+ successful selections nationwide." },
]

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our training and guidance.",
  },
  {
    icon: Shield,
    title: "Discipline",
    description: "Military-style discipline forms the foundation of our training methodology.",
  },
  {
    icon: Heart,
    title: "Dedication",
    description: "Our faculty is dedicated to the success of every student who joins us.",
  },
  {
    icon: Users,
    title: "Teamwork",
    description: "We foster a collaborative environment where students learn together.",
  },
]

const leadership = [
  {
    name: "Mr. Gulab Singh",
    role: "Founder & Director",
    description: "A visionary leader with a passion for developing future defence officers. His guidance has shaped thousands of successful candidates.",
  },
  {
    name: "Lt. Gen. Dushyant Singh (Retd.)",
    role: "Chief Mentor",
    description: "With 35+ years of military service, he brings invaluable experience and strategic insights to our training programs.",
  },
  {
    name: "Dr. Anjali Mishra",
    role: "Academic Director",
    description: "Leading our academic programs with innovative teaching methods and comprehensive curriculum design.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-0 mb-4">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Shaping Future Defence Officers Since 2010
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Warriors Defence Academy is India&apos;s premier defence coaching institute, 
              dedicated to transforming aspiring candidates into confident defence officers.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Warriors Defence Academy is widely recognized as the best NDA coaching centre in 
                  India. Our campus offers a comprehensive environment where aspiring officers benefit 
                  from modern classrooms, the country&apos;s largest GTO ground, and expert instructors.
                </p>
                <p>
                  We balance rigorous academics with intensive physical training, plus personality 
                  development and communication skills, so students excel in both written exams 
                  and SSB interviews.
                </p>
                <p>
                  Students joining after Class 10 or 12 study and live on campus under a disciplined 
                  schedule that mirrors military life. Beyond the curriculum, we instil leadership, 
                  ethics, and a service mindset. At Warriors Defence Academy, we don&apos;t just prepare 
                  you for exams; we groom future leaders.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">50,000+</div>
                  <div className="text-sm text-muted-foreground">Students Trained</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground">Selections</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Expert Mentors</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                <Shield className="h-48 w-48 text-primary/30" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8" />
                  <div>
                    <div className="text-2xl font-bold">AIR #1</div>
                    <div className="text-sm opacity-80">Multiple Times</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-primary text-primary-foreground border-0">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  To provide world-class defence coaching that transforms aspiring candidates 
                  into confident, disciplined, and capable officers. We are committed to 
                  nurturing leadership qualities, physical fitness, and academic excellence 
                  in every student who joins us.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <Star className="h-12 w-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be recognized globally as the most trusted and successful defence 
                  coaching institute, producing officers who serve the nation with honor, 
                  integrity, and excellence. We envision every Indian household having 
                  at least one member serving in the armed forces.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg">
              These values guide everything we do at Warriors Defence Academy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center mb-4">
                  <User className="h-24 w-24 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Mr. Gulab Singh</h3>
                <p className="text-accent font-medium">Founder & Director</p>
              </div>
              
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Director&apos;s Message</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    &quot;In my experience, a successful life starts with the right mindset. If you 
                    begin each day with a positive attitude, you build confidence in yourself 
                    and you also motivate others.&quot;
                  </p>
                  <p>
                    &quot;At Warriors Defence Academy, we teach students to stay disciplined, focused, 
                    and mentally strong - because these are the qualities needed to become an 
                    officer. We train our students to study with a clear goal, improve step by 
                    step, and develop leadership, courage, and responsibility.&quot;
                  </p>
                  <p>
                    &quot;We are proud of the trust students and parents have in us, and we work 
                    every day to maintain high standards. Our mission is simple: to help you 
                    become a confident, capable, and responsible future officer who serves the 
                    nation with pride.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Milestones & Achievements
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {milestone.year.slice(2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-sm text-accent font-medium">{milestone.year}</div>
                    <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Meet Our Leadership Team
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((leader, index) => (
              <Card key={index} className="text-center bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{leader.name}</h3>
                  <p className="text-accent text-sm font-medium mb-3">{leader.role}</p>
                  <p className="text-muted-foreground text-sm">{leader.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Join Our Family?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Take the first step towards your dream of serving the nation. Join Warriors Defence Academy today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Enroll Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
