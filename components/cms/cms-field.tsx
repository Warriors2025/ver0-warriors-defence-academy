import type { ReactNode } from "react"

type CmsFieldProps = {
  id: string
  label: string
  section: string
  children: ReactNode
  block?: boolean
  className?: string
}

/** Marks editable CMS content for click-to-edit in the visual editor preview. */
export function CmsField({ id, label, section, children, block, className }: CmsFieldProps) {
  const props = {
    "data-cms-field": id,
    "data-cms-label": label,
    "data-cms-section": section,
    className: className ? `cms-editable-field ${className}` : "cms-editable-field",
  }

  if (block) return <div {...props}>{children}</div>
  return <span {...props}>{children}</span>
}
