import { useState } from 'react';
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

export interface EmergencyFundInput {
  monthlyExpenses: number;
  months: number;
  currentSavings: number;
}

export function computeEmergencyFund(input: EmergencyFundInput) {
  const target = input.monthlyExpenses * input.months;
  const gap = Math.max(0, target - input.currentSavings);
  const funded = target > 0 ? Math.min(100, (input.currentSavings / target) * 100) : 0;
  const covered = input.monthlyExpenses > 0 ? input.currentSavings / input.monthlyExpenses : 0;
  return { target, gap, funded, covered };
}

export function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState('4000');
  const [months, setMonths] = useState('6');
  const [currentSavings, setCurrentSavings] = useState('8000');

  const result = computeEmergencyFund({
    monthlyExpenses: Number(monthlyExpenses) || 0,
    months: Number(months) || 0,
    currentSavings: Number(currentSavings) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Monthly expenses ($)" value={monthlyExpenses} onChange={setMonthlyExpenses} min={0} />
            <NumberField label="Coverage months" value={months} onChange={setMonths} min={0} max={24} step="1" />
            <NumberField label="Current savings ($)" value={currentSavings} onChange={setCurrentSavings} min={0} />
          </div>
          <Hint>
            A standard emergency fund covers 3–6 months of essential
            expenses. The gap is what remains to save.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Emergency fund target"
            value={`$${formatMoney(result.target)}`}
            sub="Goal amount"
          />
          <ResultRows>
            <ResultRow label="Funding gap" value={`$${formatMoney(result.gap)}`} />
            <ResultRow label="Funded (%)" value={`${formatMoney(result.funded)}%`} />
            <ResultRow label="Months covered by savings" value={formatMoney(result.covered)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EmergencyFundCalculator;
