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

export interface AccountBalanceInput {
  openingBalance: number;
  monthlyDeposit: number;
  annualRate: number;
  months: number;
}

export function computeAccountBalance(input: AccountBalanceInput) {
  const months = Math.max(0, Math.floor(input.months));
  const r = Math.max(0, input.annualRate) / 100 / 12;
  let balance = Math.max(0, input.openingBalance);
  let deposited = 0;
  for (let i = 0; i < months; i++) {
    balance = balance * (1 + r) + Math.max(0, input.monthlyDeposit);
    deposited += Math.max(0, input.monthlyDeposit);
  }
  const interestEarned = balance - Math.max(0, input.openingBalance) - deposited;
  return { months, endingBalance: balance, deposited, interestEarned };
}

export function AccountBalanceCalculator() {
  const [openingBalance, setOpeningBalance] = useState('5000');
  const [monthlyDeposit, setMonthlyDeposit] = useState('200');
  const [annualRate, setAnnualRate] = useState('4');
  const [months, setMonths] = useState('24');

  const result = computeAccountBalance({
    openingBalance: Number(openingBalance) || 0,
    monthlyDeposit: Number(monthlyDeposit) || 0,
    annualRate: Number(annualRate) || 0,
    months: Number(months) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Opening balance ($)" value={openingBalance} onChange={setOpeningBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Monthly deposit ($)" value={monthlyDeposit} onChange={setMonthlyDeposit} min={0} />
              <NumberField label="Annual interest rate (%)" value={annualRate} onChange={setAnnualRate} step="0.1" min={0} />
            </div>
            <NumberField label="Months" value={months} onChange={setMonths} min={0} max={1200} />
          </div>
          <Hint>
            Interest is compounded monthly on the balance after each deposit, which is how most savings accounts
            credit interest.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Ending balance"
            value={`$${formatMoney(result.endingBalance)}`}
            sub={`After ${result.months} month(s)`}
          />
          <ResultRows>
            <ResultRow label="Total deposits" value={`$${formatMoney(result.deposited)}`} />
            <ResultRow label="Interest earned" value={`$${formatMoney(result.interestEarned)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AccountBalanceCalculator;
