# Growth Plan — TheCalHub (Phase 5, Agent E)

**Owner:** Agent E — Growth & Editorial
**Scope of this document:** E1 (traffic strategy + keyword map + funnel), E6 (distribution checklist), plus the code-side notes for E5 (share image) and E7 (localisation groundwork).
**Status:** E1 ✅ · E5 ✅ (generic site-level OG image) · E6 ✅ (checklist, execution is CEO/Agent E over 90 days) · E7 ✅ (mechanism + seed translations)

> **Read this first.** Every number in §2 is a **model input or estimate**, not a forecast and not a promise.
> Google rankings cannot be bought, scheduled or guaranteed. If a number looks optimistic, the
> "Assumptions" and "What breaks this model" subsections tell you exactly which way it can fail.

---

## 0. TL;DR

1. **1,000,000 daily users ≈ 30,000,000 sessions/month.** Only organic search on a large page
   inventory + programmatic SEO + a retention loop gets anywhere near that. Paid traffic and bot
   traffic are **off the table — they void AdSense** (invalid-traffic policy).
2. Realistic path: **12–24 months, staged** — indexing (M1–3) → long-tail (M4–6) → head terms
   (M7–12) → programmatic scale (M13–24). Headline of the model is in §2.
3. We already own 152 routes / 125 calculator pages. The keyword map (§3) assigns every target
   query to a **real, existing route**; anything that needs a new URL is called out in §5 as a build item.
4. Growth loop to instrument (§4): **SERP → calculator → related calculator → favourites/history → return visit.**
5. Cheapest multiplier available today: **language variants (en/hi/es)** — mechanism shipped in
   `src/lib/i18n.tsx` (§8).

---

## 1. Reality check: what 1M users/day actually means

### 1.1 The arithmetic

| Quantity | Value |
|---|---|
| Target | 1,000,000 **daily users** |
| Monthly equivalent | ≈ 30,000,000 sessions/month (calculator traffic is ~1 session per user — bounce-heavy search visits) |
| Daily equivalent | ≈ 11.6 requests/second average, 40–60 req/s peak (matches the capacity model in `docs/PERFORMANCE.md` §4) |

For scale: a single well-ranked head term like *bmi calculator* carries on the order of
1–2M searches/month globally; the whole "calculator" query space is large but **finite and
crowded** (Calculator.net, moneycontrol, Groww, Omnicalculator, Invesco etc.). Reaching 30M
sessions/month therefore requires **all three** of:

1. **Inventory** — hundreds to tens of thousands of indexable pages (125 today → programmatic
   expansion in §5),
2. **Rankings** — head terms in the top 3 *and* a very long tail of low-competition queries,
3. **Retention** — return visits from tools users keep (favourites, history, notepad, pomodoro,
   clock), because pure search traffic does not compound on its own.

### 1.2 Traffic channels: allowed vs forbidden

| Channel | Allowed? | Why |
|---|---|---|
| Organic Google/Bing/DuckDuckGo search | ✅ | Primary channel; fully AdSense-compatible |
| Direct / bookmarks / PWA | ✅ | Retention loop |
| Social (Reddit, X, LinkedIn, Product Hunt, HN) — genuine posts | ✅ | Human, voluntary, disclosed |
| Newsletter / genuine mentions & backlinks from other sites | ✅ | Earned links only |
| **Paid ads (Google/Meta/PopAds etc.) to the site** | ❌ | Not banned per se, but **paid/purchased traffic that clicks ads = invalid traffic**; using click-exchanges or low-quality ad networks to inflate sessions will void AdSense |
| **Bot / traffic-exchange / auto-refresh / incentivized clicks** | ❌ | Invalid traffic → AdSense account termination + possible site-level action |
| **Buying links, PBNs, link farms** | ❌ | Google manual action **and** AdSense programme-policy risk (see §6.5) |
| **Fake SERP CTR schemes (paying people to search + click)** | ❌ | Against Google spam policy; detection risk is permanent |

**Rule of thumb for every future tactic: if it would look embarrassing in a manual-review email
from Google, don't do it.** AdSense approval and the 1M/day goal both depend on the same asset —
a site Google trusts.

---

## 2. Staged traffic model (months 1–24)

> **Headline: ~0 → 30K sessions/mo by month 3 → ~120K/mo by month 6 → ~0.5–1.2M/mo by month 12 →
> 10–30M/mo (≈330K–1M users/day) by month 24 — where the 1M/day ceiling is only reachable if the
> programmatic inventory ships at 20K–40K indexed pages *and* 50–100 head/mid terms reach the top 3.**

### 2.1 Assumptions (the model is only as good as these)

| # | Assumption | Why it matters |
|---|---|---|
| A1 | Phase 1–3 ship first (unique content on all 125 pages, no fallback/thin pages, real 404, sitemap from routes) | Nothing below works on thin/duplicate content — AdSense rejects it *and* Google won't rank it |
| A2 | Blended organic CTR: position 1 ≈ 25–30%, positions 2–3 ≈ 10–15%, 4–10 ≈ 2–8%, page 2 ≈ <1%. Across a long-tail portfolio, **blended CTR on impressions ≈ 1–3%** | Converts rankings into sessions |
| A3 | Page inventory grows: ~125 (M1) → ~600 (M4, blog + unit hub) → ~3,000 (M8, X→Y pages) → ~10,000 (M12, translations + FAQ) → 20,000–40,000 (M24) | Impressions scale with inventory |
| A4 | Long-tail pages individually deliver ~40–300 sessions/month each; head/mid terms deliver 50K–300K each when top-3 | Drives the arithmetic in 2.3 |
| A5 | Google Search Console coverage within 1–2 weeks; Bing + DuckDuckGo within weeks | Discovery lag |
| A6 | **AI Overviews erosion:** informational queries lose an estimated 10–30% of clicks to AI answers. Interactive tools (a calculator you must click to *use*) lose less than pure informational content | Honest 2026 headwind — pushes us toward interactive/tool intent, away from pure text |
| A7 | No paid/bot traffic anywhere (§1.2), no manual actions, no scraping of third-party content | One violation resets everything |
| A8 | Retention loop (favourites/history/notepad/pomodoro/clock surfaced — E8) adds an estimated 5–15% return visits on top of search at maturity | Only counted as bonus, not in the core model |
| A9 | Geography mix: India + US + UK/CA/AU + Spanish-speaking markets. `hi`/`es` variants unlock non-English inventory (§8) | Currency/language fit for finance keywords |

