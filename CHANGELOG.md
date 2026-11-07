# Sora Films website — CHANGELOG

Live site: https://mranonin.github.io/sora-films/
Repo: https://github.com/MrAnonin/sora-films (branch `main`)

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
