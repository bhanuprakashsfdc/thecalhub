# Performance & Scale — TheCalHub

**Owner:** Agent D — Infrastructure (Phase 4)
**Last measured:** 2026-10-08, `npm run build` (Vite 6, React 19), Node 20, final gate run.
All numbers in this document were produced by running the commands shown next to them. No figure is estimated unless it is explicitly labelled as an estimate.

---

## 1. Bundle: before / after

### 1.1 Baseline (pre-optimisation, from the Phase 0 audit — finding F14)

| Asset | Raw | Gzip |
|---|---:|---:|
| `index-*.js` (single entry chunk, everything eager) | 563.18 kB | 146.60 kB |
| `vendor-motion` | 128.62 kB | not recorded |
| `PieChart-*.js` (recharts pulled into an async route chunk) | 302.28 kB | not recorded |

The audit baseline is cited as **563 kB / 147 kB gzip** for the main chunk. At that point only calculators were `lazy()`; `Dashboard`, `data.js`, `CalculatorPageLayout` and every page component were eagerly imported, and recharts was duplicated into whichever route first imported it.

### 1.2 Today — `npm run build` (2026-10-08, final gate)

| Chunk | Raw | Gzip (Vite) | Gzip (`gzip -9`, verified) | Loaded |
|---|---:|---:|---:|---|
| `index-*.js` (entry) | 767.40 kB | **208.46 kB** | 208.13 kB | first paint |
| `vendor-react` (react, react-dom, scheduler, react-router, react-helmet-async, clsx) | 277.81 kB | 88.62 kB | 88.28 kB | first paint |
| `vendor-motion` (motion, framer-motion, motion-dom) | 127.89 kB | 42.02 kB | 41.83 kB | first paint |
| `vendor-icons` (lucide-react, tree-shaken) | 46.96 kB | 9.98 kB | 9.96 kB | first paint |
| `vendor-charts` (recharts + d3 + redux toolchain) | 382.48 kB | 112.58 kB | 112.12 kB | **only** on chart routes |
| `index-*.css` | 59.20 kB | 10.21 kB | 10.11 kB | first paint |
| 144 lazy route chunks (149 JS files total, 150 asset files) | 728.19 kB combined | — | — | on demand |

- Largest lazy route chunk: `Blog-*.js` 25.29 kB / 9.93 kB gzip. Every calculator chunk is **1–14 kB raw / 0.6–4.3 kB gzip**.
- Total emitted JS + CSS: **2,389.93 kB raw** across 150 files; `dist/` = 2.65 MB.
- Reproduce: `npm run build`, or the per-file table in the build log.

**First-load payload (entry + the three `modulepreload` vendor chunks + CSS):**

| | Raw | Gzip |
|---|---:|---:|
| JS (entry + vendor-react + vendor-motion + vendor-icons) | 1,220.06 kB | **349.08 kB** |
| CSS | 59.20 kB | 10.21 kB |
| Documents loaded on first paint | 5 files | — |

### 1.3 Progress and honest status against the targets

| Target | Result |
|---|---|
| Main `index-*.js` chunk < 200 kB gzip (Phase 4 acceptance) | ❌ **208.46 kB gzip** — over by 8.46 kB. It passed at 146.67 kB three content batches earlier |
| Code-splitting + vendor chunking (D1/D2) | ✅ 144 lazy route chunks, 4 stable vendor chunks, `vendor-charts` fully out of the first load |
| Initial JS < 200 kB gzip (Definition of Done) | ❌ **349.08 kB gzip** — over budget, see below |

**The entry chunk is growing in real time as SEO copy lands.** Seven builds on 2026-10-08, all from the same config:

| Build (during this session) | Entry raw | Entry gzip | Why |
|---|---:|---:|---|
| 1 | 290.33 kB | 64.86 kB | code-splitting + `manualChunks` landed |
| 2 | 315.96 kB | 72.95 kB | Phase 3 SEO copy added |
| 3 | 379.26 kB | 91.60 kB | Phase 3 SEO copy added |
| 4 | 561.78 kB | 146.67 kB | Phase 3 SEO copy added (59 calculators filled in) |
| 5 | 725.71 kB | 196.76 kB | more Phase 3 copy (transiently broken tree, fixed same session) |
| 6 | 765.59 kB | 208.07 kB | more Phase 3 copy — **crossed the 200 kB acceptance threshold** |
| 7 (final gate) | **767.40 kB** | **208.46 kB** | content is still landing; expect ±2 kB per commit |

Root cause: `src/App.tsx` eagerly imports `CalculatorPageLayout`, which imports the entire SEO corpus.

```
App.tsx → CalculatorPageLayout → seo-data*.tsx   (705,251 B of source, 186,687 B gzipped)
```

