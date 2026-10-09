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

export interface MatrixAdditionInput {
  a: number[][];
  b: number[][];
}

export function computeMatrixAddition(input: MatrixAdditionInput) {
  const sum = [
    [
      input.a[0][0] + input.b[0][0],
      input.a[0][1] + input.b[0][1],
    ],
    [
      input.a[1][0] + input.b[1][0],
      input.a[1][1] + input.b[1][1],
    ],
  ];
  const determinant = sum[0][0] * sum[1][1] - sum[0][1] * sum[1][0];
  const trace = sum[0][0] + sum[1][1];
  return { sum, determinant, trace };
}

export function MatrixAdditionCalculator() {
  const [a11, setA11] = useState('1');
  const [a12, setA12] = useState('2');
  const [a21, setA21] = useState('3');
  const [a22, setA22] = useState('4');
  const [b11, setB11] = useState('5');
  const [b12, setB12] = useState('6');
  const [b21, setB21] = useState('7');
  const [b22, setB22] = useState('8');

  const result = computeMatrixAddition({
    a: [
      [Number(a11) || 0, Number(a12) || 0],
      [Number(a21) || 0, Number(a22) || 0],
    ],
    b: [
      [Number(b11) || 0, Number(b12) || 0],
      [Number(b21) || 0, Number(b22) || 0],
    ],
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="A row 1 col 1" value={a11} onChange={setA11} step="any" />
              <NumberField label="A row 1 col 2" value={a12} onChange={setA12} step="any" />
              <NumberField label="A row 2 col 1" value={a21} onChange={setA21} step="any" />
              <NumberField label="A row 2 col 2" value={a22} onChange={setA22} step="any" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="B row 1 col 1" value={b11} onChange={setB11} step="any" />
              <NumberField label="B row 1 col 2" value={b12} onChange={setB12} step="any" />
              <NumberField label="B row 2 col 1" value={b21} onChange={setB21} step="any" />
              <NumberField label="B row 2 col 2" value={b22} onChange={setB22} step="any" />
            </div>
          </div>
          <Hint>
            Adds two 2×2 matrices element-wise, then reports
            the determinant and trace of the sum.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Sum determinant"
            value={formatMoney(result.determinant)}
            sub="Of A + B"
          />
          <ResultRows>
            <ResultRow label="Sum row 1 col 1" value={formatMoney(result.sum[0][0])} />
            <ResultRow label="Sum row 1 col 2" value={formatMoney(result.sum[0][1])} />
            <ResultRow label="Sum row 2 col 1" value={formatMoney(result.sum[1][0])} />
            <ResultRow label="Sum row 2 col 2" value={formatMoney(result.sum[1][1])} />
            <ResultRow label="Trace of sum" value={formatMoney(result.trace)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MatrixAdditionCalculator;
