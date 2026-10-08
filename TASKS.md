# TheCalHub — Master Task Board (CEO Office)

**Mission:** Ship 100% of calculators with zero issues → qualify for Google AdSense fast → scale toward **1,000,000 daily users**.

**Rules of engagement**
- Every task has exactly **one owner agent**. No two agents edit the same file.
- A task is only marked `[x]` after its **Acceptance Check** passes locally (`npm run lint`, `npm run test:run`, `npm run build`).
- After finishing, the owning agent appends a line to **§ Change Log** at the bottom of this file.

**Verification commands (run from repo root)**
```bash
npm run lint        # tsc --noEmit  → must print 0 errors
npm run test:run    # vitest        → must print 0 failed
npm run build       # vite build    → must succeed
```

---

## Status Summary

| Phase | Owner | Status |
|---|---|---|
| 0. Baseline rescue (build/typecheck) | CEO | ✅ Done |
| 1. Core correctness & QA | Agent A — Core | ⬜ Not started |
| 2. AdSense & compliance | Agent B — Monetization | ⬜ Not started |
| 3. SEO content depth (125/125) | Agent C — Content | ⬜ Not started |
| 4. Performance & scale to 1M/day | Agent D — Infra | ⬜ Not started |
| 5. Growth, distribution & launch | Agent E — Growth | ⬜ Not started |
| 6. Final QA & release | CEO | ⬜ Not started |

---

## Phase 0 — Baseline Rescue ✅ (owner: CEO)

- [x] `npm install` executed; dependency tree restored.
- [x] **Build was broken** — `react-is` missing (recharts peer) → installed. `npm run build` now succeeds.
- [x] **10,720 TypeScript errors** — `@types/react` / `@types/react-dom` were absent → installed; errors went 10,720 → 2.
- [x] Audited routes, sitemap, SEO data, tests. Findings below feed Phases 1–5.

---

## Audit Findings (source of truth for the plan)

| # | Severity | Finding |
|---|---|---|
| F1 | 🔴 Blocker | **Every calculator page renders generic fallback SEO content.** `getSEOContent()` is called with hyphen ids (`addition-calculator`) but `SEO_DATA` keys are underscored (`addition_calculator`) → **0/125 lookups ever succeed**. Thin content = AdSense rejection. |
| F2 | 🔴 Blocker | **59/125 calculators have no dedicated SEO entry at all** (BMI, EMI, GST, mortgage, SIP… — the highest-volume keywords). |
| F3 | 🔴 Blocker | **5 sitemap URLs have no route → 404**: `/about.html`, `/faq.html`, `/tutorials.html`, `/calculator-suite.html`, `/construction.html`. |
| F4 | 🔴 Blocker | **4 page components exist but are never routed**: `FAQ.tsx`, `Tutorials.tsx`, `CalculatorSuite.tsx`, `FinancialTools.tsx`. |
| F5 | 🟠 High | **11 dead links on the dashboard** (`src/data/data.js`): `/unit-converter.html`, `/binary-converter.html`, `/color-converter.html`, `/hex-converter.html`, `/timestamp-converter.html`, `/uuid-generator.html`, `/algebra-solver.html`, `/countdown-timer.html`, `/workdays-calculator.html`, `/margin-calculator.html`, `/construction.html`. |
| F6 | 🟠 High | **Duplicate route** `/financial.html` declared twice in `src/App.tsx` (lines 412 & 541) — React Router silently keeps the first, so `FinancialPage` is unreachable. |
| F7 | 🟠 High | **No `robots.txt`** and **no `ads.txt`** in `public/` → AdSense site verification cannot complete. |
| F8 | 🟠 High | **No custom 404 page** — `path="*"` renders `Dashboard`, so every typo URL serves a 200 with homepage content (soft-404, hurts SEO + AdSense). |
| F9 | 🟠 High | **Google Analytics ID is a placeholder** `G-XXXXXXXXXX` in `index.html` and `src/lib/analytics.ts` → no measurement, and a broken third-party script on the page. |
| F10 | 🟠 High | **No AdSense integration exists** (no `ca-pub`, no `adsbygoogle`). |
| F11 | 🟡 Medium | **10/16 unit tests fail** — tests assert titles (`BMI Calculator`) but titles are rendered by `CalculatorPageLayout`, not by the bare component. |
| F12 | 🟡 Medium | **2 TS errors** — `motion` used but never imported in `src/components/calculators/TipCalculator.tsx` (lines 77, 96). |
| F13 | 🟡 Medium | **`getRandomRelatedCalculators()` emits dead links** for short keys (`bmi` → `/bmi.html`, `emi` → `/emi.html`). |
| F14 | 🟡 Medium | **Main bundle 563 kB (147 kB gzip)** — `Dashboard`, `data.js` and all page components are eagerly imported in `App.tsx`; only calculators are lazy. |
| F15 | 🟡 Medium | **No hosting config** — no `vercel.json` / `netlify.toml` / `_redirects` / `_headers`, so `.html` SPA fallback and cache headers are undefined. |
| F16 | 🟡 Medium | **No CI** (`.github/` absent) despite `IMPROVEMENTS.md` claiming CI/CD is done. |
| F17 | 🟢 Low | `README.md` is still the AI-Studio template and points at a non-existent `.env.local` key. |

