import { NextResponse } from "next/server"
import { createPublicServerClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const required = ["firstName", "lastName", "email", "phone", "course", "dob"]
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      )
    }

    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(data.phone.replace(/\D/g, ""))) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      )
    }

    const registrationId = `WDA${Date.now().toString(36).toUpperCase()}`

    const db = createPublicServerClient()
    const { error } = await db.from("registrations").insert({
      registration_id:       registrationId,
      first_name:            data.firstName,
      last_name:             data.lastName,
      email:                 data.email,
      phone:                 data.phone,
      course:                data.course,
      date_of_birth:         data.dob,
      gender:                data.gender                || null,
      address:               data.address               || null,
      city:                  data.city                  || null,
      state:                 data.state                 || null,
      pincode:               data.pincode               || null,
      batch_type:            data.batchType             || null,
      preferred_batch:       data.preferredBatch        || null,
      hostel_required:       data.hostelRequired        ?? false,
      highest_qualification: data.highestQualification  || null,
      board:                 data.board                 || null,
      passing_year:          data.passingYear           || null,
      percentage:            data.percentage            || null,
      school_name:           data.schoolName            || null,
      status:                "pending",
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { success: false, message: "Failed to save registration. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful! We will contact you shortly.",
      registrationId,
      data: {
        name:   `${data.firstName} ${data.lastName}`,
        email:  data.email,
        course: data.course,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred during registration" },
      { status: 500 }
    )
  }
}
