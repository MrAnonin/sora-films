# Sora Films — Official Website

Traditional Indian wedding look website for **Sora Films**, Gaya Ji, Bihar —
wedding photography, cinematic films, engagement, pre-wedding, events,
drone coverage, premium albums and video editing.

**Tagline:** We Capture Moments, You Cherish Forever
**Studio:** Pantnagar, Gaya Ji, Bihar 823001
**Contact:** +91 9155104962 · +91 7782929879 · sorafilms25@gmail.com
**Social:** Instagram & YouTube — @the.sorafilms
**Live site:** https://mranonin.github.io/sora-films/
**Repository:** https://github.com/MrAnonin/sora-films (branch `main`, root)

## Files in this repository

- `index.html` — the Home page (`/`). Each section of the site is now its
  own real page (Phase 3): `about/`, `services/`, `packages/`, `gallery/`,
  `contact/`, `terms/` (the 14 Terms & Policies), `faq/` (the 8 questions),
  `real-weddings/` (hidden until real stories are ready). Old `#/page` links
  redirect to the new pages automatically. Shared styling lives in
  `assets/css/style.css` and shared JavaScript in `assets/js/main.js`.
- `contract.html` — printable Booking Contract (Marriage/Wedding, Engagement,
  Birthday, Pre-Wedding, Other), linked from the footer as "Booking Contract".
- `assets/css/style.css` — all of the site's styling, shared by every page.
- `assets/js/main.js` — all of the site's JavaScript, shared by every page:
  the `SORA_CONFIG` block (analytics, muhurat, showreel, testimonials, lead
  capture), the enquiry/quiz/builder/date-checker handlers, the lightbox,
  the gallery filters and the Hindi toggle (`SORA_I18N` translations).
- `assets/img/` — all photos as separate files: each photo as `.jpg` and
  `.webp` (WebP first, JPEG fallback), plus a 480 px variant for small
  screens; `logo.png` is the one shared logo (header, footer, favicon),
  `og-image.jpg` is the 1200×630 link-preview image.
- `assets/data/booked-dates.json` — the list of booked dates
  (`YYYY-MM-DD`). The date checker reads it and marks those dates
  unavailable. Edit the list, nothing else.
- `sitemap.xml` / `robots.txt` / `404.html` — search-engine sitemap,
  crawler rules and the "Page Not Found" page.
- `.nojekyll` — tells GitHub Pages to serve the files as-is.
- `README.md` — this file. `CHANGELOG.md` — what changed, phase by phase.

## How to edit things (no code knowledge needed — ask Muse)

Everything below is edited in `assets/js/main.js` (for settings) or in the
page that shows it (for text). Search for the exact text in quotes.

- **Prices:** the six packages are in the Packages page. Wedding packages:
  Silver ₹30,000, Gold ₹42,000, Platinum ₹59,999. Essential Collections:
  Classic ₹20,000, Signature ₹23,000, Royal ₹25,000. Change the price in the
  package card **and** in the Package Finder quiz (`PF_PACKAGES`), the
  comparison table and the Booking Contract dropdown (`contract.html`) so
  all four match.
- **Muhurat dates:** one place — the `SORA_CONFIG` block in
  `assets/js/main.js` (`muhurat: { year, label, note, lastDate }`). The strip
  on the homepage is drawn from it and hides itself automatically after
  `lastDate`. **Verify every new set of dates against a panchang before
  publishing.**
- **Analytics:** one place — `SORA_CONFIG.analyticsId`. Put your Plausible
  domain (e.g. `sorafilms.in`) or GA4 measurement ID (e.g. `G-XXXXXXX`) there
  and set `analyticsProvider` to `"plausible"` or `"ga4"`. Leave it empty and
  no analytics script loads at all. Tracked events: `whatsapp_click`
  (with package name), `call_click`, `email_click`, `enquiry_form_submit`,
  `package_finder_completed`, `datecheck_submit`.