---

## Phase 1 — Core Correctness & QA
**Owner:** Agent A — Core Engineer
**Files you own (do NOT touch any other file):**
`src/App.tsx`, `src/data/data.js`, `src/components/calculators/**`, `src/pages/NotFound.tsx` (new), `src/pages/FAQ.tsx`, `src/pages/Tutorials.tsx`, `src/pages/CalculatorSuite.tsx`, `src/pages/FinancialTools.tsx`, `src/components/calculators/calculators.test.tsx`, `package.json`, `README.md`

- [ ] **A1** Fix F12: import and use `motion` correctly in `TipCalculator.tsx` (or replace with plain `<div>` — match the styling used by sibling calculators).
- [ ] **A2** Fix F11: make all 16 tests pass. Render each calculator inside `CalculatorPageLayout` (the real page shell) *or* assert against text the component itself renders. Tests must stay meaningful — do not delete assertions.
- [ ] **A3** Fix F6: remove the duplicate `/financial.html` route so `FinancialPage` wins; keep `Dashboard` only at `/`, `/index.html`, `/all.html`.
- [ ] **A4** Fix F4: route `/about.html` → `About`, `/faq.html` → `FAQ`, `/tutorials.html` → `Tutorials`, `/calculator-suite.html` → `CalculatorSuite`, `/financial-tools.html` → `FinancialTools`, plus `/construction.html` category page.
- [ ] **A5** Fix F5: for each of the 11 dead `data.js` paths either (a) point at an existing calculator, or (b) drop the entry. **No link may resolve to the wildcard route.**
- [ ] **A6** Fix F8: create `src/pages/NotFound.tsx` (real 404 UI with search + top calculator links) and wire `path="*" → NotFound`.
- [ ] **A7** Remove any `<Route>` whose `path` is declared twice anywhere in `App.tsx` (grep for duplicates).
- [ ] **A8** Add coverage: at least one test per calculator category (finance, health, math, construction, trading, scientific, programming, fitness, datetime) rendering through `CalculatorPageLayout`.
- [ ] **A9** Refresh `README.md` (F17): real project name, stack, commands, no AI-Studio links.

**Acceptance Check (A):**
```
npm run lint      → 0 errors
npm run test:run  → 0 failed
npm run build     → succeeds
grep -c 'path="' src/App.tsx  → no duplicate path values
```

---

## Phase 2 — AdSense Approval & Compliance
**Owner:** Agent B — Monetization & Compliance
**Files you own:** `public/**` (except `sw.js`, `manifest.json`), `index.html`, `src/components/layout/PageSEO.tsx`, `src/components/common/AdSlot.tsx` (new), `src/pages/PrivacyPolicy.tsx`, `src/pages/TermsOfService.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/lib/analytics.ts`, `vercel.json`, `netlify.toml`, `public/_redirects`, `public/_headers`, `docs/ADSENSE_CHECKLIST.md`

