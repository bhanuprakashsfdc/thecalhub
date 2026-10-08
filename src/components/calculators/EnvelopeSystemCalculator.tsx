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

export interface EnvelopeSystemInput {
  monthlyIncome: number;
  fixedBills: number;
  needsPercent: number;
  wantsPercent: number;
  savingsPercent: number;
}

export function computeEnvelopeSystem(input: EnvelopeSystemInput) {
  const income = Math.max(0, input.monthlyIncome);
  const fixed = Math.max(0, input.fixedBills);
  const cash = Math.max(0, income - fixed);
  const needs = cash * (Math.max(0, input.needsPercent) / 100);
  const wants = cash * (Math.max(0, input.wantsPercent) / 100);
  const savings = cash * (Math.max(0, input.savingsPercent) / 100);
  const leftover = cash - (needs + wants + savings);

  return { cash, needs, wants, savings, leftover };
}

export function EnvelopeSystemCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('5000');
  const [fixedBills, setFixedBills] = useState('1800');
  const [needsPercent, setNeedsPercent] = useState('50');
  const [wantsPercent, setWantsPercent] = useState('30');
  const [savingsPercent, setSavingsPercent] = useState('20');

  const result = computeEnvelopeSystem({
    monthlyIncome: Number(monthlyIncome) || 0,
    fixedBills: Number(fixedBills) || 0,
    needsPercent: Number(needsPercent) || 0,
    wantsPercent: Number(wantsPercent) || 0,
    savingsPercent: Number(savingsPercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Monthly take-home ($)" value={monthlyIncome} onChange={setMonthlyIncome} min={0} />
              <NumberField label="Fixed bills ($)" value={fixedBills} onChange={setFixedBills} min={0} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <NumberField label="Needs (%)" value={needsPercent} onChange={setNeedsPercent} min={0} max={100} />
              <NumberField label="Wants (%)" value={wantsPercent} onChange={setWantsPercent} min={0} max={100} />
              <NumberField label="Savings (%)" value={savingsPercent} onChange={setSavingsPercent} min={0} max={100} />
            </div>
          </div>
          <Hint>
            The envelope method gives every dollar a job: bills come out first, then the remaining cash is split
            into physical or virtual envelopes so overspending in one area is visible immediately.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cash for envelopes"
            value={`$${formatMoney(result.cash)}`}
            sub="Left after fixed bills are paid"
          />
          <ResultRows>
            <ResultRow label="Needs envelope" value={`$${formatMoney(result.needs)}`} />
            <ResultRow label="Wants envelope" value={`$${formatMoney(result.wants)}`} />
            <ResultRow label="Savings envelope" value={`$${formatMoney(result.savings)}`} />
            <ResultRow label="Unallocated cash" value={`$${formatMoney(result.leftover)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EnvelopeSystemCalculator;
