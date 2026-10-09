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

export interface OctonionInput {
  a: number[];
  b: number[];
}

const OCTONION_TRIPLES: Array<[number, number, number]> = [
  [1, 2, 4],
  [2, 3, 5],
  [3, 4, 6],
  [4, 5, 7],
  [5, 6, 1],
  [6, 7, 2],
  [7, 1, 3],
];

function unitProduct(i: number, j: number): number[] {
  const out = new Array(8).fill(0);
  if (i === 0) {
    out[j] = 1;
    return out;
  }
  if (j === 0) {
    out[i] = 1;
    return out;
  }
  if (i === j) {
    out[0] = -1;
    return out;
  }
  for (const triple of OCTONION_TRIPLES) {
    const [x, y, z] = triple;
    if (x === i && y === j) {
      out[z] = 1;
      return out;
    }
    if (y === i && z === j) {
      out[x] = 1;
      return out;
    }
    if (z === i && x === j) {
      out[y] = 1;
      return out;
    }
    if (x === j && y === i) {
      out[z] = -1;
      return out;
    }
    if (y === j && z === i) {
      out[x] = -1;
      return out;
    }
    if (z === j && x === i) {
      out[y] = -1;
      return out;
    }
  }
  return out;
}

export function multiplyOctonion(a: number[], b: number[]): number[] {
  const out = new Array(8).fill(0);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (a[i] === 0 || b[j] === 0) continue;
      const product = unitProduct(i, j);
      const coefficient = a[i] * b[j];
      for (let k = 0; k < 8; k++) {
        out[k] += coefficient * product[k];
      }
    }
  }
  return out;
}

export function octonionNorm(q: number[]): number {
  return Math.sqrt(q.reduce((sum, c) => sum + c * c, 0));
}

export function computeOctonion(input: OctonionInput) {
  const product = multiplyOctonion(input.a, input.b);
  const normA = octonionNorm(input.a);
  const normB = octonionNorm(input.b);
  const norm = octonionNorm(product);
  return { product, normA, normB, norm };
}

const E_LABELS = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7'];

export function OctonionCalculator() {
  const [a, setA] = useState(['2', '1', '0', '0', '0', '0', '0', '0']);
  const [b, setB] = useState(['3', '0', '1', '0', '0', '0', '0', '0']);

  const result = computeOctonion({
    a: a.map((v) => Number(v) || 0),
    b: b.map((v) => Number(v) || 0),
  });

  const fields = (prefix: 'a' | 'b', values: string[], setter: (v: string[]) => void) => (
    <>
      <NumberField
        label={`${prefix === 'a' ? 'A' : 'B'} real part`}
        value={values[0]}
        onChange={(v) => setter([v, ...values.slice(1)])}
        step="1"
      />
      {E_LABELS.map((label, index) => (
        <NumberField
          key={label}
          label={`${prefix === 'a' ? 'A' : 'B'} ${label} coefficient`}
          value={values[index + 1]}
          onChange={(v) =>
            setter([...values.slice(0, index + 1), v, ...values.slice(index + 2)])
          }
          step="1"
        />
      ))}
    </>
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            {fields('a', a, setA)}
            {fields('b', b, setB)}
          </div>
          <Hint>
            Octonions extend quaternions to eight dimensions. Multiplication is
            non-commutative and non-associative, built on the Fano-plane triples.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Product norm"
            value={formatMoney(result.norm)}
            sub="||A × B||"
          />
          <ResultRows>
            <ResultRow label="Product real part" value={formatMoney(result.product[0])} />
            <ResultRow label="Product e1 component" value={formatMoney(result.product[1])} />
            <ResultRow label="Product e2 component" value={formatMoney(result.product[2])} />
            <ResultRow label="Product e4 component" value={formatMoney(result.product[4])} />
            <ResultRow label="A norm" value={formatMoney(result.normA)} />
            <ResultRow label="B norm" value={formatMoney(result.normB)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OctonionCalculator;
