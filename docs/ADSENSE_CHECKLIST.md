# TheCalHub — Google AdSense Pre-Submission Checklist

> **Status legend:** `[x]` = done in this repository · `[ ]` = still requires a human or another agent.
> **Owner:** Agent B (Monetization & Compliance). Reviewed against the AdSense programme policies
> (content quality, navigation, site structure, ad placement, and technical requirements).
>
> ⚠️ **Do not submit the site until every `[ ]` below is ticked.** Two of them (real publisher ID, real GA4 ID)
> are placeholders in the code on purpose — inventing an ID would break `ads.txt` verification.

---

## 0. Owner action items (blocked on real credentials) — DO THESE FIRST

- [ ] **Replace the `ads.txt` publisher ID.** `public/ads.txt` currently ships the literal template
      `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
      After your AdSense account is created, copy the **real** `pub-…` ID from
      *AdSense → Account → Account information* into that line (keep the `ca-` prefix **out** — `ads.txt` uses `pub-…`).
      > **TODO (before submitting to AdSense): replace `pub-XXXXXXXXXXXXXXXX` with the real publisher ID.**
      > **Never commit a guessed or copied ID.** Verify: `curl https://thecalhub.com/ads.txt`
- [ ] **Set `VITE_ADSENSE_CLIENT` in `.env`** to your real client ID, e.g. `ca-pub-XXXXXXXXXXXXXXXX`.
      This single value gates (a) the `<meta name="google-adsense-account">` tag in `index.html`
      (Vite substitutes `%VITE_ADSENSE_CLIENT%` at build time) and (b) whether `<AdSlot />` renders anything at all.
      Until it is set: the meta tag renders its literal placeholder, no `adsbygoogle.js` script is ever requested,
      and no ad requests are made — so the site stays policy-clean pre-approval.
- [ ] **Set `VITE_GA_ID` in `.env`** to a real GA4 measurement ID (`G-XXXXXXXXXX`), **or leave it empty**.
      Empty/unset = Google Analytics is fully disabled (no gtag script, no requests). Never commit a fake `G-` ID.
- [ ] **Wire analytics startup.** `initAnalytics()` in `src/lib/analytics.ts` is called from
      `src/components/layout/PageSEO.tsx` (covers calculator + policy pages). For 100% coverage (dashboard,
      category pages) move/add the call to `src/main.tsx`: `import { initAnalytics } from './lib/analytics'; initAnalytics();`
      — `src/main.tsx` is owned by Agent D/CEO, so Agent B could not edit it.
- [ ] **Add the `/about.html` route.** `About` is currently only routed at `/support.html`;
      `src/App.tsx` must also route `/about.html` → `About` (task **A4**, Agent A) so the footer link,
      canonical URL and sitemap entry all resolve.
- [ ] **Domain ownership:** confirm `https://thecalhub.com` is the production domain (TLS valid, DNS resolving),
      and that `thecalhub.com` (not a preview/`*.vercel.app` URL) is what you submit to AdSense.
- [ ] **Social share image:** `og:image` currently falls back to `/icon-512.svg`. SVG is **not** rendered by
      Facebook/Twitter/LinkedIn. Create a 1200×632 PNG (e.g. `public/og-image.png`) and set
      `VITE_OG_IMAGE=https://thecalhub.com/og-image.png` in `.env` (task **E5**, Agent E).
- [ ] **AdSense account verification:** in AdSense → *Settings → Account information*, verify the site via
      the `<meta name="google-adsense-account">` tag (already emitted from `VITE_ADSENSE_CLIENT`),
      or the HTML file/DNS/GA alternative Google offers.
- [ ] **Google Search Console:** create a property for `https://thecalhub.com` (domain or URL-prefix),
      verify ownership, submit `https://thecalhub.com/sitemap.xml`, and check Coverage for 404/soft-404.
- [ ] **Ad unit slot IDs:** once approved, create ad units in AdSense and pass the real `slot` numbers into
      `<AdSlot slot={…} />` (see §5). The `slot` prop is currently a placeholder string.

---

## 1. Content quality (the #1 rejection reason)

- [x] Privacy Policy present, substantive, routed at `/privacy-policy.html` —
      cookies, **Google Analytics**, **Google AdSense + DoubleClick DART cookie**, third-party vendors,
      opt-out (`https://aboutads.info/choices/`, `https://optout.aboutads.info/`), COPPA/children's privacy,
      Do-Not-Track, and how to contact the operator.
- [x] Terms of Service present, substantive, routed at `/terms-of-service.html` — acceptance, permitted use,
      **"informational purposes only — not financial, medical, legal or tax advice"**, accuracy caveat for
      calculator results, limitation of liability, external links, changes to terms.
