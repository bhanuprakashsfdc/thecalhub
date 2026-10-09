import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import ProportionCalculator from './ProportionCalculator';
import PowerConverterCalculator from './PowerConverterCalculator';
import PeRatioCalculator from './PeRatioCalculator';
import NetworkSpeedCalculator from './NetworkSpeedCalculator';
import MomentOfInertiaCalculator from './MomentOfInertiaCalculator';
import UUIDGeneratorCalculator from './UUIDGeneratorCalculator';
import TideCalculator from './TideCalculator';

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

const heroText = (container: HTMLElement) => container.querySelector('p.text-4xl')?.textContent ?? '';

describe('ProportionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Proportion Calculator',
    description: 'Find the percentage, ratio and scaled whole from a part and whole value.',
    path: '/proportion-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<ProportionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Proportion Calculator' })).toBeDefined();
    expect(screen.getAllByText('Target part').length).toBeGreaterThanOrEqual(1);
    expect(heroText(container)).toBe('25.00%');
  });

  it('recalculates the percentage when the part changes', () => {
    const { container } = renderCalculatorPage(<ProportionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Part'), { target: { value: '50' } });
    expect(heroText(container)).toBe('50.00%');
  });
});

describe('PowerConverterCalculator', () => {
  const page: CalculatorPage = {
    title: 'Power Converter Calculator',
    description: 'Convert watts into kilowatts, horsepower and BTU per hour.',
    path: '/power-converter-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<PowerConverterCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Power Converter Calculator' })).toBeDefined();
    expect(screen.getAllByText('Power (W)').length).toBeGreaterThanOrEqual(1);
    expect(heroText(container)).toBe('1.50 kW');
  });

  it('converts the watts entered', () => {
    const { container } = renderCalculatorPage(<PowerConverterCalculator />, page);
    fireEvent.change(screen.getByLabelText('Power (W)'), { target: { value: '1000' } });
    expect(heroText(container)).toBe('1.00 kW');
  });
});

describe('PeRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'P/E Ratio Calculator',
    description: 'Calculate price-to-earnings ratio and earnings yield from price and EPS.',
    path: '/p-e-ratio-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<PeRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'P/E Ratio Calculator' })).toBeDefined();
    expect(screen.getAllByText('Earnings per share').length).toBeGreaterThanOrEqual(1);
    expect(heroText(container)).toBe('25.00x');
  });

  it('raises the ratio when the share price rises', () => {
    const { container } = renderCalculatorPage(<PeRatioCalculator />, page);
    fireEvent.change(screen.getByLabelText('Share price ($)'), { target: { value: '300' } });
    expect(heroText(container)).toBe('50.00x');
  });
});

describe('NetworkSpeedCalculator', () => {
  const page: CalculatorPage = {
    title: 'Network Speed Calculator',
    description: 'Estimate transfer speeds in Mbps and Gbps from bytes and time.',
    path: '/network-speed-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<NetworkSpeedCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Network Speed Calculator' })).toBeDefined();
    expect(screen.getAllByText('Bytes transferred').length).toBeGreaterThanOrEqual(1);
    expect(heroText(container)).toBe('98.00 Mbps');
  });

  it('halves the speed when the transfer takes twice as long', () => {
    const { container } = renderCalculatorPage(<NetworkSpeedCalculator />, page);
    fireEvent.change(screen.getByLabelText('Time (seconds)'), { target: { value: '20' } });
    expect(heroText(container)).toBe('49.00 Mbps');
  });
});

describe('MomentOfInertiaCalculator', () => {
  const page: CalculatorPage = {
    title: 'Moment of Inertia Calculator',
    description: 'Compute moment of inertia for common shapes from mass and dimensions.',
    path: '/moment-of-inertia-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<MomentOfInertiaCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Moment of Inertia Calculator' })).toBeDefined();
    expect(screen.getAllByText('Mass (kg)').length).toBeGreaterThanOrEqual(1);
    expect(heroText(container)).toBe('0.07 kg·m²');
  });

  it('scales the inertia with mass', () => {
    const { container } = renderCalculatorPage(<MomentOfInertiaCalculator />, page);
    fireEvent.change(screen.getByLabelText('Mass (kg)'), { target: { value: '20' } });
    expect(heroText(container)).toBe('0.72 kg·m²');
  });
});

describe('UUIDGeneratorCalculator', () => {
  const page: CalculatorPage = {
    title: 'UUID Generator Calculator',
    description: 'Generate random UUID identifiers for testing and debugging.',
    path: '/uuid-generator-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<UUIDGeneratorCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'UUID Generator Calculator' })).toBeDefined();
    expect(screen.getAllByText('Generated UUIDs').length).toBeGreaterThanOrEqual(1);
    expect(heroText(container)).toBe('1');
  });

  it('generates the requested number of UUIDs', () => {
    const { container } = renderCalculatorPage(<UUIDGeneratorCalculator />, page);
    fireEvent.change(screen.getByLabelText('How many'), { target: { value: '3' } });
    expect(heroText(container)).toBe('3');
    expect(screen.getAllByText('UUID 3').length).toBeGreaterThanOrEqual(1);
  });
});

describe('TideCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tide Calculator',
    description: 'Estimate current tide height, trend and the next high tide.',
    path: '/tide-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<TideCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tide Calculator' })).toBeDefined();
    expect(screen.getAllByText('High tide height (m)').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Tide trend').length).toBeGreaterThanOrEqual(1);
    expect(heroText(container)).toMatch(/^\d+\.\d{2} m$/);
  });

  it('shows the mean height at high tide hour', () => {
    const { container } = renderCalculatorPage(<TideCalculator />, page);
    fireEvent.change(screen.getByLabelText('Current hour (24h)'), { target: { value: '14' } });
    expect(heroText(container)).toBe('1.50 m');
  });
});
