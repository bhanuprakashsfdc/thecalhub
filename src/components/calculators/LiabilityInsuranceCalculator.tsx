import { useState, useMemo } from 'react';
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

export interface LiabilityInsuranceInput {
  income: number;
  multiplier: number;
  existingCoverage: number;
}

export function computeLiabilityInsurance(input: LiabilityInsuranceInput) {
  const needed = input.income * input.multiplier;
  const gap = Math.max(0, needed - input.existingCoverage);
  return { needed, gap };
}

export function LiabilityInsuranceCalculator() {
  const [income, setIncome] = useState('50000');
  const [multiplier, setMultiplier] = useState('5');
  const [existingCoverage, setExistingCoverage] = useState('100000');

  const result = useMemo(
    () =>
      computeLiabilityInsurance({
        income: Number(income) || 0,
        multiplier: Number(multiplier) || 0,
        existingCoverage: Number(existingCoverage) || 0,
      }),
    [income, multiplier, existingCoverage]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Annual income ($)" value={income} onChange={setIncome} min={0} step="1000" />
            <NumberField label="Income multiplier" value={multiplier} onChange={setMultiplier} min={1} step="1" />
            <NumberField label="Existing coverage ($)" value={existingCoverage} onChange={setExistingCoverage} min={0} step="10000" />
          </div>
          <Hint>
            A common rule of thumb is to carry liability coverage of 5–10× your annual income so
            your family is protected if you die or become disabled. Subtract existing policies.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Recommended coverage"
            value={`${formatMoney(result.needed)}`}
            sub={`Gap ${formatMoney(result.gap)}`}
          />
          <ResultRows>
            <ResultRow label="Coverage gap" value={formatMoney(result.gap)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LiabilityInsuranceCalculator;