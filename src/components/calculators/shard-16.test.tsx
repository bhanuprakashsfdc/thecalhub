import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import CreditCardPayoffCalculator from './CreditCardPayoffCalculator';
import AntilogCalculator from './AntilogCalculator';
import TimeElapsedCalculator, { computeTimeElapsed } from './TimeElapsedCalculator';
import FreeCashFlowCalculator from './FreeCashFlowCalculator';
import CarLeasingCalculator from './CarLeasingCalculator';
import AngularVelocityCalculator from './AngularVelocityCalculator';
import HyperbolicFunctionCalculator from './HyperbolicFunctionCalculator';
import BlockRewardCalculator from './BlockRewardCalculator';

interface CalculatorPage {
  title: string;
  description: string;
  path: string;
  category?: string;
}

function renderCalculatorPage(component: ReactElement, page: CalculatorPage) {
  return render(
    <MemoryRouter initialEntries={[page.path]}>
      <HelmetProvider>
        <I18nProvider>
          <CalculatorPageLayout title={page.title} description={page.description} category={page.category}>
            {component}
          </CalculatorPageLayout>
        </I18nProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
}

function widget(container: HTMLElement) {
  const el = container.querySelector('div.mb-20');
  expect(el).not.toBeNull();
  return within(el as HTMLElement);
}

function heroText(container: HTMLElement): string {
  return container.querySelector('div.mb-20 p.text-4xl')?.textContent ?? '';
}

describe('CreditCardPayoffCalculator', () => {
  const page: CalculatorPage = {
    title: 'Credit Card Payoff Calculator',
    description: 'See how long it takes to clear a credit card balance and the interest you pay.',
    path: '/credit-card-payoff-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<CreditCardPayoffCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Credit Card Payoff Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Monthly payment ($)')).toBeDefined();
    expect(widget(container).getByText('Months to payoff')).toBeDefined();
    expect(widget(container).getByText('Total interest')).toBeDefined();
  });

  it('shortens the payoff when the balance drops', () => {
    const { container } = renderCalculatorPage(<CreditCardPayoffCalculator />, page);
    expect(heroText(container)).toBe('32');
    fireEvent.change(screen.getByLabelText('Current balance ($)'), { target: { value: '2500' } });
    expect(heroText(container)).toBe('14');
  });
});

describe('AntilogCalculator', () => {
  const page: CalculatorPage = {
    title: 'Antilog Calculator',
    description: 'Reverse a logarithm by computing the antilog for base 10, e or 2.',
    path: '/antilog-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<AntilogCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Antilog Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Number (x)')).toBeDefined();
    expect(screen.getByLabelText('Base')).toBeDefined();
    expect(widget(container).getByText('Anti-log')).toBeDefined();
  });

  it('recomputes the antilog when x changes', () => {
    const { container } = renderCalculatorPage(<AntilogCalculator />, page);
    expect(heroText(container)).toBe('1,000.00');
    fireEvent.change(screen.getByLabelText('Number (x)'), { target: { value: '2' } });
    expect(heroText(container)).toBe('100.00');
  });
});

describe('TimeElapsedCalculator', () => {
  const page: CalculatorPage = {
    title: 'Time Elapsed Calculator',
    description: 'Measure the exact time between two dates, split into days, hours, minutes and seconds.',
    path: '/time-elapsed-calculator.html',
    category: 'dateTime',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<TimeElapsedCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Time Elapsed Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Start')).toBeDefined();
    expect(screen.getByLabelText('End')).toBeDefined();
    expect(widget(container).getByText('Time elapsed')).toBeDefined();
    const expected = computeTimeElapsed({ start: '2026-01-01T00:00', end: '2026-10-09T09:17' });
    expect(heroText(container)).toBe(
      `${expected.days}d ${expected.hours}h ${expected.minutes}m ${expected.seconds}s`
    );
  });

  it('updates the elapsed time and never shows NaN', () => {
    const { container } = renderCalculatorPage(<TimeElapsedCalculator />, page);
    fireEvent.change(screen.getByLabelText('Start'), { target: { value: '2026-01-15T00:00' } });
    fireEvent.change(screen.getByLabelText('End'), { target: { value: '2026-01-16T03:00' } });
    expect(heroText(container)).toBe('1d 3h 0m 0s');

    fireEvent.change(screen.getByLabelText('Start'), { target: { value: '' } });
    expect(heroText(container)).toBe('0d 0h 0m 0s');
    expect(container.textContent).not.toContain('NaN');
  });
});