Verified: those strings appear **only** in `dist/assets/index-*.js` — no lazy chunk contains them, so every byte is paid on the first paint of the dashboard, where it is never rendered. The SEO corpus's raw source is 92% of the entry chunk's raw size (705,251 B vs 767,399 B), and it gzips to 187 kB — i.e. essentially the whole of the 208.46 kB entry gzip is content the dashboard never displays.

**Recommended fix (1 line, not made here because Agent A owns `src/App.tsx`):**

```ts
const CalculatorPageLayout = lazy(() => import('./components/CalculatorPageLayout'));
```

Estimated saving: **~180–190 kB gzip off the first load** (349 kB → ~162 kB gzip, back under the 200 kB budget) — `CalculatorPageLayout` is only ever rendered inside already-lazy routes, so nothing visible changes. Secondary levers if the budget is missed again: `Dashboard.tsx` imports `motion/react` (42 kB gzip, in the first load because `Dashboard` must be eager) — a CSS transition would remove it; and `App.tsx` imports six `lucide-react` icons eagerly (~10 kB gzip).

Until that line lands, **every content batch is paid for on the dashboard's first paint**, and the Phase 4 acceptance check (`index chunk < 200 kB gzip`) is already failing at hand-off. This is the single highest-leverage performance change left in the codebase.

`chunkSizeWarningLimit` has **not** been raised. Vite's 500 kB warning threshold stays in force as a tripwire — note that build 4 (561.78 kB) is already back over it, which is exactly the signal it exists to give.

---

## 2. Core Web Vitals

| Metric | Target | Status |
|---|---|---|
| LCP | < 2.0 s (4G throttled) | ❌ **3.0 s** on `/`, **3.2 s** on `/bmi-calculator.html` (lab) |
| CLS | < 0.05 | ✅ 0 on `/` · ❌ **0.235 on calculator pages** |
| INP | < 200 ms | ✅ TBT 0 ms lab (INP proxy) |
| TTFB | < 400 ms | ⚠️ must be validated at the CDN edge (0–10 ms localhost is meaningless) |

**Lab measurements** — Lighthouse 13, mobile emulation with simulated throttling, run against `vite preview` on localhost, 2026-10-08, build 6 (`index-DMN246kx.js`, 765.59 kB entry):

| Page | Perf score | FCP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|
| `/` | 89 | 2.9 s | **3.0 s** | **0** | 0 ms |
| `/bmi-calculator.html` | 76 | 3.0 s | **3.2 s** | **0.235** | 0 ms |

These are *lab* numbers on localhost: they understate CDN TTFB and overstate variance. Field data (§5) is the source of truth once deployed. Both metrics that miss their target trace back to two concrete defects, both outside this agent's file ownership:

1. **LCP** — the first paint must download a 208.46 kB-gzip entry chunk whose bulk is never rendered on the dashboard (§1.3). Fixing the eager `CalculatorPageLayout` import is the expected way back under 2.0 s; this is the same one-line change.
2. **CLS** — the `CalculatorLoader` Suspense fallback in `App.tsx` reserves `min-h-[60vh]` while the real calculator page renders ~5,000 px of content at mobile width; the footer (the element Lighthouse flags) is pushed down when the lazy chunk resolves. Fix belongs to the route/layout owner: reserve the real content height in the fallback, or render the SEO block inside a fixed-height container until the chunk lands.

**How the architecture targets each metric:**

- **LCP < 2.0 s** — `Dashboard` is the only eagerly-rendered page, so the first paint needs 5 files; every other page is `React.lazy()`. The four vendor chunks are content-hashed and therefore **cached across page views**: a second page view downloads zero JS. `<link rel="modulepreload">` is emitted by Vite for all first-load chunks, and the service worker serves them cache-first (§3). Remaining gap: the SEO corpus described in §1.3.
- **CLS < 0.05** — `AdSlot` renders `<aside style={{minHeight: height}}>` and returns `null` entirely when `VITE_ADSENSE_CLIENT` is unset, so ads can never shift layout; skeletons are used for route transitions. Home page measures CLS 0. The calculator-page defect is documented above.
- **INP < 200 ms** — no long tasks on the main line: calculators compute on user input in plain JS with no framework work per keystroke; `motion` is isolated in `vendor-motion` so its ~128 kB parses on a separate chunk load rather than in the entry's critical path; lab TBT 0 ms.
- **TTFB < 400 ms** — fully static output served from CDN edge with `Cache-Control` set per §3; HTML is revalidated (`no-cache`) but is a single ~1 kB document, so edge TTFB is the only term.

---

## 3. Caching strategy

