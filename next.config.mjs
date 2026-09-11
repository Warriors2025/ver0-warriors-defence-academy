import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "geaihjehvsbiiqkmjsld.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  // Preserve GSC equity from WordPress URLs → Next.js blog routes
  async redirects() {
    return [
      {
        source: "/ssb-oir-test-sample-questions-with-answers",
        destination: "/blog/ssb-oir-test-sample-questions-with-answers",
        permanent: true,
      },
      {
        source: "/ssb-oir-test-sample-questions-with-answers/",
        destination: "/blog/ssb-oir-test-sample-questions-with-answers",
        permanent: true,
      },
      {
        source: "/nda-2026-exam-dates-eligibility-application-process",
        destination: "/blog/nda-2026-exam-dates-eligibility-application-process",
        permanent: true,
      },
      {
        source: "/nda-2026-exam-dates-eligibility-application-process/",
        destination: "/blog/nda-2026-exam-dates-eligibility-application-process",
        permanent: true,
      },
      {
        source: "/significance-of-all-badges-of-indian-army-best-defence-coaching-in-lucknow",
        destination: "/blog/significance-of-all-badges-of-indian-army-best-defence-coaching-in-lucknow",
        permanent: true,
      },
      {
        source: "/significance-of-all-badges-of-indian-army-best-defence-coaching-in-lucknow/",
        destination: "/blog/significance-of-all-badges-of-indian-army-best-defence-coaching-in-lucknow",
        permanent: true,
      },
      {
        source: "/list-of-indian-military-aircraft",
        destination: "/blog/list-of-indian-military-aircraft",
        permanent: true,
      },
      {
        source: "/list-of-indian-military-aircraft/",
        destination: "/blog/list-of-indian-military-aircraft",
        permanent: true,
      },
      {
        source:
          "/agniveer-recruitment-2026-complete-guide-to-army-navy-air-force-eligibility-exam-pattern-preparation",
        destination:
          "/blog/agniveer-recruitment-2026-complete-guide-to-army-navy-air-force-eligibility-exam-pattern-preparation",
        permanent: true,
      },
      {
        source:
          "/agniveer-recruitment-2026-complete-guide-to-army-navy-air-force-eligibility-exam-pattern-preparation/",
        destination:
          "/blog/agniveer-recruitment-2026-complete-guide-to-army-navy-air-force-eligibility-exam-pattern-preparation",
        permanent: true,
      },
      {
        source: "/100-ssb-wat-negative-words-with-answers",
        destination: "/blog/100-ssb-wat-negative-words-with-answers",
        permanent: true,
      },
      {
        source: "/100-ssb-wat-negative-words-with-answers/",
        destination: "/blog/100-ssb-wat-negative-words-with-answers",
        permanent: true,
      },
      {
        source: "/latest-lecturette-topics-for-ssb-2025-with-answers",
        destination: "/blog/latest-lecturette-topics-for-ssb-2026-with-answers",
        permanent: true,
      },
      {
        source: "/latest-lecturette-topics-for-ssb-2025-with-answers/",
        destination: "/blog/latest-lecturette-topics-for-ssb-2026-with-answers",
        permanent: true,
      },
      {
        source: "/list-of-drones-used-by-indian-armed-forces",
        destination: "/blog/list-of-drones-used-by-indian-armed-forces",
        permanent: true,
      },
      {
        source: "/list-of-drones-used-by-indian-armed-forces/",
        destination: "/blog/list-of-drones-used-by-indian-armed-forces",
        permanent: true,
      },
      {
        source: "/different-types-of-indian-navy-uniforms",
        destination: "/blog/different-types-of-indian-navy-uniforms",
        permanent: true,
      },
      {
        source: "/different-types-of-indian-navy-uniforms/",
        destination: "/blog/different-types-of-indian-navy-uniforms",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/nda-foundation-course",
        destination: "/courses/nda-foundation",
        permanent: true,
      },
      {
        source: "/nda-foundation-course/",
        destination: "/courses/nda-foundation",
        permanent: true,
      },
      {
        source: "/ssb-training-center-in-lucknow",
        destination: "/courses/ssb",
        permanent: true,
      },
      {
        source: "/ssb-training-center-in-lucknow/",
        destination: "/courses/ssb",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
