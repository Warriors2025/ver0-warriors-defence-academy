// Regenerates favicon / app icons from the master logo.
// Usage: node scripts/generate-favicons.mjs
import sharp from "sharp"
import { writeFile, mkdir } from "fs/promises"

const LOGO = "public/images/logo/Warriors Defence Logo.png"

// Round tricolour emblem inside the 512px logo; the full crest is unreadable at 16–48px.
const EMBLEM = { left: 146, top: 72, size: 220, cx: 110, cy: 109, r: 106 }

async function emblem(size) {
  const mask = Buffer.from(
    `<svg width="${EMBLEM.size}" height="${EMBLEM.size}"><circle cx="${EMBLEM.cx}" cy="${EMBLEM.cy}" r="${EMBLEM.r}" fill="#fff"/></svg>`,
  )
  const cropped = await sharp(LOGO)
    .extract({ left: EMBLEM.left, top: EMBLEM.top, width: EMBLEM.size, height: EMBLEM.size })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer()
  return sharp(cropped).resize(size, size, { kernel: "lanczos3" }).png().toBuffer()
}

// iOS / Android fill transparency with black, so large icons get an opaque white tile.
async function fullCrest(size, paddingRatio = 0.08) {
  const inner = Math.round(size * (1 - paddingRatio * 2))
  const logo = await sharp(LOGO).trim().resize(inner, inner, { fit: "contain", background: "#ffffff00" }).toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer()
}

// ICO container with embedded PNGs (supported by every current browser).
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  const dir = Buffer.alloc(16 * pngs.length)
  let offset = 6 + dir.length
  pngs.forEach(({ size, data }, i) => {
    const o = i * 16
    dir.writeUInt8(size >= 256 ? 0 : size, o)
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1)
    dir.writeUInt8(0, o + 2)
    dir.writeUInt8(0, o + 3)
    dir.writeUInt16LE(1, o + 4)
    dir.writeUInt16LE(32, o + 6)
    dir.writeUInt32LE(data.length, o + 8)
    dir.writeUInt32LE(offset, o + 12)
    offset += data.length
  })
  return Buffer.concat([header, dir, ...pngs.map((p) => p.data)])
}

const icoSizes = [16, 32, 48]
const icoPngs = await Promise.all(icoSizes.map(async (size) => ({ size, data: await emblem(size) })))

await mkdir("public/images", { recursive: true })
await Promise.all([
  writeFile("public/favicon.ico", buildIco(icoPngs)),
  writeFile("public/icon.png", await emblem(96)),
  writeFile("public/apple-touch-icon.png", await fullCrest(180)),
  writeFile("public/images/icon-192.png", await fullCrest(192)),
  writeFile("public/images/icon-512.png", await fullCrest(512)),
])

console.log("Favicons written: favicon.ico, icon.png, apple-touch-icon.png, images/icon-192.png, images/icon-512.png")
