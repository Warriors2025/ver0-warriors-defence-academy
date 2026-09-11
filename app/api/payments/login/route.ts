import { NextResponse } from "next/server"
import { setPaymentsSessionCookie, verifyPaymentsCredentials } from "@/lib/payments-auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === "string" ? body.email : ""
    const password = typeof body.password === "string" ? body.password : ""

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required." }, { status: 400 })
    }

    if (!verifyPaymentsCredentials(email, password)) {
      return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 })
    }

    await setPaymentsSessionCookie(email)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: "Login failed." }, { status: 500 })
  }
}
