import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_17: CalculatorDef[] = [
  {
    id: 'monthly-payment-calculator',
    title: 'Monthly Payment Calculator',
    path: '/monthly-payment-calculator.html',
    description:
      'Calculate the fixed monthly payment on any loan from principal, interest rate and term, plus total interest paid and total amount repaid.',
    category: 'financial',
    keywords: ['monthly payment', 'loan payment', 'amortization', 'emi', 'loan interest'],
    component: lazy(() => import('../../components/calculators/MonthlyPaymentCalculator')),
  },
  {
    id: 'equation-solver-calculator',
    title: 'Equation Solver Calculator',
    path: '/equation-solver-calculator.html',
    description:
      'Solve linear and quadratic equations entered as ax^2 + bx + c = 0 and see the solution type and each root formatted to six decimals.',
    category: 'math',
    keywords: ['equation solver', 'quadratic', 'linear equation', 'roots', 'algebra'],
    component: lazy(() => import('../../components/calculators/EquationSolver')),
  },
  {
    id: 'past-date-calculator',
    title: 'Past Date Calculator',
    path: '/past-date-calculator.html',
    description:
      'Subtract a number of days from any start date to find the exact past date. Useful for deadlines, warranties, records and elapsed time.',
    category: 'dateTime',
    keywords: ['past date', 'date subtract', 'days ago', 'date offset', 'backward date'],
    component: lazy(() => import('../../components/calculators/PastDateCalculator')),
  },
  {
    id: 'return-on-ad-spend-calculator',
    title: 'Return on Ad Spend Calculator',
    path: '/return-on-ad-spend-calculator.html',
    description:
      'Compute return on ad spend from revenue and budget, with cost per click, click-through rate and CPM for a full paid-media snapshot.',
    category: 'financial',
    keywords: ['roas', 'ad spend', 'return on advertising', 'cpc', 'ctr', 'cpm'],
    component: lazy(() => import('../../components/calculators/ReturnOnAdSpendCalculator')),
  },
  {
    id: 'car-depreciation-calculator',
    title: 'Car Depreciation Calculator',
    path: '/car-depreciation-calculator.html',
    description:
      "Estimate a car's current resale value after any number of years with an annual depreciation rate, charting the year-by-year value decline.",
    category: 'construction',
    keywords: ['car depreciation', 'resale value', 'vehicle value', 'depreciation rate', 'auto'],
    component: lazy(() => import('../../components/calculators/CarDepreciationCalculator')),
  },
  {
    id: 'molecular-weight-calculator',
    title: 'Molecular Weight Calculator',
    path: '/molecular-weight-calculator.html',
    description:
      'Find the molecular weight of a chemical formula by summing atomic masses, supporting parenthesised groups with a manual mass override.',
    category: 'scientific',
    keywords: ['molecular weight', 'molar mass', 'chemistry', 'formula', 'atomic mass'],
    component: lazy(() => import('../../components/calculators/MolecularWeightCalculator')),
  },
  {
    id: 'drug-clearance-calculator',
    title: 'Drug Clearance Calculator',
    path: '/drug-clearance-calculator.html',
    description:
      'Estimate drug clearance from dose, volume of distribution and elimination half-life, plus steady-state concentration and time to steady state.',
    category: 'health',
    keywords: ['drug clearance', 'pharmacokinetics', 'half-life', 'steady state', 'volume of distribution'],
    component: lazy(() => import('../../components/calculators/DrugClearanceCalculator')),
  },
];
