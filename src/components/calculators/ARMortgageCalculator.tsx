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

export interface ARMortgageInput {
  principal: number;
  annualRate: number;
  years: number;
  fixedPeriod: number;
  adjustmentCap: number;
}

export function computeARMortgage(input: ARMortgageInput) {
  const r = input.annualRate / 100 / 12;
  const n = input.years * 12;
  const initialPayment = r === 0 ? input.principal / n : (input.principal * r) / (1 - Math.pow(1 + r, -n));
  const remainingMonths = n - input.fixedPeriod * 12;
  let balance = input.principal;
  const monthlyInitial = initialPayment;
  for (let i = 0; i < input.fixedPeriod * 12; i++) {
    const interest = balance * r;
    const principalPaid = monthlyInitial - interest;
    balance -= principalPaid;
  }
  const newRate = r + input.adjustmentCap / 100 / 12;
  const adjustedPayment = newRate === 0 ? balance / remainingMonths : (balance * newRate) / (1 - Math.pow(1 + newRate, -remainingMonths));
  return { initialPayment, adjustedPayment, balance, remainingMonths };
}

export function ARMortgageCalculator() {
  const [principal, setPrincipal] = useState('250000');
  const [annualRate, setAnnualRate] = useState('4');
  const [years, setYears] = useState('30');
  const [fixedPeriod, setFixedPeriod] = useState('5');
  const [adjustmentCap, setAdjustmentCap] = useState('2');

  const result = useMemo(
    () =>
      computeARMortgage({
        principal: Number(principal) || 0,
        annualRate: Number(annualRate) || 0,
        years: Number(years) || 0,
        fixedPeriod: Number(fixedPeriod) || 0,
        adjustmentCap: Number(adjustmentCap) || 0,
      }),
    [principal, annualRate, years, fixedPeriod, adjustmentCap]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Principal ($)" value={principal} onChange={setPrincipal} min={0} step="10000" />
            <NumberField label="Initial rate (%)" value={annualRate} onChange={setAnnualRate} min={0} step="0.1" />
            <NumberField label="Loan term (years)" value={years} onChange={setYears} min={1} step="1" />
            <NumberField label="Fixed period (years)" value={fixedPeriod} onChange={setFixedPeriod} min={1} step="1" />
            <NumberField label="Adjustment cap (%)" value={adjustmentCap} onChange={setAdjustmentCap} min={0} step="0.1" />
          </div>
          <Hint>
            An adjustable-rate mortgage has a fixed-rate period, after which the rate adjusts. The
            cap limits how much the rate can jump at each adjustment. After the fixed period ends,
            the payment is recalculated on the remaining balance.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Initial monthly payment"
            value={`${formatMoney(result.initialPayment)}`}
            sub={`Adjusted ${formatMoney(result.adjustedPayment)}`}
          />
          <ResultRows>
            <ResultRow label="Adjusted payment" value={formatMoney(result.adjustedPayment)} />
            <ResultRow label="Balance after fixed period" value={formatMoney(result.balance)} />
            <ResultRow label="Remaining months" value={`${result.remainingMonths}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ARMortgageCalculator;