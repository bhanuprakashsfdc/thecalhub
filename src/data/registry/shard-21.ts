import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_21: CalculatorDef[] = [
  {
    id: 'waist-to-height-ratio-calculator',
    title: 'Waist-to-Height Ratio Calculator',
    path: '/waist-to-height-ratio-calculator.html',
    description:
      'Divide waist circumference by height to get your waist-to-height ratio, with a healthy waist limit and a low, moderate or high risk category.',
    category: 'health',
    keywords: ['waist to height', 'wtHR', 'body fat', 'visceral fat', 'waist ratio', 'metabolic risk'],
    component: lazy(() => import('../../components/calculators/WaistToHeightRatioCalculator')),
  },
  {
    id: 'confidence-interval-calculator',
    title: 'Confidence Interval Calculator',
    path: '/confidence-interval-calculator.html',
    description:
      'Build a confidence interval for a sample mean with the z-score method, showing margin of error, standard error and the lower and upper bounds.',
    category: 'math',
    keywords: ['confidence interval', 'margin of error', 'z score', 'standard error', 'sample mean'],
    component: lazy(() => import('../../components/calculators/ConfidenceIntervalCalculator')),
  },
  {
    id: 'rent-increase-calculator',
    title: 'Rent Increase Calculator',
    path: '/rent-increase-calculator.html',
    description:
      'Apply a percentage rent increase to your current rent and compare the new amount with market rent to see the difference and percent of market.',
    category: 'construction',
    keywords: ['rent increase', 'rent hike', 'lease renewal', 'market rent', 'tenant'],
    component: lazy(() => import('../../components/calculators/RentIncreaseCalculator')),
  },
  {
    id: 'sentence-count-calculator',
    title: 'Sentence Count Calculator',
    path: '/sentence-count-calculator.html',
    description:
      'Count sentences and words in any text and estimate reading time in minutes and seconds at your chosen words-per-minute reading speed.',
    category: 'standard',
    keywords: ['sentence count', 'word count', 'reading time', 'readability', 'text tools'],
    component: lazy(() => import('../../components/calculators/SentenceCountCalculator')),
  },
  {
    id: 'settlement-calculator',
    title: 'Settlement Calculator',
    path: '/settlement-calculator.html',
    description:
      'Project the future value of a lump-sum settlement with compound interest, showing interest earned and the effective annual rate achieved.',
    category: 'construction',
    keywords: ['settlement', 'lump sum', 'compound interest', 'future value', 'payout'],
    component: lazy(() => import('../../components/calculators/SettlementCalculator')),
  },
  {
    id: 'task-duration-calculator',
    title: 'Task Duration Calculator',
    path: '/task-duration-calculator.html',
    description:
      'Estimate realistic task duration from an hours estimate, complexity factor and interruptions, adding a 25% buffer and converting to working days.',
    category: 'dateTime',
    keywords: ['task duration', 'time estimate', 'productivity', 'planning', 'work breakdown'],
    component: lazy(() => import('../../components/calculators/TaskDurationCalculator')),
  },
  {
    id: 'dog-age-calculator',
    title: 'Dog Age Calculator',
    path: '/dog-age-calculator.html',
    description:
      "Convert a dog's age into human years using size-based factors for small, medium and large breeds, with the human age equivalent and factor shown.",
    category: 'health',
    keywords: ['dog age', 'puppy', 'human years', 'pet age', 'dog years'],
    component: lazy(() => import('../../components/calculators/DogAgeCalculator')),
  },
];
