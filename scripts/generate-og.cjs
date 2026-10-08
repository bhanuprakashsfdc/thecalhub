/**
 * generate-og.cjs — renders the social share image `public/og-image.png` (1200x632).
 *
 * WHY: `PageSEO.tsx` emits `og:image` / `twitter:image`, but its fallback is an SVG.
 * Facebook, X/Twitter, LinkedIn, Slack and WhatsApp do NOT render SVG share images,
 * so a real PNG is required for social previews and for AdSense/social readiness.
 *
 * HOW TO REGENERATE (from the repo root):
 *   node scripts/generate-og.cjs
 *
 * Requirements:
 *   - `@playwright/test` is already a devDependency.
 *   - Chromium installed: `npx playwright install chromium`
 *     (browsers live in ~/Library/Caches/ms-playwright on macOS).
 *
 * Output contract (the script fails loudly if any of these break):
 *   - public/og-image.png exists
 *   - exactly 1200 x 632 px
 *   - at least 20 KB (too-small share images look broken / get rejected by scrapers)
 *
 * Wiring: set `VITE_OG_IMAGE="/og-image.png"` in .env (see .env.example).
 * Without it, PageSEO keeps falling back to the SVG icon.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUT_FILE = path.join(__dirname, '..', 'public', 'og-image.png');
const WIDTH = 1200;
const HEIGHT = 632;
const MIN_BYTES = 20 * 1024;

const ACCENT = '#2563eb';
const ACCENT_LIGHT = '#60a5fa';

const CHIPS = [
  'EMI Calculator',
  'BMI Calculator',
  'SIP Calculator',
  'Age Calculator',
  'Percentage Calculator',
  'Mortgage Calculator',
  'FD Calculator',
  'Concrete Calculator',
];

function buildHtml() {
  const chips = CHIPS.map(
    (label) => `<span class="chip"><i></i>${label}</span>`
  ).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: #0b1220;
    color: #fff;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }
  .glow-a, .glow-b, .glow-c {
    position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none;
  }
  .glow-a { width: 640px; height: 640px; right: -170px; top: -230px;
    background: radial-gradient(circle, rgba(37,99,235,0.75) 0%, rgba(37,99,235,0.10) 60%, rgba(37,99,235,0) 72%); }
  .glow-b { width: 520px; height: 520px; left: -180px; bottom: -240px;
    background: radial-gradient(circle, rgba(37,99,235,0.42) 0%, rgba(37,99,235,0.06) 60%, rgba(37,99,235,0) 74%); }
  .glow-c { width: 380px; height: 380px; right: 240px; bottom: -200px;
    background: radial-gradient(circle, rgba(96,165,250,0.30) 0%, rgba(96,165,250,0) 70%); }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(circle at 30% 40%, #000 0%, transparent 78%);
    -webkit-mask-image: radial-gradient(circle at 30% 40%, #000 0%, transparent 78%);
  }
  .noise { position: absolute; inset: 0; opacity: 0.5; }
  .frame {
    position: absolute; inset: 20px; border: 1px solid rgba(148,163,184,0.16);
    border-radius: 26px; pointer-events: none;
  }
  .content { position: relative; width: 100%; height: 100%; padding: 54px 64px; display: flex; flex-direction: column; }

  header { display: flex; align-items: center; gap: 16px; }
  .mark {
    width: 56px; height: 56px; border-radius: 15px;
    background: linear-gradient(145deg, ${ACCENT} 0%, #1d4ed8 100%);
    box-shadow: 0 10px 30px rgba(37,99,235,0.55), inset 0 1px 0 rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
  }
  .brand { font-size: 34px; font-weight: 800; letter-spacing: -0.02em; }
  .brand span { color: ${ACCENT_LIGHT}; }
  .url {
    margin-left: auto; font-size: 19px; font-weight: 600; color: #cbd5e1;
    background: rgba(148,163,184,0.12); border: 1px solid rgba(148,163,184,0.22);
    padding: 9px 18px; border-radius: 999px; letter-spacing: 0.02em;
  }

  main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  h1 {
    font-size: 68px; line-height: 1.04; font-weight: 800; letter-spacing: -0.035em;
    max-width: 860px;
  }
  h1 em {
    font-style: normal;
    background: linear-gradient(90deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 60%, #38bdf8 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .tagline {
    margin-top: 20px; font-size: 25px; font-weight: 500; color: #94a3b8;
    max-width: 780px; line-height: 1.45;
  }
  .chips { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; max-width: 940px; }
  .chip {
    display: inline-flex; align-items: center; gap: 9px;
    font-size: 18px; font-weight: 600; color: #e2e8f0;
    background: rgba(37,99,235,0.16); border: 1px solid rgba(96,165,250,0.42);
    padding: 9px 17px; border-radius: 999px;
  }
  .chip i { width: 8px; height: 8px; border-radius: 50%; background: ${ACCENT_LIGHT}; display: inline-block; }

  footer {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 16px; color: #64748b; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; border-top: 1px solid rgba(148,163,184,0.16); padding-top: 20px;
    white-space: nowrap;
  }
  footer b { color: ${ACCENT_LIGHT}; font-weight: 700; }
</style>
</head>
<body>
  <div class="glow-a"></div>
  <div class="glow-b"></div>
  <div class="glow-c"></div>
  <div class="grid"></div>
  <svg class="noise" xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.11" />
  </svg>
  <div class="frame"></div>

  <div class="content">
    <header>
      <div class="mark">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="2" width="16" height="20" rx="3" fill="#ffffff" opacity="0.95"/>
          <rect x="7" y="5" width="10" height="4" rx="1" fill="${ACCENT}"/>
          <circle cx="8.5" cy="13" r="1.6" fill="${ACCENT}"/>
          <circle cx="12" cy="13" r="1.6" fill="${ACCENT}"/>
          <circle cx="15.5" cy="13" r="1.6" fill="${ACCENT}"/>
          <circle cx="8.5" cy="17.5" r="1.6" fill="#1d4ed8"/>
          <circle cx="12" cy="17.5" r="1.6" fill="#1d4ed8"/>
          <circle cx="15.5" cy="17.5" r="1.6" fill="#1d4ed8"/>
        </svg>
      </div>
      <div class="brand">The<span>Cal</span>Hub</div>
      <div class="url">thecalhub.com</div>
    </header>

    <main>
      <h1>Every calculator you need. <em>One place.</em></h1>
      <p class="tagline">Free online calculators for finance, health, math, construction and more — instant results, no sign-up.</p>
      <div class="chips">${chips}</div>
    </main>

    <footer>
      <span>125+ calculators &nbsp;·&nbsp; free forever &nbsp;·&nbsp; works offline</span>
      <span>privacy-first &nbsp;·&nbsp; <b>no account</b></span>
    </footer>
  </div>
</body>
</html>`;
}

function readPngSize(buffer) {
  const signature = buffer.subarray(0, 8).toString('hex');
  if (signature !== '89504e470d0a1a0a') return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function main() {
  const html = buildHtml();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
    });
    await page.setContent(html, { waitUntil: 'load' });
    await page.screenshot({
      path: OUT_FILE,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
      type: 'png',
    });
  } finally {
    await browser.close();
  }

  if (!fs.existsSync(OUT_FILE)) {
    throw new Error(`OG image was not written: ${OUT_FILE}`);
  }
  const buffer = fs.readFileSync(OUT_FILE);
  const size = readPngSize(buffer);
  if (!size || size.width !== WIDTH || size.height !== HEIGHT) {
    throw new Error(
      `OG image must be exactly ${WIDTH}x${HEIGHT}, got ${size ? `${size.width}x${size.height}` : 'unreadable PNG'}`
    );
  }
  if (buffer.length < MIN_BYTES) {
    throw new Error(
      `OG image is only ${buffer.length} bytes (minimum ${MIN_BYTES}). Increase visual detail.`
    );
  }

  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`OG image written: ${path.relative(process.cwd(), OUT_FILE)} — ${WIDTH}x${HEIGHT}, ${kb} KB`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
