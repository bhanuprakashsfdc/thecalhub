import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import TransactionFeeCalculator, { computeTransactionFee } from './TransactionFeeCalculator';

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

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const page: CalculatorPage = {
  title: 'Transaction Fee Calculator',
  description: 'Work out the network fee of a crypto transaction and what it costs as a share of the amount.',
  path: '/transaction-fee-calculator.html',
  category: 'financial',
};

const SAT_SCALE = 1e-8;

describe('TransactionFeeCalculator', () => {
  it('renders through CalculatorPageLayout with input labels', () => {
    renderCalculatorPage(<TransactionFeeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Transaction Fee Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Network / fee model')).toBeDefined();
    expect(screen.getByLabelText('Fee rate')).toBeDefined();
    expect(screen.getByLabelText('Transaction size (bytes or gas)')).toBeDefined();
    expect(screen.getByLabelText('Amount sent (USD)')).toBeDefined();
    expect(screen.getByLabelText('Native token price (USD)')).toBeDefined();
  });

  it('computes the transaction fee model independently', () => {
    const feeRate = 10 * SAT_SCALE;
    const txSize = 250;
    const amountUsd = 1000;
    const tokenPrice = 60000;

    const feeNative = feeRate * txSize;
    const feeUsd = feeNative * tokenPrice;
    const feePercentOfAmount = (feeUsd / amountUsd) * 100;
    const effectiveRate = feeUsd / txSize;

    const result = computeTransactionFee({ feeRate, txSize, amountUsd, tokenPrice });
    expect(result.feeNative).toBeCloseTo(feeNative, 12);
    expect(result.feeUsd).toBeCloseTo(1.5, 10);
    expect(result.feeUsd).toBeCloseTo(feeUsd, 10);
    expect(result.feePercentOfAmount).toBeCloseTo(0.15, 10);
    expect(result.feePercentOfAmount).toBeCloseTo(feePercentOfAmount, 10);
    expect(result.effectiveRate).toBeCloseTo(0.006, 10);
    expect(result.effectiveRate).toBeCloseTo(effectiveRate, 10);
  });

  it('recomputes the displayed fee when the fee rate changes', () => {
    const { container } = renderCalculatorPage(<TransactionFeeCalculator />, page);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(1.5));

    fireEvent.change(screen.getByLabelText('Fee rate'), { target: { value: '20' } });

    const feeNative = 20 * SAT_SCALE * 250;
    const feeUsd = feeNative * 60000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(feeUsd));
    const percent = ((feeUsd / 1000) * 100).toFixed(2);
    expect(screen.getByText('Fee as % of amount').nextElementSibling!.textContent).toBe(`${percent}%`);
    expect(screen.getByText('Fee in BTC').nextElementSibling!.textContent).toBe(
      `${feeNative.toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 })} BTC`
    );
  });

  it('renders 0 for zero or invalid inputs and never NaN or Infinity', () => {
    const { container } = renderCalculatorPage(<TransactionFeeCalculator />, page);

    fireEvent.change(screen.getByLabelText('Fee rate'), { target: { value: '0' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(0));
    expect(screen.getByText('Fee as % of amount').nextElementSibling!.textContent).toBe('0.00%');

    fireEvent.change(screen.getByLabelText('Fee rate'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Transaction size (bytes or gas)'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('Amount sent (USD)'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('Native token price (USD)'), { target: { value: '' } });

    const text = container.textContent ?? '';
    expect(text).not.toContain('NaN');
    expect(text).not.toContain('Infinity');
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(0));
    expect(screen.getByText('Fee as % of amount').nextElementSibling!.textContent).toBe('0.00%');
    expect(screen.getByText('Effective cost per size unit').nextElementSibling!.textContent).toBe(
      '0.0000 USD'
    );

    expect(
      computeTransactionFee({ feeRate: Number.NaN, txSize: -5, amountUsd: Number.NaN, tokenPrice: -1 })
    ).toEqual({ feeNative: 0, feeUsd: 0, feePercentOfAmount: 0, effectiveRate: 0 });
    expect(computeTransactionFee({ feeRate: Number.POSITIVE_INFINITY, txSize: 1, amountUsd: 1, tokenPrice: 1 })).toEqual({
      feeNative: 0,
      feeUsd: 0,
      feePercentOfAmount: 0,
      effectiveRate: 0,
    });
  });
});