- **Showreel video:** `SORA_CONFIG.showreelUrl` — paste the YouTube link
  there. The showreel section is built but hidden until a link is set; once
  set, visitors see a thumbnail and the video loads only when they press
  play (so it never slows the page down).
- **Testimonials:** `SORA_CONFIG.testimonials` — an array of real client
  reviews. Each one: `{ name, place, event, package, text, rating (1–5, optional),
  photo (optional) }`. Only real reviews, in the client's own words. While
  the list is empty, the page keeps its current "Review Us on Google" and
  "Share Your Experience" cards.
- **Lead capture (save enquiries to a sheet):** `SORA_CONFIG.leadCaptureEndpoint`
  — paste a Google Apps Script web-app URL or a Formspree endpoint there.
  On enquiry submit, the site POSTs the enquiry (name, phone, event type,
  date, package, message) to that endpoint and then opens WhatsApp as
  usual. If the endpoint is empty or fails, WhatsApp still opens — nothing
  is ever lost. To set up the sheet: create a Google Sheet, add a small
  Apps Script that appends each POST to a row, deploy it as a web app
  ("Execute as: Me", "Who has access: Anyone"), and paste the web-app URL
  here.
- **Booked dates (availability calendar):** `assets/data/booked-dates.json`
  — add booked dates as `YYYY-MM-DD` strings in the `booked` list, e.g.
  `["2026-11-21", "2026-12-02"]`. The date checker reads this file and
  tells visitors that date is already booked. Leave the list empty when
  nothing is booked.
- **Delivery timelines & advance %:** there is no standard figure on the
  site yet — the FAQ and the booking-steps card show
  `[CLIENT TO CONFIRM]` placeholders (highlight video [X] days, full
  video & album [Y] weeks, advance [Z]%). Tell Muse your usual delivery
  weeks and usual advance % and the placeholders will be replaced.
- **Hindi toggle:** the header has a हिंदी / English toggle. The
  translations live in `SORA_I18N` in `assets/js/main.js` (nav, hero,
  services, headings, date checker, enquiry form, FAQ, footer) and the
  WhatsApp messages in `MSG` in the same file. **Please review the Hindi
  wording before launch** — it is a first translation, and any correction
  is a one-line change in `SORA_I18N`.
- **Real Weddings stories:** `real-weddings/` — a listing page plus three
  story templates (`story-1/`, `story-2/`, `story-3/`), all marked
  `[CLIENT TO PROVIDE]`. Replace the placeholders with real couples
  (names, place, package, a few lines, photos) and link the listing page
  from the main navigation — it is hidden from the nav until real stories
  are ready.
- **Team & studio story:** the About page has a "Meet the Team" section
  (three photo slots) and an "Our Studio Story" paragraph, both marked
  `[CLIENT TO PROVIDE]`. Replace them with real team members and the
  studio's story in the studio's own words.

## Deploy / updating

The site is already live on GitHub Pages (repo above, branch `main`, root).
To update: replace `index.html` (and any new file in `assets/`) in the
repository — GitHub Pages republishes automatically, usually within a minute
or two. **Note:** a fresh load can briefly show the previous version
(GitHub Pages caching) — reload once or open a fresh tab before assuming an
update did not land. The old repository `sorafilms25studio/sora-films-website`
is left untouched.

## Later: custom domain + hosting

- Buy a domain (e.g. sorafilms.in) from any registrar.
- To use it with GitHub Pages: add the domain under **Settings → Pages →
  Custom domain** and create the DNS records GitHub shows at your registrar.
- To move to paid hosting instead: upload the same files to the hosting
  account's public folder (`public_html` / `www`) — no build step needed.

## Ground rules (from the studio)

- Keep the current look, colours (maroon & gold on white-beige), fonts and copy
  unless a change says otherwise.
- Contact details above are exact — never change them without the studio.
- Never invent reviews, ratings, wedding counts, years, team names, prices,
  delivery times or availability. Where client content is needed, the site
  shows a `[CLIENT TO PROVIDE]` / `[CLIENT TO CONFIRM]` marker instead.
- The 14 Terms & Policies keep their exact wording (presentation only).
