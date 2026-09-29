/* =====================================================================
   JOLLY KIDS MONTESSORI — main.js
   Sticky header · mobile menu · scroll reveal · animated counters · lead popup
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Year in footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Inject scroll progress bar (all pages) ---------- */
  var progressBar = null;
  if (!document.querySelector(".scroll-progress")) {
    var prog = document.createElement("div");
    prog.className = "scroll-progress";
    prog.innerHTML = '<div class="scroll-progress__bar" id="scrollProgressBar"></div>';
    document.body.appendChild(prog);
  }
  progressBar = document.getElementById("scrollProgressBar");

  /* ---------- Inject mobile sticky consultation bar (all pages) ---------- */
  if (!document.querySelector(".sticky-cta") && !document.body.classList.contains("no-sticky-cta")) {
    var stickyCta = document.createElement("div");
    stickyCta.className = "sticky-cta";
    stickyCta.id = "stickyCta";
    stickyCta.innerHTML = '<a href="contact.html" class="btn btn--grad">Book Free Consultation</a>';
    document.body.appendChild(stickyCta);
  }
  var stickyCta = document.getElementById("stickyCta");

  /* ---------- Inject skip link + floating action buttons ---------- */
  var WA_NUMBER = "919366778777"; // change here to update everywhere
  var SOCIAL = {                  // official institute accounts — change here to update everywhere
    instagram: "https://www.instagram.com/jollykidsmontngl/",
    facebook: "https://www.facebook.com/jollykidsmontngl/"
  };
  if (!document.querySelector(".skip-link")) {
    var skip = document.createElement("a");
    skip.href = "#main"; skip.className = "skip-link"; skip.textContent = "Skip to content";
    document.body.insertBefore(skip, document.body.firstChild);
  }
  var mainEl = document.querySelector("main");
  if (mainEl && !mainEl.id) mainEl.id = "main";
  if (!document.querySelector(".fab-wrap")) {
    var wrap = document.createElement("div");
    wrap.className = "fab-wrap";
    wrap.innerHTML =
      '<a class="fab fab--ig" href="' + SOCIAL.instagram + '" target="_blank" rel="noopener" aria-label="Follow us on Instagram" data-label="Instagram">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/></svg></a>' +
      '<a class="fab fab--fb" href="' + SOCIAL.facebook + '" target="_blank" rel="noopener" aria-label="Follow us on Facebook" data-label="Facebook">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8.1v3h2.6V21h2.9Z"/></svg></a>' +
      '<a class="fab fab--wa" href="https://wa.me/' + WA_NUMBER + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" data-label="Chat on WhatsApp">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6a10 10 0 0 1-4-3.5c-.3-.4-1-1.3-1-2.6 0-1.2.6-1.8.9-2.1a1 1 0 0 1 .7-.3h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .5l-.3.5-.3.3c-.2.2-.3.3-.1.6.4.7.9 1.3 1.5 1.8.6.4 1 .6 1.3.7.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.2.5.3.1.2.1.6-.1 1.1Z"/></svg></a>';
    document.body.appendChild(wrap);
  }
  if (!document.querySelector(".fab-left")) {
    var fabLeft = document.createElement("div");
    fabLeft.className = "fab-left";
    fabLeft.innerHTML =
      '<button class="fab fab--top" id="backToTop" aria-label="Back to top">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 15 6-6 6 6"/></svg></button>';
    document.body.appendChild(fabLeft);
  }
  var backTop = document.getElementById("backToTop");
  if (backTop) backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Lead popup: callback form, shown once per visit ----------
     Opens shortly after the page loads and closes itself after POPUP_SECONDS
     (a countdown bar shows the time left) unless the visitor starts filling
     it in. The ×, a click outside or Esc closes it straight away.
     Add ?popup to any page URL to preview it again. */
  var FORM_KEY = "YOUR_ACCESS_KEY";   // Web3Forms key for the popup form (same key as contact.html)
  var POPUP_DELAY = 1500;             // ms after the page opens
  var POPUP_SECONDS = 10;             // how long it stays up if nobody touches it
  var POPUP_SEEN = "jk-popup-seen";
  var session = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k) { try { window.sessionStorage.setItem(k, "1"); } catch (e) { /* storage blocked */ } }
  };
  var noPopup = document.body.classList.contains("no-popup");
  if (noPopup) session.set(POPUP_SEEN); // e.g. the contact page — they've already found the form
  var forcePopup = /[?&]popup\b/.test(window.location.search);
  var canDialog = typeof HTMLDialogElement === "function" && typeof HTMLDialogElement.prototype.showModal === "function";

  if (canDialog && !noPopup && (forcePopup || !session.get(POPUP_SEEN))) {
    var tick = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 12 5 5L20 7"/></svg>';
    var courseOptions = [
      "Diploma in Montessori &amp; Child Education",
      "Diploma in Early Childhood Care &amp; Education",
      "Diploma in Pre-School &amp; Primary Education (DPPE)",
      "Diploma in Elementary Education",
      "Advance Diploma in Montessori &amp; Primary Education",
      "Advanced Diploma in Montessori, Kindergarten &amp; Nursery",
      "Phonics Fundamentals for Educators",
      "Certificate in Advanced Abacus Training",
      "For Schools / Partnership",
      "Not sure yet — please advise"
    ].map(function (c) { return "<option>" + c + "</option>"; }).join("");

    var pop = document.createElement("dialog");
    pop.className = "lead-pop";
    pop.setAttribute("aria-labelledby", "leadPopTitle");
    pop.setAttribute("aria-describedby", "leadPopLead");
    pop.innerHTML =
      '<button class="lead-pop__close" type="button" aria-label="Close" autofocus>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '<span class="lead-pop__timer" aria-hidden="true"></span>' +
      '<div class="lead-pop__media" aria-hidden="true">' +
        '<img src="assets/images/popup.jpg" alt="" width="600" height="900" decoding="async" fetchpriority="low">' +
        '<div class="lead-pop__media-copy">' +
          '<div class="lead-pop__stat">1,000<span>+</span></div>' +
          '<p>teachers trained since 2019</p>' +
          '<ul class="lead-pop__ticks">' +
            '<li>' + tick + 'Central Govt. certified</li>' +
            '<li>' + tick + 'World Skill Council · UK</li>' +
            '<li>' + tick + '100% placement support</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="lead-pop__body">' +
        '<span class="lead-pop__eyebrow">Free career counselling</span>' +
        '<h2 id="leadPopTitle">Start your Montessori teaching career</h2>' +
        '<p class="lead-pop__lead" id="leadPopLead">Leave your number and our team will call you back to help you choose the right course.</p>' +
        '<div class="form-success lead-pop__done" role="status">' +
          '<span class="lead-pop__done-ico">' + tick + '</span>' +
          '<h3>Thank you!</h3>' +
          '<p>We\'ve got your details. Our team will call you back shortly.</p>' +
        '</div>' +
        '<form class="form lead-pop__form" data-ajax data-access-key="' + FORM_KEY + '" novalidate>' +
          '<input type="hidden" name="subject" value="Callback request (popup) — Jolly Kids website">' +
          '<input type="hidden" name="from_name" value="Jolly Kids Website">' +
          '<input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">' +
          '<div class="field"><label for="lp-name">Your name <span class="req">*</span></label>' +
            '<input id="lp-name" name="name" type="text" placeholder="Full name" autocomplete="name" required></div>' +
          '<div class="field"><label for="lp-phone">Phone / WhatsApp <span class="req">*</span></label>' +
            '<input id="lp-phone" name="telephone" type="tel" placeholder="+91 ..." autocomplete="tel" inputmode="tel" minlength="10" required></div>' +
          '<div class="field"><label for="lp-course">Course of interest</label>' +
            '<select id="lp-course" name="course"><option value="">Select a course (optional)</option>' + courseOptions + '</select></div>' +
          '<button type="submit" class="btn btn--accent btn--lg">Request a free callback ' +
            '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
        '</form>' +
        '<a class="lead-pop__wa" href="https://wa.me/' + WA_NUMBER + '" target="_blank" rel="noopener">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6a10 10 0 0 1-4-3.5c-.3-.4-1-1.3-1-2.6 0-1.2.6-1.8.9-2.1a1 1 0 0 1 .7-.3h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .5l-.3.5-.3.3c-.2.2-.3.3-.1.6.4.7.9 1.3 1.5 1.8.6.4 1 .6 1.3.7.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.2.5.3.1.2.1.6-.1 1.1Z"/></svg>' +
          'Prefer WhatsApp? Chat with us</a>' +
      '</div>';
    document.body.appendChild(pop);

    var popTimer = pop.querySelector(".lead-pop__timer");
    var popForm = pop.querySelector("form");
    popTimer.style.animationDuration = POPUP_SECONDS + "s";

    var popClosing = false;
    var closePop = function () {
      if (!pop.open || popClosing) return;
      popClosing = true;
      if (prefersReduced) { pop.close(); return; }
      pop.classList.add("is-closing");                              // fade out, then close
      window.setTimeout(function () { if (pop.open) pop.close(); }, 280);
    };
    pop.addEventListener("close", function () {
      popClosing = false;
      pop.classList.remove("is-closing");
      document.body.classList.remove("lead-pop-lock");
    });
    pop.addEventListener("cancel", function (e) { e.preventDefault(); closePop(); }); // Esc
    // Close on a click outside the card — only when the press also started outside,
    // so selecting text in a field and releasing over the backdrop doesn't close it.
    var pressedOutside = false;
    pop.addEventListener("pointerdown", function (e) { pressedOutside = e.target === pop; });
    pop.addEventListener("click", function (e) {
      if ((e.target === pop && pressedOutside) || e.target.closest(".lead-pop__close")) closePop();
    });
    // Time's up — unless they've started filling it in
    popTimer.addEventListener("animationend", function () {
      if (!pop.classList.contains("is-engaged")) closePop();
    });
    var engage = function () { pop.classList.add("is-engaged"); };
    popForm.addEventListener("focusin", engage);
    popForm.addEventListener("input", engage);
    var popHeight = 0; // measured on submit (runs before the shared form handler below)
    popForm.addEventListener("submit", function () { popHeight = pop.offsetHeight; });
    popForm.addEventListener("jk:sent", function () {
      if (popHeight) pop.style.minHeight = popHeight + "px"; // keep the card the same size for the thank-you
      pop.classList.add("is-sent", "is-engaged");
      window.setTimeout(closePop, 4000);
    });

    var openPop = function () {
      if (pop.open) return;
      if (document.hidden) { // opened in a background tab — wait until it's actually being looked at
        document.addEventListener("visibilitychange", function onVisible() {
          if (document.hidden) return;
          document.removeEventListener("visibilitychange", onVisible);
          window.setTimeout(openPop, 600);
        });
        return;
      }
      session.set(POPUP_SEEN);
      document.body.classList.add("lead-pop-lock");
      pop.showModal();
    };
    window.setTimeout(openPop, POPUP_DELAY);
  }

  /* ---------- Sticky header shadow + progress bar + sticky CTA ---------- */
  var header = document.getElementById("header");
  var heroEl = document.querySelector(".hero, .page-hero");
  var onScroll = function () {
    var scrollY = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-stuck", scrollY > 10);
    if (backTop) backTop.classList.toggle("show", scrollY > 500);

    if (progressBar) {
      var docH = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var pct = docH > 0 ? Math.min(100, Math.max(0, (scrollY / docH) * 100)) : 0;
      progressBar.style.width = pct + "%";
    }
    if (stickyCta) {
      var pastHero = !heroEl || scrollY > (heroEl.offsetHeight * 0.6);
      var nearBottom = docHeightCheck();
      stickyCta.classList.toggle("show", pastHero && !nearBottom);
    }
  };
  function docHeightCheck() {
    var scrollY = window.scrollY || window.pageYOffset;
    var full = document.documentElement.scrollHeight || document.body.scrollHeight;
    return scrollY + window.innerHeight > full - 260; // hide near the footer CTA
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- Photo-slideshow parallax (home hero + subpage headers, subtle) ---------- */
  var heroBg = document.querySelector(".hero-bg, .page-hero-bg");
  if (heroBg && !prefersReduced) {
    var rafPending = false;
    var applyParallax = function () {
      rafPending = false;
      var y = window.scrollY || window.pageYOffset;
      var offset = Math.max(-32, Math.min(32, y * 0.12));
      heroBg.style.transform = "translateY(" + offset + "px)";
    };
    window.addEventListener("scroll", function () {
      if (!rafPending) { rafPending = true; requestAnimationFrame(applyParallax); }
    }, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  var closeMenu = function () {
    document.body.classList.remove("menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (links) {
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ---------- Scroll reveal (scroll-driven, never leaves content hidden) ---------- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (prefersReduced) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else if (reveals.length) {
    var revealInView = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach(function (el) {
        if (!el.classList.contains("in") && el.getBoundingClientRect().top < vh - 40) {
          el.classList.add("in");
        }
      });
    };
    revealInView();
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView);
    window.addEventListener("load", revealInView);
    // Safety net: guarantee everything is visible shortly after load
    window.setTimeout(function () {
      reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top < (window.innerHeight || 0)) el.classList.add("in");
      });
    }, 1200);
  }

  /* ---------- Accordion (curriculum) ---------- */
  var accItems = document.querySelectorAll(".acc-item");
  accItems.forEach(function (item) {
    var head = item.querySelector(".acc-head");
    var body = item.querySelector(".acc-body");
    if (!head || !body) return;
    head.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
    var setOpen = function (open) {
      item.classList.toggle("open", open);
      head.setAttribute("aria-expanded", open ? "true" : "false");
      body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
    };
    if (item.classList.contains("open")) body.style.maxHeight = body.scrollHeight + "px";
    head.addEventListener("click", function () {
      setOpen(!item.classList.contains("open"));
    });
  });
  // Open the accordion item a link points at (e.g. a course card's "Full syllabus" → #c-dmce)
  var openFromHash = function () {
    var target = window.location.hash.length > 1 && document.getElementById(window.location.hash.slice(1));
    if (target && target.classList.contains("acc-item") && !target.classList.contains("open")) {
      target.querySelector(".acc-head").click();
    }
  };
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
  // Recalculate open accordion heights on resize
  window.addEventListener("resize", function () {
    document.querySelectorAll(".acc-item.open .acc-body").forEach(function (b) {
      b.style.maxHeight = b.scrollHeight + "px";
    });
  });

  /* ---------- Gallery filter ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var galleryItems = document.querySelectorAll(".gallery-full .gallery__item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var cat = btn.getAttribute("data-filter");
      galleryItems.forEach(function (item) {
        var show = cat === "all" || item.getAttribute("data-cat") === cat;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Contact / testimonial forms ----------
     Delivers via Web3Forms when an access key is set on the form
     (data-access-key="..."). Until then it runs in demo mode and just
     shows the confirmation. Get a free key at https://web3forms.com. */
  var WEB3FORMS_PLACEHOLDER = "YOUR_ACCESS_KEY";
  document.querySelectorAll("form[data-ajax]").forEach(function (form) {
    var success = form.querySelector(".form-success") ||
      (form.parentElement && form.parentElement.querySelector(".form-success"));
    var btn = form.querySelector('button[type="submit"]');
    var reset = function () { if (btn) { btn.disabled = false; btn.style.opacity = "1"; } };
    var showOk = function () {
      if (success) {
        success.classList.add("show");
        if (!form.closest("dialog")) success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
      reset();
      form.dispatchEvent(new CustomEvent("jk:sent", { bubbles: true })); // lets the popup show its thank-you state
    };
    var showErr = function () {
      reset();
      alert("Sorry, something went wrong. Please call us on +91 93667 78777 or email jollykids2019@gmail.com.");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (btn) { btn.disabled = true; btn.style.opacity = ".7"; }

      var key = form.getAttribute("data-access-key");
      if (!key || key === WEB3FORMS_PLACEHOLDER) {
        // Demo mode — no backend configured yet.
        window.setTimeout(showOk, 500);
        return;
      }
      var data = new FormData(form);
      data.append("access_key", key);
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (r) { return r.json(); })
        .then(function (res) { res.success ? showOk() : showErr(); })
        .catch(showErr);
    });
  });

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  var animateCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var isYear = target > 1900 && target < 2100; // don't format years with commas
    var dur = 1500;
    var start = null;

    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.floor(eased * target);
      el.textContent = isYear ? String(val) : val.toLocaleString("en-IN");
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = (isYear ? String(target) : target.toLocaleString("en-IN")) + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  }
})();
