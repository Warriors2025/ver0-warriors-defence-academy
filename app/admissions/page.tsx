import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  FileText, 
  CreditCard, 
  UserCheck, 
  Calendar,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Download,
  Clock,
  Users,
  Award
} from "lucide-react"

const admissionSteps = [
  {
    step: 1,
    title: "Submit Application",
    description: "Fill out the online registration form with your personal and educational details.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Document Verification",
    description: "Upload required documents including educational certificates and ID proof.",
    icon: UserCheck,
  },
  {
    step: 3,
    title: "Counselling Session",
    description: "Attend a free counselling session with our experts to choose the right course.",
    icon: Users,
  },
  {
    step: 4,
    title: "Fee Payment",
    description: "Complete the admission process by paying the course fee through available modes.",
    icon: CreditCard,
  },
]

const documents = [
  "10th Mark Sheet & Certificate",
  "12th Mark Sheet & Certificate",
  "Graduation Degree (if applicable)",
  "Aadhar Card",
  "Passport Size Photographs (6)",
  "Medical Fitness Certificate",
  "Character Certificate",
  "Domicile Certificate",
]

const upcomingBatches = [
  { course: "NDA Foundation", date: "April 15, 2025", seats: "10 seats left" },
  { course: "CDS Coaching", date: "May 1, 2025", seats: "15 seats left" },
  { course: "SSB Intensive", date: "April 20, 2025", seats: "5 seats left" },
  { course: "AFCAT Program", date: "May 10, 2025", seats: "12 seats left" },
]

const scholarships = [
  {
    title: "Merit Scholarship",
    discount: "Up to 50%",
    criteria: "For students scoring above 90% in qualifying exam",
  },
  {
    title: "Defence Ward Scholarship",
    discount: "25%",
    criteria: "For children of defence personnel",
  },
  {
    title: "Early Bird Discount",
    discount: "15%",
    criteria: "For enrollments 2 months before batch start",
  },
  {
    title: "Group Enrollment",
    discount: "10%",
    criteria: "For groups of 3 or more students",
  },
]

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 border border-accent/30 rounded-full" />
            <div className="absolute bottom-20 left-20 w-48 h-48 border border-accent/20 rounded-full" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <Badge className="mb-4 bg-accent text-accent-foreground">Admissions Open 2025</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Begin Your Defence Journey
              </h1>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                Join Warriors Defence Academy and take the first step towards your dream 
                of serving the nation. Limited seats available for upcoming batches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">
                    Apply Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Download className="mr-2 h-5 w-5" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Batches */}
        <section className="py-12 bg-accent/10 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Upcoming Batches</h2>
              <Link href="/courses" className="text-primary font-medium hover:underline flex items-center">
                View All Courses <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingBatches.map((batch, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{batch.course}</h3>
                      <Badge variant="secondary" className="text-xs">{batch.seats}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Starts: {batch.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Simple Process</Badge>
              <h2 className="text-3xl font-bold mb-4">Admission Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our admission process is simple and student-friendly. 
                Follow these steps to secure your seat.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {admissionSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8 pb-6 text-center">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < admissionSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents & Scholarships */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Required Documents */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Required Documents
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {documents.map((doc, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm text-muted-foreground">
                      * Original documents required at the time of admission for verification
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Scholarships */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-accent" />
                  Scholarships Available
                </h2>
                <div className="space-y-4">
                  {scholarships.map((scholarship, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{scholarship.title}</h3>
                          <p className="text-sm text-muted-foreground">{scholarship.criteria}</p>
                        </div>
                        <Badge className="bg-accent text-accent-foreground text-lg px-3 py-1">
                          {scholarship.discount}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Fee Structure</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transparent and competitive pricing with flexible payment options
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">NDA Foundation</CardTitle>
                  <div className="text-3xl font-bold text-primary">₹85,000</div>
                  <p className="text-sm text-muted-foreground">12 Months Duration</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Complete Study Material</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> SSB Coaching Included</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Physical Training</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Mock Tests</li>
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link href="/register?course=nda">Enroll Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">CDS Coaching</CardTitle>
                  <div className="text-3xl font-bold text-primary">₹55,000</div>
                  <p className="text-sm text-muted-foreground">6 Months Duration</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Complete Study Material</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> SSB Coaching Included</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Current Affairs Updates</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> One-on-One Mentoring</li>
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link href="/register?course=cds">Enroll Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">SSB Intensive</CardTitle>
                  <div className="text-3xl font-bold text-primary">₹35,000</div>
                  <p className="text-sm text-muted-foreground">3 Weeks Duration</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Mock SSB Sessions</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> GTO Practice</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Interview Training</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Personality Development</li>
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link href="/register?course=ssb">Enroll Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-muted-foreground mt-8">
              * EMI options available. Contact our admissions team for more details.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
                <p className="text-lg opacity-90 mb-6">
                  Our admission counsellors are here to help you choose the right course 
                  and guide you through the admission process.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Call Us</p>
                      <p className="font-semibold">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Email Us</p>
                      <p className="font-semibold">admissions@warriorsdefence.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Office Hours</p>
                      <p className="font-semibold">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary-foreground/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-4">Quick Enquiry</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select Course</option>
                    <option value="nda">NDA Foundation</option>
                    <option value="cds">CDS Coaching</option>
                    <option value="afcat">AFCAT Program</option>
                    <option value="ssb">SSB Interview</option>
                  </select>
                  <Button variant="secondary" className="w-full" size="lg">
                    Request Callback
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
