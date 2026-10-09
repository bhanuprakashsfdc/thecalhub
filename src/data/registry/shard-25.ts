import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_25: CalculatorDef[] = [
  {
    id: 'exponent-calculator',
    title: 'Exponent Calculator',
    path: '/exponent-calculator.html',
    description:
      'Raise any base to a power and see the result alongside its log10 and natural logarithm values for quick conversions.',
    category: 'math',
    keywords: ['exponent', 'power', 'base', 'power calculation', 'logarithm'],
    component: lazy(() => import('../../components/calculators/ExponentCalculator')),
  },
  {
    id: 'exchange-rate-calculator',
    title: 'Exchange Rate Calculator',
    path: '/exchange-rate-calculator.html',
    description:
      'Convert an amount between currencies using source and target rates quoted against a common base, with the implied cross rate shown.',
    category: 'standard',
    keywords: ['exchange rate', 'currency conversion', 'forex', 'cross rate', 'money conversion'],
    component: lazy(() => import('../../components/calculators/ExchangeRateCalculator')),
  },
  {
    id: 'debt-ratio-calculator',
    title: 'Debt Ratio Calculator',
    path: '/debt-ratio-calculator.html',
    description:
      'Compare total debt against assets and equity with debt-to-assets, debt-to-equity and equity ratio percentages to gauge leverage.',
    category: 'financial',
    keywords: ['debt ratio', 'debt to equity', 'leverage ratio', 'solvency', 'debt to assets'],
    component: lazy(() => import('../../components/calculators/DebtRatioCalculator')),
  },
  {
    id: 'base-converter-calculator',
    title: 'Base Converter Calculator',
    path: '/base-converter-calculator.html',
    description:
      'Convert numbers between bases 2 and 36, covering binary, octal, decimal and hexadecimal, with the base-10 value shown alongside.',
    category: 'scientific',
    keywords: ['base converter', 'binary', 'hexadecimal', 'octal', 'number base'],
    component: lazy(() => import('../../components/calculators/BaseConverterCalculator')),
  },
  {
    id: 'momentum-calculator',
    title: 'Momentum Calculator',
    path: '/momentum-calculator.html',
    description:
      'Find linear momentum from mass and velocity, plus kinetic energy, for collisions, vehicles and rocket propulsion problems.',
    category: 'scientific',
    keywords: ['momentum', 'velocity', 'mass', 'kinetic energy', 'physics'],
    component: lazy(() => import('../../components/calculators/MomentumCalculator')),
  },
  {
    id: 'fourier-transform-calculator',
    title: 'Fourier Transform Calculator',
    path: '/fourier-transform-calculator.html',
    description:
      "Derive a sinusoid's spectrum from amplitude, frequency and phase, showing angular frequency, period, RMS and peak-to-peak values.",
    category: 'scientific',
    keywords: ['fourier transform', 'frequency', 'amplitude', 'rms', 'spectrum', 'phase'],
    component: lazy(() => import('../../components/calculators/FourierTransformCalculator')),
  },
  {
    id: 'call-option-calculator',
    title: 'Call Option Calculator',
    path: '/call-option-calculator.html',
    description:
      'Price a European call option with the Black-Scholes model from spot, strike, expiry, rate and volatility, with delta and time value.',
    category: 'trading',
    keywords: ['call option', 'black scholes', 'options pricing', 'delta', 'volatility'],
    component: lazy(() => import('../../components/calculators/CallOptionCalculator')),
  },
];
