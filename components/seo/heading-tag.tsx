import type { HeadingLevel } from "@/lib/seo"
import { cn } from "@/lib/utils"

type Props = {
  level: HeadingLevel
  children: React.ReactNode
  className?: string
}

export function HeadingTag({ level, children, className }: Props) {
  if (level === "p") {
    return <p className={cn(className)}>{children}</p>
  }
  const Tag = level
  return <Tag className={cn(className)}>{children}</Tag>
}
