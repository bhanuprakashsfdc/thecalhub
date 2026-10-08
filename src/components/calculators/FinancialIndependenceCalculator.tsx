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

export interface FinancialIndependenceInput {
  currentAge: number;
  targetAge: number;
  currentSavings: number;
  annualSavings: number;
  annualReturn: number;
  retirementSpending: number;
  withdrawalRate: number;
}

export function computeFinancialIndependence(input: FinancialIndependenceInput) {
  const years = Math.max(0, Math.floor(input.targetAge) - Math.floor(input.currentAge));
  const r = Math.max(0, input.annualReturn) / 100;
  const growth = Math.pow(1 + r, years);
  const start = Math.max(0, input.currentSavings);
  const annual = Math.max(0, input.annualSavings);
  const projected = r > 0 ? start * growth + annual * ((growth - 1) / r) : start + annual * years;
  const withdrawal = Math.max(0, input.withdrawalRate);
  const fiNumber = withdrawal > 0 ? Math.max(0, input.retirementSpending) / (withdrawal / 100) : 0;
  const surplus = projected - fiNumber;
  const progress = fiNumber > 0 ? (start / fiNumber) * 100 : 0;

  return { years, projected, fiNumber, surplus, progress };
}

export function FinancialIndependenceCalculator() {
  const [currentAge, setCurrentAge] = useState('30');
  const [targetAge, setTargetAge] = useState('60');
  const [currentSavings, setCurrentSavings] = useState('80000');
  const [annualSavings, setAnnualSavings] = useState('20000');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [retirementSpending, setRetirementSpending] = useState('45000');
  const [withdrawalRate, setWithdrawalRate] = useState('4');

  const result = computeFinancialIndependence({
    currentAge: Number(currentAge) || 0,
    targetAge: Number(targetAge) || 0,
    currentSavings: Number(currentSavings) || 0,
    annualSavings: Number(annualSavings) || 0,
    annualReturn: Number(annualReturn) || 0,
    retirementSpending: Number(retirementSpending) || 0,
    withdrawalRate: Number(withdrawalRate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Timeline</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current age" value={currentAge} onChange={setCurrentAge} min={0} max={120} />
              <NumberField label="Target age" value={targetAge} onChange={setTargetAge} min={0} max={120} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current savings ($)" value={currentSavings} onChange={setCurrentSavings} min={0} />
              <NumberField label="Annual savings ($)" value={annualSavings} onChange={setAnnualSavings} min={0} />
            </div>
            <NumberField label="Annual return (%)" value={annualReturn} onChange={setAnnualReturn} min={0} step="0.1" />
          </div>
          <PanelEyebrow>Retirement spending</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual spending ($)" value={retirementSpending} onChange={setRetirementSpending} min={0} />
              <NumberField label="Withdrawal rate (%)" value={withdrawalRate} onChange={setWithdrawalRate} min={0.1} max={10} step="0.1" />
            </div>
          </div>
          <Hint>
            Financial independence is a number, not a date: spending divided by the withdrawal rate is the
            portfolio you need before work becomes optional.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Projected nest egg"
            value={`$${formatMoney(result.projected)}`}
            sub={`Over ${result.years} year(s) of saving`}
          />
          <ResultRows>
            <ResultRow label="FI number" value={`$${formatMoney(result.fiNumber)}`} />
            <ResultRow label="Surplus or shortfall" value={`$${formatMoney(result.surplus)}`} />
            <ResultRow label="Progress today" value={`${formatMoney(result.progress)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FinancialIndependenceCalculator;