| Path | Header | Why |
|---|---|---|
| `/assets/*` | `public, max-age=31536000, immutable` | content-hashed filenames — a new deploy writes new URLs, so a year of caching is safe |
| `/*.html`, `/`, `/index.html` | `no-cache` | revalidate every visit so a deploy is visible immediately (the HTML is the only un-hashed file that matters) |
| `/sw.js` | `no-cache` + `Service-Worker-Allowed: /` | a stale worker would pin an old app forever |
| `/manifest.json`, `/sitemap.xml`, `/robots.txt`, `/ads.txt` | `no-cache` | crawlers and the PWA must see updates immediately |
| everything else (fonts/icons) | default | — |

Defined in three places with identical values: `vercel.json` (`headers`), `netlify.toml` (`[[headers]]`) and `public/_headers`. Neither host's rules shadow static files: Vercel's default `rewrites` run **after** the filesystem and Netlify's `/* → /index.html 200` never shadows existing files (no `!` force flag), so `robots.txt`, `ads.txt` and `sitemap.xml` are served as plain static files.

**SPA fallback:** `vercel.json` rewrites `/(.*) → /index.html`, `netlify.toml` / `_redirects` `/* → /index.html 200`. Every one of the 149 routes resolves on direct load (verified: `vite preview` returns 200 for `/bmi-calculator.html`); unknown paths render `src/pages/NotFound.tsx` client-side with `noindex`.

**Compression:** Vite minifies and bundles everything at build time; Vercel and Netlify both negotiate Brotli/gzip at the edge for text MIME types (no config needed). Netlify's JS/CSS re-minification is deliberately **off** (`netlify.toml → build.processing.*.minify = false`): re-running a minifier over Vite's already-minified ESM output risks corrupting it and buys nothing. `pretty_urls` stays `false` because every route in this app ends in `.html`.

**Service worker (`public/sw.js`, registered in `src/main.tsx`, production builds only):**

| Request | Strategy |
|---|---|
| same-origin `/assets/*` (hashed) | **cache-first** — immutable, no reason to hit the network twice |
| HTML navigations | **network-first**, falls back to cache, then to the cached `/index.html` (offline shell) |
| cross-origin (`googletagmanager.com`, `google-analytics.com`, `doubleclick.net`, `googlesyndication.com`, `pagead2.googlesyndication.com`), `adsbygoogle.js`, `/sw.js` itself | **not intercepted at all** (`shouldNeverCache()` + origin check) — ad and analytics requests are never cached or delayed |
| non-GET requests | not intercepted |

Caches are versioned (`thecalhub-static-v2`, `thecalhub-pages-v2`); `activate` deletes every other `thecalhub-*` cache, so a deploy reclaims storage and never serves a stale bundle. Only `200` responses are cached (never `opaque` or error responses).

---

## 4. Capacity model — 1,000,000 daily users

**Arithmetic (page loads):**

```
1,000,000 users/day ÷ 86,400 s/day      ≈ 11.6 page loads/s  (1 page view each)
2–4 page views/session                   → 23–46 page loads/s average
peak factor 2–3× (morning / evening)     → ~70–140 page loads/s peak
```

**Arithmetic (HTTP requests):** a cold first visit requests 1 HTML + 4 JS + 1 CSS = 6 documents; a warm visit (immutable assets in browser cache, or service-worker cache-first) requests **1 HTML**. Average request rate is therefore ~30–140 req/s, worst case ~250 req/s during a cold-traffic spike with a 100% cache-miss ratio.

**Why this is trivial for a static host + CDN:** the whole site is 2.65 MB of pre-built files with no server-side rendering, no database and no API. A single CDN edge node serves thousands of req/s per node and the provider runs dozens of them; the origin only ever sees (a) deploys and (b) cache misses for `index.html`, i.e. ~20–100 req/s — two to three orders of magnitude below any realistic limit. HTTP/2 (both hosts), Brotli and edge caching mean the payload per warm request is ~1 kB of HTML.

**What to watch and when to escalate:**

| Signal | Source | Healthy | Escalate when |
|---|---|---|---|
| Impressions / clicks | Google Search Console (Performance) | steady growth | sudden drop → indexing or uptime incident |
| TTFB p95 | CDN/host analytics or RUM | < 400 ms | > 400 ms for 15 min, or > 1 s at any time |
| Error rate (5xx / 4xx on HTML) | host logs / uptime monitor | < 0.1% | > 0.5% for 10 min → check host status page |
| Core Web Vitals (field) | Search Console → Core Web Vitals | all "good" | any URL group drops to "needs improvement" for 28 days |
| Deploy build time | GitHub Actions | < 3 min | > 5 min → split the build |
| Bundle budget | CI (§6) | initial JS ≤ 200 kB gzip | any PR that pushes the entry chunk over budget |

**When the model actually breaks:** static hosting stops being free-form only if (a) we add a server-side component (SSR, search API, currency API) or (b) traffic moves to tens of millions/day. Neither is on the roadmap. At > 500 k/day, add a second CDN or enable the host's multi-region edge; at > 5 M/day, put the assets behind a dedicated object store + CDN and keep the host for HTML only. No code change is required to reach 1 M/day.

