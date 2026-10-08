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

export interface KnittingInput {
  gaugeStitches: number;
  gaugeRows: number;
  widthIn: number;
  heightIn: number;
  yardsPerStitch: number;
}

export function computeKnitting(input: KnittingInput) {
  const stitchGauge = Math.max(0, input.gaugeStitches);
  const rowGauge = Math.max(0, input.gaugeRows);
  const width = Math.max(0, input.widthIn);
  const height = Math.max(0, input.heightIn);
  const yps = Math.max(0, input.yardsPerStitch);

  const castOn = Math.round((width * stitchGauge) / 4);
  const rows = Math.round((height * rowGauge) / 4);
  const totalStitches = castOn * rows;
  const yarnYards = totalStitches * yps;

  return { castOn, rows, totalStitches, yarnYards };
}

export function KnittingCalculator() {
  const [gaugeStitches, setGaugeStitches] = useState('20');
  const [gaugeRows, setGaugeRows] = useState('28');
  const [widthIn, setWidthIn] = useState('20');
  const [heightIn, setHeightIn] = useState('24');
  const [yardsPerStitch, setYardsPerStitch] = useState('0.04');

  const result = computeKnitting({
    gaugeStitches: Number(gaugeStitches) || 0,
    gaugeRows: Number(gaugeRows) || 0,
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
              <NumberField
                label="Stitches per 4 in"
                value={gaugeStitches}
                onChange={setGaugeStitches}
                min={0}
              />
              <NumberField label="Rows per 4 in" value={gaugeRows} onChange={setGaugeRows} min={0} />
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
              hint="Check a swatch: divide yards knitted by stitches in the swatch"
            />
          </div>
          <Hint>
            Knit a 4 inch swatch in your pattern stitch and count the stitches and rows. The cast-on is the
            stitch gauge scaled to your finished width.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cast on"
            value={`${whole(result.castOn)} stitches`}
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

export default KnittingCalculator;
