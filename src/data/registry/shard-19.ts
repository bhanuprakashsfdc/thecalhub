import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_19: CalculatorDef[] = [
  {
    id: 'dividend-calculator',
    title: 'Dividend Calculator',
    path: '/dividend-calculator.html',
    description:
      'Work out dividend yield, annual and monthly income from your shares, plus total invested and the payback period of the position.',
    category: 'financial',
    keywords: ['dividend', 'yield', 'share price', 'payout ratio', 'stock income'],
    component: lazy(() => import('../../components/calculators/DividendCalculator')),
  },
  {
    id: 'median-calculator',
    title: 'Median Calculator',
    path: '/median-calculator.html',
    description:
      'Find the median of a list of numbers instantly. Paste values separated by commas, semicolons or spaces and read the middle value.',
    category: 'math',
    keywords: ['median', 'middle value', 'statistics', 'mean', 'data set'],
    component: lazy(() => import('../../components/calculators/MedianCalculator')),
  },
  {
    id: 'title-insurance-calculator',
    title: 'Title Insurance Calculator',
    path: '/title-insurance-calculator.html',
    description:
      'Estimate title insurance premiums from the loan amount and state rates, including owner policy, lender policy and total closing cost.',
    category: 'construction',
    keywords: ['title insurance', 'owner policy', 'lender policy', 'closing costs', 'home purchase'],
    component: lazy(() => import('../../components/calculators/TitleInsuranceCalculator')),
  },
  {
    id: 'cumulative-gpa-calculator',
    title: 'Cumulative GPA Calculator',
    path: '/cumulative-gpa-calculator.html',
    description:
      'Combine your current GPA with a new semester of credits and quality points to see the updated cumulative GPA and semester average.',
    category: 'standard',
    keywords: ['cumulative gpa', 'gpa', 'quality points', 'credits', 'semester gpa'],
    component: lazy(() => import('../../components/calculators/CumulativeGPACalculator')),
  },
  {
    id: 'term-life-insurance-calculator',
    title: 'Term Life Insurance Calculator',
    path: '/term-life-insurance-calculator.html',
    description:
      'Calculate the term life cover you need from annual income, years of support, mortgage and debts, minus the assets you already hold.',
    category: 'financial',
    keywords: ['term life', 'life insurance', 'coverage', 'income replacement', 'dependents'],
    component: lazy(() => import('../../components/calculators/TermLifeInsuranceCalculator')),
  },
  {
    id: 'partial-pressure-calculator',
    title: 'Partial Pressure Calculator',
    path: '/partial-pressure-calculator.html',
    description:
      "Apply Dalton's law to find a gas's partial pressure from total pressure and mole fraction, plus the pressure carried by other gases.",
    category: 'scientific',
    keywords: ['partial pressure', 'daltons law', 'mole fraction', 'gas law', 'atmosphere'],
    component: lazy(() => import('../../components/calculators/PartialPressureCalculator')),
  },
  {
    id: 'iq-estimate-calculator',
    title: 'IQ Estimate Calculator',
    path: '/iq-estimate-calculator.html',
    description:
      'Convert a score from one test into an IQ-style estimate by matching z-scores against the target population mean and standard deviation.',
    category: 'health',
    keywords: ['iq', 'z score', 'iq estimate', 'standard deviation', 'psychology'],
    component: lazy(() => import('../../components/calculators/IQEstimateCalculator')),
  },
];
