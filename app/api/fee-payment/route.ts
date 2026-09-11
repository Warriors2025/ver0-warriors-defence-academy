import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { FEE_COURSES, FEE_SCREENSHOTS_BUCKET, makeFeeSubmissionId } from "@/lib/fee-payments"

export const runtime = "nodejs"

const PHONE_RE = /^[6-9]\d{9}$/
const MAX_FILE_BYTES = 8 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"])

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const studentName = asString(form.get("studentName"))
    const regNo = asString(form.get("regNo"))
    const fatherName = asString(form.get("fatherName"))
    const course = asString(form.get("course"))
    const courseValidity = asString(form.get("courseValidity"))
    const amountRaw = asString(form.get("amount"))
    const paymentDate = asString(form.get("paymentDate"))
    const contactNumber = asString(form.get("contactNumber")).replace(/\D/g, "")
    const screenshot = form.get("screenshot")

    if (!studentName) {
      return NextResponse.json({ success: false, message: "Student full name is required." }, { status: 400 })
    }
    if (!fatherName) {
      return NextResponse.json({ success: false, message: "Father's name is required." }, { status: 400 })
    }
    if (!course || !(FEE_COURSES as readonly string[]).includes(course)) {
      return NextResponse.json({ success: false, message: "Please select a valid course." }, { status: 400 })
    }
    const amount = Number.parseInt(amountRaw, 10)
    if (!Number.isFinite(amount) || amount < 1) {
      return NextResponse.json({ success: false, message: "Enter a valid fee amount." }, { status: 400 })
    }
    if (!paymentDate || Number.isNaN(Date.parse(paymentDate))) {
      return NextResponse.json({ success: false, message: "Payment date is required." }, { status: 400 })
    }
    if (!PHONE_RE.test(contactNumber)) {
      return NextResponse.json({ success: false, message: "Enter a valid 10-digit mobile number." }, { status: 400 })
    }
    if (!(screenshot instanceof File) || screenshot.size === 0) {
      return NextResponse.json({ success: false, message: "Please attach your payment screenshot." }, { status: 400 })
    }
    if (screenshot.size > MAX_FILE_BYTES) {
      return NextResponse.json({ success: false, message: "Screenshot must be under 8 MB." }, { status: 400 })
    }
    const contentType = screenshot.type || "image/jpeg"
    if (!ALLOWED_TYPES.has(contentType)) {
      return NextResponse.json({ success: false, message: "Screenshot must be a JPG or PNG image." }, { status: 400 })
    }

    const submissionId = makeFeeSubmissionId()
    const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg"
    const now = new Date()
    const objectPath = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${submissionId}.${ext}`

    const db = createServerClient()
    const bytes = new Uint8Array(await screenshot.arrayBuffer())
    const { error: uploadError } = await db.storage.from(FEE_SCREENSHOTS_BUCKET).upload(
      objectPath,
      new Blob([bytes], { type: contentType }),
      { contentType, upsert: false, cacheControl: "31536000" }
    )
    if (uploadError) {
      console.error("Fee screenshot upload error:", uploadError)
      return NextResponse.json(
        { success: false, message: "Could not save the screenshot. Please try again." },
        { status: 500 }
      )
    }

    const { error: insertError } = await db.from("fee_payments").insert({
      submission_id: submissionId,
      student_name: studentName,
      reg_no: regNo || null,
      father_name: fatherName,
      course,
      course_validity: courseValidity || null,
      amount,
      payment_date: paymentDate,
      contact_number: contactNumber,
      screenshot_path: objectPath,
      status: "pending",
    })

    if (insertError) {
      console.error("Fee payment insert error:", insertError)
      await db.storage.from(FEE_SCREENSHOTS_BUCKET).remove([objectPath])
      return NextResponse.json(
        { success: false, message: "Failed to save payment details. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Submitted! Your payment details have been recorded. Our team will verify and confirm shortly.",
    })
  } catch (error) {
    console.error("Fee payment error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while submitting. Please try again." },
      { status: 500 }
    )
  }
}
