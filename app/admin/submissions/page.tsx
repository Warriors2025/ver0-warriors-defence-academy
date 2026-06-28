import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { MessageSquare, Mail, Phone, BookOpen, Clock, CheckCircle } from "lucide-react"

export const dynamic = "force-dynamic"

const STATUS_COLORS: Record<string, string> = {
  new:     "bg-blue-100 text-blue-700 border-blue-200",
  read:    "bg-gray-100 text-gray-600 border-gray-200",
  replied: "bg-green-100 text-green-700 border-green-200",
  closed:  "bg-purple-100 text-purple-700 border-purple-200",
}

async function updateStatus(id: string, status: string) {
  "use server"
  const db = createServerClient()
  await db.from("contact_submissions").update({ status }).eq("id", id)
  revalidatePath("/admin/submissions")
}

export default async function SubmissionsPage() {
  const db = createServerClient()
  const { data: submissions, error } = await db
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) {
    return (
      <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
        Failed to load submissions: {error.message}
      </div>
    )
  }

  const newCount = submissions?.filter((s) => s.status === "new").length ?? 0

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Contact Submissions</h1>
            <p className="text-muted-foreground text-sm">Messages sent via the contact form.</p>
          </div>
        </div>
        {newCount > 0 && (
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {newCount} new
          </span>
        )}
      </div>

      {!submissions || submissions.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">No submissions yet</p>
          <p className="text-sm text-muted-foreground mt-1">Contact form messages will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div key={s.id} className={`bg-card border rounded-xl p-5 ${s.status === "new" ? "border-blue-200" : "border-border"}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[s.status]}`}>
                      {s.status}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{s.ticket_id}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{s.email}</span>
                    {s.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{s.phone}</span>}
                    {s.course && <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{s.course}</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(s.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>
                </div>

                {/* Status actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {s.status === "new" && (
                    <form action={updateStatus.bind(null, s.id, "read")}>
                      <button type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-secondary transition-colors">
                        Mark Read
                      </button>
                    </form>
                  )}
                  {s.status !== "replied" && s.status !== "closed" && (
                    <form action={updateStatus.bind(null, s.id, "replied")}>
                      <button type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Replied
                      </button>
                    </form>
                  )}
                  {s.status !== "closed" && (
                    <form action={updateStatus.bind(null, s.id, "closed")}>
                      <button type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors">
                        Close
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-foreground whitespace-pre-wrap">{s.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
