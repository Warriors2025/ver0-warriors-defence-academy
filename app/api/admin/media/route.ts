import { NextRequest, NextResponse } from "next/server"
import { readdir, writeFile, mkdir } from "fs/promises"
import path from "path"
import { requireAdminSession, unauthorizedResponse } from "@/lib/admin-auth"
import {
  formatBytes,
  parseImagePreset,
  processUploadedImage,
  type ImagePreset,
} from "@/lib/image-processing"

const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg"])

async function scanDir(dir: string, base: string): Promise<string[]> {
  const results: string[] = []
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        results.push(...await scanDir(full, base))
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
  const [images, uploads] = await Promise.all([
    scanDir(path.join(publicDir, "images"), publicDir),
    scanDir(path.join(publicDir, "uploads"), publicDir),
  ])

  return NextResponse.json({ images: [...uploads, ...images].sort() })
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

  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  await mkdir(uploadsDir, { recursive: true })

  const ext = processed.format === "svg" ? ".svg" : ".webp"
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
  const filepath = path.join(uploadsDir, filename)
  await writeFile(filepath, processed.buffer)

  const savedPercent =
    processed.originalSize > 0
      ? Math.round((1 - processed.size / processed.originalSize) * 100)
      : 0

  return NextResponse.json({
    url: `/uploads/${filename}`,
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
    },
  })
}
