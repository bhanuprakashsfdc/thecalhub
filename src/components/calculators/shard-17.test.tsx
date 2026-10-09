import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import MonthlyPaymentCalculator from './MonthlyPaymentCalculator';
import EquationSolver from './EquationSolver';
import PastDateCalculator from './PastDateCalculator';
import ReturnOnAdSpendCalculator from './ReturnOnAdSpendCalculator';
import CarDepreciationCalculator from './CarDepreciationCalculator';
import MolecularWeightCalculator from './MolecularWeightCalculator';
import DrugClearanceCalculator from './DrugClearanceCalculator';

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

describe('MonthlyPaymentCalculator', () => {
  const page: CalculatorPage = {
    title: 'Monthly Payment Calculator',
    description: 'Calculate the fixed monthly payment on any loan.',
    path: '/monthly-payment-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MonthlyPaymentCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Monthly Payment Calculator' })).toBeDefined();
    expect(screen.getByText('Principal ($)')).toBeDefined();
    expect(screen.getByText('Monthly payment')).toBeDefined();
  });

  it('recalculates when the principal changes', () => {
    renderCalculatorPage(<MonthlyPaymentCalculator />, page);
    fireEvent.change(screen.getByLabelText('Principal ($)'), { target: { value: '100000' } });
    expect(screen.getByText('Total interest')).toBeDefined();
    expect(screen.getByText('Total paid')).toBeDefined();
  });
});

describe('EquationSolver', () => {
  const page: CalculatorPage = {
    title: 'Equation Solver Calculator',
    description: 'Solve linear and quadratic equations.',
    path: '/equation-solver-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EquationSolver />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Equation Solver Calculator' })).toBeDefined();
    expect(screen.getByText('Solve Equation')).toBeDefined();
    expect(screen.getByText('Equation (ax² + bx + c = 0)')).toBeDefined();
  });

  it('solves a typed quadratic equation', () => {
    renderCalculatorPage(<EquationSolver />, page);
    fireEvent.change(screen.getByPlaceholderText('x^2 + 5*x + 6 = 0'), {
      target: { value: 'x^2+5x+6=0' },
    });
    fireEvent.click(screen.getByText('Solve Equation'));
    expect(screen.getByText('Two Real Roots')).toBeDefined();
  });
});

describe('PastDateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Past Date Calculator',
    description: 'Find a past date by subtracting days from a start date.',
    path: '/past-date-calculator.html',
    category: 'dateTime',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PastDateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Past Date Calculator' })).toBeDefined();
    expect(screen.getByText('Days back')).toBeDefined();
    expect(screen.getByText('Past date')).toBeDefined();
  });

  it('returns the start date when zero days back', () => {
    renderCalculatorPage(<PastDateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Days back'), { target: { value: '0' } });
    expect(screen.getByText('2026-10-09')).toBeDefined();
  });
});

describe('ReturnOnAdSpendCalculator', () => {
  const page: CalculatorPage = {
    title: 'Return on Ad Spend Calculator',
    description: 'Compute return on ad spend and paid-media metrics.',
    path: '/return-on-ad-spend-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ReturnOnAdSpendCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Return on Ad Spend Calculator' })).toBeDefined();
    expect(screen.getByText('Ad spend ($)')).toBeDefined();
    expect(screen.getByText('ROAS')).toBeDefined();
  });

  it('raises ROAS when revenue rises', () => {
    renderCalculatorPage(<ReturnOnAdSpendCalculator />, page);
    fireEvent.change(screen.getByLabelText('Revenue from ads ($)'), { target: { value: '25000' } });
    expect(screen.getByText('500.00%')).toBeDefined();
  });
});

describe('CarDepreciationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Car Depreciation Calculator',
    description: "Estimate a car's resale value over time.",
    path: '/car-depreciation-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CarDepreciationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Car Depreciation Calculator' })).toBeDefined();
    expect(screen.getByText('Age of car (years)')).toBeDefined();
    expect(screen.getByText('Actual value today')).toBeDefined();
  });

  it('recalculates when the car age changes', () => {
    renderCalculatorPage(<CarDepreciationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Age of car (years)'), { target: { value: '0' } });
    expect(screen.getByText('Value remaining')).toBeDefined();
  });
});

describe('MolecularWeightCalculator', () => {
  const page: CalculatorPage = {
    title: 'Molecular Weight Calculator',
    description: 'Compute molecular weight from a chemical formula.',
    path: '/molecular-weight-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MolecularWeightCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Molecular Weight Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Chemical formula')).toBeDefined();
    expect(screen.getByText('Molecular weight')).toBeDefined();
  });

  it('parses O2 to 32.00 g/mol', () => {
    renderCalculatorPage(<MolecularWeightCalculator />, page);
    fireEvent.change(screen.getByLabelText('Chemical formula'), { target: { value: 'O2' } });
    expect(screen.getByText('32.00 g/mol')).toBeDefined();
  });
});

describe('DrugClearanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Drug Clearance Calculator',
    description: 'Estimate drug clearance and steady-state metrics.',
    path: '/drug-clearance-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DrugClearanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Drug Clearance Calculator' })).toBeDefined();
    expect(screen.getByText('Dose (mg)')).toBeDefined();
    expect(screen.getByText('Drug clearance')).toBeDefined();
  });

  it('raises steady-state concentration when the dose doubles', () => {
    renderCalculatorPage(<DrugClearanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Dose (mg)'), { target: { value: '1000' } });
    expect(screen.getByText('25.00 mg/L')).toBeDefined();
  });
});
