"use client"

import { useEffect } from "react"

/** Enables click-to-select editing when homepage is loaded inside the visual editor iframe. */
export function CmsEditorBridge() {
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      [data-cms-field] {
        cursor: pointer !important;
        outline: 2px dashed transparent;
        outline-offset: 3px;
        transition: outline-color 0.15s, background 0.15s;
        border-radius: 4px;
      }
      [data-cms-field]:hover {
        outline-color: #2271b1;
        background: rgba(34, 113, 177, 0.1);
      }
      [data-cms-field].cms-field-selected {
        outline: 2px solid #2271b1 !important;
        background: rgba(34, 113, 177, 0.15) !important;
      }
    `
    document.head.appendChild(style)

    let selected: Element | null = null

    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest("[data-cms-field]")
      if (!el) return
      e.preventDefault()
      e.stopPropagation()

      if (selected) selected.classList.remove("cms-field-selected")
      selected = el
      el.classList.add("cms-field-selected")

      window.parent.postMessage(
        {
          type: "CMS_SELECT",
          field: el.getAttribute("data-cms-field"),
          label: el.getAttribute("data-cms-label"),
          section: el.getAttribute("data-cms-section"),
        },
        window.location.origin
      )
    }

    document.addEventListener("click", onClick, true)
    return () => {
      document.removeEventListener("click", onClick, true)
      style.remove()
    }
  }, [])

  return null
}
