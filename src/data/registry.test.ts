import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { REGISTRY, REGISTRY_BY_PATH, REGISTRY_BY_CATEGORY } from './registry';
import { CALCULATORS, CALCULATORS_ALL, TOOL_CATEGORIES } from './data';

const here = path.dirname(fileURLToPath(import.meta.url));
const validCategories = new Set(TOOL_CATEGORIES.map((c: { id: string }) => c.id));

describe('calculator registry', () => {
  it('contains no duplicate ids or paths', () => {
    const ids = REGISTRY.map((d) => d.id);
    const paths = REGISTRY.map((d) => d.path);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('uses /${id}.html paths and non-empty titles and descriptions', () => {
    REGISTRY.forEach((def) => {
      expect(def.path).toBe(`/${def.id}.html`);
      expect(def.title.trim().length).toBeGreaterThan(0);
      expect(def.description.trim().length).toBeGreaterThan(0);
      expect(def.description.length).toBeLessThanOrEqual(165);
      expect(validCategories.has(def.category)).toBe(true);
      expect(REGISTRY_BY_PATH.get(def.path)).toBe(def);
    });
  });

  it('lazy-imports an existing component file for every entry', () => {
    const shardDir = path.join(here, 'registry');
    const shardFiles = fs
      .readdirSync(shardDir)
      .filter((f) => /^shard-\d+\.ts$/.test(f));
    expect(shardFiles.length).toBeGreaterThan(0);

    const declared = new Map<string, string>();
    shardFiles.forEach((file) => {
      const src = fs.readFileSync(path.join(shardDir, file), 'utf8');
      const re = /import\(\s*'\.\.\/\.\.\/components\/calculators\/(\w+)'\s*\)/g;
      let match: RegExpExecArray | null;
      while ((match = re.exec(src))) {
        declared.set(match[1], file);
      }
    });

    declared.forEach((file, name) => {
      expect(
        fs.existsSync(path.join(here, '..', 'components', 'calculators', `${name}.tsx`)),
        `${name}.tsx is missing (referenced by ${file})`
      ).toBe(true);
    });
  });

  it('is visible on the home dashboard catalogue', () => {
    const allPaths = new Set(CALCULATORS_ALL.map((c: { path: string }) => c.path));
    REGISTRY.forEach((def) => {
      expect(allPaths.has(def.path), `${def.path} missing from home catalogue`).toBe(true);
      const bucket = (CALCULATORS as Record<string, Array<{ path: string }>>)[def.category] || [];
      expect(bucket.some((c) => c.path === def.path)).toBe(true);
      expect(REGISTRY_BY_CATEGORY[def.category]?.some((d) => d.path === def.path)).toBe(true);
    });
  });
});
