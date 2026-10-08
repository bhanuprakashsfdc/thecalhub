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

export interface FIREInput {
  annualExpenses: number;
  withdrawalRate: number;
  currentSavings: number;
  annualSavings: number;
  expectedReturn: number;
}

export function computeFIRE(input: FIREInput) {
  const withdrawal = Math.max(0, input.withdrawalRate);
  const fiNumber = withdrawal > 0 ? Math.max(0, input.annualExpenses) / (withdrawal / 100) : 0;
  let balance = Math.max(0, input.currentSavings);
  const contribution = Math.max(0, input.annualSavings);
  const ret = Math.max(0, input.expectedReturn) / 100;
  let years = 0;

  if (balance >= fiNumber) {
    years = 0;
  } else if (contribution <= 0 && ret <= 0) {
    years = 0;
  } else {
    while (balance < fiNumber && years < 1000) {
      balance = balance * (1 + ret) + contribution;
      years += 1;
    }
  }

  const reached = balance >= fiNumber;
  const surplus = reached ? balance - fiNumber : 0;

  return { fiNumber, years, reached, surplus, balance };
}

export function FIRECalculator() {
  const [annualExpenses, setAnnualExpenses] = useState('40000');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [currentSavings, setCurrentSavings] = useState('60000');
  const [annualSavings, setAnnualSavings] = useState('24000');
  const [expectedReturn, setExpectedReturn] = useState('7');

  const result = computeFIRE({
    annualExpenses: Number(annualExpenses) || 0,
    withdrawalRate: Number(withdrawalRate) || 0,
    currentSavings: Number(currentSavings) || 0,
    annualSavings: Number(annualSavings) || 0,
    expectedReturn: Number(expectedReturn) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Annual expenses ($)" value={annualExpenses} onChange={setAnnualExpenses} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Withdrawal rate (%)" value={withdrawalRate} onChange={setWithdrawalRate} min={0.1} max={10} step="0.1" />
              <NumberField label="Expected return (%)" value={expectedReturn} onChange={setExpectedReturn} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current savings ($)" value={currentSavings} onChange={setCurrentSavings} min={0} />
              <NumberField label="Annual savings ($)" value={annualSavings} onChange={setAnnualSavings} min={0} />
            </div>
          </div>
          <Hint>
            FIRE uses the 4% rule in reverse: multiply yearly spending by 25 to get the portfolio that supports
            it. A lower withdrawal rate needs a bigger pile.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Financial independence number"
            value={`$${formatMoney(result.fiNumber)}`}
            sub={`At a ${withdrawalRate}% withdrawal rate`}
          />
          <ResultRows>
            <ResultRow label="Years to reach FI" value={result.reached ? `${result.years}` : 'Not yet reachable'} />
            <ResultRow label="Portfolio at FI" value={`$${formatMoney(result.balance)}`} />
            <ResultRow label="Surplus over FI number" value={`$${formatMoney(result.surplus)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FIRECalculator;
