import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_20: CalculatorDef[] = [
  {
    id: 'fat-calculator',
    title: 'Fat Calculator',
    path: '/fat-calculator.html',
    description:
      'Work out your fat mass, lean mass and the calorie split between them from body weight and body fat percentage.',
    category: 'health',
    keywords: ['fat calculator', 'body fat', 'fat mass', 'lean mass', 'calories'],
    component: lazy(() => import('../../components/calculators/FatCalculator')),
  },
  {
    id: 'box-plot-calculator',
    title: 'Box Plot Calculator',
    path: '/box-plot-calculator.html',
    description:
      'Build a box plot from the five-number summary: quartiles, IQR, 1.5×IQR fences, whiskers and outlier checks.',
    category: 'math',
    keywords: ['box plot', 'quartiles', 'iqr', 'outliers', 'whiskers'],
    component: lazy(() => import('../../components/calculators/BoxPlotCalculator')),
  },
  {
    id: 'mortgage-refinance-calculator',
    title: 'Mortgage Refinance Calculator',
    path: '/mortgage-refinance-calculator.html',
    description:
      'Compare your current mortgage payment with a new loan, see monthly savings and how many months it takes to break even.',
    category: 'construction',
    keywords: ['refinance', 'mortgage', 'break even', 'interest rate', 'closing costs'],
    component: lazy(() => import('../../components/calculators/MortgageRefinanceCalculator')),
  },
  {
    id: 'test-score-calculator',
    title: 'Test Score Calculator',
    path: '/test-score-calculator.html',
    description:
      'Calculate a test percentage from correct and total answers, applying an optional wrong-answer penalty to the raw score.',
    category: 'standard',
    keywords: ['test score', 'percentage', 'raw score', 'exam', 'grade'],
    component: lazy(() => import('../../components/calculators/TestScoreCalculator')),
  },
  {
    id: 'liability-insurance-calculator',
    title: 'Liability Insurance Calculator',
    path: '/liability-insurance-calculator.html',
    description:
      'Work out recommended liability cover from annual income and a chosen multiplier, minus the coverage you already have.',
    category: 'financial',
    keywords: ['liability insurance', 'umbrella policy', 'coverage', 'income multiplier', 'protection'],
    component: lazy(() => import('../../components/calculators/LiabilityInsuranceCalculator')),
  },
  {
    id: 'menu-pricing-calculator',
    title: 'Menu Pricing Calculator',
    path: '/menu-pricing-calculator.html',
    description:
      'Set a profitable menu price from food cost, waste allowance and desired margin, with revenue and gross profit per service.',
    category: 'standard',
    keywords: ['menu pricing', 'food cost', 'restaurant', 'margin', 'food cost percentage'],
    component: lazy(() => import('../../components/calculators/MenuPricingCalculator')),
  },
  {
    id: 'margin-of-error-social-calculator',
    title: 'Margin of Error Social Calculator',
    path: '/margin-of-error-social-calculator.html',
    description:
      'Find the margin of error for a survey proportion at 90%, 95% or 99% confidence, including the full confidence interval.',
    category: 'health',
    keywords: ['margin of error', 'confidence interval', 'sample size', 'survey', 'proportion'],
    component: lazy(() => import('../../components/calculators/MarginOfErrorSocialCalculator')),
  },
];
