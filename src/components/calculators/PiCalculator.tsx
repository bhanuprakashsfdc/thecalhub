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

export interface PiInput {
  digits: number;
  radius: number;
}

export interface PiResult {
  pi: string;
  digits: number;
  circumference: number;
  area: number;
}

const EXTRA = 12n;

function arctanInverse(x: bigint, scale: bigint): bigint {
  const x2 = x * x;
  let sum = 0n;
  let term = scale / x;
  let k = 0n;
  while (term !== 0n) {
    sum += (k % 2n === 0n ? 1n : -1n) * (term / (2n * k + 1n));
    term /= x2;
    k += 1n;
  }
  return sum;
}

export function computePiDigits(digits: number): string {
  const d = Math.min(Math.max(Math.trunc(Number.isFinite(digits) ? digits : 0), 0), 60);
  const scale = 10n ** BigInt(d) * 10n ** EXTRA;
  const piScaled = 16n * arctanInverse(5n, scale) - 4n * arctanInverse(239n, scale);
  const truncated = piScaled / 10n ** EXTRA;
  const text = truncated.toString().padStart(d + 1, '0');
  if (d === 0) return text;
  return `${text.slice(0, text.length - d)}.${text.slice(text.length - d)}`;
}

export function computePi(input: PiInput): PiResult {
  const digits = Math.min(Math.max(Math.trunc(Number.isFinite(input.digits) ? input.digits : 0), 0), 60);
  const radiusRaw = Number(input.radius);
  const radius = Number.isFinite(radiusRaw) && radiusRaw > 0 ? radiusRaw : 0;
  return {
    pi: computePiDigits(digits),
    digits,
    circumference: 2 * Math.PI * radius,
    area: Math.PI * radius * radius,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function PiCalculator() {
  const [digits, setDigits] = useState('15');
  const [radius, setRadius] = useState('1');

  const result = computePi({ digits: toNumber(digits), radius: toNumber(radius) });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Decimal places"
              value={digits}
              onChange={setDigits}
              min={0}
              max={60}
              hint="Up to 60 decimal places, computed with Machin's formula."
            />
            <NumberField
              label="Circle radius"
              value={radius}
              onChange={setRadius}
              min={0}
              step="0.1"
              hint="Used for the circumference and area rows."
            />
          </div>
          <Hint>
            Machin's formula pi/4 = 4 arctan(1/5) - arctan(1/239) is summed with big-integer arithmetic so
            every displayed digit is exact (truncated, not rounded).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Pi" value={result.pi} sub={`Truncated to ${result.digits} decimal places`} />
          <ResultRows>
            <ResultRow label="Circumference (2 pi r)" value={formatMoney(result.circumference, 6)} />
            <ResultRow label="Area (pi r^2)" value={formatMoney(result.area, 6)} />
            <ResultRow label="Digits computed" value={String(result.digits)} />
          </ResultRows>
          <Hint>
            Circumference and area use double-precision pi; the hero string is generated digit by digit so
            it stays correct far beyond the 15 digits a float can hold.
          </Hint>
        </Panel>
      }
    />
  );
}

export default PiCalculator;
