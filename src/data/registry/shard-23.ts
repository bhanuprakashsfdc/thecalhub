import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_23: CalculatorDef[] = [
  {
    id: 'metabolic-age-calculator',
    title: 'Metabolic Age Calculator',
    path: '/metabolic-age-calculator.html',
    description:
      'Estimate your metabolic age from chronological age, resting heart rate, VO2 max and activity level, with each adjustment broken out.',
    category: 'health',
    keywords: ['metabolic age', 'vo2 max', 'resting heart rate', 'fitness age', 'metabolism'],
    component: lazy(() => import('../../components/calculators/MetabolicAgeCalculator')),
  },
  {
    id: 'volume-converter-calculator',
    title: 'Volume Converter Calculator',
    path: '/volume-converter-calculator.html',
    description:
      'Convert between liters, gallons, quarts, pints, cups and cubic units in either direction, with instant results routed through liters.',
    category: 'standard',
    keywords: ['volume converter', 'gallons to liters', 'liters', 'cubic feet', 'capacity'],
    component: lazy(() => import('../../components/calculators/VolumeConverterCalculator')),
  },
  {
    id: 'roe-calculator',
    title: 'ROE Calculator',
    path: '/roe-calculator.html',
    description:
      "Calculate return on equity from net income and shareholders' equity, plus ROA, net margin and the DuPont equity multiplier.",
    category: 'financial',
    keywords: ['roe', 'return on equity', 'dupont analysis', 'roa', 'net margin'],
    component: lazy(() => import('../../components/calculators/ROECalculator')),
  },
  {
    id: 'luggage-weight-calculator',
    title: 'Luggage Weight Calculator',
    path: '/luggage-weight-calculator.html',
    description:
      'Compare checked bag weight against the free allowance and estimate the overweight fee across multiple pieces of luggage.',
    category: 'standard',
    keywords: ['luggage weight', 'baggage allowance', 'overweight fee', 'airline baggage', 'suitcase'],
    component: lazy(() => import('../../components/calculators/LuggageWeightCalculator')),
  },
  {
    id: 'hvac-calculator',
    title: 'HVAC Calculator',
    path: '/hvac-calculator.html',
    description:
      'Size a cooling load from room volume, temperature difference and air changes per hour, reported in BTU/h, tons and kW.',
    category: 'construction',
    keywords: ['hvac load', 'cooling capacity', 'btu per hour', 'air changes', 'refrigeration tons'],
    component: lazy(() => import('../../components/calculators/HVACCalculator')),
  },
  {
    id: 'credit-card-interest-calculator',
    title: 'Credit Card Interest Calculator',
    path: '/credit-card-interest-calculator.html',
    description:
      'Project credit card interest month by month from balance, APR and monthly payment to see total interest and remaining balance.',
    category: 'financial',
    keywords: ['credit card interest', 'apr', 'minimum payment', 'debt payoff', 'interest cost'],
    component: lazy(() => import('../../components/calculators/CreditCardInterestCalculator')),
  },
  {
    id: 'climb-rate-calculator',
    title: 'climb Rate Calculator',
    path: '/climb-rate-calculator.html',
    description:
      "Estimate an aircraft's rate of climb from thrust, drag, weight and true airspeed, with climb angle and excess thrust shown.",
    category: 'construction',
    keywords: ['rate of climb', 'climb rate', 'excess thrust', 'feet per minute', 'aviation'],
    component: lazy(() => import('../../components/calculators/ClimbRateCalculator')),
  },
];
