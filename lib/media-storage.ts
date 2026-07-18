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

  const bytes = new Uint8Array(opts.buffer)
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(
    objectPath,
    // Blob+Uint8Array avoids Buffer UTF-8 corruption in Next.js/undici fetch
    new Blob([bytes], { type: opts.contentType }),
    {
      contentType: opts.contentType,
      upsert: false,
      cacheControl: "31536000",
    }
  )

  if (error) {
    throw new Error(error.message)
  }

  const url = getMediaPublicUrl(objectPath)

  // Verify the public object is intact (catches silent binary corruption)
  if (opts.contentType === "image/webp" || opts.contentType === "image/png" || opts.contentType === "image/jpeg") {
    const check = await fetch(url)
    if (!check.ok) {
      throw new Error(`Upload stored but public URL returned ${check.status}`)
    }
    const stored = new Uint8Array(await check.arrayBuffer())
    if (stored.byteLength !== bytes.byteLength) {
      await supabase.storage.from(MEDIA_BUCKET).remove([objectPath])
      throw new Error("Upload corrupted in transit (size mismatch). Please try again.")
    }
    // WebP must start with RIFF....WEBP
    if (opts.contentType === "image/webp") {
      const head = String.fromCharCode(...stored.slice(0, 4))
      const tag = String.fromCharCode(...stored.slice(8, 12))
      if (head !== "RIFF" || tag !== "WEBP") {
        await supabase.storage.from(MEDIA_BUCKET).remove([objectPath])
        throw new Error("Upload corrupted in transit (invalid WebP). Please try again.")
      }
    }
  }

  return {
    path: objectPath,
    url,
  }
}
