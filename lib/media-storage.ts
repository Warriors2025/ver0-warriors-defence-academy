import { createServerClient } from "@/lib/supabase"
import type { ImagePreset } from "@/lib/image-presets"

export const MEDIA_BUCKET = "media"

function getSupabasePublicUrl(): string {
  const url =
    process.env.WDA_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    throw new Error("WDA_SUPABASE_URL is not configured.")
  }
  return url.replace(/\/$/, "")
}

/** Build a public object URL for a path inside the media bucket. */
export function getMediaPublicUrl(objectPath: string): string {
  const base = getSupabasePublicUrl()
  return `${base}/storage/v1/object/public/${MEDIA_BUCKET}/${objectPath}`
}

export async function listMediaUploads(): Promise<string[]> {
  const supabase = createServerClient()
  const urls: string[] = []

  async function walk(prefix: string) {
    const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(prefix, {
      limit: 1000,
      sortBy: { column: "created_at", order: "desc" },
    })
    if (error) throw new Error(error.message)
    if (!data?.length) return

    for (const entry of data) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name
      if (!entry.id || entry.name === ".emptyFolderPlaceholder") {
        if (!entry.id) await walk(path)
        continue
      }
      if (/\.(webp|jpe?g|png|gif|svg)$/i.test(entry.name)) {
        urls.push(getMediaPublicUrl(path))
      }
    }
  }

  await walk("")
  return urls
}

export async function uploadMediaFile(opts: {
  buffer: Buffer
  filename: string
  contentType: string
  preset: ImagePreset
}): Promise<{ url: string; path: string }> {
  const supabase = createServerClient()
  const objectPath = `${opts.preset}/${opts.filename}`

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(objectPath, opts.buffer, {
    contentType: opts.contentType,
    upsert: false,
    cacheControl: "31536000",
  })

  if (error) {
    throw new Error(error.message)
  }

  return {
    path: objectPath,
    url: getMediaPublicUrl(objectPath),
  }
}
