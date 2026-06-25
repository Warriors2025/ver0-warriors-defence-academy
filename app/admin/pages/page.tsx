import Link from "next/link"
import { CMS_PAGES } from "@/lib/cms-pages"
import { ExternalLink, Pencil, Eye, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPagesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pages</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage all website pages from the dashboard — no code changes needed.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 bg-muted/50 border-b border-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span>Page</span>
          <span>Actions</span>
        </div>
        {CMS_PAGES.map((page) => (
          <div key={page.slug} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 px-5 py-4 border-b border-border last:border-0 items-center">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{page.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{page.path} — {page.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <a href={page.path} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <ExternalLink className="h-3.5 w-3.5" /> View
                </Button>
              </a>
              {page.editable && page.adminPath && (
                <Link href={page.slug === "home" ? "/admin/editor/home" : page.adminPath}>
                  <Button size="sm" className="gap-1.5 text-xs bg-[#2271b1] hover:bg-[#135e96]">
                    {page.slug === "home" ? <Eye className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
                    {page.slug === "home" ? "Visual Editor" : "Edit in Dashboard"}
                  </Button>
                </Link>
              )}
              <Link href={`/admin/seo/${page.slug}`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Search className="h-3.5 w-3.5" /> SEO
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