### 2.2 The four stages

| Stage | Months | What must be true to enter/exit | Monthly sessions (model range) | ≈ Users/day |
|---|---|---|---|---|
| **1. Indexing + first rankings** | M1–M3 | GSC/Bing verified, sitemap submitted, 125/125 pages with unique content, real 404, `ads.txt`/`robots.txt` live. Exit: all pages indexed, first 50–150 long-tail queries ranking (top 100 → top 20) | M1: 0.5–3K · M2: 3–10K · M3: 10–30K | ~300–1,000 |
| **2. Long-tail wins** | M4–M6 | 12+ blog articles (E2), unit-conversion hub + "X to Y" pages (E3), internal-link rules live (E4), first genuine backlinks/directories. Exit: 300–600 pages indexed, 100+ keywords in top 10 | M4: 25–60K · M5: 50–110K · M6: 90–180K | ~3,000–6,000 |
| **3. Head terms & mid-tail** | M7–M12 | Domain trust accumulates; 5–15 head/mid terms reach top 5; programmatic inventory ~3,000 pages. Exit: measurable branded search, avg position <20 across tracked head set | M7: 150–250K · M8: 200–320K · M9: 260–420K · M10: 320–550K · M11: 400–750K · M12: 500K–1.2M | ~16,000–40,000 |
| **4. Programmatic scale** | M13–M24 | 20K–40K indexed pages across en/hi/es, currency + FAQ variants, retention loop surfaced (E8), CI keeps performance green. Exit = the 1M/day target | M13–M18: 1–3M/mo · M19–M24: 5–30M/mo | 33K–100K → **up to ~1M at the top band** |

### 2.3 The arithmetic behind stage 4 (how 30M/month could actually add up)

| Source | Formula | Modelled contribution (M24) |
|---|---|---|
| Long-tail portfolio | 20,000–40,000 pages × 100–300 sessions/mo | 2M–12M sessions/mo |
| Head/mid portfolio | 50–100 terms × 50K–300K sessions/mo (top-3 positions) | 2.5M–20M sessions/mo |
| Retention/return visits | 5–15% of the above (A8) | +0.3M–4M sessions/mo |
| **Total** | | **≈ 5M–36M/mo → central band 10–30M/mo ≈ 330K–1M users/day** |

The range is deliberately wide because **ranking outcomes are not under our control**. The low
band is the honest default; the top band requires every condition in A1–A9 to hold.

### 2.4 What breaks this model

- **Phase 3 (content depth) slips or ships thin content** → stage 1 stalls indefinitely. This is
  the single biggest dependency (audit findings F1/F2 in `TASKS.md`).
- **A Google core/ helpful-content update** targets scaled programmatic pages → we must be able to
  noindex/delete a whole template class quickly (guardrails in §5.6).
- **Head-term competition** holds us at positions 5–10 for years → realistic effect is −30–50% vs
  the model, i.e. months 12–24 land in the 5–15M/mo band, not 30M.
- **AI Overviews** expand to calculator-intent SERPs → −10–30% on affected queries (A6).
- **AdSense rejection or invalid-traffic event** does not directly kill traffic, but it kills the
  monetization that funds content production.

### 2.5 KPI definitions (what we count, every week)

| KPI | Source | Definition |
|---|---|---|
| Indexed pages | GSC → Pages | URLs in "Indexed" state; target = 100% of submitted routes |
| Non-branded clicks/day | GSC → Performance (query filter `!brand`) | Proxy for new-user acquisition |
| Head-term rank set | GSC + rank tracker on the §3 head list | 50 tracked keywords, weekly |
| Engagement rate | GA4 | Sessions with ≥10 s engaged |
| Calculate rate | GA4 (event, see §4) | Sessions firing a calculate event ÷ sessions |
| Return rate | GA4 → Retention | 7-day and 30-day user retention |
| DAU/MAU | GA4 | Retention-loop health (E8) |

---

## 3. Keyword map

All routes below are **real declarations in `src/App.tsx`** (152 route entries, 125 of them
calculator pages). Where a query type needs a *new* URL, it is explicitly marked **(build §5)** —
no invented paths.

### 3.0 Site organisation as search sees it today