---

## 5. Monitoring plan

1. **Real-user Core Web Vitals** — field data from the Search Console "Core Web Vitals" report (Chrome UX) once the domain is verified; supplement with a lightweight RUM beacon (`web-vitals` + `sendBeacon`) so p75 LCP/CLS/INP are visible per route. Target: p75 LCP < 2.0 s, CLS < 0.05, INP < 200 ms.
2. **Uptime checks** — 60-second checks from ≥ 3 regions against `/`, `/robots.txt`, `/ads.txt`, `/sitemap.xml`, asserting HTTP 200 *and* correct content (the `ads.txt` check must match `google.com, pub-`, not just status 200). Alert after 2 consecutive failures. These four URLs are also AdSense-review items, so a silent failure there costs revenue, not just UX.
3. **Error / log monitoring** — host-level 4xx/5xx rates with an alert at 0.5% over 10 minutes; browser JS errors via the same RUM beacon.
4. **Regression detection in CI** (§6) — the cheapest monitor: broken links, stale sitemap, failing tests and a runaway bundle are caught before they reach users.
5. **Post-deploy smoke test** — after every production deploy, fetch `/`, a calculator route, `/sitemap.xml` and `/ads.txt` and assert 200 + expected content.

---

## 6. CI gates (`.github/workflows/ci.yml`)

Runs on every push and pull request, in order:

1. `npm run lint` → `tsc --noEmit`, must be 0 errors
2. `npm run test:run` → 37 unit tests, must be 0 failures
3. `npm run build` → Vite must succeed (fails the build on real errors; Vite's own 500 kB chunk warning remains active — it has **not** been suppressed by raising `chunkSizeWarningLimit`)
4. `npm run audit:links` → every internal link must resolve to a route declared in `src/App.tsx` (exits non-zero otherwise)
5. `npm run sitemap:check` → compares the committed `public/sitemap.xml` against the routes declared in `src/App.tsx` and fails if a route was added without regenerating. It deliberately ignores `<lastmod>`, which is stamped with the generation date: the previous `git diff --exit-code` form of this gate would have failed on every calendar day after the sitemap was committed. Local equivalent: `npm run sitemap && npm run sitemap:check`.

These five gates are the contract that keeps §1–§4 true over time. `scripts/audit-links.cjs` and `scripts/generate-sitemap.cjs` both parse `src/App.tsx` as the single source of truth for routes, so neither can drift from the router.

---

## 7. Reproducing every number here

```bash
npm run build          # chunk table (raw + gzip per file)
npm run audit:links    # broken-link count
npm run sitemap        # regenerates public/sitemap.xml from src/App.tsx
npm run sitemap:check  # fails if the committed sitemap is stale (lastmod ignored)
npx lighthouse <url> --only-categories=performance --chrome-flags="--headless=new"
```

---

## 8. Status at hand-off (2026-10-08, final gate)

**Gate results:**

| Command | Result |
|---|---|
| `npm run lint` | ✅ 0 errors |
| `npm run test:run` | ✅ 37/37 passed |
| `npm run build` | ✅ succeeded (Vite's 500 kB chunk warning fires — not suppressed) |
| `npm run audit:links` | ✅ PASS — 0 broken internal links (the 41 reported mid-session were fixed by Agent C) |
| `npm run sitemap` | ✅ 149 URLs, 0 duplicates, every URL has a route in `App.tsx` |
| `npm run sitemap:check` | ✅ committed sitemap matches `App.tsx` (verified it fails when a URL is removed and passes when only `lastmod` differs) |
| render smoke test | ✅ headless Chrome loads `/` — `<div id="root">` populated (a transient `ReferenceError: iθ` white-screen from `seo-data-batch-c.tsx:307` was fixed by Agent C during this session) |

**Open findings, none in Agent D's files:**

| # | Severity | Finding | Owner |
|---|---|---|---|
| 1 | 🔴 Entry chunk fails the acceptance check | `index-*.js` = 767.40 kB raw / **208.46 kB gzip** vs the `< 200 kB gzip` target; first-load JS is 349.08 kB gzip vs the 200 kB DoD. One-line fix in §1.3. | Agent A (`src/App.tsx`) |
| 2 | 🟠 CLS 0.235 on calculator pages | Suspense fallback reserves `min-h-[60vh]`, the real page is ~5,000 px; the footer shifts when the lazy chunk lands (§2). | Agent A / layout owner |
| 3 | 🟠 LCP 3.0–3.2 s lab | Follows directly from #1 — the first paint downloads ~186 kB gzip of SEO copy that the dashboard never renders (§2). | Agent A (fix #1) |
