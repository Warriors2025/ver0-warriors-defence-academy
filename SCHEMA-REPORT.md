# Schema Report — Warriors Defence Academy (Next.js app)

Validated 2026-10-10 against the rendered HTML of the app (local server) using the claude-seo schema rules.
Checks: JSON parses, one `application/ld+json` tag per page, every `@id` reference resolves, no stale NAP/rating.

| Page | Types in @graph | Status | Notes |
|---|---|---|---|
| / | Org(EducationalOrganization+LocalBusiness), WebSite, WebPage, FAQPage | ✅ | FAQPage = info only (Google retired FAQ rich results May 2026); kept for AI search |
| /about | Org, WebSite, AboutPage+WebPage | ✅ | |
| /courses | Org, WebSite, WebPage, ItemList (9 courses) | ✅ | |
| /courses/{slug} | Org, WebSite, WebPage, BreadcrumbList, Course (+CourseInstance) | ✅ | Add real fee/start date to enrich later |
| /contact | Org, WebSite, ContactPage+WebPage | ✅ | |
| /blog/{slug} | Org, WebSite, WebPage, BreadcrumbList, BlogPosting | ✅ | dateModified = datePublished until CMS stores edit date |
| /mentors/{slug} | Org, WebSite, ProfilePage, Person, BreadcrumbList | ✅ | |
| /best-nda-coaching-in-india, /results, /admissions, /blog, /mentors | Org, WebSite, WebPage (+FAQPage/ItemList) | ✅ | |

## Fixed
- Removed root-layout schema with wrong address (123 Defence Colony, 226001), wrong email, guessed social URLs and an unsupported AggregateRating (4.9 / 2,500).
- One shared Organization node (`buildOrganizationNode`) referenced by `@id` everywhere.
- Removed invalid `numberOfStudents`; added ContactPoint.

## Open items (need real data / human action)
- Rich Results Test and Search Console require the public domain; `warriorsdefenceacademy.com` currently serves a WordPress site, not this app.
- Add genuine reviews (with source) before adding AggregateRating.
- Match Google Business Profile NAP to the schema exactly.
- Ranking cannot be guaranteed by schema; it is a eligibility/clarity signal.
