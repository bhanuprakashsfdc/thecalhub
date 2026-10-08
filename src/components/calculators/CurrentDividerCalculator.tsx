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

export interface CurrentDividerInput {
  total: number;
  r1: number;
  r2: number;
}

export function computeCurrentDivider(input: CurrentDividerInput) {
  const i1 = (input.total * input.r2) / (input.r1 + input.r2);
  const i2 = input.total - i1;
  const equivalent = input.r1 + input.r2 !== 0 ? (input.r1 * input.r2) / (input.r1 + input.r2) : 0;
  const voltage = input.total * equivalent;
  const ratio = safeDiv(input.r2, input.r1 + input.r2);
  return { i1, i2, equivalent, voltage, ratio };
}

export function CurrentDividerCalculator() {
  const [total, setTotal] = useState('10');
  const [r1, setR1] = useState('100');
  const [r2, setR2] = useState('100');

  const result = computeCurrentDivider({
    total: Number(total) || 0,
    r1: Number(r1) || 0,
    r2: Number(r2) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total current (A)" value={total} onChange={setTotal} min={0} step="0.1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Branch R1 (Ω)" value={r1} onChange={setR1} min={0} />
              <NumberField label="Branch R2 (Ω)" value={r2} onChange={setR2} min={0} />
            </div>
          </div>
          <Hint>
            In a two-branch current divider the smaller resistor takes the larger share: I1 = Itotal × R2 ÷
            (R1 + R2).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Current through R1"
            value={`${formatMoney(result.i1)} A`}
            sub={`${formatMoney(result.i2)} A through R2`
            }
          />
          <ResultRows>
            <ResultRow label="Current through R2 (A)" value={formatMoney(result.i2)} />
            <ResultRow label="Equivalent resistance (Ω)" value={formatMoney(result.equivalent)} />
            <ResultRow label="Branch voltage (V)" value={formatMoney(result.voltage)} />
            <ResultRow label="Share going to R1" value={formatMoney(result.ratio)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CurrentDividerCalculator;
