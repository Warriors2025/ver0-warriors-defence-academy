import { SeoEntityEditor } from "@/components/admin/seo-entity-editor"

type Props = { params: Promise<{ type: string; slug: string }> }

export default async function AdminSeoEntityPage({ params }: Props) {
  const { type, slug } = await params
  if (type !== "blog" && type !== "course") {
    return <p className="text-muted-foreground p-8">Invalid SEO entity type.</p>
  }
  return <SeoEntityEditor type={type} slug={slug} />
}
