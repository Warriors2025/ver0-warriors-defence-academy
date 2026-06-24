import Link from "next/link"
import { BookOpen, ArrowRight, Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const courses = [
  { slug: "nda-foundation", title: "NDA Foundation Course", duration: "2–3 Years", students: "500+", rating: 4.9, badge: "Popular" },
  { slug: "nda",            title: "NDA Course",            duration: "6–12 Months", students: "2,000+", rating: 4.8, badge: "Best Seller" },
  { slug: "cds",            title: "CDS Course",            duration: "6 Months",  students: "1,500+", rating: 4.8, badge: null },
  { slug: "ssb",            title: "SSB Interview Training",duration: "21 Days",   students: "3,000+", rating: 4.9, badge: "Top Rated" },
  { slug: "afcat",          title: "AFCAT Course",          duration: "4–6 Months",students: "800+",   rating: 4.7, badge: null },
  { slug: "navy-agniveer",  title: "Navy Agniveer",         duration: "3–4 Months",students: "600+",   rating: 4.7, badge: "New" },
  { slug: "airforce-xy",    title: "Airforce X / Y Group",  duration: "4–6 Months",students: "700+",   rating: 4.6, badge: null },
  { slug: "mns",            title: "MNS Course",            duration: "3–6 Months",students: "400+",   rating: 4.8, badge: "For Women" },
  { slug: "territorial-army",title: "Territorial Army",    duration: "3 Months",  students: "400+",   rating: 4.8, badge: null },
]

export default function AdminCoursesPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Courses</h1>
            <p className="text-muted-foreground text-sm">{courses.length} courses — click a course to view its public page.</p>
          </div>
        </div>
        <Link href="/courses" target="_blank">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowRight className="h-3.5 w-3.5" />
            View on site
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
        {courses.map((c) => (
          <div key={c.slug} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground text-sm truncate">{c.title}</p>
                {c.badge && (
                  <span className="text-[10px] font-semibold bg-accent/15 text-accent rounded-full px-2 py-0.5 shrink-0">
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.duration}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.students}</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{c.rating}</span>
              </div>
            </div>
            <Link href={`/courses/${c.slug}`} target="_blank">
              <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground">
                View <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-muted/50 border border-border rounded-xl p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">Want to edit course content?</p>
        <p>
          Course details (titles, syllabus, eligibility, etc.) are stored in the code at{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">app/courses/[slug]/page.tsx</code>.
          Ask your developer to update specific course info there.
        </p>
      </div>
    </div>
  )
}
