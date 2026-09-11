"use client"

import { useEffect } from "react"

/**
 * Loads iframe-resizer's contentWindow script so a parent WordPress page
 * using iframeResizer() can auto-fit this page's height.
 */
export function IframeResizerContent() {
  useEffect(() => {
    const src =
      "https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.9/js/iframeResizer.contentWindow.min.js"
    if (document.querySelector(`script[src="${src}"]`)) return
    const script = document.createElement("script")
    script.src = src
    script.async = true
    document.body.appendChild(script)
  }, [])

  return null
}
