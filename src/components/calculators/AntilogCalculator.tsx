import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface AntiLogInput {
  number: number;
  base: string;
}

export function computeAntiLog(input: AntiLogInput) {
  const base = Number(input.base) || 10;
  const result = Math.pow(base, input.number);
  const inBaseE = Math.pow(Math.E, input.number);
  const inBase2 = Math.pow(2, input.number);
  const logOfResult = Math.log10(result);
  return { result, inBaseE, inBase2, logOfResult };
}

const BASE_OPTIONS = [
  { value: '10', label: 'Base 10' },
  { value: '2.718281828459045', label: 'Base e' },
  { value: '2', label: 'Base 2' },
];

export function AntiLogCalculator() {
  const [number, setNumber] = useState('3');
  const [base, setBase] = useState('10');

  const result = computeAntiLog({
    number: Number(number) || 0,
    base,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Number (x)" value={number} onChange={setNumber} step="any" />
            <SelectField label="Base" value={base} onChange={setBase} options={BASE_OPTIONS} />
          </div>
          <Hint>
            Anti-log reverses a logarithm: 10^x undoes
            log₁₀(x). Also shown for natural and binary bases.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Anti-log"
            value={formatMoney(result.result)}
            sub={`${base === '10' ? '10' : base === '2' ? '2' : 'e'}^x`}
          />
          <ResultRows>
            <ResultRow label="In base e" value={formatMoney(result.inBaseE)} />
            <ResultRow label="In base 2" value={formatMoney(result.inBase2)} />
            <ResultRow label="Log of result (base 10)" value={formatMoney(result.logOfResult)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AntiLogCalculator;
