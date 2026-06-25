import { SeoPageEditor } from "@/components/admin/seo-page-editor"

type Props = { params: Promise<{ slug: string }> }

export default async function AdminSeoSlugPage({ params }: Props) {
  const { slug } = await params
  return <SeoPageEditor slug={slug} />
}
