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

export interface MatrixMultiplicationInput {
  a: string;
  b: string;
}

function parseMatrix(s: string): number[][] {
  const rows = s.trim().split(';').map((r) => r.trim()).filter((r) => r.length > 0);
  return rows.map((row) => row.split(/[\s,]+/).map(Number));
}

function multiply(a: number[][], b: number[][]): number[][] | null {
  if (a.length === 0 || b.length === 0 || a[0].length !== b.length) return null;
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

export function computeMatrixMultiplication(input: MatrixMultiplicationInput) {
  const a = parseMatrix(input.a);
  const b = parseMatrix(input.b);
  const result = multiply(a, b);
  return { result, a, b, possible: result !== null };
}

export function MatrixMultiplicationCalculator() {
  const [a, setA] = useState('1 2; 3 4');
  const [b, setB] = useState('5 6; 7 8');

  const result = useMemo(
    () =>
      computeMatrixMultiplication({
        a,
        b,
      }),
    [a, b]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="grid grid-cols-2 gap-4">
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Matrix A</span>
              <textarea aria-label="Matrix A" className="w-full h-28 bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50 resize-none" value={a} onChange={(e) => setA(e.target.value)} />
            </div>
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Matrix B</span>
              <textarea aria-label="Matrix B" className="w-full h-28 bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50 resize-none" value={b} onChange={(e) => setB(e.target.value)} />
            </div>
          </div>
          <Hint>
            Multiply two matrices. Rows are separated by semicolons, columns by spaces or commas.
            The inner dimensions must match: A is m×n and B must be n×p.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Result"
            value={result.possible ? `${result.result!.length}×${result.result![0].length}` : '—'}
          />
          <ResultRows>
            <ResultRow label="A shape" value={`${result.a.length}×${result.a[0]?.length || 0}`} />
            <ResultRow label="B shape" value={`${result.b.length}×${result.b[0]?.length || 0}`} />
            {result.possible && result.result!.map((row, i) => (
              <ResultRow key={i} label={`Row ${i + 1}`} value={row.map((v) => formatMoney(v)).join(', ')} />
            ))}
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MatrixMultiplicationCalculator;