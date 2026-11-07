# Sora Films website — CHANGELOG

Live site: https://mranonin.github.io/sora-films/
Repo: https://github.com/MrAnonin/sora-films (branch `main`)

## Phase 3 — Structure, SEO & language (2026-11-08)

- **3.16 Real pages instead of hash routing:** the site is no longer one
  file with `#/page` sections. Each page is now a real address with its own
  title, meta description and canonical: `/` (Home), `/about/`, `/services/`,
  `/packages/`, `/gallery/`, `/contact/`, `/terms/` (the 14 Terms & Policies),
  `/faq/` (the 8 questions, moved out of Contact — Contact now links to it).
  The shared styling lives in `assets/css/style.css` and the shared
  JavaScript in `assets/js/main.js`; page-specific features are guarded so
  the one script runs safely on every page (the old hash router is gone).
  Old `#/page` links redirect to the new pages automatically (including
  `#/contact/faq` → `/faq/` and `#/packages/essential` →
  `/packages/#essential`). Also added: `404.html` (noindex), `sitemap.xml`
  (13 URLs) and `robots.txt`. Each page has exactly one `<h1>`. No colours,
  content, prices, phone numbers or booking flows changed.
- **3.17 Search-engine details (JSON-LD):** a `Photographer` / LocalBusiness
  block on Home (name, Pantnagar address, geo 24.7624937, 85.002881, phones,
  sorafilms25@gmail.com, price range from the real packages, Instagram +
  YouTube, the 13 districts served) and an `FAQPage` block on the FAQ page
  with all 8 questions and answers. No `aggregateRating` or review markup
  (there are no real reviews on the site yet) and no opening hours (not
  confirmed by the client).
- **3.18 Local SEO copy:** the About page now names the places we shoot —
  Gaya Ji, Bodh Gaya, Rajgir, Nalanda, Patna, Aurangabad and the surrounding
  districts — and the FAQ travel answer already lists the full 100 km
  coverage including Bihar Sharif. Every photo's alt text was audited: all
  content images have descriptive alt text (the lightbox image's alt is set
  by the script when it opens, which is correct for a dynamic image).
- **3.19 Hindi toggle:** a हिंदी / English button in the header on every
  page. It translates the navigation, hero, services strip, section
  headings, date checker, enquiry form, the 8 FAQ questions and answers,
  and the footer — 60 strings in `SORA_I18N` in `assets/js/main.js`. The
  choice is remembered (localStorage) and the page language follows it.
  The WhatsApp messages the visitor sends (enquiry, Package Finder, custom
  builder, date checker) are also written in the language they chose.
  **The Hindi wording is a first translation — please review it before
  launch; any correction is a one-line change in `SORA_I18N`.**
- **3.20 Real Weddings + gallery filters:** a Real Weddings listing page
  (`/real-weddings/`) and three story templates (`/real-weddings/story-1/`,
  `story-2/`, `story-3/`), all marked `[CLIENT TO PROVIDE]`. They are
  **hidden from the main navigation** until real couples' stories and
  photos are supplied. The Gallery page now has category filters — All,
  Wedding, Pre-Wedding, Engagement, Drone — with the 8 photos tagged by
  category; the Drone filter shows a short note until drone photos exist.
  (Note: filtering the grid does not yet filter the lightbox's next/previous
  navigation — a known small limitation.)
- **3.21 About page:** a "Meet the Team" section (three photo slots) and
  an "Our Studio Story" paragraph, both marked `[CLIENT TO PROVIDE]` —
  replace them with real team members and the studio's story in its own
  words.

No colours, content, prices, phone numbers or booking flows changed in
Phase 3, except the items above.

## Phase 2 — Performance, trust & leads (2026-11-08)