| Category hub (route) | Calculator routes it owns (examples) |
|---|---|
| `/financial.html` (+ `/financial-tools.html`) | `/emi-calculator.html`, `/loan-calculator.html`, `/home-loan-calculator.html`, `/car-loan-calculator.html`, `/personal-loan-calculator.html`, `/mortgage-calculator.html`, `/compound-interest-calculator.html`, `/simple-interest-calculator.html`, `/fd-calculator.html`, `/rd-calculator.html`, `/sip-calculator.html`, `/ppf-calculator.html`, `/nps-calculator.html`, `/tax-calculator.html`, `/retirement-calculator.html`, `/investment-calculator.html`, `/cagr-calculator.html`, `/inflation-calculator.html`, `/npv-calculator.html`, `/irr-calculator.html`, `/gst-calculator.html`, `/tip-calculator.html` |
| `/health.html` | `/bmi-calculator.html`, `/bmr-calculator.html`, `/calorie-calculator.html`, `/tdee-calculator.html`, `/macro-calculator.html`, `/ideal-weight-calculator.html`, `/water-intake-calculator.html`, `/heart-rate-calculator.html`, `/pregnancy-calculator.html`, `/ovulation-calculator.html`, `/body-fat-calculator.html`, `/pace-calculator.html` |
| `/fitness.html` | `/calories-burned-calculator.html`, `/one-rep-max-calculator.html`, `/vo2-max-calculator.html`, `/lean-mass-calculator.html`, `/step-counter-calculator.html`, `/workout-timer.html`, `/macro-split-calculator.html` |
| `/math.html` | `/percentage-calculator.html`, `/percent-calculator.html`, `/fraction-calculator.html`, `/age-calculator.html`, `/date-calculator.html`, `/ratio-calculator.html`, `/average-calculator.html`, `/quadratic-calculator.html`, `/lcm-calculator.html`, `/gcd-calculator.html`, `/probability-calculator.html`, `/permutation-calculator.html`, `/combination-calculator.html`, `/prime-number-calculator.html`, `/factorial-calculator.html`, `/sequence-calculator.html`, `/geometry-calculator.html` |
| `/datetime.html` | `/date-difference-calculator.html`, `/time-duration-calculator.html`, `/time-zone-converter.html`, `/leap-year-calculator.html`, `/week-number-calculator.html`, `/business-days-calculator.html`, `/date-add-subtract-calculator.html` |
| `/construction.html` | `/concrete-calculator.html`, `/cement-calculator.html`, `/brick-calculator.html`, `/stair-calculator.html`, `/gravel-calculator.html`, `/tile-calculator.html`, `/paint-calculator.html`, `/wood-calculator.html`, `/steel-weight-calculator.html`, `/cubic-yards-calculator.html`, `/area-calculator.html`, `/volume-calculator.html`, `/roofing-calculator.html`, `/flooring-calculator.html` |
| `/scientific.html` | `/scientific-calculator.html`, `/unit-conversion-calculator.html`, `/basic-arithmetic-calculator.html`, `/trigonometric-calculator.html`, `/trigonometry-calculator.html`, `/logarithmic-calculator.html`, `/logarithm-calculator.html`, `/exponential-calculator.html`, `/complex-number-calculator.html`, `/matrix-calculator.html`, `/statistical-calculator.html`, `/vector-calculator.html`, `/scientific-notation-calculator.html`, `/scientific-constants.html`, `/equation-solver.html`, `/graphing-calculator.html` |
| `/programming.html` | `/programming-calculator.html`, `/time-complexity-calculator.html`, `/big-o-analyzer.html`, `/binary-hex-decimal-converter.html`, `/bitwise-calculator.html`, `/regex-tester.html`, `/json-formatter.html`, `/hash-generator.html`, `/base64-encoder.html`, `/code-beautifier.html`, `/memory-size-calculator.html` |
| `/trading.html` | `/position-size-calculator.html`, `/risk-reward-calculator.html`, `/pnl-calculator.html`, `/stop-loss-calculator.html`, `/breakeven-calculator.html`, `/investment-pnl-calculator.html`, `/kelly-criterion-calculator.html`, `/risk-of-ruin-calculator.html`, `/liquidation-calculator.html`, `/dca-calculator.html`, `/drawdown-calculator.html` |
| `/standard.html` | `/fraction-calculator.html`, `/addition-calculator.html`, `/subtraction-calculator.html`, `/multiplication-calculator.html`, `/division-calculator.html`, `/square-root-calculator.html`, `/power-calculator.html`, `/scientific-calculator.html` (dual-category — see cannibalisation rules, §3.4) |
| Utility / retention | `/notepad.html`, `/pomodoro-timer.html`, `/clock.html`, `/workout-timer.html` |
| Content | `/blog.html`, `/blog/:slug.html`, `/faq.html`, `/tutorials.html` |

### 3.1 Head terms (10K–1M+ searches/month, brutal competition)

Goal per the stage model: **page 1 within 7–12 months, top 3 within 18–24 months.**

| Head keyword | Owner page (must rank) | Notes |
|---|---|---|
| `emi calculator` | `/emi-calculator.html` | Highest-value finance head term in India; formula + worked examples (C5) are the differentiator |
| `bmi calculator` | `/bmi-calculator.html` | Health head term; needs charts/tables to beat incumbent widgets |
| `sip calculator` | `/sip-calculator.html` | India-specific investing head term; pairs with blog "SIP vs lump sum" (E2) |
| `age calculator` | `/age-calculator.html` | Very high volume, very low commercial intent — still valuable for domain trust |
| `percentage calculator` | `/percentage-calculator.html` | Enormous evergreen volume; strong SERP competitors (Calculatorsoup, Calculator.net) |
| `fd calculator` | `/fd-calculator.html` | India finance; rate-table content is the ranking lever |
| `mortgage calculator` | `/mortgage-calculator.html` | US head term; escrow/tax/insurance inputs needed to compete |
| `loan calculator` | `/loan-calculator.html` | Generic head term; keep `/emi-calculator.html` and `/financial-calculator.html` subordinate (§3.4) |

### 3.2 Mid-tail (1K–10K/month, winnable within 4–9 months)

