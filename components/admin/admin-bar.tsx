"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  LayoutDashboard, Pencil, ExternalLink, LogOut, ChevronDown, Eye,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { useState, Suspense } from "react"
import { CMS_PAGES } from "@/lib/cms-pages"

function AdminBarInner() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!session || pathname.startsWith("/admin") || searchParams.get("cmsEditor") === "1") return null

  const currentPage = CMS_PAGES.find((p) => p.path === pathname)

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-[#1d2327] text-white text-sm shadow-lg border-b border-white/10">
      <div className="flex items-center h-9 px-3 gap-1">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/10 transition-colors font-medium"
        >
          <LayoutDashboard className="h-3.5 w-3.5 text-[#72aee6]" />
          Dashboard
        </Link>

        <span className="text-white/20 mx-1">|</span>

        {currentPage?.editable && currentPage.adminPath && (
          <>
            <Link
              href={currentPage.adminPath}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/10 transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Page
            </Link>
            {currentPage.visualEditor && (
              <Link
                href={currentPage.adminPath}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2271b1] hover:bg-[#135e96] transition-colors font-medium"
              >
                <Eye className="h-3.5 w-3.5" />
                Visual Editor
              </Link>
            )}
          </>
        )}

        <div className="relative ml-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-white/10 transition-colors"
          >
            Pages <ChevronDown className="h-3 w-3" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#2c3338] border border-white/10 rounded-md shadow-xl z-20 py-1">
                {CMS_PAGES.map((page) => (
                  <Link
                    key={page.slug}
                    href={page.adminPath ?? "/admin/pages"}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 hover:bg-white/10 transition-colors"
                  >
                    <span>{page.title}</span>
                    {page.editable && <Pencil className="h-3 w-3 text-white/40" />}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex-1" />

        <Link
          href={pathname}
          target="_blank"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/10 transition-colors text-white/70"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Page
        </Link>

        <Link
          href="/admin/media"
          className="px-2.5 py-1 rounded hover:bg-white/10 transition-colors text-white/70"
        >
          Media
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-red-500/20 text-white/70 hover:text-red-300 transition-colors ml-1"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

export function AdminBar() {
  return (
    <Suspense fallback={null}>
      <AdminBarInner />
    </Suspense>
  )
}
