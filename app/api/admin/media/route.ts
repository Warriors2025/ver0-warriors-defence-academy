import { NextRequest, NextResponse } from "next/server"
import { readdir } from "fs/promises"
import path from "path"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import {
  formatBytes,
  parseImagePreset,
  processUploadedImage,
  type ImagePreset,
} from "@/lib/image-processing"
import { listMediaUploads, uploadMediaFile, deleteMediaFile } from "@/lib/media-storage"

const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg"])

async function scanDir(dir: string, base: string): Promise<string[]> {
  const results: string[] = []
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        results.push(...(await scanDir(full, base)))
      } else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
        results.push("/" + path.relative(base, full).replace(/\\/g, "/"))
      }
    }
  } catch {
    // directory may not exist yet
  }
  return results
}

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse()

  const publicDir = path.join(process.cwd(), "public")
  let bundled: string[] = []
  try {
    bundled = await scanDir(path.join(publicDir, "images"), publicDir)
  } catch {
    bundled = []
  }

  let uploaded: string[] = []
  try {
    uploaded = await listMediaUploads()
  } catch (err) {
    // Still return bundled images if storage listing fails
    console.error("[media] list uploads failed:", err)
  }

  // Prefer newest uploads first, then bundled assets
  return NextResponse.json({
    images: [...uploaded, ...bundled],
    source: "supabase",
  })
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()

  const form = await req.formData()
  const file = form.get("file") as File | null
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const preset = parseImagePreset(form.get("preset"))
  const mimeType = file.type || "application/octet-stream"
  const inputBuffer = Buffer.from(await file.arrayBuffer())

  let processed
  try {
    processed = await processUploadedImage(inputBuffer, mimeType, preset)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Image processing failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const ext = processed.format === "svg" ? ".svg" : ".webp"
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
  const contentType = processed.format === "svg" ? "image/svg+xml" : "image/webp"

  let uploaded
  try {
    uploaded = await uploadMediaFile({
      buffer: processed.buffer,
      filename,
      contentType,
      preset,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload to Supabase Storage failed"
    console.error("[media] upload failed:", err)
    return NextResponse.json(
      {
        error: `${message}. Ensure WDA_SUPABASE_SERVICE_ROLE_KEY is set and the "media" storage bucket exists.`,
      },
      { status: 500 }
    )
  }

  const savedPercent =
    processed.originalSize > 0
      ? Math.round((1 - processed.size / processed.originalSize) * 100)
      : 0

  return NextResponse.json({
    url: uploaded.url,
    path: uploaded.path,
    meta: {
      preset: processed.preset as ImagePreset,
      format: processed.format,
      width: processed.width,
      height: processed.height,
      size: processed.size,
      sizeLabel: formatBytes(processed.size),
      originalSize: processed.originalSize,
      originalSizeLabel: formatBytes(processed.originalSize),
      originalWidth: processed.originalWidth,
      originalHeight: processed.originalHeight,
      savedPercent,
      storage: "supabase",
    },
  })
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdminSession())) return unauthorizedResponse()

  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")
  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
  }

  // Only allow deleting Supabase uploads, not bundled /images/*
  if (url.startsWith("/")) {
    return NextResponse.json({ error: "Bundled site images cannot be deleted here." }, { status: 400 })
  }

  try {
    await deleteMediaFile(url)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
