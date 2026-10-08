const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE_URL = 'https://thecalhub.com';

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function normalize(link) {
  let value = link.split('#')[0].split('?')[0];
  if (value.length > 1 && value.endsWith('/')) value = value.slice(0, -1);
  return value;
}

function isInternal(link) {
  return link.startsWith('/') && !link.startsWith('//');
}

function patternToRegExp(pattern) {
  const source = pattern
    .split('/')
    .map((segment) => (segment.startsWith(':') ? '[^/]+' : segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    .join('/');
  return new RegExp(`^${source}$`);
}

const appSource = read('src/App.tsx');
const routeValues = [...appSource.matchAll(/\bpath\s*=\s*"([^"]+)"/g)].map((match) => match[1]);
const routes = new Set(routeValues.filter((value) => value !== '*' && !value.includes(':')));
const routePatterns = routeValues.filter((value) => value.includes(':')).map(patternToRegExp);
const wildcardRoutes = routeValues.filter((value) => value === '*').length;

const duplicateRoutes = [];
const seenRoutes = new Set();
for (const value of routeValues) {
  if (seenRoutes.has(value)) {
    if (!duplicateRoutes.includes(value)) duplicateRoutes.push(value);
  }
  seenRoutes.add(value);
}

const links = [];
function addLink(raw, source) {
  const link = raw.trim();
  if (!link || !isInternal(link)) return;
  links.push({ link, source });
}

for (const match of appSource.matchAll(/\bhref\s*=\s*"([^"]+)"/g)) {
  addLink(match[1], 'src/App.tsx');
}

const dataSource = read('src/data/data.js');
for (const match of dataSource.matchAll(/\bpath:\s*'([^']+)'/g)) {
  addLink(match[1], 'src/data/data.js');
}

const seoFiles = [
  'src/data/seo-data.tsx',
  'src/data/seo-data-batch-a.tsx',
  'src/data/seo-data-batch-b.tsx',
  'src/data/seo-data-batch-c.tsx',
];
for (const file of seoFiles) {
  if (!exists(file)) continue;
  for (const match of read(file).matchAll(/\bpath:\s*['"]([^'"]+)['"]/g)) {
    addLink(match[1], file);
  }
}

const sitemapPath = 'public/sitemap.xml';
const sitemapLinks = [];
if (exists(sitemapPath)) {
  for (const match of read(sitemapPath).matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = match[1].trim();
    if (loc.startsWith(BASE_URL)) {
      const link = loc.slice(BASE_URL.length) || '/';
      sitemapLinks.push(link);
      addLink(link, sitemapPath);
    }
  }
}

function hasRoute(link) {
  const value = normalize(link);
  if (routes.has(value)) return true;
  return routePatterns.some((pattern) => pattern.test(value));
}

const broken = links.filter((entry) => !hasRoute(entry.link));

const sources = {};
for (const entry of links) sources[entry.source] = (sources[entry.source] || 0) + 1;

function printRow(columns) {
  console.log(columns.map((cell, index) => String(cell).padEnd(index === 1 ? 34 : index === 0 ? 5 : 46)).join(''));
}

console.log('');
console.log('Internal link audit');
console.log('===================');
console.log(`Routes in src/App.tsx : ${routes.size} exact, ${routePatterns.length} parameterised, ${wildcardRoutes} wildcard`);
console.log(`Links checked         : ${links.length}`);
for (const [source, count] of Object.entries(sources)) {
  console.log(`  - ${source}: ${count}`);
}
console.log('');

if (duplicateRoutes.length) {
  console.log('Duplicate route declarations:');
  for (const route of duplicateRoutes) console.log(`  ! ${route}`);
  console.log('');
}

if (broken.length === 0) {
  console.log('Result: PASS — every internal link resolves to a route.');
  process.exit(0);
}

console.log(`Broken internal links: ${broken.length}`);
printRow(['#', 'LINK', 'SOURCE']);
printRow(['-', '----', '------']);
broken.forEach((entry, index) => {
  printRow([index + 1, entry.link, entry.source]);
});
console.log('');
console.log('Result: FAIL — fix the links above or add the missing routes.');
process.exit(1);
