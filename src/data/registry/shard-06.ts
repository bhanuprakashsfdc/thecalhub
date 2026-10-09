import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_06: CalculatorDef[] = [
  {
    id: 'decibel-wireless-calculator',
    title: 'Decibel Wireless Calculator',
    path: '/decibel-wireless-calculator.html',
    description: 'Compare two RF power levels in decibels, convert milliwatts to dBm and see the received level after cable loss.',
    category: 'scientific',
    keywords: ['decibel', 'rf power', 'dbm', 'wireless', 'cable loss'],
    component: lazy(() => import('../../components/calculators/DecibelWirelessCalculator')),
  },
];
