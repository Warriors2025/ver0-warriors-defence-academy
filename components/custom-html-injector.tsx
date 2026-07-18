"use client"

import { useEffect } from "react"

/**
 * Injects admin-authored HTML snippets into document head or body.
 * Scripts inserted via React dangerouslySetInnerHTML often do not execute;
 * this clones nodes (re-creating script tags) so tracking pixels run.
 */
export function CustomHtmlInjector({
  html,
  target,
}: {
  html: string
  target: "head" | "body"
}) {
  useEffect(() => {
    const trimmed = html.trim()
    if (!trimmed) return

    const host = target === "head" ? document.head : document.body
    const wrapper = document.createElement("div")
    wrapper.setAttribute("data-wda-tracking", target)
    wrapper.innerHTML = trimmed

    const nodes = Array.from(wrapper.childNodes)
    const appended: Node[] = []

    for (const node of nodes) {
      if (node.nodeName.toLowerCase() === "script") {
        const srcScript = node as HTMLScriptElement
        const script = document.createElement("script")
        for (const attr of Array.from(srcScript.attributes)) {
          script.setAttribute(attr.name, attr.value)
        }
        if (srcScript.textContent) script.text = srcScript.textContent
        host.appendChild(script)
        appended.push(script)
      } else {
        const clone = node.cloneNode(true)
        host.appendChild(clone)
        appended.push(clone)
      }
    }

    return () => {
      for (const node of appended) {
        if (node.parentNode) node.parentNode.removeChild(node)
      }
    }
  }, [html, target])

  return null
}
