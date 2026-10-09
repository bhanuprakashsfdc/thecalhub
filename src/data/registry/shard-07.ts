import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_07: CalculatorDef[] = [
  {
    id: 'rf-power-calculator',
    title: 'RF Power Calculator',
    path: '/rf-power-calculator.html',
    description: 'Convert RF power between dBm, dBW, watts and milliwatts, apply chain gain and loss, and find the load voltage.',
    category: 'scientific',
    keywords: ['rf power', 'dbm', 'dbw', 'link budget', 'watts'],
    component: lazy(() => import('../../components/calculators/RFPowerCalculator')),
  },
];
