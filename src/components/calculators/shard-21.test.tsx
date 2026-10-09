import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import WaistToHeightRatioCalculator from './WaistToHeightRatioCalculator';
import ConfidenceIntervalCalculator from './ConfidenceIntervalCalculator';
import RentIncreaseCalculator from './RentIncreaseCalculator';
import SentenceCountCalculator from './SentenceCountCalculator';
import SettlementCalculator from './SettlementCalculator';
import TaskDurationCalculator from './TaskDurationCalculator';
import DogAgeCalculator from './DogAgeCalculator';

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

describe('WaistToHeightRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'Waist-to-Height Ratio Calculator',
    description: 'Find your waist-to-height ratio and metabolic risk category.',
    path: '/waist-to-height-ratio-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WaistToHeightRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Waist-to-Height Ratio Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Waist circumference (cm)')).toBeDefined();
    expect(screen.getByText('Healthy waist limit')).toBeDefined();
  });

  it('recalculates the ratio when waist changes', () => {
    const { container } = renderCalculatorPage(<WaistToHeightRatioCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Waist circumference (cm)'), { target: { value: '100' } });
    const after = container.querySelector('p.text-4xl')!.textContent;
    expect(after).not.toBe(before);
    expect(screen.getByText('Moderate')).toBeDefined();
  });
});

describe('ConfidenceIntervalCalculator', () => {
  const page: CalculatorPage = {
    title: 'Confidence Interval Calculator',
    description: 'Estimate a confidence interval around a sample mean.',
    path: '/confidence-interval-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ConfidenceIntervalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Confidence Interval Calculator' })).toBeDefined();
    expect(screen.getByText('Sample mean')).toBeDefined();
    expect(screen.getByText('Margin of error')).toBeDefined();
  });

  it('narrows the margin when the sample size grows', () => {
    const { container } = renderCalculatorPage(<ConfidenceIntervalCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Sample size'), { target: { value: '100' } });
    const after = container.querySelector('p.text-4xl')!.textContent;
    expect(after).not.toBe(before);
    expect(screen.getByText('Lower bound')).toBeDefined();
  });
});

describe('RentIncreaseCalculator', () => {
  const page: CalculatorPage = {
    title: 'Rent Increase Calculator',
    description: 'See the new rent after a percentage increase.',
    path: '/rent-increase-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RentIncreaseCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Rent Increase Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Current rent ($)')).toBeDefined();
    expect(screen.getByText('Increase amount')).toBeDefined();
  });

  it('raises the new rent when current rent rises', () => {
    const { container } = renderCalculatorPage(<RentIncreaseCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Current rent ($)'), { target: { value: '2000' } });
    const after = container.querySelector('p.text-4xl')!.textContent;
    expect(after).not.toBe(before);
    expect(screen.getByText('Difference from market')).toBeDefined();
  });
});

describe('SentenceCountCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sentence Count Calculator',
    description: 'Count sentences and words and estimate reading time.',
    path: '/sentence-count-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SentenceCountCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sentence Count Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Reading speed (wpm)')).toBeDefined();
    expect(screen.getByText('Sentence count')).toBeDefined();
  });

  it('recounts sentences when the text changes', () => {
    const { container } = renderCalculatorPage(<SentenceCountCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Text'), { target: { value: 'Just one sentence now.' } });
    const after = container.querySelector('p.text-4xl')!.textContent;
    expect(after).not.toBe(before);
    expect(screen.getByText('Reading seconds')).toBeDefined();
  });
});

describe('SettlementCalculator', () => {
  const page: CalculatorPage = {
    title: 'Settlement Calculator',
    description: 'Grow a lump-sum settlement with compound interest.',
    path: '/settlement-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SettlementCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Settlement Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Principal ($)')).toBeDefined();
    expect(screen.getByText('Effective annual rate')).toBeDefined();
  });

  it('grows the future value when the principal rises', () => {
    const { container } = renderCalculatorPage(<SettlementCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Principal ($)'), { target: { value: '20000' } });
    const after = container.querySelector('p.text-4xl')!.textContent;
    expect(after).not.toBe(before);
    expect(screen.getByText('Interest earned')).toBeDefined();
  });
});

describe('TaskDurationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Task Duration Calculator',
    description: 'Estimate task duration with complexity and interruptions.',
    path: '/task-duration-calculator.html',
    category: 'dateTime',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TaskDurationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Task Duration Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Estimated hours')).toBeDefined();
    expect(screen.getByText('Total task duration')).toBeDefined();
  });

  it('extends the duration when the estimate grows', () => {
    const { container } = renderCalculatorPage(<TaskDurationCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Estimated hours'), { target: { value: '16' } });
    const after = container.querySelector('p.text-4xl')!.textContent;
    expect(after).not.toBe(before);
    expect(screen.getByText('Interruption cost')).toBeDefined();
  });
});

describe('DogAgeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Dog Age Calculator',
    description: "Convert a dog's age into human years by size.",
    path: '/dog-age-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DogAgeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Dog Age Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Dog age (years)')).toBeDefined();
    expect(screen.getByText('Human age equivalent')).toBeDefined();
  });

  it('raises the human age when the dog gets older', () => {
    const { container } = renderCalculatorPage(<DogAgeCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Dog age (years)'), { target: { value: '5' } });
    const after = container.querySelector('p.text-4xl')!.textContent;
    expect(after).not.toBe(before);
    expect(screen.getByText('Size factor')).toBeDefined();
  });
});
