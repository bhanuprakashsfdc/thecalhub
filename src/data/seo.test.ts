import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSEOContent, getRandomRelatedCalculators, SEO_DATA } from './seo-data';
import { SEO_DATA_BATCH_A } from './seo-data-batch-a';
import { SEO_DATA_BATCH_B } from './seo-data-batch-b';
import { SEO_DATA_BATCH_C } from './seo-data-batch-c';
import { REGISTRY_ROUTES } from './registry';

const appSource = fs.readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../App.tsx'),
  'utf8'
);
const appRoutes = new Set([
  ...Array.from(appSource.matchAll(/path="([^"]+)"/g)).map(match => match[1]),
  ...REGISTRY_ROUTES
]);

const sampleIds = [
  'addition-calculator',
  'bmi-calculator',
  'emi-calculator',
  'sip-calculator',
  'percentage-calculator',
  'mortgage-calculator',
  'unknown-thing-xyz'
];

const allIds = Object.keys(SEO_DATA).map(key => key.replace(/_/g, '-'));

describe('getSEOContent normalisation', () => {
  it('resolves hyphenated ids to underscored SEO_DATA keys (F1 fix)', () => {
    expect(getSEOContent('addition-calculator').title).not.toBe('Free Online');
    expect(getSEOContent('addition-calculator').title).toBe(SEO_DATA['addition_calculator'].title);
    expect(getSEOContent('subtraction-calculator').title).not.toBe('Free Online');
  });

  it('resolves short keys behind -calculator routes', () => {
    const bmi = getSEOContent('bmi-calculator');
    const emi = getSEOContent('emi-calculator');
    expect(bmi.title).not.toBe('Free Online');
    expect(bmi.subtitle).not.toMatch(/Tool$/);
    expect(bmi.faqs.length).toBeGreaterThan(0);
    expect(emi.title).not.toBe('Free Online');
    expect(emi.subtitle).not.toMatch(/Tool$/);
    expect(emi.faqs.length).toBeGreaterThan(0);
  });

  it('accepts underscored ids too', () => {
    expect(getSEOContent('addition_calculator').title).not.toBe('Free Online');
    expect(getSEOContent('simple_interest_calculator').title).not.toBe('Free Online');
  });

  it('returns a safe fallback for unknown ids', () => {
    const fallback = getSEOContent('some-unknown-thing');
    expect(fallback.title).toBe('Free Online');
    expect(fallback.subtitle).toContain('Tool');
    expect(fallback.introduction.length).toBeGreaterThan(0);
    expect(fallback.faqs.length).toBeGreaterThan(0);
    expect(Array.isArray(fallback.relatedCalculators)).toBe(true);
  });

  it('merges every batch key into SEO_DATA', () => {
    const batchKeys = [
      ...Object.keys(SEO_DATA_BATCH_A),
      ...Object.keys(SEO_DATA_BATCH_B),
      ...Object.keys(SEO_DATA_BATCH_C)
    ];
    batchKeys.forEach(key => {
      expect(SEO_DATA[key]).toBeDefined();
      const hyphenId = key.replace(/_/g, '-');
      expect(getSEOContent(hyphenId).title).toBe(SEO_DATA[key].title);
    });
  });
});

describe('getRandomRelatedCalculators (F13 fix)', () => {
  it('only emits paths that exist as routes in App.tsx', () => {
    const ids = [...sampleIds, ...allIds];
    ids.forEach(id => {
      for (let i = 0; i < 5; i++) {
        const related = getRandomRelatedCalculators(id, 5);
        expect(related.length).toBeGreaterThan(0);
        expect(related.length).toBeLessThanOrEqual(5);
        related.forEach(item => {
          expect(appRoutes.has(item.path)).toBe(true);
          expect(item.path).not.toBe('*');
        });
      }
    });
  });

  it('never lists the current page as its own related item', () => {
    sampleIds.forEach(id => {
      const ownPath = `/${id}.html`;
      for (let i = 0; i < 10; i++) {
        const related = getRandomRelatedCalculators(id, 5);
        related.forEach(item => {
          expect(item.path).not.toBe(ownPath);
        });
      }
    });
  });

  it('keeps curated related links when they point at real routes', () => {
    const content = getSEOContent('addition-calculator');
    const curatedPaths = ['subtraction-calculator', 'multiplication-calculator', 'average-calculator']
      .map(id => `/${id}.html`);
    const emitted = content.relatedCalculators.map(item => item.path);
    curatedPaths.forEach(path => expect(emitted).toContain(path));
  });

  it('emits valid related links from getSEOContent as well', () => {
    [...sampleIds, ...allIds].forEach(id => {
      const content = getSEOContent(id);
      expect(content.relatedCalculators.length).toBeGreaterThan(0);
      content.relatedCalculators.forEach(item => {
        expect(appRoutes.has(item.path)).toBe(true);
      });
    });
  });
});
