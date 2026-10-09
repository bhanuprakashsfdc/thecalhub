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

export interface ExponentInput {
  base: number;
  exponent: number;
}

export function computeExponent(input: ExponentInput) {
  const result = Math.pow(input.base, input.exponent);
  const logBase = Math.log(result) / Math.log(input.base || 1);
  const log10 = Math.log10(result);
  const ln = Math.log(result);
  return { result, logBase, log10, ln };
}

export function ExponentCalculator() {
  const [base, setBase] = useState('2');
  const [exponent, setExponent] = useState('8');

  const result = useMemo(
    () =>
      computeExponent({
        base: Number(base) || 0,
        exponent: Number(exponent) || 0,
      }),
    [base, exponent]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Base" value={base} onChange={setBase} step="0.1" />
            <NumberField label="Exponent" value={exponent} onChange={setExponent} step="0.1" />
          </div>
          <Hint>
            Compute base raised to the exponent. The result is also expressed as its logarithms in
            base 10 and natural log for quick conversion.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Result"
            value={formatMoney(result.result)}
          />
          <ResultRows>
            <ResultRow label="log10(result)" value={formatMoney(result.log10)} />
            <ResultRow label="ln(result)" value={formatMoney(result.ln)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExponentCalculator;