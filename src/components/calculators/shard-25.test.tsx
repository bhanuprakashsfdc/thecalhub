import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import ExponentCalculator from './ExponentCalculator';
import ExchangeRateCalculator from './ExchangeRateCalculator';
import DebtRatioCalculator from './DebtRatioCalculator';
import BaseConverterCalculator from './BaseConverterCalculator';
import MomentumCalculator from './MomentumCalculator';
import FourierTransformCalculator from './FourierTransformCalculator';
import CallOptionCalculator, { computeCallOption } from './CallOptionCalculator';
import { formatMoney } from './kit';

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

const heroValue = (container: HTMLElement) =>
  container.querySelector('p.text-4xl')?.textContent ?? '';

describe('ExponentCalculator', () => {
  const page: CalculatorPage = {
    title: 'Exponent Calculator',
    description: 'Raise a base to a power and read its logarithms.',
    path: '/exponent-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExponentCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Exponent Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Base')).toBeDefined();
    expect(screen.getAllByText('log10(result)').length).toBeGreaterThanOrEqual(1);
  });

  it('raises the base to the edited exponent', () => {
    const { container } = renderCalculatorPage(<ExponentCalculator />, page);
    expect(heroValue(container)).toBe('256.00');
    fireEvent.change(screen.getByLabelText('Exponent'), { target: { value: '2' } });
    expect(heroValue(container)).toBe('4.00');
  });
});

describe('ExchangeRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Exchange Rate Calculator',
    description: 'Convert money between currencies with a cross rate.',
    path: '/exchange-rate-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExchangeRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Exchange Rate Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Amount')).toBeDefined();
    expect(screen.getAllByText('Converted amount').length).toBeGreaterThanOrEqual(1);
  });

  it('doubles the converted amount when the amount doubles', () => {
    const { container } = renderCalculatorPage(<ExchangeRateCalculator />, page);
    expect(heroValue(container)).toBe('92.00');
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '200' } });
    expect(heroValue(container)).toBe('184.00');
  });
});

describe('DebtRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'Debt Ratio Calculator',
    description: 'Compare debt against assets and equity.',
    path: '/debt-ratio-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DebtRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Debt Ratio Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Total debt ($)')).toBeDefined();
    expect(screen.getAllByText('Debt-to-assets').length).toBeGreaterThanOrEqual(1);
  });

  it('raises the debt-to-assets ratio when debt rises', () => {
    const { container } = renderCalculatorPage(<DebtRatioCalculator />, page);
    expect(heroValue(container)).toBe('40.00%');
    fireEvent.change(screen.getByLabelText('Total debt ($)'), { target: { value: '500000' } });
    expect(heroValue(container)).toBe('50.00%');
  });
});

describe('BaseConverterCalculator', () => {
  const page: CalculatorPage = {
    title: 'Base Converter Calculator',
    description: 'Convert numbers between bases 2 through 36.',
    path: '/base-converter-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BaseConverterCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Base Converter Calculator' })).toBeDefined();
    expect(screen.getByLabelText('From base')).toBeDefined();
    expect(screen.getAllByText('Converted value').length).toBeGreaterThanOrEqual(1);
  });

  it('converts a hex value to binary', () => {
    const { container } = renderCalculatorPage(<BaseConverterCalculator />, page);
    expect(heroValue(container)).toBe('11111111');
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '10' } });
    expect(heroValue(container)).toBe('10000');
  });
});

describe('MomentumCalculator', () => {
  const page: CalculatorPage = {
    title: 'Momentum Calculator',
    description: 'Find momentum and kinetic energy from mass and velocity.',
    path: '/momentum-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MomentumCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Momentum Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Mass (kg)')).toBeDefined();
    expect(screen.getAllByText('Momentum').length).toBeGreaterThanOrEqual(1);
  });

  it('scales momentum with mass', () => {
    const { container } = renderCalculatorPage(<MomentumCalculator />, page);
    expect(heroValue(container)).toBe('50.00 kg·m/s');
    fireEvent.change(screen.getByLabelText('Mass (kg)'), { target: { value: '10' } });
    expect(heroValue(container)).toBe('100.00 kg·m/s');
  });
});

describe('FourierTransformCalculator', () => {
  const page: CalculatorPage = {
    title: 'Fourier Transform Calculator',
    description: 'Read amplitude, frequency and phase values of a sinusoid.',
    path: '/fourier-transform-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FourierTransformCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Fourier Transform Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Frequency (Hz)')).toBeDefined();
    expect(screen.getAllByText('RMS amplitude').length).toBeGreaterThanOrEqual(1);
  });

  it('raises RMS amplitude when amplitude rises', () => {
    const { container } = renderCalculatorPage(<FourierTransformCalculator />, page);
    expect(heroValue(container)).toBe(formatMoney(5 / Math.sqrt(2)));
    fireEvent.change(screen.getByLabelText('Amplitude'), { target: { value: '10' } });
    expect(heroValue(container)).toBe(formatMoney(10 / Math.sqrt(2)));
  });
});

describe('CallOptionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Call Option Calculator',
    description: 'Price a European call option with Black-Scholes.',
    path: '/call-option-calculator.html',
    category: 'trading',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CallOptionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Call Option Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Spot price ($)')).toBeDefined();
    expect(screen.getAllByText('Call option price').length).toBeGreaterThanOrEqual(1);
  });

  it('reprices the call when the spot price changes', () => {
    const { container } = renderCalculatorPage(<CallOptionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Spot price ($)'), { target: { value: '110' } });
    const expected = computeCallOption({
      spot: 110,
      strike: 100,
      timeToExpiry: 0.5,
      riskFreeRate: 5,
      volatility: 20,
    });
    expect(heroValue(container)).toBe(`${formatMoney(expected.price)} USD`);
  });
});
