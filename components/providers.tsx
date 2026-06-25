"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { AdminBar } from "@/components/admin/admin-bar"

function AdminBarOffsetInner({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const showBar = session && !pathname.startsWith("/admin") && searchParams.get("cmsEditor") !== "1"
  return <div className={showBar ? "pt-9" : undefined}>{children}</div>
}

function AdminBarOffset({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <AdminBarOffsetInner>{children}</AdminBarOffsetInner>
    </Suspense>
  )
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminBar />
      <AdminBarOffset>{children}</AdminBarOffset>
    </SessionProvider>
  )
}
