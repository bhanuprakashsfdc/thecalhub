interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
  className?: string;
}

const currencies = [
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

export default function CurrencySelector({ value, onChange, className = '' }: CurrencySelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-surface-container-highest border-none rounded-lg py-2 px-3 text-white text-sm font-mono focus:ring-1 focus:ring-primary-fixed outline-none ${className}`}
      aria-label="Select currency"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.symbol} {c.code} - {c.name}
        </option>
      ))}
    </select>
  );
}

export { currencies };