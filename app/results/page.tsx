"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Star, Award, Users, TrendingUp, ChevronRight } from "lucide-react"

const results = {
  "2025": [
    { name: "Rahul Sharma", exam: "NDA", rank: "AIR 12", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
    { name: "Priya Singh", exam: "CDS", rank: "AIR 28", branch: "Indian Air Force", image: "/placeholder.svg?height=120&width=120" },
    { name: "Amit Kumar", exam: "NDA", rank: "AIR 45", branch: "Indian Navy", image: "/placeholder.svg?height=120&width=120" },
    { name: "Sneha Patel", exam: "AFCAT", rank: "AIR 8", branch: "Indian Air Force", image: "/placeholder.svg?height=120&width=120" },
    { name: "Vikram Yadav", exam: "NDA", rank: "AIR 67", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
    { name: "Anjali Mishra", exam: "CDS", rank: "AIR 34", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
  ],
  "2024": [
    { name: "Arjun Reddy", exam: "NDA", rank: "AIR 5", branch: "Indian Air Force", image: "/placeholder.svg?height=120&width=120" },
    { name: "Kavita Sharma", exam: "CDS", rank: "AIR 19", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
    { name: "Sanjay Gupta", exam: "AFCAT", rank: "AIR 11", branch: "Indian Air Force", image: "/placeholder.svg?height=120&width=120" },
    { name: "Neha Verma", exam: "NDA", rank: "AIR 38", branch: "Indian Navy", image: "/placeholder.svg?height=120&width=120" },
    { name: "Rohan Joshi", exam: "NDA", rank: "AIR 52", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
    { name: "Pooja Kumari", exam: "CDS", rank: "AIR 27", branch: "Indian Air Force", image: "/placeholder.svg?height=120&width=120" },
    { name: "Deepak Singh", exam: "NDA", rank: "AIR 73", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
    { name: "Ritu Agarwal", exam: "AFCAT", rank: "AIR 15", branch: "Indian Air Force", image: "/placeholder.svg?height=120&width=120" },
  ],
  "2023": [
    { name: "Manish Tiwari", exam: "NDA", rank: "AIR 3", branch: "Indian Air Force", image: "/placeholder.svg?height=120&width=120" },
    { name: "Swati Pandey", exam: "CDS", rank: "AIR 14", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
    { name: "Karan Malhotra", exam: "NDA", rank: "AIR 22", branch: "Indian Navy", image: "/placeholder.svg?height=120&width=120" },
    { name: "Priyanka Rao", exam: "AFCAT", rank: "AIR 7", branch: "Indian Air Force", image: "/placeholder.svg?height=120&width=120" },
    { name: "Ashish Dubey", exam: "NDA", rank: "AIR 41", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
    { name: "Megha Sinha", exam: "CDS", rank: "AIR 31", branch: "Indian Army", image: "/placeholder.svg?height=120&width=120" },
  ],
}

const overallStats = [
  { label: "Total Selections", value: "2500+", icon: Users },
  { label: "Top 100 Ranks", value: "450+", icon: Trophy },
  { label: "SSB Success Rate", value: "68%", icon: TrendingUp },
  { label: "NDA Selections", value: "1200+", icon: Medal },
]

export default function ResultsPage() {
  const [activeYear, setActiveYear] = useState("2025")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-64 h-64 border border-accent/30 rounded-full" />
            <div className="absolute bottom-10 right-20 w-96 h-96 border border-accent/20 rounded-full" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <Badge className="mb-4 bg-accent text-accent-foreground">Our Pride</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Success Stories
              </h1>
              <p className="text-lg opacity-90 leading-relaxed">
                We take immense pride in our students who have achieved their dreams of 
                serving the nation. Here are some of our star performers who have made 
                it to the prestigious armed forces of India.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary/30 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {overallStats.map((stat, index) => (
                <Card key={index} className="text-center border-none shadow-md">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Results by Year */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Year-wise Results</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our consistent track record of producing top rankers speaks volumes about 
                the quality of training and dedication of our faculty.
              </p>
            </div>

            <Tabs defaultValue="2025" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="2025" onClick={() => setActiveYear("2025")}>2025</TabsTrigger>
                <TabsTrigger value="2024" onClick={() => setActiveYear("2024")}>2024</TabsTrigger>
                <TabsTrigger value="2023" onClick={() => setActiveYear("2023")}>2023</TabsTrigger>
              </TabsList>

              {Object.entries(results).map(([year, students]) => (
                <TabsContent key={year} value={year}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map((student, index) => (
                      <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              {index < 3 && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                  <Star className="w-3 h-3 text-accent-foreground fill-accent-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">{student.name}</h3>
                              <Badge variant="secondary" className="mb-2">{student.exam}</Badge>
                              <div className="text-2xl font-bold text-primary">{student.rank}</div>
                              <div className="text-sm text-muted-foreground">{student.branch}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Academy Achievements</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Recognition and accolades that reflect our commitment to excellence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Best Defence Academy</h3>
                  <p className="text-muted-foreground text-sm">
                    Recognized as the leading defence coaching institute for 5 consecutive years
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Excellence Award</h3>
                  <p className="text-muted-foreground text-sm">
                    Awarded for highest selection rate in NDA examinations
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Medal className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">National Recognition</h3>
                  <p className="text-muted-foreground text-sm">
                    Featured among top 10 defence academies in India
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join Warriors Defence Academy and become part of our legacy of excellence. 
              Your dream of serving the nation is just one step away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">
                  Enroll Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/courses">View Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
