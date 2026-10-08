import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface CarValueInput {
  purchasePrice: number;
  yearsOld: number;
  depreciationMethod: 'straight-line' | 'declining-balance' | 'indian-standard';
  annualKm?: number;
  condition?: 'excellent' | 'good' | 'fair' | 'poor';
}

const DEPRECIATION_RATES = {
  'straight-line': 0.15,
  'declining-balance': 0.20,
  'indian-standard': 0.15,
};

const CONDITION_MULTIPLIERS = {
  excellent: 1.1,
  good: 1.0,
  fair: 0.85,
  poor: 0.7,
};

export function computeCarValue(input: CarValueInput) {
  const rate = DEPRECIATION_RATES[input.depreciationMethod] || 0.15;
  const years = Math.max(0, input.yearsOld);
  let currentValue = Math.max(0, input.purchasePrice);

  switch (input.depreciationMethod) {
    case 'straight-line': {
      const annualDepreciation = input.purchasePrice * rate;
      currentValue = Math.max(input.purchasePrice * 0.1, input.purchasePrice - annualDepreciation * years);
      break;
    }
    case 'declining-balance': {
      for (let i = 0; i < years; i++) {
        currentValue *= (1 - rate);
      }
      currentValue = Math.max(input.purchasePrice * 0.1, currentValue);
      break;
    }
    case 'indian-standard': {
      // Indian standard: 15% first year, then 15% on reducing balance
      // After 5 years, minimum 10% of original value
      for (let i = 0; i < years; i++) {
        currentValue *= (1 - rate);
      }
      currentValue = Math.max(input.purchasePrice * 0.1, currentValue);
      break;
    }
  }

  // Apply condition multiplier
  if (input.condition) {
    currentValue *= CONDITION_MULTIPLIERS[input.condition];
  }

  // Apply mileage adjustment if provided
  if (input.annualKm && input.annualKm > 15000) {
    const excessKm = input.annualKm - 15000;
    const years = input.yearsOld;
    const totalExcessKm = excessKm * years;
    const deduction = Math.min(0.15, totalExcessKm / 100000 * 0.05);
    currentValue *= (1 - deduction);
  }

  const totalDepreciation = input.purchasePrice - currentValue;
  const depreciationPercentage = input.purchasePrice > 0 ? (totalDepreciation / input.purchasePrice) * 100 : 0;

  return {
    currentValue,
    totalDepreciation,
    depreciationPercentage,
  };
}

export function CarValueCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('1000000');
  const [yearsOld, setYearsOld] = useState('3');
  const [depreciationMethod, setDepreciationMethod] = useState<'straight-line' | 'declining-balance' | 'indian-standard'>('indian-standard');
  const [annualKm, setAnnualKm] = useState('12000');
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');

  const result = useMemo(() => computeCarValue({
    purchasePrice: Number(purchasePrice) || 0,
    yearsOld: Number(yearsOld) || 0,
    depreciationMethod,
    annualKm: Number(annualKm) || 0,
    condition,
  }), [purchasePrice, yearsOld, depreciationMethod, annualKm, condition]);

  const methodOptions = [
    { value: 'indian-standard', label: 'Indian Standard (15% reducing balance)' },
    { value: 'declining-balance', label: 'Declining Balance (20%)' },
    { value: 'straight-line', label: 'Straight Line (15%)' },
  ];

  const conditionOptions = [
    { value: 'excellent', label: 'Excellent (+10%)' },
    { value: 'good', label: 'Good (Standard)' },
    { value: 'fair', label: 'Fair (-15%)' },
    { value: 'poor', label: 'Poor (-30%)' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <span className="w-4 h-4">🚗</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Car Value Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate the current market value of your car based on age, depreciation method, condition, and mileage.</p>
      </div>

      <CalcGrid
        inputs={
          <Panel>
            <PanelEyebrow>Inputs</PanelEyebrow>
            <div className="space-y-6">
              <NumberField label="Original Purchase Price (₹)" value={purchasePrice} onChange={setPurchasePrice} min={0} hint="On-road price when purchased" />
              <NumberField label="Age of Car (Years)" value={yearsOld} onChange={setYearsOld} min={0} max={20} />
              <NumberField label="Average Annual Kilometers" value={annualKm} onChange={setAnnualKm} min={0} hint="Used for mileage adjustment (standard: 15,000 km/year)" />
              <SelectField
                label="Depreciation Method"
                value={depreciationMethod}
                onChange={(v) => setDepreciationMethod(v as 'straight-line' | 'declining-balance' | 'indian-standard')}
                options={methodOptions}
              />
              <SelectField
                label="Vehicle Condition"
                value={condition}
                onChange={(v) => setCondition(v as 'excellent' | 'good' | 'fair' | 'poor')}
                options={conditionOptions}
              />
            </div>
            <Hint>
              Indian Standard method uses 15% reducing balance depreciation (as per Income Tax rules). Condition multipliers adjust value: Excellent +10%, Good standard, Fair -15%, Poor -30%. Mileage above 15,000 km/year reduces value further.
            </Hint>
          </Panel>
        }
        results={
          <Panel>
            <PanelEyebrow>Result</PanelEyebrow>
            <ResultHero
              label="Current Market Value"
              value={`₹${formatMoney(result.currentValue)}`}
              sub={`After ${yearsOld} year(s) using ${methodOptions.find(m => m.value === depreciationMethod)?.label.split(' ')[0] || 'Indian Standard'} method`}
            />
            <ResultRows>
              <ResultRow label="Total Depreciation" value={`₹${formatMoney(result.totalDepreciation)}`} />
              <ResultRow label="Depreciation Percentage" value={`${result.depreciationPercentage.toFixed(1)}%`} />
              <ResultRow label="Retained Value" value={`${(100 - result.depreciationPercentage).toFixed(1)}%`} />
            </ResultRows>
          </Panel>
        }
      />
    </div>
  );
}

export default CarValueCalculator;