# TheCalHub

Free online calculators for finance, health, math, construction, trading, science, programming, fitness, and date & time — 125+ calculator routes, all running entirely in the browser. No accounts, no server-side storage: every calculation happens on the client.

## Stack

- **React 19** with **TypeScript 5.8**
- **Vite 6** (dev server, build, code splitting)
- **Tailwind CSS 4** (design tokens via `src/index.css`)
- **React Router 7** (SPA routing, `.html` style paths)
- **Vitest + React Testing Library** (unit tests), **Playwright** (e2e)
- `react-helmet-async` for per-page SEO, `recharts` for charts, `motion` for animations

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:3000
```

No environment variables are required to run the site.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 3000 (`--host` exposed for LAN/containers) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check the whole project (`tsc --noEmit`) |
| `npm run test` | Vitest in watch mode |
| `npm run test:run` | Single Vitest run (CI) |
| `npm run test:e2e` | Playwright end-to-end tests (`tests/e2e`) |
| `npm run test:e2e:ui` | Playwright UI mode |
| `npm run clean` | Remove `dist/` |

## Environment variables

All variables are optional and are read at build time through `import.meta.env`. Copy `.env.example` to `.env.local` if you want to set them.

| Variable | Purpose | When unset |
|---|---|---|
| `VITE_GA_ID` | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`) | No `gtag` script is injected at all |
| `VITE_ADSENSE_CLIENT` | AdSense publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`) | No AdSense script is loaded and `AdSlot` renders nothing |
| `VITE_OG_IMAGE` | Absolute URL of the social share image (1200×632 PNG/JPG) | Falls back to `/icon-512.svg` |

## Project structure

```
src/
  App.tsx                  # route table: 125 calculator routes, category hubs, static pages
  main.tsx                 # entry: HelmetProvider + service worker registration
  components/
    CalculatorPageLayout.tsx# shared shell for every calculator page (title, SEO, FAQ block)
    calculators/           # one component per calculator + calculators.test.tsx
    layout/                # TopBar, PageSEO
    common/                # ErrorBoundary, SEOContentSection, AdSlot, shared UI
    Footer.tsx
  data/
    data.js                # calculator catalogue: categories, names, paths, search
    seo-data.tsx           # per-calculator SEO content (title, intro, FAQs, related links)
  pages/                   # Dashboard, category hubs, NotFound, blog, legal, tools
  lib/                     # i18n, analytics, notifications, utils
  test/setup.ts            # Vitest setup (jest-dom matchers)
public/                    # robots.txt, ads.txt, sitemap.xml, PWA manifest, service worker
scripts/                   # generate-sitemap.cjs
tests/e2e/                 # Playwright specs
```

## Routing & link integrity

Routes live in `src/App.tsx`; calculator paths live in `src/data/data.js`. Every path referenced anywhere in `src/` must have a matching `<Route>`:

```bash
# paths referenced in data.js that have no route (should print nothing)
comm -23 \
  <(grep -o "path: '[^']*'" src/data/data.js | sed "s/path: '//;s/'//" | sort -u) \
  <(grep -o '<Route path="[^"]*"' src/App.tsx | sed 's/<Route path="//;s/"//' | sort -u)

# duplicated route declarations (should print nothing)
grep -o '<Route path="[^"]*"' src/App.tsx | sort | uniq -d
```

Unknown URLs render `src/pages/NotFound.tsx` with a `noindex` meta tag.

## Testing

```bash
npm run lint       # 0 errors expected
npm run test:run   # 0 failures expected
```

Calculator tests render through `CalculatorPageLayout` inside a `MemoryRouter` + `I18nProvider`, so they cover the real page shell (heading, SEO block) as well as the calculator itself. At least one test per category exists: finance, health, math, construction, trading, scientific, programming, fitness, datetime.