- **2.7 Images moved out of the file:** all 9 unique photos are now
  separate files in `assets/img/` (WebP first, JPEG fallback, plus a 480 px
  variant for small screens), each used once instead of being embedded up
  to 4 times. Every `<img>` now has width/height (no layout shift),
  `loading="lazy"` below the fold and `fetchpriority="high"` on the hero
  only. The logo is one shared file (`logo.png`, 82 KB → 11 KB) used in the
  header, footer and favicon. The gallery lightbox keeps working — gallery
  images use plain `<img srcset>` (JPEG) so the lightbox wrap code is
  untouched; all other images get WebP. `index.html` shrank from
  2,037,789 bytes to ~249 KB. The 3 remaining `data:` URIs are the tiny
  SVG mandala patterns in the CSS, not photos. The <500 KB homepage
  initial-transfer target is met for the page itself (HTML ~249 KB, hero
  photo 46 KB WebP, logo 11–14 KB); a full Lighthouse run is still to be
  recorded — see the final report.
- **2.8 Showreel:** a "Watch Our Showreel" section is built on Home (after
  the featured-work section) with a lite YouTube embed — thumbnail first,
  the iframe loads only when the visitor presses play. The URL lives in
  `SORA_CONFIG.showreelUrl`; the section stays hidden until a link is set.
  **[CLIENT TO PROVIDE] showreel YouTube link.**
- **2.9 Testimonials:** cards are fed from one array,
  `SORA_CONFIG.testimonials` (currently empty — only real client reviews,
  name/place/event/package/text, optional 1–5 rating and photo). While it
  is empty, the page keeps its current "Review Us on Google" and "Share
  Your Experience" cards; when reviews are added, the cards render plus a
  "Read our reviews on Google" badge linking to the studio's Google
  listing. No rating is shown unless the client actually gave one.
  **[CLIENT TO PROVIDE] real client reviews.**
- **2.10 Instagram strip:** the Gallery strip is renamed "From Our
  Gallery" — the photos are the studio's own gallery photos, and the text
  no longer claims they came from Instagram. All six alt texts fixed to
  plain descriptions. The "Follow @the.sorafilms on Instagram" link stays.
- **2.11 Lead capture:** on enquiry submit, the site POSTs the enquiry to
  `SORA_CONFIG.leadCaptureEndpoint` (Google Apps Script → Sheet, or
  Formspree) before opening WhatsApp, with a 4-second cap so a slow
  endpoint never blocks the visitor. Empty or failing endpoint falls back
  silently to the current WhatsApp behaviour. Setup is in the README.
  **[CLIENT TO PROVIDE] Apps Script / Formspree endpoint.**
- **2.12 Availability calendar:** the date checker reads
  `assets/data/booked-dates.json` (currently an empty list) and tells
  visitors a picked date is already booked, suggesting another date or a
  WhatsApp message. Final confirmation is still on WhatsApp. The README
  explains how to update the list.
  **[CLIENT TO PROVIDE] booked dates.**
- **2.13 Delivery & payment clarity:** the booking-steps card and the FAQ
  delivery/advance answers now give typical timelines and advance as
  `[CLIENT TO CONFIRM]` placeholders (highlight video [X] days, full
  video & album [Y] weeks, advance [Z]%). The 14 Terms & Policies keep
  their exact wording — term 5 still reads "confirmed in your quotation".
  **[CLIENT TO CONFIRM] usual delivery weeks and advance %.**
- **2.14 Package comparison table:** a Silver / Gold / Platinum comparison
  table sits after the wedding package cards, built from the real card
  inclusions (videographer/cinematographer, photographer, drone days,
  album, video, reels, frames, free gift). On mobile it becomes stacked
  cards. "Most Popular" stays on Royal; no "Most Booked" badge was added
  (unconfirmed which package is most booked).
- **2.15 Policies page:** the 14 terms are now an accessible
  `<details>`/`<summary>` accordion with an "Expand all" / "Collapse all"
  button. The wording of every term is unchanged (verified verbatim).

No colours, content, prices, phone numbers or booking flows changed in
Phase 2, except the items above.

## Fix — Package Finder quiz left-edge clipping (2026-11-08)

