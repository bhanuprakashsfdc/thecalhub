import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_22: CalculatorDef[] = [
  {
    id: 'growth-calculator',
    title: 'Growth Calculator',
    path: '/growth-calculator.html',
    description:
      'Measure total percentage growth and CAGR between an initial and final value over any number of periods, with a per-period growth breakdown.',
    category: 'health',
    keywords: ['growth', 'cagr', 'percentage change', 'rate of return', 'compound growth'],
    component: lazy(() => import('../../components/calculators/GrowthCalculator')),
  },
  {
    id: 'exponential-distribution-calculator',
    title: 'Exponential Distribution Calculator',
    path: '/exponential-distribution-calculator.html',
    description:
      'Compute the PDF and CDF of an exponential distribution from its rate λ, plus mean, variance and standard deviation for waiting-time modeling.',
    category: 'math',
    keywords: ['exponential distribution', 'pdf', 'cdf', 'lambda', 'statistics', 'waiting time'],
    component: lazy(() => import('../../components/calculators/ExponentialDistributionCalculator')),
  },
  {
    id: 'carpet-calculator',
    title: 'Carpet Calculator',
    path: '/carpet-calculator.html',
    description:
      'Estimate carpet rolls, usable area per roll, waste allowance and total material cost for any room size, with and without a waste margin.',
    category: 'construction',
    keywords: ['carpet', 'flooring', 'rolls', 'waste allowance', 'material cost'],
    component: lazy(() => import('../../components/calculators/CarpetCalculator')),
  },
  {
    id: 'drive-time-calculator',
    title: 'Drive Time Calculator',
    path: '/drive-time-calculator.html',
    description:
      'Estimate door-to-door travel time from distance, average speed and planned break minutes, with driving and total trip time in minutes and hours.',
    category: 'standard',
    keywords: ['drive time', 'travel', 'distance', 'speed', 'trip duration'],
    component: lazy(() => import('../../components/calculators/DriveTimeCalculator')),
  },
  {
    id: 'sand-calculator',
    title: 'Sand Calculator',
    path: '/sand-calculator.html',
    description:
      'Calculate the sand mass, volume in cubic metres, tonnage and 25 kg bags needed for a project from area, depth and bulk density.',
    category: 'construction',
    keywords: ['sand', 'volume', 'tonnage', 'bags', 'construction material'],
    component: lazy(() => import('../../components/calculators/SandCalculator')),
  },
  {
    id: 'net-worth-calculator',
    title: 'Net Worth Calculator',
    path: '/net-worth-calculator.html',
    description:
      'Find net worth as assets minus liabilities, plus monthly and annual cash flow and savings rate from your income and expenses.',
    category: 'financial',
    keywords: ['net worth', 'assets', 'liabilities', 'savings rate', 'cash flow'],
    component: lazy(() => import('../../components/calculators/NetWorthCalculator')),
  },
  {
    id: 'resistance-band-calculator',
    title: 'Resistance Band Calculator',
    path: '/resistance-band-calculator.html',
    description:
      'Estimate resistance band force in lbs and kg from free length, stretched length and resistance per inch, with stretch ratio and elongation.',
    category: 'fitness',
    keywords: ['resistance band', 'tension', 'stretch', 'force', 'fitness equipment'],
    component: lazy(() => import('../../components/calculators/ResistanceBandCalculator')),
  },
];
