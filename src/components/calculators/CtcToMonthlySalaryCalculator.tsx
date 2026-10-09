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

export interface CtcInput {
  annualCtc: number;
  deductionsPct: number;
}

export function computeCtcToMonthly(input: CtcInput) {
  const monthlyGross = input.annualCtc / 12;
  const deductions = input.annualCtc * (input.deductionsPct / 100);
  const monthlyTakeHome = monthlyGross * (1 - input.deductionsPct / 100);
  const annualTakeHome = monthlyTakeHome * 12;
  return { monthlyGross, deductions, monthlyTakeHome, annualTakeHome };
}

export function CtcToMonthlySalaryCalculator() {
  const [annualCtc, setAnnualCtc] = useState('60000');
  const [deductionsPct, setDeductionsPct] = useState('18');

  const result = computeCtcToMonthly({
    annualCtc: Number(annualCtc) || 0,
    deductionsPct: Number(deductionsPct) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Annual CTC ($)"
              value={annualCtc}
              onChange={setAnnualCtc}
              min={0}
              step="1000"
              hint="Your total cost-to-company offer, including bonuses and allowances."
            />
            <NumberField
              label="Tax & Deductions (%)"
              value={deductionsPct}
              onChange={setDeductionsPct}
              min={0}
              max={100}
              step="0.5"
              hint="Combined income tax, provident fund and other payroll deductions."
            />
          </div>
        </Panel>
      }
      results={
        <Panel>
<PanelEyebrow>Result</PanelEyebrow>
            <ResultHero
              label="Monthly Take-Home"
              value={`$${formatMoney(result.monthlyTakeHome)}/mo`}
              sub={`${formatMoney(result.annualTakeHome)} per year after deductions`}
            />
            <ResultRows>
              <ResultRow label="Monthly Gross Salary" value={`$${formatMoney(result.monthlyGross)}/mo`} />
              <ResultRow label="Annual Gross Salary" value={`$${formatMoney(result.monthlyGross * 12)}`} />
              <ResultRow label="Monthly Deductions" value={`$${formatMoney(result.deductions / 12)}/mo`} />
              <ResultRow label="Annual Deductions" value={`$${formatMoney(result.deductions)}`} />
              <ResultRow label="Annual Take-Home" value={`$${formatMoney(result.annualTakeHome)}`} />
          </ResultRows>
          <Hint>
            Monthly gross is the annual CTC divided by 12. Take-home subtracts the
            configured tax and deduction percentage from the gross pay.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CtcToMonthlySalaryCalculator;