| Mid-tail keyword | Owner page |
|---|---|
| `home loan emi calculator` | `/home-loan-calculator.html` |
| `car loan emi calculator` | `/car-loan-calculator.html` |
| `personal loan emi calculator` | `/personal-loan-calculator.html` |
| `sip return calculator` / `sip maturity calculator` | `/sip-calculator.html` |
| `body fat calculator` | `/body-fat-calculator.html` |
| `concrete calculator` (yard/m3/slab) | `/concrete-calculator.html` |
| `compound interest calculator` | `/compound-interest-calculator.html` |
| `gst calculator` | `/gst-calculator.html` |
| `bmr calculator` / `tdee calculator` | `/bmr-calculator.html` / `/tdee-calculator.html` |
| `tile calculator` / `paint calculator` | `/tile-calculator.html` / `/paint-calculator.html` |
| `cagr calculator` | `/cagr-calculator.html` |
| `ppf calculator` / `rd calculator` / `nps calculator` | `/ppf-calculator.html` / `/rd-calculator.html` / `/nps-calculator.html` |
| `date difference calculator` | `/date-difference-calculator.html` |
| `time zone converter` | `/time-zone-converter.html` |
| `unit conversion calculator` | `/unit-conversion-calculator.html` |
| `binary to hex converter` | `/binary-hex-decimal-converter.html` |
| `one rep max calculator` | `/one-rep-max-calculator.html` |
| `macro calculator` | `/macro-calculator.html` |
| `tax calculator` / `retirement calculator` | `/tax-calculator.html` / `/retirement-calculator.html` |
| `json formatter` / `regex tester` | `/json-formatter.html` / `/regex-tester.html` |
| `pregnancy due date calculator` | `/pregnancy-calculator.html` |

### 3.3 Long-tail / programmatic (10–500 searches/month each, thousands of queries)

These are the queries that make or break stages 2–4. **Today they must be captured by the content
of the owner page** (worked examples with real numbers — exactly what task C5 adds). Once the
programmatic levers in §5 ship, the highest-volume patterns get their own URLs.

| Long-tail query (real SERP phrasing) | Owner page today | Dedicated page? |
|---|---|---|
| `5 lakh car loan emi for 5 years` | `/car-loan-calculator.html` | Pre-set/parameterised variant **(build §5.1)** |
| `180 cm 75 kg bmi` | `/bmi-calculator.html` | Params on same URL (no new page needed — inputs in query string) |
| `what is the emi for 20 lakh home loan at 8.5%` | `/home-loan-calculator.html` | Answer block + calculator on the same page **(build §5.4 FAQ pattern)** |
| `tile calculator for 10x12 room` | `/tile-calculator.html` | Worked example table (C5) |
| `20000 sip for 10 years at 12 percent` | `/sip-calculator.html` | Params + worked example |
| `concrete needed for 10x10 slab 4 inch` | `/concrete-calculator.html` | Worked example table |
| `age if born on 14 may 1990` | `/age-calculator.html` | Answer-style intro paragraph |
| `60 km to miles` / `kg to lbs` / `celsius to fahrenheit` | `/unit-conversion-calculator.html` | **X→Y pages (build §5.1)** — the single largest long-tail pool |
| `how much house can i afford on 20 lakh salary` | `/mortgage-calculator.html` + `/home-loan-calculator.html` | Blog post (E2) funneling to both |
| `12% return on 5000 monthly sip` | `/sip-calculator.html` | Params |
| `business days between two dates incl holidays` | `/business-days-calculator.html` | Holiday table (phase 2 of that calculator) |
| `inr to usd today` / currency pairs | `/unit-conversion-calculator.html` | **Currency variant pages (build §5.5)** |

### 3.4 Cannibalisation rules (one intent → one URL)

Verified overlaps that will otherwise split ranking signals:

| Competing routes | Intent to assign |
|---|---|
| `/emi-calculator.html` vs `/loan-calculator.html` vs `/financial-calculator.html` | `emi calculator` → EMI page; `loan calculator` → loan page; `/financial-calculator.html` → supporting/internal only (candidate for consolidation in Phase 6) |
| `/percentage-calculator.html` vs `/percent-calculator.html` | "calculate a % of X" → percentage; "% change / increase / decrease" → percent |
| `/age-calculator.html` vs `/date-calculator.html` vs `/date-difference-calculator.html` | age from DOB → age; generic duration → date-difference; add/subtract dates → date-add-subtract |
| `/trigonometry-calculator.html` vs `/trigonometric-calculator.html` | one wins the head term, the other 301/consolidates in Phase 6 |
| `/logarithm-calculator.html` vs `/logarithmic-calculator.html` | same treatment |
| `/scientific-calculator.html` (standard) vs `/scientific-calculator.html` (scientific category) | keep `/scientific.html` hub as category parent; single calculator URL |

**Rule:** every keyword in §3.1–3.3 gets exactly one owner. A new page may only target a query
cluster the owner page is not already covering, or it must be consolidated (Phase 6).

---

## 4. The funnel and what to measure at each step

```
  Google SERP                          (GSC: impressions → clicks → position)
      │  click
      ▼
  Calculator page                       (GA4: landing_page, engagement, calculate event)
      │  related calculators block — already rendered, randomised per load (SEOContentSection)
      ▼
  2nd / 3rd calculator page             (GA4: internal navigation event)
      │  favourites + history (localStorage: calc_favorites, calc_history)  [hooks built]
      ▼
  Return visit (direct/PWA)             (GA4: retention, DAU/MAU, returning users)
      │
      └── more calculators used → more favourites → habit
```

### 4.1 Step-by-step measurement plan

| Step | What happens today | GA4 / GSC measurement | Target |
|---|---|---|---|
| **1. SERP → click** | Page appears in SERP | **GSC**: impressions, clicks, CTR, avg position (break down branded vs non-branded, page vs query). **GA4**: `session_source/medium`, Landing pages report | Blended CTR ≥ 2% (A2); 100% of route inventory indexed |
| **2. Page → engagement** | Calculator renders, user calculates | **GA4**: engagement rate, engaged sessions, average engagement time; event `calculator_calculate` with `calculator_id` | Engagement rate ≥ 60%; calculate rate ≥ 35% of sessions |
| **3. Related calculator** | `getRandomRelatedCalculators()` block renders 5 related links (randomised per load) | **GA4**: `related_calculator_click` with `{source_id, target_id}`; internal-navigation rate = sessions with ≥2 pages ÷ sessions | ≥ 15% of sessions view a 2nd calculator; pages/session ≥ 1.4 |
| **4. Favourites / history** | Hooks built: `src/hooks/useFavorites.ts` (`calc_favorites`), `src/hooks/useCalculatorHistory.ts` (`calc_history`) — **not yet surfaced in UI (E8)** | **GA4**: `favorite_added`, `history_opened`, `pwa_prompt_accepted` | ≥ 5% of engaged users create a favourite within 30 days |
| **5. Return visit** | Notepad/Pomodoro/Clock/Workout timer are the retention hooks | **GA4**: Retention reports, DAU/MAU, `first_visit` vs `returning`, direct-traffic share | 7-day return rate ≥ 10%; DAU/MAU ≥ 0.15 by month 12 |

### 4.2 Honest current state of instrumentation (verified 2026-10-08)

- `src/lib/analytics.ts` **defines** `trackPageView`, `trackCalculatorUsage` and `trackEvent`, but
  **nothing in the app calls them yet** (grep: zero callers). Only the automatic `page_view` from
  `gtag('config', …)` fires.
- `initAnalytics()` runs from `PageSEO.tsx`; GA4 loads **only** when `VITE_GA_ID` is a real
  `G-XXXXXXXXXX` (Agent B, task B3). No ID = no script = no measurement.
- Consequence: **steps 2–5 above cannot be measured until the events are wired.** Owner: Agent B
  (`src/lib/analytics.ts`) + whoever owns the components that should emit them (layout/calculators —
  coordinate with Agents A/C). Event names to implement, ready for hand-off:

| Event | Parameters | Fires on |
|---|---|---|
| `calculator_calculate` | `calculator_id`, `category` | user presses Calculate/Get Results |
| `related_calculator_click` | `source_id`, `target_id` | click inside the related block |
| `favorite_added` | `calculator_id` | favourite toggled on |
| `history_opened` | — | user opens history panel |
| `locale_changed` | `from`, `to` | locale switcher used (§8) |

- Until then, GSC + `page_view` + landing-page engagement are the only trustworthy signals.

---

## 5. Programmatic SEO levers — ranked by effort vs expected yield

| Rank | Lever | Effort | Expected yield | Risk |
|---|---|---|---|---|
| 1 | **"X → Y" conversion pages** (km→miles, kg→lbs, °C→°F, inches→cm…) | Medium (template + unit data + unique copy rules) | **Very high** — largest genuinely-winners long-tail pool in calculators | Low if each page carries formula + table + examples |
| 2 | **Unit-conversion hub** (E3) — length/weight/temp/area/volume/currency in one indexable hub | Medium (data model + UI) | **High** — category authority + internal links into every X→Y page | Low; currently only a dead link (audit F5) |
| 3 | **Language variants en/hi/es** (E7) | Low now (mechanism shipped) → Medium once real translation exists | **High** — up to ×3 inventory on 125+ pages; Hindi has *less* competition for finance queries | Medium — machine-quality translations = thin content; needs `hreflang` + native review |
| 4 | **Per-query FAQ pages** ("what is the emi for 20 lakh home loan at 8.5%") | Medium–High (need unique answer + calculator embed per query) | Medium — wins position-0/People-Also-Ask | **High** — auto-generated FAQ = classic AdSense "low value content" pattern; ship only with a template that embeds the live calculator |
| 5 | **Currency variants** (INR/USD/EUR pairs, "1 USD to INR today") | Low–Medium (rate feed + caching) | Medium/Low — high query volume but dominated by incumbents | Medium — rates go stale daily; near-duplicate pages across pairs; needs `lastmod` + cache or it *hurts* |

### 5.1 X→Y conversion pages (rank 1)

- Matrix: ~15 base units × ~15 targets per dimension × ~6 dimensions (length, weight, temperature,
  area, volume, speed) ≈ **1,000–2,000 pages** from one template.
- Every page must contain: conversion formula, a quick-reference table (top 10 neighbours in that
  pair), 2–3 worked examples, and an embedded live converter — otherwise it is doorway content.
- Internal links: hub (§5.2) ↔ every X→Y page ↔ relevant calculator (e.g. `meters` → `/area-calculator.html`).

### 5.2 Unit-conversion hub (rank 2 — task E3)

- One indexable `/unit-conversion-calculator.html` hub page linking every category + every X→Y
  page. Today the dashboard has a dead `/unit-converter.html` link (F5) — must be repointed by Agent A.

### 5.3 Language variants (rank 3 — task E7, mechanism shipped)

- See §8. Delivery order: (1) UI chrome strings, (2) calculator titles/descriptions (SEO), (3)
  long-form SEO content — never ship (3) via raw machine translation without review.
- Requires `hreflang` annotations + per-locale URLs before it can be submitted as separate
  inventory; until then locale is user-facing only (no duplicate-content risk).

### 5.4 Per-query FAQ pages (rank 4)

- Ship **answer blocks on the owning calculator page first** (zero new-URL risk), then graduate
  true FAQ URLs only for query families with ≥50 distinct monthly searches and a live calculator
  to embed.

### 5.5 Currency variants (rank 5)

- Only after a rates source with per-day timestamps exists; must emit `lastmod` correctly and
  de-duplicate boilerplate. Otherwise skip — the risk/return is the weakest of the five.

### 5.6 Guardrails that apply to every lever (AdSense + ranking)

1. **Unique visible content per page** — every generated page must differ materially (formula,
   table, examples, language), not just swap the unit name.
2. **Fully linked** — reachable from hub + related blocks; nothing orphaned (orphan pages don't
   get indexed and look generated).
3. **Canonical / noindex switches ready** — if a template class underperforms or trips a spam
   signal, we can noindex it in one deploy.
4. **Index bloat watch** — GSC Pages report reviewed weekly in stages 2–4; if "Crawled – not
   indexed" grows faster than indexed, pause expansion and improve quality.
5. **No scraped content, no copied tables from other calculators, licence-clean fonts/images.**

---

## 6. Distribution checklist (E6)

### 6.1 Search engine submission (week 1)

- [ ] **Google Search Console** — add a *domain* property (`thecalhub.com`) via DNS verification
      (covers all subdomains + http/https). Owner: CEO (needs DNS access).
- [ ] Submit `https://thecalhub.com/sitemap.xml` in GSC → Sitemaps. (The sitemap is generated
      from `src/App.tsx` routes by `npm run sitemap` — single source of truth.)
- [ ] Request indexing manually for the beachhead pages: `/`, `/emi-calculator.html`,
      `/bmi-calculator.html`, `/sip-calculator.html`, `/percentage-calculator.html`.
- [ ] Weekly GSC ritual: Pages (indexed vs excluded reasons), Performance (queries/pages), plus
      **URL Inspection** on any page stuck in "Discovered – currently not crawled".
- [ ] **Bing Webmaster Tools** — add site (Bing allows importing from GSC, fastest path), submit
      the same sitemap. Bing also feeds DuckDuckGo.
- [ ] **IndexNow** — generate a key file and ping on every deploy (Bing/Yandex adopt it; Google
      ignores it). Wire into the deploy step (Agent D).
- [ ] **Manual sitemap ping — honest note:** Google retired the old
      `google.com/ping?sitemap=` endpoint (2023) and Bing retired its ping URLs in favour of
      IndexNow. The *effective* equivalents are GSC sitemap submission + IndexNow. Do not build
      automation around the dead ping endpoints.
- [ ] Verify post-deploy: `/robots.txt` → 200 + points at sitemap; `/sitemap.xml` → 200; every
      `<loc>` resolves (gated by `npm run audit:links`).

### 6.2 Free-tool / product directory submissions (weeks 2–6, ~15–25 listings)

Submit manually, one at a time, complete profile each time, real screenshot (use the OG image +
a product screenshot):

