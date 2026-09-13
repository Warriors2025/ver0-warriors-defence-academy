export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Meta for /blog comes from app/blog/page.tsx generateMetadata (lib/seo defaults).
  return <>{children}</>
}
