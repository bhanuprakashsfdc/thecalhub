import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import DecibelWirelessCalculator, { computeDecibelWireless } from './DecibelWirelessCalculator';

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

describe('DecibelWirelessCalculator', () => {
  const page: CalculatorPage = {
    title: 'Decibel Wireless Calculator',
    description: 'Compare RF power levels in decibels and dBm.',
    path: '/decibel-wireless-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DecibelWirelessCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Decibel Wireless Calculator' })).toBeDefined();
    expect(screen.getByText('Power A (mW)')).toBeDefined();
    expect(screen.getByText('Power B (mW)')).toBeDefined();
    expect(screen.getByText('Cable loss (dB)')).toBeDefined();
    expect(screen.getByText('Power difference')).toBeDefined();
  });

  it('computes the dB ratio, dBm levels and received power', () => {
    const result = computeDecibelWireless({ powerA: 1000, powerB: 10, cableLossDb: 3 });
    expect(result.ratioDb).toBeCloseTo(20, 9);
    expect(result.dbmA).toBeCloseTo(30, 9);
    expect(result.dbmB).toBeCloseTo(10, 9);
    expect(result.receivedDbm).toBeCloseTo(27, 9);
  });

  it('recomputes the displayed results when an input changes', () => {
    const { container } = renderCalculatorPage(<DecibelWirelessCalculator />, page);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(20)} dB`);
    expect(screen.getByText('Power A in dBm').nextElementSibling!.textContent).toBe(`${num(30)} dBm`);
    expect(screen.getByText('Power A after cable loss').nextElementSibling!.textContent).toBe(
      `${num(27)} dBm`
    );

    fireEvent.change(screen.getByLabelText('Power B (mW)'), { target: { value: '100' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(10)} dB`);
    expect(screen.getByText('Power B in dBm').nextElementSibling!.textContent).toBe(`${num(20)} dBm`);
    expect(screen.getByText('Power A after cable loss').nextElementSibling!.textContent).toBe(
      `${num(27)} dBm`
    );
  });

  it('handles zero and negative inputs without NaN or Infinity', () => {
    const { container } = renderCalculatorPage(<DecibelWirelessCalculator />, page);
    fireEvent.change(screen.getByLabelText('Power A (mW)'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('Power B (mW)'), { target: { value: '-25' } });
    fireEvent.change(screen.getByLabelText('Cable loss (dB)'), { target: { value: '-5' } });

    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(0)} dB`);
    container.querySelectorAll('p').forEach((p) => {
      expect(p.textContent ?? '').not.toMatch(/NaN|Infinity/);
    });

    const zero = computeDecibelWireless({ powerA: 0, powerB: 0, cableLossDb: 0 });
    expect(Number.isFinite(zero.ratioDb)).toBe(true);
    expect(Number.isFinite(zero.dbmA)).toBe(true);
    expect(Number.isFinite(zero.dbmB)).toBe(true);
    expect(Number.isFinite(zero.receivedDbm)).toBe(true);

    const negative = computeDecibelWireless({ powerA: -100, powerB: -10, cableLossDb: -3 });
    expect(Number.isFinite(negative.ratioDb)).toBe(true);
    expect(Number.isFinite(negative.receivedDbm)).toBe(true);
    expect(negative.ratioDb).toBe(0);
    expect(negative.receivedDbm).toBe(0);
  });
});
