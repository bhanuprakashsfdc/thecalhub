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

export interface LongTermCareInput {
  monthlyCost: number;
  currentAge: number;
  startAge: number;
  careYears: number;
  inflationRate: number;
  returnRate: number;
}

export function computeLongTermCare(input: LongTermCareInput) {
  const yearsUntil = Math.max(0, input.startAge - input.currentAge);
  const growth = Math.pow(1 + input.inflationRate / 100, yearsUntil);
  const futureMonthly = input.monthlyCost * growth;
  const totalFuture = futureMonthly * 12 * Math.max(0, input.careYears);
  const discount = Math.pow(1 + input.returnRate / 100, yearsUntil);
  const presentValue = totalFuture / discount;

  const months = yearsUntil * 12;
  const r = input.returnRate / 100 / 12;
  const monthlySavings =
    months > 0 ? (r === 0 ? totalFuture / months : (totalFuture * r) / (Math.pow(1 + r, months) - 1)) : 0;

  return { yearsUntil, futureMonthly, totalFuture, presentValue, monthlySavings };
}

export function LongTermCareCalculator() {
  const [monthlyCost, setMonthlyCost] = useState('5000');
  const [currentAge, setCurrentAge] = useState('65');
  const [startAge, setStartAge] = useState('80');
  const [careYears, setCareYears] = useState('3');
  const [inflationRate, setInflationRate] = useState('4');
  const [returnRate, setReturnRate] = useState('5');

  const result = computeLongTermCare({
    monthlyCost: Number(monthlyCost) || 0,
    currentAge: Number(currentAge) || 0,
    startAge: Number(startAge) || 0,
    careYears: Number(careYears) || 0,
    inflationRate: Number(inflationRate) || 0,
    returnRate: Number(returnRate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Monthly care cost ($)" value={monthlyCost} onChange={setMonthlyCost} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current age" value={currentAge} onChange={setCurrentAge} min={0} max={120} />
              <NumberField label="Age when care starts" value={startAge} onChange={setStartAge} min={0} max={120} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Years of care" value={careYears} onChange={setCareYears} min={1} />
              <NumberField label="Cost inflation (%)" value={inflationRate} onChange={setInflationRate} step="0.1" />
            </div>
            <NumberField label="Investment return (%)" value={returnRate} onChange={setReturnRate} step="0.1" />
          </div>
          <Hint>
            Long-term care costs rise faster than general inflation in many markets, so model a separate care
            inflation rate and discount future costs at the return you expect on the assets you will spend.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Lump sum needed today"
            value={`$${formatMoney(result.presentValue)}`}
            sub={`Covering ${result.yearsUntil} year(s) until care begins`}
          />
          <ResultRows>
            <ResultRow label="Monthly cost when care starts" value={`$${formatMoney(result.futureMonthly)}`} />
            <ResultRow label="Total future cost" value={`$${formatMoney(result.totalFuture)}`} />
            <ResultRow label="Monthly savings to fund it" value={`$${formatMoney(result.monthlySavings)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LongTermCareCalculator;
