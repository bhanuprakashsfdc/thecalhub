import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_09: CalculatorDef[] = [
  {
    id: 'vswr-calculator',
    title: 'VSWR Calculator',
    path: '/vswr-calculator.html',
    description: 'Convert between VSWR, reflection coefficient, return loss and mismatch loss for any feedline.',
    category: 'scientific',
    keywords: ['vswr', 'swr', 'reflection coefficient', 'return loss', 'mismatch loss'],
    component: lazy(() => import('../../components/calculators/VSWRCalculator')),
  },
];
