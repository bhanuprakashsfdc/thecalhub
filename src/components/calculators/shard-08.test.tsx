import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import SmithChartCalculator, { computeSmithChart } from './SmithChartCalculator';

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

const page: CalculatorPage = {
  title: 'Smith Chart Calculator',
  description: 'Calculate reflection coefficient, VSWR and return loss from a load impedance.',
  path: '/smith-chart-calculator.html',
  category: 'scientific',
};

const hero = (container: HTMLElement) => container.querySelector('p.text-4xl')!.textContent;
const row = (label: string) => screen.getByText(label).nextElementSibling!.textContent;

describe('SmithChartCalculator', () => {
  it('renders the heading and input labels', () => {
    renderCalculatorPage(<SmithChartCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Smith Chart Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Characteristic impedance (ohm)')).toBeDefined();
    expect(screen.getByLabelText('Load resistance (ohm)')).toBeDefined();
    expect(screen.getByLabelText('Load reactance (ohm)')).toBeDefined();
    expect(screen.getByText('VSWR')).toBeDefined();
    expect(screen.getByText('Return loss (dB)')).toBeDefined();
    expect(screen.getByText('Impedance magnitude')).toBeDefined();
  });

  it('computes gamma, VSWR and return loss for known loads', () => {
    const matched = computeSmithChart({ impedance: 50, resistance: 50, reactance: 0 });
    expect(matched.gamma).toBe(0);
    expect(matched.vswr).toBe(1);
    expect(matched.returnLoss).toBe(Infinity);
    expect(matched.magnitude).toBe(50);

    const mismatch = computeSmithChart({ impedance: 50, resistance: 75, reactance: 0 });
    expect(mismatch.gamma).toBeCloseTo(0.2, 10);
    expect(mismatch.vswr).toBeCloseTo(1.5, 10);
    expect(mismatch.returnLoss).toBeCloseTo(-20 * Math.log10(0.2), 10);
    expect(mismatch.magnitude).toBe(75);

    const complex = computeSmithChart({ impedance: 50, resistance: 50, reactance: 50 });
    expect(complex.gamma).toBeCloseTo(50 / Math.hypot(100, 50), 10);
    expect(complex.vswr).toBeGreaterThan(1);

    const zeroZ0 = computeSmithChart({ impedance: 0, resistance: 0, reactance: 0 });
    expect(Number.isNaN(zeroZ0.gamma)).toBe(false);
    expect(zeroZ0.gamma).toBe(1);
    expect(zeroZ0.vswr).toBe(Infinity);
    expect(zeroZ0.returnLoss).toBe(0);
    expect(zeroZ0.magnitude).toBe(0);

    const open = computeSmithChart({ impedance: 50, resistance: Infinity, reactance: 0 });
    expect(open.gamma).toBe(1);
    expect(open.vswr).toBe(Infinity);
    expect(open.returnLoss).toBe(0);
    expect(open.magnitude).toBe(Infinity);

    const invalid = computeSmithChart({
      impedance: Number.NaN,
      resistance: Number.NaN,
      reactance: Number.NaN,
    });
    expect(Number.isNaN(invalid.gamma)).toBe(false);
    expect(Number.isNaN(invalid.vswr)).toBe(false);
    expect(Number.isNaN(invalid.returnLoss)).toBe(false);
    expect(Number.isNaN(invalid.magnitude)).toBe(false);
  });

  it('recomputes the displayed result when an input changes', () => {
    const { container } = renderCalculatorPage(<SmithChartCalculator />, page);
    expect(hero(container)).toBe('1.50');
    expect(row('Impedance magnitude')).toBe('75.00 ohm');
    expect(screen.getByText('Reflection coefficient 0.20')).toBeDefined();

    fireEvent.change(screen.getByLabelText('Load resistance (ohm)'), { target: { value: '50' } });
    expect(hero(container)).toBe('1.00');
    expect(screen.getByText('Reflection coefficient 0.00')).toBeDefined();
    expect(row('Return loss (dB)')).toBe('∞ dB');
    expect(row('Impedance magnitude')).toBe('50.00 ohm');

    fireEvent.change(screen.getByLabelText('Load reactance (ohm)'), { target: { value: '50' } });
    const complex = computeSmithChart({ impedance: 50, resistance: 50, reactance: 50 });
    expect(hero(container)).toBe(complex.vswr.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    expect(Number.isNaN(complex.gamma)).toBe(false);
  });

  it('never renders NaN for short circuit, open circuit or a cleared impedance', () => {
    const { container } = renderCalculatorPage(<SmithChartCalculator />, page);

    fireEvent.change(screen.getByLabelText('Load resistance (ohm)'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('Load reactance (ohm)'), { target: { value: '0' } });
    expect(container.textContent).not.toContain('NaN');
    expect(hero(container)).toBe('∞');
    expect(row('Return loss (dB)')).toBe('0.00 dB');
    expect(row('Impedance magnitude')).toBe('0.00 ohm');

    fireEvent.change(screen.getByLabelText('Load resistance (ohm)'), { target: { value: '1e999' } });
    expect(container.textContent).not.toContain('NaN');
    expect(hero(container)).toBe('∞');

    fireEvent.change(screen.getByLabelText('Load reactance (ohm)'), { target: { value: '1e999' } });
    expect(container.textContent).not.toContain('NaN');
    expect(hero(container)).toBe('∞');

    fireEvent.change(screen.getByLabelText('Characteristic impedance (ohm)'), { target: { value: '' } });
    expect(container.textContent).not.toContain('NaN');
    expect(hero(container)).toBe('∞');
  });
});
