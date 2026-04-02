import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      )
    }

    // In a real application, you would send an email or save to database here
    const ticketId = `TICKET-${Date.now().toString(36).toUpperCase()}`

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
