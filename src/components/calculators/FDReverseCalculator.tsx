import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface FDReverseInput {
  desiredAmount: number;
  annualRate: number;
  years: number;
  compoundingFrequency: 'monthly' | 'quarterly' | 'yearly';
}

export function computeFDReverse(input: FDReverseInput) {
  const rate = Math.max(0, input.annualRate) / 100;
  const years = Math.max(0, input.years);
  
  let n: number;
  let r: number;
  
  switch (input.compoundingFrequency) {
    case 'monthly':
      n = years * 12;
      r = rate / 12;
      break;
    case 'quarterly':
      n = years * 4;
      r = rate / 4;
      break;
    case 'yearly':
    default:
      n = years;
      r = rate;
      break;
  }
  
  if (r === 0) {
    return { principal: input.desiredAmount, interest: 0 };
  }
  
  const principal = input.desiredAmount / Math.pow(1 + r, n);
  const interest = input.desiredAmount - principal;
  
  return { principal, interest };
}

export function FDReverseCalculator() {
  const [desiredAmount, setDesiredAmount] = useState('1000000');
  const [annualRate, setAnnualRate] = useState('7.5');
  const [years, setYears] = useState('5');
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('quarterly');

  const result = useMemo(() => computeFDReverse({
    desiredAmount: Number(desiredAmount) || 0,
    annualRate: Number(annualRate) || 0,
    years: Number(years) || 0,
    compoundingFrequency,
  }), [desiredAmount, annualRate, years, compoundingFrequency]);

  const frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <span className="w-4 h-4">🏦</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">FD Reverse Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate how much principal you need to invest in a Fixed Deposit to reach your desired maturity amount.</p>
      </div>

      <CalcGrid
        inputs={
          <Panel>
            <PanelEyebrow>Inputs</PanelEyebrow>
            <div className="space-y-6">
              <NumberField label="Desired Maturity Amount (₹)" value={desiredAmount} onChange={setDesiredAmount} min={0} hint="The amount you want to receive at maturity" />
              <NumberField label="Annual Interest Rate (%)" value={annualRate} onChange={setAnnualRate} min={0} max={20} step="0.1" />
              <NumberField label="Investment Duration (Years)" value={years} onChange={setYears} min={1} max={20} />
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Compounding Frequency</span>
                <div role="radiogroup" aria-label="Compounding Frequency" className="flex flex-wrap gap-2">
                  {frequencyOptions.map((opt) => {
                    const active = opt.value === compoundingFrequency;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setCompoundingFrequency(opt.value as 'monthly' | 'quarterly' | 'yearly')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          active
                            ? 'bg-primary-fixed text-on-primary-fixed'
                            : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </label>
            </div>
            <Hint>
              In India, banks typically compound FD interest quarterly. Select the compounding frequency that matches your bank's policy for accurate results.
            </Hint>
          </Panel>
        }
        results={
          <Panel>
            <PanelEyebrow>Result</PanelEyebrow>
            <ResultHero
              label="Principal Required"
              value={`₹${formatMoney(result.principal)}`}
              sub={`To get ₹${formatMoney(Number(desiredAmount) || 0)} in ${years} year(s) at ${annualRate}%`}
            />
            <ResultRows>
              <ResultRow label="Total Interest Earned" value={`₹${formatMoney(result.interest)}`} />
              <ResultRow label="Effective Annual Yield" value={`${((Math.pow(1 + (Number(annualRate) || 0) / 100 / (compoundingFrequency === 'monthly' ? 12 : compoundingFrequency === 'quarterly' ? 4 : 1), compoundingFrequency === 'monthly' ? 12 : compoundingFrequency === 'quarterly' ? 4 : 1) - 1) * 100).toFixed(2)}%`} />
            </ResultRows>
          </Panel>
        }
      />
    </div>
  );
}

export default FDReverseCalculator;