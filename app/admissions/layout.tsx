import type { Metadata } from "next"
import { getPageSeo, buildPageMetadata } from "@/lib/seo.server"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("admissions")
  return buildPageMetadata("admissions", seo)
}

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
