#!/usr/bin/env node
/**
 * Build reverse-order work chunks from calculator.md for the build agents.
 *
 * Usage:
 *   node scripts/make-chunks.cjs                 # 10 chunks over remaining work
 *   node scripts/make-chunks.cjs --n 5           # 5 chunks
 *   node scripts/make-chunks.cjs --offset 100    # skip the first 100 reversed items
 *   node scripts/make-chunks.cjs --list          # print remaining count only
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mdPath = path.join(root, 'calculator.md');
const md = fs.readFileSync(mdPath, 'utf8');
const appTsx = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const categoryFor = (section) => {
  const s = section.toLowerCase();
  if (/construction|home improvement|civil engineering/.test(s)) return 'construction';
  if (/health|medical|pharmacy|nursing|psychology|nutrition/.test(s)) return 'health';
  if (/fitness|sports/.test(s)) return 'fitness';
  if (/age & date|time management/.test(s)) return 'dateTime';
  if (/conversion/.test(s)) return 'scientific';
  if (/technology|marketing/.test(s)) return 'programming';
  if (/financial markets|cryptocurrency/.test(s)) return 'trading';
  if (/financial|business|real estate|insurance|legal|personal finance|credit|retirement|investment|tax|loan|mortgage|banking|automotive|educational|personal tools/.test(s)) return 'financial';
  if (/science|chemistry|astronomy|engineering|environmental|geography|military|aviation|maritime|specialized/.test(s)) return 'scientific';
  return 'standard';
};

const entries = [];
let section = 'General';
for (const line of md.split('\n')) {
  const heading = line.match(/^##\s+(.+)$/);
  if (heading) {
    section = heading[1].trim();
    continue;
  }
  const m = line.match(/^(\d+)\.\s+(.+?)\s*$/);
  if (!m) continue;
  const raw = m[2].replace(/\s*\[(DONE|TODO)\]\s*$/i, '').trim();
  entries.push({
    num: Number(m[1]),
    name: raw,
    slug: slugify(raw),
    section,
    category: categoryFor(section),
    done: /\[DONE\]/i.test(m[2]),
  });
}

const builtRoutes = new Set(
  Array.from(appTsx.matchAll(/path="([^"]+)"/g)).map((m) => m[1])
);

// Routes registered through the agent shards count as built too.
const registryDir = path.join(root, 'src', 'data', 'registry');
if (fs.existsSync(registryDir)) {
  for (const file of fs.readdirSync(registryDir)) {
    if (!/^shard-\d+\.ts$/.test(file)) continue;
    const src = fs.readFileSync(path.join(registryDir, file), 'utf8');
    for (const m of src.matchAll(/path:\s*'([^']+)'/g)) builtRoutes.add(m[1]);
  }
}

// Which components already have a test that imports them?
const calcDir = path.join(root, 'src', 'components', 'calculators');
const tested = new Set();
for (const file of fs.readdirSync(calcDir)) {
  if (!/\.test\.tsx$/.test(file)) continue;
  const src = fs.readFileSync(path.join(calcDir, file), 'utf8');
  for (const m of src.matchAll(/from\s+'\.\/(\w+)'/g)) tested.add(m[1]);
}

const seen = new Set();
const remaining = [];
for (const e of entries) {
  if (e.done) continue;
  if (!e.slug) continue;
  if (seen.has(e.slug)) continue;
  const route = `/${e.slug}.html`;
  const isBuilt = builtRoutes.has(route);
  const component = componentNameFor(e.slug);
  const isTested = isBuilt && component && tested.has(component);
  if (isBuilt && isTested) continue;
  seen.add(e.slug);
  remaining.push({ ...e, mode: isBuilt ? 'TESTONLY' : 'BUILD' });
}

function componentNameFor(slug) {
  const pascal = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  const candidates = [
    `${pascal}.tsx`,
    `${pascal.replace(/Calculator$/, '')}.tsx`,
    `${pascal}Calculator.tsx`,
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(calcDir, c))) return c.replace(/\.tsx$/, '');
  }
  return null;
}

// Reverse order: start at the bottom of calculator.md.
const reversed = [...remaining].reverse();

const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const n = Number(getArg('--n', '10'));
const offset = Number(getArg('--offset', '0'));

if (args.includes('--list')) {
  console.log(`remaining calculators: ${reversed.length}`);
  process.exit(0);
}

const slice = reversed.slice(offset);
const size = Math.ceil(slice.length / n);
const outDir = path.join(root, 'scripts', 'chunks');
fs.mkdirSync(outDir, { recursive: true });
// Only regenerate chunk files; keep agent reports (report-NN.txt) intact.
for (const file of fs.readdirSync(outDir)) {
  if (/^chunk-\d+\.txt$/.test(file)) fs.rmSync(path.join(outDir, file));
}

for (let i = 0; i < n; i++) {
  const part = slice.slice(i * size, (i + 1) * size);
  const lines = part.map(
    (e) => `${e.num}\t${e.name}\t/${e.slug}.html\t${e.category}\t${e.mode}\t${e.section}`
  );
  const file = path.join(outDir, `chunk-${String(i + 1).padStart(2, '0')}.txt`);
  fs.writeFileSync(file, lines.join('\n') + (lines.length ? '\n' : ''));
  console.log(`chunk ${i + 1}: ${part.length} calculators -> ${path.relative(root, file)}`);
}
console.log(`total in this round: ${slice.length} (offset ${offset}, ${n} agents)`);
