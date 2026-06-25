import { NextResponse } from "next/server"
import { createPublicServerClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      )
    }

    const ticketId = `TICKET-${Date.now().toString(36).toUpperCase()}`

    const db = createPublicServerClient()
    const { error } = await db.from("contact_submissions").insert({
      name:      data.name,
      email:     data.email,
      phone:     data.phone     || null,
      course:    data.course    || null,
      message:   data.message,
      ticket_id: ticketId,
      status:    "new",
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { success: false, message: "Failed to save your message. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! We will get back to you within 24 hours.",
      ticketId,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while sending your message" },
      { status: 500 }
    )
  }
}