- [ ] **B1** Fix F7: create `public/robots.txt` allowing all crawlers, blocking nothing that matters, and pointing at `/sitemap.xml`.
- [ ] **B2** Fix F7: create `public/ads.txt` with the `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` line behind an `VITE_ADSENSE_CLIENT` env var documented in `.env.example` (use the real `pub-` id once issued; never hardcode a fake one as live).
- [ ] **B3** Fix F9: make the GA4 measurement ID come from `import.meta.env.VITE_GA_ID`. If unset, **do not inject the gtag script at all** (no broken third-party requests).
- [ ] **B4** Fix F10: build `src/components/common/AdSlot.tsx` — renders a reserved-size `<ins class="adsbygoogle">` only when `VITE_ADSENSE_CLIENT` is set, lazy-loads the adsbygoogle script once, and pushes to `dataLayer` safely. Zero layout shift, never above the fold, never inside the calculator form, never between instructions and results, never under a heading.
- [ ] **B5** Place ad slots in `CalculatorPageLayout`… **coordinate with Agent C**: you may only add the import/usage line to `src/components/CalculatorPageLayout.tsx` after telling the CEO — that file is shared. Default placements: (1) after the calculator widget, (2) after the FAQ block.
- [ ] **B6** Fix F8-adjacent: ensure server returns **HTTP 404** for unknown `.html` URLs via `_redirects` / `vercel.json` (`:splat → /index.html 200` for SPA routing, but unknown paths must still render `NotFound` client-side with a `noindex` meta).
- [ ] **B7** Compliance content: Privacy Policy must disclose cookies, Google Analytics, **Google AdSense + the DoubleClick DART cookie**, third-party vendors, and user opt-out (`https://aboutads.info/choices/`). Terms of Service must state the "for informational purposes only, not financial/medical advice" disclaimer.
- [ ] **B8** Add AdSense-specific `<meta name="google-adsense-account">` + site verification hooks to `index.html` behind env vars.
- [ ] **B9** Verify `PageSEO.tsx` emits `og:image`, `twitter:image`, `og:site_name`, `og:locale`, `article:*` and that JSON-LD is valid (`SoftwareApplication` + `FAQPage` + `BreadcrumbList`).
- [ ] **B10** Write `docs/ADSENSE_CHECKLIST.md`: every requirement with status — content quality/length, ≥15–20 unique pages of substantial text, navigation, about/contact/privacy/terms present, no broken links, site uptime, domain age, no copyright abuse, no prohibited content (politics/adult/clickbait), ad code policy compliance, `ads.txt`, no self-clicking, mobile-friendly.

**Acceptance Check (B):**
```
ls public/robots.txt public/ads.txt         → both exist
npm run build                               → succeeds
grep -rn "G-XXXXXXXXXX" index.html src/     → no matches (or gated by env)
node scripts/audit-links.cjs                → 0 broken internal links (see A5)
```

---

## Phase 3 — SEO Content Depth (make 125/125 calculators unique)
**Owner:** Agent C — Content & SEO Engineer
**Files you own:** `src/data/seo-data.tsx`, `src/components/CalculatorPageLayout.tsx`, `src/components/common/SEOContentSection.tsx`

- [ ] **C1** 🔴 **Fix F1 — the single biggest bug.** In `getSEOContent()`, normalise the lookup: `SEO_DATA[id] || SEO_DATA[id.replace(/-/g,'_')] || SEO_DATA[id.replace(/_/g,'-')]`, and also strip trailing `-calculator` variants where a short key exists (`bmi-calculator` → `bmi`, `emi-calculator` → `emi`). **Prove it with a test**: `getSEOContent('addition-calculator').title` must not be `"Free Online"`.
- [ ] **C2** Fix F13: `getRandomRelatedCalculators()` must map keys back to **real routes** (reuse the route table, or keep a `key → path` map). Add a test that asserts every generated `path` exists in `App.tsx`.
- [ ] **C3** Fix F2: write **unique, substantial SEO content for all 59 calculators currently missing an entry** (list below). Each entry needs: unique `title`, `subtitle`, ≥120-word `introduction`, `mainContent` with 2–3 `<h3>` sections + real explanation/formula/tips, **10 unique FAQs**, and 3+ `relatedCalculators` pointing at real paths.
  > BMI, calorie, GST, tip, EMI, financial, date, compound-interest, FD, RD, NPS, PPF, home-loan, car-loan, personal-loan, mortgage, investment, scientific, programming, stair, gravel, wood, cubic-yards, investment-pnl, liquidation, DCA, basic-arithmetic, trigonometric, logarithmic, complex-number, matrix, statistical, unit-conversion, graphing, scientific-constants, time-complexity, big-o, binary-hex-decimal, bitwise, regex-tester, json-formatter, hash-generator, base64, code-beautifier, memory-size, trigonometry, body-fat, macro, ideal-weight, water-intake, heart-rate, pregnancy, ovulation, vector, scientific-notation, logarithm, exponential, percent, standard.
