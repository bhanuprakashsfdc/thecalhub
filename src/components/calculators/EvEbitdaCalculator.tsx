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
  safeDiv,
} from './kit';

export interface EvEbitdaInput {
  enterpriseValue: number;
  ebitda: number;
  comparableMultiple: number;
}

export function computeEvEbitda(input: EvEbitdaInput) {
  const ebitda = Math.max(0, input.ebitda);
  const ev = Math.max(0, input.enterpriseValue);
  const ratio = safeDiv(ev, ebitda);
  const comparableValue = ebitda * Math.max(0, input.comparableMultiple);
  const valueGap = comparableValue - ev;
  return { ratio, comparableValue, valueGap };
}

export function EvEbitdaCalculator() {
  const [enterpriseValue, setEnterpriseValue] = useState('500000');
  const [ebitda, setEbitda] = useState('100000');
  const [comparableMultiple, setComparableMultiple] = useState('10');

  const result = computeEvEbitda({
    enterpriseValue: Number(enterpriseValue) || 0,
    ebitda: Number(ebitda) || 0,
    comparableMultiple: Number(comparableMultiple) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Enterprise value ($)" value={enterpriseValue} onChange={setEnterpriseValue} min={0} />
              <NumberField label="EBITDA ($)" value={ebitda} onChange={setEbitda} min={0} />
            </div>
            <NumberField label="Comparable multiple (x)" value={comparableMultiple} onChange={setComparableMultiple} step="0.5" min={0} />
          </div>
          <Hint>
            Enterprise value includes debt, so EV/EBITDA compares businesses fairly regardless of how they are
            financed.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="EV/EBITDA multiple"
            value={`${formatMoney(result.ratio)}x`}
            sub={`EBITDA $${formatMoney(Number(ebitda) || 0)}`}
          />
          <ResultRows>
            <ResultRow label="Value at the comparable multiple" value={`$${formatMoney(result.comparableValue)}`} />
            <ResultRow label="Value gap vs enterprise value" value={`$${formatMoney(result.valueGap)}`} />
            <ResultRow label="Enterprise value" value={`$${formatMoney(Number(enterpriseValue) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EvEbitdaCalculator;
