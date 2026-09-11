import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const PAYMENTS_COOKIE = "wda_fee_dashboard"
export const PAYMENTS_SESSION_MAX_AGE = 8 * 60 * 60

function sessionSecret() {
  return (
    process.env.FEE_DASHBOARD_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "wda-fee-dashboard-dev-secret"
  )
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("hex")
}

export type PaymentsSession = {
  email: string
  exp: number
}

export function getPaymentsCredentials() {
  const email = (
    process.env.FEE_DASHBOARD_EMAIL ||
    process.env.ADMIN_EMAIL ||
    ""
  )
    .trim()
    .toLowerCase()
  const password = process.env.FEE_DASHBOARD_PASSWORD || process.env.ADMIN_PASSWORD || ""
  return { email, password }
}

export function verifyPaymentsCredentials(email: string, password: string) {
  const expected = getPaymentsCredentials()
  if (!expected.email || !expected.password) return false
  const givenEmail = Buffer.from(email.trim().toLowerCase())
  const givenPassword = Buffer.from(password)
  const wantEmail = Buffer.from(expected.email)
  const wantPassword = Buffer.from(expected.password)
  if (givenEmail.length !== wantEmail.length || givenPassword.length !== wantPassword.length) {
    return false
  }
  return (
    timingSafeEqual(givenEmail, wantEmail) &&
    timingSafeEqual(givenPassword, wantPassword)
  )
}

export function createPaymentsSessionToken(email: string) {
  const payload = Buffer.from(
    JSON.stringify({
      email: email.trim().toLowerCase(),
      exp: Date.now() + PAYMENTS_SESSION_MAX_AGE * 1000,
    } satisfies PaymentsSession)
  ).toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function readPaymentsSessionToken(token: string | undefined | null): PaymentsSession | null {
  if (!token) return null
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return null
  const expected = sign(payload)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as PaymentsSession
    if (!data?.email || typeof data.exp !== "number" || Date.now() > data.exp) return null
    return data
  } catch {
    return null
  }
}

export async function getPaymentsSession() {
  const jar = await cookies()
  return readPaymentsSessionToken(jar.get(PAYMENTS_COOKIE)?.value)
}

export async function requirePaymentsAccess() {
  const feeSession = await getPaymentsSession()
  if (feeSession) return { email: feeSession.email, source: "payments" as const }
  const admin = await getServerSession(authOptions)
  if (admin?.user?.email) return { email: admin.user.email, source: "admin" as const }
  return null
}

export async function setPaymentsSessionCookie(email: string) {
  const jar = await cookies()
  jar.set(PAYMENTS_COOKIE, createPaymentsSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: PAYMENTS_SESSION_MAX_AGE,
  })
}

export async function clearPaymentsSessionCookie() {
  const jar = await cookies()
  jar.delete(PAYMENTS_COOKIE)
}