- [ ] **C4** Rewrite any existing entry whose `introduction` is under 120 words or whose FAQs are duplicated across calculators (audit with a script; report the count).
- [ ] **C5** Extend `SEOContentSection` with: "How we calculate this" formula block, a worked example, and a table of common values — this is what makes a page worth ranking.
- [ ] **C6** Add `BreadcrumbList` JSON-LD via `CalculatorPageLayout` (Home › Category › Calculator).

**Acceptance Check (C):**
```
npm run test:run   → includes new SEO lookup tests, all green
npm run lint       → 0 errors
<audit script>     → 0 calculators with fallback content, 0 dead related links
```

---

## Phase 4 — Performance & Scale to 1,000,000 Users/Day
**Owner:** Agent D — Infrastructure & Performance
**Files you own:** `vite.config.ts`, `src/main.tsx`, `src/App.tsx` **(shared — coordinate: you may ONLY change import style to `lazy()`, Agent A owns routes)**, `public/sw.js`, `public/manifest.json`, `scripts/audit-links.cjs` (new), `docs/PERFORMANCE.md`, `package.json` scripts **(coordinate with A)**

- [ ] **D1** Fix F14: `React.lazy()` + `<Suspense>` for **all** page components in `App.tsx` (Dashboard stays eager for first paint). Target: initial JS < 200 kB gzip.
- [ ] **D2** Configure `build.rollupOptions.output.manualChunks` in `vite.config.ts`: `react`/`react-dom`/`react-router` → `vendor-react`; `recharts` → `vendor-charts`; `motion` → `vendor-motion`; `lucide-react` → `vendor-icons`. Add `chunkSizeWarningLimit` only after real numbers improve.
- [ ] **D3** Fix F15: add `public/_redirects` (Netlify/Cloudflare) **and** `vercel.json` rewrites so every route works on direct load; immutable cache for `/assets/*`, short cache for `index.html`, `sw.js` `no-cache`.
- [ ] **D4** Service worker (`public/sw.js`): cache-first for hashed assets, network-first for HTML, offline fallback. Verify the PWA still installs (`manifest.json` has icons, `short_name`, correct `start_url`, `display: standalone`).
- [ ] **D5** Write `scripts/audit-links.cjs`: parses `src/App.tsx` routes + `src/data/data.js` + `src/data/seo-data.tsx` related links + `public/sitemap.xml` and exits non-zero on any internal link without a route. Add `npm run audit:links`.
- [ ] **D6** Rewrite `scripts/generate-sitemap.cjs` to **derive URLs from `App.tsx` routes** (single source of truth) so the sitemap can never drift again; regenerate `public/sitemap.xml`; add `npm run sitemap`.
- [ ] **D7** Core Web Vitals targets documented in `docs/PERFORMANCE.md` with before/after numbers: LCP < 2.0 s, CLS < 0.05, INP < 200 ms, TTFB < 400 ms on 4G throttled.
- [ ] **D8** Load-test plan for 1M/day (~11.6 req/s average, ~40–60 req/s peak): static host + CDN config, gzip/brotli, HTTP/2, edge caching, and the GitHub Actions workflow (`.github/workflows/ci.yml`) running lint + test + build + `audit:links` + `sitemap` on every push (fixes F16).
- [ ] **D9** Measure bundle before/after with `npm run build` and record gzip sizes in `docs/PERFORMANCE.md`.

**Acceptance Check (D):**
```
npm run build          → succeeds, index chunk < 200 kB gzip
npm run audit:links    → 0 broken internal links
npm run lint           → 0 errors
npm run test:run       → 0 failed
```

---

