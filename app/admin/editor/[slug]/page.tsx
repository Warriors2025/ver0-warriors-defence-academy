import { VisualPageEditor } from "@/components/admin/visual-page-editor"
import { PagePreviewEditor } from "@/components/admin/page-preview-editor"
import { getCmsPage } from "@/lib/cms-pages"
import { notFound } from "next/navigation"

const PREVIEW_SLUGS = new Set(["about", "contact", "courses", "admissions", "results", "register"])

type Props = { params: Promise<{ slug: string }> }

export default async function AdminEditorPage({ params }: Props) {
  const { slug } = await params
  const page = getCmsPage(slug)
  if (!page?.editable) notFound()

  if (slug === "home") {
    return <VisualPageEditor slug="home" />
  }

  if (PREVIEW_SLUGS.has(slug)) {
    return <PagePreviewEditor slug={slug as "about" | "contact" | "courses" | "admissions" | "results" | "register"} />
  }

  notFound()
}