- The live check found the quiz panel's heading, question numbers and the
  "Show My Package" button cut off at the panel's left border. Cause: the
  quiz reuses the `.custom-box` two-column grid but has no
  `.custom-main` wrapper, so its content sat flush against the border
  (the "Customize Your Package" builder is unaffected — it has its own
  padded columns). Fix: the quiz is now a single column with the same
  32 px padding the builder uses (20 px on phones). The quiz logic and
  content are unchanged, and the result (Wedding / 2 days / "A good balance"
  → Gold ₹42,000) was re-verified live.

## Phase 1 — Quick wins (2026-11-08)

- **1.1 Link preview (og:image):** the preview image is now a real file,
  `assets/img/og-image.jpg` (1200×630, 93 KB, from the hero photo), served at
  its absolute URL. The old base64 data-URI preview (which WhatsApp and
  Facebook could not read) is gone. Added `og:url`, `og:image:width`,
  `og:image:height`, `og:image:alt`, `twitter:image` and `twitter:image:alt`.
  File size dropped ~78 KB as a side effect.
- **1.2 Floating contact buttons:** the floating WhatsApp button already
  existed on desktop, so instead of duplicating it it is now discreet on
  desktop (48 px, no pulse ring). Mobile gets a floating click-to-call
  button (`tel:+919155104962`) stacked above the WhatsApp button. Both
  floats hide when the photo lightbox is open and fade out when the footer
  scrolls into view, so they never cover the lightbox or footer content.
- **1.3 Analytics:** a single `SORA_CONFIG` block near the end of
  `index.html` holds the analytics ID (empty until the studio provides one —
  nothing loads, nothing is tracked). Supports Plausible (default) or GA4.
  Events tracked: `whatsapp_click` (with package name), `call_click`,
  `email_click`, `enquiry_form_submit`, `package_finder_completed`,
  `datecheck_submit`.
- **1.4 Form validation:** the enquiry form, date checker and custom package
  builder now validate before opening WhatsApp: name is required (enquiry
  form and custom builder), phone must be a valid 10-digit Indian mobile
  when given, dates must be today or later (date pickers also block past
  dates). Errors appear under the field, the first bad field is focused,
  and confirmations appear in an `aria-live` region. Nothing else changed —
  the same WhatsApp / email flows, same messages.
- **1.5 Muhurat strip:** dates now live in one config object
  (`SORA_CONFIG.muhurat`: year, label, note, lastDate). The strip is drawn
  from it and hides itself automatically after the last date passes.
  **The studio must verify each season's dates against a panchang.**
- **1.6 Homepage section order:** the order is now fixed directly in the
  HTML — the `refineSoraHome()` runtime reordering (which caused layout
  shift) is removed, and the mobile quick-action bar is in the HTML instead
  of being injected by JavaScript. Final order: hero, services strip,
  marquee, muhurat strip, welcome, explore, packages links, date check,
  booking steps, about, reviews, FAQ, contact.

No colours, content, prices, phone numbers or booking flows changed in
Phase 1.

## Earlier

- 2026-11-08 — Reference-inspired design (hero photo full-bleed, gold
  eyebrow, gold WhatsApp buttons, maroon services strip, restyled packages
  header) + fix for the hero photo covering the headline.
- 2026-11-08 — Hero ratios for a balanced full-screen view; full-screen hero
  only, rest back to the centred 1180 px column.
- 2026-11-07 — White-beige backgrounds; dark-mode fix (site stays
  white-beige even on phones in dark mode); background texture made more
  visible; full-width layout tried and reverted.
- 2026-11-06 — Package Finder quiz; email enquiry option
  (sorafilms25@gmail.com confirmed as the only email).
- 2026-10-30 — First deploy to MrAnonin/sora-films on GitHub Pages;
  printable Booking Contract (`contract.html`).
- 2026-10-28 — New base: the Maharaja Palace file uploaded by the studio.