- [ ] **Product Hunt** — launch with tagline + OG image + demo; PH is a link *and* a real spike.
- [ ] **AlternativeTo**, **SaaSHub**, **Toolify** — "alternatives to Calculator.net / Calculator.com".
- [ ] **Hacker News — Show HN** — technical framing ("we built 125 calculators as one React SPA;
      here's the SEO architecture"); disclose affiliation in the first line.
- [ ] **Indie Hackers** — build-in-public post (traction + lessons) rather than a naked link.
- [ ] Niche lists: free calculator aggregators, personal-finance tool roundups, edtech tool lists,
      developer-tool directories (for the programming calculators).
- [ ] **Educational `.edu`/`.gov` resource pages** where genuinely relevant (e.g. math/finance
      teaching resources) — only with real editorial value, never paid.
- [ ] Record every listing in a spreadsheet: URL, date, follow-up, referral traffic in GA4.

### 6.3 Reddit / forum participation rules (no spam)

- [ ] **Read the sidebar and self-promo rules of each sub before posting** (they all differ).
- [ ] **Value first, link second.** Answer the question fully in the comment; include a link only
      when it is the direct answer ("here's a calculator that does exactly that: …").
- [ ] **Disclose** ("we built this") in the same comment. Hidden affiliation = instant removal +
      account damage.
- [ ] **Ratio discipline:** ≥10 substantive, link-free contributions for every 1 promotional post;
      never the same link/text in multiple subs on the same day.
- [ ] Target subs (fit by cluster): personal finance/investing → loan & SIP calculators;
      health/fitness → BMI/macros; DIY/home improvement → concrete/tile/paint; webdev/programming →
      base64/regex/JSON tools.
- [ ] Build account history before any link. No vote rings, no bought upvotes, no cross-posting
      brigading.

### 6.4 Ready-to-use listing copy (adapt per channel)

- **One-liner:** "TheCalHub — 125 free online calculators (EMI, BMI, SIP, mortgage, concrete…)
  in one fast, private, ad-supported site. No sign-up, everything runs in your browser."
- **Longer:** "We built TheCalHub for people who are tired of calculator sites full of pop-ups.
  125 calculators across finance, health, math, construction and trading — instant results, works
  offline, no account. Privacy-first: nothing you calculate leaves your device."
- **Show HN angle:** "Show HN: 125 calculator pages, one React/Vite SPA, route-derived sitemap and
  a link auditor so no page can 404 silently."
- **Reddit angle:** always answer the underlying question first; link is optional and secondary.

### 6.5 What to avoid — this is the AdSense-ban list

- ❌ **Buying links, PBNs, link farms, paid guest posts without `rel="sponsored"`** — Google manual
  action **and** a policy problem for AdSense. Earned mentions only.
- ❌ **Paid traffic, pop-under/redirect ad networks, traffic exchange, bot traffic, incentivized
  clicks, auto-refresh redirects** — invalid traffic = AdSense account termination.
- ❌ **Paying people to search-and-click your listings (CTR schemes).**
- ❌ **Auto-generated thin pages at scale** (see §5.6) — "low value content" is the #1 AdSense
  rejection reason after policy violations.
- ❌ **Cloaking, sneaky redirects, scraped content, copyrighted images/fonts.**
- ❌ **Never click your own ads; never ask anyone to click ads; never mask ads or place them
  where a mis-click is likely** (Agent B's AdSlot rules cover placement).
- ❌ **No fake reviews/testimonials, no inflated user counts** anywhere on the site or in listings.

---

## 7. 90-day action plan

Weekly targets are **exit criteria** for the week, not achievements. They assume Phases 1–4
(content depth, links, performance) are progressing in parallel — growth on top of a broken base
is impossible.

### Days 1–30 — Foundation

| Week | Owner(s) | Tasks | Weekly target |
|---|---|---|---|
| **W1** | Agent E + CEO | GSC domain property (DNS), Bing Webmaster import, sitemap submitted, IndexNow key; GA4 property created and `VITE_GA_ID` set; share image live (E5) and validated in FB/Twitter/X card debuggers; i18n mechanism landed (E7) | Both properties verified; sitemap accepted; `og:image` renders as PNG in all 3 debuggers |
| **W2** | Agent C, A, D | Close audit blockers F1/F2/F3 (unique content 125/125, real 404, route-derived sitemap); dead-link repoint (F5); `audit:links` in CI | 0 fallback SEO pages, 0 broken links, ≥100 URLs "Indexed" |
| **W3** | Agent E, B | Blog articles #1–3 (E2); first 10 directory listings; AdSense compliance pack (robots/ads/privacy/terms) ready | ≥3 articles live; 10 listings recorded; impressions ≥ 1K/day, first 50 queries with impressions |
| **W4** | Agent E, B, A | Internal-link rules (E4) — every calculator → ≥3 related + ≥1 blog; wire the §4.2 analytics events; AdSense application prepared | ≥100 keywords in GSC with impressions; ≥10 in top 100; calculate event flowing in GA4 debug view |

### Days 31–60 — Content + programmatic

| Week | Owner(s) | Tasks | Weekly target |
|---|---|---|---|
| **W5** | Agent E | Blog #4–6; FAQ/answer blocks on top-10 owner pages (§5.4 pattern, page-local only) | 500+ clicks/day cumulative; ≥150 indexed URLs |
| **W6** | Agent E (+ whoever owns E3 build) | **Unit-conversion hub (E3)** spec + first working version; X→Y template drafted | Hub live or feature-frozen; 25+ keywords in top 10 |
| **W7** | Agent E, D | X→Y pages batch 1 (length + weight + temperature ≈ 300–600 URLs); locale seed applied to UI chrome (§8 step 2) | ≥500 URLs submitted; 200+ clicks/day |
| **W8** | Agent E | Blog #7–9; directory wave 2 (10 more); 2 genuine collaborations (roundup/guest resource — earned links only) | 1,000+ URLs indexed; 150+ queries in top 10; 300+ clicks/day |

### Days 61–90 — Distribution + optimisation

| Week | Owner(s) | Tasks | Weekly target |
|---|---|---|---|
| **W9** | Agent E, CEO | Product Hunt launch + Show HN + Indie Hackers post (using §6.4 copy) | Referral spike captured & measured; branded search starts rising |
| **W10** | Agent E | Blog #10–12; **CTR optimisation pass**: GSC → top-20 pages by impressions with CTR < expected for position → rewrite titles/meta | 500+ non-branded clicks/day; avg position on tracked head set < 30 |
| **W11** | Agent E, A | Retention loop surfaced (E8): favourites + history UI entry points; `favorite_added`/`history_opened` events live | ≥5% of engaged users favourite something; 7-day return ≥ 5% |
| **W12** | Agent E | FAQ pattern v2 (answer block + embedded calculator) on the top-20 money pages; start `hi`/`es` title+description rollout (§8 step 2) for the top 30 pages | ≥2,000 URLs indexed; 750+ clicks/day |
| **W13** | CEO + Agent E | **Model-vs-actual review**: compare actuals to the §2 ranges, re-forecast stage 3, decide which of the §5 levers gets next quarter's effort; AdSense review if not yet approved | Written variance report (≤1 page); KPI dashboard live (§2.5) |

**By day 90, success looks like** (all as targets): ~1,000–3,000 indexable URLs, ~500–1,000
non-branded clicks/day, 6 KPIs instrumented in GA4/GSC, AdSense application submitted or
approved, and a repeatable weekly growth ritual (GSC review → content → links → measure).

---

## 8. Localisation groundwork (E7) — `src/lib/i18n.tsx`

### 8.1 What shipped

The existing `I18nProvider` API is **unchanged** (currency context, `useI18n`, `formatMoney*` —
all consumers keep working). Locale support was added *inside* the same provider:

| Export | Purpose |
|---|---|
| `type Locale = 'en' \| 'hi' \| 'es'` | Supported locales |
| `locales: LocaleInfo[]` | Registry: `{ code, nativeName, htmlLang, ogLocale }` → `English` / `हिन्दी` / `Español`, `en`/`hi`/`es`, `en_US`/`hi_IN`/`es_ES` |
| `DEFAULT_LOCALE`, `LOCALE_STORAGE_KEY` (`thecalhub-locale`), `isLocale()` | Defaults + validation |
| `translate(locale, key, fallback?)` | Lookup with English fallback, then key |
| `localizedSeo(locale, pageId, { title, description })` | **SEO extension point** — returns translated title/description if a translation exists, otherwise the English fallback |
| `hasLocalizedSeo(locale, pageId)` / `translatedSeoPages(locale)` | Coverage helpers (useful for a future sitemap/i18n audit test) |
| `useLocale()` | Hook — same throw-outside-provider contract as `useI18n()` |

`useLocale()` returns:

```ts
{
  locale: Locale;                       // 'en' | 'hi' | 'es'
  setLocale: (l: Locale) => void;       // persists to localStorage('thecalhub-locale')
  localeInfo: LocaleInfo;               // current entry (nativeName, htmlLang, ogLocale)
  availableLocales: LocaleInfo[];       // for building a switcher <select>
  t: (key: string, fallback?: string) => string;
  localizeSeo: (pageId: string, fallback: LocalizedSeo) => LocalizedSeo;
  hasLocalizedSeo: (pageId: string) => boolean;
  translatedSeoPages: () => string[];
}
```

`I18nProvider` also syncs `<html lang>` on mount and on every locale change (currently `en` in
`index.html`; it becomes `hi`/`es` when the locale changes).

### 8.2 Seed set (proof, not coverage)

Deliberately small — **3 calculator pages + home strings**, in all three locales:

| Key | en | hi | es |
|---|---|---|---|
| `home.headline` | `{count}+ Calculators in one place` | `{count}+ कैलकुलेटर एक ही जगह` | `{count}+ calculadoras en un solo lugar` |
| `home.searchPlaceholder` | `Search calculators...` | `कैलकुलेटर खोजें...` | `Buscar calculadoras...` |
| `home.seoHeading` | (home SEO heading) | ✓ | ✓ |
| `seo.emi-calculator.title` / `.description` | EMI Calculator … | ईएमआई कैलकुलेटर … | Calculadora de EMI … |
| `seo.bmi-calculator.title` / `.description` | BMI Calculator … | बीएमआई कैलकुलेटर … | Calculadora de IMC … |
| `seo.sip-calculator.title` / `.description` | SIP Calculator … | एसआईपी कैलकुलेटर … | Calculadora de SIP … |

English values mirror `calculatorSeo` in `src/App.tsx`, so `localizedSeo()` is a no-op until a
translation exists — **it can be adopted with zero visual change in English**.

### 8.3 Extension point: how to translate a calculator's title/description

1. Add two keys to `MESSAGES[<locale>]` in `src/lib/i18n.tsx`:
   `seo.<pageId>.title` and `seo.<pageId>.description` (pageId = route filename without `.html`,
   e.g. `home-loan-calculator`).
2. Consume it wherever the title is rendered:
   `const { localizeSeo } = useLocale(); const seo = localizeSeo('home-loan-calculator', { title, description });`
3. Optionally assert coverage with `translatedSeoPages(locale)` in a future test/sitemap audit.

**Not yet wired (by design — those files belong to other agents):**
`CalculatorPageLayout.tsx` / `PageSEO.tsx` still render English-only titles (Agent A/B/C own
them), there is **no locale switcher UI** yet (natural home: `TopBar.tsx` next to the currency
menu — needs an owner decision), and there are **no per-locale URLs or `hreflang` annotations**,
so locale is currently user-facing only. Rolling out translated titles into `PageSEO` without
separate locale URLs would change the `en` experience for everyone — coordinate before enabling.

---

## 9. Share image (E5) — `public/og-image.png`

- **Asset:** 1200×632 PNG generated by `scripts/generate-og.cjs` (Playwright/Chromium), brand card
  with TheCalHub wordmark, tagline, sample calculator chips, site URL, dark background + `#2563eb`
  accent. Verified size: 1200×632, ≥ 20 KB (the script hard-fails otherwise).
- **Regenerate:** `node scripts/generate-og.cjs` (needs `npx playwright install chromium` once).
  Full instructions are in the script header.
- **Why it matters:** `PageSEO.tsx` currently falls back to `/icon-512.svg` for `og:image` —
  Facebook, X/Twitter and LinkedIn **do not render SVG** share images, so previews are broken
  until a PNG URL is configured.

### Wiring instruction for the CEO (pick one)

1. **Preferred (no code change):** set the env var and rebuild —
   `VITE_OG_IMAGE="/og-image.png"` in `.env` (already documented in `.env.example`).
   `PageSEO.resolveOgImage()` returns `import.meta.env.VITE_OG_IMAGE` when set.
   Note: use the **path** `/og-image.png`; `PageSEO` does not prefix the domain itself, so if
   scrapers need an absolute URL use `https://thecalhub.com/og-image.png` instead.
2. **Alternative:** change the fallback constant in `src/components/layout/PageSEO.tsx`
   (`DEFAULT_OG_IMAGE = ${SITE_URL}/icon-512.svg` → `${SITE_URL}/og-image.png`).
   **That file is owned by Agent B (task B9) — Agent E must not edit it.**

After deploy, validate previews with the Facebook Sharing Debugger, Twitter/X Card Validator and
LinkedIn Post Inspector (each has a "scrape again" cache-bust button).

---

## 10. Dependencies, owners and open risks

| Dependency | Owner | Blocks |
|---|---|---|
| Content depth F1/F2 (unique SEO copy for 125/125) | Agent C | Everything in §2 stage 1 |
| Analytics events (§4.2) | Agent B (`analytics.ts`) + component owners | Funnel measurement, optimisation loops |
| OG image wiring (§9) | CEO (env var) or Agent B (`PageSEO.tsx`) | Social previews, listing CTR |
| Locale switcher UI + hreflang | Needs an owner decision (TopBar/layout) | §5.3 language lever |
| E3 unit-conversion hub build | Phase 5 (currently unassigned in code) | §5.1/5.2 — the biggest lever |
| CI runs `audit:links` + `sitemap` | Agent D | Preventing silent regressions |

**Open risks:** AI-Overview CTR erosion (A6), head-term incumbents with decades of domain age,
the possibility that programmatic pages are classed as low-value (§5.6), and the discipline risk
of growth tactics that would jeopardise AdSense (§6.5). Re-forecast at W13 with real data.
