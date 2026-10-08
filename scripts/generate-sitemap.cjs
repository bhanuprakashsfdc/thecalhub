const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://thecalhub.com';
const APP_SOURCE_FILE = path.join(__dirname, '../src/App.tsx');
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

const LEGAL_PAGES = new Set([
  '/about.html',
  '/contact.html',
  '/support.html',
  '/privacy-policy.html',
  '/terms-of-service.html',
]);

const CONTENT_PAGES = new Set(['/blog.html', '/faq.html', '/tutorials.html']);

const CATEGORY_HUBS = new Set([
  '/all.html',
  '/financial.html',
  '/health.html',
  '/scientific.html',
  '/programming.html',
  '/math.html',
  '/fitness.html',
  '/datetime.html',
  '/construction.html',
  '/trading.html',
  '/calculator-suite.html',
]);

const TOOL_PAGES = new Set(['/notepad.html', '/pomodoro-timer.html', '/clock.html']);

function classify(pagePath) {
  if (pagePath === '/') return { changefreq: 'daily', priority: 1.0 };
  if (LEGAL_PAGES.has(pagePath)) return { changefreq: 'monthly', priority: 0.5 };
  if (CONTENT_PAGES.has(pagePath)) return { changefreq: 'weekly', priority: 0.7 };
  if (CATEGORY_HUBS.has(pagePath)) return { changefreq: 'weekly', priority: 0.9 };
  if (TOOL_PAGES.has(pagePath)) return { changefreq: 'monthly', priority: 0.6 };
  return { changefreq: 'monthly', priority: 0.8 };
}

function extractRoutes() {
  const source = fs.readFileSync(APP_SOURCE_FILE, 'utf8');
  const values = [...source.matchAll(/\bpath\s*=\s*"([^"]+)"/g)].map((match) => match[1]);
  const routes = [];
  const excluded = [];
  for (const value of values) {
    if (value === '*' || value.includes(':')) {
      excluded.push(value);
      continue;
    }
    if (value === '/index.html') {
      excluded.push(value);
      continue;
    }
    if (!routes.includes(value)) routes.push(value);
  }
  return { routes: routes.sort((a, b) => a.localeCompare(b)), excluded };
}

function buildXml(lastmod) {
  const { routes, excluded } = extractRoutes();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  for (const pagePath of routes) {
    const { changefreq, priority } = classify(pagePath);
    xml += `  <url>
    <loc>${BASE_URL}${pagePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>
`;
  }
  xml += '</urlset>';
  return { xml, routes, excluded };
}

function stripDates(xml) {
  return xml.replace(/<lastmod>[^<]*<\/lastmod>/g, '');
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const { xml, routes, excluded } = buildXml(today);

  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`Sitemap generated from src/App.tsx: ${routes.length} URLs → public/sitemap.xml`);
  if (excluded.length) {
    console.log(`Excluded (wildcard/dynamic/alias): ${excluded.join(', ')}`);
  }
}

function checkSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const { xml: expected, routes } = buildXml(today);

  if (!fs.existsSync(OUTPUT_FILE)) {
    console.error(`FAIL — ${OUTPUT_FILE} is missing. Run: npm run sitemap`);
    process.exit(1);
  }

  const actual = fs.readFileSync(OUTPUT_FILE, 'utf8');
  if (stripDates(actual) === stripDates(expected)) {
    console.log(`OK — public/sitemap.xml matches src/App.tsx (${routes.length} URLs, lastmod ignored)`);
    return;
  }

  const actualUrls = [...actual.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) => match[1]).sort();
  const expectedUrls = [...expected.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) => match[1]).sort();
  const missing = expectedUrls.filter((url) => !actualUrls.includes(url));
  const stale = actualUrls.filter((url) => !expectedUrls.includes(url));

  console.error('FAIL — public/sitemap.xml is stale.');
  if (missing.length) console.error(`  missing from sitemap (${missing.length}): ${missing.join(', ')}`);
  if (stale.length) console.error(`  in sitemap but not in App.tsx (${stale.length}): ${stale.join(', ')}`);
  if (!missing.length && !stale.length) console.error('  changefreq/priority metadata differs from the route classification.');
  console.error('Run: npm run sitemap  (then commit public/sitemap.xml)');
  process.exit(1);
}

if (process.argv.includes('--check')) {
  checkSitemap();
} else {
  generateSitemap();
}