- [x] About page present — real project description, methodology, disclaimer, operator identity.
- [x] Contact page present — reachable email (`support@thecalhub.com`), operator identity, no fake phone/chat claims.
- [x] Every page has a real `<h1>`, real `<h2>` sections, and no lorem ipsum.
- [ ] **≥15–20 indexed pages of substantial, unique text** (target: all 125 calculator pages).
      Blocked on Phase 3 (Agent C): `getSEOContent()` currently falls back to generic content for **125/125**
      calculators (audit finding **F1**) and 59 calculators have no SEO entry at all (**F2**).
      **Thin/duplicate content is the most common cause of AdSense rejection — do not submit before C1–C4 land.**
- [ ] Blog/informational articles live (≥12 posts, 1,500+ words) — Phase 5 (Agent E).
- [ ] Zero copyright-plagiarised content: all text original; no copied articles, images, or formulas-with-prose
      lifted from other sites. Re-run a plagiarism check before submitting.
- [ ] No prohibited niches: **no adult/sexual content, no violent content, no political advocacy,
      no gambling/betting, no drugs/pharmaceutical sales, no firearms, no deceptive clickbait or
      "shock" content.** TheCalHub (calculators + math/finance/health info) is a safe niche — keep it that way.
- [ ] Health/finance pages carry the informational-purposes disclaimer (Terms §3) — verify no page
      promises guaranteed returns or diagnoses a condition.

---

## 2. Pages, navigation and structure

- [x] `public/robots.txt` allows all crawlers and references `Sitemap: https://thecalhub.com/sitemap.xml`.
- [x] `public/ads.txt` exists at the domain root with the AdSense authorised-seller line.
- [x] Footer links: **Privacy Policy** `/privacy-policy.html` ✅, **Terms of Service** `/terms-of-service.html` ✅,
      **Contact** `/contact.html` ✅ (×2).
- [ ] **Footer "About TheCalHub" link is `to="#"`** — must be changed to `/about.html`
      (`src/components/Footer.tsx`, Company column; owned by Agent A/CEO — Agent B may not edit it).
- [ ] **Footer dead links:** `Careers`, `Open Source`, `Contribution`, `Help Center`, `Join Community`,
      `Cookie Settings`, `Security`, all four *Calculators* column links, and all four *Tools* column links
      are `href="#"`. Replace with real routes or remove — AdSense reviewers count broken/empty links.
