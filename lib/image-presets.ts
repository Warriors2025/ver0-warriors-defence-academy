/** Recommended max dimensions per use case (fit inside, no upscale). */
export const IMAGE_PRESETS = {
  general: { maxWidth: 1920, maxHeight: 1920, quality: 82, label: "General (max 1920px)" },
  hero: { maxWidth: 1920, maxHeight: 1080, quality: 82, label: "Hero / carousel (1920×1080)" },
  blog: { maxWidth: 1200, maxHeight: 675, quality: 82, label: "Blog featured (1200×675)" },
  og: { maxWidth: 1200, maxHeight: 630, quality: 82, label: "Social / OG (1200×630)" },
  course: { maxWidth: 800, maxHeight: 533, quality: 82, label: "Course card (800×533)" },
  gallery: { maxWidth: 1600, maxHeight: 1200, quality: 80, label: "Gallery (1600×1200)" },
  thumbnail: { maxWidth: 640, maxHeight: 360, quality: 78, label: "Thumbnail (640×360)" },
  mentor: { maxWidth: 600, maxHeight: 750, quality: 82, label: "Portrait (600×750)" },
  feature: { maxWidth: 800, maxHeight: 600, quality: 82, label: "Feature grid (800×600)" },
  book: { maxWidth: 400, maxHeight: 600, quality: 82, label: "Book cover (400×600)" },
  logo: { maxWidth: 512, maxHeight: 512, quality: 90, label: "Logo (512×512)" },
} as const

export type ImagePreset = keyof typeof IMAGE_PRESETS

export function parseImagePreset(value: unknown): ImagePreset {
  if (typeof value === "string" && value in IMAGE_PRESETS) {
    return value as ImagePreset
  }
  return "general"
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
