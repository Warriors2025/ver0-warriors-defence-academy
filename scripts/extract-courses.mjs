import fs from "fs"
import path from "path"

const p = path.join(process.cwd(), "app/courses/[slug]/page.tsx")
const c = fs.readFileSync(p, "utf8")
const start = c.indexOf("const courseDetails")
const end = c.indexOf("export async function generateStaticParams")
let block = c.slice(start, end)
block = block.replace(
  /const courseDetails: Record<string, \{[\s\S]*?\}> = /,
  "export const COURSE_SEED_DETAILS: Record<string, CourseSeed> = "
)
const header = `import type { CourseDetail } from "@/lib/courses"\n\nexport type CourseSeed = Pick<CourseDetail, "title" | "tagline" | "description" | "duration" | "students" | "rating" | "badge" | "features"> & {\n  badgeColor: string\n  eligibility: string[]\n  syllabus: CourseDetail["syllabus"]\n  benefits: string[]\n  fee: string\n  batchStart: string\n  examPattern: CourseDetail["examPattern"]\n}\n\n`
fs.writeFileSync(path.join(process.cwd(), "lib/course-seed-data.ts"), header + block)
