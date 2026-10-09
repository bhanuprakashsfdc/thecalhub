import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_24: CalculatorDef[] = [
  {
    id: 'proportion-calculator',
    title: 'Proportion Calculator',
    path: '/proportion-calculator.html',
    description:
      'Find the percentage, ratio and scaled whole from a part and whole value, with instant results for recipes, mixtures and comparisons.',
    category: 'math',
    keywords: ['proportion', 'percentage', 'ratio', 'part whole', 'scale factor'],
    component: lazy(() => import('../../components/calculators/ProportionCalculator')),
  },
  {
    id: 'power-converter-calculator',
    title: 'Power Converter Calculator',
    path: '/power-converter-calculator.html',
    description:
      'Convert watts into kilowatts, mechanical horsepower and BTU per hour, with a quick reference of common power unit equivalents.',
    category: 'standard',
    keywords: ['power converter', 'watts', 'kilowatts', 'horsepower', 'btu'],
    component: lazy(() => import('../../components/calculators/PowerConverterCalculator')),
  },
  {
    id: 'p-e-ratio-calculator',
    title: 'P/E Ratio Calculator',
    path: '/p-e-ratio-calculator.html',
    description:
      "Calculate a company's price-to-earnings ratio, earnings yield and benchmark share price from share price and earnings per share.",
    category: 'financial',
    keywords: ['pe ratio', 'price earnings', 'earnings yield', 'valuation', 'eps'],
    component: lazy(() => import('../../components/calculators/PeRatioCalculator')),
  },
  {
    id: 'network-speed-calculator',
    title: 'Network Speed Calculator',
    path: '/network-speed-calculator.html',
    description:
      'Estimate transfer speeds in bps, kbps, Mbps and Gbps from bytes, time and protocol overhead, plus the time to move one gigabyte.',
    category: 'scientific',
    keywords: ['network speed', 'bandwidth', 'mbps', 'download speed', 'throughput'],
    component: lazy(() => import('../../components/calculators/NetworkSpeedCalculator')),
  },
  {
    id: 'moment-of-inertia-calculator',
    title: 'Moment of Inertia Calculator',
    path: '/moment-of-inertia-calculator.html',
    description:
      'Compute moment of inertia and rotational kinetic energy for a hoop, disc, sphere, rod or cylinder from mass and dimensions.',
    category: 'construction',
    keywords: ['moment of inertia', 'rotational inertia', 'mass', 'torque', 'physics'],
    component: lazy(() => import('../../components/calculators/MomentOfInertiaCalculator')),
  },
  {
    id: 'uuid-generator-calculator',
    title: 'UUID Generator Calculator',
    path: '/uuid-generator-calculator.html',
    description:
      'Generate one to ten random UUID identifiers instantly for testing, seeding databases and debugging projects.',
    category: 'standard',
    keywords: ['uuid', 'guid', 'unique id', 'identifier', 'random id'],
    component: lazy(() => import('../../components/calculators/UUIDGeneratorCalculator')),
  },
  {
    id: 'tide-calculator',
    title: 'Tide Calculator',
    path: '/tide-calculator.html',
    description:
      'Estimate current tide height, trend and next high tide time from high and low tide heights and hours for semi-diurnal coasts.',
    category: 'construction',
    keywords: ['tide', 'high tide', 'low tide', 'tidal range', 'ocean'],
    component: lazy(() => import('../../components/calculators/TideCalculator')),
  },
];
