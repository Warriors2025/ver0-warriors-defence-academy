// Upload all 30 blog posts to Supabase blog_posts table
// Run: node scripts/upload-blogs.mjs

import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.WDA_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.WDA_SUPABASE_SERVICE_ROLE_KEY
const SITE_URL = "https://www.warriorsdefenceacademy.com"

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / WDA_SUPABASE_URL or WDA_SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const rawPosts = JSON.parse(
  readFileSync(join(__dirname, "blog-content.json"), "utf-8")
)

// Image pool - rotate across posts
const IMAGES = [
  "/images/blog/nda-guide.webp",
  "/images/blog/ssb-interview.webp",
  "/images/blog/physical-fitness.webp",
  "/images/blog/nda-guide.jpg",
  "/images/blog/maths-prep.jpg",
  "/images/blog/olq-qualities.jpg",
  "/images/blog/cds-vs-nda.jpg",
]

function pickImage(index) {
  return IMAGES[index % IMAGES.length]
}

function slugify(title) {
  // Remove leading number like "1. " or "30. "
  return title
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

function categoryFor(title) {
  const t = title.toLowerCase()
  if (t.includes("ssb") || t.includes("gto") || t.includes("psychological") || t.includes("group discussion") || t.includes("olq")) return "SSB Interview"
  if (t.includes("physical") || t.includes("fitness")) return "Physical Training"
  if (t.includes("cds")) return "CDS Preparation"
  if (t.includes("afcat") || t.includes("air force")) return "AFCAT"
  if (t.includes("navy") || t.includes("agniveer")) return "Navy Entry"
  if (t.includes("ncc")) return "NCC"
  if (t.includes("women")) return "Women in Defence"
  if (t.includes("mathematics") || t.includes("maths") || t.includes("english") || t.includes("books")) return "Exam Preparation"
  if (t.includes("warriors defence academy") || t.includes("coaching")) return "About WDA"
  if (t.includes("career") || t.includes("salary") || t.includes("life at nda") || t.includes("cadet")) return "Defence Career"
  if (t.includes("current affairs")) return "Current Affairs"
  if (t.includes("frequently asked") || t.includes("faq")) return "FAQ"
  return "NDA Preparation"
}

function tagsFor(title, category) {
  const tags = new Set([category])
  const t = title.toLowerCase()
  if (t.includes("nda")) tags.add("NDA")
  if (t.includes("cds")) tags.add("CDS")
  if (t.includes("afcat")) tags.add("AFCAT")
  if (t.includes("ssb")) tags.add("SSB")
  if (t.includes("navy")) tags.add("Navy")
  if (t.includes("2026")) tags.add("2026")
  if (t.includes("2027")) tags.add("2027")
  if (t.includes("physical") || t.includes("fitness")) tags.add("Physical Training")
  if (t.includes("women")) tags.add("Women")
  if (t.includes("ncc")) tags.add("NCC")
  if (t.includes("coaching") || t.includes("warriors")) tags.add("Warriors Defence Academy")
  if (t.includes("lucknow")) tags.add("Lucknow")
  tags.add("Defence Exam")
  return [...tags].slice(0, 6)
}

function authorFor(index) {
  const authors = [
    "Col. Rajesh Kumar (Retd.)",
    "Maj. Priya Singh (Retd.)",
    "Capt. Vikram Yadav",
    "Lt. Col. Arun Sharma (Retd.)",
    "Warriors Defence Academy",
  ]
  return authors[index % authors.length]
}

function readTimeFor(sections) {
  const wordCount = sections.reduce((sum, s) => sum + s.text.split(/\s+/).length, 0)
  const mins = Math.max(5, Math.round(wordCount / 200))
  return `${mins} min read`
}

function excerptFor(sections, titleClean) {
  // Find the first paragraph
  const firstP = sections.find((s) => s.type === "p")
  if (!firstP) return `Complete guide about ${titleClean} by Warriors Defence Academy Lucknow.`
  let text = firstP.text.replace(/\s+/g, " ").trim()
  if (text.length > 155) text = text.slice(0, 152) + "..."
  return text
}

// Generate full HTML + embedded JSON-LD for a post
function buildHtml(post, meta) {
  const { title, sections } = post
  const { slug, category, tags, author, image } = meta
  const cleanTitle = title.replace(/^\d+\.\s*/, "")
  const url = `${SITE_URL}/blog/${slug}`

  // Build JSON-LD BlogPosting schema
  const faqItems = buildFaqItems(cleanTitle, sections)
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        "headline": cleanTitle,
        "description": excerptFor(sections, cleanTitle),
        "image": {
          "@type": "ImageObject",
          "url": `${SITE_URL}${image}`,
          "width": 1200,
          "height": 630,
        },
        "author": {
          "@type": "Person",
          "name": author,
          "worksFor": {
            "@type": "EducationalOrganization",
            "name": "Warriors Defence Academy",
            "url": SITE_URL,
          },
        },
        "publisher": {
          "@type": "EducationalOrganization",
          "@id": `${SITE_URL}/#organization`,
          "name": "Warriors Defence Academy",
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/images/logo.png`,
          },
        },
        "datePublished": new Date().toISOString().split("T")[0],
        "dateModified": new Date().toISOString().split("T")[0],
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
        "keywords": tags.join(", "),
        "articleSection": category,
        "inLanguage": "en-IN",
        "about": {
          "@type": "EducationalOrganization",
          "name": "Warriors Defence Academy",
          "description": "India's best NDA coaching institute in Lucknow with 5,000+ selections",
        },
      },
      faqItems.length > 0
        ? {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            "mainEntity": faqItems.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          }
        : null,
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
          { "@type": "ListItem", "position": 3, "name": cleanTitle, "item": url },
        ],
      },
    ].filter(Boolean),
  }

  // Build HTML body
  let html = `<script type="application/ld+json">\n${JSON.stringify(schemaGraph, null, 2)}\n</script>\n\n`

  // Hero intro paragraph (first p section)
  const introSection = sections.find((s) => s.type === "p")
  if (introSection) {
    html += `<p class="lead">${escapeHtml(introSection.text)}</p>\n\n`
  }

  // Process remaining sections
  let skipFirst = true
  for (const section of sections) {
    if (section.type === "p" && skipFirst) {
      skipFirst = false
      continue
    }
    if (section.type === "h2") {
      html += `<h2>${escapeHtml(section.text)}</h2>\n`
    } else if (section.type === "p") {
      // Skip the WDA promo paragraph at the end (we'll add our own CTA)
      if (section.text.includes("Warriors Defence Academy in Lucknow is one of India")) continue
      html += `<p>${escapeHtml(section.text)}</p>\n`
    }
  }

  // Add FAQ section if we have items
  if (faqItems.length > 0) {
    html += `\n<h2>Frequently Asked Questions</h2>\n`
    html += `<div class="faq-section">\n`
    for (const faq of faqItems) {
      html += `<div class="faq-item">\n`
      html += `  <h3>${escapeHtml(faq.q)}</h3>\n`
      html += `  <p>${escapeHtml(faq.a)}</p>\n`
      html += `</div>\n`
    }
    html += `</div>\n`
  }

  // CTA section
  html += `
<div class="wda-cta-box">
  <h2>Start Your Defence Journey with Warriors Defence Academy</h2>
  <p>Warriors Defence Academy in Lucknow is one of India's best NDA coaching institutes — with 5,000+ selections, India's largest GTO ground, and training by retired military officers. Whether you are preparing for NDA, CDS, AFCAT or SSB, we provide expert-led coaching for both the written exam and the personality assessment under one roof.</p>
  <ul>
    <li>50,000+ students trained since 2010</li>
    <li>200+ expert defence mentors</li>
    <li>India's largest GTO ground in Lucknow</li>
    <li>Integrated academics + SSB preparation</li>
  </ul>
  <p><a href="/register">Apply for NDA Coaching</a> | <a href="/contact">Contact Us: +91 94522 45729</a></p>
</div>
`

  return html
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function buildFaqItems(title, sections) {
  const t = title.toLowerCase()
  // Generate contextually relevant FAQs based on post topic
  if (t.includes("nda 2 2026 notification") || t.includes("nda 1 2026")) {
    return [
      { q: "What is the NDA 2 2026 exam date?", a: "The NDA (2) 2026 written examination is scheduled for 13th September 2026." },
      { q: "How many vacancies are there in NDA 2 2026?", a: "UPSC has announced 394 vacancies across the Army, Navy and Air Force wings for NDA 2 2026." },
      { q: "Who is eligible for NDA 2 2026?", a: "Unmarried male and female candidates who have passed or are appearing in Class 12 are eligible. For Air Force and Naval wings, Physics and Mathematics at 10+2 level is required." },
      { q: "What is the best coaching for NDA in Lucknow?", a: "Warriors Defence Academy (WDA) is widely considered the best NDA coaching institute in Lucknow, with 5,000+ selections, India's largest GTO ground, and training by retired military officers." },
    ]
  }
  if (t.includes("cds")) {
    return [
      { q: "What is the eligibility for CDS 2026?", a: "Candidates must be graduates (or in final year) and unmarried for IMA, INA and AFA. Age limits vary by academy, broadly between 19 and 25 years." },
      { q: "How many papers are there in CDS exam?", a: "For IMA, INA and AFA: three papers — English, General Knowledge and Elementary Mathematics. For OTA: only English and General Knowledge." },
      { q: "Which is better — NDA or CDS?", a: "NDA is for Class 12 students and provides a 3-year joint training experience starting from an earlier age. CDS is for graduates and offers a shorter training period. Both are prestigious routes into the armed forces." },
      { q: "Which is the best CDS coaching in Lucknow?", a: "Warriors Defence Academy in Lucknow provides dedicated CDS coaching with subject-wise classes, current affairs sessions, and integrated SSB preparation." },
    ]
  }
  if (t.includes("ssb interview") || t.includes("5 stages")) {
    return [
      { q: "What are the 5 stages of the SSB interview?", a: "SSB interview consists of: Day 1 — Screening (OIR + PPDT); Day 2 — Psychological Tests (TAT, WAT, SRT, SD); Days 3-4 — GTO Tasks; Interview with IO (spread across days); Final Day — Conference." },
      { q: "How long does the SSB interview last?", a: "The SSB interview is a 5-day process conducted at Services Selection Boards across India." },
      { q: "What is the SSB recommendation rate?", a: "On average, about 10-15% of candidates who appear for SSB get recommended. Warriors Defence Academy has a 68% SSB recommendation rate for its trained students." },
      { q: "How do I prepare for SSB interview?", a: "SSB preparation includes building consistent personality traits, practising TAT/WAT/SRT, improving communication in group discussions, and physical training for GTO tasks. Structured SSB coaching at a reputed institute significantly improves your chances." },
    ]
  }
  if (t.includes("gto") || t.includes("group testing")) {
    return [
      { q: "What is GTO in SSB?", a: "GTO stands for Group Testing Officer. The GTO tasks in SSB assess teamwork, leadership, communication and physical fitness through outdoor and indoor group exercises." },
      { q: "What are the GTO tasks in SSB?", a: "GTO tasks include Group Discussion, Group Planning Exercise, Progressive Group Task (PGT), Half Group Task (HGT), Individual Obstacles, Command Task, Final Group Task, and Lecturette." },
      { q: "How can I improve my GTO performance?", a: "Practise group tasks in coaching, improve communication skills, work on physical fitness, and build leadership habits in daily life." },
    ]
  }
  if (t.includes("physical fitness") || t.includes("fitness standard")) {
    return [
      { q: "What are the physical fitness standards for NDA?", a: "NDA prescribes minimum height requirements (typically 157 cm for Army, 162 cm for Air Force/Navy), corresponding weight norms, and medical standards including good vision, hearing and dental health." },
      { q: "What physical training is needed for SSB?", a: "SSB GTO tasks require running, jumping, climbing and teamwork under obstacle courses. Aspirants should build cardiovascular fitness, functional strength and agility well before the SSB date." },
      { q: "How early should I start fitness training for NDA?", a: "Ideally, start structured fitness training at least 6 months before the SSB date. Focus on 5 km runs, push-ups, pull-ups, and obstacle-type movements." },
    ]
  }
  if (t.includes("mathematics") || t.includes("maths")) {
    return [
      { q: "Which topics are most important in NDA Maths?", a: "High-weightage topics include Algebra, Trigonometry, Matrices & Determinants, Calculus, and Statistics. About 30-35% of the Maths paper comes from Algebra and Trigonometry combined." },
      { q: "How to prepare NDA Maths in 3 months?", a: "Cover NCERT fundamentals in the first month, do topic-wise practice in month 2, and switch to full-length mock tests in month 3. Aim for at least 120-130 marks in Maths." },
      { q: "Is NCERT enough for NDA Maths?", a: "NCERT books from Class 9-12 form the foundation, but you need additional practice with NDA-specific question banks to handle the speed and pattern of actual questions." },
    ]
  }
  if (t.includes("books") || t.includes("best books")) {
    return [
      { q: "Which books are best for NDA Mathematics?", a: "RS Aggarwal Mathematics, NCERT Class 11 and 12 Maths, and NDA/NA chapter-wise solved papers by Arihant are widely recommended for NDA Maths preparation." },
      { q: "Which books are best for NDA English?", a: "SP Bakshi's Objective General English, Wren and Martin Grammar, and NCERT Class 11-12 English textbooks are reliable resources for NDA English preparation." },
      { q: "Are WDA study materials good for NDA?", a: "Warriors Defence Academy provides in-house study materials specifically aligned with the latest NDA exam pattern, supplementing standard books with topic-wise notes and practice sets." },
    ]
  }
  if (t.includes("women") || t.includes("women in nda")) {
    return [
      { q: "Can women join NDA?", a: "Yes. The Supreme Court of India in 2021 directed UPSC to include women candidates in NDA. Women can now appear for NDA and join the Army, Navy and Air Force wings." },
      { q: "What is the Women Special Entry Scheme for NDA?", a: "Under the Supreme Court's direction, unmarried women aged 16.5 to 19.5 years who have passed Class 12 can apply for NDA, following the same eligibility criteria as male candidates for the respective wings." },
      { q: "What career can a woman build after NDA?", a: "Women NDA graduates are commissioned as officers in the Army, Navy or Air Force and can build careers across technical, administrative, medical and combat support roles." },
    ]
  }
  if (t.includes("salary") || t.includes("career growth")) {
    return [
      { q: "What is the salary of an NDA officer after commissioning?", a: "A newly commissioned Lieutenant in the Indian Army earns approximately ₹56,100 to ₹1,77,500 per month under the 7th Pay Commission, plus allowances for housing, ration, medical, and travel." },
      { q: "What is the career growth path after NDA?", a: "Officers progress from Lieutenant to Captain, Major, Lieutenant Colonel, Colonel, Brigadier, Major General, Lieutenant General and General. Promotions are time-based and merit-based, with opportunities for higher command roles." },
      { q: "What are the non-monetary benefits for NDA officers?", a: "Officers get fully furnished government accommodation, free medical care for the entire family, canteen facilities (CSD), education allowances for children, and retirement benefits including pension." },
    ]
  }
  if (t.includes("ncc")) {
    return [
      { q: "Does NCC certificate help in NDA selection?", a: "Yes. NCC 'C' certificate holders get a 5% relaxation in the cut-off marks in the NDA written examination, making it easier to qualify for the SSB stage." },
      { q: "Which NCC certificate gives the maximum benefit for defence exams?", a: "The NCC 'C' certificate provides the maximum benefit, including bonus marks in written exams and a higher chance of selection at SSB since NCC training already builds many OLQs." },
      { q: "Does NCC help in SSB interview?", a: "Absolutely. NCC training builds discipline, leadership, teamwork, and physical fitness — all of which are assessed in the SSB interview. NCC cadets often have a head-start at SSB." },
    ]
  }
  if (t.includes("agniveer") || t.includes("navy agniveer") || t.includes("ssr")) {
    return [
      { q: "What is the Navy Agniveer SSR entry?", a: "Navy Agniveer SSR (Senior Secondary Recruit) is a 4-year short service entry for 10+2 pass candidates to serve in the Indian Navy as Agniveers in technical and non-technical roles." },
      { q: "What is the eligibility for Navy Agniveer SSR 2026?", a: "Candidates must have passed 10+2 with Physics and Mathematics. The age bracket is generally 17.5 to 21 years (subject to notification). Both male and female candidates are eligible." },
      { q: "Can Agniveers get permanent service after 4 years?", a: "Under the Agniveer scheme, up to 25% of Agniveers in each batch may be offered permanent enrolment (Regular Cadre) in the Navy based on their performance during the 4-year tenure." },
    ]
  }
  if (t.includes("air force x") || t.includes("air force y") || t.includes("x/y group")) {
    return [
      { q: "What is Air Force X and Y Group?", a: "Indian Air Force X Group is for technical roles requiring Physics and Mathematics at 10+2, while Y Group is for non-technical administrative and logistics roles open to any stream at 10+2 level." },
      { q: "What is the exam pattern for Air Force X/Y Group?", a: "The exam consists of online tests in English, Reasoning & General Awareness (RAGA), and for X Group: Physics and Mathematics. The exam is followed by Physical Fitness Test and Medical Examination." },
      { q: "What is the salary for Air Force Airmen X Group?", a: "Air Force Airmen receive a monthly stipend during training and then full pay as per 7th Pay Commission pay matrix level, along with allowances for accommodation, ration and medical care." },
    ]
  }
  if (t.includes("life at nda") || t.includes("khadakwasla")) {
    return [
      { q: "Where is NDA located?", a: "The National Defence Academy is located at Khadakwasla, near Pune, Maharashtra. It is one of the world's largest tri-services academies." },
      { q: "How long is the NDA training?", a: "NDA training is 3 years (6 terms), followed by a Pre-Commissioning Training (PCT) of 1 year at the respective service academies — IMA, INA or AFA — before being commissioned as an officer." },
      { q: "What is a typical day like at NDA?", a: "Cadets follow a strict routine from 5 AM onwards — PT, academics, games, drills and extracurricular activities. The schedule builds discipline, physical endurance, leadership and intellectual ability." },
    ]
  }
  if (t.includes("psychological") || t.includes("tat") || t.includes("wat")) {
    return [
      { q: "What is the TAT test in SSB?", a: "TAT (Thematic Apperception Test) involves writing stories around ambiguous images. Assessors look for positive themes, initiative, and a proactive personality in the candidate's narratives." },
      { q: "What is the WAT test in SSB?", a: "WAT (Word Association Test) requires writing a sentence for 60 stimulus words in 60 seconds. The sentences reveal the candidate's thought patterns, values and emotional balance." },
      { q: "What is the SRT test in SSB?", a: "SRT (Situation Reaction Test) involves responding to 60 everyday situations in 30 minutes. Responses should be practical, positive and show leadership — not extreme or passive." },
      { q: "How to prepare for psychological tests at SSB?", a: "Build genuine positive personality traits. Write practice stories for TAT, practise WAT with varied vocabulary, and do SRT practice papers regularly. Avoid coaching that teaches memorised answers." },
    ]
  }
  if (t.includes("group discussion") || t.includes("crack group discussion")) {
    return [
      { q: "What is the Group Discussion in SSB?", a: "Group Discussion (GD) in SSB is an open-ended conversation where a group of candidates discuss a topic without a leader. Assessors observe communication, teamwork, and leadership qualities." },
      { q: "How do I stand out in SSB Group Discussion?", a: "Initiate discussion with a clear point, listen actively, encourage quieter candidates, bring the group towards a consensus, and speak clearly. Avoid dominating or remaining silent." },
      { q: "What topics come in SSB Group Discussion?", a: "Topics vary — current affairs, social issues, defence-related subjects or abstract topics. Candidates should stay updated on news and practise articulating opinions on diverse subjects." },
    ]
  }
  if (t.includes("olq") || t.includes("officer like qualities")) {
    return [
      { q: "What are OLQs in SSB?", a: "OLQs (Officer Like Qualities) are 15 qualities assessed at SSB: Effective Intelligence, Reasoning Ability, Organising Ability, Power of Expression, Social Adaptability, Cooperation, Sense of Responsibility, Initiative, Self-Confidence, Speed of Decision, Ability to Influence the Group, Liveliness, Determination, Courage, and Stamina." },
      { q: "How do I demonstrate OLQs in SSB?", a: "OLQs must be shown consistently across all SSB tests — psychological, GTO and interview. They cannot be faked; they need to be genuinely developed through practice, reading, sports, and leadership activities." },
      { q: "Which OLQs are most important in SSB?", a: "All 15 OLQs matter, but assessors pay particular attention to Effective Intelligence, Initiative, Cooperation, Self-Confidence, and Determination as they reflect core officer potential." },
    ]
  }
  if (t.includes("afcat")) {
    return [
      { q: "What is the AFCAT exam?", a: "AFCAT (Air Force Common Admission Test) is conducted twice a year for graduates to join the Indian Air Force in the Flying Branch, Ground Duty Technical Branch, and Ground Duty Non-Technical Branch as officers." },
      { q: "What is the eligibility for AFCAT 2026?", a: "Candidates must be graduates aged 20-24 years (up to 26 for certain branches). For the Flying Branch, Physics and Mathematics at 10+2 level is required." },
      { q: "What is the AFCAT exam pattern?", a: "AFCAT consists of 100 objective questions covering Verbal Ability, Numerical Ability, Reasoning, and Military Aptitude. Total time is 2 hours. There is negative marking for wrong answers." },
    ]
  }
  if (t.includes("frequently asked") || t.includes("faq")) {
    return []  // This post is itself a FAQ, don't add more
  }
  if (t.includes("current affairs")) {
    return [
      { q: "Which current affairs topics are important for NDA?", a: "Focus on Defence & Military news (acquisitions, exercises, appointments), National Affairs (government schemes, awards), International Relations, Science & Technology, and Sports." },
      { q: "How many months of current affairs should I cover for NDA?", a: "Cover at least 12 months of current affairs before the exam. For recent notifications, the last 6 months should be studied in-depth." },
      { q: "Where can I get current affairs for NDA and CDS?", a: "PIB (Press Information Bureau), The Hindu, Dainik Bhaskar (for Hindi), and monthly GK digests from reputed publishers are reliable sources. Warriors Defence Academy also provides daily current affairs sessions for its students." },
    ]
  }
  if (t.includes("board exams") || t.includes("alongside")) {
    return [
      { q: "Can I prepare for NDA and board exams together?", a: "Yes. NDA Maths and GAT largely overlap with Class 11-12 NCERT syllabus, so studying for boards simultaneously strengthens NDA preparation. Dedicate specific hours to NDA-specific practice and current affairs." },
      { q: "How many hours should I study for NDA per day alongside school?", a: "2-3 hours of dedicated NDA preparation daily is sufficient for Class 12 students — 1.5 hours for Maths, 30 minutes for English, and 30 minutes for GK/current affairs." },
    ]
  }
  if (t.includes("10 tips") || t.includes("start") || t.includes("early")) {
    return [
      { q: "When should I start preparing for NDA?", a: "Ideally from Class 10 or early Class 11. Early starters can build conceptual clarity in Maths, develop reading habits for GK, and begin physical training well before the exam." },
      { q: "What is the ideal routine for NDA preparation from Class 11?", a: "Study Maths 2 hours daily, read a newspaper for 30 minutes, do physical training for 45 minutes, and revise GK notes for 30 minutes. Increase intensity in Class 12 as the exam approaches." },
      { q: "Which subject should I focus on first for NDA?", a: "Start with Mathematics as it has the highest marks (300) and requires consistent practice. Build a strong foundation in NCERT Maths before moving to advanced practice." },
    ]
  }
  if (t.includes("difference between") || t.includes("which path")) {
    return [
      { q: "What is the difference between NDA and CDS?", a: "NDA is for Class 12 students aged 16.5-19.5 years; CDS is for graduates. NDA gives 3 years of joint training at Khadakwasla; CDS gives shorter training at service academies. Both lead to an officer commission." },
      { q: "What is the difference between NDA and AFCAT?", a: "NDA can be written after Class 12 for an officer commission in Army/Navy/Air Force. AFCAT is for graduates who want to join the Air Force only, as an officer." },
      { q: "Is Agniveer better than NDA?", a: "NDA and Agniveer are different. NDA produces permanent commissioned officers with a full career and pension. Agniveer is a 4-year short-service scheme for Jawans/Other Ranks, not officers." },
    ]
  }
  if (t.includes("nda eligibility") || t.includes("eligibility criteria")) {
    return [
      { q: "What is the age limit for NDA 2026?", a: "Candidates must be born between specific dates — typically the age range is 16.5 to 19.5 years. Check the official NDA notification for the exact date-of-birth bracket each cycle." },
      { q: "Can girls apply for NDA 2026?", a: "Yes. Following the Supreme Court's 2021 ruling, female candidates can apply for all three wings of NDA (Army, Navy, Air Force) subject to passing all written and medical standards." },
      { q: "What is the minimum height required for NDA?", a: "Minimum height requirements are approximately 157 cm for Army, 162 cm for Air Force (162.5 cm for pilots), and 157 cm for Navy. These may vary — always refer to the official notification." },
    ]
  }
  if (t.includes("3 months") || t.includes("realistic study plan")) {
    return [
      { q: "Can I crack NDA in 3 months?", a: "Yes, with focused preparation. The key is completing NCERT Maths fundamentals in month 1, intensive sectional practice in month 2, and full mock tests with SSB personality development in month 3." },
      { q: "What is the best study plan for NDA in 3 months?", a: "Month 1: NCERT Maths + English grammar. Month 2: Topic-wise practice + GK. Month 3: Full mock tests, current affairs, and physical training. Aim for 6-7 hours of study daily." },
      { q: "What score should I target in NDA written exam?", a: "A safe target is 350+ out of 900 for the written exam (cut-offs vary by year and wing). In Maths, aim for 120-150+ and in GAT aim for 250-280+." },
    ]
  }
  if (t.includes("english and general knowledge") || t.includes("gk preparation")) {
    return [
      { q: "How to prepare English for NDA?", a: "Focus on grammar (Wren & Martin), comprehension passages, vocabulary (word lists and newspaper reading), and error spotting. Attempt past NDA English papers to gauge question patterns." },
      { q: "What topics are important in NDA General Knowledge?", a: "History (Indian Modern History), Geography (India + World), Polity, Science (Physics, Chemistry, Biology basics), Current Affairs, and Defence knowledge are key for GAT." },
      { q: "How many marks does English carry in NDA?", a: "English is part of the GAT paper which carries 600 marks total. The English section alone is worth 200 marks, making it one of the highest-scoring opportunities." },
    ]
  }
  // Default FAQ for any other topics
  return [
    { q: "Which is the best NDA coaching institute in Lucknow?", a: "Warriors Defence Academy (WDA) is widely regarded as the best NDA coaching institute in Lucknow, with 5,000+ selections, retired military faculty, India's largest GTO ground, and a proven track record since 2010." },
    { q: "How can I join Warriors Defence Academy for NDA coaching?", a: "You can register online at warriorsdefenceacademy.com/register or visit our campus at 545-Ga/1 Chha, Kapoorthala Chauraha, Lucknow - 226024. Call +91 94522 45729 for counseling." },
    { q: "Does Warriors Defence Academy offer residential coaching for NDA?", a: "Yes. WDA offers both day-scholar and residential NDA coaching programmes with integrated academics, physical training, and SSB preparation under one roof." },
  ]
}

// Build metadata for all 30 posts
function buildMeta(post, index) {
  const cleanTitle = post.title.replace(/^\d+\.\s*/, "")
  const slug = slugify(post.title)
  const category = categoryFor(cleanTitle)
  const tags = tagsFor(cleanTitle, category)
  const author = authorFor(index)
  const image = pickImage(index)
  const readTime = readTimeFor(post.sections)
  const excerpt = excerptFor(post.sections, cleanTitle)

  // Published dates spread over past 6 months
  const publishedAt = new Date()
  publishedAt.setDate(publishedAt.getDate() - (29 - index) * 6)

  return {
    slug,
    title: cleanTitle,
    excerpt,
    category,
    tags,
    author,
    image,
    readTime,
    publishedAt: publishedAt.toISOString(),
  }
}

async function uploadPost(post, meta) {
  const content = buildHtml(post, meta)
  const isFeatured = [0, 5, 19].includes(rawPosts.indexOf(post)) // posts 1, 6, 20 are featured

  const row = {
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.excerpt,
    content,
    category: meta.category,
    tags: meta.tags,
    author: meta.author,
    read_time: meta.readTime,
    image_url: meta.image,
    is_featured: isFeatured,
    is_published: true,
    published_at: meta.publishedAt,
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "apikey": SUPABASE_SERVICE_KEY,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HTTP ${res.status}: ${err}`)
  }
  return true
}

async function main() {
  console.log(`Uploading ${rawPosts.length} blog posts to Supabase...\n`)

  // First, delete existing posts to avoid duplicates
  console.log("Clearing existing blog_posts...")
  const del = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?is_published=eq.true`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "apikey": SUPABASE_SERVICE_KEY,
    },
  })
  if (!del.ok) {
    console.warn("Warning: could not clear existing posts:", await del.text())
  } else {
    console.log("Cleared existing posts.\n")
  }

  let success = 0
  let failed = 0

  for (let i = 0; i < rawPosts.length; i++) {
    const post = rawPosts[i]
    const meta = buildMeta(post, i)

    try {
      await uploadPost(post, meta)
      console.log(`✓ [${i + 1}/30] ${meta.title.slice(0, 70)}`)
      success++
    } catch (err) {
      console.error(`✗ [${i + 1}/30] FAILED: ${meta.title.slice(0, 60)}`)
      console.error(`  Error: ${err.message}`)
      failed++
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(`\n=== Done: ${success} uploaded, ${failed} failed ===`)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
