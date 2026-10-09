import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import FatCalculator from './FatCalculator';
import BoxPlotCalculator from './BoxPlotCalculator';
import MortgageRefinanceCalculator from './MortgageRefinanceCalculator';
import TestScoreCalculator from './TestScoreCalculator';
import LiabilityInsuranceCalculator from './LiabilityInsuranceCalculator';
import MenuPricingCalculator from './MenuPricingCalculator';
import MarginOfErrorSocialCalculator from './MarginOfErrorSocialCalculator';

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

describe('FatCalculator', () => {
  const page: CalculatorPage = {
    title: 'Fat Calculator',
    description: 'Estimate fat mass, lean mass and the calorie split between them.',
    path: '/fat-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FatCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Fat Calculator' })).toBeDefined();
    expect(screen.getByText('Total weight (kg)')).toBeDefined();
    expect(screen.getByText('Fat mass')).toBeDefined();
  });

  it('recomputes fat mass when total weight changes', () => {
    const { container } = renderCalculatorPage(<FatCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;
    expect(hero()).toBe('14.00 kg');
    fireEvent.change(screen.getByLabelText('Total weight (kg)'), { target: { value: '100' } });
    expect(hero()).toBe('20.00 kg');
  });
});

describe('BoxPlotCalculator', () => {
  const page: CalculatorPage = {
    title: 'Box Plot Calculator',
    description: 'Build a box plot summary with quartiles, fences and whiskers.',
    path: '/box-plot-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BoxPlotCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Box Plot Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Median (Q2)')).toBeDefined();
    expect(screen.getByText('IQR')).toBeDefined();
  });

  it('widens the IQR when Q3 rises', () => {
    const { container } = renderCalculatorPage(<BoxPlotCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;
    expect(hero()).toBe('50.00');
    fireEvent.change(screen.getByLabelText('Q3'), { target: { value: '100' } });
    expect(hero()).toBe('75.00');
  });
});

describe('MortgageRefinanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mortgage Refinance Calculator',
    description: 'Compare monthly payments before and after refinancing a mortgage.',
    path: '/mortgage-refinance-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MortgageRefinanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mortgage Refinance Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Current balance ($)')).toBeDefined();
    expect(screen.getByText('Monthly saving')).toBeDefined();
    expect(screen.getByText('Break-even (months)')).toBeDefined();
  });

  it('changes the monthly saving when the new rate changes', () => {
    const { container } = renderCalculatorPage(<MortgageRefinanceCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;
    const before = hero();
    fireEvent.change(screen.getByLabelText('New rate (%)'), { target: { value: '8' } });
    expect(hero()).not.toBe(before);
  });
});

describe('TestScoreCalculator', () => {
  const page: CalculatorPage = {
    title: 'Test Score Calculator',
    description: 'Turn correct and total answers into a percentage with a wrong-answer penalty.',
    path: '/test-score-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TestScoreCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Test Score Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Correct answers')).toBeDefined();
    expect(screen.getByText('Scaled score')).toBeDefined();
    expect(screen.getByText('Raw score')).toBeDefined();
  });

  it('scores a perfect paper when all answers are correct', () => {
    const { container } = renderCalculatorPage(<TestScoreCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;
    expect(hero()).toBe('87.50%');
    fireEvent.change(screen.getByLabelText('Correct answers'), { target: { value: '20' } });
    expect(hero()).toBe('100.00%');
  });
});

describe('LiabilityInsuranceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Liability Insurance Calculator',
    description: 'Estimate liability cover from income and a multiplier, minus existing cover.',
    path: '/liability-insurance-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LiabilityInsuranceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Liability Insurance Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Annual income ($)')).toBeDefined();
    expect(screen.getByText('Recommended coverage')).toBeDefined();
    expect(screen.getByText('Coverage gap')).toBeDefined();
  });

  it('raises recommended coverage when income rises', () => {
    const { container } = renderCalculatorPage(<LiabilityInsuranceCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;
    expect(hero()).toBe('250,000.00');
    fireEvent.change(screen.getByLabelText('Annual income ($)'), { target: { value: '100000' } });
    expect(hero()).toBe('500,000.00');
  });
});

describe('MenuPricingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Menu Pricing Calculator',
    description: 'Set a profitable menu price from food cost, waste and desired margin.',
    path: '/menu-pricing-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MenuPricingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Menu Pricing Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Food cost per plate ($)')).toBeDefined();
    expect(screen.getByText('Menu price per cover')).toBeDefined();
    expect(screen.getByText('Gross profit')).toBeDefined();
  });

  it('raises the menu price when food cost rises', () => {
    const { container } = renderCalculatorPage(<MenuPricingCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;
    expect(hero()).toBe('16.50');
    fireEvent.change(screen.getByLabelText('Food cost per plate ($)'), { target: { value: '5' } });
    expect(hero()).toBe('18.33');
  });
});

describe('MarginOfErrorSocialCalculator', () => {
  const page: CalculatorPage = {
    title: 'Margin of Error Social Calculator',
    description: 'Find the margin of error for a survey proportion at a chosen confidence level.',
    path: '/margin-of-error-social-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MarginOfErrorSocialCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Margin of Error Social Calculator' })
    ).toBeDefined();
    expect(screen.getByLabelText('Sample size')).toBeDefined();
    expect(screen.getByText('Margin of error')).toBeDefined();
    expect(screen.getByText('Confidence interval')).toBeDefined();
  });

  it('narrows the margin when confidence drops to 90%', () => {
    const { container } = renderCalculatorPage(<MarginOfErrorSocialCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;
    expect(hero()).toBe('4.90%');
    fireEvent.click(screen.getByRole('radio', { name: '90%' }));
    expect(hero()).toBe('4.11%');
  });
});
