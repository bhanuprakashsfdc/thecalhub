import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import MetabolicAgeCalculator from './MetabolicAgeCalculator';
import VolumeConverterCalculator from './VolumeConverterCalculator';
import ROECalculator from './ROECalculator';
import LuggageWeightCalculator from './LuggageWeightCalculator';
import HVACCalculator from './HVACCalculator';
import CreditCardInterestCalculator from './CreditCardInterestCalculator';
import ClimbRateCalculator from './ClimbRateCalculator';

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

const hero = (container: HTMLElement) => container.querySelector('p.text-4xl')!.textContent;

describe('MetabolicAgeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Metabolic Age Calculator',
    description: 'Estimate metabolic age from heart rate, VO2 max and activity level.',
    path: '/metabolic-age-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MetabolicAgeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Metabolic Age Calculator' })).toBeDefined();
    expect(screen.getByText('Chronological age')).toBeDefined();
    expect(screen.getByText('Metabolic age')).toBeDefined();
  });

  it('raises metabolic age when chronological age rises', () => {
    const { container } = renderCalculatorPage(<MetabolicAgeCalculator />, page);
    const before = hero(container);
    fireEvent.change(screen.getByLabelText('Chronological age'), { target: { value: '50' } });
    const after = hero(container);
    expect(after).not.toBe(before);
    expect(after).toBe('53.00');
  });
});

describe('VolumeConverterCalculator', () => {
  const page: CalculatorPage = {
    title: 'Volume Converter Calculator',
    description: 'Convert between metric and imperial volume units.',
    path: '/volume-converter-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<VolumeConverterCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Volume Converter Calculator' })).toBeDefined();
    expect(screen.getByText('Volume')).toBeDefined();
    expect(screen.getByText('Converted volume')).toBeDefined();
  });

  it('doubles the converted volume when the input doubles', () => {
    const { container } = renderCalculatorPage(<VolumeConverterCalculator />, page);
    const before = hero(container);
    fireEvent.change(screen.getByLabelText('Volume'), { target: { value: '2' } });
    const after = hero(container);
    expect(after).not.toBe(before);
    expect(after).toBe('7.57');
  });
});

describe('ROECalculator', () => {
  const page: CalculatorPage = {
    title: 'ROE Calculator',
    description: 'Calculate return on equity with DuPont decomposition.',
    path: '/roe-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ROECalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'ROE Calculator' })).toBeDefined();
    expect(screen.getByText("Shareholders' equity ($)")).toBeDefined();
    expect(screen.getByText('Equity multiplier')).toBeDefined();
  });

  it('raises ROE when shareholders equity falls', () => {
    const { container } = renderCalculatorPage(<ROECalculator />, page);
    const before = hero(container);
    expect(before).toBe('20.00%');
    fireEvent.change(screen.getByLabelText("Shareholders' equity ($)"), { target: { value: '300000' } });
    const after = hero(container);
    expect(after).not.toBe(before);
    expect(after).toBe('40.00%');
  });
});

describe('LuggageWeightCalculator', () => {
  const page: CalculatorPage = {
    title: 'Luggage Weight Calculator',
    description: 'Estimate airline overweight baggage fees.',
    path: '/luggage-weight-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LuggageWeightCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Luggage Weight Calculator' })).toBeDefined();
    expect(screen.getByText('Free allowance (kg)')).toBeDefined();
    expect(screen.getByText('Overweight fee')).toBeDefined();
  });

  it('charges a fee once the bag exceeds the allowance', () => {
    const { container } = renderCalculatorPage(<LuggageWeightCalculator />, page);
    expect(hero(container)).toBe('0.00');
    fireEvent.change(screen.getByLabelText('Weight per bag (kg)'), { target: { value: '30' } });
    expect(hero(container)).toBe('35.00');
  });
});

describe('HVACCalculator', () => {
  const page: CalculatorPage = {
    title: 'HVAC Calculator',
    description: 'Size a cooling load from room volume and air changes.',
    path: '/hvac-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HVACCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'HVAC Calculator' })).toBeDefined();
    expect(screen.getByText('Air changes per hour')).toBeDefined();
    expect(screen.getByText('Cooling load')).toBeDefined();
  });

  it('doubles the cooling load when room volume doubles', () => {
    const { container } = renderCalculatorPage(<HVACCalculator />, page);
    const before = hero(container);
    expect(before).toBe('24,000.00 BTU/h');
    fireEvent.change(screen.getByLabelText('Room volume (m³)'), { target: { value: '400' } });
    expect(hero(container)).toBe('48,000.00 BTU/h');
  });
});

describe('CreditCardInterestCalculator', () => {
  const page: CalculatorPage = {
    title: 'Credit Card Interest Calculator',
    description: 'Project interest cost on a credit card balance.',
    path: '/credit-card-interest-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CreditCardInterestCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Credit Card Interest Calculator' })).toBeDefined();
    expect(screen.getByText('APR (%)')).toBeDefined();
    expect(screen.getByText('Total interest paid')).toBeDefined();
  });

  it('lowers total interest when the monthly payment rises', () => {
    const { container } = renderCalculatorPage(<CreditCardInterestCalculator />, page);
    const before = hero(container);
    expect(before).toBe('821.91');
    fireEvent.change(screen.getByLabelText('Monthly payment ($)'), { target: { value: '300' } });
    const after = hero(container);
    expect(after).not.toBe(before);
    expect(after).toBe('665.73');
  });
});

describe('ClimbRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'climb Rate Calculator',
    description: 'Estimate rate of climb from thrust, drag, weight and speed.',
    path: '/climb-rate-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ClimbRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'climb Rate Calculator' })).toBeDefined();
    expect(screen.getByText('Thrust (N)')).toBeDefined();
    expect(screen.getByText('Rate of climb')).toBeDefined();
  });

  it('raises the climb rate when thrust increases', () => {
    const { container } = renderCalculatorPage(<ClimbRateCalculator />, page);
    const before = hero(container);
    expect(before).toBe('34.29 m/s');
    fireEvent.change(screen.getByLabelText('Thrust (N)'), { target: { value: '60000' } });
    const after = hero(container);
    expect(after).not.toBe(before);
    expect(after).toBe('45.71 m/s');
  });

  it('stays numeric when weight is zero', () => {
    const { container } = renderCalculatorPage(<ClimbRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Weight (N)'), { target: { value: '0' } });
    const value = hero(container)!;
    expect(value).not.toContain('NaN');
    expect(value).not.toContain('Infinity');
  });
});
