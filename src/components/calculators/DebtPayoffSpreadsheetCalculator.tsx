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

export interface DebtPayoffSpreadsheetInput {
  totalDebt: number;
  ratePercent: number;
  monthlyPayment: number;
}

export function computeDebtPayoffSpreadsheet(input: DebtPayoffSpreadsheetInput) {
  const balance = Math.max(0, input.totalDebt);
  const payment = Math.max(0, input.monthlyPayment);
  const r = Math.max(0, input.ratePercent) / 100 / 12;
  let months = 0;

  if (balance > 0 && payment > 0) {
    if (r === 0) {
      months = Math.ceil(balance / payment);
    } else if (payment > r * balance) {
      months = Math.ceil(-Math.log(1 - (r * balance) / payment) / Math.log(1 + r));
    }
  }

  const totalRepaid = payment * months;
  const interest = Math.max(0, totalRepaid - balance);
  const firstMonthInterest = balance * r;

  return { months, totalRepaid, interest, firstMonthInterest, r };
}

export function DebtPayoffSpreadsheetCalculator() {
  const [totalDebt, setTotalDebt] = useState('12000');
  const [ratePercent, setRatePercent] = useState('8.9');
  const [monthlyPayment, setMonthlyPayment] = useState('350');

  const result = computeDebtPayoffSpreadsheet({
    totalDebt: Number(totalDebt) || 0,
    ratePercent: Number(ratePercent) || 0,
    monthlyPayment: Number(monthlyPayment) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total debt ($)" value={totalDebt} onChange={setTotalDebt} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual rate (%)" value={ratePercent} onChange={setRatePercent} min={0} step="0.1" />
              <NumberField label="Monthly payment ($)" value={monthlyPayment} onChange={setMonthlyPayment} min={0} />
            </div>
          </div>
          <Hint>
            Any payment above the first month’s interest clears the balance; below it the debt grows forever.
            Even small increases chop months off the schedule.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Time to debt free"
            value={result.months > 0 ? `${result.months} months` : 'Payment too low'}
            sub={result.months > 0 ? `Paid off in ${formatMoney(result.months / 12)} years` : 'Raise the payment'}
          />
          <ResultRows>
            <ResultRow label="Total repaid" value={`$${formatMoney(result.totalRepaid)}`} />
            <ResultRow label="Estimated total interest" value={`$${formatMoney(result.interest)}`} />
            <ResultRow label="First month interest" value={`$${formatMoney(result.firstMonthInterest)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DebtPayoffSpreadsheetCalculator;
