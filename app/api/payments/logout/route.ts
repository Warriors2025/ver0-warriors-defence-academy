import { NextResponse } from "next/server"
import { clearPaymentsSessionCookie } from "@/lib/payments-auth"

export async function POST() {
  await clearPaymentsSessionCookie()
  return NextResponse.json({ success: true })
}
