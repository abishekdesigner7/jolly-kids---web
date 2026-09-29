# Jolly Kids Montessori Training Institute — Website

A modern, responsive, multi-page marketing website (static HTML/CSS/JS — no build step, no framework).

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Us |
| `courses.html` | Courses (curriculum, syllabus, career prospects) |
| `for-schools.html` | For Schools (B2B services) |
| `gallery.html` | Gallery (filterable) |
| `testimonials.html` | Testimonials + submission form |
| `contact.html` | Contact (form + live map) |
| `404.html` | Not-found page |

## File structure
```
/
├─ index.html, about.html, courses.html, …   ← pages
├─ robots.txt, sitemap.xml
├─ assets/
│  ├─ css/styles.css      ← all styles (design system)
│  ├─ js/main.js          ← nav, reveals, counters, accordion, gallery filter, forms
│  └─ images/             ← logo, photos, favicon  (⬅ add real images here)
└─ content-inventory.md, design-research.md, inspiration-*.md   ← research docs
```

## Preview locally
From this folder:
```bash
python3 -m http.server 8123
```
Then open http://localhost:8123 . (Open via a server, not by double-clicking the file, so the CSS/JS load.)

## Deploy
It's a static site — host it anywhere:
- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop this folder, or connect a git repo. Zero config.
- **GitHub Pages:** push to a repo, enable Pages.
- **cPanel / shared hosting:** upload all files to `public_html`.

---

## ✅ Before going live — replace these placeholders

1. ~~**Logo**~~ ✓ done (`assets/images/logo.png`).
2. ~~**Photos**~~ ✓ done — home slideshow in `assets/images/hero/` (`slide-N.jpg` 2000w, `-1400` for laptops, `-m` portrait crops for phones); page-header and gallery photos in `assets/images/gallery/` (`sm/` holds the 800w phone versions).
3. **Social share image** → `assets/images/og-image.jpg` (1200×630) — shown when the link is shared on WhatsApp/Facebook.
4. **Contact & testimonial forms** → the forms use [Web3Forms](https://web3forms.com) (free). Get an access key and replace `YOUR_ACCESS_KEY` in **`contact.html`** and **`testimonials.html`** (`data-access-key="…"`), and in **`FORM_KEY`** near the top of `assets/js/main.js` (the popup form). Until then, forms show a confirmation but don't send email.
5. **Social links** → set to Instagram `@jollykidsmontngl` and `facebook.com/jollykidsmontngl` — have the client confirm both are the official accounts. The floating buttons read from `SOCIAL` at the top of `assets/js/main.js`; the footer icons are in each page's footer.
6. **Confirm details** (currently used: 6/33A, phone +91 93667 78777):
   - Address door number: **6/33A** vs **6/33B** (sources differ).
   - Second phone: **9080505070** vs **9363015070** — add once confirmed.
7. **Course fees** → not shown; the contact form's "course of interest" collects enquiries instead.
8. **Domain** → if not `jollykidsmontngl.com`, update the URLs in each page's `<link rel="canonical">` / `og:url`, plus `sitemap.xml` and `robots.txt`.

## Notes
- **Floating buttons** (Instagram, Facebook, WhatsApp at bottom-right; back-to-top at bottom-left) are injected by `assets/js/main.js`. WhatsApp is set to `919366778777` — change `WA_NUMBER` at the top of that file to update it everywhere.
- **Callback popup:** shows once per visit, 1.5 s after the first page opens (not on `contact.html` or `404.html`, via `class="no-popup"` on `<body>`). It closes itself after 10 s — a countdown bar shows the time left — unless the visitor starts filling it in. Change `POPUP_DELAY` / `POPUP_SECONDS` at the top of `assets/js/main.js`. To preview it again in the same tab, add `?popup` to any page URL.
- **Map** on the contact page is a keyless Google Maps embed centred on the address — no API key needed.
- **Cache busting:** CSS/JS are linked with a version number (`styles.css?v=15`, `main.js?v=5`). After editing either file, bump its number on every page so browsers load the new version.
- Built to be accessible (skip link, keyboard nav, reduced-motion support) and SEO-ready (meta, Open Graph, JSON-LD, sitemap).
