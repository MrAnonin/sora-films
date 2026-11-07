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

- `index.html` — the complete website (single page, hash-routed sections:
  Home, About, Services, Packages, Gallery, Contact/Booking, Terms & Policies).
  Most photos are embedded in the file; the link-preview image is separate (see below).
- `contract.html` — printable Booking Contract (Marriage/Wedding, Engagement,
  Birthday, Pre-Wedding, Other), linked from the footer as "Booking Contract".
- `assets/img/og-image.jpg` — the 1200×630 photo used when the site link is
  shared on WhatsApp / Facebook (the link preview card).
- `.nojekyll` — tells GitHub Pages to serve the files as-is.
- `README.md` — this file. `CHANGELOG.md` — what changed, phase by phase.

## How to edit things (no code knowledge needed — ask Muse)

Everything below is edited in `index.html` unless noted. Search for the
exact text in quotes.

- **Prices:** the six packages are in the Packages page. Wedding packages:
  Silver ₹30,000, Gold ₹42,000, Platinum ₹59,999. Essential Collections:
  Classic ₹20,000, Signature ₹23,000, Royal ₹25,000. Change the price in the
  package card **and** in the Package Finder quiz (`PF_PACKAGES`) and the
  Booking Contract dropdown (`contract.html`) so all three match.
- **Muhurat dates:** one place — the `SORA_CONFIG` block near the end of
  `index.html` (`muhurat: { year, label, note, lastDate }`). The strip on the
  homepage is drawn from it and hides itself automatically after `lastDate`.
  **Verify every new set of dates against a panchang before publishing.**
- **Analytics:** one place — `SORA_CONFIG.analyticsId`. Put your Plausible
  domain (e.g. `sorafilms.in`) or GA4 measurement ID (e.g. `G-XXXXXXX`) there
  and set `analyticsProvider` to `"plausible"` or `"ga4"`. Leave it empty and
  no analytics script loads at all. Tracked events: `whatsapp_click`
  (with package name), `call_click`, `email_click`, `enquiry_form_submit`,
  `package_finder_completed`, `datecheck_submit`.
- **Showreel video:** `SORA_CONFIG.showreelUrl` — paste the YouTube link
  there (Phase 2 work adds the section; until then the value is unused).
- **Lead capture (save enquiries to a sheet):** `SORA_CONFIG.leadCaptureEndpoint`
  — paste a Google Apps Script web-app URL or a Formspree endpoint there
  (Phase 2 work wires it up; until then enquiries go to WhatsApp only).
- **Booked dates (availability calendar):** Phase 2 will add
  `assets/data/booked-dates.json` — one editable list of booked dates.
- **Testimonials / real weddings / team photos:** Phase 2–3. Only real client
  reviews are ever added (name, place, package/event, 1–2 lines) — never
  invented ones. Send the real text or a screenshot and it will be added
  verbatim.
- **Delivery timelines & advance %:** there is no standard figure on the site
  — the site says "confirmed in your quotation". Tell Muse your usual
  delivery weeks and usual advance % and they will be added as the site's
  standard text.

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
