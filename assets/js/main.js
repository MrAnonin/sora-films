/* Sora Films — shared JavaScript (extracted from the single-file site, Phase 3).
   Loaded at the end of <body> on every page. Page-specific features are
   guarded so the file runs on pages that do not have those elements. */
(function () {
  "use strict";
  /* Base path for site assets, resolved from this script's own URL, so
     fetches work from any page depth (/, /about/, /packages/, ...). */
  var _s = document.currentScript;
  window.SORA_ASSET_BASE = (_s && _s.src) ? _s.src.replace(/\/js\/[^\/]*$/, "/") : "";
})();

/* Sora Films — site config. Edit the values below; no other code changes are needed.
   analyticsId: your Plausible domain (e.g. "sorafilms.in") or GA4 measurement ID (e.g. "G-XXXXXXX").
   Leave it empty until you have one — no analytics script will load and nothing is tracked.
   leadCaptureEndpoint / showreelUrl are Phase 2 placeholders; leave them empty for now.
   Muhurat dates: verify against a panchang before publishing a new season. */
window.SORA_CONFIG = {
  analyticsId: "",
  analyticsProvider: "plausible",
  leadCaptureEndpoint: "",
  showreelUrl: "",
  testimonials: [],
  muhurat: { year: 2026, label: "21, 24, 25 &amp; 26 Nov \u00b7 2\u20136 &amp; 11\u201312 Dec", note: "only one Saturday in November: 21 Nov.", lastDate: "2026-12-12" }
};
(function () {
  var cfg = window.SORA_CONFIG || {};
  function loadScript(src, attrs) { var s = document.createElement("script"); s.src = src; s.defer = true; if (attrs) { for (var k in attrs) { s.setAttribute(k, attrs[k]); } } document.head.appendChild(s); }
  if (cfg.analyticsId) {
    if (cfg.analyticsProvider === "ga4") {
      loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.analyticsId));
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date()); window.gtag("config", cfg.analyticsId);
    } else {
      loadScript("https://plausible.io/js/script.js", { "data-domain": cfg.analyticsId });
    }
  }
  window.soraTrack = function (name, props) {
    try {
      if (window.plausible) { window.plausible(name, { props: props || {} }); }
      else if (window.gtag) { window.gtag("event", name, props || {}); }
    } catch (e) { /* analytics is optional; never break the page */ }
  };
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a || !a.href) return;
    if (a.href.indexOf("wa.me") !== -1) {
      var label = (a.getAttribute("aria-label") || a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
      var pkg = ""; var card = a.closest("article.pkg");
      if (card) { var tier = card.querySelector(".tier"); if (tier) pkg = tier.textContent.trim() + " Package"; }
      window.soraTrack("whatsapp_click", { label: label, package: pkg });
    } else if (a.href.indexOf("tel:") === 0) {
      window.soraTrack("call_click", {});
    } else if (a.href.indexOf("mailto:") === 0) {
      window.soraTrack("email_click", {});
    }
  });
  var footer = document.querySelector("footer");
  if (footer && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) { document.body.classList.toggle("hide-floats", !!entries[0].isIntersecting); }, { threshold: 0.05 }).observe(footer);
  }
  var mu = cfg.muhurat || {};
  var strip = document.querySelector(".muhurat-strip");
  if (strip && mu.lastDate) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    if (today > new Date(mu.lastDate + "T00:00:00")) { strip.style.display = "none"; }
    else { var mt = document.getElementById("muhuratText"); if (mt) mt.innerHTML = "<strong>" + mu.year + " wedding muhurat dates:</strong> " + mu.label + " <span>&mdash; " + mu.note + "</span>"; }
  }
  /* Showreel: lite YouTube embed — thumbnail first, iframe only after the visitor presses play. */
  function ytId(url) { var m = String(url || "").match(/(?:youtube\.com\/(?:watch\?[^#]*v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/); return m ? m[1] : ""; }
  var sr = document.getElementById("showreel");
  var srPlayer = document.getElementById("showreelPlayer");
  if (sr && srPlayer && cfg.showreelUrl) {
    var vid = ytId(cfg.showreelUrl);
    if (vid) {
      sr.style.display = "";
      var playBtn = document.createElement("button");
      playBtn.type = "button"; playBtn.className = "showreel-play";
      playBtn.setAttribute("aria-label", "Play the Sora Films wedding showreel");
      playBtn.innerHTML = '<img src="https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg" alt="Sora Films wedding showreel — press play to watch" loading="lazy" decoding="async"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>';
      playBtn.addEventListener("click", function () {
        srPlayer.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + vid + '?autoplay=1&rel=0" title="Sora Films wedding showreel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      });
      srPlayer.appendChild(playBtn);
    }
  }
  /* Testimonials: real client reviews only, from SORA_CONFIG.testimonials. Empty = the Google/WhatsApp cards stay as they are. */
  function escHtml(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  var tg = document.getElementById("testimonialGrid");
  if (tg && Array.isArray(cfg.testimonials) && cfg.testimonials.length) {
    tg.hidden = false;
    cfg.testimonials.forEach(function (r) {
      var card = document.createElement("article");
      card.className = "review-card testimonial";
      var stars = "";
      if (r.rating && r.rating >= 1 && r.rating <= 5) { stars = '<div class="stars" aria-label="' + r.rating + ' out of 5 stars">' + "\u2605".repeat(r.rating) + "</div>"; }
      var photo = r.photo ? '<img src="' + escHtml(r.photo) + '" alt="" loading="lazy" decoding="async">' : "";
      var who = "<strong>" + escHtml(r.name) + "</strong>" + (r.place ? ", " + escHtml(r.place) : "");
      var what = escHtml([r.event, r.package].filter(Boolean).join(" \u00b7 "));
      card.innerHTML = photo + stars + "<p>" + escHtml(r.text) + "</p>" + '<p class="tname">' + who + "</p>" + (what ? '<p class="tevent">' + what + "</p>" : "");
      tg.appendChild(card);
    });
    var gLink = document.querySelector('a[href*="google.com/maps/place/Sora"]');
    if (gLink) {
      var badge = document.createElement("a");
      badge.className = "google-badge"; badge.href = gLink.href; badge.target = "_blank"; badge.rel = "noopener";
      badge.textContent = "Read our reviews on Google";
      tg.parentNode.insertBefore(badge, tg);
    }
  }
  /* Policies accordion: Expand all / Collapse all. */
  var expBtn = document.getElementById("expandPolicies");
  if (expBtn) {
    expBtn.addEventListener("click", function () {
      var items = document.querySelectorAll(".policy-grid details.policy");
      var anyClosed = Array.prototype.some.call(items, function (d) { return !d.open; });
      items.forEach(function (d) { d.open = anyClosed; });
      expBtn.textContent = anyClosed ? "Collapse all" : "Expand all";
      expBtn.setAttribute("aria-expanded", String(anyClosed));
    });
  }
  /* Booked dates: the date checker reads assets/data/booked-dates.json and marks those dates unavailable. */
  window.SORA_BOOKED = [];
  if (window.fetch) {
    fetch((window.SORA_ASSET_BASE || "") + "assets/data/booked-dates.json").then(function (r) { return r.json(); }).then(function (j) { if (j && Array.isArray(j.booked)) window.SORA_BOOKED = j.booked; }).catch(function () { window.SORA_BOOKED = []; });
  }
})();

(function () {
        "use strict";

        /* Header shadow on scroll */
        var header = document.getElementById("siteHeader");
        function onScroll() { header.classList.toggle("scrolled", window.scrollY > 12); }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        /* Mobile menu */
        var burger = document.getElementById("burger");
        var menu = document.getElementById("mobileMenu");
        burger.addEventListener("click", function () {
          var open = menu.classList.toggle("open");
          burger.setAttribute("aria-expanded", open ? "true" : "false");
          burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        });
        menu.addEventListener("click", function (e) {
          if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
        });

        /* Duplicate marquee content for a seamless loop */
        var track = document.getElementById("marqueeTrack");
        if (track) track.innerHTML += track.innerHTML;

        /* Scroll-reveal animations */
        var revealEls = document.querySelectorAll(".rv");
        function revealAll() { revealEls.forEach(function (el) { el.classList.add("in"); }); }
        if ("IntersectionObserver" in window) {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
            });
          }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
          revealEls.forEach(function (el) { io.observe(el); });
          /* Safety net: content must never stay hidden if reveal triggers are missed */
          setTimeout(revealAll, 1200);
        } else {
          revealAll();
        }

        /* Wrap every zoomable image in a real button (keyboard & assistive-tech friendly) */
        document.querySelectorAll("img[data-full]").forEach(function (img) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "zoom";
          btn.setAttribute("data-full", img.getAttribute("data-full"));
          btn.setAttribute("data-cap", img.getAttribute("data-cap") || "");
          btn.setAttribute("aria-label", "View larger: " + (img.getAttribute("data-cap") || img.getAttribute("alt") || "photo").replace(/&amp;/g, "&"));
          img.removeAttribute("data-full");
          img.removeAttribute("data-cap");
          img.parentNode.insertBefore(btn, img);
          btn.appendChild(img);
        });

        /* Lightbox */
        var items = Array.prototype.slice.call(document.querySelectorAll("[data-full]"));
        var lb = document.getElementById("lightbox");
        var lbImg = document.getElementById("lbImg");
        var lbCap = document.getElementById("lbCap");
        var idx = 0;
        function show(i) {
          idx = (i + items.length) % items.length;
          var el = items[idx];
          lbImg.src = el.getAttribute("data-full");
          lbImg.alt = (el.getAttribute("data-cap") || "").replace(/&amp;/g, "&");
          lbCap.textContent = (el.getAttribute("data-cap") || "").replace(/&amp;/g, "&");
        }
        function openLb(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
        function closeLb() { lb.classList.remove("open"); document.body.style.overflow = ""; lbImg.removeAttribute("src"); }
        items.forEach(function (el, i) {
          el.addEventListener("click", function () { openLb(i); });
        });
        var lbClose = document.getElementById("lbClose");
        var lbPrev = document.getElementById("lbPrev");
        var lbNext = document.getElementById("lbNext");
        if (lb && lbClose && lbPrev && lbNext) {
        lbClose.addEventListener("click", closeLb);
        lbPrev.addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
        lbNext.addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
        lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
        }
        document.addEventListener("keydown", function (e) {
          if (!lb || !lb.classList.contains("open")) return;
          if (e.key === "Escape") closeLb();
          if (e.key === "ArrowLeft") show(idx - 1);
          if (e.key === "ArrowRight") show(idx + 1);
        });

        /* Enquiry form -> WhatsApp (no backend; message is composed locally) */
        var form = document.getElementById("enquiryForm"); var fDateInput = document.getElementById("fDate"); if (fDateInput) fDateInput.min = new Date().toISOString().split("T")[0];
function enqVal(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
function setFieldError(id, errId, bad) { var f = document.getElementById(id), e = document.getElementById(errId); if (!f || !e) return; if (bad) { f.setAttribute("aria-invalid", "true"); e.hidden = false; } else { f.removeAttribute("aria-invalid"); e.hidden = true; } }
function validateEnquiry() { var ok = true, firstBad = null; if (!enqVal("fName")) { setFieldError("fName", "fNameError", true); ok = false; firstBad = document.getElementById("fName"); } else setFieldError("fName", "fNameError", false); var phoneRaw = enqVal("fPhone").replace(/[\s\-]/g, ""); var phoneBad = false; if (phoneRaw) { var digits = phoneRaw.replace(/^\+?91/, ""); phoneBad = !/^[6-9]\d{9}$/.test(digits); } setFieldError("fPhone", "fPhoneError", phoneBad); if (phoneBad) { ok = false; if (!firstBad) firstBad = document.getElementById("fPhone"); } var d = enqVal("fDate"); var today = new Date().toISOString().split("T")[0]; var dateBad = !!(d && d < today); setFieldError("fDate", "fDateError", dateBad); if (dateBad) { ok = false; if (!firstBad) firstBad = document.getElementById("fDate"); } if (firstBad) firstBad.focus(); return ok; }
function enquiryLines() { var m = window.soraMsg || function (k) { return ""; }; var lines = [m("greet_enquiry") || "Hello Sora Films! I would like to enquire about a booking."]; if (enqVal("fName")) lines.push((m("name") || "Name: ") + enqVal("fName")); if (enqVal("fPhone")) lines.push((m("phone") || "My phone: ") + enqVal("fPhone")); lines.push((m("type") || "Event type: ") + enqVal("fType")); if (enqVal("fDate")) lines.push((m("date") || "Event date: ") + enqVal("fDate")); lines.push((m("pkg") || "Package: ") + document.getElementById("fPkg").value); if (enqVal("fMsg")) lines.push((m("details") || "Details: ") + enqVal("fMsg")); return lines; }
function setEnquiryMsg(msg) { var m = document.getElementById("enquiryMsg"); if (m) m.textContent = msg; }
["fName", "fPhone", "fDate"].forEach(function (id) { var el = document.getElementById(id); if (el) el.addEventListener("input", function () { var map = { fName: "fNameError", fPhone: "fPhoneError", fDate: "fDateError" }; setFieldError(id, map[id], false); }); });
if (form) form.addEventListener("submit", function (e) { e.preventDefault(); if (!validateEnquiry()) { setEnquiryMsg("Please check the highlighted fields above, then send your enquiry again."); return; } setEnquiryMsg("Thanks \u2014 opening WhatsApp with your enquiry\u2026"); if (window.soraTrack) window.soraTrack("enquiry_form_submit", { package: document.getElementById("fPkg").value }); var url = "https://wa.me/919155104962?text=" + encodeURIComponent(enquiryLines().join("\n"));
  var leadEndpoint = (window.SORA_CONFIG && window.SORA_CONFIG.leadCaptureEndpoint) || "";
  if (leadEndpoint && window.fetch) {
    var payload = { name: enqVal("fName"), phone: enqVal("fPhone"), eventType: enqVal("fType"), eventDate: enqVal("fDate"), package: document.getElementById("fPkg").value, message: enqVal("fMsg"), source: "website enquiry form", submittedAt: new Date().toISOString() };
    var sendLead = fetch(leadEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(payload) });
    var leadTimeout = new Promise(function (res) { setTimeout(res, 4000); });
    Promise.race([sendLead, leadTimeout]).catch(function () {}).then(function () { window.open(url, "_blank", "noopener"); });
  } else {
    window.open(url, "_blank", "noopener");
  }
  });
/* Enquiry form -> Email (no backend; mailto is composed locally, visitor presses Send in their mail app) */
        var emailBtn = document.getElementById("emailEnquiryBtn"); if (emailBtn) { emailBtn.addEventListener("click", function () { if (!validateEnquiry()) { setEnquiryMsg("Please check the highlighted fields above, then send your enquiry again."); return; } var lines = enquiryLines(); var subject = "Sora Films Enquiry" + (enqVal("fType") ? " - " + enqVal("fType") : "") + (enqVal("fName") ? " - " + enqVal("fName") : ""); setEnquiryMsg("Opening your mail app with the enquiry filled in \u2014 press Send there to send it to sorafilms25@gmail.com."); if (window.soraTrack) window.soraTrack("email_click", { source: "enquiry form" }); window.location.href = "mailto:sorafilms25@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n")); }); }
/* Package Finder quiz — 3 questions, suggests a real package, WhatsApp + Email enquiry */
        var pfBox = document.getElementById("packageFinder");
        if (pfBox) {
          var PF_PACKAGES = {
            silver: {name: "Silver Wedding Package", price: "₹30,000", why: "1 day of drone coverage, a 30-page album, full wedding video and 4 photo frames — complete wedding coverage at the most budget-friendly price."},
            gold: {name: "Gold Wedding Package", price: "₹42,000", why: "2 days of drone coverage, 2 reels, wedding highlight + full video, and a premium 30-page album with leather bag."},
            platinum: {name: "Platinum Wedding Package", price: "₹59,999", why: "A cinematographer, 2 days of drone coverage, 3 reels, wedding highlight + teaser + full video, and a premium 40-page album with box — the complete cinematic experience."},
            classic: {name: "Classic Collection", price: "₹20,000", why: "Photographer + videographer, album and full video — compact traditional video coverage for your celebration."},
            signature: {name: "Signature Collection", price: "₹23,000", why: "Photographer + videographer, album, full video and 5 photo frames."},
            royal: {name: "Royal Collection", price: "₹25,000", why: "Photographer + videographer, drone coverage, album, full video and 5 photo frames — our most popular Essential collection."}
          };
          function pfRecommend(q1, q2, q3) {
            if (q1 === "event") {
              if (q3 === "simple") return "classic";
              if (q3 === "balanced") return "signature";
              return "royal";
            }
            var tier = q3 === "simple" ? 0 : q3 === "complete" ? 2 : 1;
            if (q2 === "2" && tier === 0) tier = 1;
            if (q2 === "3") tier = Math.min(2, tier + 1);
            return ["silver", "gold", "platinum"][tier];
          }
          function pfPicked(q) {
            var b = pfBox.querySelector('#pfQ' + q.slice(1) + ' .opt.on');
            return b ? b.getAttribute("data-value") : null;
          }
          function pfLabel(q) {
            var b = pfBox.querySelector('#pfQ' + q.slice(1) + ' .opt.on');
            return b ? b.textContent.trim() : "";
          }
          pfBox.addEventListener("click", function (e) {
            var btn = e.target.closest ? e.target.closest(".opt") : null;
            if (!btn || !pfBox.contains(btn)) return;
            var group = btn.parentElement;
            Array.prototype.forEach.call(group.querySelectorAll(".opt"), function (b) { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); });
            btn.classList.add("on"); btn.setAttribute("aria-pressed", "true");
          });
          document.getElementById("pfShow").addEventListener("click", function () {
            var q1 = pfPicked("q1"), q2 = pfPicked("q2"), q3 = pfPicked("q3");
            var warn = document.getElementById("pfWarn"), result = document.getElementById("pfResult");
            if (!q1 || !q2 || !q3) { warn.style.display = "block"; result.style.display = "none"; return; }
            warn.style.display = "none";
            var key = pfRecommend(q1, q2, q3);
            var pkg = PF_PACKAGES[key];
            document.getElementById("pfName").textContent = pkg.name;
            document.getElementById("pfPrice").textContent = pkg.price;
            document.getElementById("pfWhy").textContent = pkg.why;
            document.getElementById("pfBased").textContent = "Based on your answers — " + pfLabel("q1") + " · " + pfLabel("q2") + " · " + pfLabel("q3") + ".";
            var m = window.soraMsg || function (k) { return ""; }; var lines = [m("greet_finder") || "Hello Sora Films! I used the Package Finder on your website.", (m("finder_event") || "Event: ") + pfLabel("q1"), (m("finder_coverage") || "Coverage: ") + pfLabel("q2"), (m("finder_matters") || "What matters most: ") + pfLabel("q3"), (m("finder_suggested") || "Suggested package: ") + pkg.name + " — " + pkg.price, m("finder_confirm") || "Please confirm availability and details for my date."];
            document.getElementById("pfWa").href = "https://wa.me/919155104962?text=" + encodeURIComponent(lines.join("\n"));
            document.getElementById("pfEmail").href = "mailto:sorafilms25@gmail.com?subject=" + encodeURIComponent("Package Finder — " + pkg.name + " (" + pkg.price + ")") + "&body=" + encodeURIComponent(lines.join("\n"));
            result.style.display = "block"; if (window.soraTrack) window.soraTrack("package_finder_completed", { package: pkg.name });
            result.scrollIntoView({block: "nearest"});
          });
          document.getElementById("pfAgain").addEventListener("click", function () {
            Array.prototype.forEach.call(pfBox.querySelectorAll(".opt.on"), function (b) { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); });
            document.getElementById("pfResult").style.display = "none";
            document.getElementById("pfWarn").style.display = "none";
          });
        }

        /* Customize Your Package builder -> WhatsApp (selection composed locally) */
        var chipGrid = document.getElementById("chipGrid");
        if (chipGrid) {
          /* Customize Your Package builder -> WhatsApp (selection composed locally) */
          var customSummary = document.getElementById("customSummary");
          var customEmpty = document.getElementById("customEmpty");
          var customWarn = document.getElementById("customWarn");
          var customSend = document.getElementById("customSend"); var cDateInput = document.getElementById("cDate"); if (cDateInput) cDateInput.min = new Date().toISOString().split("T")[0];
          var stepState = { days: 1, frames: 0, reels: 0 };
          var CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
          function selectedServices() {
            return Array.prototype.slice.call(chipGrid.querySelectorAll(".opt.on")).map(function (b) {
              return b.getAttribute("data-name");
            });
          }
          function refreshCustom() {
            var svcs = selectedServices();
            var items = svcs.slice();
            if (svcs.length) {
              items.push("Coverage: " + stepState.days + (stepState.days === 1 ? " day" : " days"));
              if (stepState.frames > 0) items.push("Photo frames × " + stepState.frames);
              if (stepState.reels > 0) items.push("Reels × " + stepState.reels);
            }
            customSummary.innerHTML = "";
            items.forEach(function (t) {
              var li = document.createElement("li");
              li.innerHTML = CHECK_SVG;
              li.appendChild(document.createTextNode(t));
              customSummary.appendChild(li);
            });
            customSummary.style.display = svcs.length ? "block" : "none";
            customEmpty.style.display = svcs.length ? "none" : "block";
            if (svcs.length) customWarn.hidden = true;
            document.querySelectorAll(".stepper").forEach(function (sp) {
              var key = sp.getAttribute("data-key");
              var min = parseInt(sp.getAttribute("data-min"), 10);
              var max = parseInt(sp.getAttribute("data-max"), 10);
              sp.querySelector(".step-val").textContent = stepState[key];
              sp.querySelector('[data-dir="-1"]').disabled = stepState[key] <= min;
              sp.querySelector('[data-dir="1"]').disabled = stepState[key] >= max;
            });
          }
          chipGrid.addEventListener("click", function (e) {
            var btn = e.target.closest(".opt");
            if (!btn) return;
            var on = btn.classList.toggle("on");
            btn.setAttribute("aria-pressed", on ? "true" : "false");
            refreshCustom();
          });
          document.querySelectorAll(".stepper").forEach(function (sp) {
            var key = sp.getAttribute("data-key");
            var min = parseInt(sp.getAttribute("data-min"), 10);
            var max = parseInt(sp.getAttribute("data-max"), 10);
            sp.addEventListener("click", function (e) {
              var btn = e.target.closest(".step-btn");
              if (!btn || btn.disabled) return;
              var next = stepState[key] + parseInt(btn.getAttribute("data-dir"), 10);
              stepState[key] = Math.max(min, Math.min(max, next));
              refreshCustom();
            });
          });
          customSend.addEventListener("click", function () {
        var cNameEl = document.getElementById("cName");
        var cName = cNameEl ? cNameEl.value.trim() : "";
        if (!cName) {
          customWarn.textContent = "Please tell us your name so we can reply to you.";
          customWarn.hidden = false;
          if (cNameEl) cNameEl.focus();
          return;
        }
        var cDateEl = document.getElementById("cDate");
        var cDateVal = cDateEl ? cDateEl.value : "";
        if (cDateVal && cDateVal < new Date().toISOString().split("T")[0]) {
          customWarn.textContent = "Please choose today or a future date for your event.";
          customWarn.hidden = false;
          cDateEl.focus();
          return;
        }
        var svcs = selectedServices();
        if (!svcs.length) {
          customWarn.textContent = "Please choose at least one service first \u2014 then we'll build your quote.";
          customWarn.hidden = false;
          chipGrid.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
            var m = window.soraMsg || function (k) { return ""; }; var lines = [m("greet_builder") || "Hello Sora Films! I would like a custom package for my event."];
            var name = document.getElementById("cName").value.trim();
            if (name) lines.push("Name: " + name);
            lines.push("Event type: " + document.getElementById("cType").value);
            var date = document.getElementById("cDate").value;
            if (date) lines.push("Event date: " + date);
            lines.push("My selection:");
            svcs.forEach(function (s) { lines.push("• " + s); });
            lines.push("• " + (m("builder_coverage") || "Coverage: ") + stepState.days + (stepState.days === 1 ? (m("builder_day") || " day") : (m("builder_days") || " days")));
            if (stepState.frames > 0) lines.push("• " + (m("builder_frames") || "Photo frames × ") + stepState.frames);
            if (stepState.reels > 0) lines.push("• " + (m("builder_reels") || "Reels × ") + stepState.reels);
            lines.push(m("builder_quote") || "Please share a quote and availability for my date.");
            var url = "https://wa.me/919155104962?text=" + encodeURIComponent(lines.join("\n"));
            if (window.soraTrack) window.soraTrack("whatsapp_click", { label: "Custom package", package: "Custom" }); window.open(url, "_blank", "noopener"); }); refreshCustom();
        }

        /* Check Your Date strip -> WhatsApp availability check */
        var dcSend = document.getElementById("dcSend");
        var dcDate = document.getElementById("dcDate");
        var dcType = document.getElementById("dcType");
        var dcWarn = document.getElementById("dcWarn");
        if (dcSend && dcDate && dcType) {
          dcDate.min = new Date().toISOString().split("T")[0];
          dcSend.addEventListener("click", function () {
            var d = dcDate.value;
            if (!d) {
              dcWarn.textContent = "Please pick your event date first \u2014 then we can check it for you.";
              dcWarn.hidden = false;
              dcDate.focus();
              return;
            }
            var todayStr = new Date().toISOString().split("T")[0];
            if (d < todayStr) {
              dcWarn.textContent = "That date has already passed \u2014 please choose today or a future date.";
              dcWarn.hidden = false;
              dcDate.focus();
              return;
            }
            if (window.SORA_BOOKED && window.SORA_BOOKED.indexOf(d) !== -1) {
              dcWarn.textContent = "That date is already booked \u2014 please choose another date, or message us on WhatsApp and we\'ll check nearby dates for you.";
              dcWarn.hidden = false;
              dcDate.focus();
              return;
            }
            dcWarn.hidden = true;
            var nice = d;
            try {
              nice = new Date(d + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            } catch (e) { /* keep ISO date */ }
            var m = window.soraMsg || function (k) { return ""; }; var lines = [
              m("greet_date") || "Hello Sora Films! I would like to check availability for my date.",
              (m("date") || "Event date: ") + nice,
              (m("type") || "Event type: ") + dcType.value,
              m("date_confirm") || "Please confirm if you are available and share the package that fits my day."
            ];
            var url = "https://wa.me/919155104962?text=" + encodeURIComponent(lines.join("\n"));
            if (window.soraTrack) window.soraTrack("datecheck_submit", { type: dcType.value }); window.open(url, "_blank", "noopener"); }); dcDate.addEventListener("change", function () { if (dcDate.value) dcWarn.hidden = true; });
        }

        /* Footer year */
        document.getElementById("year").textContent = new Date().getFullYear();
      })();

(function(){
  var qd = document.getElementById("quickDateLink");
  if (qd) { qd.addEventListener("click", function () { setTimeout(function () { var dc = document.querySelector(".datecheck"); if (dc) dc.scrollIntoView({ behavior: "smooth", block: "center" }); }, 120); }); }
})();

/* ---------- Hindi toggle (Phase 3.19) ----------
   Elements with data-i18n="key" get their textContent replaced; elements with
   data-i18n-html="key" get their innerHTML replaced. The choice is stored in
   localStorage ("sora-lang") and the <html> lang attribute follows it.
   Hindi wording is a first translation — the client must review it before launch. */
(function () {
  "use strict";
  var I18N = {
  "nav.home": [
    "Home",
    "होम"
  ],
  "nav.about": [
    "About",
    "हमारे बारे में"
  ],
  "nav.services": [
    "Services",
    "सेवाएँ"
  ],
  "nav.packages": [
    "Packages",
    "पैकेज"
  ],
  "nav.gallery": [
    "Gallery",
    "गैलरी"
  ],
  "nav.contact": [
    "Contact",
    "संपर्क"
  ],
  "hero.eyebrow": [
    "Sora Films — Capture It Better",
    "सोरा फ़िल्म्स — बेहतर कैप्चर करें"
  ],
  "hero.title": [
    "We Capture <em>Moments,</em><br />You Cherish <span class=\"goldword\">Forever.</span>",
    "हम पल <em>कैद करते हैं,</em><br />आप उन्हें <span class=\"goldword\">हमेशा संजोएं।</span>"
  ],
  "hero.lead": [
    "Wedding photography, cinematic films and drone coverage for your biggest days — <b>weddings, engagements, pre-weddings and every celebration</b> in between, filmed with heart in Gaya Ji and beyond.",
    "आपके सबसे बड़े दिनों के लिए वेडिंग फ़ोटोग्राफ़ी, सिनेमैटिक फ़िल्में और ड्रोन कवरेज — <b>शादियाँ, सगाई, प्री-वेडिंग और हर जश्न</b>, गया जी और उसके आसपास दिल से फ़िल्माया गया।"
  ],
  "hero.cta_wa": [
    "Book on WhatsApp",
    "WhatsApp पर बुक करें"
  ],
  "hero.cta_pkg": [
    "View Packages",
    "पैकेज देखें"
  ],
  "svc.prewedding": [
    "Pre-Weddings",
    "प्री-वेडिंग"
  ],
  "svc.prewedding_tag": [
    "Dream it. We'll film it.",
    "सपना देखें, हम फ़िल्माएँगे।"
  ],
  "svc.engagement": [
    "Engagements",
    "सगाई"
  ],
  "svc.engagement_tag": [
    "Celebrate your story.",
    "अपनी कहानी मनाएँ।"
  ],
  "svc.cinematic": [
    "Cinematic Films",
    "सिनेमैटिक फ़िल्में"
  ],
  "svc.cinematic_tag": [
    "Beyond ordinary.",
    "आम से हटकर।"
  ],
  "svc.drone": [
    "Drone Coverage",
    "ड्रोन कवरेज"
  ],
  "svc.drone_tag": [
    "A bird's eye view.",
    "ऊपर से नज़ारा।"
  ],
  "svc.albums": [
    "Premium Albums",
    "प्रीमियम एल्बम"
  ],
  "svc.albums_tag": [
    "Treasure forever.",
    "हमेशा के लिए संजोएं।"
  ],
  "svc.events": [
    "Events",
    "इवेंट्स"
  ],
  "svc.events_tag": [
    "Live the moment.",
    "पल को जिएँ।"
  ],
  "svc.travel": [
    "Travel Films",
    "ट्रैवल फ़िल्में"
  ],
  "svc.travel_tag": [
    "Explore. Capture.",
    "घूमें। कैद करें।"
  ],
  "sec.welcome": [
    "Your Story, <em>Beautifully Captured</em>",
    "आपकी कहानी, <em>खूबसूरती से कैद</em>"
  ],
  "sec.explore": [
    "Everything for Your Big Day",
    "आपके बड़े दिन के लिए सब कुछ"
  ],
  "sec.packages": [
    "Wedding Packages",
    "वेडिंग पैकेज"
  ],
  "sec.steps": [
    "How Booking Works",
    "बुकिंग कैसे करें"
  ],
  "sec.faq_kicker": [
    "Good to Know",
    "जानने योग्य"
  ],
  "sec.faq": [
    "Frequently Asked <em>Questions</em>",
    "अक्सर पूछे जाने वाले <em>सवाल</em>"
  ],
  "sec.contact": [
    "Let's Capture <em>Your Story</em>",
    "आइए आपकी कहानी <em>कैद करें</em>"
  ],
  "sec.areas": [
    "Areas We Cover",
    "हम किन इलाकों में जाते हैं"
  ],
  "sec.visit": [
    "Visit the Studio",
    "स्टूडियो आएँ"
  ],
  "dc.button": [
    "Check Availability",
    "उपलब्धता जाँचें"
  ],
  "form.name": [
    "Your Name",
    "आपका नाम"
  ],
  "form.phone": [
    "Your Phone (optional)",
    "आपका फ़ोन (वैकल्पिक)"
  ],
  "form.type": [
    "Event Type",
    "इवेंट का प्रकार"
  ],
  "form.date": [
    "Event Date (optional)",
    "इवेंट की तारीख़ (वैकल्पिक)"
  ],
  "form.pkg": [
    "Package You're Interested In",
    "कौन सा पैकेज चाहिए"
  ],
  "form.submit_wa": [
    "Send Enquiry on WhatsApp",
    "WhatsApp पर भेजें"
  ],
  "form.submit_email": [
    "Send Enquiry by Email",
    "ईमेल से भेजें"
  ],
  "foot.explore": [
    "Explore",
    "देखें"
  ],
  "sec.gallery_h1": ["Our <em>Gallery</em>", "हमारी <em>गैलरी</em>"],
  "foot.contact": [
    "Get in Touch",
    "संपर्क करें"
  ],
  "faq.q1": ["How is my booking confirmed?", "मेरी बुकिंग कैसे कन्फ़र्म होती है?"],
  "faq.a1": ["Your booking is confirmed once you accept our terms, your date is available, and the agreed advance is received. Your package details and payment schedule are recorded in your quotation or invoice — see our <a href=\"../terms/\">Terms &amp; Policies</a>.", "आपकी बुकिंग तब कन्फ़र्म होती है जब आप हमारी शर्तें स्वीकार करते हैं, आपकी तारीख़ उपलब्ध हो और तय अग्रिम राशि मिल जाए। आपके पैकेज की जानकारी और भुगतान का शेड्यूल आपके कोटेशन या इनवॉइस में दर्ज होता है — हमारी <a href=\"../terms/\">शर्तें और नीतियाँ</a> देखें।"],
  "faq.q2": ["How much advance do I need to pay?", "मुझे कितना अग्रिम भुगतान करना होगा?"],
  "faq.a2": ["The advance is usually <b>[Z]% of the package</b> — <b>[CLIENT TO CONFIRM]</b>. The exact advance amount is agreed with you and recorded in your quotation before your date is locked. Unless agreed otherwise in writing, the remaining balance is due on or before the event date.", "अग्रिम आमतौर पर <b>[Z]% पैकेज का</b> होता है — <b>[CLIENT TO CONFIRM]</b>। सटीक अग्रिम राशि आपसे सहमति के बाद आपके कोटेशन में दर्ज की जाती है, और तभी आपकी तारीख़ लॉक होती है। लिखित में कुछ और तय न हो तो बाकी राशि इवेंट की तारीख़ तक या उससे पहले देनी होती है।"],
  "faq.q3": ["When will I receive my photos and films?", "मुझे अपनी फ़ोटो और फ़िल्में कब मिलेंगी?"],
  "faq.a3": ["You receive the items listed in your package — edited photographs, films, albums or highlights. As a guide: highlight video usually in <b>[X] days</b>, full video &amp; album usually in <b>[Y] weeks</b> — <b>[CLIENT TO CONFIRM]</b>. Your exact delivery time is confirmed in your quotation. If you need everything sooner, rush delivery is available as an add-on and may cost extra.", "आपको आपके पैकेज में लिखी चीज़ें मिलेंगी — एडिट की हुई फ़ोटो, फ़िल्में, एल्बम या हाइलाइट्स। अनुमान के तौर पर: हाइलाइट वीडियो आमतौर पर <b>[X] दिनों</b> में, पूरी वीडियो और एल्बम आमतौर पर <b>[Y] हफ़्तों</b> में — <b>[CLIENT TO CONFIRM]</b>। आपकी सटीक डिलीवरी का समय आपके कोटेशन में कन्फ़र्म होता है। अगर आपको सब कुछ जल्दी चाहिए तो रश डिलीवरी ऐड-ऑन के तौर पर उपलब्ध है, जिसका अलग शुल्क लग सकता है।"],
  "faq.q4": ["Do you provide RAW photos or unedited footage?", "क्या आप RAW फ़ोटो या बिना एडिट की फुटेज देते हैं?"],
  "faq.a4": ["No — RAW photos, unedited footage and project files are not included unless agreed in writing. You receive professionally edited photographs and films, finished in the Sora Films style you see in our portfolio.", "नहीं — RAW फ़ोटो, बिना एडिट की फुटेज और प्रोजेक्ट फ़ाइलें शामिल नहीं हैं, जब तक लिखित में सहमति न हो। आपको पेशेवर तरीके से एडिट की हुई फ़ोटो और फ़िल्में मिलती हैं, उसी Sora Films शैली में जो आप हमारे पोर्टफ़ोलियो में देखते हैं।"],
  "faq.q5": ["Can I change my date or reschedule?", "क्या मैं अपनी तारीख़ बदल सकता हूँ या दोबारा शेड्यूल कर सकता हूँ?"],
  "faq.a5": ["Yes, tell us in writing as early as you can. A new date depends on availability, and any refund, cancellation fee or rescheduling charge follows your written quotation and applicable law. Costs already incurred may remain payable.", "हाँ, जितनी जल्दी हो सके हमें लिखित में बताएं। नई तारीख़ उपलब्धता पर निर्भर करती है, और रिफ़ंड, कैंसिलेशन शुल्क या दोबारा शेड्यूल करने का शुल्क आपके लिखित कोटेशन और लागू कानून के अनुसार होगा। पहले से हुआ खर्च देय रह सकता है।"],
  "faq.q6": ["What if my event runs longer than booked?", "अगर मेरा इवेंट तय समय से ज़्यादा चल जाए तो क्या होगा?"],
  "faq.a6": ["Coverage is limited to the dates, venues, hours and services in your package. Extra hours or additional services are covered with your approval and charged at the rate agreed in writing — no surprises afterwards.", "कवरेज आपके पैकेज में लिखी तारीख़ों, जगहों, घंटों और सेवाओं तक सीमित है। अतिरिक्त घंटे या सेवाएँ आपकी सहमति से कवर की जाएँगी और लिखित में तय दर पर शुल्क लगेगा — बाद में कोई छिपा शुल्क नहीं।"],
  "faq.q7": ["Do you travel outside Gaya for weddings?", "क्या आप गया के बाहर शादियों के लिए यात्रा करते हैं?"],
  "faq.a7": ["Yes — we cover all weddings and events within 100 km of Gaya Ji, across Gaya, Aurangabad, Jehanabad, Arwal, Patna, Nalanda, Nawada, Rohtas, Sheikhpura, Bhojpur, Koderma, Chatra and Hazaribagh districts, including Bodh Gaya, Rajgir and Bihar Sharif. We also travel across India for outstation weddings. Travel, accommodation and other expenses are included only if specified in your quotation.", "हाँ — हम गया जी से 100 किमी के दायरे में सभी शादियों और इवेंट्स को कवर करते हैं, जिसमें गया, औरंगाबाद, जहानाबाद, अरवल, पटना, नालंदा, नवादा, रोहतास, शेखपुरा, भोजपुर, कोडरमा, चतरा और हज़ारीबाग ज़िले शामिल हैं, साथ ही बोध गया, राजगीर और बिहार शरीफ़ भी। हम आउटस्टेशन शादियों के लिए पूरे भारत में भी जाते हैं। यात्रा, ठहरने और अन्य खर्च तभी शामिल होते हैं जब आपके कोटेशन में लिखा हो।"],
  "faq.q8": ["Can I say no to my photos being used in your portfolio?", "क्या मैं अपनी फ़ोटो को पोर्टफ़ोलियो में इस्तेमाल करने से मना कर सकता हूँ?"],
  "faq.a8": ["Absolutely. On your booking agreement you choose Yes or No for promotional use of selected images and clips. Permission is completely optional, and declining it will never affect your booking or your package.", "बिल्कुल। अपने बुकिंग एग्रीमेंट में आप चुनी हुई तस्वीरों और क्लिप्स के प्रचार में इस्तेमाल के लिए हाँ या नहीं चुन सकते हैं। यह अनुमति पूरी तरह वैकल्पिक है, और मना करने से आपकी बुकिंग या पैकेज पर कोई असर नहीं पड़ेगा।"]
};
  function lang() {
    try { return localStorage.getItem("sora-lang") === "hi" ? "hi" : "en"; } catch (e) { return "en"; }
  }
  window.soraLang = lang;
  /* WhatsApp prefilled messages in the visitor's language. */
  var MSG = {
  "greet_enquiry": [
    "Hello Sora Films! I would like to enquire about a booking.",
    "नमस्ते Sora Films! मैं अपनी बुकिंग के बारे में पूछना चाहता हूँ।"
  ],
  "name": [
    "Name: ",
    "नाम: "
  ],
  "phone": [
    "My phone: ",
    "मेरा फ़ोन: "
  ],
  "type": [
    "Event type: ",
    "इवेंट का प्रकार: "
  ],
  "date": [
    "Event date: ",
    "इवेंट की तारीख़: "
  ],
  "pkg": [
    "Package: ",
    "पैकेज: "
  ],
  "details": [
    "Details: ",
    "जानकारी: "
  ],
  "greet_finder": [
    "Hello Sora Films! I used the Package Finder on your website.",
    "नमस्ते Sora Films! मैंने आपकी वेबसाइट पर Package Finder इस्तेमाल किया।"
  ],
  "finder_event": [
    "Event: ",
    "इवेंट: "
  ],
  "finder_coverage": [
    "Coverage: ",
    "कवरेज: "
  ],
  "finder_matters": [
    "What matters most: ",
    "सबसे ज़रूरी: "
  ],
  "finder_suggested": [
    "Suggested package: ",
    "सुझाया गया पैकेज: "
  ],
  "finder_confirm": [
    "Please confirm availability and details for my date.",
    "कृपया मेरी तारीख़ के लिए उपलब्धता और जानकारी कन्फ़र्म करें।"
  ],
  "greet_builder": [
    "Hello Sora Films! I would like a custom package for my event.",
    "नमस्ते Sora Films! मैं अपने इवेंट के लिए कस्टम पैकेज चाहता हूँ।"
  ],
  "builder_coverage": [
    "Coverage: ",
    "कवरेज: "
  ],
  "builder_day": [
    " day",
    " दिन"
  ],
  "builder_days": [
    " days",
    " दिन"
  ],
  "builder_frames": [
    "Photo frames × ",
    "फ़ोटो फ़्रेम × "
  ],
  "builder_reels": [
    "Reels × ",
    "रील्स × "
  ],
  "builder_quote": [
    "Please share a quote and availability for my date.",
    "कृपया मेरे दिन के लिए कोटेशन और उपलब्धता बताएं।"
  ],
  "greet_date": [
    "Hello Sora Films! I would like to check availability for my date.",
    "नमस्ते Sora Films! मैं अपनी तारीख़ की उपलब्धता जाँचना चाहता हूँ।"
  ],
  "date_confirm": [
    "Please confirm if you are available and share the package that fits my day.",
    "कृपया बताएं कि आप उपलब्ध हैं या नहीं, और मेरे दिन के लिए सही पैकेज बताएं।"
  ]
};
  window.soraMsg = function (key) {
    var pair = MSG[key];
    if (!pair) return "";
    return pair[lang() === "hi" ? 1 : 0];
  };
  function applyLanguage(l) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var pair = I18N[el.getAttribute("data-i18n")];
      if (pair) el.textContent = pair[l === "hi" ? 1 : 0];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var pair = I18N[el.getAttribute("data-i18n-html")];
      if (pair) el.innerHTML = pair[l === "hi" ? 1 : 0];
    });
    document.documentElement.lang = l;
    var btn = document.getElementById("langToggle");
    if (btn) {
      btn.textContent = l === "hi" ? "English" : "हिंदी";
      btn.setAttribute("aria-label", l === "hi" ? "Switch to English" : "हिंदी में देखें");
    }
    try { localStorage.setItem("sora-lang", l); } catch (e) {}
  }
  window.soraApplyLanguage = applyLanguage;
  var toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyLanguage(lang() === "hi" ? "en" : "hi");
    });
  }
  applyLanguage(lang());
})();

/* ---------- Gallery category filters (Phase 3.20) ----------
   Buttons filter the gallery grid by the figures' data-cat. The Drone
   filter has no photos yet, so it shows a short note instead. */
(function () {
  "use strict";
  var btns = document.querySelectorAll(".gal-filter");
  if (!btns.length) return;
  var grid = document.querySelector(".gal-grid");
  var empty = document.getElementById("galEmpty");
  if (!grid) return;
  var figs = Array.prototype.slice.call(grid.querySelectorAll("figure[data-cat]"));
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      btns.forEach(function (b) { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); });
      btn.classList.add("on");
      btn.setAttribute("aria-pressed", "true");
      var shown = 0;
      figs.forEach(function (fig) {
        var show = f === "all" || fig.getAttribute("data-cat") === f;
        fig.style.display = show ? "" : "none";
        if (show) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  });
})();
