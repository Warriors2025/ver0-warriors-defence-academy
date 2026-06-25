import sharp from "sharp"
import {
  IMAGE_PRESETS,
  formatBytes,
  parseImagePreset,
  type ImagePreset,
} from "@/lib/image-presets"

export { IMAGE_PRESETS, formatBytes, parseImagePreset, type ImagePreset }

export type ProcessedImage = {
  buffer: Buffer
  width: number
  height: number
  size: number
  format: "webp" | "svg"
  preset: ImagePreset
  originalSize: number
  originalWidth?: number
  originalHeight?: number
}

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024

const RASTER_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
  "image/tiff",
  "image/gif",
])

export async function processUploadedImage(
  input: Buffer,
  mimeType: string,
  preset: ImagePreset = "general"
): Promise<ProcessedImage> {
  const originalSize = input.length
  if (originalSize > MAX_UPLOAD_BYTES) {
    throw new Error(`Image too large. Maximum upload size is ${formatBytes(MAX_UPLOAD_BYTES)}.`)
  }

  if (mimeType === "image/svg+xml") {
    return {
      buffer: input,
      width: 0,
      height: 0,
      size: originalSize,
      format: "svg",
      preset,
      originalSize,
    }
  }

  if (!RASTER_MIME.has(mimeType)) {
    throw new Error("Unsupported file type. Upload JPEG, PNG, WebP, GIF, or SVG.")
  }

  const { maxWidth, maxHeight, quality } = IMAGE_PRESETS[preset]
  const meta = await sharp(input).metadata()
  const originalWidth = meta.width
  const originalHeight = meta.height

  const buffer = await sharp(input)
    .rotate()
    .resize(maxWidth, maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 4 })
    .toBuffer()

  const outputMeta = await sharp(buffer).metadata()

  return {
    buffer,
    width: outputMeta.width ?? maxWidth,
    height: outputMeta.height ?? maxHeight,
    size: buffer.length,
    format: "webp",
    preset,
    originalSize,
    originalWidth,
    originalHeight,
  }
}
