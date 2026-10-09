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

export interface HomeEquityLoanInput {
  homeValue: number;
  mortgageBalance: number;
  loanAmount: number;
  interestRatePct: number;
  termYears: number;
}

export function computeHomeEquityLoan(input: HomeEquityLoanInput) {
  const equity = Math.max(0, input.homeValue - input.mortgageBalance);
  const maxLoan = Math.max(0, input.homeValue * 0.8 - input.mortgageBalance);
  const cltv =
    input.homeValue > 0
      ? ((input.mortgageBalance + input.loanAmount) / input.homeValue) * 100
      : 0;
  const r = input.interestRatePct / 100 / 12;
  const n = input.termYears * 12;
  const payment =
    r > 0
      ? (input.loanAmount * r) / (1 - Math.pow(1 + r, -n))
      : n > 0
        ? input.loanAmount / n
        : 0;
  return { equity, maxLoan, cltv, payment };
}

export function HomeEquityLoanCalculator() {
  const [homeValue, setHomeValue] = useState('400000');
  const [mortgageBalance, setMortgageBalance] = useState('250000');
  const [loanAmount, setLoanAmount] = useState('70000');
  const [interestRatePct, setInterestRatePct] = useState('8');
  const [termYears, setTermYears] = useState('15');

  const result = computeHomeEquityLoan({
    homeValue: Number(homeValue) || 0,
    mortgageBalance: Number(mortgageBalance) || 0,
    loanAmount: Number(loanAmount) || 0,
    interestRatePct: Number(interestRatePct) || 0,
    termYears: Number(termYears) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Home value ($)" value={homeValue} onChange={setHomeValue} min={0} />
            <NumberField label="Mortgage balance ($)" value={mortgageBalance} onChange={setMortgageBalance} min={0} />
            <NumberField label="Loan amount requested ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
            <NumberField label="Interest rate (%)" value={interestRatePct} onChange={setInterestRatePct} min={0} step="0.1" />
            <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={0} step="1" />
          </div>
          <Hint>
            Lenders typically cap combined loan-to-value at
            80%. The payment amortises the requested amount over the term.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment"
            value={`$${formatMoney(result.payment)}`}
            sub="On the requested loan"
          />
          <ResultRows>
            <ResultRow label="Home equity" value={`$${formatMoney(result.equity)}`} />
            <ResultRow label="Maximum loan (80% LTV)" value={`$${formatMoney(result.maxLoan)}`} />
            <ResultRow label="Combined LTV" value={`${formatMoney(result.cltv)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HomeEquityLoanCalculator;
