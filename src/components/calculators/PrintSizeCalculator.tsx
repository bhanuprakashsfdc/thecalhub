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

export interface PrintSizeInput {
  widthPx: number;
  heightPx: number;
  dpi: number;
}

export function computePrintSize(input: PrintSizeInput) {
  const w = Math.max(0, input.widthPx);
  const h = Math.max(0, input.heightPx);
  const dpi = Math.max(1, input.dpi);

  const widthIn = w / dpi;
  const heightIn = h / dpi;
  const diagonal = Math.sqrt(widthIn * widthIn + heightIn * heightIn);
  const megapixels = (w * h) / 1_000_000;

  return { widthIn, heightIn, diagonal, megapixels };
}

export function PrintSizeCalculator() {
  const [widthPx, setWidthPx] = useState('3000');
  const [heightPx, setHeightPx] = useState('2000');
  const [dpi, setDpi] = useState('300');

  const result = computePrintSize({
    widthPx: Number(widthPx) || 0,
    heightPx: Number(heightPx) || 0,
    dpi: Number(dpi) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Image width (px)" value={widthPx} onChange={setWidthPx} min={0} />
              <NumberField label="Image height (px)" value={heightPx} onChange={setHeightPx} min={0} />
            </div>
            <NumberField label="Print resolution (DPI)" value={dpi} onChange={setDpi} min={1} />
          </div>
          <Hint>
            Divide pixel dimensions by DPI to get the physical print. 300 DPI is photo-quality, 150 DPI reads
            fine at arm's length and 72 DPI suits wall art viewed from across the room.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Print width"
            value={`${formatMoney(result.widthIn)} in`}
            sub={`${formatMoney(result.widthIn * 2.54)} cm wide`}
          />
          <ResultRows>
            <ResultRow label="Print height" value={`${formatMoney(result.heightIn)} in`} />
            <ResultRow label="Print diagonal" value={`${formatMoney(result.diagonal)} in`} />
            <ResultRow label="Megapixels" value={`${formatMoney(result.megapixels)} MP`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PrintSizeCalculator;
