import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import GrowthCalculator from './GrowthCalculator';
import ExponentialDistributionCalculator from './ExponentialDistributionCalculator';
import CarpetCalculator from './CarpetCalculator';
import DriveTimeCalculator from './DriveTimeCalculator';
import SandCalculator from './SandCalculator';
import NetWorthCalculator from './NetWorthCalculator';
import ResistanceBandCalculator from './ResistanceBandCalculator';

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

describe('GrowthCalculator', () => {
  const page: CalculatorPage = {
    title: 'Growth Calculator',
    description: 'Measure total percentage growth and CAGR between values.',
    path: '/growth-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout and reacts to input changes', () => {
    const { container } = renderCalculatorPage(<GrowthCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Growth Calculator' })).toBeDefined();
    expect(screen.getByText('Initial value')).toBeDefined();
    expect(screen.getByText('CAGR')).toBeDefined();

    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Initial value'), { target: { value: '500' } });
    expect(container.querySelector('p.text-4xl')!.textContent).not.toBe(before);
  });
});

describe('ExponentialDistributionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Exponential Distribution Calculator',
    description: 'Compute PDF, CDF, mean and variance of an exponential distribution.',
    path: '/exponential-distribution-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout and reacts to input changes', () => {
    const { container } = renderCalculatorPage(<ExponentialDistributionCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Exponential Distribution Calculator' })
    ).toBeDefined();
    expect(screen.getByText('λ (rate)')).toBeDefined();
    expect(screen.getByText('Std dev')).toBeDefined();

    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('λ (rate)'), { target: { value: '1' } });
    expect(container.querySelector('p.text-4xl')!.textContent).not.toBe(before);
  });
});

describe('CarpetCalculator', () => {
  const page: CalculatorPage = {
    title: 'Carpet Calculator',
    description: 'Estimate carpet rolls, waste allowance and total material cost.',
    path: '/carpet-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout and reacts to input changes', () => {
    const { container } = renderCalculatorPage(<CarpetCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Carpet Calculator' })).toBeDefined();
    expect(screen.getByText('Room area (m²)')).toBeDefined();
    expect(screen.getByText('Carpet cost')).toBeDefined();

    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Room area (m²)'), { target: { value: '200' } });
    expect(container.querySelector('p.text-4xl')!.textContent).not.toBe(before);
  });
});

describe('DriveTimeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Drive Time Calculator',
    description: 'Estimate door-to-door travel time from distance, speed and breaks.',
    path: '/drive-time-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout and reacts to input changes', () => {
    const { container } = renderCalculatorPage(<DriveTimeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Drive Time Calculator' })).toBeDefined();
    expect(screen.getByText('Distance (km)')).toBeDefined();
    expect(screen.getByText('Total drive time')).toBeDefined();

    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Distance (km)'), { target: { value: '150' } });
    expect(container.querySelector('p.text-4xl')!.textContent).not.toBe(before);
  });
});

describe('SandCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sand Calculator',
    description: 'Calculate sand mass, volume, tonnage and bag count for a project.',
    path: '/sand-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout and reacts to input changes', () => {
    const { container } = renderCalculatorPage(<SandCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sand Calculator' })).toBeDefined();
    expect(screen.getByText('Density (kg/m³)')).toBeDefined();
    expect(screen.getByText('25 kg bags')).toBeDefined();

    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Area (m²)'), { target: { value: '20' } });
    expect(container.querySelector('p.text-4xl')!.textContent).not.toBe(before);
  });
});

describe('NetWorthCalculator', () => {
  const page: CalculatorPage = {
    title: 'Net Worth Calculator',
    description: 'Find net worth, cash flow and savings rate from assets and income.',
    path: '/net-worth-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout and reacts to input changes', () => {
    const { container } = renderCalculatorPage(<NetWorthCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Net Worth Calculator' })).toBeDefined();
    expect(screen.getByText('Total assets ($)')).toBeDefined();
    expect(screen.getByText('Net worth')).toBeDefined();

    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Total assets ($)'), { target: { value: '500000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).not.toBe(before);
  });
});

describe('ResistanceBandCalculator', () => {
  const page: CalculatorPage = {
    title: 'Resistance Band Calculator',
    description: 'Estimate band force in lbs and kg from stretch and per-inch resistance.',
    path: '/resistance-band-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout and reacts to input changes', () => {
    const { container } = renderCalculatorPage(<ResistanceBandCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Resistance Band Calculator' })).toBeDefined();
    expect(screen.getByText('Free band length (in)')).toBeDefined();
    expect(screen.getByText('Band resistance')).toBeDefined();

    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Stretched length (in)'), { target: { value: '30' } });
    expect(container.querySelector('p.text-4xl')!.textContent).not.toBe(before);
  });
});
