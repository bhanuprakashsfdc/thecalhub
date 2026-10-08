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

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface CrochetInput {
  chainsPerInch: number;
  rowsPerInch: number;
  widthIn: number;
  heightIn: number;
  yardsPerStitch: number;
}

export function computeCrochet(input: CrochetInput) {
  const chainGauge = Math.max(0, input.chainsPerInch);
  const rowGauge = Math.max(0, input.rowsPerInch);
  const width = Math.max(0, input.widthIn);
  const height = Math.max(0, input.heightIn);
  const yps = Math.max(0, input.yardsPerStitch);

  const startingChains = Math.round(width * chainGauge);
  const rows = Math.round(height * rowGauge);
  const totalStitches = startingChains * rows;
  const yarnYards = totalStitches * yps;

  return { startingChains, rows, totalStitches, yarnYards };
}

export function CrochetCalculator() {
  const [chainsPerInch, setChainsPerInch] = useState('4');
  const [rowsPerInch, setRowsPerInch] = useState('3');
  const [widthIn, setWidthIn] = useState('18');
  const [heightIn, setHeightIn] = useState('20');
  const [yardsPerStitch, setYardsPerStitch] = useState('0.06');

  const result = computeCrochet({
    chainsPerInch: Number(chainsPerInch) || 0,
    rowsPerInch: Number(rowsPerInch) || 0,
    widthIn: Number(widthIn) || 0,
    heightIn: Number(heightIn) || 0,
    yardsPerStitch: Number(yardsPerStitch) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Chains per inch" value={chainsPerInch} onChange={setChainsPerInch} min={0} />
              <NumberField label="Rows per inch" value={rowsPerInch} onChange={setRowsPerInch} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Width (in)" value={widthIn} onChange={setWidthIn} min={0} />
              <NumberField label="Height (in)" value={heightIn} onChange={setHeightIn} min={0} />
            </div>
            <NumberField
              label="Yards per stitch"
              value={yardsPerStitch}
              onChange={setYardsPerStitch}
              min={0}
              step="0.005"
              hint="Divide the yards of your swatch by its stitch count"
            />
          </div>
          <Hint>
            Measure your gauge over 4 inches of chain and rows, then scale to the finished size. Chain a swatch
            first — chains are usually wider than the fabric is tall.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Starting chains"
            value={`${whole(result.startingChains)} chains`}
            sub={`${whole(result.rows)} rows for the finished height`}
          />
          <ResultRows>
            <ResultRow label="Total stitches" value={whole(result.totalStitches)} />
            <ResultRow label="Yarn needed" value={`${formatMoney(result.yarnYards)} yards`} />
            <ResultRow label="Finished size" value={`${Number(widthIn) || 0} × ${Number(heightIn) || 0} in`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CrochetCalculator;
