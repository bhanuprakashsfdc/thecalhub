import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_11: CalculatorDef[] = [
  {
    id: 'waveguide-calculator',
    title: 'Waveguide Calculator',
    path: '/waveguide-calculator.html',
    description: 'Find TE10 cutoff frequency, free-space wavelength and guide wavelength for a rectangular waveguide.',
    category: 'scientific',
    keywords: ['waveguide', 'cutoff frequency', 'guide wavelength', 'te10', 'microwave'],
    component: lazy(() => import('../../components/calculators/WaveguideCalculator')),
  },
];
