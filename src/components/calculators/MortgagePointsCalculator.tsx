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

export interface MortgagePointsInput {
  loanAmount: number;
  termYears: number;
  baseRate: number;
  points: number;
  ratePerPoint: number;
}

function paymentFor(principal: number, annualRate: number, years: number) {
  const n = Math.round(Math.max(0, years) * 12);
  const r = Math.max(0, annualRate) / 100 / 12;
  if (n === 0) return 0;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  if (growth === 1) return principal / n;
  return (principal * r * growth) / (growth - 1);
}

export function computeMortgagePoints(input: MortgagePointsInput) {
  const loan = Math.max(0, input.loanAmount);
  const years = Math.max(0, input.termYears);
  const points = Math.max(0, input.points);
  const rateWithPoints = Math.max(0, input.baseRate - points * Math.max(0, input.ratePerPoint));
  const pointsCost = (loan * points) / 100;
  const paymentWithout = paymentFor(loan, input.baseRate, years);
  const paymentWith = paymentFor(loan, rateWithPoints, years);
  const monthlySavings = Math.max(0, paymentWithout - paymentWith);
  const breakEvenMonths = monthlySavings > 0 ? pointsCost / monthlySavings : 0;
  const termMonths = Math.round(years * 12);
  const totalSavings = monthlySavings * termMonths - pointsCost;
  return { rateWithPoints, pointsCost, paymentWithout, paymentWith, monthlySavings, breakEvenMonths, totalSavings };
}

export function MortgagePointsCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [termYears, setTermYears] = useState('30');
  const [baseRate, setBaseRate] = useState('7');
  const [points, setPoints] = useState('1');
  const [ratePerPoint, setRatePerPoint] = useState('0.25');

  const result = computeMortgagePoints({
    loanAmount: Number(loanAmount) || 0,
    termYears: Number(termYears) || 0,
    baseRate: Number(baseRate) || 0,
    points: Number(points) || 0,
    ratePerPoint: Number(ratePerPoint) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
              <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
            </div>
            <NumberField label="Rate without points (%)" value={baseRate} onChange={setBaseRate} step="0.1" min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Discount points" value={points} onChange={setPoints} step="0.25" min={0} />
              <NumberField label="Rate cut per point (%)" value={ratePerPoint} onChange={setRatePerPoint} step="0.05" min={0} />
            </div>
          </div>
          <Hint>
            Each point costs 1% of the loan amount up front. Points only pay off if you keep the loan past the
            break-even month.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment savings"
            value={`$${formatMoney(result.monthlySavings)}`}
            sub={`New rate ${formatMoney(result.rateWithPoints)}%`}
          />
          <ResultRows>
            <ResultRow label="Cost of points" value={`$${formatMoney(result.pointsCost)}`} />
            <ResultRow label="Break-even" value={`${formatMoney(result.breakEvenMonths)} months`} />
            <ResultRow label="Payment with points" value={`$${formatMoney(result.paymentWith)}`} />
            <ResultRow label="Savings over the full term" value={`$${formatMoney(result.totalSavings)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MortgagePointsCalculator;
