import { createServerClient } from "@/lib/supabase"

export const FEE_SCREENSHOTS_BUCKET = "fee-screenshots"

export const FEE_COURSES = [
  "SSB Interview Training",
  "NDA Foundation Course",
  "NDA Coaching",
  "CDS Coaching",
  "AFCAT Coaching",
  "Air Force X/Y Group Coaching",
  "Indian Navy Agniveer Coaching",
  "MNS Coaching",
  "Other",
] as const

export const FEE_PAYMENT_STATUSES = ["pending", "verified", "rejected"] as const
export type FeePaymentStatus = (typeof FEE_PAYMENT_STATUSES)[number]

export type FeePaymentRow = {
  id: string
  submission_id: string
  student_name: string
  reg_no: string | null
  father_name: string
  course: string
  course_validity: string | null
  amount: number
  payment_date: string
  contact_number: string
  screenshot_path: string
  status: FeePaymentStatus
  notes: string | null
  created_at: string | null
  updated_at: string | null
  screenshot_url?: string | null
}

export function makeFeeSubmissionId() {
  return `FEE${Date.now().toString(36).toUpperCase()}`
}

export async function getFeeScreenshotSignedUrl(objectPath: string, expiresIn = 3600) {
  const db = createServerClient()
  const { data, error } = await db.storage
    .from(FEE_SCREENSHOTS_BUCKET)
    .createSignedUrl(objectPath, expiresIn)
  if (error) return null
  return data.signedUrl
}

export async function listFeePayments(): Promise<FeePaymentRow[]> {
  const db = createServerClient()
  const { data, error } = await db
    .from("fee_payments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500)

  if (error) throw new Error(error.message)
  const rows = (data ?? []) as FeePaymentRow[]

  return Promise.all(
    rows.map(async (row) => ({
      ...row,
      screenshot_url: row.screenshot_path
        ? await getFeeScreenshotSignedUrl(row.screenshot_path)
        : null,
    }))
  )
}

export async function updateFeePaymentStatus(id: string, status: FeePaymentStatus, notes?: string) {
  const db = createServerClient()
  const patch: Record<string, unknown> = { status, updated_at: new Date().toISOString() }
  if (notes !== undefined) patch.notes = notes
  const { error } = await db.from("fee_payments").update(patch).eq("id", id)
  if (error) throw new Error(error.message)
}
