import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface BaseConverterInput {
  value: string;
  fromBase: number;
  toBase: number;
}

function toBase10(value: string, base: number): number {
  let n = 0;
  for (const ch of value.trim().toUpperCase()) {
    let digit: number;
    if (ch >= '0' && ch <= '9') digit = ch.charCodeAt(0) - 48;
    else if (ch >= 'A' && ch <= 'Z') digit = ch.charCodeAt(0) - 55;
    else continue;
    if (digit >= base) return NaN;
    n = n * base + digit;
  }
  return n;
}

function fromBase10(n: number, base: number): string {
  if (n === 0) return '0';
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let s = '';
  let x = Math.floor(n);
  while (x > 0) {
    s = digits[x % base] + s;
    x = Math.floor(x / base);
  }
  return s;
}

export function computeBaseConverter(input: BaseConverterInput) {
  const base10 = toBase10(input.value, input.fromBase);
  const converted = Number.isFinite(base10) ? fromBase10(base10, input.toBase) : '';
  return { base10, converted };
}

export function BaseConverterCalculator() {
  const [value, setValue] = useState('FF');
  const [fromBase, setFromBase] = useState('16');
  const [toBase, setToBase] = useState('2');

  const result = useMemo(
    () =>
      computeBaseConverter({
        value,
        fromBase: Number(fromBase) || 2,
        toBase: Number(toBase) || 2,
      }),
    [value, fromBase, toBase]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Value</span>
              <input
                aria-label="Value"
                className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">From base</span>
                <input aria-label="From base" type="number" min={2} max={36} className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50" value={fromBase} onChange={(e) => setFromBase(e.target.value)} />
              </div>
              <div className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">To base</span>
                <input aria-label="To base" type="number" min={2} max={36} className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50" value={toBase} onChange={(e) => setToBase(e.target.value)} />
              </div>
            </div>
          </div>
          <Hint>
            Convert numbers between bases 2 through 36. Digits above 9 use letters A–Z. For example,
            FF in hex is 255 in decimal and 11111111 in binary.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Converted value"
            value={result.converted || '—'}
            sub={`Base ${toBase}`}
          />
          <ResultRows>
            <ResultRow label="Decimal (base 10)" value={formatMoney(result.base10)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BaseConverterCalculator;