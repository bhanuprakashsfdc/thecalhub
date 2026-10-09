import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_18: CalculatorDef[] = [
  {
    id: 'break-even-calculator',
    title: 'Break-Even Calculator',
    path: '/break-even-calculator.html',
    description:
      'Find the price your trade must reach to break even, with total fees spread across trades and the move needed from entry.',
    category: 'financial',
    keywords: ['break even', 'breakeven point', 'entry price', 'trading fees', 'profit target'],
    component: lazy(() => import('../../components/calculators/BreakevenCalculator')),
  },
  {
    id: 'matrix-multiplication-calculator',
    title: 'Matrix Multiplication Calculator',
    path: '/matrix-multiplication-calculator.html',
    description:
      'Multiply two matrices entered row by row and get the product dimensions, shapes and every resulting row value.',
    category: 'math',
    keywords: ['matrix multiply', 'matrices', 'matrix product', 'linear algebra', 'dimensions'],
    component: lazy(() => import('../../components/calculators/MatrixMultiplicationCalculator')),
  },
  {
    id: 'time-zone-calculator',
    title: 'Time Zone Calculator',
    path: '/time-zone-calculator.html',
    description:
      'Convert a clock time between UTC, IST, EST, PST, GMT, JST and AEST and read the local time at your destination.',
    category: 'dateTime',
    keywords: ['time zone', 'timezone', 'utc', 'time conversion', 'clock converter'],
    component: lazy(() => import('../../components/calculators/TimeZoneCalculator')),
  },
  {
    id: 'page-authority-calculator',
    title: 'Page Authority Calculator',
    path: '/page-authority-calculator.html',
    description:
      "Estimate a page's ranking strength from domain authority, backlinks, referring domains and spam score adjustments.",
    category: 'financial',
    keywords: ['page authority', 'domain authority', 'backlinks', 'seo', 'spam score'],
    component: lazy(() => import('../../components/calculators/PageAuthorityCalculator')),
  },
  {
    id: 'wheel-offset-calculator',
    title: 'Wheel Offset Calculator',
    path: '/wheel-offset-calculator.html',
    description:
      'Compare wheel offset and width to see how far the wheel sits in the well, with backspace and scrub radius changes.',
    category: 'construction',
    keywords: ['wheel offset', 'backspace', 'wheel width', 'scrub radius', 'fitment'],
    component: lazy(() => import('../../components/calculators/WheelOffsetCalculator')),
  },
  {
    id: 'poh-calculator',
    title: 'pOH Calculator',
    path: '/poh-calculator.html',
    description:
      'Convert pH into pOH and calculate hydroxide and hydrogen ion concentrations in mol/L at 25 °C.',
    category: 'scientific',
    keywords: ['poh', 'ph', 'hydroxide', 'concentration', 'chemistry'],
    component: lazy(() => import('../../components/calculators/PoHCalculator')),
  },
  {
    id: 'wound-care-calculator',
    title: 'Wound Care Calculator',
    path: '/wound-care-calculator.html',
    description:
      'Estimate how many days a wound takes to close at a given healing rate and how many dressing changes are needed.',
    category: 'health',
    keywords: ['wound care', 'healing rate', 'dressing change', 'wound healing', 'nursing'],
    component: lazy(() => import('../../components/calculators/WoundCareCalculator')),
  },
];
