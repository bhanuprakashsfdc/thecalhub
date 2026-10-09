import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import VSWRCalculator, { computeVSWR } from './VSWRCalculator';

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
  title: 'VSWR Calculator',
  description: 'Convert between VSWR, reflection coefficient, return loss and mismatch loss.',
  path: '/vswr-calculator.html',
  category: 'scientific',
};

const num = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const hero = () => document.querySelector('p.text-4xl')!.textContent;

/** Result rows use <p> labels; input labels are <span>, so pick the row. */
const row = (label: string) => {
  const labelEl = screen.getAllByText(label).find((el) => el.tagName === 'P');
  return labelEl!.nextElementSibling!.textContent;
};

describe('VSWRCalculator', () => {
  it('renders through CalculatorPageLayout with its inputs', () => {
    renderCalculatorPage(<VSWRCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'VSWR Calculator' })).toBeDefined();
    expect(screen.getByLabelText('VSWR')).toBeDefined();
    expect(screen.getByLabelText('System impedance (ohm)')).toBeDefined();
    expect(screen.getByRole('radiogroup', { name: 'Input type' })).toBeDefined();
    expect(row('Mismatch loss (dB)')).toBe(`${num(0.177287)} dB`);
    expect(row('Reflection coefficient |Γ|')).toBe(num(0.2));
  });

  it('derives gamma, return loss and mismatch loss from VSWR 1.5', () => {
    const result = computeVSWR({ vswr: 1.5 });
    expect(result.gamma).toBeCloseTo(0.2, 12);
    expect(result.vswr).toBeCloseTo(1.5, 12);
    expect(result.returnLoss).toBeCloseTo(13.9794, 3);
    expect(result.mismatchLoss).toBeCloseTo(0.177287, 5);
    expect(result.load).toBeCloseTo(75, 10);
  });

  it('converts reciprocal inputs back to VSWR', () => {
    const fromGamma = computeVSWR({ gamma: 0.2 });
    expect(fromGamma.vswr).toBeCloseTo(1.5, 12);
    expect(fromGamma.returnLoss).toBeCloseTo(13.9794, 3);
    expect(fromGamma.mismatchLoss).toBeCloseTo(0.177287, 5);

    const fromReturnLoss = computeVSWR({ returnLoss: 13.9794 });
    expect(fromReturnLoss.gamma).toBeCloseTo(0.2, 4);
    expect(fromReturnLoss.vswr).toBeCloseTo(1.5, 3);
  });

  it('recomputes the displayed results when the VSWR input changes', () => {
    renderCalculatorPage(<VSWRCalculator />, page);
    expect(hero()).toBe(num(1.5));

    fireEvent.change(screen.getByLabelText('VSWR'), { target: { value: '2' } });

    const result = computeVSWR({ vswr: 2 });
    expect(hero()).toBe(num(2));
    expect(row('Reflection coefficient |Γ|')).toBe(num(result.gamma));
    expect(row('Return loss (dB)')).toBe(`${num(result.returnLoss)} dB`);
    expect(row('Mismatch loss (dB)')).toBe(`${num(result.mismatchLoss)} dB`);
    expect(row('Load impedance (ohm)')).toBe(`${num(result.load)} ohm`);
  });

  it('accepts return loss as an alternative input', () => {
    renderCalculatorPage(<VSWRCalculator />, page);
    fireEvent.click(screen.getByRole('radio', { name: 'Return loss' }));
    fireEvent.change(screen.getByLabelText('Return loss (dB)'), { target: { value: '20' } });

    const result = computeVSWR({ returnLoss: 20 });
    expect(hero()).toBe(num(result.vswr));
    expect(row('Reflection coefficient |Γ|')).toBe(num(result.gamma));
    expect(row('Return loss (dB)')).toBe(`${num(result.returnLoss)} dB`);
  });

  it('shows no NaN for a perfect match or invalid input', () => {
    const { container } = renderCalculatorPage(<VSWRCalculator />, page);

    fireEvent.change(screen.getByLabelText('VSWR'), { target: { value: '1' } });
    expect(row('Reflection coefficient |Γ|')).toBe(num(0));
    expect(row('Return loss (dB)')).toBe('Infinite');
    expect(row('Mismatch loss (dB)')).toBe(`${num(0)} dB`);
    expect(container.textContent).not.toContain('NaN');

    fireEvent.change(screen.getByLabelText('VSWR'), { target: { value: '0' } });
    expect(hero()).toBe(num(1));
    expect(container.textContent).not.toContain('NaN');

    fireEvent.change(screen.getByLabelText('VSWR'), { target: { value: '-3' } });
    expect(container.textContent).not.toContain('NaN');

    fireEvent.change(screen.getByLabelText('VSWR'), { target: { value: '' } });
    expect(container.textContent).not.toContain('NaN');

    const empty = computeVSWR({});
    expect(Number.isNaN(empty.gamma)).toBe(false);
    expect(Number.isNaN(empty.vswr)).toBe(false);
    expect(Number.isNaN(empty.returnLoss)).toBe(false);
    expect(Number.isNaN(empty.mismatchLoss)).toBe(false);
    expect(Number.isNaN(empty.load)).toBe(false);
    expect(computeVSWR({ vswr: -10 }).gamma).toBe(0);
    expect(computeVSWR({ gamma: 2 }).vswr).toBe(Infinity);
    expect(computeVSWR({ gamma: 1 }).returnLoss).toBe(0);
  });
});
