import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import WalletBalanceCalculator, { computeWalletBalance } from './WalletBalanceCalculator';

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
  title: 'Wallet Balance Calculator',
  description: 'Value your crypto wallet holdings and unrealised P&L.',
  path: '/wallet-balance-calculator.html',
  category: 'financial',
};

describe('WalletBalanceCalculator', () => {
  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WalletBalanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Wallet Balance Calculator' })).toBeDefined();
    expect(screen.getByText('Coin quantity held')).toBeDefined();
    expect(screen.getByText('Average purchase price ($)')).toBeDefined();
    expect(screen.getByText('Current price ($)')).toBeDefined();
    expect(screen.getByText('Market value')).toBeDefined();
  });

  it('computes wallet balance from known inputs', () => {
    const result = computeWalletBalance({ quantity: 2, costBasis: 30000, currentPrice: 45000 });
    expect(result.marketValue).toBe(90000);
    expect(result.invested).toBe(60000);
    expect(result.unrealizedPnl).toBe(30000);
    expect(result.pnlPercent).toBe(50);
    expect(result.priceChangePercent).toBe(50);
  });

  it('recomputes market value when the current price changes', () => {
    const { container } = renderCalculatorPage(<WalletBalanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Current price ($)'), { target: { value: '60000' } });
    const marketValue = 0.5 * 60000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(marketValue));
    expect(screen.getByText('Unrealised P&L').nextElementSibling!.textContent).toContain(
      money(marketValue - 0.5 * 30000)
    );
  });

  it('renders zero values for invalid or empty inputs without NaN', () => {
    const { container } = renderCalculatorPage(<WalletBalanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Coin quantity held'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Average purchase price ($)'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Current price ($)'), { target: { value: '' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(0));
    expect(screen.getByText('Total invested').nextElementSibling!.textContent).toBe(money(0));
    expect(container.textContent).not.toContain('NaN');
    expect(container.textContent).not.toContain('Infinity');
  });

  it('guards negative inputs by treating them as zero', () => {
    const result = computeWalletBalance({ quantity: -1, costBasis: -100, currentPrice: NaN });
    expect(result.marketValue).toBe(0);
    expect(result.invested).toBe(0);
    expect(result.unrealizedPnl).toBe(0);
    expect(result.pnlPercent).toBe(0);
    expect(result.priceChangePercent).toBe(0);
  });
});