- [ ] Every internal link resolves (no 404, no wildcard-route fallback): `node scripts/audit-links.cjs` → 0 failures (task **D5**, Agent D).
- [ ] Custom 404 page returns a real `404` status for unknown URLs and renders `noindex` (tasks **A6**/**B6**).
- [ ] `public/sitemap.xml` lists only URLs that have routes (audit finding **F3**: 5 sitemap URLs currently 404).
- [ ] Working, consistent navigation on every page (header/top bar + footer), no orphan pages.
- [ ] Breadcrumb/structured data renders valid JSON-LD (`SoftwareApplication`/`WebApplication` + `FAQPage` + `BreadcrumbList`).

---

## 3. Technical / trust signals

- [ ] **HTTPS** live in production (certificate valid, no mixed content) — verify after deploy.
- [ ] **Domain** resolves globally; uptime monitored (target ≥99.9%). AdSense reviewers hit the site unannounced.
- [ ] **Page load speed:** LCP < 2.0 s, CLS < 0.05, INP < 200 ms (Phase 4, Agent D; main bundle is 563 kB today — finding **F14**).
- [ ] **Mobile responsive:** check `/`, a calculator page, Privacy, Terms, About, Contact at 360 px width —
      no horizontal scroll, no overlapping text, tap targets ≥ 44 px.
- [ ] `<meta name="robots" content="index, follow, max-image-preview:large">` present in `index.html` ✅ —
      confirm no page accidentally sets `noindex` (other than the 404 page).
- [ ] `<html lang="en">` present ✅.
- [ ] Unique `<title>` + meta description + canonical on every page (via `PageSEO`) — verify no duplicates in Search Console.
- [ ] Open Graph/Twitter tags present: `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`,
      `og:locale`, `og:image`, `og:image:alt`, `twitter:card`, `twitter:title`, `twitter:description`,
      `twitter:image`, `twitter:image:alt` ✅ (needs the PNG from §0).
- [ ] No broken third-party requests in DevTools console on a clean load (GA and AdSense scripts are
      env-gated, so pre-configuration loads **zero** third-party trackers).
- [ ] Favicon, `manifest.json`, and PWA icons resolve (no 404s).

---

## 4. Ad code policy compliance

- [x] AdSense script is loaded **only** when `VITE_ADSENSE_CLIENT` is set, exactly once, module-level guarded (`src/components/common/AdSlot.tsx`).
- [x] `<AdSlot />` renders nothing when unconfigured → no empty/broken ad boxes before approval.
- [x] Every ad reserves its exact height (`min-height` wrapper + fixed `<ins>` height) → no cumulative layout shift.
- [ ] **No ads above the fold.** Never place `<AdSlot />` in the header/top bar or in the first viewport of a calculator page.
- [ ] **Never inside a form** (calculator inputs/buttons) — user could tap an ad while meaning to hit "Calculate".
- [ ] **Never between a heading and its content**, never directly under an `<h1>`/`<h2>`, never between instructions and results.
- [ ] **Never adjacent to navigation/menus** (top bar, sidebar, footer link blocks) or between the FAQ heading and its questions.
- [ ] **Not too close to other ads:** keep ≥ 1 ad unit per content block; no two `<AdSlot />` within the same
      section, and no stacking of 3+ units on one page.
- [ ] **Never place ads where they mimic system UI** (above a "Download"/"Install" button, inside an error message).
- [ ] Ad density sane on mobile (≤ 3 in-content units per page is a safe ceiling).
- [ ] **No auto-clicks, no incentivised clicks** ("click the ad to unlock"), no pseudo-buttons labelled as ads,
      no injecting clicks via script/redirect, no opening ads in new tabs programmatically, no altering ad markup.
- [ ] Ads clearly distinguishable from content (ad labelling handled by AdSense's own `adsbygoogle` markup).
- [ ] `ads.txt` served from the domain root with the correct authorised-seller line (see §0).
- [ ] Once approved: only AdSense-provided ad code is used (no other ad network's cloaked/modified code).

---

## 5. AdSlot integration — exact snippet for `CalculatorPageLayout.tsx`

`src/components/CalculatorPageLayout.tsx` is owned by **Agent C**, so Agent B did not edit it.
**CEO:** paste the following into that file (locations marked below).

```tsx
import AdSlot from './common/AdSlot';
```

**(1) Directly after the calculator widget block** — i.e. immediately after the `{children}` wrapper:

```tsx
      <div className="mb-20">
        {children}
      </div>

      <div className="mb-16">
        <AdSlot slot="calculator-below" format="auto" height={280} />
      </div>
```

**(2) After the FAQ section** — i.e. immediately after the `<SEOContentSection … />` element at the bottom of the
return, still inside the `max-w-7xl` container:

```tsx
      <SEOContentSection
        title={seoData.title}
        subtitle={seoData.subtitle}
        introduction={seoData.introduction}
        mainContent={seoData.mainContent}
        faqs={seoData.faqs}
        relatedCalculators={seoData.relatedCalculators}
      />

      <div className="mt-12 mb-4">
        <AdSlot slot="calculator-below-faq" format="auto" height={280} />
      </div>
```

**Placement rules — hard requirements (AdSense policy):**

| ✅ Allowed | ❌ Forbidden |
|---|---|
| After the calculator widget block, before the SEO content | Above the fold / in the header or top bar |
| After the FAQ block, at the end of the page | Inside the calculator `<form>` or next to its submit button |
| In an empty content gap with reserved height | Between a heading and the paragraph it introduces |
| | Between instructions and the results panel |
| | Under menus, breadcrumbs, or between two headings |
| | Adjacent to (or within ~1–2 lines of) another ad unit |

Before submitting to AdSense, replace the string slot names above with the **numeric slot IDs** from your
AdSense account (`<AdSlot slot={1234567890} … />`).

---

## 6. Submission flow

- [ ] All §0 owner items complete (real `pub-` ID in `ads.txt`, real `ca-pub-` in `.env`, real or empty `VITE_GA_ID`).
- [ ] `npm run lint` → 0 errors, `npm run test:run` → 0 failed, `npm run build` → success.
- [ ] `ls public/robots.txt public/ads.txt` → both exist; both return **HTTP 200 with correct content** at the domain root.
- [ ] Deploy to production and re-verify: `https://thecalhub.com/robots.txt`, `/ads.txt`, `/sitemap.xml`.
- [ ] Full crawl → 0 broken links, 0 duplicate titles, 0 pages without a meta description.
- [ ] Manual Lighthouse pass (Performance ≥ 90, Accessibility ≥ 95, SEO = 100) on `/`, one calculator, `/privacy-policy.html`.
- [ ] Submit the site in AdSense → *Sites → Add site*; complete site ownership verification.
- [ ] Link and verify the Search Console property; submit the sitemap; monitor Coverage.
- [ ] Respond to any AdSense policy-optimisation message within 7 days (rejections are usually fixable).
