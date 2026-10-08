#!/usr/bin/env node
/**
 * Mark calculators as [DONE] in calculator.md.
 *
 * Usage:
 *   node scripts/mark-done.cjs scripts/chunks/report-01.txt [...]
 *   node scripts/mark-done.cjs --all-shards
 *
 * Report files accept either the calculator number, the slug, or
 * "number<TAB>slug" per line. Already marked lines are left untouched.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mdPath = path.join(root, 'calculator.md');
const md = fs.readFileSync(mdPath, 'utf8');

const args = process.argv.slice(2);
let files = args.filter((a) => !a.startsWith('--'));
if (args.includes('--all-shards')) {
  const chunkDir = path.join(root, 'scripts', 'chunks');
  files = fs.existsSync(chunkDir)
    ? fs.readdirSync(chunkDir).filter((f) => /^report-\d+\.txt$/.test(f)).map((f) => path.join(chunkDir, f))
    : [];
}

const wantedNums = new Set();
const wantedSlugs = new Set();
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

for (const file of files) {
  const src = fs.readFileSync(path.resolve(file), 'utf8');
  for (const line of src.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const [numPart, slugPart] = trimmed.split(/\s+|\t/);
    if (/^\d+$/.test(numPart)) wantedNums.add(Number(numPart));
    if (slugPart && /^[a-z0-9-]+$/.test(slugPart)) wantedSlugs.add(slugPart);
    if (/^[a-z0-9-]+$/.test(numPart)) wantedSlugs.add(numPart);
  }
}

let marked = 0;
let skipped = 0;
const out = md.split('\n').map((line) => {
  const m = line.match(/^(\d+)\.\s+(.+?)\s*$/);
  if (!m) return line;
  const num = Number(m[1]);
  const raw = m[2].replace(/\s*\[(DONE|TODO)\]\s*$/i, '').trim();
  const already = /\[DONE\]/i.test(m[2]);
  const hit = wantedNums.has(num) || wantedSlugs.has(slugify(raw));
  if (!hit) return line;
  if (already) {
    skipped++;
    return line;
  }
  marked++;
  return `${num}. ${raw} [DONE]`;
});

fs.writeFileSync(mdPath, out.join('\n'));
console.log(`marked ${marked} calculator(s) DONE (${skipped} already marked) from ${files.length} report file(s)`);
