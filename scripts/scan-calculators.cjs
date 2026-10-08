#!/usr/bin/env node
/* Scan calculator.md against the codebase and report coverage status. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const md = fs.readFileSync(path.join(root, 'calculator.md'), 'utf8');
const appTsx = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
const dataJs = fs.readFileSync(path.join(root, 'src/data/data.js'), 'utf8');
const calcDir = path.join(root, 'src/components/calculators');
const components = fs.existsSync(calcDir) ? fs.readdirSync(calcDir) : [];
const testFiles = components
  .filter((f) => f.endsWith('.test.tsx'))
  .flatMap((f) => {
    const src = fs.readFileSync(path.join(calcDir, f), 'utf8');
    const imports = [];
    const re = /import\s+(\w+)\s+from\s+'\.\/(\w+)'/g;
    let m;
    while ((m = re.exec(src))) imports.push(m[2]);
    return imports;
  });

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const entries = [];
for (const line of md.split('\n')) {
  const m = line.match(/^(\d+)\.\s+(.+?)\s*$/);
  if (!m) continue;
  const raw = m[2].replace(/\s*\[(DONE|TODO)\]\s*$/i, '').trim();
  const done = /\[(DONE|TODO)\]/i.test(m[2]);
  entries.push({ num: Number(m[1]), name: raw, slug: slug(raw), done });
}

const results = entries.map((e) => {
  const route = `/${e.slug}.html`;
  const hasRoute = appTsx.includes(`path="${route}"`);
  const routeHit = hasRoute ? route : null;
  const altRoute = hasRoute ? null : appTsx.match(new RegExp(`path="([^"]+)"[^>]*\\{CalculatorWrapper[^}]*\\}`)) && null;
  const inData = dataJs.includes(e.slug) || dataJs.includes(`'${e.slug}'`);
  const compFile = components.find((f) => {
    const cs = slug(f.replace(/\.tsx$/, ''));
    return cs === e.slug || cs === e.slug.replace(/-calculator$/, '') || e.slug === cs + '-calculator';
  });
  const tested = compFile ? testFiles.includes(compFile.replace(/\.tsx$/, '')) : false;
  return {
    ...e,
    route: routeHit || altRoute,
    hasRoute,
    inData,
    compFile: compFile || null,
    tested,
  };
});

const done = results.filter((r) => r.done).length;
const built = results.filter((r) => r.hasRoute);
const missing = results.filter((r) => !r.hasRoute);

if (require.main === module) {
  const mode = process.argv[2] || 'summary';
  if (mode === 'summary') {
    console.log(`total entries : ${results.length}`);
    console.log(`marked DONE   : ${done}`);
    console.log(`routed (built): ${built.length}`);
    console.log(`missing       : ${missing.length}`);
    console.log(`in home data  : ${results.filter((r) => r.inData).length}`);
    console.log(`has component : ${results.filter((r) => r.compFile).length}`);
    console.log(`covered by test: ${results.filter((r) => r.tested).length}`);
    const missingNoData = missing.filter((r) => r.inData).length;
    console.log(`missing but linked from home (dead links): ${missingNoData}`);
    const builtNoData = built.filter((r) => !r.inData);
    console.log(`built but NOT on home: ${builtNoData.length}`);
  } else if (mode === 'missing') {
    for (const r of missing) console.log(`${r.num}\t${r.name}\t${r.slug}`);
  } else if (mode === 'built-not-home') {
    for (const r of built.filter((x) => !x.inData)) console.log(`${r.num}\t${r.name}\t${r.slug}`);
  } else if (mode === 'json') {
    console.log(JSON.stringify(results, null, 2));
  }
}

module.exports = { results, slug };
