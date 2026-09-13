import type { PageSeo } from "@/lib/seo"

/**
 * Per-blog meta title + description overrides.
 * Titles: 53–60 chars absolute (brand included where it fits).
 * Descriptions: 120–160 chars with primary keyword + CTA.
 */
export const BLOG_SEO_BY_SLUG: Record<
  string,
  Pick<PageSeo, "metaTitle" | "metaDescription" | "focusKeyword" | "ogTitle" | "ogDescription" | "twitterTitle" | "twitterDescription">
> = {
  "ssb-oir-test-sample-questions-with-answers": {
    metaTitle: "SSB OIR Test Sample Questions | Warriors Defence Academy",
    metaDescription:
      "SSB OIR test sample questions with answers — verbal & non-verbal practice, timing tips and Day-1 screening drills. Practise free sets now!",
    focusKeyword: "ssb oir test sample questions with answers",
  },
  "nda-2026-exam-dates-eligibility-application-process": {
    metaTitle: "NDA Exam Date 2026 Guide | Warriors Defence Academy",
    metaDescription:
      "NDA exam date 2026 for NDA 1 & NDA 2 — eligibility, notification, vacancies and application steps. Plan your UPSC NDA timeline today!",
    focusKeyword: "nda exam date 2026",
  },
  "significance-of-all-badges-of-indian-army-best-defence-coaching-in-lucknow": {
    metaTitle: "Indian Army Badges Explained | Warriors Defence Academy",
    metaDescription:
      "Indian Army badges guide — ranks, insignia and meaning of key badges for defence aspirants. Learn ranks clearly, then start NDA prep!",
    focusKeyword: "indian army badges",
  },
  "list-of-indian-military-aircraft": {
    metaTitle: "Indian Air Force Aircraft List | Warriors Defence Academy",
    metaDescription:
      "Indian Air Force aircraft list — fighter jets, transports and trainers updated for GK and SSB. Study the list, then enrol for coaching!",
    focusKeyword: "indian air force aircraft list",
  },
  "agniveer-recruitment-2026-complete-guide-to-army-navy-air-force-eligibility-exam-pattern-preparation": {
    metaTitle: "Agniveer Recruitment 2026 Guide | Warriors Defence Academy",
    metaDescription:
      "Agniveer recruitment 2026 guide for Army, Navy & Air Force — eligibility, exam pattern and prep tips. Start your Agniveer coaching now!",
    focusKeyword: "agniveer recruitment 2026",
  },
  "latest-lecturette-topics-for-ssb-2026-with-answers": {
    metaTitle: "Lecturette Topics for SSB 2026 | Warriors Defence Academy",
    metaDescription:
      "Lecturette topics for SSB with answers — 2026 updated list, outlines and delivery tips. Practise topics, then join SSB coaching!",
    focusKeyword: "lecturette topics for ssb with answers",
  },
  "100-ssb-wat-negative-words-with-answers": {
    metaTitle: "SSB WAT Negative Words Answers | Warriors Defence Academy",
    metaDescription:
      "SSB WAT negative words with answers — turn fear, fail and death into positive responses. Practise the set, then book SSB training!",
    focusKeyword: "ssb wat negative words with answers",
  },
  "10-tips-to-start-nda-1-2027-preparation-early": {
    metaTitle: "NDA 1 2027 Preparation Tips | Warriors Defence Academy",
    metaDescription:
      "10 tips to start NDA 1 2027 preparation early — study plan, subjects and habits that build rank. Begin your NDA coaching journey now!",
    focusKeyword: "nda 1 2027 preparation",
  },
  "a-day-in-the-life-of-an-nda-cadet-discipline-training-and-routine": {
    metaTitle: "Day in the Life of an NDA Cadet | Warriors Defence Academy",
    metaDescription:
      "A day in the life of an NDA cadet — training, discipline and daily routine at Khadakwasla. Get inspired, then apply for NDA coaching!",
    focusKeyword: "day in the life of an nda cadet",
  },
  "afcat-2-2026-notification-exam-date-vacancies-and-eligibility-for-indian-air-for": {
    metaTitle: "AFCAT 2 2026 Notification Guide | Warriors Defence Academy",
    metaDescription:
      "AFCAT 2 2026 notification — exam date, vacancies and eligibility for Indian Air Force. Check details, then enrol for AFCAT coaching!",
    focusKeyword: "afcat 2 2026 notification",
  },
  "air-force-xy-group-entry-a-complete-guide-for-aspirants": {
    metaTitle: "Air Force X Y Group Entry Guide | Warriors Defence Academy",
    metaDescription:
      "Air Force X/Y Group entry guide — eligibility, exam pattern and prep tips for aspirants. Start structured coaching in Lucknow today!",
    focusKeyword: "air force x y group entry",
  },
  "best-books-for-nda-2026-preparation-subject-wise-list": {
    metaTitle: "Best Books for NDA 2026 Prep | Warriors Defence Academy",
    metaDescription:
      "Best books for NDA 2026 preparation — subject-wise list for Maths, GAT and English. Pick the right books, then join NDA coaching!",
    focusKeyword: "best books for nda 2026 preparation",
  },
  "cds-2-2026-notification-exam-date-vacancies-and-how-to-apply": {
    metaTitle: "CDS 2 2026 Notification Guide | Warriors Defence Academy",
    metaDescription:
      "CDS 2 2026 notification — exam date, vacancies and how to apply on UPSC. Review the notice, then enrol for CDS coaching in Lucknow!",
    focusKeyword: "cds 2 2026 notification",
  },
  "defence-current-affairs-round-up-what-nda-and-cds-aspirants-should-know": {
    metaTitle: "Defence Current Affairs for NDA | Warriors Defence Academy",
    metaDescription:
      "Defence current affairs round-up for NDA and CDS aspirants — must-know topics for GAT. Stay updated, then practise with our mocks!",
    focusKeyword: "defence current affairs for nda",
  },
  "difference-between-nda-cds-afcat-and-navy-agniveer-which-path-is-right-for-you": {
    metaTitle: "NDA vs CDS vs AFCAT vs Agniveer | Warriors Defence Academy",
    metaDescription:
      "Difference between NDA, CDS, AFCAT and Navy Agniveer — age, path and career fit. Choose your entry, then talk to our counsellors!",
    focusKeyword: "difference between nda cds afcat",
  },
  "different-types-of-indian-navy-uniforms": {
    metaTitle: "Indian Navy Uniform Types Guide | Warriors Defence Academy",
    metaDescription:
      "Different types of Indian Navy uniforms — ceremonial, working and seasonal explained for GK. Learn more, then prepare with WDA!",
    focusKeyword: "indian navy uniforms",
  },
  "english-and-general-knowledge-preparation-strategy-for-defence-exams": {
    metaTitle: "English & GK for Defence Exams | Warriors Defence Academy",
    metaDescription:
      "English and general knowledge strategy for NDA, CDS and AFCAT — what to study and how. Follow the plan, then join our classes!",
    focusKeyword: "english and gk for defence exams",
  },
  "frequently-asked-questions-about-joining-nda-cds-and-ssb": {
    metaTitle: "NDA CDS SSB FAQs for Aspirants | Warriors Defence Academy",
    metaDescription:
      "Frequently asked questions about joining NDA, CDS and SSB — age, attempts and process. Get clear answers, then register for counselling!",
    focusKeyword: "nda cds ssb faqs",
  },
  "gto-tasks-explained-a-complete-guide-to-group-testing-at-ssb": {
    metaTitle: "GTO Tasks Explained for SSB | Warriors Defence Academy",
    metaDescription:
      "GTO tasks explained — complete guide to group testing at SSB with outdoor task tips. Train on India's largest GTO ground — enrol now!",
    focusKeyword: "gto tasks explained",
  },
  "how-to-crack-group-discussion-in-ssb-practical-tips": {
    metaTitle: "How to Crack SSB Group Discussion | Warriors Defence Academy",
    metaDescription:
      "How to crack group discussion in SSB — practical tips for content, body language and leadership. Practise GD, then join SSB coaching!",
    focusKeyword: "how to crack group discussion in ssb",
  },
  "how-to-manage-ndacds-preparation-alongside-board-exams": {
    metaTitle: "NDA Prep with Board Exams Tips | Warriors Defence Academy",
    metaDescription:
      "How to manage NDA/CDS preparation alongside board exams — weekly plan and priorities. Balance both, then enrol for foundation coaching!",
    focusKeyword: "nda preparation with board exams",
  },
  "how-to-prepare-for-nda-in-3-months-a-realistic-study-plan": {
    metaTitle: "Prepare for NDA in 3 Months | Warriors Defence Academy",
    metaDescription:
      "How to prepare for NDA in 3 months — a realistic study plan for Maths and GAT. Follow the schedule, then join intensive NDA coaching!",
    focusKeyword: "how to prepare for nda in 3 months",
  },
  "how-to-present-officer-like-qualities-olqs-at-ssb": {
    metaTitle: "Officer Like Qualities at SSB | Warriors Defence Academy",
    metaDescription:
      "How to present Officer Like Qualities (OLQs) at SSB — real examples across GTO, psych and interview. Train OLQs with experts — apply!",
    focusKeyword: "officer like qualities at ssb",
  },
  "importance-of-physical-fitness-for-defence-aspirants-building-the-right-habits-e": {
    metaTitle: "Physical Fitness for Defence | Warriors Defence Academy",
    metaDescription:
      "Importance of physical fitness for defence aspirants — habits, PT routine and SSB standards. Build fitness early, then join WDA PT!",
    focusKeyword: "physical fitness for defence aspirants",
  },
  "indian-navy-agniveer-ssr-entry-eligibility-exam-pattern-and-preparation": {
    metaTitle: "Navy Agniveer SSR Entry Guide | Warriors Defence Academy",
    metaDescription:
      "Indian Navy Agniveer SSR entry — eligibility, exam pattern and preparation tips. Start SSR coaching in Lucknow — call us today!",
    focusKeyword: "indian navy agniveer ssr",
  },
  "life-at-nda-khadakwasla-training-discipline-and-growth": {
    metaTitle: "Life at NDA Khadakwasla Guide | Warriors Defence Academy",
    metaDescription:
      "Life at NDA Khadakwasla — training, discipline and growth every cadet faces. Understand academy life, then prepare with NDA coaching!",
    focusKeyword: "life at nda khadakwasla",
  },
  "list-of-drones-used-by-indian-armed-forces": {
    metaTitle: "Indian Armed Forces Drones List | Warriors Defence Academy",
    metaDescription:
      "List of drones used by Indian Armed Forces — key UAV types for defence GK. Study the list, then strengthen current affairs with us!",
    focusKeyword: "drones used by indian armed forces",
  },
  "mathematics-preparation-strategy-for-nda-topic-wise-weightage-and-tips": {
    metaTitle: "NDA Maths Preparation Strategy | Warriors Defence Academy",
    metaDescription:
      "Mathematics preparation strategy for NDA — topic-wise weightage and scoring tips. Master Maths faster with our NDA coaching — enrol!",
    focusKeyword: "mathematics preparation strategy for nda",
  },
  "nda-2-2026-notification-exam-date-eligibility-vacancies-and-complete-guide": {
    metaTitle: "NDA 2 2026 Notification Guide | Warriors Defence Academy",
    metaDescription:
      "NDA 2 2026 notification — exam date, eligibility, vacancies and complete guide. Read the update, then join NDA coaching in Lucknow!",
    focusKeyword: "nda 2 2026 notification",
  },
  "nda-eligibility-criteria-2026-age-qualification-and-physical-standards": {
    metaTitle: "NDA Eligibility Criteria 2026 | Warriors Defence Academy",
    metaDescription:
      "NDA eligibility criteria 2026 — age, qualification and physical standards before you apply. Confirm eligibility, then register at WDA!",
    focusKeyword: "nda eligibility criteria 2026",
  },
  "nda-physical-fitness-standards-what-you-need-to-know-before-applying": {
    metaTitle: "NDA Physical Fitness Standards | Warriors Defence Academy",
    metaDescription:
      "NDA physical fitness standards — what you need before applying and at SSB. Build the right habits, then train with our PT mentors!",
    focusKeyword: "nda physical fitness standards",
  },
  "nda-salary-and-career-growth-what-to-expect-after-selection": {
    metaTitle: "NDA Salary and Career Growth | Warriors Defence Academy",
    metaDescription:
      "NDA salary and career growth — what to expect after selection into the forces. Know the path, then start NDA coaching with us today!",
    focusKeyword: "nda salary and career growth",
  },
  "nda-vs-cds-which-defence-exam-should-you-choose-after-class-12": {
    metaTitle: "NDA vs CDS After Class 12 | Warriors Defence Academy",
    metaDescription:
      "NDA vs CDS — which defence exam should you choose after Class 12? Compare age, path and training. Decide, then book free counselling!",
    focusKeyword: "nda vs cds after class 12",
  },
  "psychological-tests-in-ssb-tat-wat-srt-and-self-description-explained": {
    metaTitle: "SSB Psychological Tests Explained | Warriors Defence Academy",
    metaDescription:
      "Psychological tests in SSB — TAT, WAT, SRT and self description explained simply. Practise psych tests with retired officers — enrol!",
    focusKeyword: "psychological tests in ssb",
  },
  "role-of-ncc-in-defence-exam-selection-benefits-explained": {
    metaTitle: "Role of NCC in Defence Selection | Warriors Defence Academy",
    metaDescription:
      "Role of NCC in defence exam selection — certificate benefits for NDA, CDS and SSB. Use NCC wisely, then join our selection coaching!",
    focusKeyword: "role of ncc in defence exam selection",
  },
  "ssb-interview-the-5-stages-explained-for-first-time-candidates": {
    metaTitle: "SSB Interview 5 Stages Explained | Warriors Defence Academy",
    metaDescription:
      "SSB interview: the 5 stages explained for first-time candidates — Day 1 to conference. Know the process, then join SSB coaching!",
    focusKeyword: "ssb interview 5 stages",
  },
  "top-7-mistakes-candidates-make-in-the-ssb-interview": {
    metaTitle: "Top 7 SSB Interview Mistakes | Warriors Defence Academy",
    metaDescription:
      "Top 7 mistakes candidates make in the SSB interview — and how to avoid them. Fix these early, then train with WDA SSB mentors!",
    focusKeyword: "ssb interview mistakes",
  },
  "why-warriors-defence-academy-is-among-the-best-nda-coaching-institutes-in-luckno": {
    metaTitle: "Why Choose WDA NDA Coaching | Warriors Defence Academy",
    metaDescription:
      "Why Warriors Defence Academy ranks among top NDA coaching institutes in Lucknow — results, faculty and GTO ground. Visit campus today!",
    focusKeyword: "best nda coaching institutes in lucknow",
  },
  "women-in-nda-complete-guide-to-the-women-special-entry-scheme": {
    metaTitle: "Women in NDA Entry Guide 2026 | Warriors Defence Academy",
    metaDescription:
      "Women in NDA — complete guide to the women special entry scheme, eligibility and prep. Start your NDA journey with expert mentoring!",
    focusKeyword: "women in nda",
  },
  // Static fallbacks
  "complete-guide-nda-2025": {
    metaTitle: "Complete Guide to NDA Exam Prep | Warriors Defence Academy",
    metaDescription:
      "Complete guide to the NDA exam — syllabus, pattern and preparation strategy from Warriors Defence Academy. Start structured prep today!",
    focusKeyword: "nda exam preparation guide",
  },
  "ssb-interview-5-day-procedure": {
    metaTitle: "SSB Interview 5 Day Procedure | Warriors Defence Academy",
    metaDescription:
      "SSB interview 5-day testing procedure explained — screening to conference. Know each day, then enrol for SSB coaching in Lucknow!",
    focusKeyword: "ssb interview 5 day procedure",
  },
  "physical-fitness-standards-defence": {
    metaTitle: "Defence Exam Fitness Standards | Warriors Defence Academy",
    metaDescription:
      "Physical fitness standards for defence exams — NDA, CDS and AFCAT requirements with training tips. Build fitness, then join WDA PT!",
    focusKeyword: "physical fitness standards for defence exams",
  },
}

// Mirror og/twitter from meta when not set explicitly
for (const entry of Object.values(BLOG_SEO_BY_SLUG)) {
  entry.ogTitle = entry.ogTitle ?? entry.metaTitle
  entry.ogDescription = entry.ogDescription ?? entry.metaDescription
  entry.twitterTitle = entry.twitterTitle ?? entry.metaTitle
  entry.twitterDescription = entry.twitterDescription ?? entry.metaDescription
}

export function getBlogSeoOverride(slug: string) {
  return BLOG_SEO_BY_SLUG[slug]
}
