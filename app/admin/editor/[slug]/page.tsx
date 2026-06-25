import { redirect, notFound } from "next/navigation"
import { VisualPageEditor } from "@/components/admin/visual-page-editor"
import { getCmsPage } from "@/lib/cms-pages"

export default async function EditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getCmsPage(slug)
  if (!page) notFound()

  // Only the homepage has a visual split-pane editor
  if (!page.visualEditor) {
    redirect(page.adminPath ?? "/admin/pages")
  }

  return <VisualPageEditor slug={slug} />
}
