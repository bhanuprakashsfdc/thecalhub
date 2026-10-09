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

export interface ModuloInput {
  dividend: number;
  divisor: number;
}

export function computeModulo(input: ModuloInput) {
  const divisor = input.divisor === 0 ? 0 : input.divisor;
  const remainder = divisor === 0 ? 0 : input.dividend % divisor;
  const quotient = divisor === 0 ? 0 : Math.floor(input.dividend / divisor);
  const verification = quotient * divisor + remainder;
  const evenlyDivisible = divisor !== 0 && remainder === 0;
  return { remainder, quotient, verification, evenlyDivisible };
}

export function ModuloCalculator() {
  const [dividend, setDividend] = useState('17');
  const [divisor, setDivisor] = useState('5');

  const result = computeModulo({
    dividend: Number(dividend) || 0,
    divisor: Number(divisor) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Dividend" value={dividend} onChange={setDividend} step="any" />
            <NumberField label="Divisor" value={divisor} onChange={setDivisor} step="any" />
          </div>
          <Hint>
            Modulo gives the remainder of integer division:
            dividend = quotient × divisor + remainder.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Remainder" value={formatMoney(result.remainder)} sub="Dividend mod divisor" />
          <ResultRows>
            <ResultRow label="Quotient (floor)" value={formatMoney(result.quotient)} />
            <ResultRow label="Verification (q × d + r)" value={formatMoney(result.verification)} />
            <ResultRow label="Evenly divisible" value={result.evenlyDivisible ? 'Yes' : 'No'} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ModuloCalculator;