describe('FreeCashFlowCalculator', () => {
  const page: CalculatorPage = {
    title: 'Free Cash Flow Calculator',
    description: 'Work out free cash flow from EBITDA, tax, capex and working capital changes.',
    path: '/free-cash-flow-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<FreeCashFlowCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Free Cash Flow Calculator' })).toBeDefined();
    expect(screen.getByLabelText('EBITDA ($)')).toBeDefined();
    expect(screen.getByLabelText('Tax rate (%)')).toBeDefined();
    expect(widget(container).getByText('Free cash flow')).toBeDefined();
    expect(widget(container).getByText('NOPAT')).toBeDefined();
  });

  it('raises free cash flow when the tax rate falls', () => {
    const { container } = renderCalculatorPage(<FreeCashFlowCalculator />, page);
    expect(heroText(container)).toBe('3,100,000.00');
    fireEvent.change(screen.getByLabelText('Tax rate (%)'), { target: { value: '0' } });
    expect(heroText(container)).toBe('4,150,000.00');
  });
});

describe('CarLeasingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Car Leasing Calculator',
    description: 'Estimate the monthly lease payment and total cost of a car lease.',
    path: '/car-leasing-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<CarLeasingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Car Leasing Calculator' })).toBeDefined();
    expect(screen.getByLabelText('MSRP ($)')).toBeDefined();
    expect(screen.getByLabelText('Money factor')).toBeDefined();
    expect(widget(container).getByText('Monthly lease payment')).toBeDefined();
    expect(widget(container).getByText('Total with tax')).toBeDefined();
  });

  it('keeps the payment finite when the lease term is cleared', () => {
    const { container } = renderCalculatorPage(<CarLeasingCalculator />, page);
    expect(heroText(container)).toBe('556.89');
    fireEvent.change(screen.getByLabelText('Lease term (years)'), { target: { value: '' } });
    expect(heroText(container)).toBe('14,168.00');
    expect(container.textContent).not.toContain('NaN');
  });
});

describe('AngularVelocityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Angular Velocity Calculator',
    description: 'Convert rpm into angular velocity, tangential speed, centripetal acceleration and kinetic energy.',
    path: '/angular-velocity-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<AngularVelocityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Angular Velocity Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Rotational speed (rpm)')).toBeDefined();
    expect(screen.getByLabelText('Radius (m)')).toBeDefined();
    expect(widget(container).getByText('Angular velocity')).toBeDefined();
    expect(widget(container).getByText('Rotational KE')).toBeDefined();
  });

  it('converts a new rpm into angular velocity', () => {
    const { container } = renderCalculatorPage(<AngularVelocityCalculator />, page);
    expect(heroText(container)).toBe('376.99 rad/s');
    fireEvent.change(screen.getByLabelText('Rotational speed (rpm)'), { target: { value: '6000' } });
    expect(heroText(container)).toBe('628.32 rad/s');
  });
});

describe('HyperbolicFunctionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Hyperbolic Function Calculator',
    description: 'Evaluate sinh, cosh, tanh and coth for any value of x.',
    path: '/hyperbolic-function-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<HyperbolicFunctionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Hyperbolic Function Calculator' })).toBeDefined();
    expect(screen.getByLabelText('x')).toBeDefined();
    expect(widget(container).getByText('sinh(x)')).toBeDefined();
    expect(widget(container).getByText('tanh(x)')).toBeDefined();
    expect(heroText(container)).toBe('1.18');
  });

  it('switches function and keeps huge inputs free of NaN', () => {
    const { container } = renderCalculatorPage(<HyperbolicFunctionCalculator />, page);
    fireEvent.click(screen.getByRole('radio', { name: 'coth' }));
    expect(heroText(container)).toBe('1.31');

    fireEvent.change(screen.getByLabelText('x'), { target: { value: '800' } });
    expect(heroText(container)).toBe('0.00');
    expect(container.textContent).not.toContain('NaN');
  });
});

describe('BlockRewardCalculator', () => {
  const page: CalculatorPage = {
    title: 'Block Reward Calculator',
    description: 'Find the current Bitcoin block reward, halving epoch and transaction fees per block.',
    path: '/block-reward-calculator.html',
    category: 'trading',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<BlockRewardCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Block Reward Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Block number')).toBeDefined();
    expect(widget(container).getByText('Total block reward')).toBeDefined();
    expect(widget(container).getByText('Halvings so far')).toBeDefined();
    expect(heroText(container)).toBe('4.63 BTC');
  });

  it('halves the base reward at the next epoch', () => {
    const { container } = renderCalculatorPage(<BlockRewardCalculator />, page);
    fireEvent.change(screen.getByLabelText('Block number'), { target: { value: '210000' } });
    expect(heroText(container)).toBe('26.50 BTC');
    expect(widget(container).getByText('Halving epoch 1')).toBeDefined();
  });
});
