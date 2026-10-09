import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_10: CalculatorDef[] = [
  {
    id: 'coax-cable-calculator',
    title: 'Coax Cable Calculator',
    path: '/coax-cable-calculator.html',
    description:
      'Estimate coax cable signal loss over a run, including connector loss, and the power that reaches the receiver.',
    category: 'scientific',
    keywords: ['coax cable', 'attenuation', 'signal loss', 'rf cable', 'db loss'],
    component: lazy(() => import('../../components/calculators/CoaxCableCalculator')),
  },
];
