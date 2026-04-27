import { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'SGD' | 'AED' | 'SAR';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export const currencies: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
];

const STORAGE_KEY = 'thecalhub-currency';

interface I18nContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getCurrencySymbol: () => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Currency) || 'USD';
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(STORAGE_KEY, newCurrency);
  };

  const getCurrencySymbol = () => {
    const info = currencies.find(c => c.code === currency);
    return info?.symbol || '$';
  };

  return (
    <I18nContext.Provider value={{ currency, setCurrency, getCurrencySymbol }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export function formatMoneyWithSymbol(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatMoney(amount: number): string {
  const context = useContext(I18nContext);
  const symbol = context?.getCurrencySymbol() || '$';
  return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}