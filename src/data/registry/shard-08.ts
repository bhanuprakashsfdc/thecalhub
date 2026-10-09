import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_08: CalculatorDef[] = [
  {
    id: 'smith-chart-calculator',
    title: 'Smith Chart Calculator',
    path: '/smith-chart-calculator.html',
    description: 'Find the reflection coefficient, VSWR, return loss and impedance magnitude for a load against a characteristic impedance.',
    category: 'scientific',
    keywords: ['smith chart', 'vswr', 'reflection coefficient', 'return loss', 'impedance'],
    component: lazy(() => import('../../components/calculators/SmithChartCalculator')),
  },
];
