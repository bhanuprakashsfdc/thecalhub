import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_14: CalculatorDef[] = [
  {
    id: 'wallet-balance-calculator',
    title: 'Wallet Balance Calculator',
    path: '/wallet-balance-calculator.html',
    description:
      'Value your crypto wallet holdings, compare market value against cost basis, and see unrealised profit or loss.',
    category: 'financial',
    keywords: ['wallet balance', 'crypto portfolio', 'cost basis', 'unrealised pnl'],
    component: lazy(() => import('../../components/calculators/WalletBalanceCalculator')),
  },
];
