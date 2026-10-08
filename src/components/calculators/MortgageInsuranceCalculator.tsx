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

export interface MortgageInsuranceInput {
  loanAmount: number;
  homeValue: number;
  mortgageRate: number;
  miRate: number;
  termYears: number;
}

export function mortgagePayment(principal: number, annualRate: number, years: number) {
  const n = Math.round(Math.max(0, years) * 12);
  const r = Math.max(0, annualRate) / 100 / 12;
  if (n === 0) return 0;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  if (growth === 1) return principal / n;
  return (principal * r * growth) / (growth - 1);
}

export function computeMortgageInsurance(input: MortgageInsuranceInput) {
  const loan = Math.max(0, input.loanAmount);
  const value = Math.max(0, input.homeValue);
  const years = Math.max(0, input.termYears);
  const ltv = value > 0 ? (loan / value) * 100 : 0;
  const monthlyPremium = (loan * Math.max(0, input.miRate)) / 100 / 12;
  const annualPremium = monthlyPremium * 12;

  const n = Math.round(years * 12);
  const payment = mortgagePayment(loan, input.mortgageRate, years);
  const r = Math.max(0, input.mortgageRate) / 100 / 12;
  let balance = loan;
  let totalPremium = 0;
  for (let i = 0; i < n; i++) {
    totalPremium += (balance * Math.max(0, input.miRate)) / 100 / 12;
    const interest = balance * r;
    balance = Math.max(0, balance - (payment - interest));
  }

  return { ltv, monthlyPremium, annualPremium, totalPremium, payment };
}

export function MortgageInsuranceCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [homeValue, setHomeValue] = useState('375000');
  const [mortgageRate, setMortgageRate] = useState('6.5');
  const [miRate, setMiRate] = useState('0.5');
  const [termYears, setTermYears] = useState('30');

  const result = computeMortgageInsurance({
    loanAmount: Number(loanAmount) || 0,
    homeValue: Number(homeValue) || 0,
    mortgageRate: Number(mortgageRate) || 0,
    miRate: Number(miRate) || 0,
    termYears: Number(termYears) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
              <NumberField label="Home value ($)" value={homeValue} onChange={setHomeValue} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Mortgage rate (%)" value={mortgageRate} onChange={setMortgageRate} step="0.1" min={0} />
              <NumberField label="Annual MI rate (%)" value={miRate} onChange={setMiRate} step="0.05" min={0} />
            </div>
            <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
          </div>
          <Hint>
            Mortgage insurance protects the lender, not you. The premium is charged on the outstanding balance, so
            it shrinks every month as you pay the loan down.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly mortgage insurance"
            value={`$${formatMoney(result.monthlyPremium)}`}
            sub={`Current LTV ${formatMoney(result.ltv)}%`}
          />
          <ResultRows>
            <ResultRow label="Annual premium" value={`$${formatMoney(result.annualPremium)}`} />
            <ResultRow label="Total premium over term" value={`$${formatMoney(result.totalPremium)}`} />
            <ResultRow label="Principal and interest payment" value={`$${formatMoney(result.payment)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MortgageInsuranceCalculator;
