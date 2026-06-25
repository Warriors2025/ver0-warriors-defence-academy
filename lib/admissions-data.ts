import { supabase } from "@/lib/supabase"

export type AdmissionBatch = {
  course: string
  date: string
  seats: string
}

const STATIC: AdmissionBatch[] = [
  { course: "NDA Foundation", date: "April 15, 2025", seats: "10 seats left" },
  { course: "CDS Coaching", date: "May 1, 2025", seats: "15 seats left" },
  { course: "SSB Intensive", date: "April 20, 2025", seats: "5 seats left" },
  { course: "AFCAT Program", date: "May 10, 2025", seats: "12 seats left" },
]

export async function getAdmissionBatches(): Promise<AdmissionBatch[]> {
  try {
    const { data, error } = await supabase
      .from("admission_batches")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")

    if (error || !data?.length) return STATIC
    return data.map((row) => ({
      course: row.course_name,
      date: row.start_date,
      seats: row.seats_left || "",
    }))
  } catch {
    return STATIC
  }
}
