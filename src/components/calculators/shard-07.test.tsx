import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import RFPowerCalculator, { computeRfPower } from './RFPowerCalculator';

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

const num = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

describe('RFPowerCalculator', () => {
  const page: CalculatorPage = {
    title: 'RF Power Calculator',
    description: 'Convert RF power between dBm, dBW, watts and milliwatts.',
    path: '/rf-power-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RFPowerCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'RF Power Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Input power (dBm)')).toBeDefined();
    expect(screen.getByLabelText('Gain (dB)')).toBeDefined();
    expect(screen.getByLabelText('Loss (dB)')).toBeDefined();
    expect(screen.getByLabelText('Impedance (Ω)')).toBeDefined();
    expect(screen.getByText('Output power')).toBeDefined();
    expect(screen.getByText('Power (dBW)')).toBeDefined();
  });

  it('converts dBm to linear watts, milliwatts and load voltage', () => {
    const at0dBm = computeRfPower({ powerDbm: 30, impedance: 50 });
    expect(at0dBm.watts).toBeCloseTo(1, 10);
    expect(at0dBm.milliwatts).toBeCloseTo(1000, 8);
    expect(at0dBm.outputDbm).toBe(30);
    expect(at0dBm.outputDbW).toBe(0);
    expect(at0dBm.voltage).toBeCloseTo(Math.sqrt(50), 10);

    const at0dBW = computeRfPower({ powerDbm: 0, impedance: 50 });
    expect(at0dBW.watts).toBeCloseTo(0.001, 12);
    expect(at0dBW.outputDbW).toBe(-30);

    const roundTrip = computeRfPower({ powerDbm: 30 + 10 * Math.log10(2), impedance: 50 });
    expect(roundTrip.watts).toBeCloseTo(2, 10);
    expect(roundTrip.outputDbW).toBeCloseTo(10 * Math.log10(2), 10);
  });

  it('applies gain and loss as P_out = P_in + gain - loss', () => {
    const result = computeRfPower({ powerDbm: 20, gainDb: 10, lossDb: 6, impedance: 50 });
    expect(result.outputDbm).toBe(24);
    expect(result.outputDbW).toBe(-6);
    expect(result.watts).toBeCloseTo(Math.pow(10, -6 / 10), 10);
    expect(result.milliwatts).toBeCloseTo(Math.pow(10, -6 / 10) * 1000, 8);
    expect(result.voltage).toBeCloseTo(Math.sqrt(Math.pow(10, -6 / 10) * 50), 10);
    expect(result.outputDbm - result.outputDbW).toBe(30);
  });

  it('recomputes the displayed output when the input power changes', () => {
    const { container } = renderCalculatorPage(<RFPowerCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;
    expect(hero()).toBe(`${num(0.1)} W`);
    expect(screen.getByText('Power (dBW)').nextElementSibling!.textContent).toBe(num(-10));

    fireEvent.change(screen.getByLabelText('Input power (dBm)'), { target: { value: '30' } });
    expect(hero()).not.toBe(`${num(0.1)} W`);
    expect(hero()).toBe(`${num(1)} W`);
    expect(screen.getByText('Power (dBW)').nextElementSibling!.textContent).toBe(num(0));
    expect(screen.getByText('Power (mW)').nextElementSibling!.textContent).toBe(num(1000));
    expect(screen.getByText('Voltage across load (V)').nextElementSibling!.textContent).toBe(
      num(Math.sqrt(50))
    );
  });

  it('stays finite for zero, negative and invalid inputs', () => {
    const deep = computeRfPower({ powerDbm: -80, gainDb: -10, lossDb: 30, impedance: -50 });
    expect(deep.outputDbm).toBe(-120);
    expect(deep.outputDbW).toBe(-150);
    expect(deep.watts).toBeCloseTo(1e-15, 20);
    expect(deep.watts).not.toBeNaN();
    expect(deep.milliwatts).not.toBeNaN();
    expect(deep.voltage).toBe(0);

    const flat = computeRfPower({ powerDbm: 0, gainDb: 0, lossDb: 0, impedance: 0 });
    expect(flat.watts).toBeCloseTo(0.001, 12);
    expect(flat.voltage).toBe(0);
    expect(flat.watts).not.toBeNaN();

    const invalid = computeRfPower({ powerDbm: NaN, impedance: NaN });
    expect(invalid.watts).not.toBeNaN();
    expect(invalid.voltage).not.toBeNaN();

    const { container } = renderCalculatorPage(<RFPowerCalculator />, page);
    fireEvent.change(screen.getByLabelText('Input power (dBm)'), { target: { value: '-100' } });
    fireEvent.change(screen.getByLabelText('Gain (dB)'), { target: { value: '-5' } });
    fireEvent.change(screen.getByLabelText('Impedance (Ω)'), { target: { value: '-10' } });
    expect(container.textContent).not.toContain('NaN');
    expect(container.textContent).not.toContain('Infinity');
    expect(screen.getByText('Voltage across load (V)').nextElementSibling!.textContent).toBe(num(0));
  });
});
