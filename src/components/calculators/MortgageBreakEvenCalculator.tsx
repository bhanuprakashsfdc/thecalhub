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

export interface MortgageBreakEvenInput {
  pointsCost: number;
  closingCosts: number;
  monthlySavings: number;
}

export function computeMortgageBreakEven(input: MortgageBreakEvenInput) {
  const pointsCost = Math.max(0, input.pointsCost);
  const closingCosts = Math.max(0, input.closingCosts);
  const monthlySavings = Math.max(0, input.monthlySavings);
  const upfrontCost = pointsCost + closingCosts;
  const breakEvenMonths = monthlySavings > 0 ? upfrontCost / monthlySavings : 0;
  return {
    upfrontCost,
    breakEvenMonths,
    savings5Years: monthlySavings * 60 - upfrontCost,
    savings10Years: monthlySavings * 120 - upfrontCost,
  };
}

export function MortgageBreakEvenCalculator() {
  const [pointsCost, setPointsCost] = useState('6000');
  const [closingCosts, setClosingCosts] = useState('2000');
  const [monthlySavings, setMonthlySavings] = useState('100');

  const result = computeMortgageBreakEven({
    pointsCost: Number(pointsCost) || 0,
    closingCosts: Number(closingCosts) || 0,
    monthlySavings: Number(monthlySavings) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Points cost ($)" value={pointsCost} onChange={setPointsCost} min={0} />
            <NumberField label="Other closing costs ($)" value={closingCosts} onChange={setClosingCosts} min={0} />
            <NumberField label="Monthly payment savings ($)" value={monthlySavings} onChange={setMonthlySavings} min={0} />
          </div>
          <Hint>
            Paying points raises upfront cash to lower the rate. The break-even point tells you how long the loan
            must stay open before the monthly savings beat that cost.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Break-even period"
            value={`${formatMoney(result.breakEvenMonths)} months`}
            sub={`Upfront cost ${formatMoney(result.upfrontCost)}`}
          />
          <ResultRows>
            <ResultRow label="Total upfront cost" value={`$${formatMoney(result.upfrontCost)}`} />
            <ResultRow label="Net savings after 5 years" value={`$${formatMoney(result.savings5Years)}`} />
            <ResultRow label="Net savings after 10 years" value={`$${formatMoney(result.savings10Years)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MortgageBreakEvenCalculator;