## Phase 5 — Growth to 1,000,000 Daily Users
**Owner:** Agent E — Growth & Editorial
**Files you own:** `src/pages/Blog.tsx`, `src/data/blog/**` (new if needed), `docs/GROWTH.md`, `public/og-image.svg` / share image assets, `src/lib/i18n.tsx`

> ⚠️ **CEO note — be honest about the number.** 1M users/day ≈ 30M/month. That is only reachable via (a) hundreds of long-tail calculator landing pages ranking on Google, (b) programmatic SEO across unit/currency/language variants, and (c) distribution. No paid or bot traffic — it would void AdSense. This phase is a staged plan, not a promise.

- [ ] **E1** Write `docs/GROWTH.md`: keyword map (head terms: *emi calculator, bmi calculator, sip calculator, age calculator*; long-tail: *5 lakh car loan emi, 180cm 75kg bmi*), a 12-month traffic model, and the funnel (SERP → calculator → related calculator → return visit).
- [ ] **E2** Ship **12+ genuinely useful blog articles** (1,500+ words each, original, with diagrams/tables) targeting informational queries that feed the calculators — e.g. "EMI formula explained", "How much house can I afford", "BMI ranges by age", "SIP vs lump sum".
- [ ] **E3** Build a **unit-conversion hub** (length/weight/temp/area/volume/currency) — one of the highest-volume calculator categories and currently only a dead link (F5).
- [ ] **E4** Internal-linking rules: every blog article links to ≥3 calculators; every calculator links to ≥3 related + 1 blog post; category hub pages link to all calculators in the category.
- [ ] **E5** Share image per calculator (`og:image`) + working social preview cards.
- [ ] **E6** Distribution checklist: submit to Google Search Console, Bing Webmaster, submit sitemap; product-hunt/HN/reddit-ready listing copy; free-tool directory submissions.
- [ ] **E7** Localisation groundwork in `src/lib/i18n.tsx` (en + hi + es) — calculators translate 1:1 into new landing pages, the cheapest programmatic-SEO multiplier available.
- [ ] **E8** Define the retention loop: favourites + history + `Notepad` + `Pomodoro` + `Clock` are already built — surface them so users return (this is what lifts daily-active above one-shot search visits).

**Acceptance Check (E):**
```
npm run build        → succeeds
npm run audit:links  → 0 broken links
Blog pages           → each has unique title/description/JSON-LD and ≥1500 words
```

---

## Phase 6 — Final QA & Release (owner: CEO)

- [ ] **6.1** Full gate: `npm run lint && npm run test:run && npm run build && npm run audit:links` all green in CI.
- [ ] **6.2** Manual Lighthouse pass on `/`, `/bmi-calculator.html`, `/emi-calculator.html`, `/blog.html` — Performance ≥ 90, Accessibility ≥ 95, SEO = 100.
- [ ] **6.3** Crawl the site (or run the link auditor) — 0 broken links, 0 duplicate titles, 0 pages without meta description.
- [ ] **6.4** AdSense pre-submit review against `docs/ADSENSE_CHECKLIST.md` — every box ticked.
- [ ] **6.5** Deploy, verify `https://thecalhub.com/robots.txt`, `/ads.txt`, `/sitemap.xml` all return 200 with correct content.
- [ ] **6.6** Submit AdSense application; monitor `Search Console` coverage.

---

## Definition of Done (project-level)

1. `npm run lint` → **0 errors**, `npm run test:run` → **0 failures**, `npm run build` → **success**.
2. All **125 calculator routes** reachable, each with **unique long-form SEO content** (no fallback page anywhere).
3. **0 broken internal links** (dashboard, related-calculator blocks, footer, sitemap).
4. `robots.txt`, `ads.txt`, custom 404, Privacy Policy, Terms, Contact, About all live.
5. AdSense code gated behind env vars and correctly placed; GA loads a real ID or not at all.
6. Initial JS < 200 kB gzip; CI green on every push.

---

## Change Log

> Every agent appends: `- [ISO date] <Agent> — <what changed>`

- [2026-10-07] CEO — Project audit complete; created this board; Phase 0 rescue done (react-is, @types/react, @types/react-dom installed; build fixed; 10,720 → 2 TS errors).
