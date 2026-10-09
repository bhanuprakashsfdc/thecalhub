import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_16: CalculatorDef[] = [
  {
    id: 'credit-card-payoff-calculator',
    title: 'Credit Card Payoff Calculator',
    path: '/credit-card-payoff-calculator.html',
    description:
      'See how long it takes to clear a credit card balance and the total interest you pay when making a fixed monthly payment.',
    category: 'financial',
    keywords: ['credit card payoff', 'apr', 'monthly payment', 'debt payoff', 'interest'],
    component: lazy(() => import('../../components/calculators/CreditCardPayoffCalculator')),
  },
  {
    id: 'antilog-calculator',
    title: 'Antilog Calculator',
    path: '/antilog-calculator.html',
    description:
      'Reverse a logarithm by computing the antilog of a value for base 10, e or 2, with the result shown alongside the equivalent bases.',
    category: 'math',
    keywords: ['antilog', 'inverse log', 'logarithm', 'exponent', 'base 10'],
    component: lazy(() => import('../../components/calculators/AntilogCalculator')),
  },
  {
    id: 'time-elapsed-calculator',
    title: 'Time Elapsed Calculator',
    path: '/time-elapsed-calculator.html',
    description:
      'Measure the exact time between two dates and timestamps, broken down into days, hours, minutes and seconds at a glance.',
    category: 'dateTime',
    keywords: ['time elapsed', 'date difference', 'duration', 'elapsed time', 'timestamps'],
    component: lazy(() => import('../../components/calculators/TimeElapsedCalculator')),
  },
  {
    id: 'free-cash-flow-calculator',
    title: 'Free Cash Flow Calculator',
    path: '/free-cash-flow-calculator.html',
    description:
      'Work out free cash flow from EBITDA, tax rate, capital expenditure and working capital changes to judge the cash a business truly generates.',
    category: 'financial',
    keywords: ['free cash flow', 'fcf', 'ebitda', 'capex', 'nopat', 'working capital'],
    component: lazy(() => import('../../components/calculators/FreeCashFlowCalculator')),
  },
  {
    id: 'car-leasing-calculator',
    title: 'Car Leasing Calculator',
    path: '/car-leasing-calculator.html',
    description:
      'Estimate the monthly lease payment and total cost of a car lease from MSRP, residual rate, money factor, lease term and sales tax.',
    category: 'construction',
    keywords: ['car lease', 'lease payment', 'money factor', 'residual value', 'msrp'],
    component: lazy(() => import('../../components/calculators/CarLeasingCalculator')),
  },
  {
    id: 'angular-velocity-calculator',
    title: 'Angular Velocity Calculator',
    path: '/angular-velocity-calculator.html',
    description:
      'Turn rotational speed in rpm into angular velocity, plus tangential speed, centripetal acceleration, moment of inertia and kinetic energy.',
    category: 'scientific',
    keywords: ['angular velocity', 'rpm', 'radians per second', 'centripetal', 'rotational speed'],
    component: lazy(() => import('../../components/calculators/AngularVelocityCalculator')),
  },
  {
    id: 'hyperbolic-function-calculator',
    title: 'Hyperbolic Function Calculator',
    path: '/hyperbolic-function-calculator.html',
    description:
      'Evaluate sinh, cosh, tanh and coth for any value of x, showing every hyperbolic function result together for easy comparison.',
    category: 'scientific',
    keywords: ['hyperbolic functions', 'sinh', 'cosh', 'tanh', 'coth'],
    component: lazy(() => import('../../components/calculators/HyperbolicFunctionCalculator')),
  },
  {
    id: 'block-reward-calculator',
    title: 'Block Reward Calculator',
    path: '/block-reward-calculator.html',
    description:
      'Find the current Bitcoin block reward for any block height, including the halving epoch so far and the transaction fees added on top.',
    category: 'trading',
    keywords: ['block reward', 'bitcoin', 'halving', 'mining', 'subsidy'],
    component: lazy(() => import('../../components/calculators/BlockRewardCalculator')),
  },
];
