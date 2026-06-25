import fs from "fs"
import path from "path"

const p = path.join(process.cwd(), "app/courses/[slug]/page.tsx")
let c = fs.readFileSync(p, "utf8")
const start = c.indexOf("const courseDetails")
const end = c.indexOf("export async function generateStaticParams")
c = c.slice(0, start) + c.slice(end)
c = c.replace(
  "import { COURSE_SEED_DETAILS } from \"@/lib/course-seed-data\"\n",
  "import { COURSE_SEED_DETAILS } from \"@/lib/course-seed-data\"\nimport Link from \"next/link\"\n"
)
c = c.replace(
  `export async function generateStaticParams() {
  return Object.keys(courseDetails).map((slug) => ({ slug }))
}`,
  `export async function generateStaticParams() {
  return Object.keys(COURSE_SEED_DETAILS).map((slug) => ({ slug }))
}`
)
c = c.replace(
  `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = courseDetails[slug]
  if (!course) return { title: "Course Not Found" }
  return {
    title: \`\${course.title} | Warriors Defence Academy\`,
    description: course.description,
  }
}`,
  `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) return { title: "Course Not Found" }
  return {
    title: \`\${course.title} | Warriors Defence Academy\`,
    description: course.description,
  }
}`
)
c = c.replace(
  `export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const staticCourse = courseDetails[slug]
  if (!staticCourse) notFound()

  const dbCourse = await getCourseBySlug(slug)
  const course = {
    ...staticCourse,
    ...(dbCourse
      ? {
          title: dbCourse.title,
          tagline: dbCourse.tagline,
          description: dbCourse.description,
          duration: dbCourse.duration,
          students: dbCourse.students,
          rating: dbCourse.rating,
          badge: dbCourse.badge ?? staticCourse.badge,
          badgeColor: dbCourse.badgeColor || staticCourse.badgeColor,
          features: dbCourse.features.length ? dbCourse.features : staticCourse.features,
          eligibility: dbCourse.eligibility.length ? dbCourse.eligibility : staticCourse.eligibility,
          syllabus: dbCourse.syllabus.length ? dbCourse.syllabus : staticCourse.syllabus,
          benefits: dbCourse.benefits.length ? dbCourse.benefits : staticCourse.benefits,
          fee: dbCourse.fee,
          batchStart: dbCourse.batchStart,
          examPattern: dbCourse.examPattern.length ? dbCourse.examPattern : staticCourse.examPattern,
        }
      : {}),
  }`,
  `export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) notFound()`
)
fs.writeFileSync(p, c)
