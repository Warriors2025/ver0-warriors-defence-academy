/**
 * Seeds GSC-winning blog posts into Supabase (upsert by slug).
 * Run: node --env-file=.env.local scripts/seed-gsc-blog-posts.mjs
 */
import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key")
  process.exit(1)
}

const supabase = createClient(url, key)

const posts = [
  {
    slug: "ssb-oir-test-sample-questions-with-answers",
    title: "SSB OIR Test Sample Questions with Answers (PDF Practice Guide)",
    excerpt:
      "Practise SSB OIR test sample questions with answers — verbal & non-verbal reasoning, pattern, timing tips and free practice sets for Day-1 screening.",
    category: "SSB Interview",
    tags: ["SSB", "OIR", "Screening", "Reasoning", "PDF"],
    author: "Warriors Defence Academy",
    read_time: "14 min read",
    is_featured: true,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/ssb-interview.webp",
    content: `
<p>The <strong>SSB OIR test</strong> (Officer Intelligence Rating) is the first filter on Day 1 of the SSB interview. Candidates who search for <em>ssb oir previous question papers</em>, <em>oir questions for ssb</em> and <em>oir test pdf</em> need timed practice — not theory alone. This guide gives <strong>SSB OIR test sample questions with answers</strong>, pattern clarity and a practice plan used at Warriors Defence Academy, Lucknow.</p>

<h2>What is the OIR test in SSB?</h2>
<p><strong>OIR in SSB</strong> measures verbal and non-verbal intelligence under time pressure. Together with PPDT, it decides whether you stay for the remaining four days. Typical papers have 40–50 questions in about 20–30 minutes.</p>

<h2>SSB OIR test pattern</h2>
<ul>
<li><strong>Verbal:</strong> analogies, coding-decoding, series, direction sense, blood relations</li>
<li><strong>Non-verbal:</strong> figure series, classification, mirror/water images, embedded figures</li>
<li><strong>Goal:</strong> accuracy first, then speed — rushing lowers Officer Intelligence Rating</li>
</ul>

<h2>Sample verbal OIR questions with answers</h2>
<ol>
<li><strong>Q:</strong> Book : Reading :: Fork : ?<br/><strong>A:</strong> Eating (tool–function analogy)</li>
<li><strong>Q:</strong> If CAT = 24 and DOG = 26, what is BAT?<br/><strong>A:</strong> 23 (sum of alphabetic positions)</li>
<li><strong>Q:</strong> Find the odd one: 3, 5, 7, 9, 11<br/><strong>A:</strong> 9 (only composite number)</li>
<li><strong>Q:</strong> North → walk 5 km, east 3 km, south 5 km. How far from start?<br/><strong>A:</strong> 3 km east</li>
<li><strong>Q:</strong> Complete the series: 2, 6, 12, 20, 30, ?<br/><strong>A:</strong> 42 (n²+n pattern)</li>
</ol>

<h2>Sample non-verbal OIR questions (how to approach)</h2>
<ul>
<li>Count sides/lines before guessing rotation direction</li>
<li>Eliminate options that break shading or count symmetry</li>
<li>Mark doubtful items and return — unfinished easy questions cost ranking</li>
</ul>

<h2>How to practise OIR questions for SSB</h2>
<ol>
<li>One full <strong>oir sample paper</strong> daily under a 25-minute timer</li>
<li>Log mistakes by type (series, coding, figures)</li>
<li>Revise only weak types for 20 minutes the next morning</li>
<li>Take a weekend mock matching real SSB screening pressure</li>
</ol>

<h2>Free practice plan (7 days)</h2>
<p>Day 1–2 verbal series &amp; analogies · Day 3–4 coding &amp; directions · Day 5–6 non-verbal figures · Day 7 full mixed mock. Pair OIR practice with PPDT story drills for complete Stage-1 readiness.</p>

<p>Need guided mocks? Join <a href="/courses/ssb">SSB coaching in Lucknow</a> at Warriors Defence Academy — OIR batches run on campus with psychologist-led feedback. Call <a href="tel:+919452245729">+91 94522 45729</a>.</p>
`.trim(),
  },
  {
    slug: "nda-2026-exam-dates-eligibility-application-process",
    title: "NDA Exam Date 2026: Eligibility, Notification & Application Process",
    excerpt:
      "NDA exam date 2026 for NDA 1 & NDA 2 — expected schedule, eligibility, vacancies, application steps and preparation timeline for UPSC NDA aspirants.",
    category: "NDA Preparation",
    tags: ["NDA", "Exam Date 2026", "UPSC", "Eligibility"],
    author: "Warriors Defence Academy",
    read_time: "12 min read",
    is_featured: true,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/nda-guide.webp",
    content: `
<p><strong>NDA exam date 2026</strong> searches dominate defence traffic every cycle. Below is a clear, updated guide to NDA 1 and NDA 2 2026 timelines, eligibility and how to apply on the UPSC portal — plus how aspirants at Warriors Defence Academy plan batches around these dates.</p>

<h2>NDA 2026 exam date overview</h2>
<p>UPSC normally conducts two NDA exams each year. Always confirm final dates on <strong>upsc.gov.in</strong> — the table below reflects the usual calendar pattern used for planning.</p>
<ul>
<li><strong>NDA 1 2026:</strong> written exam typically in April (notification in previous December)</li>
<li><strong>NDA 2 2026:</strong> written exam typically in September (notification around May–June)</li>
<li>SSB interviews follow written results by several months</li>
</ul>

<h2>NDA eligibility 2026 (quick check)</h2>
<ul>
<li>Unmarried candidates as per latest UPSC notification</li>
<li>Age roughly 16.5–19.5 years on the notified cut-off date</li>
<li>Education: 10+2 (or appearing) with Physics &amp; Maths for Air Force/Navy wings as applicable</li>
<li>Nationality and physical standards as published in the official PDF</li>
</ul>

<h2>Application process</h2>
<ol>
<li>Read the official NDA notification PDF end-to-end</li>
<li>Register / log in on the UPSC online application portal</li>
<li>Fill Part I &amp; Part II carefully (photo, signature, preference of Academy)</li>
<li>Pay fee (if applicable) and download confirmation</li>
<li>Track admit card release closer to the <strong>nda 2026 exam date</strong></li>
</ol>

<h2>Preparation timeline before the exam</h2>
<p>If your target is the next NDA paper, lock Mathematics + GAT daily targets now, add weekly full mocks, and keep SSB basics (OIR, communication) running in parallel. Residential aspirants often choose <a href="/courses/nda">NDA coaching in Lucknow</a> for disciplined schedules.</p>

<p>For girls’ entry, hostel batches and foundation pathways, see <a href="/courses/nda-foundation">NDA foundation coaching after 10th</a> or call <a href="tel:+919452245729">+91 94522 45729</a>.</p>
`.trim(),
  },
  {
    slug: "significance-of-all-badges-of-indian-army-best-defence-coaching-in-lucknow",
    title: "Indian Army Badges Explained: Meaning of All Badges & Ranks",
    excerpt:
      "Complete guide to Indian Army badges — ranks, proficiency badges and medals explained for defence aspirants and GK preparation.",
    category: "Defence GK",
    tags: ["Indian Army", "Badges", "Ranks", "GK"],
    author: "Warriors Defence Academy",
    read_time: "11 min read",
    is_featured: true,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/nda-guide.webp",
    content: `
<p>Searches for <strong>indian army badges</strong>, <em>badges of indian army</em> and <em>all badges of indian army</em> are common among NDA/CDS aspirants preparing General Knowledge and SSB lecturettes. This guide explains what major badges signify and why they matter in uniform culture.</p>

<h2>Why army badges matter</h2>
<p>Badges communicate rank, appointment, skill and gallantry at a glance. Officers and JCOs/ORs wear combinations that reflect responsibility — useful knowledge for interviews and current-affairs answers.</p>

<h2>Rank badges (commissioned officers — overview)</h2>
<ul>
<li>Lieutenant → Captain → Major → Lieutenant Colonel → Colonel</li>
<li>Brigadier → Major General → Lieutenant General → General</li>
<li>Stars, national emblem and crossed baton/sword mark seniority</li>
</ul>

<h2>Other badge categories aspirants should know</h2>
<ul>
<li><strong>Proficiency / skill badges:</strong> mark specialised training (e.g., weapons, para, mountain warfare — exact wear rules follow Dress Regulations)</li>
<li><strong>Formation signs &amp; shoulder titles:</strong> identify unit / regiment identity</li>
<li><strong>Medals &amp; decorations:</strong> gallantry and service ribbons worn above the left pocket</li>
</ul>

<h2>Study tip for NDA GAT &amp; SSB</h2>
<p>Memorise the officer rank ladder first, then gallantry awards (PVC, MVC, VrC, SC, KC). Use flashcards of <strong>indian army badges list</strong> photos — visual recall beats rote lists in the exam hall.</p>

<p>Training at <a href="/">best NDA coaching in Lucknow</a> includes defence GK modules covering uniforms, ranks and awards. Visit Warriors Defence Academy or call <a href="tel:+919452245729">+91 94522 45729</a>.</p>
`.trim(),
  },
  {
    slug: "list-of-indian-military-aircraft",
    title: "List of Indian Military Aircraft & IAF Fighter Jets (Updated)",
    excerpt:
      "Indian Air Force aircraft list and fighter jets — fighters, transports, helicopters and trainers every defence aspirant should know for GK and AFCAT/NDA.",
    category: "Defence GK",
    tags: ["IAF", "Aircraft", "Fighter Jets", "AFCAT"],
    author: "Warriors Defence Academy",
    read_time: "10 min read",
    is_featured: true,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/nda-guide.webp",
    content: `
<p>This <strong>indian air force aircraft list</strong> helps aspirants answering queries like <em>indian air force fighter planes list</em>, <em>how many fighter jets does india have</em> and AFCAT/NDA defence awareness questions. Inventories change with inductions — use official MoD/IAF releases for exact fleet counts.</p>

<h2>Fighter / combat aircraft (commonly cited)</h2>
<ul>
<li>Su-30MKI · Rafale · Tejas (LCA) · MiG-29 · Mirage 2000 · Jaguar (phasing plans evolve)</li>
</ul>

<h2>Transport, AWACS &amp; tankers</h2>
<ul>
<li>C-17 Globemaster · C-130J · Il-76 · An-32 · AEW&amp;C platforms · Flight refuellers as inducted</li>
</ul>

<h2>Helicopters</h2>
<ul>
<li>Apache · Chinook · Dhruv · Rudra · Mi-17 series · Light utility types</li>
</ul>

<h2>Trainers</h2>
<ul>
<li>Basic, intermediate and advanced trainers used in IAF flying training establishments</li>
</ul>

<h2>Exam tip</h2>
<p>For <strong>indian air force fighter jets list</strong> questions, remember role (air superiority / multirole), country of origin and indigenous programmes (Tejas, AMCA roadmap). Pair this article with current affairs weekly.</p>

<p>Prefer structured AFCAT / NDA GAT classes? Explore courses at <a href="/courses">Warriors Defence Academy Lucknow</a>.</p>
`.trim(),
  },
  {
    slug: "agniveer-recruitment-2026-complete-guide-to-army-navy-air-force-eligibility-exam-pattern-preparation",
    title: "Agniveer Recruitment 2026: Army, Navy & Air Force Complete Guide",
    excerpt:
      "Agniveer recruitment 2026 guide — vacancy updates, eligibility, exam pattern and preparation tips for Army, Navy and Air Force Agniveer entries.",
    category: "Agniveer",
    tags: ["Agniveer", "Recruitment 2026", "Army", "Navy", "Air Force"],
    author: "Warriors Defence Academy",
    read_time: "13 min read",
    is_featured: true,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/physical-fitness.webp",
    content: `
<p><strong>Agniveer recruitment 2026</strong> attracts huge search demand (<em>agniveer vacancy 2026</em>, <em>agniveer notification 2026</em>). This complete guide covers Army, Navy and Air Force pathways so you can act fast when the official notification drops.</p>

<h2>What is Agniveer?</h2>
<p>Agniveer is a short-term engagement model for youth joining the Indian Armed Forces with training, allowances and a Seva Nidhi package on completion — subject to service rules in the latest notification.</p>

<h2>Where to check Agniveer vacancy 2026</h2>
<ul>
<li>Indian Army: joinindianarmy.nic.in</li>
<li>Indian Navy: joinindiannavy.gov.in</li>
<li>Indian Air Force: agnipathvayu.cdac.in / IAF career portals</li>
</ul>

<h2>Typical selection stages</h2>
<ol>
<li>Online application when notification opens</li>
<li>Written / CEE as applicable per service</li>
<li>Physical Fitness Test &amp; Physical Measurement Test</li>
<li>Medical examination &amp; document verification</li>
</ol>

<h2>Preparation focus</h2>
<ul>
<li>Maths, GK and reasoning for written papers</li>
<li>Running, push-ups, sit-ups — match the published PFT standards</li>
<li>For Navy SSR/AA aspirants, swimming confidence helps long-term</li>
</ul>

<p>Warriors Defence Academy offers <a href="/courses/navy-agniveer">Navy Agniveer coaching in Lucknow</a> with written + physical batches. Call <a href="tel:+917081011964">+91 70810 11964</a> for 2026 notification alerts.</p>
`.trim(),
  },
  {
    slug: "latest-lecturette-topics-for-ssb-2026-with-answers",
    title: "Lecturette Topics for SSB with Answers (2026 Updated List)",
    excerpt:
      "Latest lecturette topics for SSB with answers — structure, 3-minute speaking framework and trending 2026 topics for GTO practice.",
    category: "SSB Interview",
    tags: ["SSB", "Lecturette", "GTO", "2026"],
    author: "Warriors Defence Academy",
    read_time: "12 min read",
    is_featured: false,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/ssb-interview.webp",
    content: `
<p>Candidates searching <strong>lecturette topics for ssb with answers</strong> need a speaking framework more than memorised essays. In GTO, you get ~3 minutes to prepare and ~3 minutes to speak on one of four cue-card topics.</p>

<h2>How to structure any SSB lecturette</h2>
<ol>
<li>Definition (20 sec)</li>
<li>Why it matters for India / Armed Forces (40 sec)</li>
<li>2–3 points with examples (90 sec)</li>
<li>Balanced conclusion + way forward (30 sec)</li>
</ol>

<h2>Trending lecturette topics for SSB 2026</h2>
<ul>
<li>Artificial Intelligence in defence</li>
<li>Women in the Armed Forces</li>
<li>Agnipath scheme — opportunities &amp; challenges</li>
<li>Cyber security and national security</li>
<li>India’s neighbourhood first policy</li>
<li>Climate change and disaster response by Armed Forces</li>
<li>Atmanirbhar Bharat in defence manufacturing</li>
<li>Sports and youth development</li>
<li>Social media: boon or bane</li>
<li>Unity in diversity</li>
</ul>

<h2>Sample mini-answer: AI in defence</h2>
<p>Define AI → battlefield uses (ISR, logistics, training sims) → ethics &amp; human control → conclude that AI augments, not replaces, the soldier.</p>

<p>Practise daily on camera. For live GTO lecturette drills, join <a href="/courses/ssb">best SSB coaching in Lucknow</a> at Warriors Defence Academy.</p>
`.trim(),
  },
  {
    slug: "100-ssb-wat-negative-words-with-answers",
    title: "100 SSB WAT Negative Words with Answers (Practice Set)",
    excerpt:
      "SSB WAT negative words with answers — turn fear, fail, death and similar cues into officer-like, positive responses for psychology practice.",
    category: "SSB Interview",
    tags: ["SSB", "WAT", "Psychology", "OLQ"],
    author: "Warriors Defence Academy",
    read_time: "15 min read",
    is_featured: false,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/ssb-interview.webp",
    content: `
<p>The Word Association Test flashes words for ~15 seconds each. Searches for <strong>ssb wat negative words with answers</strong> show aspirants struggle most with fear, fail, death, enemy and similar cues. Your response must stay natural, positive and officer-like — never theatrical.</p>

<h2>How to handle negative WAT words</h2>
<ul>
<li>Acknowledge reality without despair</li>
<li>Show duty, courage, learning or teamwork</li>
<li>Keep language simple — 1 short sentence is enough</li>
</ul>

<h2>Sample negative words with model responses</h2>
<ul>
<li><strong>Fear</strong> — Fear is overcome by preparation and rehearsal.</li>
<li><strong>Fail</strong> — Failure teaches a better method for the next attempt.</li>
<li><strong>Death</strong> — Soldiers honour martyrs by serving with discipline.</li>
<li><strong>Enemy</strong> — The enemy is defeated by superior training and unity.</li>
<li><strong>Weak</strong> — Weak areas improve through honest practice.</li>
<li><strong>Angry</strong> — Anger is controlled before decisions are taken.</li>
<li><strong>Lazy</strong> — Laziness ends when a clear routine begins.</li>
<li><strong>Dark</strong> — Darkness is crossed with teamwork and night training.</li>
<li><strong>Poverty</strong> — Education and hard work reduce poverty.</li>
<li><strong>War</strong> — War demands readiness so that peace is protected.</li>
</ul>

<p>Expand your own list to 100 words using the same pattern. Combine WAT practice with TAT and SRT in our <a href="/courses/ssb">SSB interview training</a> batches in Lucknow.</p>
`.trim(),
  },
  {
    slug: "list-of-drones-used-by-indian-armed-forces",
    title: "List of Drones Used by Indian Armed Forces",
    excerpt:
      "Drones used by Indian Armed Forces — key UAV types for Army, Navy and Air Force aspirants preparing defence GK.",
    category: "Defence GK",
    tags: ["Drones", "UAV", "Armed Forces", "GK"],
    author: "Warriors Defence Academy",
    read_time: "8 min read",
    is_featured: false,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/nda-guide.webp",
    content: `
<p>Aspirants often search for a <strong>list of drones used by indian armed forces</strong> for NDA/CDS/AFCAT GK. Indian services operate a mix of imported and indigenous UAVs for surveillance, targeting support and training — exact inventories evolve with new contracts.</p>
<ul>
<li>Searcher / Heron class MALE UAVs (roles: ISR)</li>
<li>Indigenous programmes under Make in India / iDEX ecosystem</li>
<li>Switch / loitering munition categories discussed in open sources</li>
<li>Naval and IAF-specific UAV roles for maritime and air surveillance</li>
</ul>
<p>For exam answers, focus on <em>role</em> (ISR vs strike support) rather than unverified numbers. Study weekly current affairs for new inductions.</p>
`.trim(),
  },
  {
    slug: "different-types-of-indian-navy-uniforms",
    title: "Different Types of Indian Navy Uniforms Explained",
    excerpt:
      "Indian Navy uniform types — ceremonial, working and seasonal dress overview for defence exam GK and SSB awareness.",
    category: "Defence GK",
    tags: ["Indian Navy", "Uniforms", "GK"],
    author: "Warriors Defence Academy",
    read_time: "7 min read",
    is_featured: false,
    is_published: true,
    published_at: new Date().toISOString(),
    image_url: "/images/blog/nda-guide.webp",
    content: `
<p>Queries like <strong>different types of indian navy uniforms</strong> and <em>indian navy uniform types</em> appear often in defence GK prep. Officers and sailors wear ceremonial, ceremonial white, working rig and seasonal variations as per Navy dress regulations.</p>
<ul>
<li>Ceremonial / formal occasions</li>
<li>Working dress for ship and shore duties</li>
<li>Seasonal adaptations (summer / winter)</li>
<li>Rank insignia on sleeves or shoulders depending on dress</li>
</ul>
<p>Remember: never invent regulations — cite official Navy publications when possible. Visit <a href="/gallery">Warriors Defence Academy photos</a> to see training culture on campus.</p>
`.trim(),
  },
]

const { data, error } = await supabase.from("blog_posts").upsert(posts, {
  onConflict: "slug",
  ignoreDuplicates: false,
})

if (error) {
  console.error(error)
  process.exit(1)
}

console.log(`Upserted ${posts.length} GSC blog posts`)
console.log(posts.map((p) => p.slug).join("\n"))
