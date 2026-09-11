# SEO Keyword Map — Warriors Defence Academy

Track **which page targets which keywords**. Update this file (and `keyword-map.csv`) whenever you assign or change target keywords for any page.

## How to use

1. Pick **one primary keyword** per page (no two pages share the same primary).
2. Add related secondary keywords (variations / long-tails).
3. Reflect the same primary in: title, H1, first 100 words, meta description, and focusKeyword in CMS/SEO.
4. Update `last_updated` and set `status` to `optimized` after on-page work ships.

## Homepage cluster (2026-09-09)

| Keyword | Role | Placement |
|---|---|---|
| best nda coaching in india | Primary | Title, H1, meta, FAQ, schema |
| best nda coaching | Secondary | Title prefix, meta, body, schema |
| nda coaching | Secondary / broad | Tagline, FAQ answers, schema knowsAbout |
| top nda coaching in india | Secondary | Meta, H2 (stats), FAQ, schema |

## Page → keyword sheet

See machine-readable source: [`keyword-map.csv`](./keyword-map.csv)

| Page | Path | Primary keyword | Secondary keywords | Status |
|---|---|---|---|---|
| Homepage | `/` | best nda coaching in india | best nda coaching; nda coaching; top nda coaching in india; best nda coaching in lucknow | optimized |
| About | `/about` | warriors defence academy lucknow | best nda coaching in lucknow; defence academy india | mapped |
| Courses | `/courses` | nda coaching courses lucknow | nda coaching; cds coaching lucknow; ssb interview coaching | mapped |
| Contact | `/contact` | warriors defence academy contact lucknow | nda coaching lucknow address | mapped |
| Results | `/results` | nda coaching results lucknow | nda selections; ssb success rate | mapped |
| Admissions | `/admissions` | nda coaching admission lucknow 2026 | nda coaching admission 2026 | mapped |
| Register | `/register` | register nda coaching lucknow | nda coaching registration | mapped |
| Blog | `/blog` | nda exam preparation tips | nda exam tips; ssb interview tips | mapped |
| Gallery | `/gallery` | warriors defence academy campus lucknow | gto ground photos | mapped |
| Facilities | `/facilities` | warriors defence academy facilities lucknow | gto ground lucknow | mapped |

## Rules

- Never cannibalize: do not make another page’s primary the same as Homepage’s primary cluster above.
- Local variants (`…in lucknow`) may appear on Homepage as secondary, but own primary local pages should deepen local intent.
- After every SEO content change, update this sheet in the same PR/commit.
