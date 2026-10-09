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

export interface CreditUtilizationInput {
  creditLimit: number;
  currentBalance: number;
}

export function computeCreditUtilization(input: CreditUtilizationInput) {
  const utilization =
    input.creditLimit > 0 ? (input.currentBalance / input.creditLimit) * 100 : 0;
  const available = Math.max(0, input.creditLimit - input.currentBalance);
  const recommended = input.creditLimit * 0.3;
  const headroom = Math.max(0, recommended - input.currentBalance);
  return { utilization, available, recommended, headroom };
}

export function CreditUtilizationCalculator() {
  const [creditLimit, setCreditLimit] = useState('10000');
  const [currentBalance, setCurrentBalance] = useState('2500');

  const result = computeCreditUtilization({
    creditLimit: Number(creditLimit) || 0,
    currentBalance: Number(currentBalance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Credit limit ($)" value={creditLimit} onChange={setCreditLimit} min={0} />
            <NumberField label="Current balance ($)" value={currentBalance} onChange={setCurrentBalance} min={0} />
          </div>
          <Hint>
            Keeping utilization under 30% of your limit is the common
            guideline for a healthy credit score.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Credit utilization"
            value={`${formatMoney(result.utilization)}%`}
            sub="Balance ÷ limit"
          />
          <ResultRows>
            <ResultRow label="Available credit" value={`$${formatMoney(result.available)}`} />
            <ResultRow label="Recommended balance (30%)" value={`$${formatMoney(result.recommended)}`} />
            <ResultRow label="Headroom to 30%" value={`$${formatMoney(result.headroom)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CreditUtilizationCalculator;
