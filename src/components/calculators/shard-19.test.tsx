import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import DividendCalculator from './DividendCalculator';
import MedianCalculator from './MedianCalculator';
import TitleInsuranceCalculator from './TitleInsuranceCalculator';
import CumulativeGPACalculator from './CumulativeGPACalculator';
import TermLifeInsuranceCalculator from './TermLifeInsuranceCalculator';
import PartialPressureCalculator from './PartialPressureCalculator';
import IQEstimateCalculator from './IQEstimateCalculator';

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

describe('DividendCalculator', () => {
  const page: CalculatorPage = {
    title: 'Dividend Calculator',
    description: 'Work out dividend yield and income from your shares.',
    path: '/dividend-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DividendCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Dividend Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Shares held')).toBeDefined();
    expect(screen.getAllByText('Dividend yield').length).toBeGreaterThan(0);
  });

  it('lowers the yield when the share price rises', () => {
    const { container } = renderCalculatorPage(<DividendCalculator />, page);
    expect(hero(container)).toBe('5.00%');
    fireEvent.change(screen.getByLabelText('Share price ($)'), { target: { value: '100' } });
    expect(hero(container)).toBe('2.50%');
  });
});

describe('MedianCalculator', () => {
  const page: CalculatorPage = {
    title: 'Median Calculator',
    description: 'Find the median of a list of numbers.',
    path: '/median-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MedianCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Median Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Values')).toBeDefined();
    expect(screen.getAllByText('Median').length).toBeGreaterThan(0);
  });

  it('recomputes the median for a new list of values', () => {
    const { container } = renderCalculatorPage(<MedianCalculator />, page);
    expect(hero(container)).toBe('12.00');
    fireEvent.change(screen.getByLabelText('Values'), { target: { value: '1, 2, 3' } });
    expect(hero(container)).toBe('2.00');
  });
});

describe('TitleInsuranceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Title Insurance Calculator',
    description: 'Estimate title insurance premiums for a home purchase.',
    path: '/title-insurance-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TitleInsuranceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Title Insurance Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Down payment ($)')).toBeDefined();
    expect(screen.getByText('Lender policy')).toBeDefined();
  });

  it('raises the premium when the purchase price rises', () => {
    const { container } = renderCalculatorPage(<TitleInsuranceCalculator />, page);
    expect(hero(container)).toBe('616.00');
    fireEvent.change(screen.getByLabelText('Purchase price ($)'), { target: { value: '400000' } });
    expect(hero(container)).toBe('726.00');
  });
});

describe('CumulativeGPACalculator', () => {
  const page: CalculatorPage = {
    title: 'Cumulative GPA Calculator',
    description: 'Update your cumulative GPA with a new semester.',
    path: '/cumulative-gpa-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CumulativeGPACalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cumulative GPA Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Cumulative quality points')).toBeDefined();
    expect(screen.getByText('New total credits')).toBeDefined();
  });

  it('recomputes the cumulative GPA when semester credits change', () => {
    const { container } = renderCalculatorPage(<CumulativeGPACalculator />, page);
    expect(hero(container)).toBe('3.93');
    fireEvent.change(screen.getByLabelText('New semester credits'), { target: { value: '30' } });
    expect(hero(container)).toBe('3.44');
  });
});

describe('TermLifeInsuranceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Term Life Insurance Calculator',
    description: 'Work out the term life cover your family needs.',
    path: '/term-life-insurance-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TermLifeInsuranceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Term Life Insurance Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Years dependents')).toBeDefined();
    expect(screen.getAllByText('Income replacement').length).toBeGreaterThan(0);
  });

  it('raises the cover needed when income rises', () => {
    const { container } = renderCalculatorPage(<TermLifeInsuranceCalculator />, page);
    expect(hero(container)).toBe('780,000.00');
    fireEvent.change(screen.getByLabelText('Annual income ($)'), { target: { value: '80000' } });
    expect(hero(container)).toBe('980,000.00');
  });
});

describe('PartialPressureCalculator', () => {
  const page: CalculatorPage = {
    title: 'Partial Pressure Calculator',
    description: "Apply Dalton's law to find a gas's partial pressure.",
    path: '/partial-pressure-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PartialPressureCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Partial Pressure Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Total pressure (atm)')).toBeDefined();
    expect(screen.getByText('Other gases')).toBeDefined();
  });

  it('scales the partial pressure with the mole fraction', () => {
    const { container } = renderCalculatorPage(<PartialPressureCalculator />, page);
    expect(hero(container)).toBe('0.21 atm');
    fireEvent.change(screen.getByLabelText('Mole fraction'), { target: { value: '0.5' } });
    expect(hero(container)).toBe('0.50 atm');
  });
});

describe('IQEstimateCalculator', () => {
  const page: CalculatorPage = {
    title: 'IQ Estimate Calculator',
    description: 'Convert a test score into an IQ-style estimate.',
    path: '/iq-estimate-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IQEstimateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'IQ Estimate Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Test std dev')).toBeDefined();
    expect(screen.getAllByText('z-score').length).toBeGreaterThan(0);
  });

  it('raises the estimated IQ when the test score rises', () => {
    const { container } = renderCalculatorPage(<IQEstimateCalculator />, page);
    expect(hero(container)).toBe('115.00');
    fireEvent.change(screen.getByLabelText('Test score'), { target: { value: '130' } });
    expect(hero(container)).toBe('130.00');
  });
});
