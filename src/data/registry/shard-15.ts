import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_15: CalculatorDef[] = [
  {
    id: 'transaction-fee-calculator',
    title: 'Transaction Fee Calculator',
    path: '/transaction-fee-calculator.html',
    description:
      'Work out the network fee of a crypto transaction from fee rate, size and token price, plus the cost as a share of the amount sent.',
    category: 'financial',
    keywords: ['transaction fee', 'crypto fee', 'sat per byte', 'gas fee', 'network fee'],
    component: lazy(() => import('../../components/calculators/TransactionFeeCalculator')),
  },
];
