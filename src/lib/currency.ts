// Currency conversion rates (base: USD)
const exchangeRates: Record<string, number> = {
  USD: 1,
  INR: 83.12,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  AUD: 1.53,
  CAD: 1.36,
  SGD: 1.34,
  AED: 3.67,
  SAR: 3.75,
};

export function convertCurrency(amount: number, from: string, to: string): number {
  const fromRate = exchangeRates[from] || 1;
  const toRate = exchangeRates[to] || 1;
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
}

export function formatCurrency(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    SGD: 'S$',
    AED: 'د.إ',
    SAR: '﷼',
  };
  return symbols[currency] || '$';
}

export { currencies } from '../components/common/CurrencySelector';