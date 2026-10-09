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

export interface ExtraPaymentMortgageInput {
  loanAmount: number;
  interestRatePct: number;
  termYears: number;
  extraPayment: number;
}

export function amortize(
  principal: number,
  annualRatePct: number,
  monthlyPayment: number
): { months: number; interest: number } {
  const r = annualRatePct / 100 / 12;
  let balance = principal;
  let months = 0;
  let interest = 0;
  const cap = 12000;
  while (balance > 0.005 && months < cap) {
    const monthInterest = balance * r;
    interest += monthInterest;
    const principalPaid = monthlyPayment - monthInterest;
    if (principalPaid <= 0) {
      return { months: cap, interest };
    }
    balance -= principalPaid;
    months++;
  }
  return { months, interest };
}

export function computeExtraPaymentMortgage(input: ExtraPaymentMortgageInput) {
  const r = input.interestRatePct / 100 / 12;
  const n = input.termYears * 12;
  const standardPayment =
    r > 0
      ? (input.loanAmount * r) / (1 - Math.pow(1 + r, -n))
      : input.loanAmount / Math.max(1, n);
  const baseline = amortize(input.loanAmount, input.interestRatePct, standardPayment);
  const withExtra = amortize(
    input.loanAmount,
    input.interestRatePct,
    standardPayment + input.extraPayment
  );
  const saved = Math.max(0, baseline.interest - withExtra.interest);
  const timeSaved = Math.max(0, baseline.months - withExtra.months);
  return {
    standardPayment,
    baselineMonths: baseline.months,
    baselineInterest: baseline.interest,
    payoffMonths: withExtra.months,
    interestWithExtra: withExtra.interest,
    saved,
    timeSaved,
  };
}

export function ExtraPaymentMortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRatePct, setInterestRatePct] = useState('6.5');
  const [termYears, setTermYears] = useState('30');
  const [extraPayment, setExtraPayment] = useState('200');

  const result = computeExtraPaymentMortgage({
    loanAmount: Number(loanAmount) || 0,
    interestRatePct: Number(interestRatePct) || 0,
    termYears: Number(termYears) || 0,
    extraPayment: Number(extraPayment) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
            <NumberField label="Interest rate (%)" value={interestRatePct} onChange={setInterestRatePct} min={0} step="0.01" />
            <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={0} step="1" />
            <NumberField label="Extra monthly payment ($)" value={extraPayment} onChange={setExtraPayment} min={0} step="10" />
          </div>
          <Hint>
            Extra principal payments shorten the amortisation schedule
            and cut total interest. Standard payment is amortised first, then the
            extra amount is applied to principal each month.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Interest saved"
            value={`$${formatMoney(result.saved)}`}
            sub={`Standard payment $${formatMoney(result.standardPayment)}`}
          />
          <ResultRows>
            <ResultRow label="Payoff with extra (months)" value={String(result.payoffMonths)} />
            <ResultRow label="Time saved (months)" value={String(result.timeSaved)} />
            <ResultRow label="Total interest with extra" value={`$${formatMoney(result.interestWithExtra)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExtraPaymentMortgageCalculator;
