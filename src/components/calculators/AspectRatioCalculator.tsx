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

export interface AspectRatioInput {
  width: number;
  height: number;
  targetWidth: number;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function computeAspectRatio(input: AspectRatioInput) {
  const w = Math.max(0, Math.round(input.width));
  const h = Math.max(0, Math.round(input.height));
  const target = Math.max(0, input.targetWidth);

  const divisor = w > 0 && h > 0 ? gcd(w, h) : 1;
  const ratioW = divisor > 0 ? w / divisor : 0;
  const ratioH = divisor > 0 ? h / divisor : 0;
  const decimal = h > 0 ? w / h : 0;
  const targetHeight = decimal > 0 ? target / decimal : 0;

  return { ratioW, ratioH, decimal, targetHeight };
}

export function AspectRatioCalculator() {
  const [width, setWidth] = useState('1920');
  const [height, setHeight] = useState('1080');
  const [targetWidth, setTargetWidth] = useState('2560');

  const result = computeAspectRatio({
    width: Number(width) || 0,
    height: Number(height) || 0,
    targetWidth: Number(targetWidth) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Width (px)" value={width} onChange={setWidth} min={0} />
              <NumberField label="Height (px)" value={height} onChange={setHeight} min={0} />
            </div>
            <NumberField label="Target width (px)" value={targetWidth} onChange={setTargetWidth} min={0} />
          </div>
          <Hint>
            The reduced ratio is found with the greatest common divisor, so 1920×1080 reduces to 16:9 — the
            same shape at any resolution.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Aspect ratio"
            value={`${result.ratioW}:${result.ratioH}`}
            sub={`${formatMoney(result.decimal)} : 1`}
          />
          <ResultRows>
            <ResultRow label="Ratio as decimal" value={formatMoney(result.decimal)} />
            <ResultRow
              label="Height for target width"
              value={`${formatMoney(result.targetHeight)} px`}
            />
            <ResultRow label="Total pixels" value={formatMoney(Math.max(0, Number(width) || 0) * Math.max(0, Number(height) || 0))} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AspectRatioCalculator;
