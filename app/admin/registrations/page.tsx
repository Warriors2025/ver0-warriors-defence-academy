import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { Users, Mail, Phone, BookOpen, Clock, CheckCircle, UserCheck } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-700 border-yellow-200",
  contacted: "bg-blue-100 text-blue-700 border-blue-200",
  enrolled:  "bg-green-100 text-green-700 border-green-200",
  rejected:  "bg-red-100 text-red-700 border-red-200",
}

const COURSE_LABELS: Record<string, string> = {
  nda:             "NDA Course",
  "nda-foundation": "NDA Foundation",
  cds:             "CDS Course",
  ssb:             "SSB Interview",
  afcat:           "AFCAT Course",
  "navy-agniveer": "Navy Agniveer",
  "airforce-xy":   "Airforce X/Y",
  mns:             "MNS Course",
}

async function updateStatus(id: string, status: string) {
  "use server"
  const db = createServerClient()
  await db.from("registrations").update({ status }).eq("id", id)
  revalidatePath("/admin/registrations")
}

export default async function RegistrationsPage() {
  const db = createServerClient()
  const { data: registrations, error } = await db
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) {
    return (
      <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
        Failed to load registrations: {error.message}
      </div>
    )
  }

  const pendingCount = registrations?.filter((r) => r.status === "pending").length ?? 0
  const enrolledCount = registrations?.filter((r) => r.status === "enrolled").length ?? 0

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Student Registrations</h1>
            <p className="text-muted-foreground text-sm">Course registration requests from the website.</p>
          </div>
        </div>
        <div className="flex gap-3 text-sm">
          {pendingCount > 0 && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {pendingCount} pending
            </span>
          )}
          {enrolledCount > 0 && (
            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {enrolledCount} enrolled
            </span>
          )}
        </div>
      </div>

      {!registrations || registrations.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">No registrations yet</p>
          <p className="text-sm text-muted-foreground mt-1">Student registrations will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {registrations.map((r) => (
            <div key={r.id} className={`bg-card border rounded-xl p-5 ${r.status === "pending" ? "border-yellow-200" : "border-border"}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-foreground">{r.first_name} {r.last_name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[r.status]}`}>
                      {r.status}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{r.registration_id}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{r.email}</span>
                    <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{r.phone}</span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />{COURSE_LABELS[r.course] ?? r.course}
                    </span>
                    {r.batch_type && <span className="text-xs">{r.batch_type}</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(r.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-1">
                    {r.gender && <span>Gender: {r.gender}</span>}
                    {r.date_of_birth && <span>DOB: {r.date_of_birth}</span>}
                    {r.city && r.state && <span>City: {r.city}, {r.state}</span>}
                    {r.highest_qualification && <span>Education: {r.highest_qualification} ({r.passing_year})</span>}
                    {r.hostel_required && <span className="text-accent font-medium">Hostel required</span>}
                  </div>
                </div>

                {/* Status actions */}
                <div className="flex gap-2 flex-shrink-0 flex-wrap">
                  {r.status === "pending" && (
                    <form action={updateStatus.bind(null, r.id, "contacted")}>
                      <button type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Contacted
                      </button>
                    </form>
                  )}
                  {(r.status === "pending" || r.status === "contacted") && (
                    <form action={updateStatus.bind(null, r.id, "enrolled")}>
                      <button type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-1">
                        <UserCheck className="h-3 w-3" /> Enrolled
                      </button>
                    </form>
                  )}
                  {r.status !== "rejected" && r.status !== "enrolled" && (
                    <form action={updateStatus.bind(null, r.id, "rejected")}>
                      <button type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors">
                        Reject
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
