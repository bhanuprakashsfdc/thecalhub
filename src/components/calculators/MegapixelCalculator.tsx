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

export interface MegapixelInput {
  width: number;
  height: number;
}

export function computeMegapixel(input: MegapixelInput) {
  const w = Math.max(0, input.width);
  const h = Math.max(0, input.height);

  const pixels = w * h;
  const megapixels = pixels / 1_000_000;
  const aspect = h > 0 ? w / h : 0;
  const printWidthAt300 = w / 300;

  return { pixels, megapixels, aspect, printWidthAt300 };
}

export function MegapixelCalculator() {
  const [width, setWidth] = useState('4000');
  const [height, setHeight] = useState('3000');

  const result = computeMegapixel({
    width: Number(width) || 0,
    height: Number(height) || 0,
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
          </div>
          <Hint>
            A megapixel is one million pixels. Multiply width by height and divide by 1,000,000 — sensor
            resolution is usually quoted this way.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Resolution"
            value={`${formatMoney(result.megapixels)} MP`}
            sub={`${formatMoney(result.pixels)} pixels in total`}
          />
          <ResultRows>
            <ResultRow label="Total pixels" value={formatMoney(result.pixels)} />
            <ResultRow label="Aspect ratio" value={formatMoney(result.aspect)} />
            <ResultRow label="Print width at 300 DPI" value={`${formatMoney(result.printWidthAt300)} in`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MegapixelCalculator;
