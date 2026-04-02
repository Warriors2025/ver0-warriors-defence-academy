import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'course', 'dateOfBirth']
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

    // Phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      )
    }

    // In a real application, you would save to a database here
    // For now, we'll simulate a successful registration
    const registrationId = `WDA${Date.now().toString(36).toUpperCase()}`

    return NextResponse.json({
      success: true,
      message: "Registration successful! We will contact you shortly.",
      registrationId,
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        course: data.course,
      }
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred during registration" },
      { status: 500 }
    )
  }
}
