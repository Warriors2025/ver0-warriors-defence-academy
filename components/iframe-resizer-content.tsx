"use client"

import { useEffect } from "react"

/**
 * Loads iframe-resizer's contentWindow script so a parent WordPress page
 * using iframeResizer() can auto-fit this page's height to the real content
 * (no giant empty gap under the form).
 */
export function IframeResizerContent() {
  useEffect(() => {
    // Tell the parent the real document height as soon as (and whenever)
    // the form steps change — even before the external script loads.
    const notify = () => {
      const height = Math.ceil(
        Math.max(
          document.documentElement.scrollHeight,
          document.body?.scrollHeight ?? 0,
          (document.querySelector("[data-iframe-height]") as HTMLElement | null)
            ?.scrollHeight ?? 0
        )
      )
      window.parent?.postMessage({ type: "wda-iframe-height", height }, "*")
    }

    notify()
    const ro = new ResizeObserver(notify)
    ro.observe(document.documentElement)
    if (document.body) ro.observe(document.body)

    const src =
      "https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.9/js/iframeResizer.contentWindow.min.js"
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script")
      script.src = src
      script.async = true
      document.body.appendChild(script)
    }

    return () => ro.disconnect()
  }, [])

  return null
}
